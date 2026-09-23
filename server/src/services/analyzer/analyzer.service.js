const StructuralScanner = require('./astParser');
const Logger = require('../../utils/logger');

// Asymptotic complexity order (lower number = better performance)
const ASYMPTOTIC_HIERARCHY = {
  'O(1)': 1,
  'O(log N)': 2,
  'O(LOGN)': 2,
  'O(N)': 3,
  'O(N log N)': 4,
  'O(NLOGN)': 4,
  'O(N * M)': 5,
  'O(N*M)': 5,
  'O(N + Q)': 5,
  'O(N+Q)': 5,
  'O(N * Q)': 5,
  'O(N*Q)': 5,
  'O(N^2)': 5,
  'O(N^2 log N)': 6,
  'O(N^2LOGN)': 6,
  'O(N^3)': 7,
  'O(2^N)': 8,
  'O(N!)': 9,
  'Unknown': 99
};

class AnalyzerService {
  /**
   * Synthesizes Big-O time and space complexity based on structural scanner output
   * @param {string} sourceCode - Submitted source code
   * @param {Object} runMetrics - { execution_time_ms, memory_used_kb }
   * @param {string} expectedStageComplexity - e.g. "O(N)", "O(N^2)" (for comparison only)
   * @param {string} language - 'c' | 'cpp' | 'java' | 'python'
   */
  static analyze(sourceCode, runMetrics = {}, expectedStageComplexity = null, language = 'cpp') {
    Logger.info('AnalyzerService', `Complexity analysis started for language: ${language}`);

    try {
      const ast = StructuralScanner.scan(sourceCode, language);
      const detected = [];

      let timeEst = 'O(1)';
      let spaceEst = 'O(1)';
      let approach = 'Direct Computation';
      let confidenceNum = 0.95;
      let reason = 'Constant time computation with no loops';

      // 1. Resolve Space Complexity
      if (ast.vectorDimensions === 2) {
        spaceEst = 'O(N^2)';
        detected.push('2D_CONTAINER');
      } else if (ast.vectorDimensions === 1 || ast.hasHashMap || ast.hasTreeMap || ast.hasHeapAllocation) {
        spaceEst = 'O(N)';
        if (ast.hasHashMap) detected.push('HASH_CONTAINER');
        if (ast.hasTreeMap) detected.push('TREE_CONTAINER');
        if (ast.vectorDimensions === 1) detected.push('1D_CONTAINER');
        if (ast.hasHeapAllocation) detected.push('DYNAMIC_ALLOCATION');
      }

      // 2. Resolve Recursion
      if (ast.hasBranchingRecursion) {
        if (ast.hasMemoization) {
          detected.push('MEMOIZATION_TOP_DOWN_DP');
          timeEst = 'O(N)';
          spaceEst = 'O(N)';
          approach = 'Dynamic Programming (Memoized)';
          confidenceNum = 0.90;
          reason = 'Branching recursion optimized with memoization table';
        } else {
          detected.push('BRANCHING_RECURSION');
          timeEst = 'O(2^N)';
          spaceEst = 'O(N)';
          approach = 'Branching Exhaustive Search';
          confidenceNum = 0.95;
          reason = 'Recursive branching calls without memoization produce exponential complexity O(2^N)';
        }
      } else if (ast.hasHalvingRecursion) {
        detected.push('HALVING_RECURSION');
        timeEst = 'O(log N)';
        approach = 'Divide and Conquer (Halving)';
        confidenceNum = 0.90;
        reason = 'Recursive call divides problem size by 2 at each step';
      } else if (ast.hasLinearRecursion) {
        detected.push('LINEAR_RECURSION');
        timeEst = 'O(N)';
        spaceEst = 'O(N)';
        approach = 'Linear Recursion';
        confidenceNum = 0.85;
        reason = 'Single recursive call decrements problem size by 1';
      } else {
        // 3. Evaluate Loop Trees (Nested & Sequential)
        const evaluatedRoots = ast.rootLoops.map(loop => this._evaluateLoopTree(loop));

        let maxLoopDepth = 0;
        let dominantLoopComplexity = 'O(1)';
        let dominantReason = 'No loops detected';

        for (const er of evaluatedRoots) {
          if (er.depth > maxLoopDepth) {
            maxLoopDepth = er.depth;
            dominantLoopComplexity = er.complexity;
            dominantReason = er.reason;
          } else if (er.depth === maxLoopDepth && this._compareAsymptotic(er.complexity, dominantLoopComplexity) > 0) {
            dominantLoopComplexity = er.complexity;
            dominantReason = er.reason;
          }
        }

        if (maxLoopDepth === 0) {
          timeEst = 'O(1)';
          approach = 'Constant Time / Direct';
          reason = 'Direct computation with no iterations';
        } else if (maxLoopDepth === 1) {
          timeEst = dominantLoopComplexity;
          if (timeEst === 'O(log N)') {
            approach = 'Logarithmic Iteration';
            detected.push('LOGARITHMIC_LOOP');
            reason = 'Single loop stepping by multiplication or division';
          } else {
            approach = ast.hasTwoPointers ? 'Two Pointers Technique' : 'Linear Scan';
            detected.push(ast.hasTwoPointers ? 'TWO_POINTERS' : 'SINGLE_LOOP');
            reason = ast.hasTwoPointers
              ? 'Two pointers traversing array simultaneously'
              : (ast.totalLoopCount > 1 
                  ? `Sequential linear loops (O(${ast.totalLoopCount}N) simplifies to O(N))`
                  : 'Single linear loop over N elements');
          }
        } else if (maxLoopDepth === 2) {
          detected.push('NESTED_LOOPS_DEPTH_2');
          timeEst = dominantLoopComplexity;
          approach = 'Brute Force / Quadratic Iteration';
          reason = dominantReason || 'Two independent loops are nested over N elements';
        } else if (maxLoopDepth >= 3) {
          detected.push(`NESTED_LOOPS_DEPTH_${maxLoopDepth}`);
          timeEst = dominantLoopComplexity;
          approach = 'Cubic / High-Order Exhaustive Search';
          reason = dominantReason || `${maxLoopDepth} loops are nested sequentially`;
        }

        // 4. Combine with Standard Algorithms & Sorting
        if (ast.hasStdSort) {
          detected.push('STD_SORT');
          // If outer loop has std::sort, it becomes O(N^2 log N)
          if (maxLoopDepth >= 1 && dominantLoopComplexity === 'O(N)') {
            timeEst = 'O(N log N)';
            approach = 'Sorting-based Algorithm';
            reason = 'Standard sorting algorithm O(N log N) dominates linear iterations';
          } else if (['O(1)', 'O(log N)'].includes(timeEst)) {
            timeEst = 'O(N log N)';
            approach = 'Sorting-based Algorithm';
            reason = 'Standard sorting algorithm O(N log N)';
          }
        }

        // 5. Binary Search Detection
        if (ast.hasBinarySearch && !ast.hasStdSort) {
          detected.push('BINARY_SEARCH');
          if (maxLoopDepth === 0) {
            timeEst = 'O(log N)';
            approach = 'Binary Search';
            reason = 'Binary search algorithm over logarithmic space';
          } else if (maxLoopDepth === 1) {
            timeEst = 'O(N log N)';
            approach = 'Linear Scan with Binary Search';
            reason = 'Linear loop enclosing binary search lookup';
          }
        }

        // 6. Ordered Tree Map Lookups inside loops
        if (ast.hasTreeMap && maxLoopDepth >= 1 && !ast.hasStdSort) {
          detected.push('TREE_MAP_LOOKUP');
          if (timeEst === 'O(N)') {
            timeEst = 'O(N log N)';
            approach = 'Ordered Tree Map Lookup';
            reason = 'Linear loop with logarithmic balanced tree lookups O(N log N)';
          }
        }
      }

      // 7. Determine Classification & Comparison against Stage Target
      const stageMatch = this._compareWithStage(timeEst, expectedStageComplexity);
      const classification = this._classifyComplexity(timeEst, expectedStageComplexity);

      const confidenceLevel = confidenceNum >= 0.9 ? 'HIGH' : confidenceNum >= 0.7 ? 'MEDIUM' : 'LOW';

      const result = {
        // New structured format (Section 9)
        estimatedComplexity: timeEst,
        spaceComplexity: spaceEst,
        confidence: confidenceNum,
        classification,
        reason,

        // Legacy keys (preserved for database schema and UI components)
        time_complexity: timeEst,
        space_complexity: spaceEst,
        confidence_level: confidenceLevel,
        stage_match_status: stageMatch,
        detected_approach: approach,
        detected_patterns: detected,
        notes: reason
      };

      Logger.info('AnalyzerService', 'Complexity analysis completed', { timeEst, classification });
      return result;

    } catch (err) {
      Logger.error('AnalyzerService', 'Complexity analysis error', err);
      return {
        estimatedComplexity: 'Unknown',
        spaceComplexity: 'O(1)',
        confidence: 0.3,
        classification: 'Unknown',
        reason: 'Static scanner encountered an irregular or non-standard syntax pattern',
        time_complexity: 'Unknown',
        space_complexity: 'Unknown',
        confidence_level: 'LOW',
        stage_match_status: 'UNDETERMINED',
        detected_approach: 'Ad-hoc Solution',
        detected_patterns: [],
        notes: 'Unable to reliably deduce asymptotic bounds'
      };
    }
  }

