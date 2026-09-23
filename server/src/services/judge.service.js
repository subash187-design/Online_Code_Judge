const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { compareOutput } = require('../utils/comparator');
const Logger = require('../utils/logger');

const SUPPORTED_LANGUAGES = ['c', 'cpp', 'java', 'python'];

const LANGUAGE_CONFIGS = {
  c: {
    sourceFile: 'Solution.c',
    compileArgs: (tempDir) => [
      'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
      'judge-runner:latest',
      'gcc', '-O2', '/sandbox/Solution.c', '-o', '/sandbox/Solution.out', '-lm'
    ],
    executeCmd: (timeLimitSec) => `/usr/bin/time -o /sandbox/metrics.txt -f "METRIC_TIME=%e METRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`,
    timeMultiplier: 1.0,
    memoryExtraMb: 64
  },
  cpp: {
    sourceFile: 'Solution.cpp',
    compileArgs: (tempDir) => [
      'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
      'judge-runner:latest',
      'g++', '-O2', '-std=c++17', '/sandbox/Solution.cpp', '-o', '/sandbox/Solution.out'
    ],
    executeCmd: (timeLimitSec) => `/usr/bin/time -o /sandbox/metrics.txt -f "METRIC_TIME=%e METRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`,
    timeMultiplier: 1.0,
    memoryExtraMb: 64
  },
  java: {
    sourceFile: 'Solution.java',
    compileArgs: (tempDir) => [
      'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
      'judge-runner:latest',
      'javac', '/sandbox/Solution.java'
    ],
    executeCmd: (timeLimitSec) => `/usr/bin/time -o /sandbox/metrics.txt -f "METRIC_TIME=%e METRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s java -Xmx256m -cp /sandbox Solution < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`,
    timeMultiplier: 2.0,
    memoryExtraMb: 128
  },
  python: {
    sourceFile: 'solution.py',
    compileArgs: (tempDir) => [
      'run', '--rm', '--network', 'none', '-v', `${tempDir}:/sandbox`,
      'judge-runner:latest',
      'python3', '-m', 'py_compile', '/sandbox/solution.py'
    ],
    executeCmd: (timeLimitSec) => `/usr/bin/time -o /sandbox/metrics.txt -f "METRIC_TIME=%e METRIC_MEM=%M" timeout -s SIGKILL ${timeLimitSec}s python3 -u /sandbox/solution.py < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt`,
    timeMultiplier: 2.5,
    memoryExtraMb: 64
  }
};

class JudgeService {
  static getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  static normalizeLanguage(lang) {
    const l = (lang || 'cpp').toLowerCase();
    if (l === 'c++') return 'cpp';
    if (l === 'py') return 'python';
    return SUPPORTED_LANGUAGES.includes(l) ? l : 'cpp';
  }

  /**
   * Compiles source code inside the sandboxed Docker runner
   * @param {string} tempDir - Directory containing source code
   * @param {string} language - Target language
   * @returns {{ success: boolean, compile_output: string }}
   */
  static _compileBinary(tempDir, language = 'cpp') {
    const lang = this.normalizeLanguage(language);
    const config = LANGUAGE_CONFIGS[lang] || LANGUAGE_CONFIGS.cpp;

    Logger.info('JudgeService', `Compilation started for language: ${lang}`);

    const compileArgs = config.compileArgs(tempDir);
    const compileRes = spawnSync('docker', compileArgs, { stdio: 'pipe' });
    const stderrMsg = compileRes.stderr ? compileRes.stderr.toString() : '';

    if (compileRes.status !== 0) {
      Logger.warn('JudgeService', `Compilation failed for ${lang}`, stderrMsg);
      return {
        success: false,
        compile_output: stderrMsg || 'Compilation failed'
      };
    }

    Logger.info('JudgeService', `Compilation completed successfully for ${lang}`);
    return { success: true, compile_output: '' };
  }

