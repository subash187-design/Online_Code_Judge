module.exports = [
  {
    id: 38,
    title: "Binary Search in Sorted Array",
    slug: "binary-search-in-sorted-array",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\nYou must write an algorithm with O(log n) runtime complexity.\n\n### Input Format\nFirst line contains two integers N and target.\nSecond line contains N space-separated integers in ascending order.\n\n### Output Format\nPrint the 0-based index of target, or -1.\n\n### Constraints\n1 <= N <= 10^5\n-10^4 <= nums[i], target <= 10^4",
    difficulty: "EASY",
    topic: "Binary Search",
    subtopics: ["Basic binary search"],
    constraints: "1 <= N <= 10^5, sorted ascending.",
    input_format: "Line 1: N target. Line 2: N sorted integers.",
    output_format: "0-based index or -1.",
    examples: [
      { input: "6 9\n-1 0 3 5 9 12", output: "4", explanation: "9 exists in nums and its index is 4." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "array"],
    stages: [
      { name: "Stage 1: Iterative Binary Halving", description: "Maintain low and high pointers, checking mid = low + (high - low) / 2.", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "6 9\n-1 0 3 5 9 12", expected_output: "4", is_sample: true, category: "SAMPLE" },
      { input: "6 2\n-1 0 3 5 9 12", expected_output: "-1", is_sample: true, category: "SAMPLE" },
      { input: "1 5\n5", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 39,
    title: "Search Insert Position",
    slug: "search-insert-position",
    description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\nYou must write an algorithm with O(log n) runtime complexity.\n\n### Input Format\nFirst line contains two integers N and target.\nSecond line contains N space-separated distinct integers in ascending order.\n\n### Output Format\nPrint the insert position index.\n\n### Constraints\n1 <= N <= 10^5\n-10^4 <= nums[i], target <= 10^4",
    difficulty: "EASY",
    topic: "Binary Search",
    subtopics: ["Basic binary search", "First/last occurrence"],
    constraints: "1 <= N <= 10^5, distinct integers in sorted order.",
    input_format: "Line 1: N target. Line 2: N sorted integers.",
    output_format: "Single integer index.",
    examples: [
      { input: "4 5\n1 3 5 6", output: "2", explanation: "5 is found at index 2." },
      { input: "4 2\n1 3 5 6", output: "1", explanation: "2 would be inserted at index 1." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "lower-bound"],
    stages: [
      { name: "Stage 1: Lower Bound Binary Search", description: "Find smallest index i where nums[i] >= target.", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "4 5\n1 3 5 6", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "4 2\n1 3 5 6", expected_output: "1", is_sample: true, category: "SAMPLE" },
      { input: "4 7\n1 3 5 6", expected_output: "4", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 40,
    title: "Sqrt(x) Integer Part",
    slug: "sqrt-x-integer-part",
    description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.\nYou must not use any built-in exponent function or operator, such as pow(x, 0.5) or sqrt(x).\n\n### Input Format\nA single line containing integer x.\n\n### Output Format\nPrint floor(sqrt(x)).\n\n### Constraints\n0 <= x <= 2^31 - 1",
    difficulty: "EASY",
    topic: "Binary Search",
    subtopics: ["Basic binary search", "Search on answer"],
    constraints: "0 <= x <= 2^31 - 1.",
    input_format: "Single integer x.",
    output_format: "Single integer.",
    examples: [
      { input: "4", output: "2", explanation: "sqrt(4) = 2." },
      { input: "8", output: "2", explanation: "sqrt(8) = 2.8284..., rounded down is 2." }
    ],
    expected_time_complexity: "O(log x)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "math"],
    stages: [
      { name: "Stage 1: Binary Search on Monotonic Interval", description: "Search in range [0, x] with mid * mid <= x.", order_index: 1, is_required: true, expected_time_complexity: "O(log x)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "4", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "8", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "0", expected_output: "0", is_sample: false, category: "BOUNDARY" },
      { input: "2147395600", expected_output: "46340", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 41,
    title: "Find First and Last Position of Element in Sorted Array",
    slug: "find-first-and-last-position-of-element",
    description: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.\nIf target is not found in the array, print \"-1 -1\".\nYou must write an algorithm with O(log n) runtime complexity.\n\n### Input Format\nFirst line contains two integers N and target.\nSecond line contains N space-separated sorted integers.\n\n### Output Format\nPrint two space-separated integers: first index and last index.\n\n### Constraints\n0 <= N <= 10^5\n-10^9 <= nums[i], target <= 10^9",
    difficulty: "MEDIUM",
    topic: "Binary Search",
    subtopics: ["First/last occurrence", "Basic binary search"],
    constraints: "0 <= N <= 10^5, sorted non-decreasingly.",
    input_format: "Line 1: N target. Line 2: N integers.",
    output_format: "Two space-separated indices or -1 -1.",
    examples: [
      { input: "6 8\n5 7 7 8 8 10", output: "3 4", explanation: "Target 8 appears from index 3 to 4." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "array"],
    stages: [
      { name: "Stage 1: Dual Binary Searches", description: "Run two separate binary searches for lower bound and upper bound in O(log N).", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "6 8\n5 7 7 8 8 10", expected_output: "3 4", is_sample: true, category: "SAMPLE" },
      { input: "6 6\n5 7 7 8 8 10", expected_output: "-1 -1", is_sample: true, category: "SAMPLE" },
      { input: "0 0\n", expected_output: "-1 -1", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 42,
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    description: "There is an integer array nums sorted in ascending order with distinct values. Prior to being passed to your function, nums is possibly rotated at an unknown pivot index.\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\nYou must write an algorithm with O(log n) runtime complexity.\n\n### Input Format\nFirst line contains two integers N and target.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the index of target, or -1.\n\n### Constraints\n1 <= N <= 10^5\nAll values of nums are unique.\n-10^4 <= nums[i], target <= 10^4",
    difficulty: "MEDIUM",
    topic: "Binary Search",
    subtopics: ["Rotated arrays", "Basic binary search"],
    constraints: "1 <= N <= 10^5, distinct values.",
    input_format: "Line 1: N target. Line 2: N integers.",
    output_format: "Single index or -1.",
    examples: [
      { input: "7 0\n4 5 6 7 0 1 2", output: "4", explanation: "0 is at index 4." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "rotated-array"],
    stages: [
      { name: "Stage 1: Modified Binary Search with Sorted Half", description: "Identify whether left or right half is cleanly sorted, then check if target falls in that interval.", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "7 0\n4 5 6 7 0 1 2", expected_output: "4", is_sample: true, category: "SAMPLE" },
      { input: "7 3\n4 5 6 7 0 1 2", expected_output: "-1", is_sample: true, category: "SAMPLE" },
      { input: "1 0\n0", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 43,
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Notice that rotating an array [a[0], a[1], ..., a[n-1]] 1 time results in [a[n-1], a[0], ..., a[n-2]].\nGiven the sorted rotated array nums of unique elements, return the minimum element of this array.\nYou must write an algorithm that runs in O(log n) time.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the minimum element.\n\n### Constraints\n1 <= N <= 10^5\nAll integers in nums are unique.\n-10^4 <= nums[i] <= 10^4",
    difficulty: "MEDIUM",
    topic: "Binary Search",
    subtopics: ["Rotated arrays", "Minimum/maximum feasible value"],
    constraints: "1 <= N <= 10^5, all unique.",
    input_format: "Line 1: N. Line 2: N integers.",
    output_format: "Single integer min value.",
    examples: [
      { input: "5\n3 4 5 1 2", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "rotated-array"],
    stages: [
      { name: "Stage 1: Inflection Point Binary Search", description: "Compare nums[mid] with nums[high] to determine pivot direction in O(log N).", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "5\n3 4 5 1 2", expected_output: "1", is_sample: true, category: "SAMPLE" },
      { input: "7\n4 5 6 7 0 1 2", expected_output: "0", is_sample: true, category: "SAMPLE" },
      { input: "1\n11", expected_output: "11", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 44,
    title: "Find Peak Element",
    slug: "find-peak-element",
    description: "A peak element is an element that is strictly greater than its neighbors.\nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\nYou may imagine that nums[-1] = nums[n] = -infinity.\nYou must write an algorithm that runs in O(log n) time.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the index of any peak element.\n\n### Constraints\n1 <= N <= 10^5\nnums[i] != nums[i + 1] for all valid i.",
    difficulty: "MEDIUM",
    topic: "Binary Search",
    subtopics: ["Basic binary search"],
    constraints: "1 <= N <= 10^5, nums[i] != nums[i+1].",
    input_format: "Line 1: N. Line 2: N integers.",
    output_format: "Single integer peak index.",
    examples: [
      { input: "4\n1 2 3 1", output: "2", explanation: "3 is a peak element and your function should return index 2." }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "peak-finding"],
    stages: [
      { name: "Stage 1: Binary Gradient Climb", description: "Compare mid with mid + 1; move in the direction of the higher neighbor in O(log N).", order_index: 1, is_required: true, expected_time_complexity: "O(log N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "4\n1 2 3 1", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "1\n1", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 45,
    title: "Koko Eating Bananas",
    slug: "koko-eating-bananas",
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.\nKoko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.\nReturn the minimum integer k such that she can eat all the bananas within h hours.\n\n### Input Format\nFirst line contains two integers N and h.\nSecond line contains N space-separated integers representing piles.\n\n### Output Format\nPrint the minimum speed k.\n\n### Constraints\n1 <= N <= 10^5\nN <= h <= 10^9\n1 <= piles[i] <= 10^9",
    difficulty: "MEDIUM",
    topic: "Binary Search",
    subtopics: ["Search on answer", "Minimum/maximum feasible value"],
    constraints: "1 <= N <= 10^5, N <= h <= 10^9.",
    input_format: "Line 1: N h. Line 2: N pile sizes.",
    output_format: "Single integer minimum eating speed.",
    examples: [
      { input: "4 8\n3 6 7 11", output: "4", explanation: "At speed 4, Koko takes ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours." }
    ],
    expected_time_complexity: "O(N log(max(piles)))",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "search-on-answer"],
    stages: [
      { name: "Stage 1: Monotonic Predicate Binary Search", description: "Search speed in range [1, max(piles)] with predicate totalHours(k) <= h in O(N log M).", order_index: 1, is_required: true, expected_time_complexity: "O(N log M)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "4 8\n3 6 7 11", expected_output: "4", is_sample: true, category: "SAMPLE" },
      { input: "5 5\n30 11 23 4 20", expected_output: "30", is_sample: true, category: "SAMPLE" },
      { input: "5 6\n30 11 23 4 20", expected_output: "23", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 46,
    title: "Capacity To Ship Packages Within D Days",
    slug: "capacity-to-ship-packages-within-d-days",
    description: "A conveyor belt has packages that must be shipped from one port to another within days days.\nThe ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.\nReturn the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.\n\n### Input Format\nFirst line contains two integers N and days.\nSecond line contains N space-separated integers representing weights.\n\n### Output Format\nPrint the minimum required ship capacity.\n\n### Constraints\n1 <= days <= N <= 5 * 10^4\n1 <= weights[i] <= 500",
    difficulty: "HARD",
    topic: "Binary Search",
    subtopics: ["Search on answer", "Minimum/maximum feasible value"],
    constraints: "1 <= days <= N <= 50000, 1 <= weights[i] <= 500.",
    input_format: "Line 1: N days. Line 2: N weights.",
    output_format: "Single integer min capacity.",
    examples: [
      { input: "10 5\n1 2 3 4 5 6 7 8 9 10", output: "15", explanation: "A ship capacity of 15 is the minimum to ship all packages in 5 days." }
    ],
    expected_time_complexity: "O(N log(sum(weights)))",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "greedy", "search-on-answer"],
    stages: [
      { name: "Stage 1: Binary Search on Capacity Range", description: "Search in [max(weight), sum(weight)] verifying feasibility with greedy simulation.", order_index: 1, is_required: true, expected_time_complexity: "O(N log S)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "10 5\n1 2 3 4 5 6 7 8 9 10", expected_output: "15", is_sample: true, category: "SAMPLE" },
      { input: "6 3\n3 2 2 4 1 4", expected_output: "6", is_sample: true, category: "SAMPLE" },
      { input: "3 4\n1 2 1", expected_output: "2", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 47,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays rounded to 2 decimal places.\nThe overall run time complexity should be O(log (m+n)).\n\n### Input Format\nFirst line contains two integers M and N.\nSecond line contains M space-separated sorted integers (or empty if M=0).\nThird line contains N space-separated sorted integers (or empty if N=0).\n\n### Output Format\nPrint the median rounded to 2 decimal places.\n\n### Constraints\n0 <= M, N <= 10^5\n1 <= M + N <= 2 * 10^5\n-10^6 <= nums1[i], nums2[i] <= 10^6",
    difficulty: "HARD",
    topic: "Binary Search",
    subtopics: ["Basic binary search", "Minimum/maximum feasible value"],
    constraints: "0 <= M, N <= 10^5, M + N >= 1.",
    input_format: "Line 1: M N. Line 2: nums1. Line 3: nums2.",
    output_format: "Float formatted to 2 decimals.",
    examples: [
      { input: "2 1\n1 3\n2", output: "2.00", explanation: "Merged array = [1, 2, 3] and median is 2.00." }
    ],
    expected_time_complexity: "O(log(min(M, N)))",
    expected_space_complexity: "O(1)",
    tags: ["binary-search", "divide-and-conquer", "hard-interview"],
    stages: [
      { name: "Stage 1: Linear Merge Scan", description: "Merge up to (M+N)/2 elements using two pointers in O(M + N).", order_index: 1, is_required: true, expected_time_complexity: "O(M+N)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Binary Search on Partition", description: "Binary search partition in smaller array so left elements <= right elements in O(log(min(M, N))).", order_index: 2, is_required: true, expected_time_complexity: "O(log(min(M,N)))", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "2 1\n1 3\n2", expected_output: "2.00", is_sample: true, category: "SAMPLE" },
      { input: "2 2\n1 2\n3 4", expected_output: "2.50", is_sample: true, category: "SAMPLE" },
      { input: "0 2\n\n1 2", expected_output: "1.50", is_sample: false, category: "BOUNDARY" }
    ]
  }
];