  /**
   * Evaluates the recursive complexity of a loop and its nested children
   */
  static _evaluateLoopTree(loop) {
    const currentVar = loop.boundVar || 'N';
    const currentIsLog = loop.isLogarithmic;

    if (!loop.children || loop.children.length === 0) {
      const complexity = currentIsLog ? `O(log ${currentVar})` : `O(${currentVar})`;
      return {
        depth: 1,
        complexity,
        vars: [currentVar],
        reason: currentIsLog 
          ? `Single loop stepping logarithmically over ${currentVar}`
          : `Single linear loop over ${currentVar}`
      };
    }

    let maxChildDepth = 0;
    let maxChild = null;

    for (const child of loop.children) {
      const childRes = this._evaluateLoopTree(child);
      if (childRes.depth > maxChildDepth) {
        maxChildDepth = childRes.depth;
        maxChild = childRes;
      }
    }

    const depth = 1 + maxChildDepth;
    const allVars = [currentVar, ...maxChild.vars];

    if (depth === 2) {
      const var1 = allVars[0];
      const var2 = allVars[1];
      if (var1 !== var2 && var2 !== 'I' && var2 !== 'J') {
        return {
          depth: 2,
          complexity: `O(${var1} * ${var2})`,
          vars: allVars,
          reason: `Two nested loops iterating over distinct dimensions ${var1} and ${var2}`
        };
      }
      return {
        depth: 2,
        complexity: 'O(N^2)',
        vars: allVars,
        reason: 'Two independent loops are nested over N elements'
      };
    }

    if (depth === 3) {
      return {
        depth: 3,
        complexity: 'O(N^3)',
        vars: allVars,
        reason: 'Three nested loops over N elements'
      };
    }

    return {
      depth,
      complexity: `O(N^${depth})`,
      vars: allVars,
      reason: `${depth} nested loops over N elements`
    };
  }

