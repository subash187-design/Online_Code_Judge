const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { compareOutput } = require('../utils/comparator');

class JudgeService {
  /**
   * Executes C++ submission inside a sandboxed Docker container
   * @param {string} code - C++ source code
   * @param {Array} testCases - Array of { input, expected_output }
   * @param {number} timeLimitMs - Execution deadline in ms
   * @param {number} memoryLimitKb - Max virtual memory in KB
   */
  static executeCppSubmission(code, testCases, timeLimitMs = 1000, memoryLimitKb = 262144) {
    const runId = crypto.randomUUID();
    const tempDir = path.join(process.cwd(), 'temp_runs', runId);
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      // 1. Write Source Code
      const sourcePath = path.join(tempDir, 'Solution.cpp');
      fs.writeFileSync(sourcePath, code);

      // 2. Secure Compilation (No shell interpolation)
      const compileArgs = [
        'run', '--rm',
        '--network', 'none',
        '-v', `${tempDir}:/sandbox`,
        'judge-runner:latest',
        'g++', '-O2', '-std=c++17', '/sandbox/Solution.cpp', '-o', '/sandbox/Solution.out'
      ];

      const compileRes = spawnSync('docker', compileArgs, { stdio: 'pipe' });
      if (compileRes.status !== 0) {
        const stderrMsg = compileRes.stderr ? compileRes.stderr.toString() : 'Compilation Failed';
        return {
          verdict: 'COMPILATION_ERROR',
          compile_output: stderrMsg,
          execution_time_ms: 0,
          memory_used_kb: 0
        };
      }

      let maxExecutionTime = 0;
      let maxMemoryUsed = 0;
      const timeLimitSec = (timeLimitMs / 1000).toFixed(2);

      // 3. Test Cases Execution Loop
      for (const tc of testCases) {
        fs.writeFileSync(path.join(tempDir, 'input.txt'), tc.input);

        const memoryMb = Math.ceil(memoryLimitKb / 1024) + 64;
        const dockerArgs = [
          'run', '--rm',
          '--network', 'none',
          '--cpus=1.0',
          `--memory=${memoryMb}m`,
          '--pids-limit', '64',
          '--cap-drop=ALL',
          '-v', `${tempDir}:/sandbox`,
          'judge-runner:latest',
          'bash', '-c',
          `/usr/bin/time -f "METRIC_TIME=%e\\nMETRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`
        ];

        const runRes = spawnSync('docker', dockerArgs, { stdio: 'pipe' });

        // Parse metrics emitted by GNU time in stderr
        const stderrStr = fs.existsSync(path.join(tempDir, 'stderr.txt'))
          ? fs.readFileSync(path.join(tempDir, 'stderr.txt'), 'utf-8')
          : '';

        const timeMatch = stderrStr.match(/METRIC_TIME=([0-9.]+)/);
        const memMatch = stderrStr.match(/METRIC_MEM=([0-9]+)/);

        const execTimeMs = timeMatch ? Math.round(parseFloat(timeMatch[1]) * 1000) : 0;
        const memUsedKb = memMatch ? parseInt(memMatch[1], 10) : 0;

        maxExecutionTime = Math.max(maxExecutionTime, execTimeMs);
        maxMemoryUsed = Math.max(maxMemoryUsed, memUsedKb);

        // Check timeout (GNU timeout exits 124, SIGKILL gives 137)
        if (runRes.status === 124 || runRes.status === 137 || execTimeMs >= timeLimitMs) {
          return {
            verdict: 'TIME_LIMIT_EXCEEDED',
            execution_time_ms: timeLimitMs,
            memory_used_kb: maxMemoryUsed,
            compile_output: null
          };
        }

        // Check memory violation
        if (memUsedKb >= memoryLimitKb) {
          return {
            verdict: 'MEMORY_LIMIT_EXCEEDED',
            execution_time_ms: maxExecutionTime,
            memory_used_kb: maxMemoryUsed,
            compile_output: null
          };
        }

        // Check runtime errors (non-zero status)
        if (runRes.status !== 0) {
          return {
            verdict: 'RUNTIME_ERROR',
            execution_time_ms: maxExecutionTime,
            memory_used_kb: maxMemoryUsed,
            compile_output: stderrStr || 'Runtime error encountered'
          };
        }

        // Compare output
        const actualOutput = fs.existsSync(path.join(tempDir, 'stdout.txt'))
          ? fs.readFileSync(path.join(tempDir, 'stdout.txt'), 'utf-8')
          : '';

        if (!compareOutput(actualOutput, tc.expected_output)) {
          return {
            verdict: 'WRONG_ANSWER',
            execution_time_ms: maxExecutionTime,
            memory_used_kb: maxMemoryUsed,
            compile_output: null
          };
        }
      }

      return {
        verdict: 'ACCEPTED',
        execution_time_ms: maxExecutionTime,
        memory_used_kb: maxMemoryUsed,
        compile_output: null
      };

    } finally {
      // Safe cleanup
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {
        // ignore cleanup error
      }
    }
  }

  /**
   * Runs C++ code with custom input and returns stdout/stderr without judging against test cases
   */
  static runCustomInput(code, customInput = '', timeLimitMs = 1000, memoryLimitKb = 262144) {
    const runId = crypto.randomUUID();
    const tempDir = path.join(process.cwd(), 'temp_runs', runId);
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      fs.writeFileSync(path.join(tempDir, 'Solution.cpp'), code);
      fs.writeFileSync(path.join(tempDir, 'input.txt'), customInput);

      // Compile
      const compileArgs = [
        'run', '--rm',
        '--network', 'none',
        '-v', `${tempDir}:/sandbox`,
        'judge-runner:latest',
        'g++', '-O2', '-std=c++17', '/sandbox/Solution.cpp', '-o', '/sandbox/Solution.out'
      ];
      const compileRes = spawnSync('docker', compileArgs, { stdio: 'pipe' });

      if (compileRes.status !== 0) {
        return {
          verdict: 'COMPILATION_ERROR',
          stdout: '',
          stderr: compileRes.stderr ? compileRes.stderr.toString() : 'Compilation Failed',
          execution_time_ms: 0,
          memory_used_kb: 0
        };
      }

      const timeLimitSec = (timeLimitMs / 1000).toFixed(2);
      const memoryMb = Math.ceil(memoryLimitKb / 1024) + 64;

      const dockerArgs = [
        'run', '--rm',
        '--network', 'none',
        '--cpus=1.0',
        `--memory=${memoryMb}m`,
        '--pids-limit', '64',
        '--cap-drop=ALL',
        '-v', `${tempDir}:/sandbox`,
        'judge-runner:latest',
        'bash', '-c',
        `/usr/bin/time -f "METRIC_TIME=%e\\nMETRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`
      ];

      const runRes = spawnSync('docker', dockerArgs, { stdio: 'pipe' });

      const stdout = fs.existsSync(path.join(tempDir, 'stdout.txt'))
        ? fs.readFileSync(path.join(tempDir, 'stdout.txt'), 'utf-8')
        : '';
      const rawStderr = fs.existsSync(path.join(tempDir, 'stderr.txt'))
        ? fs.readFileSync(path.join(tempDir, 'stderr.txt'), 'utf-8')
        : '';

      const timeMatch = rawStderr.match(/METRIC_TIME=([0-9.]+)/);
      const memMatch = rawStderr.match(/METRIC_MEM=([0-9]+)/);
      const cleanStderr = rawStderr.replace(/METRIC_TIME=[0-9.]+\n?|METRIC_MEM=[0-9]+\n?/g, '').trim();

      const execTimeMs = timeMatch ? Math.round(parseFloat(timeMatch[1]) * 1000) : 0;
      const memUsedKb = memMatch ? parseInt(memMatch[1], 10) : 0;

      let verdict = 'SUCCESS';
      if (runRes.status === 124 || runRes.status === 137 || execTimeMs >= timeLimitMs) {
        verdict = 'TIME_LIMIT_EXCEEDED';
      } else if (runRes.status !== 0) {
        verdict = 'RUNTIME_ERROR';
      }

      return {
        verdict,
        stdout,
        stderr: cleanStderr,
        execution_time_ms: execTimeMs,
        memory_used_kb: memUsedKb
      };
    } finally {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}
    }
  }
}

module.exports = JudgeService;
