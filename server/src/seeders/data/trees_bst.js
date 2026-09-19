module.exports = [
  {
    "id": 68,
    "title": "Binary Tree Inorder Traversal",
    "slug": "binary-tree-inorder-traversal",
    "description": "Given the root of a binary tree represented as level-order space-separated values (where 'null' denotes missing node), return the inorder traversal of its nodes' values.\nInorder traversal visits Left Subtree -> Root -> Right Subtree.\n\n### Input Format\nA single line containing space-separated node values in level-order (or empty line for empty tree).\n\n### Output Format\nPrint space-separated node values in inorder traversal.\n\n### Constraints\n0 <= number of nodes <= 1000\n-100 <= Node.val <= 100",
    "difficulty": "EASY",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Traversals",
      "Tree construction"
    ],
    "constraints": "0 <= nodes <= 1000.",
    "input_format": "Single line level-order tree tokens.",
    "output_format": "Space-separated inorder integers.",
    "examples": [
      {
        "input": "1 null 2 3",
        "output": "1 3 2",
        "explanation": "1 has right child 2, which has left child 3. Inorder is 1 3 2."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "tree",
      "depth-first-search",
      "binary-tree"
    ],
    "stages": [
      {
        "name": "Stage 1: Recursive Inorder DFS",
        "description": "Standard recursion dfs(node->left), visit, dfs(node->right).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      },
      {
        "name": "Stage 2: Iterative Stack or Morris Traversal",
        "description": "Iterative traversal using an explicit stack or Morris threaded pointers in O(1) extra space.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "1 null 2 3",
        "expected_output": "1 3 2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 2 3 4 5 null 8",
        "expected_output": "4 2 5 1 3 8",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 69,
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "description": "Given the root of a binary tree represented as level-order space-separated values, return its maximum depth.\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n### Input Format\nA single line containing space-separated node values in level-order.\n\n### Output Format\nPrint the maximum depth as a single integer.\n\n### Constraints\n0 <= number of nodes <= 10^4",
    "difficulty": "EASY",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Height/depth",
      "Traversals"
    ],
    "constraints": "0 <= nodes <= 10000.",
    "input_format": "Single line level-order tree tokens.",
    "output_format": "Single integer depth.",
    "examples": [
      {
        "input": "3 9 20 null null 15 7",
        "output": "3",
        "explanation": "Longest branch is 3 -> 20 -> 15 (depth 3)."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "dfs",
      "bfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Recursive Postorder Height",
        "description": "max(depth(left), depth(right)) + 1 in O(N) time.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "3 9 20 null null 15 7",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 null 2",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 70,
    "title": "Invert Binary Tree",
    "slug": "invert-binary-tree",
    "description": "Given the root of a binary tree represented in level order, invert the tree, and return its level-order representation.\n\n### Input Format\nA single line of level-order space-separated values.\n\n### Output Format\nPrint the inverted tree in level-order format without trailing nulls.\n\n### Constraints\n0 <= number of nodes <= 1000",
    "difficulty": "EASY",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Traversals",
      "Tree construction"
    ],
    "constraints": "0 <= nodes <= 1000.",
    "input_format": "Level-order tree tokens.",
    "output_format": "Inverted level-order tokens.",
    "examples": [
      {
        "input": "4 2 7 1 3 6 9",
        "output": "4 7 2 9 6 3 1",
        "explanation": "Subtrees swapped recursively."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "recursion"
    ],
    "stages": [
      {
        "name": "Stage 1: Recursive Child Swap",
        "description": "Recursively swap left and right subtrees for every node.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "4 2 7 1 3 6 9",
        "expected_output": "4 7 2 9 6 3 1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1 3",
        "expected_output": "2 3 1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 71,
    "title": "Binary Tree Level Order Traversal",
    "slug": "binary-tree-level-order-traversal",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).\nPrint each level on a new line with space-separated values.\n\n### Input Format\nA single line containing level-order tree tokens.\n\n### Output Format\nEach level on a separate line with space-separated values.\n\n### Constraints\n0 <= number of nodes <= 2000",
    "difficulty": "MEDIUM",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Level-order traversal",
      "Traversals"
    ],
    "constraints": "0 <= nodes <= 2000.",
    "input_format": "Single line level-order tree tokens.",
    "output_format": "Levels on separate lines.",
    "examples": [
      {
        "input": "3 9 20 null null 15 7",
        "output": "3\n9 20\n15 7",
        "explanation": "Level 0: [3], Level 1: [9, 20], Level 2: [15, 7]."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "tree",
      "breadth-first-search",
      "queue"
    ],
    "stages": [
      {
        "name": "Stage 1: BFS Queue Level Traversal",
        "description": "Use FIFO queue, processing queue size elements for each level iteration.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "3 9 20 null null 15 7",
        "expected_output": "3\n9 20\n15 7",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "",
        "expected_output": "",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 72,
    "title": "Diameter of Binary Tree",
    "slug": "diameter-of-binary-tree",
    "description": "Given the root of a binary tree, return the length of the diameter of the tree.\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\nThe length of a path between two nodes is represented by the number of edges between them.\n\n### Input Format\nA single line of level-order space-separated values.\n\n### Output Format\nPrint the diameter length (number of edges).\n\n### Constraints\n1 <= number of nodes <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Diameter",
      "Height/depth"
    ],
    "constraints": "1 <= nodes <= 10000.",
    "input_format": "Single line level-order tree tokens.",
    "output_format": "Single integer diameter.",
    "examples": [
      {
        "input": "1 2 3 4 5",
        "output": "3",
        "explanation": "Path [4,2,1,3] or [5,2,1,3] has 3 edges."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "dfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Postorder Height & Global Max Path",
        "description": "Compute left and right depths at each node and maximize leftDepth + rightDepth.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "1 2 3 4 5",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 2",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 73,
    "title": "Validate Binary Search Tree",
    "slug": "validate-binary-search-tree",
    "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys strictly less than the node's key.\n- The right subtree of a node contains only nodes with keys strictly greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n### Input Format\nA single line containing level-order tree tokens.\n\n### Output Format\nPrint \"true\" if it is a valid BST, otherwise \"false\".\n\n### Constraints\n1 <= number of nodes <= 10^4\n-2^31 <= Node.val <= 2^31 - 1",
    "difficulty": "MEDIUM",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "BST operations",
      "Traversals"
    ],
    "constraints": "1 <= nodes <= 10000.",
    "input_format": "Single line level-order tokens.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "2 1 3",
        "output": "true",
        "explanation": "Valid BST."
      },
      {
        "input": "5 1 4 null null 3 6",
        "output": "false",
        "explanation": "Root 5 has right child 4 with subtree violating BST property."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "binary-search-tree",
      "dfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Range Interval Validation",
        "description": "Pass valid lower and upper bounds (minVal, maxVal) recursively in O(N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "2 1 3",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5 1 4 null null 3 6",
        "expected_output": "false",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1",
        "expected_output": "true",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 74,
    "title": "Lowest Common Ancestor in a BST",
    "slug": "lowest-common-ancestor-in-a-bst",
    "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST.\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).\"\n\n### Input Format\nFirst line contains two integers p and q.\nSecond line contains level-order tree tokens representing the BST.\n\n### Output Format\nPrint the integer value of the LCA node.\n\n### Constraints\n2 <= number of nodes <= 10^5\nAll Node.val are unique. p and q exist in the BST.",
    "difficulty": "MEDIUM",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Lowest common ancestor",
      "BST operations"
    ],
    "constraints": "2 <= nodes <= 10^5, all values unique.",
    "input_format": "Line 1: p q. Line 2: level-order BST tokens.",
    "output_format": "Single integer value of LCA.",
    "examples": [
      {
        "input": "2 8\n6 2 8 0 4 7 9 null null 3 5",
        "output": "6",
        "explanation": "LCA of 2 and 8 is 6."
      },
      {
        "input": "2 4\n6 2 8 0 4 7 9 null null 3 5",
        "output": "2",
        "explanation": "LCA of 2 and 4 is 2."
      }
    ],
    "expected_time_complexity": "O(H)",
    "expected_space_complexity": "O(1)",
    "tags": [
      "tree",
      "binary-search-tree"
    ],
    "stages": [
      {
        "name": "Stage 1: BST Property Directed Descent",
        "description": "If both p and q are smaller than root, descend left; if larger, descend right; otherwise current node is split LCA.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(H)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "2 8\n6 2 8 0 4 7 9 null null 3 5",
        "expected_output": "6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 4\n6 2 8 0 4 7 9 null null 3 5",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1\n2 1",
        "expected_output": "2",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 75,
    "title": "Kth Smallest Element in a BST",
    "slug": "kth-smallest-element-in-a-bst",
    "description": "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.\n\n### Input Format\nFirst line contains integer k.\nSecond line contains level-order tokens of the BST.\n\n### Output Format\nPrint the kth smallest integer value.\n\n### Constraints\n1 <= k <= number of nodes <= 10^4",
    "difficulty": "MEDIUM",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "BST operations",
      "Traversals"
    ],
    "constraints": "1 <= k <= nodes <= 10000.",
    "input_format": "Line 1: k. Line 2: level-order BST tokens.",
    "output_format": "Single integer.",
    "examples": [
      {
        "input": "1\n3 1 4 null 2",
        "output": "1",
        "explanation": "Inorder sequence is [1, 2, 3, 4], 1st smallest is 1."
      },
      {
        "input": "3\n5 3 6 2 4 null null 1",
        "output": "3",
        "explanation": "Inorder sequence is [1, 2, 3, 4, 5, 6], 3rd smallest is 3."
      }
    ],
    "expected_time_complexity": "O(H + k)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "binary-search-tree",
      "inorder"
    ],
    "stages": [
      {
        "name": "Stage 1: Iterative Inorder Stop-Early",
        "description": "Use stack for inorder traversal and decrement k on node visits; stop immediately when k reaches 0.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(H + k)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "1\n3 1 4 null 2",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n5 3 6 2 4 null null 1",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n2 1 3",
        "expected_output": "1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 76,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "slug": "construct-binary-tree-from-preorder-and-inorder",
    "description": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.\nPrint the postorder traversal of the constructed tree.\n\n### Input Format\nFirst line contains integer N.\nSecond line contains N space-separated integers for preorder.\nThird line contains N space-separated integers for inorder.\n\n### Output Format\nPrint N space-separated integers representing the postorder traversal of the tree.\n\n### Constraints\n1 <= N <= 3000\nAll elements are unique.",
    "difficulty": "HARD",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Tree construction",
      "Traversals"
    ],
    "constraints": "1 <= N <= 3000, all values unique.",
    "input_format": "Line 1: N. Line 2: preorder. Line 3: inorder.",
    "output_format": "N space-separated postorder integers.",
    "examples": [
      {
        "input": "5\n3 9 20 15 7\n9 3 15 20 7",
        "output": "9 15 7 20 3",
        "explanation": "Reconstructed tree has postorder 9 15 7 20 3."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(N)",
    "tags": [
      "tree",
      "divide-and-conquer",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Hash Map Inorder Lookups",
        "description": "Map inorder elements to indices and recursively partition subtree sizes in O(N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(N)"
      }
    ],
    "test_cases": [
      {
        "input": "5\n3 9 20 15 7\n9 3 15 20 7",
        "expected_output": "9 15 7 20 3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n-1\n-1",
        "expected_output": "-1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3\n1 2 3\n2 1 3",
        "expected_output": "2 3 1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 77,
    "title": "Binary Tree Maximum Path Sum",
    "slug": "binary-tree-maximum-path-sum",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\nThe path sum of a path is the sum of the node's values in the path.\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.\n\n### Input Format\nA single line containing level-order tree tokens.\n\n### Output Format\nPrint the maximum path sum.\n\n### Constraints\n1 <= number of nodes <= 3 * 10^4\n-1000 <= Node.val <= 1000",
    "difficulty": "HARD",
    "topic": "Trees & Binary Search Trees",
    "subtopics": [
      "Traversals",
      "Height/depth"
    ],
    "constraints": "1 <= nodes <= 30000, -1000 <= Node.val <= 1000.",
    "input_format": "Single line level-order tree tokens.",
    "output_format": "Single integer max path sum.",
    "examples": [
      {
        "input": "1 2 3",
        "output": "6",
        "explanation": "Path 2 -> 1 -> 3 gives max sum 6."
      },
      {
        "input": "-10 9 20 null null 15 7",
        "output": "42",
        "explanation": "Path 15 -> 20 -> 7 gives max sum 42."
      }
    ],
    "expected_time_complexity": "O(N)",
    "expected_space_complexity": "O(H)",
    "tags": [
      "tree",
      "dynamic-programming",
      "dfs",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Tree Postorder DP",
        "description": "For each node, compute max single-branch contribution max(0, gain) and update global max with node->val + leftGain + rightGain in O(N).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N)",
        "expected_space_complexity": "O(H)"
      }
    ],
    "test_cases": [
      {
        "input": "1 2 3",
        "expected_output": "6",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "-10 9 20 null null 15 7",
        "expected_output": "42",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "-3",
        "expected_output": "-3",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  }
];
