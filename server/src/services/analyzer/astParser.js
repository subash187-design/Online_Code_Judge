/**
 * CppStructuralScanner
 * Performs token-level and syntax-level pattern analysis on C++ source code.
 * Safe, in-memory, deterministic analysis without invoking external shell or compiler.
 */
class CppStructuralScanner {
  static scan(sourceCode) {
    const cleanCode = this._stripCommentsAndStrings(sourceCode);

    const patterns = {
      loopNestingDepth: 0,
      loopBoundVariables: [],
      hasStdSort: false,
      hasBinarySearch: false,
      hasTreeMap: false,        // std::map, std::set -> O(log N)
      hasHashMap: false,        // std::unordered_map, std::unordered_set -> O(1)
      hasHeapAllocation: false,  // new int[], malloc, vector
      hasTwoPointers: false,
      hasBranchingRecursion: false,
      hasMemoizationGuard: false,
      vectorDimensions: 0
    };

    // 1. Analyze Loop Nesting Depth & Bound Variables
    this._analyzeLoops(cleanCode, patterns);

    // 2. Analyze Algorithms & Library Calls
    if (/\b(std::)?(sort|stable_sort|partial_sort)\b/.test(cleanCode)) {
      patterns.hasStdSort = true;
    }
    if (/\b(std::)?(binary_search|lower_bound|upper_bound)\b/.test(cleanCode)) {
      patterns.hasBinarySearch = true;
    }

    // 3. Analyze Containers (Exact matching to distinguish map vs unordered_map)
    if (/\bunordered_(map|set)\b/.test(cleanCode)) {
      patterns.hasHashMap = true;
    }
    if (/\b(map|set)\b/.test(cleanCode) && !/\bunordered_(map|set)\b/.test(cleanCode)) {
      patterns.hasTreeMap = true;
    }

    // Vector dimensions
    if (/vector\s*<\s*vector\s*</.test(cleanCode)) {
      patterns.vectorDimensions = Math.max(patterns.vectorDimensions, 2);
    } else if (/vector\s*</.test(cleanCode)) {
      patterns.vectorDimensions = Math.max(patterns.vectorDimensions, 1);
    }

    // Heap allocation
    if (/\bnew\s+[a-zA-Z0-9_]+\s*\[|\bmalloc\s*\(|\bcalloc\s*\(/.test(cleanCode)) {
      patterns.hasHeapAllocation = true;
    }

    // 4. Two-Pointer Heuristic (two variable increments/decrements in single loop)
    if (
      patterns.loopNestingDepth === 1 &&
      /\b(left|\bl\b|start|low|ptr1)\s*(\+\+|\+=)/.test(cleanCode) &&
      /\b(right|\br\b|end|high|ptr2)\s*(\-\-|\-=)/.test(cleanCode)
    ) {
      patterns.hasTwoPointers = true;
    }

    // 5. Recursion & Memoization Detection
    this._analyzeRecursion(cleanCode, patterns);

    return patterns;
  }

  static _analyzeLoops(code, patterns) {
    let maxDepth = 0;
    let currentDepth = 0;
    const depthStack = [];

    // Tokenize by braces and loop keywords
    const tokens = code.match(/for\s*\(|while\s*\(|\{|\}/g) || [];

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok.startsWith('for') || tok.startsWith('while')) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
        depthStack.push('LOOP');
      } else if (tok === '{') {
        depthStack.push('{');
      } else if (tok === '}') {
        if (depthStack.length > 0) {
          const popped = depthStack.pop();
          if (popped === 'LOOP') currentDepth = Math.max(0, currentDepth - 1);
        }
      }
    }

    patterns.loopNestingDepth = maxDepth;

    // Extract loop bound variables (e.g. i < n, j < m)
    const conditionMatches = [...code.matchAll(/for\s*\([^;]*;\s*[^;<>=]+[<>=]+\s*([a-zA-Z0-9_]+)\s*;/g)];
    const bounds = conditionMatches.map(m => m[1]).filter(b => !['0', 'true', 'false', 'NULL'].includes(b));
    patterns.loopBoundVariables = bounds;
  }

  static _analyzeRecursion(code, patterns) {
    // Find defined functions
    const funcMatches = [...code.matchAll(/(?:int|void|long|bool|double|string)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g)];

    for (const match of funcMatches) {
      const funcName = match[1];
      if (['main', 'ios_base', 'cin', 'cout'].includes(funcName)) continue;

      const callRegex = new RegExp(`\\b${funcName}\\s*\\(`, 'g');
      const callCount = (code.match(callRegex) || []).length;

      if (callCount >= 3) { // 1 in definition, 2+ inside body -> Branching recursion
        patterns.hasBranchingRecursion = true;
      }

      // Check for memoization table lookups
      if (/memo\[|dp\[|cache\[/.test(code) && /return\s+(memo|dp|cache)\[/.test(code)) {
        patterns.hasMemoizationGuard = true;
      }
    }
  }

  static _stripCommentsAndStrings(code) {
    return code
      .replace(/\/\/.*$/gm, '')           // Strip single line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')   // Strip multi-line comments
      .replace(/"(?:[^"\\]|\\.)*"/g, '""') // Strip string literals
      .replace(/'(?:[^'\\]|\\.)*'/g, "''"); // Strip char literals
  }
}

module.exports = CppStructuralScanner;
