module.exports = [
  {
    "id": 28,
    "title": "Move Zeroes to End",
    "slug": "move-zeroes-to-end",
    "description": "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.\nNote that you must do this in-place without making a copy of the array.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the modified array as N space-separated integers.\n\n### Constraints\n1 <= N <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1",
    "difficulty": "EASY",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Two-pointer problems",
      "Array manipulation"
    ],
    "constraints": "1 <= N <= 10^5, -2^31 <= nums[i] <= 2^31 - 1",
    "input_format": "Line 1: N. Line 2: N space-separated integers.",
    "output_format": "N space-separated integers.",
    "examples": [
      {
        "input": "5\n0 1 0 3 12",
        "output": "1 3 12 0 0",
        "explanation": "All zeros are moved to the end, non-zeros maintain order."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "two-pointers",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Auxiliary Non-Zero Collection",
        "description": "Collect non-zeros into secondary array and pad zeros in O(N) space.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Two-Pointer Swap",
        "description": "Keep a slow pointer for next non-zero write position and fast pointer to scan in O(1) space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n0 1 0 3 12",
        "expected_output": "1 3 12 0 0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n0",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\n1 2 3 4",
        "expected_output": "1 2 3 4",
        "is_sample": false,
        "category": "BOUNDARY"
      },
      {
        "input": "4\n0 0 0 1",
        "expected_output": "1 0 0 0",
        "is_sample": false,
        "category": "EDGE_CASE"
      }
    ]
  },
  {
    "id": 29,
    "title": "Remove Duplicates from Sorted Array",
    "slug": "remove-duplicates-from-sorted-array",
    "description": "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\nPrint the number of unique elements K, followed by the K unique elements.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers in sorted order.\n\n### Output Format\nFirst line: integer K (number of unique elements).\nSecond line: K space-separated integers representing the unique elements.\n\n### Constraints\n1 <= N <= 10^5\n-100 <= nums[i] <= 100",
    "difficulty": "EASY",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Two-pointer problems",
      "Array manipulation"
    ],
    "constraints": "1 <= N <= 10^5, -100 <= nums[i] <= 100.",
    "input_format": "Line 1: N. Line 2: N sorted integers.",
    "output_format": "Line 1: K. Line 2: K unique elements.",
    "examples": [
      {
        "input": "5\n1 1 2 2 3",
        "output": "3\n1 2 3",
        "explanation": "Unique elements are 1, 2, 3."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "two-pointers",
      "array",
      "in-place"
    ],
    "stages": [
      {
        "name": "Stage 1: Read/Write Pointers",
        "description": "Advance write pointer only when current element differs from previous.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n1 1 2 2 3",
        "expected_output": "3\n1 2 3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "10\n0 0 1 1 1 2 2 3 3 4",
        "expected_output": "5\n0 1 2 3 4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n5",
        "expected_output": "1\n5",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 30,
    "title": "Squaring a Sorted Array",
    "slug": "squaring-a-sorted-array",
    "description": "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers sorted non-decreasingly.\n\n### Output Format\nPrint N space-separated squared integers in sorted order.\n\n### Constraints\n1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
    "difficulty": "EASY",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Two-pointer problems",
      "Array manipulation"
    ],
    "constraints": "1 <= N <= 10^5, -10^4 <= nums[i] <= 10^4.",
    "input_format": "Line 1: N. Line 2: N sorted integers.",
    "output_format": "N sorted squared integers.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 10",
        "output": "0 1 9 16 100",
        "explanation": "Squares: [16, 1, 0, 9, 100]. Sorted: [0, 1, 9, 16, 100]."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "two-pointers",
      "sorting"
    ],
    "stages": [
      {
        "name": "Stage 1: Square and Sort",
        "description": "Square all elements and sort using O(N log N) library sort.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(1)"
      },
      {
        "name": "Stage 2: Two-Pointer Converging Endpoints",
        "description": "Compare absolute values at left and right boundaries and fill output from the back in O(N).",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n-4 -1 0 3 10",
        "expected_output": "0 1 9 16 100",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\n-7 -3 2 3 11",
        "expected_output": "4 9 9 49 121",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n-5",
        "expected_output": "25",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 31,
    "title": "Two Sum II (Input Array Is Sorted)",
    "slug": "two-sum-ii-input-array-is-sorted",
    "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.\nReturn the indices of the two numbers (1-indexed) in ascending order.\n\n### Input Format\nFirst line contains two integers N and target.\nSecond line contains N space-separated integers in non-decreasing order.\n\n### Output Format\nPrint two 1-based indices separated by a space.\n\n### Constraints\n2 <= N <= 3 * 10^4\n-1000 <= numbers[i], target <= 1000",
    "difficulty": "MEDIUM",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Two-pointer problems",
      "Pair/triplet problems"
    ],
    "constraints": "2 <= N <= 30000, -1000 <= numbers[i] <= 1000.",
    "input_format": "Line 1: N target. Line 2: N sorted numbers.",
    "output_format": "Two 1-based indices.",
    "examples": [
      {
        "input": "4 9\n2 7 11 15",
        "output": "1 2",
        "explanation": "numbers[1] + numbers[2] = 2 + 7 = 9 (1-indexed)."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "two-pointers",
      "binary-search"
    ],
    "stages": [
      {
        "name": "Stage 1: Binary Search per Element",
        "description": "For each element i, binary search for target - numbers[i] in O(N log N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(1)"
      },
      {
        "name": "Stage 2: Converging Two Pointers",
        "description": "Squeeze left and right pointers towards center in O(N) time and O(1) space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4 9\n2 7 11 15",
        "expected_output": "1 2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 6\n2 3 4",
        "expected_output": "1 3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 -1\n-1 0",
        "expected_output": "1 2",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 32,
    "title": "3Sum (Triplets with Zero Sum)",
    "slug": "3sum-triplets-with-zero-sum",
    "description": "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\nNotice that the solution set must not contain duplicate triplets.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nFirst line: Total number of unique triplets T.\nNext T lines: Each line contains 3 space-separated integers of a triplet in ascending order. Triplets should be printed in lexicographical order.\n\n### Constraints\n3 <= N <= 3000\n-10^5 <= nums[i] <= 10^5",
    "difficulty": "MEDIUM",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Pair/triplet problems",
      "Two-pointer problems"
    ],
    "constraints": "3 <= N <= 3000, -10^5 <= nums[i] <= 10^5.",
    "input_format": "Line 1: N. Line 2: N integers.",
    "output_format": "Line 1: T. Next T lines: sorted triplets.",
    "examples": [
      {
        "input": "6\n-1 0 1 2 -1 -4",
        "output": "2\n-1 -1 2\n-1 0 1",
        "explanation": "Unique triplets summing to 0."
      }
    ],
    "expected_time_complexity": "O(N^2)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "two-pointers",
      "sorting"
    ],
    "stages": [
      {
        "name": "Stage 1: Sort + Two Pointers",
        "description": "Sort array and fix first element, finding remaining pair with two pointers in O(N^2).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N^2)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "6\n-1 0 1 2 -1 -4",
        "expected_output": "2\n-1 -1 2\n-1 0 1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n0 1 1",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n0 0 0",
        "expected_output": "1\n0 0 0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 33,
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers representing heights.\n\n### Output Format\nPrint the maximum water area.\n\n### Constraints\n2 <= N <= 10^5\n0 <= height[i] <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Two-pointer problems",
      "Greedy optimization"
    ],
    "constraints": "2 <= N <= 10^5, 0 <= height[i] <= 10^4.",
    "input_format": "Line 1: N. Line 2: N heights.",
    "output_format": "Single integer max area.",
    "examples": [
      {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "output": "49",
        "explanation": "Between index 1 (h=8) and 8 (h=7): area = min(8,7) * (8 - 1) = 7 * 7 = 49."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "two-pointers",
      "greedy"
    ],
    "stages": [
      {
        "name": "Stage 1: Nested Pair Evaluation",
        "description": "Evaluate all pairs (i, j) in O(N^2).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N^2)",
        "expected_space_complexity": "O(1)"
      },
      {
        "name": "Stage 2: Greedy Two-Pointer Contraction",
        "description": "Start from outer edges and advance the shorter wall inward in O(N).",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "expected_output": "49",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\n1 1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\n4 3 2 1",
        "expected_output": "4",
        "is_sample": false,
        "category": "SCALE"
      }
    ]
  },
  {
    "id": 34,
    "title": "Maximum Average Subarray of Size K",
    "slug": "maximum-average-subarray-of-size-k",
    "description": "You are given an integer array nums consisting of N elements, and an integer k.\nFind a contiguous subarray whose length is equal to k that has the maximum average value and return this value rounded to 2 decimal places.\n\n### Input Format\nFirst line contains two integers N and k.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the maximum average value rounded to 2 decimal places.\n\n### Constraints\n1 <= k <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Fixed-size windows",
      "Sliding Window"
    ],
    "constraints": "1 <= k <= N <= 10^5, -10^4 <= nums[i] <= 10^4.",
    "input_format": "Line 1: N k. Line 2: N integers.",
    "output_format": "Float rounded to 2 decimals.",
    "examples": [
      {
        "input": "6 4\n1 12 -5 -6 50 3",
        "output": "12.75",
        "explanation": "Subarray [12, -5, -6, 50] has max sum = 51. 51 / 4 = 12.75."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "sliding-window",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Fixed Sliding Window Accumulator",
        "description": "Compute initial window sum of size k, then slide by adding nums[i] and subtracting nums[i-k].",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "6 4\n1 12 -5 -6 50 3",
        "expected_output": "12.75",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1\n5",
        "expected_output": "5.00",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4 2\n-1 -2 -3 -4",
        "expected_output": "-1.50",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 35,
    "title": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "description": "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.\nReturn the length of the longest substring containing the same letter you can get after performing the operations.\n\n### Input Format\nFirst line contains string s.\nSecond line contains integer k.\n\n### Output Format\nPrint the maximum length.\n\n### Constraints\n1 <= length(s) <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= length(s)",
    "difficulty": "MEDIUM",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Variable-size windows",
      "Frequency Counting"
    ],
    "constraints": "1 <= |s| <= 10^5, uppercase letters, 0 <= k <= |s|.",
    "input_format": "Line 1: s. Line 2: k.",
    "output_format": "Single integer length.",
    "examples": [
      {
        "input": "ABAB\n2",
        "output": "4",
        "explanation": "Replace the two 'A's with 'B's or vice versa to get \"BBBB\" or \"AAAA\"."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "sliding-window",
      "hash-table"
    ],
    "stages": [
      {
        "name": "Stage 1: Sliding Window Frequency Tracking",
        "description": "Expand window right and check if windowLength - maxFrequency <= k, shrinking left pointer when invalid.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "ABAB\n2",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "AABABBA\n1",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "AAAA\n0",
        "expected_output": "4",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 36,
    "title": "Minimum Size Subarray Sum",
    "slug": "minimum-size-subarray-sum",
    "description": "Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [nums[l], ..., nums[r]] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.\n\n### Input Format\nFirst line contains two integers target and N.\nSecond line contains N space-separated positive integers.\n\n### Output Format\nPrint the minimal length of subarray, or 0.\n\n### Constraints\n1 <= target <= 10^9\n1 <= N <= 10^5\n1 <= nums[i] <= 10^4",
    "difficulty": "HARD",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Variable-size windows",
      "Longest/shortest subarray"
    ],
    "constraints": "1 <= target <= 10^9, 1 <= N <= 10^5, 1 <= nums[i] <= 10^4.",
    "input_format": "Line 1: target N. Line 2: N positive integers.",
    "output_format": "Single integer minimal length or 0.",
    "examples": [
      {
        "input": "7 6\n2 3 1 2 4 3",
        "output": "2",
        "explanation": "Subarray [4, 3] has minimal length 2 under sum >= 7."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "sliding-window",
      "two-pointers",
      "binary-search"
    ],
    "stages": [
      {
        "name": "Stage 1: Prefix Sum + Binary Search",
        "description": "Use prefix sums and binary search in O(N log N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Sliding Window Two Pointers",
        "description": "Expand right and contract left pointer while sum >= target in O(N) time and O(1) space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "7 6\n2 3 1 2 4 3",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4 3\n1 4 4",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "11 3\n1 1 1",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 37,
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\nReturn the max sliding window.\n\n### Input Format\nFirst line contains two integers N and k.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the max sliding window values as space-separated integers.\n\n### Constraints\n1 <= N <= 10^5\n1 <= k <= N\n-10^4 <= nums[i] <= 10^4",
    "difficulty": "HARD",
    "topic": "Two Pointers & Sliding Window",
    "subtopics": [
      "Fixed-size windows",
      "Monotonic stack"
    ],
    "constraints": "1 <= N <= 10^5, 1 <= k <= N, -10^4 <= nums[i] <= 10^4.",
    "input_format": "Line 1: N k. Line 2: N integers.",
    "output_format": "Space-separated maximums for each window.",
    "examples": [
      {
        "input": "8 3\n1 3 -1 -3 5 3 6 7",
        "output": "3 3 5 5 6 7",
        "explanation": "Window [1 3 -1] -> 3, [3 -1 -3] -> 3, [-1 -3 5] -> 5, etc."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(k)",
    "tags": [
      "sliding-window",
      "monotonic-queue",
      "deque"
    ],
    "stages": [
      {
        "name": "Stage 1: Max-Heap Priority Queue",
        "description": "Maintain (val, index) in priority queue in O(N log N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Monotonic Decreasing Deque",
        "description": "Maintain indices in double-ended queue where values are in strictly decreasing order in O(N).",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(k)"
      }
    ],
    "test_cases": [
      {
        "input": "8 3\n1 3 -1 -3 5 3 6 7",
        "expected_output": "3 3 5 5 6 7",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1\n1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4 2\n9 11 8 5",
        "expected_output": "11 11 8",
        "is_sample": false,
        "category": "SCALE"
      }
    ]
  }
];
