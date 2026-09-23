/**
 * MultiLanguageStructuralScanner
 * Performs syntax-level pattern and control-flow analysis on C, C++, Java, and Python source code.
 * Deterministic, in-memory structural analysis without external shell calls.
 */

class MultiLanguageStructuralScanner {
  /**
   * Scans clean code and extracts structural AST metadata
   * @param {string} sourceCode - Raw source code
   * @param {string} language - 'c' | 'cpp' | 'java' | 'python'
   * @returns {Object} patterns & loop tree
   */
  static scan(sourceCode, language = 'cpp') {
    const lang = (language || 'cpp').toLowerCase();
    const cleanCode = this._stripCommentsAndStrings(sourceCode, lang);

    const patterns = {
      rootLoops: [],
      maxLoopNestingDepth: 0,
      totalLoopCount: 0,
      hasStdSort: false,
      hasBinarySearch: false,
      hasTreeMap: false,        // std::map, TreeMap -> O(log N)
      hasHashMap: false,        // std::unordered_map, HashMap, dict, set -> O(1)
      hasHeapAllocation: false,  // new int[], malloc, vector, dynamic lists
      hasTwoPointers: false,
      hasBranchingRecursion: false,
      hasHalvingRecursion: false,
      hasLinearRecursion: false,
      hasMemoization: false,
      vectorDimensions: 0,
      loopBoundVariables: []
    };

    if (lang === 'python') {
      this._scanPython(cleanCode, patterns);
    } else {
      // C, C++, Java
      this._scanCStyle(cleanCode, patterns, lang);
    }

    return patterns;
  }

