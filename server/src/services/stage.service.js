const db = require('../config/database');
const JudgeService = require('./judge.service');
const AnalyzerService = require('./analyzer/analyzer.service');
const StressTestRunner = require('./judge/stressRunner');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

class StageService {
  static async getProblemStagesForUser(userId = 1, problemId) {
    const stagesRes = await db.query(
      `SELECT * FROM problem_stages WHERE problem_id = $1 ORDER BY order_index ASC`,
      [problemId]
    );
    const stages = stagesRes.rows;
    if (stages.length === 0) return null;

    const progressRes = await db.query(
      `SELECT * FROM user_stage_progress WHERE user_id = $1 AND problem_id = $2`,
      [userId, problemId]
    );
    const progressMap = new Map(progressRes.rows.map(r => [r.stage_id, r]));

    const enrichedStages = [];
    for (const stage of stages) {
      let progress = progressMap.get(stage.id);
      if (!progress) {
        const initialStatus = stage.order_index === 1 ? 'UNLOCKED' : 'LOCKED';
        const initRes = await db.query(
          `INSERT INTO user_stage_progress (user_id, problem_id, stage_id, status)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id, stage_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
           RETURNING *`,
          [userId, problemId, stage.id, initialStatus]
        );
        progress = initRes.rows[0];
      }

      enrichedStages.push({
        id: stage.id,
        order_index: stage.order_index,
        name: stage.name,
        description: stage.description,
        is_required: stage.is_required,
        expected_time_complexity: stage.expected_time_complexity,
        expected_space_complexity: stage.expected_space_complexity,
        status: progress.status,
        attempts_count: progress.attempts_count,
        best_execution_time_ms: progress.best_execution_time_ms,
        best_memory_used_kb: progress.best_memory_used_kb
      });
    }

    const completedRequired = enrichedStages.filter(s => s.is_required && s.status === 'COMPLETED').length;
    const totalRequired = enrichedStages.filter(s => s.is_required).length;

    return {
      problem_id: problemId,
      is_solved: completedRequired === totalRequired && totalRequired > 0,
      completed_stages_count: enrichedStages.filter(s => s.status === 'COMPLETED').length,
      total_stages_count: enrichedStages.length,
      stages: enrichedStages
    };
  }