  /**
   * Executes code with specific stdin inside the sandboxed container
   * @param {string} tempDir - Directory containing executable / script
   * @param {string} input - Stdin data
   * @param {number} timeLimitMs - Timeout in milliseconds
   * @param {number} memoryLimitKb - Memory ceiling in kilobytes
   * @param {string} language - Target language
   */
  static _executeSingle(tempDir, input = '', timeLimitMs = 1000, memoryLimitKb = 262144, language = 'cpp') {
    fs.writeFileSync(path.join(tempDir, 'input.txt'), input || '');

    const lang = this.normalizeLanguage(language);
    const config = LANGUAGE_CONFIGS[lang] || LANGUAGE_CONFIGS.cpp;

    const scaledTimeMs = Math.round(timeLimitMs * config.timeMultiplier);
    const timeLimitSec = (scaledTimeMs / 1000).toFixed(2);
    const memoryMb = Math.ceil(memoryLimitKb / 1024) + config.memoryExtraMb;

    Logger.debug('JudgeService', 'Execution started', { language: lang, scaledTimeMs, memoryMb });

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
      config.executeCmd(timeLimitSec)
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
    if (exitCode === 124 || exitCode === 137 || execTimeMs >= scaledTimeMs) {
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

    if (memUsedKb >= memoryLimitKb + (config.memoryExtraMb * 1024)) {
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

    // Process exited with 0 (clean success)
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
   * Executes submission in specified language inside sandboxed Docker runner against test cases
   */
  static executeSubmission(language = 'cpp', code, testCases, timeLimitMs = 1000, memoryLimitKb = 262144) {
    const lang = this.normalizeLanguage(language);
    const config = LANGUAGE_CONFIGS[lang] || LANGUAGE_CONFIGS.cpp;

    const runId = crypto.randomUUID();
    const tempDir = path.join(process.cwd(), 'temp_runs', runId);
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      const sourcePath = path.join(tempDir, config.sourceFile);
      fs.writeFileSync(sourcePath, code);

      // 1. Compile / Syntax Check
      const compileRes = this._compileBinary(tempDir, lang);
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
        const runRes = this._executeSingle(tempDir, tc.input, timeLimitMs, memoryLimitKb, lang);

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

  // Backward compatibility alias for executeCppSubmission
  static executeCppSubmission(code, testCases, timeLimitMs = 1000, memoryLimitKb = 262144) {
    return this.executeSubmission('cpp', code, testCases, timeLimitMs, memoryLimitKb);
  }

  /**
   * Runs code with custom input and returns stdout/stderr
   * Supports both (language, code, customInput, ...) and legacy (code, customInput, ...)
   */
  static runCustomInput(langOrCode, codeOrInput = '', customInputOrTime = '', timeLimitMs = 1000, memoryLimitKb = 262144) {
    let language = 'cpp';
    let code = '';
    let customInput = '';
    let tLimit = 1000;
    let mLimit = 262144;

    if (SUPPORTED_LANGUAGES.includes(String(langOrCode).toLowerCase()) || langOrCode === 'c++' || langOrCode === 'py') {
      language = this.normalizeLanguage(langOrCode);
      code = codeOrInput;
      customInput = typeof customInputOrTime === 'string' ? customInputOrTime : '';
      tLimit = typeof timeLimitMs === 'number' ? timeLimitMs : 1000;
      mLimit = typeof memoryLimitKb === 'number' ? memoryLimitKb : 262144;
    } else {
      // Legacy signature: runCustomInput(code, customInput, timeLimitMs, memoryLimitKb)
      language = 'cpp';
      code = langOrCode;
      customInput = typeof codeOrInput === 'string' ? codeOrInput : '';
      tLimit = typeof customInputOrTime === 'number' ? customInputOrTime : 1000;
      mLimit = typeof timeLimitMs === 'number' ? timeLimitMs : 262144;
    }

    const config = LANGUAGE_CONFIGS[language] || LANGUAGE_CONFIGS.cpp;
    const runId = crypto.randomUUID();
    const tempDir = path.join(process.cwd(), 'temp_runs', runId);
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      const sourcePath = path.join(tempDir, config.sourceFile);
      fs.writeFileSync(sourcePath, code);

      // 1. Compile
      const compileRes = this._compileBinary(tempDir, language);
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
      const runRes = this._executeSingle(tempDir, customInput, tLimit, mLimit, language);

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
