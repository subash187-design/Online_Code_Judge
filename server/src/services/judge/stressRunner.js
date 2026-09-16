const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { compareOutput } = require('../../utils/comparator');

class StressTestRunner {
  /**
   * Executes differential fuzzing between user binary and reference binary
   */
  static runDifferentialStress(jobDir, problemId, submissionId, stressConfig, userTimeLimitMs = 1000) {
    if (!stressConfig || !stressConfig.generator_name) {
      return { passed: true, verdict: 'ACCEPTED' };
    }

    let generatorModule;
    try {
      generatorModule = require(`../../generators/problems/${stressConfig.generator_name}`);
    } catch (e) {
      console.warn(`[StressRunner] Generator not found: ${stressConfig.generator_name}. Skipping differential fuzzing.`);
      return { passed: true, verdict: 'ACCEPTED' };
    }

    const cleanSubId = (submissionId || '').replace(/[^0-9a-fA-F]/g, '').slice(0, 16) || '1234567890abcdef';
    const seedBase = BigInt('0x' + cleanSubId);

    for (let i = 0; i < (stressConfig.max_stress_cases || 5); i++) {
      const currentSeed = seedBase + BigInt(i * 1009);
      const testInput = generatorModule.generate(currentSeed, i === 0 ? 'BOUNDARY' : i === 1 ? 'DUPLICATE_HEAVY' : 'RANDOM', {
        maxN: stressConfig.max_input_size || 100000,
        maxVal: 1e9
      });

      fs.writeFileSync(path.join(jobDir, 'stress_input.txt'), testInput);

      // 1. Run Candidate Binary under isolated container
      const userRes = this._runIsolated(jobDir, 'Solution.out', 'stress_input.txt', 'user_out.txt', userTimeLimitMs);
      if (userRes.verdict !== 'SUCCESS') {
        return {
          passed: false,
          verdict: userRes.verdict,
          failedSeed: currentSeed.toString(),
          input: testInput,
          expected: 'N/A',
          actual: userRes.stderr || 'Execution failed during stress testing'
        };
      }

      // 2. Run Reference Binary with double time allowance
      const refRes = this._runIsolated(jobDir, 'Reference.out', 'stress_input.txt', 'ref_out.txt', userTimeLimitMs * 2);
      if (refRes.verdict !== 'SUCCESS') {
        console.error(`[StressRunner] Reference binary failed on seed ${currentSeed}:`, refRes);
        return {
          passed: false,
          verdict: 'JUDGE_INTERNAL_ERROR',
          failedSeed: currentSeed.toString(),
          systemError: true
        };
      }

      // 3. Differential Comparison
      const userOut = fs.existsSync(path.join(jobDir, 'user_out.txt'))
        ? fs.readFileSync(path.join(jobDir, 'user_out.txt'), 'utf-8')
        : '';
      const refOut = fs.existsSync(path.join(jobDir, 'ref_out.txt'))
        ? fs.readFileSync(path.join(jobDir, 'ref_out.txt'), 'utf-8')
        : '';

      if (!compareOutput(userOut, refOut)) {
        return {
          passed: false,
          verdict: 'WRONG_ANSWER',
          failedSeed: currentSeed.toString(),
          input: testInput,
          expected: refOut,
          actual: userOut
        };
      }
    }

    return { passed: true, verdict: 'ACCEPTED' };
  }

  static _runIsolated(jobDir, binaryName, inputFile, outputFile, timeLimitMs) {
    const timeLimitSec = (timeLimitMs / 1000).toFixed(2);
    
    // File size ceiling: 40MB, Memory ceiling: 512MB
    const bashScript = `
      ulimit -f 40960;
      ulimit -v 524288;
      timeout -s SIGKILL ${timeLimitSec}s /sandbox/${binaryName} < /sandbox/${inputFile} > /sandbox/${outputFile} 2> /sandbox/err.txt
    `;

    const dockerArgs = [
      'run', '--rm',
      '--network', 'none',
      '--cpus=1.0',
      '--memory=512m',
      '--pids-limit', '64',
      '--cap-drop=ALL',
      '-v', `${jobDir}:/sandbox`,
      'judge-runner:latest',
      'bash', '-c', bashScript
    ];

    const run = spawnSync('docker', dockerArgs, { stdio: 'pipe' });

    if (run.status === 124 || run.status === 137) return { verdict: 'TIME_LIMIT_EXCEEDED' };
    if (run.status === 153) return { verdict: 'OUTPUT_LIMIT_EXCEEDED' };
    if (run.status !== 0) {
      const errStr = fs.existsSync(path.join(jobDir, 'err.txt'))
        ? fs.readFileSync(path.join(jobDir, 'err.txt'), 'utf-8')
        : '';
      return { verdict: 'RUNTIME_ERROR', stderr: errStr };
    }
    return { verdict: 'SUCCESS' };
  }
}

module.exports = StressTestRunner;
