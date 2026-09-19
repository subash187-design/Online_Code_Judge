module.exports = [
  {
    "id": 58,
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n### Input Format\nA single line containing string s.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= length(s) <= 10^5\ns consists of parentheses only '()[]{}'.",
    "difficulty": "EASY",
    "topic": "Stack & Queue",
    "subtopics": [
      "Valid parentheses",
      "Monotonic stack"
    ],
    "constraints": "1 <= |s| <= 10^5.",
    "input_format": "Single line string s.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "()[]{}",
        "output": "true",
        "explanation": "All brackets are properly paired and nested."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "string"
    ],
    "stages": [
      {
        "name": "Stage 1: LIFO Stack Matching",
        "description": "Push opening brackets onto stack and pop matching counterpart on closing brackets.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "()[]{}",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "(]",
        "expected_output": "false",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "([{}])",
        "expected_output": "true",
        "is_sample": false,
        "category": "BOUNDARY"
      },
      {
        "input": "]",
        "expected_output": "false",
        "is_sample": false,
        "category": "EDGE_CASE"
      }
    ]
  },
  {
    "id": 59,
    "title": "Implement Queue using Stacks",
    "slug": "implement-queue-using-stacks",
    "description": "Implement a first in first out (FIFO) queue using only two stacks. Process Q operations of types:\n- `push x`: Push element x to the back of queue.\n- `pop`: Removes the element from the front of queue and prints it.\n- `peek`: Prints the element at the front of queue.\n- `empty`: Prints \"true\" if empty, otherwise \"false\".\n\n### Input Format\nFirst line contains integer Q.\nNext Q lines each contain an operation command.\n\n### Output Format\nFor each pop, peek, or empty command, print the result on a new line.\n\n### Constraints\n1 <= Q <= 1000\n1 <= x <= 10^9",
    "difficulty": "EASY",
    "topic": "Stack & Queue",
    "subtopics": [
      "Queue/deque problems"
    ],
    "constraints": "1 <= Q <= 1000.",
    "input_format": "Line 1: Q. Next Q lines: operations.",
    "output_format": "Output of each query on separate line.",
    "examples": [
      {
        "input": "5\npush 1\npush 2\npeek\npop\nempty",
        "output": "1\n1\nfalse",
        "explanation": "FIFO order verified."
      }
    ],
    "expected_time_complexity": "O(1) amortized per operation",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "queue",
      "design"
    ],
    "stages": [
      {
        "name": "Stage 1: Amortized In/Out Dual Stacks",
        "description": "Use input stack for push and output stack for pop/peek; transfer only when output stack is empty.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(1) amortized",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\npush 1\npush 2\npeek\npop\nempty",
        "expected_output": "1\n1\nfalse",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\npush 10\npush 20\npop\npop",
        "expected_output": "20\n10",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 60,
    "title": "Baseball Game Score Tracker",
    "slug": "baseball-game-score-tracker",
    "description": "You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.\nYou are given an array of strings operations, where operations[i] is the ith operation you must apply to the record:\n- An integer x: Record a new score of x.\n- '+': Record a new score that is the sum of the previous two scores.\n- 'D': Record a new score that is double of the previous score.\n- 'C': Invalidate the previous score, removing it from the record.\nReturn the sum of all the scores on the record after applying all the operations.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated tokens.\n\n### Output Format\nPrint the total sum.\n\n### Constraints\n1 <= N <= 1000",
    "difficulty": "EASY",
    "topic": "Stack & Queue",
    "subtopics": [
      "Monotonic stack",
      "Expression-related problems"
    ],
    "constraints": "1 <= N <= 1000.",
    "input_format": "Line 1: N. Line 2: N space-separated tokens.",
    "output_format": "Single integer sum.",
    "examples": [
      {
        "input": "5\n5 2 C D +",
        "output": "30",
        "explanation": "5, then 2, C removes 2, D adds 10, + adds 15. Total = 5 + 10 + 15 = 30."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "simulation"
    ],
    "stages": [
      {
        "name": "Stage 1: Direct Stack Score Emulation",
        "description": "Maintain score list using stack push, pop, and top inspection.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n5 2 C D +",
        "expected_output": "30",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "8\n5 -2 4 C D 9 + +",
        "expected_output": "27",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n1",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 61,
    "title": "Min Stack Design",
    "slug": "min-stack-design",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\nProcess Q operations:\n- `push x`: Push element x onto stack.\n- `pop`: Removes the element on the top of the stack.\n- `top`: Prints the top element.\n- `getMin`: Prints the minimum element in the stack.\n\n### Input Format\nFirst line contains integer Q.\nNext Q lines each contain an operation command.\n\n### Output Format\nFor each top and getMin command, print the integer on a new line.\n\n### Constraints\n1 <= Q <= 3 * 10^4\n-2^31 <= x <= 2^31 - 1",
    "difficulty": "MEDIUM",
    "topic": "Stack & Queue",
    "subtopics": [
      "Min stack"
    ],
    "constraints": "1 <= Q <= 30000.",
    "input_format": "Line 1: Q. Next Q lines: operations.",
    "output_format": "Result of top/getMin on separate lines.",
    "examples": [
      {
        "input": "6\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        "output": "-3\n0\n-2",
        "explanation": "Min values tracked correctly."
      }
    ],
    "expected_time_complexity": "O(1) per operation",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "design"
    ],
    "stages": [
      {
        "name": "Stage 1: Auxiliary Minimum Stack",
        "description": "Maintain a parallel stack of running minimums alongside values in O(1) time.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(1)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        "expected_output": "-3\n0\n-2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\npush 1\npush 2\ngetMin\npop\ngetMin",
        "expected_output": "1\n1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 62,
    "title": "Next Greater Element",
    "slug": "next-greater-element",
    "description": "Given an array of integers nums, return an array answer where answer[i] is the next greater element to the right of nums[i]. If there is no greater element, return -1 for that position.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint N space-separated integers representing next greater elements.\n\n### Constraints\n1 <= N <= 10^5\n-10^9 <= nums[i] <= 10^9",
    "difficulty": "MEDIUM",
    "topic": "Stack & Queue",
    "subtopics": [
      "Next greater element",
      "Monotonic stack"
    ],
    "constraints": "1 <= N <= 10^5.",
    "input_format": "Line 1: N. Line 2: N integers.",
    "output_format": "N space-separated next greater values.",
    "examples": [
      {
        "input": "4\n4 5 2 25",
        "output": "5 25 25 -1",
        "explanation": "Next greater for 4 is 5, for 5 is 25, for 2 is 25, for 25 is -1."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "monotonic-stack",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Monotonic Decreasing Stack",
        "description": "Scan from right to left maintaining stack of potential next greater candidates in linear O(N) time.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n4 5 2 25",
        "expected_output": "5 25 25 -1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\n13 7 6 12",
        "expected_output": "-1 12 12 -1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n5",
        "expected_output": "-1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 63,
    "title": "Daily Temperatures",
    "slug": "daily-temperatures",
    "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint N space-separated integers.\n\n### Constraints\n1 <= N <= 10^5\n30 <= temperatures[i] <= 100",
    "difficulty": "MEDIUM",
    "topic": "Stack & Queue",
    "subtopics": [
      "Monotonic stack"
    ],
    "constraints": "1 <= N <= 10^5, 30 <= temperatures[i] <= 100.",
    "input_format": "Line 1: N. Line 2: N temperatures.",
    "output_format": "N space-separated wait days.",
    "examples": [
      {
        "input": "8\n73 74 75 71 69 72 76 73",
        "output": "1 1 4 2 1 1 0 0",
        "explanation": "Day 0 (73) waits 1 day for 74, etc."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "monotonic-stack",
      "array"
    ],
    "stages": [
      {
        "name": "Stage 1: Monotonic Stack of Indices",
        "description": "Store indices in stack; whenever current temperature is warmer than top, pop and compute distance.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "8\n73 74 75 71 69 72 76 73",
        "expected_output": "1 1 4 2 1 1 0 0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4\n30 40 50 60",
        "expected_output": "1 1 1 0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n30 60 90",
        "expected_output": "1 1 0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 64,
    "title": "Evaluate Reverse Polish Notation",
    "slug": "evaluate-reverse-polish-notation",
    "description": "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation (postfix notation).\nEvaluate the expression. Return an integer that represents the value of the expression.\nValid operators are '+', '-', '*', and '/'. Each operand may be an integer or another expression. Division between two integers always truncates toward zero.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated tokens.\n\n### Output Format\nPrint the evaluated integer result.\n\n### Constraints\n1 <= N <= 10^4\nTokens are valid RPN integers or operators.",
    "difficulty": "MEDIUM",
    "topic": "Stack & Queue",
    "subtopics": [
      "Expression-related problems",
      "Monotonic stack"
    ],
    "constraints": "1 <= N <= 10^4.",
    "input_format": "Line 1: N. Line 2: N tokens.",
    "output_format": "Single integer.",
    "examples": [
      {
        "input": "5\n2 1 + 3 *",
        "output": "9",
        "explanation": "((2 + 1) * 3) = 9."
      },
      {
        "input": "5\n4 13 5 / +",
        "output": "6",
        "explanation": "(4 + (13 / 5)) = 6."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "math"
    ],
    "stages": [
      {
        "name": "Stage 1: LIFO Evaluation Stack",
        "description": "Push numbers onto stack; when operator is encountered, pop top two operands, evaluate, and push result back.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n2 1 + 3 *",
        "expected_output": "9",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\n4 13 5 / +",
        "expected_output": "6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5\n4 2 + 3 *",
        "expected_output": "18",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 65,
    "title": "Simplify Unix Path",
    "slug": "simplify-unix-path",
    "description": "Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.\nRules:\n- A single period '.' refers to the current directory.\n- A double period '..' refers to the parent directory.\n- Multiple consecutive slashes are treated as a single slash '/'.\n- Any other format of periods such as '...' are treated as file/directory names.\n\n### Input Format\nA single line containing the path string.\n\n### Output Format\nPrint the simplified canonical path.\n\n### Constraints\n1 <= length(path) <= 3000",
    "difficulty": "MEDIUM",
    "topic": "Stack & Queue",
    "subtopics": [
      "Expression-related problems",
      "Queue/deque problems"
    ],
    "constraints": "1 <= |path| <= 3000.",
    "input_format": "Single line path.",
    "output_format": "Canonical path starting with '/'.",
    "examples": [
      {
        "input": "/home/",
        "output": "/home",
        "explanation": "Trailing slash is removed."
      },
      {
        "input": "/../",
        "output": "/",
        "explanation": "Going one level up from root stays at root."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "string"
    ],
    "stages": [
      {
        "name": "Stage 1: Directory Component Stack",
        "description": "Split by '/', push valid directories, and pop on '..'.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "/home/",
        "expected_output": "/home",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "/../",
        "expected_output": "/",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "/home//foo/",
        "expected_output": "/home/foo",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "/a/./b/../../c/",
        "expected_output": "/c",
        "is_sample": false,
        "category": "EDGE_CASE"
      }
    ]
  },
  {
    "id": 66,
    "title": "Basic Calculator (Parentheses and Signs)",
    "slug": "basic-calculator-parentheses-signs",
    "description": "Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.\nNote: You are not allowed to use any built-in function which evaluates strings as mathematical expressions.\ns consists of digits, '+', '-', '(', ')', and spaces ' '.\n\n### Input Format\nA single line containing string s.\n\n### Output Format\nPrint the evaluated integer.\n\n### Constraints\n1 <= length(s) <= 3 * 10^5\ns represents a valid expression.",
    "difficulty": "HARD",
    "topic": "Stack & Queue",
    "subtopics": [
      "Expression-related problems",
      "Monotonic stack"
    ],
    "constraints": "1 <= |s| <= 300000, valid expression.",
    "input_format": "Single line mathematical expression.",
    "output_format": "Single integer result.",
    "examples": [
      {
        "input": "1 + 1",
        "output": "2",
        "explanation": "1 + 1 = 2."
      },
      {
        "input": "(1+(4+5+2)-3)+(6+8)",
        "output": "23",
        "explanation": "Parentheses evaluated first."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "stack",
      "recursion",
      "math",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Sign Propagation Stack",
        "description": "Push running sign and result onto stack when entering parentheses; combine upon closing bracket.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "1 + 1",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": " 2-1 + 2 ",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "(1+(4+5+2)-3)+(6+8)",
        "expected_output": "23",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "- (3 + (4 + 5))",
        "expected_output": "-12",
        "is_sample": false,
        "category": "EDGE_CASE"
      }
    ]
  },
  {
    "id": 67,
    "title": "Trapping Rain Water (Stack Approach)",
    "slug": "trapping-rain-water-stack-approach",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers representing heights.\n\n### Output Format\nPrint the total units of trapped rain water.\n\n### Constraints\n1 <= N <= 10^5\n0 <= height[i] <= 10^5",
    "difficulty": "HARD",
    "topic": "Stack & Queue",
    "subtopics": [
      "Monotonic stack",
      "Two-pointer problems"
    ],
    "constraints": "1 <= N <= 10^5, 0 <= height[i] <= 10^5.",
    "input_format": "Line 1: N. Line 2: N heights.",
    "output_format": "Single integer trapped water volume.",
    "examples": [
      {
        "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "output": "6",
        "explanation": "6 units of rain water are trapped."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "monotonic-stack",
      "two-pointers",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Monotonic Stack Bounded Basins",
        "description": "Maintain decreasing stack of indices; calculate water bounded between left and right walls when an elevation increase occurs.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "expected_output": "6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "6\n4 2 0 3 2 5",
        "expected_output": "9",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n3 2 1",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  }
];
