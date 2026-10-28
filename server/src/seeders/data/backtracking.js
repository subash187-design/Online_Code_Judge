module.exports = [
  {
    id: 103,
    title: "Subsets (Power Set)",
    slug: "subsets-power-set",
    description: "Given an integer array nums of unique elements, generate all possible subsets (the power set).\n\nOutput the total count of subsets on the first line, followed by each subset on a new line (elements sorted, subsets sorted by size then lexicographically). An empty subset is represented by an empty line.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nFirst line: integer representing total number of subsets (2^N).\nNext 2^N lines: space-separated integers of each subset.\n\n### Constraints\n1 <= N <= 10\n-10 <= nums[i] <= 10\nAll elements of nums are unique.",
    difficulty: "MEDIUM",
    topic: "Backtracking",
    subtopics: ["Subsets", "Combinations"],
    constraints: "1 <= N <= 10, -10 <= nums[i] <= 10, all elements unique.",
    input_format: "Line 1: N. Line 2: N unique space-separated integers.",
    output_format: "Total count followed by each subset on a separate line.",
    examples: [
      {
        input: "3\n1 2 3",
        output: "8\n\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3",
        explanation: "All 8 subsets of {1, 2, 3}."
      }
    ],
    expected_time_complexity: "O(N * 2^N)",
    expected_space_complexity: "O(N)",
    tags: ["backtracking", "recursion", "bit-manipulation"],
    stages: [
      {
        name: "Stage 1: Recursive Backtracking (Include/Exclude)",
        description: "Generate subsets using a recursive decision tree choosing whether to include each element.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N * 2^N)",
        expected_space_complexity: "O(N)"
      }
    ],
    test_cases: [
      {
        input: "3\n1 2 3",
        expected_output: "8\n\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1\n0",
        expected_output: "2\n\n0",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "2\n4 7",
        expected_output: "4\n\n4\n7\n4 7",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 104,
    title: "Permutations of Distinct Integers",
    slug: "permutations-of-distinct-integers",
    description: "Given an array nums of distinct integers, return all the possible permutations in lexicographically sorted order.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nFirst line contains the total count of permutations (N!).\nNext N! lines each contain space-separated integers of one permutation.\n\n### Constraints\n1 <= N <= 6\n-10 <= nums[i] <= 10\nAll elements of nums are unique.",
    difficulty: "MEDIUM",
    topic: "Backtracking",
    subtopics: ["Permutations", "DFS"],
    constraints: "1 <= N <= 6, all elements unique.",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "Total count followed by each permutation on a new line.",
    examples: [
      {
        input: "3\n1 2 3",
        output: "6\n1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
        explanation: "All 6 permutations of [1, 2, 3] in sorted order."
      }
    ],
    expected_time_complexity: "O(N * N!)",
    expected_space_complexity: "O(N)",
    tags: ["backtracking", "recursion"],
    stages: [
      {
        name: "Stage 1: Backtracking Permutation Generation",
        description: "Construct permutations recursively by maintaining visited state and swapping back on return.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N * N!)",
        expected_space_complexity: "O(N)"
      }
    ],
    test_cases: [
      {
        input: "3\n1 2 3",
        expected_output: "6\n1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1\n5",
        expected_output: "1\n5",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "2\n2 1",
        expected_output: "2\n1 2\n2 1",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 105,
    title: "Combination Sum",
    slug: "combination-sum",
    description: "Given an array of distinct integers candidates and a target integer target, return all unique combinations of candidates where the chosen numbers sum to target.\nYou may return the combinations in any order, but the candidates may be chosen from the array an unlimited number of times.\n\nPrint the total number of combinations, followed by each combination sorted in ascending order on a separate line.\n\n### Input Format\nLine 1: Two integers N and target.\nLine 2: N distinct space-separated integers.\n\n### Output Format\nFirst line: integer count of valid combinations.\nEach subsequent line: space-separated integers of a valid combination.\n\n### Constraints\n1 <= N <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40",
    difficulty: "MEDIUM",
    topic: "Backtracking",
    subtopics: ["Combinations", "Target Sum"],
    constraints: "1 <= N <= 30, 2 <= candidates[i] <= 40, 1 <= target <= 40.",
    input_format: "Line 1: N target. Line 2: candidates.",
    output_format: "Count followed by space-separated combinations.",
    examples: [
      {
        input: "4 7\n2 3 6 7",
        output: "2\n2 2 3\n7",
        explanation: "2 and 3 can be chosen multiple times: 2+2+3=7. Also 7=7."
      }
    ],
    expected_time_complexity: "O(2^T)",
    expected_space_complexity: "O(T)",
    tags: ["backtracking", "recursion"],
    stages: [
      {
        name: "Stage 1: Pruned Backtracking Exploration",
        description: "Sort candidates and recursively subtract while pruning branches when remaining target < candidate.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(2^T)",
        expected_space_complexity: "O(T)"
      }
    ],
    test_cases: [
      {
        input: "4 7\n2 3 6 7",
        expected_output: "2\n2 2 3\n7",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3 8\n2 3 5",
        expected_output: "3\n2 2 2 2\n2 3 3\n3 5",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1 2\n2",
        expected_output: "1\n2",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 106,
    title: "Generate Parentheses",
    slug: "generate-parentheses",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses in lexicographical order.\n\n### Input Format\nA single integer n.\n\n### Output Format\nPrint each well-formed combination on a new line in lexicographical order.\n\n### Constraints\n1 <= n <= 8",
    difficulty: "MEDIUM",
    topic: "Backtracking",
    subtopics: ["Strings", "Recursion"],
    constraints: "1 <= n <= 8",
    input_format: "Single integer n.",
    output_format: "All valid parentheses strings, one per line.",
    examples: [
      {
        input: "3",
        output: "((()))\n(()())\n(())()\n()(())\n()()()",
        explanation: "All 5 valid combinations for n=3 in sorted order."
      }
    ],
    expected_time_complexity: "O(4^N / sqrt(N))",
    expected_space_complexity: "O(N)",
    tags: ["backtracking", "string", "dynamic-programming"],
    stages: [
      {
        name: "Stage 1: Constrained Backtracking with Open/Close Counters",
        description: "Track open and close count: place '(' if open < n, place ')' if close < open.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(4^N / sqrt(N))",
        expected_space_complexity: "O(N)"
      }
    ],
    test_cases: [
      {
        input: "3",
        expected_output: "((()))\n(()())\n(())()\n()(())\n()()()",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1",
        expected_output: "()",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "2",
        expected_output: "(())()\n()()",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 107,
    title: "Word Search in a Grid",
    slug: "word-search-in-a-grid",
    description: "Given an M x N grid of characters board and a string word, return true if word exists in the grid, otherwise false.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.\n\n### Input Format\nLine 1: Two integers M and N.\nNext M lines: String of length N representing each row of the board.\nLast line: The target word.\n\n### Output Format\nPrint true or false.\n\n### Constraints\n1 <= M, N <= 6\n1 <= word.length <= 15\nboard and word consist of only uppercase English letters.",
    difficulty: "MEDIUM",
    topic: "Backtracking",
    subtopics: ["Grid DFS", "Backtracking"],
    constraints: "1 <= M, N <= 6, 1 <= word.length <= 15.",
    input_format: "Line 1: M N. Next M lines: row characters. Line M+2: word.",
    output_format: "true or false.",
    examples: [
      {
        input: "3 4\nABCE\nSFCS\nADEE\nABCCED",
        output: "true",
        explanation: "ABCCED is traced: (0,0)->(0,1)->(0,2)->(1,2)->(2,2)->(2,1)."
      }
    ],
    expected_time_complexity: "O(M * N * 4^L)",
    expected_space_complexity: "O(L)",
    tags: ["backtracking", "matrix", "dfs"],
    stages: [
      {
        name: "Stage 1: 4-Directional DFS with In-Place Visited Marking",
        description: "Explore 4 directions recursively, temporarily marking visited cell with '#' and restoring upon backtracking.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(M * N * 4^L)",
        expected_space_complexity: "O(L)"
      }
    ],
    test_cases: [
      {
        input: "3 4\nABCE\nSFCS\nADEE\nABCCED",
        expected_output: "true",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3 4\nABCE\nSFCS\nADEE\nSEE",
        expected_output: "true",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3 4\nABCE\nSFCS\nADEE\nABCB",
        expected_output: "false",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 108,
    title: "N-Queens Solutions Count",
    slug: "n-queens-solutions-count",
    description: "The N-queens puzzle is the problem of placing N chess queens on an N x N chessboard so that no two queens attack each other.\n\nGiven an integer N, return the total number of distinct solutions to the N-queens puzzle.\n\n### Input Format\nA single integer N.\n\n### Output Format\nPrint a single integer denoting the number of distinct valid placements.\n\n### Constraints\n1 <= N <= 12",
    difficulty: "HARD",
    topic: "Backtracking",
    subtopics: ["Chessboard", "Bitmask"],
    constraints: "1 <= N <= 12",
    input_format: "Single integer N.",
    output_format: "Single integer total solutions count.",
    examples: [
      {
        input: "4",
        output: "2",
        explanation: "There are two distinct solutions to the 4-queens puzzle."
      },
      {
        input: "1",
        output: "1",
        explanation: "1 queen on 1x1 board has 1 solution."
      }
    ],
    expected_time_complexity: "O(N!)",
    expected_space_complexity: "O(N)",
    tags: ["backtracking", "recursion"],
    stages: [
      {
        name: "Stage 1: Diagonal and Column Constraint Backtracking",
        description: "Place queens row by row, pruning invalid columns and diagonals (row-col, row+col) with boolean lookup sets.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N!)",
        expected_space_complexity: "O(N)"
      }
    ],
    test_cases: [
      {
        input: "4",
        expected_output: "2",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1",
        expected_output: "1",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "5",
        expected_output: "10",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "8",
        expected_output: "92",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 109,
    title: "Jump Game (Can Reach End)",
    slug: "jump-game-can-reach-end",
    description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers nums.\n\n### Output Format\nPrint true or false.\n\n### Constraints\n1 <= N <= 10^5\n0 <= nums[i] <= 10^5",
    difficulty: "MEDIUM",
    topic: "Greedy / Heap / Intervals",
    subtopics: ["Greedy Reach"],
    constraints: "1 <= N <= 10^5, 0 <= nums[i] <= 10^5.",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "true or false.",
    examples: [
      {
        input: "5\n2 3 1 1 4",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      },
      {
        input: "5\n3 2 1 0 4",
        output: "false",
        explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
      }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["greedy", "array", "dynamic-programming"],
    stages: [
      {
        name: "Stage 1: Farthest Reach Greedy Tracking",
        description: "Maintain maximum index reachable so far; if current index exceeds max reachable, return false; otherwise update max reach.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N)",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "5\n2 3 1 1 4",
        expected_output: "true",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "5\n3 2 1 0 4",
        expected_output: "false",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1\n0",
        expected_output: "true",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "4\n0 2 3 4",
        expected_output: "false",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  },
  {
    id: 110,
    title: "Gas Station (Circular Tour)",
    slug: "gas-station-circular-tour",
    description: "There are N gas stations along a circular route, where the amount of gas at the ith station is gas[i].\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.\n\n### Input Format\nLine 1: Integer N.\nLine 2: N space-separated integers representing gas.\nLine 3: N space-separated integers representing cost.\n\n### Output Format\nPrint the 0-indexed starting station index, or -1.\n\n### Constraints\n1 <= N <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
    difficulty: "MEDIUM",
    topic: "Greedy / Heap / Intervals",
    subtopics: ["Greedy Deficit"],
    constraints: "1 <= N <= 10^5, 0 <= gas[i], cost[i] <= 10^4.",
    input_format: "Line 1: N. Line 2: N gas values. Line 3: N cost values.",
    output_format: "Single integer starting index or -1.",
    examples: [
      {
        input: "5\n1 2 3 4 5\n3 4 5 1 2",
        output: "3",
        explanation: "Start at station 3 (index 3) and fill up with 4 unit of gas. Complete circuit safely."
      },
      {
        input: "3\n2 3 4\n3 4 3",
        output: "-1",
        explanation: "Total gas 9 < total cost 10, so impossible to complete circuit."
      }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["greedy", "array"],
    stages: [
      {
        name: "Stage 1: Running Tank Balance & Reset",
        description: "If total gas < total cost, return -1. Otherwise, if current tank falls below 0, reset start station to i + 1 in single pass O(N).",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N)",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "5\n1 2 3 4 5\n3 4 5 1 2",
        expected_output: "3",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3\n2 3 4\n3 4 3",
        expected_output: "-1",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "2\n3 1\n2 2",
        expected_output: "0",
        is_sample: false,
        category: "BOUNDARY"
      }
    ]
  }
];