  static async submitStageCode(userId = 1, stageId, language, code) {
    const client = await db.getClient();

    try {
      await client.query('BEGIN');

      // Fetch Stage, Problem, Reference Solution, and Stress Config
      const stageRes = await client.query(
        `SELECT s.*, p.time_limit_ms AS prob_time_limit, p.memory_limit_kb AS prob_mem_limit,
                ref.code as ref_code, sc.generator_name, sc.max_stress_cases, sc.max_input_size, sc.is_active as stress_active
         FROM problem_stages s
         JOIN problems p ON s.problem_id = p.id
         LEFT JOIN problem_reference_solutions ref ON p.id = ref.problem_id AND ref.language = 'cpp'
         LEFT JOIN problem_stress_configs sc ON p.id = sc.problem_id
         WHERE s.id = $1 FOR SHARE OF s, p`,
        [stageId]
      );
      if (stageRes.rows.length === 0) {
        throw { status: 404, message: 'Stage not found' };
      }
      const stage = stageRes.rows[0];

      // Lock user progress
      const progressRes = await client.query(
        `SELECT * FROM user_stage_progress 
         WHERE user_id = $1 AND stage_id = $2 FOR UPDATE`,
        [userId, stageId]
      );

      if (progressRes.rows.length === 0 || progressRes.rows[0].status === 'LOCKED') {
        throw { status: 403, message: 'You must complete preceding stages before attempting this stage.' };
      }
      const currentProgress = progressRes.rows[0];

      // Fetch Standard Test Cases (sample + hidden)
      const tcRes = await client.query(
        `SELECT input, expected_output FROM test_cases WHERE problem_id = $1 ORDER BY order_index ASC`,
        [stage.problem_id]
      );

      const timeLimit = stage.time_limit_ms || stage.prob_time_limit;
      const memLimit = stage.memory_limit_kb || stage.prob_mem_limit;

      // 1. Evaluate against Standard Test Suite
      let judgeResult = JudgeService.executeCppSubmission(code, tcRes.rows, timeLimit, memLimit);

      // 2. Differential Stress Fuzzing (Anti-Hardcoding & Random Inputs)
      let stressFailed = false;
      let stressFailureData = null;

      if (judgeResult.verdict === 'ACCEPTED' && stage.stress_active && stage.ref_code) {
        const runId = require('crypto').randomUUID();
        const tempDir = path.join(process.cwd(), 'temp_runs', runId);
        fs.mkdirSync(tempDir, { recursive: true });

        try {
          // Compile Candidate
          fs.writeFileSync(path.join(tempDir, 'Solution.cpp'), code);
          spawnSync('docker', [
            'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
            'judge-runner:latest', 'g++', '-O2', '-std=c++17', '/sandbox/Solution.cpp', '-o', '/sandbox/Solution.out'
          ]);

          // Compile Reference Oracle
          fs.writeFileSync(path.join(tempDir, 'Reference.cpp'), stage.ref_code);
          spawnSync('docker', [
            'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
            'judge-runner:latest', 'g++', '-O2', '-std=c++17', '/sandbox/Reference.cpp', '-o', '/sandbox/Reference.out'
          ]);

          const stressResult = StressTestRunner.runDifferentialStress(
            tempDir,
            stage.problem_id,
            runId,
            {
              generator_name: stage.generator_name,
              max_stress_cases: stage.max_stress_cases || 5,
              max_input_size: stage.max_input_size || 10000
            },
            timeLimit
          );

          if (!stressResult.passed) {
            stressFailed = true;
            judgeResult.verdict = stressResult.verdict;
            stressFailureData = stressResult;
          }
        } finally {
          try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
        }
      }

      // Phase 3 Static Complexity Analysis
      const analysisResult = AnalyzerService.analyze(
        code,
        { execution_time_ms: judgeResult.execution_time_ms, memory_used_kb: judgeResult.memory_used_kb },
        stage.expected_time_complexity
      );

      // Insert Submission Record
      const subRes = await client.query(
        `INSERT INTO stage_submissions 
          (user_id, problem_id, stage_id, language, code, verdict, execution_time_ms, memory_used_kb, compile_output)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          userId,
          stage.problem_id,
          stageId,
          language,
          code,
          judgeResult.verdict,
          judgeResult.execution_time_ms,
          judgeResult.memory_used_kb,
          judgeResult.compile_output || null
        ]
      );
      const submissionId = subRes.rows[0].id;

      // Log Stress Failure Internally (Hidden from User APIs)
      if (stressFailed && stressFailureData) {
        await client.query(
          `INSERT INTO stress_failure_logs 
            (submission_id, problem_id, seed, input_data, expected_output, actual_output, diff_summary)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            submissionId,
            stage.problem_id,
            BigInt(stressFailureData.failedSeed || '0'),
            stressFailureData.input || '',
            stressFailureData.expected || '',
            stressFailureData.actual || '',
            'Failed differential stress testing against canonical reference solution'
          ]
        );
      }

      // Insert Phase 3 Analysis
      await client.query(
        `INSERT INTO submission_analyses
          (submission_id, stage_id, detected_approach, time_complexity, space_complexity, confidence_level, stage_match_status, detected_patterns, runtime_notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          submissionId,
          stageId,
          analysisResult.detected_approach,
          analysisResult.time_complexity,
          analysisResult.space_complexity,
          analysisResult.confidence_level,
          analysisResult.stage_match_status,
          JSON.stringify(analysisResult.detected_patterns),
          analysisResult.notes || null
        ]
      );

      const newAttempts = currentProgress.attempts_count + 1;
      let newStatus = currentProgress.status;
      let nextUnlockedId = null;

      // Phase 6 Invariant: Stage completes ONLY if standard tests AND stress testing pass!
      if (judgeResult.verdict === 'ACCEPTED') {
        newStatus = 'COMPLETED';
        const bestTime = currentProgress.best_execution_time_ms !== null
          ? Math.min(currentProgress.best_execution_time_ms, judgeResult.execution_time_ms)
          : judgeResult.execution_time_ms;
        const bestMem = currentProgress.best_memory_used_kb !== null
          ? Math.min(currentProgress.best_memory_used_kb, judgeResult.memory_used_kb)
          : judgeResult.memory_used_kb;

        await client.query(
          `UPDATE user_stage_progress 
           SET status = 'COMPLETED', attempts_count = $1, best_execution_time_ms = $2, best_memory_used_kb = $3, 
               completed_at = COALESCE(completed_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP
           WHERE id = $4`,
          [newAttempts, bestTime, bestMem, currentProgress.id]
        );

        const nextStageRes = await client.query(
          `SELECT id FROM problem_stages WHERE problem_id = $1 AND order_index = $2`,
          [stage.problem_id, stage.order_index + 1]
        );

        if (nextStageRes.rows.length > 0) {
          nextUnlockedId = nextStageRes.rows[0].id;
          await client.query(
            `INSERT INTO user_stage_progress (user_id, problem_id, stage_id, status)
             VALUES ($1, $2, $3, 'UNLOCKED')
             ON CONFLICT (user_id, stage_id) 
             DO UPDATE SET status = CASE WHEN user_stage_progress.status = 'LOCKED' THEN 'UNLOCKED' ELSE user_stage_progress.status END,
                           updated_at = CURRENT_TIMESTAMP`,
            [userId, stage.problem_id, nextUnlockedId]
          );
        }
      } else {
        await client.query(
          `UPDATE user_stage_progress SET attempts_count = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
          [newAttempts, currentProgress.id]
        );
      }

