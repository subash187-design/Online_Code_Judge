module.exports = [
  {
    "id": 88,
    "title": "Climbing Stairs (Fibonacci DP)",
    "slug": "climbing-stairs-fibonacci-dp",
    "description": "You are climbing a staircase. It takes n steps to reach the top.\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n### Input Format\nA single line containing integer n.\n\n### Output Format\nPrint the total number of distinct ways.\n\n### Constraints\n1 <= n <= 45",
    "difficulty": "EASY",
    "topic": "Dynamic Programming",
    "subtopics": [
      "1D DP",
      "Take/skip patterns"
    ],
    "constraints": "1 <= n <= 45.",
    "input_format": "Single integer n.",
    "output_format": "Single integer ways.",
    "examples": [
      {
        "input": "2",
        "output": "2",
        "explanation": "1. 1 step + 1 step, 2. 2 steps."
      },
      {
        "input": "3",
        "output": "3",
        "explanation": "1. 1+1+1, 2. 1+2, 3. 2+1."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "dynamic-programming",
      "math"
    ],
    "stages": [
      {
        "name": "Stage 1: Top-Down Memoization",
        "description": "Recursive transition f(n) = f(n-1) + f(n-2) with memo table in O(N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Space-Optimized Constant State",
        "description": "Maintain previous two values in two variables in O(1) space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "2",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      },
      {
        "input": "10",
        "expected_output": "89",
        "is_sample": false,
        "category": "SCALE"
      }
    ]
  },
  {
    "id": 89,
    "title": "House Robber",
    "slug": "house-robber",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the maximum money you can rob.\n\n### Constraints\n1 <= N <= 10^5\n0 <= nums[i] <= 400",
    "difficulty": "MEDIUM",
    "topic": "Dynamic Programming",
    "subtopics": [
      "1D DP",
      "Take/skip patterns"
    ],
    "constraints": "1 <= N <= 10^5, 0 <= nums[i] <= 400.",
    "input_format": "Line 1: N. Line 2: N integers.",
    "output_format": "Single integer max money.",
    "examples": [
      {
        "input": "4\n1 2 3 1",
        "output": "4",
        "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4."
      },
      {
        "input": "5\n2 7 9 3 1",
        "output": "12",
        "explanation": "Rob house 1 (2), house 3 (9), house 5 (1). Total = 12."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "dynamic-programming",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Linear Recurrence State Transition",
        "description": "dp[i] = max(dp[i-1], dp[i-2] + nums[i]) tracking rob / skip.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n1 2 3 1",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\n2 7 9 3 1",
        "expected_output": "12",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n100",
        "expected_output": "100",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 90,
    "title": "Coin Change (Minimum Coins)",
    "slug": "coin-change-minimum-coins",
    "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\nYou may assume that you have an infinite number of each kind of coin.\n\n### Input Format\nFirst line contains two integers: N (number of denominations) and amount.\nSecond line contains N space-separated integers representing coin values.\n\n### Output Format\nPrint the minimum number of coins, or -1.\n\n### Constraints\n1 <= N <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Dynamic Programming",
    "subtopics": [
      "1D DP",
      "Knapsack"
    ],
    "constraints": "1 <= N <= 12, 0 <= amount <= 10000.",
    "input_format": "Line 1: N amount. Line 2: N coins.",
    "output_format": "Single integer min coins or -1.",
    "examples": [
      {
        "input": "3 11\n1 2 5",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 coins)."
      },
      {
        "input": "1 3\n2",
        "output": "-1",
        "explanation": "Cannot make amount 3 using only 2."
      }
    ],
    "expected_time_complexity": "O(amount * N)",
    "expected_space_complexity": "O(amount)",
    "tags": [
      "dynamic-programming",
      "bfs",
      "knapsack"
    ],
    "stages": [
      {
        "name": "Stage 1: Bottom-Up Unbounded Knapsack DP",
        "description": "dp[i] = min(dp[i], dp[i - coin] + 1) for each coin.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(amount * N)",
        "expected_space_complexity": "O(amount)"
      }
    ],
    "test_cases": [
      {
        "input": "3 11\n1 2 5",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 3\n2",
        "expected_output": "-1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 0\n1",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 91,
    "title": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.\nA subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the length of the longest strictly increasing subsequence.\n\n### Constraints\n1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Dynamic Programming",
    "subtopics": [
      "Subsequence DP",
      "1D DP"
    ],
    "constraints": "1 <= N <= 10^5, -10^4 <= nums[i] <= 10^4.",
    "input_format": "Line 1: N. Line 2: N integers.",
    "output_format": "Single integer length.",
    "examples": [
      {
        "input": "8\n10 9 2 5 3 7 101 18",
        "output": "4",
        "explanation": "The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4."
      }
    ],
    "expected_time_complexity": "O(N log N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "dynamic-programming",
      "binary-search"
    ],
    "stages": [
      {
        "name": "Stage 1: Quadratic DP",
        "description": "dp[i] = max(dp[j] + 1) for all j < i with nums[j] < nums[i] in O(N^2).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N^2)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Patience Sorting Binary Search",
        "description": "Maintain tails array where tails[i] stores smallest tail of all increasing subsequences of length i+1 using lower_bound in O(N log N).",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "8\n10 9 2 5 3 7 101 18",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "6\n0 1 0 3 2 3",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "7\n7 7 7 7 7 7 7",
        "expected_output": "1",
        "is_sample": false,
        "category": "DUPLICATE_HEAVY"
      }
    ]
  },
  {
    "id": 92,
    "title": "Unique Paths in a Grid",
    "slug": "unique-paths-in-a-grid",
    "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\n### Input Format\nA single line containing two integers m and n.\n\n### Output Format\nPrint the total number of unique paths.\n\n### Constraints\n1 <= m, n <= 30",
    "difficulty": "MEDIUM",
    "topic": "Dynamic Programming",
    "subtopics": [
      "Grid DP",
      "2D DP"
    ],
    "constraints": "1 <= m, n <= 30.",
    "input_format": "Two integers m and n.",
    "output_format": "Single integer paths count.",
    "examples": [
      {
        "input": "3 7",
        "output": "28",
        "explanation": "28 distinct paths."
      },
      {
        "input": "3 2",
        "output": "3",
        "explanation": "3 distinct paths."
      }
    ],
    "expected_time_complexity": "O(M * N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "dynamic-programming",
      "math",
      "combinatorics"
    ],
    "stages": [
      {
        "name": "Stage 1: 2D Grid DP Transition",
        "description": "dp[i][j] = dp[i-1][j] + dp[i][j-1] in O(M * N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(M * N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "3 7",
        "expected_output": "28",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 2",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 93,
    "title": "0/1 Knapsack Problem",
    "slug": "0-1-knapsack-problem",
    "description": "You are given N items, each with a given weight and value. You are also given a knapsack with maximum weight capacity W. Select a subset of items to maximize the total value such that the total weight does not exceed W. Each item can be picked at most once.\n\n### Input Format\nFirst line contains two integers N and W.\nSecond line contains N space-separated integers representing item values.\nThird line contains N space-separated integers representing item weights.\n\n### Output Format\nPrint the maximum total value achievable.\n\n### Constraints\n1 <= N <= 1000\n1 <= W <= 1000\n1 <= val[i], wt[i] <= 1000",
    "difficulty": "MEDIUM",
    "topic": "Dynamic Programming",
    "subtopics": [
      "Knapsack",
      "2D DP"
    ],
    "constraints": "1 <= N, W <= 1000.",
    "input_format": "Line 1: N W. Line 2: values. Line 3: weights.",
    "output_format": "Single integer maximum value.",
    "examples": [
      {
        "input": "3 50\n60 100 120\n10 20 30",
        "output": "220",
        "explanation": "Items with weight 20 and 30 give total weight 50 and value 100+120=220."
      }
    ],
    "expected_time_complexity": "O(N * W)",
    "expected_space_complexity": "O(W)",
    "tags": [
      "dynamic-programming",
      "knapsack"
    ],
    "stages": [
      {
        "name": "Stage 1: 1D Rolling Buffer 0/1 Knapsack",
        "description": "Iterate reverse from W down to wt[i]: dp[w] = max(dp[w], dp[w - wt[i]] + val[i]).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N * W)",
        "expected_space_complexity": "O(W)"
      }
    ],
    "test_cases": [
      {
        "input": "3 50\n60 100 120\n10 20 30",
        "expected_output": "220",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 4\n1 2 3\n4 5 1",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 10\n5\n11",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 94,
    "title": "Longest Common Subsequence",
    "slug": "longest-common-subsequence",
    "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\n### Input Format\nFirst line contains string text1.\nSecond line contains string text2.\n\n### Output Format\nPrint the length of the longest common subsequence.\n\n### Constraints\n1 <= length(text1), length(text2) <= 1000\ntext1 and text2 consist of only lowercase English characters.",
    "difficulty": "HARD",
    "topic": "Dynamic Programming",
    "subtopics": [
      "Subsequence DP",
      "2D DP"
    ],
    "constraints": "1 <= |text1|, |text2| <= 1000.",
    "input_format": "Two lines: text1 and text2.",
    "output_format": "Single integer length.",
    "examples": [
      {
        "input": "abcde\nace",
        "output": "3",
        "explanation": "The longest common subsequence is \"ace\" and its length is 3."
      },
      {
        "input": "abc\nabc",
        "output": "3",
        "explanation": "The longest common subsequence is \"abc\"."
      }
    ],
    "expected_time_complexity": "O(M * N)",
    "expected_space_complexity": "O(min(M, N))",
    "tags": [
      "dynamic-programming",
      "string",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: 2D Grid DP Matching",
        "description": "dp[i][j] = dp[i-1][j-1] + 1 if match else max(dp[i-1][j], dp[i][j-1]).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(M * N)",
        "expected_space_complexity": "O(min(M, N))"
      }
    ],
    "test_cases": [
      {
        "input": "abcde\nace",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "abc\nabc",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "abc\ndef",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 95,
    "title": "Edit Distance (Levenshtein)",
    "slug": "edit-distance-levenshtein",
    "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character\n\n### Input Format\nFirst line contains string word1 (or empty line).\nSecond line contains string word2 (or empty line).\n\n### Output Format\nPrint the minimum edit distance.\n\n### Constraints\n0 <= length(word1), length(word2) <= 500\nword1 and word2 consist of lowercase English letters.",
    "difficulty": "HARD",
    "topic": "Dynamic Programming",
    "subtopics": [
      "2D DP",
      "Subsequence DP"
    ],
    "constraints": "0 <= |word1|, |word2| <= 500.",
    "input_format": "Two lines: word1 and word2.",
    "output_format": "Single integer edit distance.",
    "examples": [
      {
        "input": "horse\nros",
        "output": "3",
        "explanation": "horse -> rorse (replace 'h') -> rose (remove 'r') -> ros (remove 'e')."
      },
      {
        "input": "intention\nexecution",
        "output": "5",
        "explanation": "5 operations needed."
      }
    ],
    "expected_time_complexity": "O(M * N)",
    "expected_space_complexity": "O(min(M, N))",
    "tags": [
      "dynamic-programming",
      "string",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Levenshtein Distance Matrix",
        "description": "dp[i][j] = 1 + min(insert, delete, replace) in O(M * N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(M * N)",
        "expected_space_complexity": "O(min(M, N))"
      }
    ],
    "test_cases": [
      {
        "input": "horse\nros",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "intention\nexecution",
        "expected_output": "5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "\na",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 96,
    "title": "Partition Equal Subset Sum",
    "slug": "partition-equal-subset-sum",
    "description": "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= N <= 200\n1 <= nums[i] <= 100",
    "difficulty": "HARD",
    "topic": "Dynamic Programming",
    "subtopics": [
      "Knapsack",
      "Take/skip patterns"
    ],
    "constraints": "1 <= N <= 200, 1 <= nums[i] <= 100.",
    "input_format": "Line 1: N. Line 2: N integers.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "4\n1 5 11 5",
        "output": "true",
        "explanation": "Array partitioned as [1, 5, 5] and [11]."
      },
      {
        "input": "4\n1 2 3 5",
        "output": "false",
        "explanation": "Odd total sum or cannot be split equally."
      }
    ],
    "expected_time_complexity": "O(N * sum)",
    "expected_space_complexity": "O(sum)",
    "tags": [
      "dynamic-programming",
      "knapsack",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Boolean 0/1 Subset Sum DP",
        "description": "Target = sum / 2; check reachability with 1D bitset or boolean dp buffer.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N * Target)",
        "expected_space_complexity": "O(Target)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n1 5 11 5",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\n1 2 3 5",
        "expected_output": "false",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n2",
        "expected_output": "false",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 97,
    "title": "Word Break",
    "slug": "word-break",
    "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\nNote that the same word in the dictionary may be reused multiple times in the segmentation.\n\n### Input Format\nFirst line contains string s.\nSecond line contains integer N (number of words in dictionary).\nNext N lines each contain a dictionary word.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= length(s) <= 300\n1 <= N <= 1000\n1 <= length(wordDict[i]) <= 20",
    "difficulty": "HARD",
    "topic": "Dynamic Programming",
    "subtopics": [
      "1D DP",
      "Subsequence DP"
    ],
    "constraints": "1 <= |s| <= 300, 1 <= N <= 1000.",
    "input_format": "Line 1: s. Line 2: N. Next N lines: words.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "leetcode\n2\nleet\ncode",
        "output": "true",
        "explanation": "\"leetcode\" can be segmented as \"leet code\"."
      },
      {
        "input": "applepenapple\n2\napple\npen",
        "output": "true",
        "explanation": "\"apple pen apple\"."
      }
    ],
    "expected_time_complexity": "O(N * L^2)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "dynamic-programming",
      "string",
      "hash-table",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Boolean Prefix DP Segmentation",
        "description": "dp[i] is true if dp[j] is true and substring s[j..i-1] exists in dictionary hash set.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N * L^2)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "leetcode\n2\nleet\ncode",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "applepenapple\n2\napple\npen",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "catsandog\n5\ncats\ndog\nsand\nand\ncat",
        "expected_output": "false",
        "is_sample": false,
        "category": "EDGE_CASE"
      }
    ]
  }
];
