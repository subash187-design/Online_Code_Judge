module.exports = [
  {
    id: 18,
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\nGiven a string s, return true if it is a palindrome, or false otherwise.\n\n### Input Format\nA single line containing the string s.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= length(s) <= 2 * 10^5\ns consists only of printable ASCII characters.",
    difficulty: "EASY",
    topic: "Strings",
    subtopics: ["Palindromes", "Two Pointers"],
    constraints: "1 <= |s| <= 200000, ASCII printable characters.",
    input_format: "A single line string s.",
    output_format: "true or false",
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "true", explanation: "\"amanaplanacanalpanama\" is a palindrome." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["string", "two-pointers"],
    stages: [
      { name: "Stage 1: Filtered Copy Reverse", description: "Filter alphanumeric characters into auxiliary buffer and reverse compare.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: In-Place Two Pointers", description: "Skip non-alphanumeric characters in-place using two converging pointers.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "A man, a plan, a canal: Panama", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "race a car", expected_output: "false", is_sample: true, category: "SAMPLE" },
      { input: " ", expected_output: "true", is_sample: false, category: "BOUNDARY" },
      { input: "0P", expected_output: "false", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 19,
    title: "First Unique Character in a String",
    slug: "first-unique-character-in-a-string",
    description: "Given a string s, find the first non-repeating character in it and return its 0-based index. If it does not exist, return -1.\n\n### Input Format\nA single line containing lowercase string s.\n\n### Output Format\nPrint the 0-based index of the first unique character, or -1.\n\n### Constraints\n1 <= length(s) <= 10^5\ns consists of only lowercase English letters.",
    difficulty: "EASY",
    topic: "Strings",
    subtopics: ["String frequency", "Hash Maps"],
    constraints: "1 <= |s| <= 10^5, lowercase English letters.",
    input_format: "Single line string s.",
    output_format: "Single integer index or -1.",
    examples: [
      { input: "leetcode", output: "0", explanation: "'l' is the first unique character at index 0." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["string", "hash-table", "queue"],
    stages: [
      { name: "Stage 1: Nested Frequency Search", description: "Search character count in nested loop O(N^2).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Two-Pass Frequency Array", description: "Tally character counts in fixed 26-size array and find first with frequency 1.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "leetcode", expected_output: "0", is_sample: true, category: "SAMPLE" },
      { input: "loveleetcode", expected_output: "2", is_sample: true, category: "SAMPLE" },
      { input: "aabb", expected_output: "-1", is_sample: false, category: "BOUNDARY" },
      { input: "z", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 20,
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    description: "Write a function to find the longest common prefix string amongst an array of strings.\nIf there is no common prefix, print \"\" (empty string / blank line).\n\n### Input Format\nFirst line contains integer N.\nNext N lines each contain a single string.\n\n### Output Format\nPrint the longest common prefix string.\n\n### Constraints\n1 <= N <= 1000\n0 <= length(s[i]) <= 200",
    difficulty: "EASY",
    topic: "Strings",
    subtopics: ["Substrings", "String manipulation"],
    constraints: "1 <= N <= 1000, 0 <= |s[i]| <= 200.",
    input_format: "Line 1: N. Next N lines: strings.",
    output_format: "Prefix string.",
    examples: [
      { input: "3\nflower\nflow\nflight", output: "fl", explanation: "\"fl\" is the longest common prefix." }
    ],
    expected_time_complexity: "O(S)",
    expected_space_complexity: "O(1)",
    tags: ["string", "trie"],
    stages: [
      { name: "Stage 1: Horizontal Scanning", description: "Compare prefix against each subsequent string one by one.", order_index: 1, is_required: true, expected_time_complexity: "O(S)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Vertical Column Scanning", description: "Scan character by character across all strings simultaneously.", order_index: 2, is_required: true, expected_time_complexity: "O(S)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "3\nflower\nflow\nflight", expected_output: "fl", is_sample: true, category: "SAMPLE" },
      { input: "3\ndog\nracecar\ncar", expected_output: "", is_sample: true, category: "SAMPLE" },
      { input: "1\nalgomind", expected_output: "algomind", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 21,
    title: "Isomorphic Strings",
    slug: "isomorphic-strings",
    description: "Given two strings s and t, determine if they are isomorphic.\nTwo strings s and t are isomorphic if the characters in s can be replaced to get t, preserving the order of characters. No two characters may map to the same character, but a character may map to itself.\n\n### Input Format\nFirst line contains string s.\nSecond line contains string t.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= length(s) <= 5 * 10^4\nlength(t) == length(s)",
    difficulty: "EASY",
    topic: "Strings",
    subtopics: ["String frequency", "Hash Maps"],
    constraints: "1 <= |s| <= 50000, |s| == |t|.",
    input_format: "Two lines: string s, then string t.",
    output_format: "true or false",
    examples: [
      { input: "egg\nadd", output: "true", explanation: "'e' -> 'a', 'g' -> 'd'." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["string", "hash-map"],
    stages: [
      { name: "Stage 1: Dual Map Bijection", description: "Maintain forward and backward mapping dictionaries in O(N).", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Last Seen Index Arrays", description: "Track character last-seen positions using two 256-sized integer arrays.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "egg\nadd", expected_output: "true", is_sample: true, category: "SAMPLE" },
      { input: "foo\nbar", expected_output: "false", is_sample: true, category: "SAMPLE" },
      { input: "paper\ntitle", expected_output: "true", is_sample: false, category: "SCALE" },
      { input: "badc\nbaba", expected_output: "false", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 22,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: "Given a string s, find the length of the longest substring without duplicate characters.\n\n### Input Format\nA single line containing string s (can be empty or contain spaces).\n\n### Output Format\nPrint the maximum length.\n\n### Constraints\n0 <= length(s) <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    difficulty: "MEDIUM",
    topic: "Strings",
    subtopics: ["Substrings", "Sliding Window"],
    constraints: "0 <= |s| <= 50000.",
    input_format: "Single line string s.",
    output_format: "Single integer length.",
    examples: [
      { input: "abcabcbb", output: "3", explanation: "The answer is \"abc\", with the length of 3." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(min(N, Sigma))",
    tags: ["string", "sliding-window", "hash-set"],
    stages: [
      { name: "Stage 1: Quadratic Window Check", description: "Test all substring prefixes with hash set in O(N^2).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(Sigma)" },
      { name: "Stage 2: Optimized Sliding Window Map", description: "Store last index of characters to jump the left pointer forward in O(N).", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(Sigma)" }
    ],
    test_cases: [
      { input: "abcabcbb", expected_output: "3", is_sample: true, category: "SAMPLE" },
      { input: "bbbbb", expected_output: "1", is_sample: true, category: "SAMPLE" },
      { input: "pwwkew", expected_output: "3", is_sample: true, category: "SAMPLE" },
      { input: "", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 23,
    title: "String Compression (Run-Length Encoding)",
    slug: "string-compression-run-length",
    description: "Given an array of characters chars, compress it using the following algorithm:\nBegin with an empty string s. For each group of consecutive repeating characters in chars:\n- If the group's length is 1, append the character to s.\n- Otherwise, append the character followed by the group's length.\nPrint the compressed string and its new length.\n\n### Input Format\nA single line containing string chars without spaces.\n\n### Output Format\nFirst line: The compressed string.\nSecond line: The length of the compressed string.\n\n### Constraints\n1 <= length(chars) <= 2000",
    difficulty: "MEDIUM",
    topic: "Strings",
    subtopics: ["String manipulation", "Pattern matching"],
    constraints: "1 <= |chars| <= 2000.",
    input_format: "Single word string chars.",
    output_format: "Line 1: compressed string. Line 2: length.",
    examples: [
      { input: "aabbccc", output: "a2b2c3\n6", explanation: "\"aa\" -> \"a2\", \"bb\" -> \"b2\", \"ccc\" -> \"c3\"." }
    ],
    expected_time_complexity: "O(N)",
    expected_space_complexity: "O(1)",
    tags: ["string", "two-pointers"],
    stages: [
      { name: "Stage 1: Auxiliary String Builder", description: "Count consecutive runs and append to output buffer.", order_index: 1, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(N)" },
      { name: "Stage 2: In-Place Two-Pointer Overwrite", description: "Overwrite the input character array in-place with run counts in O(1) auxiliary space.", order_index: 2, is_required: true, expected_time_complexity: "O(N)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "aabbccc", expected_output: "a2b2c3\n6", is_sample: true, category: "SAMPLE" },
      { input: "a", expected_output: "a\n1", is_sample: true, category: "SAMPLE" },
      { input: "abbbbbbbbbbbb", expected_output: "ab12\n4", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 24,
    title: "Palindromic Substrings Count",
    slug: "palindromic-substrings-count",
    description: "Given a string s, return the number of palindromic substrings in it.\nA string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.\n\n### Input Format\nA single line containing string s.\n\n### Output Format\nPrint the total count of palindromic substrings.\n\n### Constraints\n1 <= length(s) <= 1000\ns consists of lowercase English letters.",
    difficulty: "MEDIUM",
    topic: "Strings",
    subtopics: ["Palindromes", "String manipulation"],
    constraints: "1 <= |s| <= 1000.",
    input_format: "Single line string s.",
    output_format: "Single integer count.",
    examples: [
      { input: "abc", output: "3", explanation: "Three palindromic substrings: \"a\", \"b\", \"c\"." },
      { input: "aaa", output: "6", explanation: "Six palindromic substrings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"." }
    ],
    expected_time_complexity: "O(N^2)",
    expected_space_complexity: "O(1)",
    tags: ["string", "dynamic-programming", "center-expansion"],
    stages: [
      { name: "Stage 1: DP Table O(N^2) Space", description: "Use 2D boolean table dp[i][j] = (s[i]==s[j] && dp[i+1][j-1]).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(N^2)" },
      { name: "Stage 2: Expand Around Centers", description: "Expand outward from all 2N-1 centers in O(1) space.", order_index: 2, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(1)" }
    ],
    test_cases: [
      { input: "abc", expected_output: "3", is_sample: true, category: "SAMPLE" },
      { input: "aaa", expected_output: "6", is_sample: true, category: "SAMPLE" },
      { input: "racecar", expected_output: "10", is_sample: false, category: "SCALE" }
    ]
  },
  {
    id: 25,
    title: "Implement strStr() / KMP Pattern Matching",
    slug: "implement-strstr-kmp-pattern-matching",
    description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.\n\n### Input Format\nFirst line contains haystack.\nSecond line contains needle.\n\n### Output Format\nPrint the 0-based index of the first match, or -1.\n\n### Constraints\n1 <= length(haystack), length(needle) <= 10^5\nhaystack and needle consist of only lowercase English characters.",
    difficulty: "MEDIUM",
    topic: "Strings",
    subtopics: ["Pattern matching", "Substrings"],
    constraints: "1 <= |haystack|, |needle| <= 10^5.",
    input_format: "Line 1: haystack. Line 2: needle.",
    output_format: "0-based integer index or -1.",
    examples: [
      { input: "sadbutsad\nsad", output: "0", explanation: "\"sad\" occurs at index 0 and 6. First is 0." }
    ],
    expected_time_complexity: "O(N + M)",
    expected_space_complexity: "O(M)",
    tags: ["string", "string-matching", "kmp"],
    stages: [
      { name: "Stage 1: Naive Sliding Match", description: "Slide window across haystack in O(N * M) worst case.", order_index: 1, is_required: true, expected_time_complexity: "O(N*M)", expected_space_complexity: "O(1)" },
      { name: "Stage 2: Knuth-Morris-Pratt (KMP) LPS Array", description: "Compute Longest Proper Prefix which is also Suffix (LPS) for linear O(N + M) search.", order_index: 2, is_required: true, expected_time_complexity: "O(N + M)", expected_space_complexity: "O(M)" }
    ],
    test_cases: [
      { input: "sadbutsad\nsad", expected_output: "0", is_sample: true, category: "SAMPLE" },
      { input: "leetcode\nleeto", expected_output: "-1", is_sample: true, category: "SAMPLE" },
      { input: "aabaaabaaac\naabaaac", expected_output: "4", is_sample: false, category: "EDGE_CASE" }
    ]
  },
  {
    id: 26,
    title: "Multiply Large Strings",
    slug: "multiply-large-strings",
    description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.\nNote: You must not use any built-in BigInteger library or convert the inputs to integers directly.\n\n### Input Format\nFirst line contains string num1.\nSecond line contains string num2.\n\n### Output Format\nPrint the product string.\n\n### Constraints\n1 <= length(num1), length(num2) <= 200\nnum1 and num2 consist of digits only and do not contain leading zeros except for \"0\".",
    difficulty: "MEDIUM",
    topic: "Strings",
    subtopics: ["String manipulation"],
    constraints: "1 <= |num1|, |num2| <= 200.",
    input_format: "Two lines with num1 and num2.",
    output_format: "Product string.",
    examples: [
      { input: "2\n3", output: "6", explanation: "2 * 3 = 6." },
      { input: "123\n456", output: "56088", explanation: "123 * 456 = 56088." }
    ],
    expected_time_complexity: "O(N * M)",
    expected_space_complexity: "O(N + M)",
    tags: ["string", "math", "simulation"],
    stages: [
      { name: "Stage 1: Column-by-Column Grade-School Multiplication", description: "Multiply digit by digit storing sums in an integer buffer array of size N+M.", order_index: 1, is_required: true, expected_time_complexity: "O(N*M)", expected_space_complexity: "O(N+M)" }
    ],
    test_cases: [
      { input: "2\n3", expected_output: "6", is_sample: true, category: "SAMPLE" },
      { input: "123\n456", expected_output: "56088", is_sample: true, category: "SAMPLE" },
      { input: "0\n45678", expected_output: "0", is_sample: false, category: "BOUNDARY" }
    ]
  },
  {
    id: 27,
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return empty string \"\".\n\n### Input Format\nFirst line contains string s.\nSecond line contains string t.\n\n### Output Format\nPrint the minimum window substring, or a blank line if none exists.\n\n### Constraints\n1 <= length(s), length(t) <= 10^5\ns and t consist of uppercase and lowercase English letters.",
    difficulty: "HARD",
    topic: "Strings",
    subtopics: ["Substrings", "Pattern matching", "Sliding Window"],
    constraints: "1 <= |s|, |t| <= 10^5.",
    input_format: "Line 1: s. Line 2: t.",
    output_format: "Minimum window substring.",
    examples: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", explanation: "The minimum window substring \"BANC\" includes 'A', 'B', and 'C'." }
    ],
    expected_time_complexity: "O(N + M)",
    expected_space_complexity: "O(Sigma)",
    tags: ["string", "sliding-window", "hash-table", "hard-interview"],
    stages: [
      { name: "Stage 1: Quadratic Search", description: "Inspect all valid windows in O(N^2 * Sigma).", order_index: 1, is_required: true, expected_time_complexity: "O(N^2)", expected_space_complexity: "O(Sigma)" },
      { name: "Stage 2: Expand & Contract Two-Pointer Window", description: "Use right pointer to satisfy character requirements and contract left pointer to minimize window in O(N + M).", order_index: 2, is_required: true, expected_time_complexity: "O(N + M)", expected_space_complexity: "O(Sigma)" }
    ],
    test_cases: [
      { input: "ADOBECODEBANC\nABC", expected_output: "BANC", is_sample: true, category: "SAMPLE" },
      { input: "a\na", expected_output: "a", is_sample: true, category: "SAMPLE" },
      { input: "a\naa", expected_output: "", is_sample: false, category: "EDGE_CASE" }
    ]
  }
];