      const remainingRequiredRes = await client.query(
        `SELECT COUNT(*) FROM problem_stages s
         LEFT JOIN user_stage_progress p ON s.id = p.stage_id AND p.user_id = $1
         WHERE s.problem_id = $2 AND s.is_required = TRUE AND (p.status IS NULL OR p.status != 'COMPLETED')`,
        [userId, stage.problem_id]
      );
      const isProblemSolved = parseInt(remainingRequiredRes.rows[0].count, 10) === 0;

      // Update Phase 5 Personal Bests
      await client.query(
        `INSERT INTO user_problem_summaries 
          (user_id, problem_id, is_solved, total_submissions, best_execution_time_ms, best_memory_used_kb, best_time_complexity, updated_at)
         VALUES 
          ($1, $2, $3, 1, $4, $5, $6, CURRENT_TIMESTAMP)
         ON CONFLICT (user_id, problem_id) DO UPDATE SET
          is_solved = EXCLUDED.is_solved OR user_problem_summaries.is_solved,
          total_submissions = user_problem_summaries.total_submissions + 1,
          best_execution_time_ms = LEAST(user_problem_summaries.best_execution_time_ms, EXCLUDED.best_execution_time_ms),
          best_memory_used_kb = LEAST(user_problem_summaries.best_memory_used_kb, EXCLUDED.best_memory_used_kb),
          best_time_complexity = COALESCE(EXCLUDED.best_time_complexity, user_problem_summaries.best_time_complexity),
          updated_at = CURRENT_TIMESTAMP`,
        [
          userId,
          stage.problem_id,
          isProblemSolved,
          judgeResult.execution_time_ms,
          judgeResult.memory_used_kb,
          analysisResult.time_complexity || null
        ]
      );

      await client.query('COMMIT');

      return {
        submission_id: submissionId,
        stage_id: stageId,
        verdict: judgeResult.verdict,
        execution_time_ms: judgeResult.execution_time_ms,
        memory_used_kb: judgeResult.memory_used_kb,
        compile_output: judgeResult.compile_output,
        stage_status: newStatus,
        next_unlocked_stage_id: nextUnlockedId,
        is_problem_solved: isProblemSolved,
        feedback_message: judgeResult.verdict === 'ACCEPTED'
          ? (isProblemSolved ? '🎉 Problem Solved! All required stages successfully cleared.' : `Stage ${stage.order_index} complete! Next stage unlocked.`)
          : (stressFailed ? 'Solution passed sample cases but failed on dynamic randomized stress testing.' : null),
        analysis: analysisResult
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async getStageSubmissions(userId = 1, stageId) {
    const res = await db.query(
      `SELECT s.*, a.detected_approach, a.time_complexity, a.space_complexity, a.stage_match_status
       FROM stage_submissions s
       LEFT JOIN submission_analyses a ON s.id = a.submission_id
       WHERE s.user_id = $1 AND s.stage_id = $2 
       ORDER BY s.created_at DESC LIMIT 50`,
      [userId, stageId]
    );
    return res.rows;
  }
}

module.exports = StageService;
