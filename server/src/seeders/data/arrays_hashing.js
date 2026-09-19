module.exports = [
  {
    id: 3,
    title: "Two Sum - Pair with Target Sum",
    slug: "two-sum-pair-with-target-sum",
    description: "Given an array of integers nums and an integer target, return the 0-based indices of the two numbers such that they add up to target.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\n### Input Format\nThe first line contains two integers N and target.\nThe second line contains N space-separated integers representing nums.\n\n### Output Format\nPrint the two 0-based indices in ascending order separated by a space.\n\n### Constraints\n2 <= N <= 10^5\n-10^9 <= nums[i], target <= 10^9",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Two Sum", "Hash Maps"],
    constraints: "2 <= N <= 10^5, -10^9 <= nums[i], target <= 10^9",
    input_format: "First line: N target. Second line: N space-separated integers.",
    output_format: "Two space-separated indices in ascending order.",
    examples: [
      { input: "4 9\n2 7 11 15", output: "0 1", explanation: "nums[0] + nums[1] = 2 + 7 = 9" }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(N)",
    tags: ["array", "hash-table", "fresher-favorite"],
    stages: [
      { name: "Stage 1: Brute Force Search", description: "Check every pair with nested loops O(N^2).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Single-Pass Hash Map", description: "Store complements in a hash map for linear lookup.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "4 9\n2 7 11 15", expected_output: "0 1", is_sample: true, category: "SAMPLE" },
      { input: "3 6\n3 2 4", expected_output: "1 2", is_sample: true, category: "SAMPLE" },
      { input: "2 6\n3 3", expected_output: "0 1", is_sample: false, category: "BOUNDARY" },
      { input: "5 0\n-5 2 3 5 1", expected_output: "0 3", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 4,
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.\n\n### Input Format\nFirst line contains an integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint \"true\" if any value appears at least twice, otherwise \"false\".\n\n### Constraints\n1 <= N <= 10^5\n-10^9 <= nums[i] <= 10^9",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Frequency Counting", "Hash Maps"],
    constraints: "1 <= N <= 10^5, -10^9 <= nums[i] <= 10^9",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "true or false",
    examples: [
      { input: "4\n1 2 3 1", output: "true", explanation: "1 occurs twice." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(N)",
    tags: ["array", "hash-set"],
    stages: [
      { name: "Stage 1: Sorting Check", description: "Sort the array and inspect adjacent duplicates in O(N log N).", order_index: 1, is_required: true, expected_time_complexity: "O(N log N)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Hash Set Lookup", description: "Maintain visited elements in a hash set in O(N).", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "4\n1 2 3 1", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "4\n1 2 3 4", expected_output: "false", is_sample: true, category: "SAMPLE" },
      { input: "1\n99", expected_output: "false", is_sample: false, category: "BOUNDARY" },
      { input: "6\n1 1 1 3 3 4", expected_output: "true", is_sample: false, category: "DUPLICATE_HEAVY" }
    ]
  },
  {
    id: 5,
    title: "Valid Anagram",
    slug: "valid-anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\nAn Anagram is a word formed by rearranging the letters of a different word, typically using all the original letters exactly once.\n\n### Input Format\nFirst line contains string s.\nSecond line contains string t.\n\n### Output Format\nPrint \"true\" if t is an anagram of s, otherwise \"false\".\n\n### Constraints\n1 <= length(s), length(t) <= 5 * 10^4\ns and t consist of lowercase English letters.",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Frequency Counting", "Hash Maps"],
    constraints: "1 <= |s|, |t| <= 50000, lowercase English letters.",
    input_format: "Two lines, one string per line.",
    output_format: "true or false",
    examples: [
      { input: "anagram\nnagaram", output: "true", explanation: "Both words contain the exact same frequencies of characters." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["string", "hash-table", "frequency"],
    stages: [
      { name: "Stage 1: Character Sorting", description: "Sort both strings and compare lexicographical equality in O(N log N).", order_index: 1, is_required: true, expected_time_complexity: "O(N log N)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Fixed Frequency Table", description: "Count characters using an integer array of size 26 in O(N).", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "anagram\nnagaram", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "rat\ncar", expected_output: "false", is_sample: true, category: "SAMPLE" },
      { input: "a\na", expected_output: "true", is_sample: false, category: "BOUNDARY" },
      { input: "ab\na", expected_output: "false", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 6,
    title: "Range Sum Query (Prefix Sum)",
    slug: "range-sum-query-prefix-sum",
    description: "Given an integer array nums, process Q queries. For each query with range [L, R] (0-indexed, inclusive), calculate the sum of elements from index L to R.\n\n### Input Format\nFirst line contains two integers N and Q.\nSecond line contains N integers representing nums.\nNext Q lines each contain two integers L and R.\n\n### Output Format\nFor each query, print the sum on a new line.\n\n### Constraints\n1 <= N, Q <= 10^5\n-10^4 <= nums[i] <= 10^4\n0 <= L <= R < N",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Prefix Sum", "Array Manipulation"],
    constraints: "1 <= N, Q <= 10^5, -10^4 <= nums[i] <= 10^4, 0 <= L <= R < N",
    input_format: "Line 1: N Q. Line 2: nums. Next Q lines: L R.",
    output_format: "Q lines, each containing the query sum.",
    examples: [
      { input: "6 3\n-2 0 3 -5 2 -1\n0 2\n2 5\n0 5", output: "1\n-1\n-3", explanation: "sum(0..2)=1, sum(2..5)=-1, sum(0..5)=-3" }
    ],
    expected_time_complexity: "O(N + Q)",
    expected_space_complexity: "O(N)",
    tags: ["array", "prefix-sum"],
    stages: [
      { name: "Stage 1: Naive Iteration", description: "Iterate from L to R on every query in O(N * Q).", order_index: 1, is_required: true, expected_time_complexity: "O(N*Q)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Prefix Sum Precomputation", description: "Precompute prefix sums to answer each query in O(1) time.", order_index: 2, is_required: true, expected_time_complexity: "O(N + Q)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "6 3\n-2 0 3 -5 2 -1\n0 2\n2 5\n0 5", expected_output: "1\n-1\n-3", is_sample: true, category: "SAMPLE" },
      { input: "3 2\n1 2 3\n0 0\n1 2", expected_output: "1\n5", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 7,
    title: "Majority Element (Boyer-Moore)",
    slug: "majority-element-boyer-moore",
    description: "Given an array nums of size N, return the majority element.\nThe majority element is the element that appears more than floor(N / 2) times. You may assume that the majority element always exists in the array.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the majority element.\n\n### Constraints\n1 <= N <= 10^5\n-10^9 <= nums[i] <= 10^9",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Frequency Counting", "Voting Algorithm"],
    constraints: "1 <= N <= 10^5, -10^9 <= nums[i] <= 10^9",
    input_format: "First line: N. Second line: N space-separated integers.",
    output_format: "Single integer.",
    examples: [
      { input: "7\n2 2 1 1 1 2 2", output: "2", explanation: "2 appears 4 times, which is > 7/2." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["array", "boyer-moore", "counting"],
    stages: [
      { name: "Stage 1: Hash Map Frequency Count", description: "Count frequencies with an auxiliary hash map in O(N) space.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: Boyer-Moore Voting Algorithm", description: "Find majority element in O(1) space with candidate-count cancellation.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "3\n3 2 3", expected_output: "3", is_sample: true, category: "SAMPLE" },
      { input: "7\n2 2 1 1 1 2 2", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "1\n42", expected_output: "42", is_sample: false, category: "BOUNDARY" },
      { input: "5\n5 5 5 2 3", expected_output: "5", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 8,
    title: "Missing Number",
    slug: "missing-number",
    description: "Given an array nums containing N distinct numbers in the range [0, N], return the only number in the range that is missing from the array.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the missing integer.\n\n### Constraints\n1 <= N <= 10^5\n0 <= nums[i] <= N, all numbers distinct.",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    subtopics: ["Hash Sets", "Bit Manipulation"],
    constraints: "1 <= N <= 10^5, all elements distinct in [0, N].",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "Single integer.",
    examples: [
      { input: "3\n3 0 1", output: "2", explanation: "N=3, range [0, 3]. 2 is missing." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["array", "math", "bit-manipulation"],
    stages: [
      { name: "Stage 1: Hash Set Membership", description: "Insert elements into set and inspect [0..N] in O(N) space.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: Gauss Sum / XOR In-Place", description: "Compute expected sum N*(N+1)/2 minus actual sum in O(1) space.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "3\n3 0 1", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "2\n0 1", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "1\n1", expected_output: "0", is_sample: false, category: "BOUNDARY" },
      { input: "9\n9 6 4 2 3 5 7 0 1", expected_output: "8", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 9,
    title: "Subarray Sum Equals K",
    slug: "subarray-sum-equals-k",
    description: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.\nA subarray is a contiguous non-empty sequence of elements within an array.\n\n### Input Format\nFirst line contains two integers N and k.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the total number of continuous subarrays whose sum is equal to k.\n\n### Constraints\n1 <= N <= 10^5\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Prefix Sum", "Hash Maps", "Subarrays"],
    constraints: "1 <= N <= 10^5, -1000 <= nums[i] <= 1000, -10^7 <= k <= 10^7",
    input_format: "Line 1: N k. Line 2: N space-separated integers.",
    output_format: "Single integer count.",
    examples: [
      { input: "3 2\n1 1 1", output: "2", explanation: "Subarrays [1,1] at index (0,1) and (1,2) sum to 2." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(N)",
    tags: ["array", "prefix-sum", "hash-map"],
    stages: [
      { name: "Stage 1: Cumulative Sum Scanning", description: "Evaluate all subarrays using O(N^2) prefix sums.", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Prefix Sum Frequency Map", description: "Store frequencies of running prefix sums in hash map for O(N) evaluation.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "3 2\n1 1 1", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "3 3\n1 2 3", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "4 0\n1 -1 1 -1", expected_output: "4", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 10,
    title: "Group Anagrams",
    slug: "group-anagrams",
    description: "Given an array of strings strs, group the anagrams together. Print the number of anagram groups followed by each group sorted lexicographically.\n\n### Input Format\nFirst line contains integer N.\nNext N lines each contain a single lowercase word.\n\n### Output Format\nFirst line: Number of groups G.\nNext G lines: Each line contains the space-separated words of a group sorted lexicographically. Groups themselves should be printed in sorted order based on their first word.\n\n### Constraints\n1 <= N <= 10^4\n1 <= length(str) <= 100",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Hash Maps", "Frequency Counting"],
    constraints: "1 <= N <= 10^4, 1 <= |str| <= 100.",
    input_format: "Line 1: N. Next N lines: strings.",
    output_format: "Number of groups followed by sorted words in each group.",
    examples: [
      { input: "6\neat\ntea\ntan\nate\nnat\nbat", output: "3\nate eat tea\nbat\nnat tan", explanation: "Grouped into 3 sets of anagrams." }
    ],
    expected_time_complexity: "O(N * K log K)",
    expected_space_complexity: "O(N * K)",
    tags: ["string", "hash-map", "sorting"],
    stages: [
      { name: "Stage 1: Pairwise Anagram Check", description: "Compare every pair of strings using frequency counts O(N^2 * K).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2 * K)", expected_space_complexity: "O(N*K)" },
      { name: "Stage 2: Sorted Canonical Key Map", description: "Map sorted string signature to bucket list in O(N * K log K).", order_index: 2, is_required: true, expected_time_complexity: "O(N * K log K)", expected_space_complexity: "O(N*K)" }
    ],
    test_cases: [
      { input: "6\neat\ntea\ntan\nate\nnat\nbat", expected_output: "3\nate eat tea\nbat\nnat tan", is_sample: true, category: "SAMPLE" },
      { input: "1\na", expected_output: "1\na", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 11,
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements in ascending order.\n\n### Input Format\nFirst line contains two integers N and k.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the k most frequent elements in ascending numerical order.\n\n### Constraints\n1 <= N <= 10^5\n1 <= k <= number of unique elements\n-10^4 <= nums[i] <= 10^4",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Frequency Counting", "Hash Maps"],
    constraints: "1 <= N <= 10^5, 1 <= k <= unique elements.",
    input_format: "Line 1: N k. Line 2: N space-separated integers.",
    output_format: "k space-separated integers in ascending order.",
    examples: [
      { input: "6 2\n1 1 1 2 2 3", output: "1 2", explanation: "1 occurs 3 times, 2 occurs 2 times." }
    ],
    expected_time_complexity: "O(N log k)",
    expected_space_complexity: "O(N)",
    tags: ["array", "hash-map", "heap", "bucket-sort"],
    stages: [
      { name: "Stage 1: Hash Map + Full Sort", description: "Count frequencies and sort all entries in O(N log N).", order_index: 1, is_required: true, expected_time_complexity: "O(N log N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: Bucket Sort / Min-Heap", description: "Collect top k using bucket indexing by frequency in O(N).", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "6 2\n1 1 1 2 2 3", expected_output: "1 2", is_sample: true, category: "SAMPLE" },
      { input: "1 1\n1", expected_output: "1", is_sample: false, category: "BOUNDARY" },
      { input: "8 3\n4 4 4 2 2 1 1 3", expected_output: "1 2 4", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 12,
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\nYou must write an algorithm that runs in O(N) time.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint an integer representing the length of the longest consecutive sequence.\n\n### Constraints\n0 <= N <= 10^5\n-10^9 <= nums[i] <= 10^9",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Hash Maps", "Array Manipulation"],
    constraints: "0 <= N <= 10^5, -10^9 <= nums[i] <= 10^9",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "Single integer length.",
    examples: [
      { input: "6\n100 4 200 1 3 2", output: "4", explanation: "The consecutive sequence is [1, 2, 3, 4], length 4." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(N)",
    tags: ["array", "hash-set", "union-find"],
    stages: [
      { name: "Stage 1: Sort and Scan", description: "Sort the array and find consecutive run in O(N log N).", order_index: 1, is_required: true, expected_time_complexity: "O(N log N)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Hash Set Streak Detection", description: "Check streak start points (num - 1 not in set) in linear O(N) time.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "6\n100 4 200 1 3 2", expected_output: "4", is_sample: true, category: "SAMPLE" },
      { input: "10\n0 3 7 2 5 8 4 6 0 1", expected_output: "9", is_sample: true, category: "SAMPLE" },
      { input: "0\n", expected_output: "0", is_sample: false, category: "BOUNDARY" },
      { input: "3\n5 5 5", expected_output: "1", is_sample: false, category: "DUPLICATE_HEAVY" }
    ]
  },
  {
    id: 13,
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\nYou must write an algorithm that runs in O(N) time and without using the division operation.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint N space-separated integers representing the answer array.\n\n### Constraints\n2 <= N <= 10^5\n-30 <= nums[i] <= 30",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Prefix Sum", "Array Manipulation"],
    constraints: "2 <= N <= 10^5, -30 <= nums[i] <= 30",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "N space-separated integers.",
    examples: [
      { input: "4\n1 2 3 4", output: "24 12 8 6", explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["array", "prefix-suffix"],
    stages: [
      { name: "Stage 1: Prefix and Suffix Arrays", description: "Build prefix product array and suffix product array in O(N) memory.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: In-Place Running Accumulator", description: "Accumulate running prefix in output array and running suffix in a variable in O(1) auxiliary space.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "4\n1 2 3 4", expected_output: "24 12 8 6", is_sample: true, category: "SAMPLE" },
      { input: "5\n-1 1 0 -3 3", expected_output: "0 0 9 0 0", is_sample: true, category: "SAMPLE" },
      { input: "2\n5 2", expected_output: "2 5", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 14,
    title: "Continuous Subarray Sum (Modulo K)",
    slug: "continuous-subarray-sum-modulo-k",
    description: "Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.\nA good subarray is defined as:\n1. Its length is at least two.\n2. The sum of the elements in the subarray is a multiple of k (i.e. sum % k == 0).\n\n### Input Format\nFirst line contains two integers N and k.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= N <= 10^5\n0 <= nums[i] <= 10^9\n1 <= k <= 2 * 10^9",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Prefix Sum", "Hash Maps", "Subarrays"],
    constraints: "1 <= N <= 10^5, 0 <= nums[i] <= 10^9, 1 <= k <= 2*10^9",
    input_format: "Line 1: N k. Line 2: N space-separated integers.",
    output_format: "true or false",
    examples: [
      { input: "5 6\n23 2 4 6 7", output: "true", explanation: "[2, 4] is a continuous subarray of size 2 whose sum is 6 (multiple of 6)." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(min(N, k))",
    tags: ["array", "prefix-sum", "hash-map", "modulo"],
    stages: [
      { name: "Stage 1: Quadratic Scanning", description: "Compute all subarrays of length >= 2 in O(N^2).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Modulo Remainder Map", description: "Record first occurrence index of (prefixSum % k) in hash map for linear check.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(min(N,k))" }
    ],
    test_cases: [
      { input: "5 6\n23 2 4 6 7", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "5 6\n23 2 6 4 7", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "5 13\n23 2 6 4 7", expected_output: "false", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 15,
    title: "Maximum Subarray (Kadane Algorithm)",
    slug: "maximum-subarray-kadanes-algorithm",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the maximum subarray sum.\n\n### Constraints\n1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
    difficulty: "MEDIUM",
    topic: "Arrays & Hashing",
    subtopics: ["Subarrays", "Array Manipulation"],
    constraints: "1 <= N <= 10^5, -10^4 <= nums[i] <= 10^4",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "Single integer max sum.",
    examples: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4, -1, 2, 1] has the largest sum = 6." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["array", "dynamic-programming", "kadane"],
    stages: [
      { name: "Stage 1: Divide and Conquer", description: "Find maximum subarray crossing midpoint in O(N log N).", order_index: 1, is_required: true, expected_time_complexity: "O(N log N)", expected_space_complexity: "O(log N)" },
      { name: "Stage 2: Kadane Optimal Linear Scan", description: "Maintain running current sum and global max in O(N) time and O(1) space.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected_output: "6", is_sample: true, category: "SAMPLE" },
      { input: "1\n1", expected_output: "1", is_sample: true, category: "SAMPLE" },
      { input: "5\n5 4 -1 7 8", expected_output: "23", is_sample: false, category: "SCALE" },
      { input: "3\n-3 -2 -5", expected_output: "-2", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 16,
    title: "First Missing Positive",
    slug: "first-missing-positive",
    description: "Given an unsorted integer array nums, return the smallest positive integer that is not present in nums.\nYou must implement an algorithm that runs in O(N) time and uses O(1) auxiliary space.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the smallest missing positive integer.\n\n### Constraints\n1 <= N <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1",
    difficulty: "HARD",
    topic: "Arrays & Hashing",
    subtopics: ["Array Manipulation", "Hash Maps"],
    constraints: "1 <= N <= 10^5, -2^31 <= nums[i] <= 2^31 - 1",
    input_format: "Line 1: N. Line 2: N space-separated integers.",
    output_format: "Single integer.",
    examples: [
      { input: "3\n1 2 0", output: "3", explanation: "Smallest positive integer missing is 3." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["array", "in-place", "hard-interview"],
    stages: [
      { name: "Stage 1: Hash Set Lookup", description: "Insert elements into hash set and probe 1..N+1 in O(N) memory.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: In-Place Cyclic Bucket Placement", description: "Place each number x in index x-1 using cyclic swap in O(1) extra space.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "3\n1 2 0", expected_output: "3", is_sample: true, category: "SAMPLE" },
      { input: "4\n3 4 -1 1", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "5\n7 8 9 11 12", expected_output: "1", is_sample: false, category: "BOUNDARY" },
      { input: "1\n1", expected_output: "2", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 17,
    title: "Largest Rectangle in Histogram",
    slug: "largest-rectangle-in-histogram",
    description: "Given an array of integers heights representing the histogram bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers representing heights.\n\n### Output Format\nPrint the maximum area.\n\n### Constraints\n1 <= N <= 10^5\n0 <= heights[i] <= 10^4",
    difficulty: "HARD",
    topic: "Arrays & Hashing",
    subtopics: ["Subarrays", "Array Manipulation"],
    constraints: "1 <= N <= 10^5, 0 <= heights[i] <= 10^4",
    input_format: "Line 1: N. Line 2: N heights.",
    output_format: "Single integer area.",
    examples: [
      { input: "6\n2 1 5 6 2 3", output: "10", explanation: "The largest rectangle is formed by heights 5 and 6 with area = 2 * 5 = 10." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(N)",
    tags: ["array", "monotonic-stack", "histogram"],
    stages: [
      { name: "Stage 1: Quadratic Width Expansion", description: "Expand left and right for each bar in O(N^2).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Monotonic Stack Calculation", description: "Calculate previous and next smaller boundaries in single pass O(N).", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" }
    ],
    test_cases: [
      { input: "6\n2 1 5 6 2 3", expected_output: "10", is_sample: true, category: "SAMPLE" },
      { input: "2\n2 4", expected_output: "4", is_sample: true, category: "SAMPLE" },
      { input: "1\n5", expected_output: "5", is_sample: false, category: "BOUNDARY" },
      { input: "5\n1 1 1 1 1", expected_output: "5", is_sample: false, category: "SCALE" }
    ]
  }
];
