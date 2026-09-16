const CppStructuralScanner = require('./astParser');

const ASYMPTOTIC_HIERARCHY = {
  'O(1)': 1,
  'O(log N)': 2,
  'O(N)': 3,
  'O(N log N)': 4,
  'O(N^2)': 5,
  'O(N^3)': 6,
  'O(2^N)': 7
};

class AnalyzerService {
  /**
   * Synthesizes Big-O time and space complexity based on structural scanner output
   * @param {string} sourceCode - Submitted C++ code
   * @param {Object} runMetrics - { execution_time_ms, memory_used_kb }
   * @param {string} expectedStageComplexity - e.g. "O(N)", "O(1)"
   */
  static analyze(sourceCode, runMetrics = {}, expectedStageComplexity = null) {
    try {
      const ast = CppStructuralScanner.scan(sourceCode);
      const detected = [];

      let timeEst = 'Unable to determine reliably';
      let spaceEst = 'O(1)';
      let approach = 'Direct Computation';
      let confidence = 'HIGH';

      // 1. Resolve Space Complexity
      if (ast.vectorDimensions === 2) {
        spaceEst = 'O(N^2)';
        detected.push('2D_CONTAINER');
      } else if (ast.vectorDimensions === 1 || ast.hasHashMap || ast.hasTreeMap || ast.hasHeapAllocation) {
        spaceEst = 'O(N)';
        if (ast.hasHashMap) detected.push('HASH_CONTAINER');
        if (ast.hasTreeMap) detected.push('TREE_CONTAINER');
        if (ast.vectorDimensions === 1) detected.push('1D_CONTAINER');
      }

      // 2. Resolve Top-Down DP vs Exponential Recursion
      if (ast.hasBranchingRecursion) {
        if (ast.hasMemoizationGuard) {
          detected.push('MEMOIZATION_TOP_DOWN_DP');
          timeEst = 'O(N)';
          spaceEst = 'O(N)';
          approach = 'Dynamic Programming (Memoized)';
          confidence = 'MEDIUM';
        } else {
          detected.push('BRANCHING_RECURSION');
          timeEst = 'O(2^N)';
          spaceEst = 'O(N)';
          approach = 'Branching Exhaustive Search / Backtracking';
          confidence = 'HIGH';
        }
      }

      // 3. Resolve Standard Library Sorting and Ordered Tree Lookups
      if (ast.hasStdSort) {
        detected.push('STD_SORT');
        timeEst = 'O(N log N)';
        approach = 'Sorting-based Approach';
      }

      if (ast.hasTreeMap && ast.loopNestingDepth >= 1) {
        detected.push('TREE_MAP_LOOKUP');
        timeEst = 'O(N log N)';
        approach = 'Ordered Tree Map Lookup';
      }

      // 4. Resolve Loop Structures with Multi-Variable Support
      if (!ast.hasBranchingRecursion && !ast.hasStdSort && !(ast.hasTreeMap && ast.loopNestingDepth >= 1)) {
        if (ast.loopNestingDepth === 0) {
          timeEst = 'O(1)';
          approach = 'Constant Time / Direct';
        } else if (ast.loopNestingDepth === 1) {
          timeEst = 'O(N)';
          approach = ast.hasTwoPointers ? 'Two Pointers Technique' : 'Linear Scan';
          if (ast.hasTwoPointers) detected.push('TWO_POINTERS');
          else detected.push('SINGLE_LOOP');
        } else if (ast.loopNestingDepth === 2) {
          detected.push('NESTED_LOOPS_DEPTH_2');
          // Check distinct variable boundaries (e.g. i < n, j < m)
          const uniqueVars = [...new Set(ast.loopBoundVariables)];
          if (uniqueVars.length >= 2) {
            timeEst = `O(${uniqueVars[0]} * ${uniqueVars[1]})`;
          } else {
            timeEst = 'O(N^2)';
          }
          approach = 'Brute Force / Quadratic Iteration';
        } else if (ast.loopNestingDepth >= 3) {
          detected.push('NESTED_LOOPS_DEPTH_3');
          timeEst = 'O(N^3)';
          approach = 'Cubic Exhaustive Search';
        }
      }

      // 5. Binary Search Detection
      if (ast.hasBinarySearch && !ast.hasStdSort) {
        detected.push('BINARY_SEARCH');
        if (ast.loopNestingDepth === 0) {
          timeEst = 'O(log N)';
          approach = 'Binary Search';
        } else if (ast.loopNestingDepth === 1) {
          timeEst = 'O(N log N)';
          approach = 'Linear Scan with Binary Search';
        }
      }

      // 6. Runtime Metric Corroboration
      let notes = null;
      if (runMetrics.execution_time_ms !== undefined) {
        if (timeEst === 'O(N)' && runMetrics.execution_time_ms > 850) {
          confidence = 'MEDIUM';
          notes = 'Higher execution time observed than standard linear bound.';
        } else if (timeEst === 'O(N^2)' && runMetrics.execution_time_ms < 10) {
          notes = 'Fast execution time indicates potential early exit or small test constraint.';
        }
      }

      // 7. Compare with Expected Stage Target
      const matchStatus = this._compareWithStage(timeEst, expectedStageComplexity);

      return {
        detected_approach: approach,
        time_complexity: timeEst,
        space_complexity: spaceEst,
        confidence_level: confidence,
        stage_match_status: matchStatus,
        expected_stage_complexity: expectedStageComplexity || null,
        detected_patterns: detected,
        notes
      };
    } catch (err) {
      console.error('Analyzer error:', err);
      return {
        detected_approach: 'Ad-hoc Solution',
        time_complexity: 'Unable to determine reliably',
        space_complexity: 'Unable to determine reliably',
        confidence_level: 'LOW',
        stage_match_status: 'UNDETERMINED',
        expected_stage_complexity: expectedStageComplexity || null,
        detected_patterns: [],
        notes: 'Static scanner encountered an unusual syntax pattern.'
      };
    }
  }

  static _compareWithStage(detectedTime, expectedTime) {
    if (!expectedTime || !ASYMPTOTIC_HIERARCHY[expectedTime] || !ASYMPTOTIC_HIERARCHY[detectedTime]) {
      return 'UNDETERMINED';
    }
    const detectedRank = ASYMPTOTIC_HIERARCHY[detectedTime];
    const expectedRank = ASYMPTOTIC_HIERARCHY[expectedTime];

    if (detectedRank === expectedRank) return 'MATCHES_STAGE_TARGET';
    if (detectedRank < expectedRank) return 'BETTER_THAN_EXPECTED';
    return 'POSSIBLY_SUBOPTIMAL';
  }
}

module.exports = AnalyzerService;
