module.exports = [
  {
    "id": 98,
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day.\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers representing stock prices.\n\n### Output Format\nPrint the maximum profit as a single integer.\n\n### Constraints\n1 <= N <= 10^5\n0 <= prices[i] <= 10^4",
    "difficulty": "EASY",
    "topic": "Greedy / Heap / Intervals",
    "subtopics": [
      "Greedy optimization"
    ],
    "constraints": "1 <= N <= 10^5, 0 <= prices[i] <= 10^4.",
    "input_format": "Line 1: N. Line 2: N prices.",
    "output_format": "Single integer max profit.",
    "examples": [
      {
        "input": "6\n7 1 5 3 6 4",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "greedy",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Running Minimum Greedy Tracking",
        "description": "Track minimum buying price seen so far and maximize current price - minPrice in single pass O(N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "6\n7 1 5 3 6 4",
        "expected_output": "5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\n7 6 4 3 1",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n5",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 99,
    "title": "Assign Cookies",
    "slug": "assign-cookies",
    "description": "Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.\nEach child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.\n\n### Input Format\nFirst line contains two integers: N (number of children) and M (number of cookies).\nSecond line contains N space-separated integers representing children's greed factors g.\nThird line contains M space-separated integers representing cookie sizes s.\n\n### Output Format\nPrint the maximum number of content children.\n\n### Constraints\n1 <= N, M <= 3 * 10^4\n1 <= g[i], s[j] <= 2^31 - 1",
    "difficulty": "EASY",
    "topic": "Greedy / Heap / Intervals",
    "subtopics": [
      "Greedy optimization",
      "Activity selection"
    ],
    "constraints": "1 <= N, M <= 30000.",
    "input_format": "Line 1: N M. Line 2: greed factors. Line 3: cookie sizes.",
    "output_format": "Single integer content children.",
    "examples": [
      {
        "input": "3 2\n1 2 3\n1 1",
        "output": "1",
        "explanation": "Only child with greed 1 can be satisfied."
      },
      {
        "input": "2 3\n1 2\n1 2 3",
        "output": "2",
        "explanation": "Both children can be satisfied."
      }
    ],
    "expected_time_complexity": "O(N log N + M log M)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "greedy",
      "two-pointers",
      "sorting"
    ],
    "stages": [
      {
        "name": "Stage 1: Dual Sorted Two Pointers",
        "description": "Sort both arrays and greedily satisfy child with smallest greed factor first.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N + M log M)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "3 2\n1 2 3\n1 1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 3\n1 2\n1 2 3",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1\n10\n5",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 100,
    "title": "Merge Overlapping Intervals",
    "slug": "merge-overlapping-intervals",
    "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n### Input Format\nFirst line contains integer N.\nNext N lines each contain two space-separated integers start and end.\n\n### Output Format\nFirst line: integer M (number of merged intervals).\nNext M lines: Each line contains the start and end of a merged interval in ascending order.\n\n### Constraints\n1 <= N <= 10^5\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Greedy / Heap / Intervals",
    "subtopics": [
      "Interval merging",
      "Scheduling"
    ],
    "constraints": "1 <= N <= 10^5, 0 <= start <= end <= 10^4.",
    "input_format": "Line 1: N. Next N lines: start end.",
    "output_format": "Line 1: M. Next M lines: merged intervals.",
    "examples": [
      {
        "input": "4\n1 3\n2 6\n8 10\n15 18",
        "output": "3\n1 6\n8 10\n15 18",
        "explanation": "[1, 3] and [2, 6] overlap into [1, 6]."
      }
    ],
    "expected_time_complexity": "O(N log N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "intervals",
      "sorting",
      "greedy"
    ],
    "stages": [
      {
        "name": "Stage 1: Sort by Start Time & Merge",
        "description": "Sort intervals by start time and extend current interval end while next start <= current end.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n1 3\n2 6\n8 10\n15 18",
        "expected_output": "3\n1 6\n8 10\n15 18",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\n1 4\n4 5",
        "expected_output": "1\n1 5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n1 4",
        "expected_output": "1\n1 4",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 101,
    "title": "Non-overlapping Intervals (Activity Selection)",
    "slug": "non-overlapping-intervals-activity-selection",
    "description": "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\n### Input Format\nFirst line contains integer N.\nNext N lines each contain two space-separated integers start and end.\n\n### Output Format\nPrint the minimum number of intervals to remove.\n\n### Constraints\n1 <= N <= 10^5\n-5 * 10^4 <= starti < endi <= 5 * 10^4",
    "difficulty": "MEDIUM",
    "topic": "Greedy / Heap / Intervals",
    "subtopics": [
      "Scheduling",
      "Activity selection",
      "Greedy optimization"
    ],
    "constraints": "1 <= N <= 10^5.",
    "input_format": "Line 1: N. Next N lines: start end.",
    "output_format": "Single integer removals count.",
    "examples": [
      {
        "input": "4\n1 2\n2 3\n3 4\n1 3",
        "output": "1",
        "explanation": "[1, 3] can be removed and the rest of the intervals are non-overlapping."
      }
    ],
    "expected_time_complexity": "O(N log N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "greedy",
      "intervals",
      "activity-selection"
    ],
    "stages": [
      {
        "name": "Stage 1: Greedy Sorting by End Time",
        "description": "Sort intervals by earliest finish time; select max compatible activities and subtract from N.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n1 2\n2 3\n3 4\n1 3",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n1 2\n1 2\n1 2",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n1 2\n2 3\n3 4",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 102,
    "title": "Find Median from Data Stream (Two Heaps)",
    "slug": "find-median-from-data-stream",
    "description": "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\nImplement a MedianFinder structure that receives Q commands:\n- `addNum x`: Adds integer x into the data stream.\n- `findMedian`: Prints the current median formatted to 1 decimal place.\n\n### Input Format\nFirst line contains integer Q.\nNext Q lines each contain a command: \"addNum x\" or \"findMedian\".\n\n### Output Format\nFor each findMedian query, print the median formatted to 1 decimal place on a new line.\n\n### Constraints\n1 <= Q <= 5 * 10^4\n-10^5 <= num <= 10^5\nThere will be at least one element in the data structure before calling findMedian.",
    "difficulty": "HARD",
    "topic": "Greedy / Heap / Intervals",
    "subtopics": [
      "Priority queue",
      "Scheduling"
    ],
    "constraints": "1 <= Q <= 50000.",
    "input_format": "Line 1: Q. Next Q lines: commands.",
    "output_format": "Float medians formatted to 1 decimal place.",
    "examples": [
      {
        "input": "5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian",
        "output": "1.5\n2.0",
        "explanation": "[1, 2] median is 1.5. [1, 2, 3] median is 2.0."
      }
    ],
    "expected_time_complexity": "O(log N) per add, O(1) per find",
    "expected_space_complexity": "O(N)",
    "tags": [
      "heap",
      "design",
      "two-heaps",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Balanced Max-Heap and Min-Heap",
        "description": "Maintain max-heap for lower half and min-heap for upper half with sizes balanced within 1.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(log N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian",
        "expected_output": "1.5\n2.0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\naddNum -1\naddNum -2\nfindMedian",
        "expected_output": "-1.5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\naddNum 5\nfindMedian",
        "expected_output": "5.0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  }
];
