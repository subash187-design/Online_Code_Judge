module.exports = [
  {
    "id": 48,
    "title": "Reverse a Singly Linked List",
    "slug": "reverse-a-singly-linked-list",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\n### Input Format\nFirst line contains integer N (number of nodes).\nSecond line contains N space-separated integers representing the list values.\n\n### Output Format\nPrint the reversed list as N space-separated integers.\n\n### Constraints\n0 <= N <= 5000\n-5000 <= Node.val <= 5000",
    "difficulty": "EASY",
    "topic": "Linked List",
    "subtopics": [
      "Reverse linked list",
      "Linked-list manipulation"
    ],
    "constraints": "0 <= N <= 5000, -5000 <= Node.val <= 5000.",
    "input_format": "Line 1: N. Line 2: N node values.",
    "output_format": "N space-separated integers in reverse.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "5 4 3 2 1",
        "explanation": "1->2->3->4->5 becomes 5->4->3->2->1."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "recursion"
    ],
    "stages": [
      {
        "name": "Stage 1: Iterative Pointer Reversal",
        "description": "Use prev, curr, next pointers to reverse list in-place in O(N) time and O(1) space.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n1 2 3 4 5",
        "expected_output": "5 4 3 2 1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\n1 2",
        "expected_output": "2 1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "0\n",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 49,
    "title": "Middle of the Linked List",
    "slug": "middle-of-the-linked-list",
    "description": "Given the head of a singly linked list, return the middle node of the linked list.\nIf there are two middle nodes, return the second middle node.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the values from the middle node to the end of the list.\n\n### Constraints\n1 <= N <= 5000\n1 <= Node.val <= 5000",
    "difficulty": "EASY",
    "topic": "Linked List",
    "subtopics": [
      "Middle node",
      "Fast/slow pointers"
    ],
    "constraints": "1 <= N <= 5000.",
    "input_format": "Line 1: N. Line 2: N node values.",
    "output_format": "Values from middle node to end.",
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "3 4 5",
        "explanation": "The middle node is 3."
      },
      {
        "input": "6\n1 2 3 4 5 6",
        "output": "4 5 6",
        "explanation": "Two middle nodes 3 and 4, returns second middle (4)."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "stages": [
      {
        "name": "Stage 1: Two-Pass Count",
        "description": "Count length N and traverse N/2 steps in second pass.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      },
      {
        "name": "Stage 2: Single-Pass Fast & Slow Pointers (Tortoise and Hare)",
        "description": "Slow pointer moves 1 step, fast pointer moves 2 steps in O(N).",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n1 2 3 4 5",
        "expected_output": "3 4 5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "6\n1 2 3 4 5 6",
        "expected_output": "4 5 6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n99",
        "expected_output": "99",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 50,
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "description": "You are given the heads of two sorted linked lists list1 and list2.\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\nReturn the head of the merged linked list.\n\n### Input Format\nFirst line contains integer N1.\nSecond line contains N1 space-separated integers for list1.\nThird line contains integer N2.\nFourth line contains N2 space-separated integers for list2.\n\n### Output Format\nPrint the merged sorted list as space-separated integers.\n\n### Constraints\n0 <= N1, N2 <= 5000\n-5000 <= Node.val <= 5000",
    "difficulty": "EASY",
    "topic": "Linked List",
    "subtopics": [
      "Merge lists",
      "Fast/slow pointers"
    ],
    "constraints": "0 <= N1, N2 <= 5000, lists sorted non-decreasingly.",
    "input_format": "Line 1: N1. Line 2: list1. Line 3: N2. Line 4: list2.",
    "output_format": "Merged sorted integers.",
    "examples": [
      {
        "input": "3\n1 2 4\n3\n1 3 4",
        "output": "1 1 2 3 4 4",
        "explanation": "Merged in sorted order."
      }
    ],
    "expected_time_complexity": "O(N + M)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "stages": [
      {
        "name": "Stage 1: Iterative Dummy Head Splicing",
        "description": "Use dummy head and splice smaller node at each step in O(N + M) time and O(1) space.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N + M)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "3\n1 2 4\n3\n1 3 4",
        "expected_output": "1 1 2 3 4 4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "0\n\n1\n0",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "0\n\n0\n",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 51,
    "title": "Delete Node in a Linked List",
    "slug": "delete-node-in-a-linked-list",
    "description": "There is a singly-linked list head and we want to delete a node in it.\nYou are given the value val of the node to be deleted. Delete the first occurrence of val from the linked list.\n\n### Input Format\nFirst line contains two integers N and val.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the list after deletion as space-separated integers.\n\n### Constraints\n1 <= N <= 5000\n-5000 <= Node.val <= 5000",
    "difficulty": "EASY",
    "topic": "Linked List",
    "subtopics": [
      "Linked-list manipulation"
    ],
    "constraints": "1 <= N <= 5000.",
    "input_format": "Line 1: N val. Line 2: N node values.",
    "output_format": "N-1 space-separated integers.",
    "examples": [
      {
        "input": "4 5\n4 5 1 9",
        "output": "4 1 9",
        "explanation": "Node with value 5 is deleted."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list"
    ],
    "stages": [
      {
        "name": "Stage 1: Pointer Skip Deletion",
        "description": "Locate target node and update previous pointer to bypass target.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4 5\n4 5 1 9",
        "expected_output": "4 1 9",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4 1\n4 5 1 9",
        "expected_output": "4 5 9",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1\n1 2",
        "expected_output": "2",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 52,
    "title": "Linked List Cycle Detection",
    "slug": "linked-list-cycle-detection",
    "description": "Given the head of a linked list, determine if the linked list has a cycle in it.\nA cycle is present if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (-1 if no cycle).\n\n### Input Format\nFirst line contains two integers N and pos.\nSecond line contains N space-separated integers (if N > 0).\n\n### Output Format\nPrint \"true\" if there is a cycle, otherwise \"false\".\n\n### Constraints\n0 <= N <= 10^4\n-1 <= pos < N",
    "difficulty": "MEDIUM",
    "topic": "Linked List",
    "subtopics": [
      "Cycle detection",
      "Fast/slow pointers"
    ],
    "constraints": "0 <= N <= 10000, -1 <= pos < N.",
    "input_format": "Line 1: N pos. Line 2: N values.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "4 1\n3 2 0 -4",
        "output": "true",
        "explanation": "Tail connects to index 1, forming a cycle."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers",
      "floyd-cycle"
    ],
    "stages": [
      {
        "name": "Stage 1: Hash Set Node Visitation",
        "description": "Store visited node pointers in a hash set in O(N) space.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      },
      {
        "name": "Stage 2: Floyd Tortoise and Hare",
        "description": "Fast pointer moves 2 steps, slow moves 1 step; detect meeting in O(1) space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4 1\n3 2 0 -4",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 0\n1 2",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 -1\n1",
        "expected_output": "false",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 53,
    "title": "Find the Start of Cycle (Linked List Cycle II)",
    "slug": "find-start-of-cycle-linked-list-ii",
    "description": "Given the head of a linked list, return the 0-based index of the node where the cycle begins. If there is no cycle, return -1.\nNotice: You should not modify the linked list.\n\n### Input Format\nFirst line contains two integers N and pos.\nSecond line contains N space-separated integers.\n\n### Output Format\nPrint the 0-based index where the cycle begins, or -1.\n\n### Constraints\n0 <= N <= 10^4\n-1 <= pos < N",
    "difficulty": "MEDIUM",
    "topic": "Linked List",
    "subtopics": [
      "Cycle detection",
      "Fast/slow pointers"
    ],
    "constraints": "0 <= N <= 10^4, -1 <= pos < N.",
    "input_format": "Line 1: N pos. Line 2: N integers.",
    "output_format": "Cycle start index or -1.",
    "examples": [
      {
        "input": "4 1\n3 2 0 -4",
        "output": "1",
        "explanation": "Cycle begins at node with index 1."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers",
      "floyd-cycle"
    ],
    "stages": [
      {
        "name": "Stage 1: Floyd Cycle Meeting + Phase 2 Alignment",
        "description": "After collision, reset slow pointer to head; both advance 1 step to meet at cycle entry.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "4 1\n3 2 0 -4",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 0\n1 2",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 -1\n1",
        "expected_output": "-1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 54,
    "title": "Remove Nth Node From End of List",
    "slug": "remove-nth-node-from-end-of-list",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\n### Input Format\nFirst line contains two integers L (length of list) and n.\nSecond line contains L space-separated integers.\n\n### Output Format\nPrint the modified list as space-separated integers.\n\n### Constraints\n1 <= L <= 5000\n1 <= n <= L\n-1000 <= Node.val <= 1000",
    "difficulty": "MEDIUM",
    "topic": "Linked List",
    "subtopics": [
      "Fast/slow pointers",
      "Linked-list manipulation"
    ],
    "constraints": "1 <= n <= L <= 5000.",
    "input_format": "Line 1: L n. Line 2: L integers.",
    "output_format": "Remaining elements separated by space.",
    "examples": [
      {
        "input": "5 2\n1 2 3 4 5",
        "output": "1 2 3 5",
        "explanation": "The 2nd node from end (4) is removed."
      }
    ],
    "expected_time_complexity": "O(L)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "stages": [
      {
        "name": "Stage 1: Two Pointers with Offset N",
        "description": "Advance fast pointer by n+1 steps, then advance fast and slow simultaneously to find target predecessor.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(L)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5 2\n1 2 3 4 5",
        "expected_output": "1 2 3 5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1\n1",
        "expected_output": "",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1\n1 2",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 55,
    "title": "Intersection of Two Linked Lists",
    "slug": "intersection-of-two-linked-lists",
    "description": "Given the heads of two singly linked-lists listA and listB, return the value of the node at which the two lists intersect. If the two lists have no intersection at all, print \"null\".\n\n### Input Format\nFirst line contains integers NA, NB, skipA, skipB (number of nodes to skip before intersection).\nSecond line contains NA integers for listA.\nThird line contains NB integers for listB.\n\n### Output Format\nPrint the intersection node value, or \"null\".\n\n### Constraints\n1 <= NA, NB <= 10^4\n0 <= skipA < NA\n0 <= skipB < NB",
    "difficulty": "MEDIUM",
    "topic": "Linked List",
    "subtopics": [
      "Intersection",
      "Fast/slow pointers"
    ],
    "constraints": "1 <= NA, NB <= 10^4.",
    "input_format": "Line 1: NA NB skipA skipB. Line 2: listA. Line 3: listB.",
    "output_format": "Node value or null.",
    "examples": [
      {
        "input": "5 6 2 3\n4 1 8 4 5\n5 6 1 8 4 5",
        "output": "8",
        "explanation": "Both lists intersect at node with value 8."
      }
    ],
    "expected_time_complexity": "O(NA + NB)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "stages": [
      {
        "name": "Stage 1: Dual Pointer Cycle Re-routing",
        "description": "Pointer A walks A then B; Pointer B walks B then A; both travel equal distance NA + NB to meet at intersection.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(NA + NB)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5 6 2 3\n4 1 8 4 5\n5 6 1 8 4 5",
        "expected_output": "8",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 2 3 2\n2 6 4\n1 5",
        "expected_output": "null",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1 0 0\n3\n3",
        "expected_output": "3",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 56,
    "title": "Add Two Numbers Represented by Lists",
    "slug": "add-two-numbers-represented-by-lists",
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list in reverse order.\n\n### Input Format\nFirst line contains integer N1.\nSecond line contains N1 single-digit integers representing list1.\nThird line contains integer N2.\nFourth line contains N2 single-digit integers representing list2.\n\n### Output Format\nPrint the sum list as space-separated single-digit integers in reverse order.\n\n### Constraints\n1 <= N1, N2 <= 100\n0 <= Node.val <= 9\nIt is guaranteed that the list represents a number that does not have leading zeros (except 0 itself).",
    "difficulty": "MEDIUM",
    "topic": "Linked List",
    "subtopics": [
      "Linked-list manipulation"
    ],
    "constraints": "1 <= N1, N2 <= 100, digits 0-9.",
    "input_format": "Line 1: N1. Line 2: list1. Line 3: N2. Line 4: list2.",
    "output_format": "Space-separated digits in reverse.",
    "examples": [
      {
        "input": "3\n2 4 3\n3\n5 6 4",
        "output": "7 0 8",
        "explanation": "342 + 465 = 807, represented as 7 -> 0 -> 8."
      }
    ],
    "expected_time_complexity": "O(max(N1, N2))",
    "expected_space_complexity": "O(max(N1, N2))",
    "tags": [
      "linked-list",
      "math"
    ],
    "stages": [
      {
        "name": "Stage 1: Elementary Digit-by-Digit Addition with Carry",
        "description": "Traverse both lists simultaneously propagating carry until both lists and carry are exhausted.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(max(N, M))",
        "expected_space_complexity": "O(max(N, M))"
      }
    ],
    "test_cases": [
      {
        "input": "3\n2 4 3\n3\n5 6 4",
        "expected_output": "7 0 8",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n0\n1\n0",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "7\n9 9 9 9 9 9 9\n4\n9 9 9 9",
        "expected_output": "8 9 9 9 0 0 0 1",
        "is_sample": false,
        "category": "SCALE"
      }
    ]
  },
  {
    "id": 57,
    "title": "Merge K Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\nMerge all the linked-lists into one sorted linked-list and return it.\n\n### Input Format\nFirst line contains integer k.\nNext k pairs of lines follow:\n- An integer M (number of nodes in the list)\n- M space-separated integers in ascending order (or empty line if M = 0)\n\n### Output Format\nPrint the merged sorted list as space-separated integers.\n\n### Constraints\n0 <= k <= 10^4\n0 <= total nodes <= 10^5\n-10^4 <= Node.val <= 10^4",
    "difficulty": "HARD",
    "topic": "Linked List",
    "subtopics": [
      "Merge lists"
    ],
    "constraints": "0 <= k <= 10000, 0 <= total nodes <= 10^5.",
    "input_format": "Line 1: k. Followed by k lists (size and elements).",
    "output_format": "Space-separated merged sorted integers.",
    "examples": [
      {
        "input": "3\n3\n1 4 5\n3\n1 3 4\n2\n2 6",
        "output": "1 1 2 3 4 4 5 6",
        "explanation": "Merged all 3 sorted lists into one."
      }
    ],
    "expected_time_complexity": "O(N log k)",
    "expected_space_complexity": "O(k)",
    "tags": [
      "linked-list",
      "divide-and-conquer",
      "heap",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Divide and Conquer Pairwise Merging",
        "description": "Merge lists pairwise in log k rounds.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N log k)",
        "expected_space_complexity": "O(1)"
      },
      {
        "name": "Stage 2: Min-Heap Multi-Way Merge",
        "description": "Insert heads of all k lists into min-heap and pop smallest node iteratively.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N log k)",
        "expected_space_complexity": "O(k)"
      }
    ],
    "test_cases": [
      {
        "input": "3\n3\n1 4 5\n3\n1 3 4\n2\n2 6",
        "expected_output": "1 1 2 3 4 4 5 6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n1\n1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "0",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  }
];