  /**
   * Compares two asymptotic complexities. Returns >0 if c1 > c2 (slower), <0 if c1 < c2 (faster), 0 if equal.
   */
  static _compareAsymptotic(c1, c2) {
    const rank1 = ASYMPTOTIC_HIERARCHY[c1] || 5;
    const rank2 = ASYMPTOTIC_HIERARCHY[c2] || 5;
    return rank1 - rank2;
  }

  /**
   * Classifies solution approach relative to stage target
   */
  static _classifyComplexity(detectedTime, expectedTime) {
    if (!expectedTime) {
      const rank = ASYMPTOTIC_HIERARCHY[detectedTime] || 5;
      if (rank <= 3) return 'Optimal';
      if (rank === 4) return 'Near Optimal';
      if (rank <= 6) return 'Brute Force';
      return 'Brute Force';
    }

    const rankDet = ASYMPTOTIC_HIERARCHY[detectedTime];
    const rankExp = ASYMPTOTIC_HIERARCHY[expectedTime];

    if (!rankDet || !rankExp) return 'Unknown';

    if (rankDet === rankExp) {
      return rankDet <= 4 ? 'Optimal' : 'Brute Force';
    }
    if (rankDet < rankExp) {
      return 'Optimal';
    }
    if (rankDet === rankExp + 1) {
      return 'Near Optimal';
    }
    return 'Brute Force';
  }

  /**
   * Compares detected complexity with stage target (never alters detected complexity)
   */
  static _compareWithStage(detectedTime, expectedTime) {
    if (!expectedTime) {
      return 'MATCHES_STAGE_TARGET';
    }

    const norm = (s) => (s || '').replace(/\s+/g, '').toUpperCase();
    if (norm(detectedTime) === norm(expectedTime)) {
      return 'MATCHES_STAGE_TARGET';
    }

    const detectedRank = ASYMPTOTIC_HIERARCHY[detectedTime] || ASYMPTOTIC_HIERARCHY[norm(detectedTime)];
    const expectedRank = ASYMPTOTIC_HIERARCHY[expectedTime] || ASYMPTOTIC_HIERARCHY[norm(expectedTime)];

    if (!detectedRank || !expectedRank) {
      return 'UNDETERMINED';
    }

    if (detectedRank === expectedRank) {
      return 'MATCHES_STAGE_TARGET';
    } else if (detectedRank > expectedRank) {
      return 'POSSIBLY_SUBOPTIMAL';
    } else {
      return 'BETTER_THAN_EXPECTED';
    }
  }
}

module.exports = AnalyzerService;
