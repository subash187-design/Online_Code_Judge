const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { compareOutput } = require('../utils/comparator');
const Logger = require('../utils/logger');

class JudgeService {
  /**
   * Compiles C++ code inside the sandboxed Docker runner
   * @param {string} tempDir - Directory containing Solution.cpp
   * @returns {{ success: boolean, compile_output: string }}
   */
  static _compileBinary(tempDir) {
    Logger.info('JudgeService', 'Compilation started');

    const compileArgs = [
      'run', '--rm',
      '--network', 'none',
      '-v', `${tempDir}:/sandbox`,
      'judge-runner:latest',
      'g++', '-O2', '-std=c++17', '/sandbox/Solution.cpp', '-o', '/sandbox/Solution.out'
    ];

    const compileRes = spawnSync('docker', compileArgs, { stdio: 'pipe' });
    const stderrMsg = compileRes.stderr ? compileRes.stderr.toString() : '';

    if (compileRes.status !== 0) {
      Logger.warn('JudgeService', 'Compilation failed', stderrMsg);
      return {
        success: false,
        compile_output: stderrMsg || 'Compilation failed'
      };
    }

    Logger.info('JudgeService', 'Compilation completed successfully');
    return { success: true, compile_output: '' };
  }

  /**
   * Executes a compiled binary with specific stdin inside the sandboxed container
   * Uses -o /sandbox/metrics.txt to isolate BusyBox time telemetry from user stderr
   * @param {string} tempDir - Directory containing Solution.out
   * @param {string} input - Stdin data to provide
   * @param {number} timeLimitMs - Timeout in milliseconds
   * @param {number} memoryLimitKb - Memory ceiling in kilobytes
   * @returns {{ verdict: string, exit_code: number, stdout: string, stderr: string, execution_time_ms: number, memory_used_kb: number }}
   */
  static _executeSingle(tempDir, input = '', timeLimitMs = 1000, memoryLimitKb = 262144) {
    fs.writeFileSync(path.join(tempDir, 'input.txt'), input || '');

    const timeLimitSec = (timeLimitMs / 1000).toFixed(2);
    const memoryMb = Math.ceil(memoryLimitKb / 1024) + 64;

    Logger.debug('JudgeService', 'Execution started', { timeLimitMs, memoryLimitKb });

    // Isolate timing metrics into /sandbox/metrics.txt via -o so user stderr is clean
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
      `/usr/bin/time -o /sandbox/metrics.txt -f "METRIC_TIME=%e METRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`
    ];

    const runRes = spawnSync('docker', dockerArgs, { stdio: 'pipe' });
    const exitCode = runRes.status ?? -1;

    // Read outputs
    const stdoutPath = path.join(tempDir, 'stdout.txt');
    const stderrPath = path.join(tempDir, 'stderr.txt');
    const metricsPath = path.join(tempDir, 'metrics.txt');

    const stdout = fs.existsSync(stdoutPath) ? fs.readFileSync(stdoutPath, 'utf-8') : '';
    const stderr = fs.existsSync(stderrPath) ? fs.readFileSync(stderrPath, 'utf-8') : '';
    const metricsStr = fs.existsSync(metricsPath) ? fs.readFileSync(metricsPath, 'utf-8') : '';

    // Parse telemetry metrics
    const timeMatch = metricsStr.match(/METRIC_TIME=([0-9.]+)/);
    const memMatch = metricsStr.match(/METRIC_MEM=([0-9]+)/);

    const execTimeMs = timeMatch ? Math.round(parseFloat(timeMatch[1]) * 1000) : 0;
    const memUsedKb = memMatch ? parseInt(memMatch[1], 10) : 0;

    Logger.debug('JudgeService', 'Execution completed', { exitCode, execTimeMs, memUsedKb });

    // Determine verdict
    // GNU timeout exits 124, SIGKILL gives 137
    if (exitCode === 124 || exitCode === 137 || execTimeMs >= timeLimitMs) {
      Logger.warn('JudgeService', 'Execution timed out');
      return {
        verdict: 'TIME_LIMIT_EXCEEDED',
        exit_code: exitCode,
        stdout,
        stderr,
        execution_time_ms: timeLimitMs,
        memory_used_kb: memUsedKb
      };
    }

    if (memUsedKb >= memoryLimitKb) {
      Logger.warn('JudgeService', 'Memory limit exceeded');
      return {
        verdict: 'MEMORY_LIMIT_EXCEEDED',
        exit_code: exitCode,
        stdout,
        stderr,
        execution_time_ms: execTimeMs,
        memory_used_kb: memUsedKb
      };
    }

    // Process crashed with non-zero exit code
    if (exitCode !== 0) {
      Logger.warn('JudgeService', 'Runtime error encountered', { exitCode, stderr });
      return {
        verdict: 'RUNTIME_ERROR',
        exit_code: exitCode,
        stdout,
        stderr: stderr || 'Process terminated with non-zero exit code',
        execution_time_ms: execTimeMs,
        memory_used_kb: memUsedKb
      };
    }

    // Process exited with 0 (clean success, even if diagnostic logs were sent to stderr)
    return {
      verdict: 'SUCCESS',
      exit_code: 0,
      stdout,
      stderr,
      execution_time_ms: execTimeMs,
      memory_used_kb: memUsedKb
    };
  }

  /**
   * Executes C++ submission inside a sandboxed Docker container against standard test cases
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
      const sourcePath = path.join(tempDir, 'Solution.cpp');
      fs.writeFileSync(sourcePath, code);

      // 1. Compile
      const compileRes = this._compileBinary(tempDir);
      if (!compileRes.success) {
        return {
          verdict: 'COMPILATION_ERROR',
          compile_output: compileRes.compile_output,
          execution_time_ms: 0,
          memory_used_kb: 0
        };
      }

      let maxExecutionTime = 0;
      let maxMemoryUsed = 0;

      // 2. Test Cases Execution Loop
      for (const tc of testCases) {
        const runRes = this._executeSingle(tempDir, tc.input, timeLimitMs, memoryLimitKb);

        maxExecutionTime = Math.max(maxExecutionTime, runRes.execution_time_ms);
        maxMemoryUsed = Math.max(maxMemoryUsed, runRes.memory_used_kb);

        if (runRes.verdict !== 'SUCCESS') {
          return {
            verdict: runRes.verdict,
            execution_time_ms: maxExecutionTime,
            memory_used_kb: maxMemoryUsed,
            compile_output: runRes.stderr || null
          };
        }

        // Compare output against expected
        if (!compareOutput(runRes.stdout, tc.expected_output)) {
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
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}
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
      const sourcePath = path.join(tempDir, 'Solution.cpp');
      fs.writeFileSync(sourcePath, code);

      // 1. Compile
      const compileRes = this._compileBinary(tempDir);
      if (!compileRes.success) {
        return {
          verdict: 'COMPILATION_ERROR',
          stdout: '',
          stderr: compileRes.compile_output,
          execution_time_ms: 0,
          memory_used_kb: 0
        };
      }

      // 2. Execute
      const runRes = this._executeSingle(tempDir, customInput, timeLimitMs, memoryLimitKb);

      return {
        verdict: runRes.verdict,
        stdout: runRes.stdout,
        stderr: runRes.stderr,
        execution_time_ms: runRes.execution_time_ms,
        memory_used_kb: runRes.memory_used_kb
      };
    } finally {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}
    }
  }
}

module.exports = JudgeService;
