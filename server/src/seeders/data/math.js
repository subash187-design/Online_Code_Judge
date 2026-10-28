module.exports = [
  {
    id: 111,
    title: "Count Primes (Sieve of Eratosthenes)",
    slug: "count-primes-sieve-of-eratosthenes",
    description: "Given an integer N, return the number of prime numbers strictly less than N.\n\n### Input Format\nA single line containing integer N.\n\n### Output Format\nPrint the total count of prime numbers strictly less than N.\n\n### Constraints\n0 <= N <= 5 * 10^6",
    difficulty: "MEDIUM",
    topic: "Math",
    subtopics: ["Primes", "Sieve of Eratosthenes", "Number Theory"],
    constraints: "0 <= N <= 5 * 10^6",
    input_format: "Line 1: An integer N.",
    output_format: "A single integer representing the count of primes < N.",
    examples: [
      {
        input: "10",
        output: "4",
        explanation: "There are 4 prime numbers less than 10, which are 2, 3, 5, 7."
      },
      {
        input: "0",
        output: "0",
        explanation: "There are no primes less than 0."
      }
    ],
    expected_time_complexity: "O(N log log N)",
    expected_space_complexity: "O(N)",
    tags: ["math", "sieve", "primes", "number-theory"],
    stages: [
      {
        name: "Stage 1: Sieve of Eratosthenes",
        description: "Pre-sieve composite numbers up to N by marking multiples of each discovered prime in O(N log log N).",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N log log N)",
        expected_space_complexity: "O(N)"
      }
    ],
    test_cases: [
      {
        input: "10",
        expected_output: "4",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "0",
        expected_output: "0",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "1",
        expected_output: "0",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "2",
        expected_output: "0",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "100",
        expected_output: "25",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "1000",
        expected_output: "168",
        is_sample: false,
        category: "SCALE"
      }
    ]
  },
  {
    id: 112,
    title: "Greatest Common Divisor and LCM",
    slug: "gcd-and-lcm",
    description: "Given two positive integers A and B, compute their Greatest Common Divisor (GCD) using the Euclidean algorithm and their Least Common Multiple (LCM).\n\n### Input Format\nA single line containing two space-separated integers A and B.\n\n### Output Format\nPrint two space-separated integers: GCD and LCM.\n\n### Constraints\n1 <= A, B <= 10^9",
    difficulty: "EASY",
    topic: "Math",
    subtopics: ["Euclidean Algorithm", "Number Theory", "Divisibility"],
    constraints: "1 <= A, B <= 10^9",
    input_format: "Line 1: Two space-separated integers A and B.",
    output_format: "Two space-separated integers: GCD followed by LCM.",
    examples: [
      {
        input: "12 18",
        output: "6 36",
        explanation: "GCD(12, 18) = 6, LCM(12, 18) = (12 * 18) / 6 = 36."
      }
    ],
    expected_time_complexity: "O(log(min(A, B)))",
    expected_space_complexity: "O(1)",
    tags: ["math", "euclid", "gcd", "lcm"],
    stages: [
      {
        name: "Stage 1: Euclidean Algorithm",
        description: "Apply Euclid's subtraction/remainder algorithm gcd(a, b) = gcd(b, a % b) and compute LCM = (a / gcd) * b.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(log(min(A, B)))",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "12 18",
        expected_output: "6 36",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "5 7",
        expected_output: "1 35",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "10 10",
        expected_output: "10 10",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "14 28",
        expected_output: "14 28",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "100000 250000",
        expected_output: "50000 500000",
        is_sample: false,
        category: "SCALE"
      }
    ]
  },
  {
    id: 113,
    title: "Fast Modular Exponentiation",
    slug: "fast-modular-exponentiation",
    description: "Given three integers X, N, and M, calculate (X^N) % M efficiently using binary exponentiation.\n\n### Input Format\nA single line containing three space-separated integers: X, N, and M.\n\n### Output Format\nPrint the value of (X^N) % M.\n\n### Constraints\n0 <= X <= 10^9\n0 <= N <= 10^18\n1 <= M <= 10^9 + 7",
    difficulty: "MEDIUM",
    topic: "Math",
    subtopics: ["Binary Exponentiation", "Modular Arithmetic"],
    constraints: "0 <= X <= 10^9, 0 <= N <= 10^18, 1 <= M <= 10^9 + 7",
    input_format: "Line 1: Three space-separated integers X, N, and M.",
    output_format: "A single integer representing (X^N) % M.",
    examples: [
      {
        input: "2 10 1000",
        output: "24",
        explanation: "2^10 = 1024, and 1024 % 1000 = 24."
      },
      {
        input: "3 5 7",
        output: "5",
        explanation: "3^5 = 243, and 243 % 7 = 5."
      }
    ],
    expected_time_complexity: "O(log N)",
    expected_space_complexity: "O(1)",
    tags: ["math", "modular-arithmetic", "binary-exponentiation"],
    stages: [
      {
        name: "Stage 1: Binary Exponentiation",
        description: "Repeatedly square base and halve exponent N in O(log N) while taking modulo M at each multiplication.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(log N)",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "2 10 1000",
        expected_output: "24",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3 5 7",
        expected_output: "5",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "5 0 1000",
        expected_output: "1",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "2 30 1000000007",
        expected_output: "73741817",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "7 13 19",
        expected_output: "11",
        is_sample: false,
        category: "SCALE"
      }
    ]
  },
  {
    id: 114,
    title: "Factorial Trailing Zeroes",
    slug: "factorial-trailing-zeroes",
    description: "Given an integer N, return the number of trailing zeroes in N!.\n\nNote that your solution must run in logarithmic time complexity O(log N) without computing the actual large factorial directly.\n\n### Input Format\nA single line containing integer N.\n\n### Output Format\nPrint the number of trailing zeroes in N!.\n\n### Constraints\n0 <= N <= 10^9",
    difficulty: "MEDIUM",
    topic: "Math",
    subtopics: ["Legendre Formula", "Factorial", "Prime Factors"],
    constraints: "0 <= N <= 10^9",
    input_format: "Line 1: An integer N.",
    output_format: "A single integer: number of trailing zeroes.",
    examples: [
      {
        input: "5",
        output: "1",
        explanation: "5! = 120, which has 1 trailing zero."
      },
      {
        input: "0",
        output: "0",
        explanation: "0! = 1, which has 0 trailing zeroes."
      }
    ],
    expected_time_complexity: "O(log5 N)",
    expected_space_complexity: "O(1)",
    tags: ["math", "factorial", "number-theory"],
    stages: [
      {
        name: "Stage 1: Legendre's Formula for Factor 5",
        description: "Count multiples of 5, 25, 125, etc. via floor(N / 5^k) to find total factor-5 count in N!.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(log5 N)",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "5",
        expected_output: "1",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "3",
        expected_output: "0",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "0",
        expected_output: "0",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "25",
        expected_output: "6",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "100",
        expected_output: "24",
        is_sample: false,
        category: "SCALE"
      },
      {
        input: "1000",
        expected_output: "249",
        is_sample: false,
        category: "SCALE"
      }
    ]
  },
  {
    id: 115,
    title: "Palindrome Number",
    slug: "palindrome-number",
    description: "Given an integer X, return true if X is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.\nCould you solve it mathematically without converting the integer to a string?\n\n### Input Format\nA single line containing integer X.\n\n### Output Format\nPrint \"true\" if X is a palindrome, otherwise \"false\".\n\n### Constraints\n-2^31 <= X <= 2^31 - 1",
    difficulty: "EASY",
    topic: "Math",
    subtopics: ["Digits", "Reversal", "Arithmetic"],
    constraints: "-2^31 <= X <= 2^31 - 1",
    input_format: "Line 1: An integer X.",
    output_format: "true or false",
    examples: [
      {
        input: "121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "-121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        input: "10",
        output: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    expected_time_complexity: "O(log10 X)",
    expected_space_complexity: "O(1)",
    tags: ["math", "digits", "palindrome"],
    stages: [
      {
        name: "Stage 1: Mathematical Half-Reversal",
        description: "Reverse the second half of the digits mathematically and compare with the first half in O(log10 X) and O(1) space.",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(log10 X)",
        expected_space_complexity: "O(1)"
      }
    ],
    test_cases: [
      {
        input: "121",
        expected_output: "true",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "-121",
        expected_output: "false",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "10",
        expected_output: "false",
        is_sample: true,
        category: "SAMPLE"
      },
      {
        input: "0",
        expected_output: "true",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "12321",
        expected_output: "true",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "1000021",
        expected_output: "false",
        is_sample: false,
        category: "SCALE"
      }
    ]
  },
  {
    id: 116,
    title: "Pascal's Triangle",
    slug: "pascals-triangle",
    description: "Given an integer N, generate the first N rows of Pascal's triangle.\n\nIn Pascal's triangle, each number is the sum of the two numbers directly above it. The first row is index 1 containing just [1].\n\n### Input Format\nA single line containing integer N.\n\n### Output Format\nPrint N lines. The i-th line contains the i space-separated integers of that row.\n\n### Constraints\n1 <= N <= 30",
    difficulty: "EASY",
    topic: "Math",
    subtopics: ["Combinatorics", "2D Array", "Pascal"],
    constraints: "1 <= N <= 30",
    input_format: "Line 1: An integer N.",
    output_format: "N lines, each containing space-separated integers for that row.",
    examples: [
      {
        input: "5",
        output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
        explanation: "The first 5 rows of Pascal's Triangle."
      },
      {
        input: "1",
        output: "1",
        explanation: "Only 1 row."
      }
    ],
    expected_time_complexity: "O(N^2)",
    expected_space_complexity: "O(N^2)",
    tags: ["math", "dynamic-programming", "combinatorics"],
    stages: [
      {
        name: "Stage 1: Row by Row Generation",
        description: "Construct each row where row[j] = prevRow[j-1] + prevRow[j] for 0 < j < i in O(N^2).",
        order_index: 1,
        is_required: true,
        expected_time_complexity: "O(N^2)",
        expected_space_complexity: "O(N^2)"
      }
    ],
    test_cases: [
      {
        input: "5",
        expected_output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
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
        input: "2",
        expected_output: "1\n1 1",
        is_sample: false,
        category: "BOUNDARY"
      },
      {
        input: "3",
        expected_output: "1\n1 1\n1 2 1",
        is_sample: false,
        category: "EDGE_CASE"
      },
      {
        input: "4",
        expected_output: "1\n1 1\n1 2 1\n1 3 3 1",
        is_sample: false,
        category: "SCALE"
      }
    ]
  }
];