  /**
   * Scans C, C++, and Java syntax
   */
  static _scanCStyle(cleanCode, patterns, lang) {
    // 1. Containers and Data Structures
    if (/\bunordered_(map|set)\b|\bHashMap\b|\bHashSet\b/.test(cleanCode)) {
      patterns.hasHashMap = true;
    }
    if ((/\b(map|set)\b/.test(cleanCode) && !/\bunordered_(map|set)\b/.test(cleanCode)) || /\bTreeMap\b|\bTreeSet\b/.test(cleanCode)) {
      patterns.hasTreeMap = true;
    }
    if (
      /vector\s*<\s*vector\s*</.test(cleanCode) ||
      /\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]/.test(cleanCode) ||
      /new\s+[a-zA-Z0-9_]+\s*\[[^\]]+\]\s*\[[^\]]+\]/.test(cleanCode)
    ) {
      patterns.vectorDimensions = 2;
    } else if (
      /vector\s*</.test(cleanCode) ||
      /\b(unordered_map|unordered_set|map|set|list|queue|stack|ArrayList|LinkedList)\b/.test(cleanCode) ||
      /new\s+[a-zA-Z0-9_]+\s*\[[^\]]+\]/.test(cleanCode)
    ) {
      patterns.vectorDimensions = 1;
    }
    if (/\bnew\s+[a-zA-Z0-9_]+\s*\[|\bmalloc\s*\(|\bcalloc\s*\(/.test(cleanCode)) {
      patterns.hasHeapAllocation = true;
    }

    // 2. Standard Library Algorithms
    if (/\b(std::)?(sort|stable_sort|partial_sort)\b|\bArrays\.sort\b|\bCollections\.sort\b/.test(cleanCode)) {
      patterns.hasStdSort = true;
    }
    if (/\b(std::)?(binary_search|lower_bound|upper_bound)\b|\bbinarySearch\b/.test(cleanCode)) {
      patterns.hasBinarySearch = true;
    }

    // 3. Recursion & Memoization Detection
    this._analyzeRecursionCStyle(cleanCode, patterns);

    // 4. Accurate Loop Control Flow Tree
    this._analyzeLoopsCStyle(cleanCode, patterns);

    // 5. Two Pointers Pattern
    if (
      patterns.maxLoopNestingDepth === 1 &&
      /\b(left|\bl\b|start|low|ptr1)\s*(\+\+|\+=)/.test(cleanCode) &&
      /\b(right|\br\b|end|high|ptr2)\s*(\-\-|\-=)/.test(cleanCode)
    ) {
      patterns.hasTwoPointers = true;
    }
  }

  /**
   * Scans Python syntax
   */
  static _scanPython(cleanCode, patterns) {
    // 1. Containers and Data Structures
    if (/\b(dict|set)\b|\bdefaultdict\b|\bCounter\b|{[^}:]*:[^}]*}|\{[^}]+\}/.test(cleanCode)) {
      patterns.hasHashMap = true;
    }
    if (/\[\s*\[.*for.*in.*\]\s*for.*in.*\]/.test(cleanCode)) {
      patterns.vectorDimensions = 2;
    } else if (/\[.*for.*in.*\]|\blist\b|\[\s*\]/.test(cleanCode)) {
      patterns.vectorDimensions = 1;
    }

    // 2. Standard Algorithms
    if (/\.sort\(|\bsorted\(/.test(cleanCode)) {
      patterns.hasStdSort = true;
    }
    if (/\bbisect(_left|_right)?\b/.test(cleanCode)) {
      patterns.hasBinarySearch = true;
    }

    // 3. Recursion in Python (def fnName)
    const fnMatches = [...cleanCode.matchAll(/def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):/g)];
    for (const fn of fnMatches) {
      const fnName = fn[1];
      if (['main', '__init__'].includes(fnName)) continue;
      const fnRegex = new RegExp(`\\b${fnName}\\s*\\(`, 'g');
      const calls = [...cleanCode.matchAll(fnRegex)];
      if (calls.length >= 3) {
        patterns.hasBranchingRecursion = true;
        if (/@cache|@lru_cache|memo|dp/.test(cleanCode)) {
          patterns.hasMemoization = true;
        }
      } else if (calls.length === 2) {
        patterns.hasLinearRecursion = true;
      }
    }

    // 4. Loop nesting by line indentation
    const lines = cleanCode.split('\n');
    let maxDepth = 0;
    let loopStack = [];
    const simulatedRoots = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const indent = line.search(/\S/);
      // Check if indent returned to an earlier level
      while (loopStack.length > 0 && indent <= loopStack[loopStack.length - 1].indent) {
        loopStack.pop();
      }

      const loopMatch = trimmed.match(/^(for\s+[a-zA-Z0-9_,\s]+\s+in|while\s+)/);
      if (loopMatch) {
        const loopType = loopMatch[1].startsWith('for') ? 'for' : 'while';
        let boundVar = 'N';
        let complexity = 'O(N)';

        if (/range\s*\([^)]*,\s*[^)]*,\s*[^)]*(\/\/|\/)\s*2/.test(trimmed)) {
          complexity = 'O(log N)';
        }

        const loopNode = {
          loopType,
          depth: loopStack.length + 1,
          complexity,
          boundVar,
          children: []
        };

        if (loopStack.length === 0) {
          simulatedRoots.push(loopNode);
        } else {
          loopStack[loopStack.length - 1].node.children.push(loopNode);
        }

        loopStack.push({ indent, node: loopNode });
        patterns.totalLoopCount++;
        maxDepth = Math.max(maxDepth, loopStack.length);
      }
    }

    patterns.rootLoops = simulatedRoots;
    patterns.maxLoopNestingDepth = maxDepth;

    // Two pointers in Python
    if (
      maxDepth === 1 &&
      /\b(left|\bl\b|start|low|ptr1)\s*\+=/.test(cleanCode) &&
      /\b(right|\br\b|end|high|ptr2)\s*-=/.test(cleanCode)
    ) {
      patterns.hasTwoPointers = true;
    }
  }

  /**
   * Parses loop headers and statement bodies for C-style languages
   */
  static _analyzeLoopsCStyle(cleanCode, patterns) {
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
        let braceDepth = 1;
        bodyEnd = bodyStart + 1;
        while (bodyEnd < cleanCode.length && braceDepth > 0) {
          if (cleanCode[bodyEnd] === '{') braceDepth++;
          else if (cleanCode[bodyEnd] === '}') braceDepth--;
          bodyEnd++;
        }
      } else {
        // Single statement loop
        while (bodyEnd < cleanCode.length && cleanCode[bodyEnd] !== ';') {
          bodyEnd++;
        }
        bodyEnd++;
      }

      // Determine step complexity
      let complexity = 'O(N)';
      let boundVar = 'N';

      if (/\*=\s*2|\/=\s*2|>>=\s*1|<<=\s*1/.test(headerContent)) {
        complexity = 'O(log N)';
      }

      allLoops.push({
        loopType,
        startIndex,
        bodyStart,
        bodyEnd,
        complexity,
        boundVar,
        children: []
      });
    }

    // Build hierarchy
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
   * Analyzes recursion for C-style languages
   */
  static _analyzeRecursionCStyle(cleanCode, patterns) {
    const funcDefs = [...cleanCode.matchAll(/(?:int|void|long|bool|double|string|auto|public|private|static)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g)];

    for (const f of funcDefs) {
      const fnName = f[1];
      if (['main', 'ios_base', 'cin', 'cout'].includes(fnName)) continue;

      const bodyStart = f.index + f[0].length;
      let braceDepth = 1;
      let bodyEnd = bodyStart;
      while (bodyEnd < cleanCode.length && braceDepth > 0) {
        if (cleanCode[bodyEnd] === '{') braceDepth++;
        else if (cleanCode[bodyEnd] === '}') braceDepth--;
        bodyEnd++;
      }
      const funcBody = cleanCode.slice(bodyStart, bodyEnd);

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
   * Strips comments and string/char literals safely according to language rules
   */
  static _stripCommentsAndStrings(code, lang = 'cpp') {
    if (lang === 'python') {
      return code
        .replace(/'''[\s\S]*?'''/g, '')
        .replace(/"""[\s\S]*?"""/g, '')
        .replace(/#.*$/gm, '')
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''");
    }

    return code
      .replace(/\/\/.*$/gm, '')           // Single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')   // Multi-line comments
      .replace(/"(?:[^"\\]|\\.)*"/g, '""') // String literals
      .replace(/'(?:[^'\\]|\\.)*'/g, "''"); // Char literals
  }
}

module.exports = MultiLanguageStructuralScanner;
