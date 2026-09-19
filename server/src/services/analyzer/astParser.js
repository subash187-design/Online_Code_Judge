/**
 * CppStructuralScanner
 * Performs syntax-level pattern and control-flow analysis on C++ source code.
 * Deterministic, in-memory structural analysis without external shell calls.
 */

class CppStructuralScanner {
  /**
   * Scans clean C++ code and extracts structural AST metadata
   * @param {string} sourceCode - Raw C++ source code
   * @returns {Object} patterns & loop tree
   */
  static scan(sourceCode) {
    const cleanCode = this._stripCommentsAndStrings(sourceCode);

    const patterns = {
      rootLoops: [],
      maxLoopNestingDepth: 0,
      totalLoopCount: 0,
      hasStdSort: false,
      hasBinarySearch: false,
      hasTreeMap: false,        // std::map, std::set -> O(log N)
      hasHashMap: false,        // std::unordered_map, std::unordered_set -> O(1)
      hasHeapAllocation: false,  // new int[], malloc, vector
      hasTwoPointers: false,
      hasBranchingRecursion: false,
      hasHalvingRecursion: false,
      hasLinearRecursion: false,
      hasMemoization: false,
      vectorDimensions: 0,
      loopBoundVariables: []
    };

    // 1. Containers and Data Structures
    if (/\bunordered_(map|set)\b/.test(cleanCode)) {
      patterns.hasHashMap = true;
    }
    if (/\b(map|set)\b/.test(cleanCode) && !/\bunordered_(map|set)\b/.test(cleanCode)) {
      patterns.hasTreeMap = true;
    }
    if (/vector\s*<\s*vector\s*</.test(cleanCode) || /\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]/.test(cleanCode)) {
      patterns.vectorDimensions = 2;
    } else if (/vector\s*</.test(cleanCode) || /\b(unordered_map|unordered_set|map|set|list|queue|stack)\b/.test(cleanCode)) {
      patterns.vectorDimensions = 1;
    }
    if (/\bnew\s+[a-zA-Z0-9_]+\s*\[|\bmalloc\s*\(|\bcalloc\s*\(/.test(cleanCode)) {
      patterns.hasHeapAllocation = true;
    }

    // 2. Standard Library Algorithms
    if (/\b(std::)?(sort|stable_sort|partial_sort)\b/.test(cleanCode)) {
      patterns.hasStdSort = true;
    }
    if (/\b(std::)?(binary_search|lower_bound|upper_bound)\b/.test(cleanCode)) {
      patterns.hasBinarySearch = true;
    }

    // 3. Recursion & Memoization Detection
    this._analyzeRecursion(cleanCode, patterns);

    // 4. Accurate Loop Control Flow Tree
    this._analyzeLoops(cleanCode, patterns);

    // 5. Two Pointers Pattern
    if (
      patterns.maxLoopNestingDepth === 1 &&
      /\b(left|\bl\b|start|low|ptr1)\s*(\+\+|\+=)/.test(cleanCode) &&
      /\b(right|\br\b|end|high|ptr2)\s*(\-\-|\-=)/.test(cleanCode)
    ) {
      patterns.hasTwoPointers = true;
    }

    return patterns;
  }

  /**
   * Parses loop headers and statement bodies to construct a precise loop nesting tree
   */
  static _analyzeLoops(cleanCode, patterns) {
    const loopHeaderRegex = /\b(for|while)\s*\(/g;
    let match;
    const allLoops = [];

    while ((match = loopHeaderRegex.exec(cleanCode)) !== null) {
      const loopType = match[1];
      const startIndex = match.index;
      const parenStart = match.index + match[0].length - 1;

      // Match balanced parentheses for the loop header
      let parenDepth = 1;
      let parenEnd = parenStart + 1;
      while (parenEnd < cleanCode.length && parenDepth > 0) {
        if (cleanCode[parenEnd] === '(') parenDepth++;
        else if (cleanCode[parenEnd] === ')') parenDepth--;
        parenEnd++;
      }
      const headerContent = cleanCode.slice(parenStart + 1, parenEnd - 1);

      // Locate start of the loop body
      let bodyStart = parenEnd;
      while (bodyStart < cleanCode.length && /\s/.test(cleanCode[bodyStart])) {
        bodyStart++;
      }

      let bodyEnd = bodyStart;
      if (cleanCode[bodyStart] === '{') {
        // Compound statement body
        let braceDepth = 1;
        bodyEnd = bodyStart + 1;
        while (bodyEnd < cleanCode.length && braceDepth > 0) {
          if (cleanCode[bodyEnd] === '{') braceDepth++;
          else if (cleanCode[bodyEnd] === '}') braceDepth--;
          bodyEnd++;
        }
      } else {
        // Single statement body (ends at ';')
        let subBraceDepth = 0;
        let subParenDepth = 0;
        bodyEnd = bodyStart;
        while (bodyEnd < cleanCode.length) {
          const ch = cleanCode[bodyEnd];
          if (ch === '{') subBraceDepth++;
          else if (ch === '}') subBraceDepth--;
          else if (ch === '(') subParenDepth++;
          else if (ch === ')') subParenDepth--;
          else if (ch === ';' && subBraceDepth === 0 && subParenDepth === 0) {
            bodyEnd++;
            break;
          }
          bodyEnd++;
        }
      }

      // Determine step complexity and bound variable
      let isLogarithmic = false;
      let boundVar = 'N';

      if (loopType === 'for') {
        const parts = headerContent.split(';');
        if (parts.length >= 3) {
          const cond = parts[1];
          const step = parts[2];
          if (/\*=|>>=|\/=|i\s*=\s*i\s*\*|i\s*=\s*i\s*\/|\bpow\b/.test(step)) {
            isLogarithmic = true;
          }
          const bMatch = cond.match(/[<>=!]+\s*([a-zA-Z0-9_]+)/);
          if (bMatch && !['0', 'true', 'false', 'NULL'].includes(bMatch[1])) {
            boundVar = bMatch[1].toUpperCase();
          }
        }
      } else if (loopType === 'while') {
        const bodySlice = cleanCode.slice(bodyStart, bodyEnd);
        if (/\/\s*2|>>\s*1|\*=|>>=|\/=|mid\s*=/.test(bodySlice) || /\b(low|high)\b/.test(headerContent)) {
          isLogarithmic = true;
        }
        const bMatch = headerContent.match(/[<>=!]+\s*([a-zA-Z0-9_]+)/);
        if (bMatch && !['0', 'true', 'false', 'NULL'].includes(bMatch[1])) {
          boundVar = bMatch[1].toUpperCase();
        }
      }

      allLoops.push({
        startIndex,
        bodyStart,
        bodyEnd,
        loopType,
        headerContent,
        isLogarithmic,
        boundVar,
        children: []
      });
    }

    // Build containment tree
    allLoops.sort((a, b) => a.startIndex - b.startIndex || (b.bodyEnd - b.startIndex) - (a.bodyEnd - a.startIndex));

    function insertLoop(parent, loop) {
      for (const child of parent.children) {
        if (loop.startIndex >= child.bodyStart && loop.bodyEnd <= child.bodyEnd) {
          insertLoop(child, loop);
          return;
        }
      }
      parent.children.push(loop);
    }

    const rootLoops = [];
    for (const loop of allLoops) {
      let inserted = false;
      for (const root of rootLoops) {
        if (loop.startIndex >= root.bodyStart && loop.bodyEnd <= root.bodyEnd) {
          insertLoop(root, loop);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        rootLoops.push(loop);
      }
    }

    patterns.rootLoops = rootLoops;
    patterns.totalLoopCount = allLoops.length;

    // Calculate maximum nesting depth
    function getDepth(node) {
      if (!node.children || node.children.length === 0) return 1;
      return 1 + Math.max(...node.children.map(getDepth));
    }

    patterns.maxLoopNestingDepth = rootLoops.length > 0 
      ? Math.max(...rootLoops.map(getDepth))
      : 0;

    patterns.loopBoundVariables = allLoops.map(l => l.boundVar);
  }

  /**
   * Accurately analyzes recursion strictly inside defined function bodies
   */
  static _analyzeRecursion(cleanCode, patterns) {
    const funcDefs = [...cleanCode.matchAll(/(?:int|void|long|bool|double|string|auto)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g)];

    for (const f of funcDefs) {
      const fnName = f[1];
      if (['main', 'ios_base', 'cin', 'cout'].includes(fnName)) continue;

      // Extract function body between balanced { and }
      const bodyStart = f.index + f[0].length;
      let braceDepth = 1;
      let bodyEnd = bodyStart;
      while (bodyEnd < cleanCode.length && braceDepth > 0) {
        if (cleanCode[bodyEnd] === '{') braceDepth++;
        else if (cleanCode[bodyEnd] === '}') braceDepth--;
        bodyEnd++;
      }
      const funcBody = cleanCode.slice(bodyStart, bodyEnd);

      // Check recursive calls inside the body
      const callMatches = [...funcBody.matchAll(new RegExp(`\\b${fnName}\\s*\\(([^)]*)\\)`, 'g'))];

      if (callMatches.length >= 2) {
        patterns.hasBranchingRecursion = true;
        if (/memo|dp|cache|table/.test(funcBody) || /memo|dp|cache|table/.test(cleanCode)) {
          patterns.hasMemoization = true;
        }
      } else if (callMatches.length === 1) {
        const callArgs = callMatches[0][1];
        if (/\/\s*2|>>\s*1/.test(callArgs)) {
          patterns.hasHalvingRecursion = true;
        } else if (/-\s*1|--/.test(callArgs)) {
          patterns.hasLinearRecursion = true;
        }
      }
    }
  }

  /**
   * Strips comments and string/char literals safely
   */
  static _stripCommentsAndStrings(code) {
    return code
      .replace(/\/\/.*$/gm, '')           // Single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')   // Multi-line comments
      .replace(/"(?:[^"\\]|\\.)*"/g, '""') // String literals
      .replace(/'(?:[^'\\]|\\.)*'/g, "''"); // Char literals
  }
}

module.exports = CppStructuralScanner;
