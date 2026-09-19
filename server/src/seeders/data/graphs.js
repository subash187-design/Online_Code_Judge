module.exports = [
  {
    "id": 78,
    "title": "Find if Path Exists in Graph",
    "slug": "find-if-path-exists-in-graph",
    "description": "There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges.\nGiven edges and two integers source and destination, return true if there is a valid path from source to destination, or false otherwise.\n\n### Input Format\nFirst line contains four integers: n, m (number of edges), source, destination.\nNext m lines each contain two space-separated integers u and v representing an edge.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= n <= 2 * 10^5\n0 <= m <= 2 * 10^5\n0 <= source, destination < n",
    "difficulty": "EASY",
    "topic": "Graphs",
    "subtopics": [
      "Connected components",
      "BFS",
      "DFS"
    ],
    "constraints": "1 <= n <= 200000, 0 <= m <= 200000.",
    "input_format": "Line 1: n m source destination. Next m lines: u v.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "3 3 0 2\n0 1\n1 2\n2 0",
        "output": "true",
        "explanation": "Path 0 -> 1 -> 2 exists."
      },
      {
        "input": "6 5 0 5\n0 1\n0 2\n3 5\n5 4\n4 3",
        "output": "false",
        "explanation": "No path exists between 0 and 5."
      }
    ],
    "expected_time_complexity": "O(V + E)",
    "expected_space_complexity": "O(V + E)",
    "tags": [
      "graph",
      "bfs",
      "dfs",
      "union-find"
    ],
    "stages": [
      {
        "name": "Stage 1: BFS/DFS Traversal",
        "description": "Explore graph from source using visited array in O(V + E).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(V + E)",
        "expected_space_complexity": "O(V + E)"
      }
    ],
    "test_cases": [
      {
        "input": "3 3 0 2\n0 1\n1 2\n2 0",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "6 5 0 5\n0 1\n0 2\n3 5\n5 4\n4 3",
        "expected_output": "false",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 0 0 0",
        "expected_output": "true",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 79,
    "title": "Number of Connected Components in Undirected Graph",
    "slug": "number-of-connected-components-in-undirected-graph",
    "description": "You have a graph of n vertices. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.\nReturn the number of connected components in the graph.\n\n### Input Format\nFirst line contains two integers n and m (number of edges).\nNext m lines each contain two space-separated integers u and v.\n\n### Output Format\nPrint the total number of connected components.\n\n### Constraints\n1 <= n <= 2000\n0 <= m <= 5000\n0 <= ai <= bi < n",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "Connected components",
      "BFS",
      "DFS"
    ],
    "constraints": "1 <= n <= 2000, 0 <= m <= 5000.",
    "input_format": "Line 1: n m. Next m lines: u v.",
    "output_format": "Single integer component count.",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n3 4\n0 2",
        "output": "2",
        "explanation": "Component 1: {0, 1, 2}, Component 2: {3, 4}."
      }
    ],
    "expected_time_complexity": "O(V + E)",
    "expected_space_complexity": "O(V)",
    "tags": [
      "graph",
      "union-find",
      "connected-components"
    ],
    "stages": [
      {
        "name": "Stage 1: Disjoint Set Union (DSU) with Path Compression",
        "description": "Initialize n sets and decrement count upon successful union.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(E * alpha(V))",
        "expected_space_complexity": "O(V)"
      }
    ],
    "test_cases": [
      {
        "input": "5 4\n0 1\n1 2\n3 4\n0 2",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "5 3\n0 1\n1 2\n2 3",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 0",
        "expected_output": "3",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 80,
    "title": "Clone Graph",
    "slug": "clone-graph",
    "description": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\nEach node in the graph contains a value (val) and a list (neighbors) of its neighbors.\nPrint the cloned adjacency list in ascending node order.\n\n### Input Format\nFirst line contains integer n (number of nodes).\nNext n lines: line i contains the space-separated neighbor indices for node i (1-indexed).\n\n### Output Format\nPrint n lines with the space-separated cloned neighbor indices for each node.\n\n### Constraints\n0 <= n <= 100\nNode.val is unique for each node.",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "BFS",
      "DFS",
      "Connected components"
    ],
    "constraints": "0 <= n <= 100.",
    "input_format": "Line 1: n. Next n lines: neighbors.",
    "output_format": "n lines of neighbors.",
    "examples": [
      {
        "input": "4\n2 4\n1 3\n2 4\n1 3",
        "output": "2 4\n1 3\n2 4\n1 3",
        "explanation": "Deep copy created with identical adjacency."
      }
    ],
    "expected_time_complexity": "O(V + E)",
    "expected_space_complexity": "O(V)",
    "tags": [
      "graph",
      "hash-table",
      "dfs",
      "bfs"
    ],
    "stages": [
      {
        "name": "Stage 1: BFS/DFS with Hash Map Clone Memoization",
        "description": "Use hash map mapping original node pointers to cloned node pointers to handle cycles.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(V + E)",
        "expected_space_complexity": "O(V)"
      }
    ],
    "test_cases": [
      {
        "input": "4\n2 4\n1 3\n2 4\n1 3",
        "expected_output": "2 4\n1 3\n2 4\n1 3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1\n",
        "expected_output": "",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\n2\n1",
        "expected_output": "2\n1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 81,
    "title": "Course Schedule (Cycle in Directed Graph)",
    "slug": "course-schedule-cycle-detection",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\nReturn true if you can finish all courses. Otherwise, return false.\n\n### Input Format\nFirst line contains two integers: numCourses and P (number of prerequisites).\nNext P lines each contain two integers: ai bi.\n\n### Output Format\nPrint \"true\" or \"false\".\n\n### Constraints\n1 <= numCourses <= 10^5\n0 <= P <= 5 * 10^5",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "Cycle detection",
      "Topological sorting"
    ],
    "constraints": "1 <= numCourses <= 10^5, 0 <= P <= 500000.",
    "input_format": "Line 1: numCourses P. Next P lines: ai bi.",
    "output_format": "true or false",
    "examples": [
      {
        "input": "2 1\n1 0",
        "output": "true",
        "explanation": "Course 0 can be taken before course 1."
      },
      {
        "input": "2 2\n1 0\n0 1",
        "output": "false",
        "explanation": "Circular prerequisite dependency between 0 and 1."
      }
    ],
    "expected_time_complexity": "O(V + E)",
    "expected_space_complexity": "O(V + E)",
    "tags": [
      "graph",
      "topological-sort",
      "cycle-detection"
    ],
    "stages": [
      {
        "name": "Stage 1: Kahn's Algorithm (BFS In-Degree)",
        "description": "Track in-degree of all nodes; push 0 in-degree nodes into queue and count processed nodes.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(V + E)",
        "expected_space_complexity": "O(V + E)"
      }
    ],
    "test_cases": [
      {
        "input": "2 1\n1 0",
        "expected_output": "true",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 2\n1 0\n0 1",
        "expected_output": "false",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 2\n0 1\n1 2",
        "expected_output": "true",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 82,
    "title": "Course Schedule II (Order of Courses)",
    "slug": "course-schedule-ii-order-of-courses",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first before ai.\nReturn the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return empty (print \"none\").\n\n### Input Format\nFirst line contains two integers: numCourses and P.\nNext P lines each contain two integers: ai bi.\n\n### Output Format\nPrint space-separated course order, or \"none\".\n\n### Constraints\n1 <= numCourses <= 2000\n0 <= P <= numCourses * (numCourses - 1)",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "Topological sorting",
      "Cycle detection"
    ],
    "constraints": "1 <= numCourses <= 2000.",
    "input_format": "Line 1: numCourses P. Next P lines: ai bi.",
    "output_format": "Space-separated course indices or none.",
    "examples": [
      {
        "input": "4 4\n1 0\n2 0\n3 1\n3 2",
        "output": "0 1 2 3",
        "explanation": "Valid topological ordering is 0 1 2 3."
      }
    ],
    "expected_time_complexity": "O(V + E)",
    "expected_space_complexity": "O(V + E)",
    "tags": [
      "graph",
      "topological-sort",
      "bfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Kahn's Topological BFS Order",
        "description": "Dequeue nodes with in-degree 0 and append to resulting schedule in O(V + E).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(V + E)",
        "expected_space_complexity": "O(V + E)"
      }
    ],
    "test_cases": [
      {
        "input": "4 4\n1 0\n2 0\n3 1\n3 2",
        "expected_output": "0 1 2 3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 2\n0 1\n1 0",
        "expected_output": "none",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 0",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 83,
    "title": "Number of Islands",
    "slug": "number-of-islands",
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\n\n### Input Format\nFirst line contains two integers m and n.\nNext m lines each contain a binary string of length n without spaces.\n\n### Output Format\nPrint the total number of islands.\n\n### Constraints\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "Grid-based graph problems",
      "DFS",
      "BFS"
    ],
    "constraints": "1 <= m, n <= 300.",
    "input_format": "Line 1: m n. Next m lines: binary strings.",
    "output_format": "Single integer island count.",
    "examples": [
      {
        "input": "4 5\n11110\n11010\n11000\n00000",
        "output": "1",
        "explanation": "All 1s are connected into 1 island."
      },
      {
        "input": "4 5\n11000\n11000\n00100\n00011",
        "output": "3",
        "explanation": "3 separate connected land masses."
      }
    ],
    "expected_time_complexity": "O(M * N)",
    "expected_space_complexity": "O(M * N)",
    "tags": [
      "graph",
      "grid",
      "dfs",
      "bfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Connected Component Flood Fill",
        "description": "Sink connected land cells by recursively visiting 4 directions upon encountering a '1'.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(M * N)",
        "expected_space_complexity": "O(M * N)"
      }
    ],
    "test_cases": [
      {
        "input": "4 5\n11110\n11010\n11000\n00000",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "4 5\n11000\n11000\n00100\n00011",
        "expected_output": "3",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 1\n0",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 84,
    "title": "Rotting Oranges",
    "slug": "rotting-oranges",
    "description": "You are given an m x n grid where each cell can have one of three values:\n- 0 representing an empty cell,\n- 1 representing a fresh orange, or\n- 2 representing a rotten orange.\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.\n\n### Input Format\nFirst line contains two integers m and n.\nNext m lines each contain n space-separated integers (0, 1, or 2).\n\n### Output Format\nPrint the minimum minutes, or -1.\n\n### Constraints\n1 <= m, n <= 20",
    "difficulty": "MEDIUM",
    "topic": "Graphs",
    "subtopics": [
      "Grid-based graph problems",
      "BFS"
    ],
    "constraints": "1 <= m, n <= 20.",
    "input_format": "Line 1: m n. Next m lines: n integers.",
    "output_format": "Single integer minutes or -1.",
    "examples": [
      {
        "input": "3 3\n2 1 1\n1 1 0\n0 1 1",
        "output": "4",
        "explanation": "All fresh oranges rot after 4 minutes."
      },
      {
        "input": "3 3\n2 1 1\n0 1 1\n1 0 1",
        "output": "-1",
        "explanation": "Fresh orange at bottom-left cannot be reached."
      }
    ],
    "expected_time_complexity": "O(M * N)",
    "expected_space_complexity": "O(M * N)",
    "tags": [
      "graph",
      "bfs",
      "multi-source-bfs"
    ],
    "stages": [
      {
        "name": "Stage 1: Multi-Source Level-Order BFS",
        "description": "Initialize queue with all rotten orange coordinates and propagate minute by minute until fresh count reaches 0.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(M * N)",
        "expected_space_complexity": "O(M * N)"
      }
    ],
    "test_cases": [
      {
        "input": "3 3\n2 1 1\n1 1 0\n0 1 1",
        "expected_output": "4",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "3 3\n2 1 1\n0 1 1\n1 0 1",
        "expected_output": "-1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "1 2\n0 2",
        "expected_output": "0",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 85,
    "title": "Network Delay Time (Dijkstra Algorithm)",
    "slug": "network-delay-time-dijkstras-algorithm",
    "description": "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.\nWe will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.\n\n### Input Format\nFirst line contains three integers: n, m (number of edges), and k (source).\nNext m lines each contain three integers: u v w.\n\n### Output Format\nPrint the minimum time, or -1.\n\n### Constraints\n1 <= k <= n <= 100\n1 <= m <= 6000\n1 <= wi <= 100",
    "difficulty": "HARD",
    "topic": "Graphs",
    "subtopics": [
      "Shortest path",
      "BFS"
    ],
    "constraints": "1 <= k <= n <= 100, 1 <= m <= 6000.",
    "input_format": "Line 1: n m k. Next m lines: u v w.",
    "output_format": "Single integer min time or -1.",
    "examples": [
      {
        "input": "4 3 2\n2 1 1\n2 3 1\n3 4 1",
        "output": "2",
        "explanation": "Signal reaches node 1 in 1, node 3 in 1, and node 4 in 2. Max time = 2."
      }
    ],
    "expected_time_complexity": "O((V + E) log V)",
    "expected_space_complexity": "O(V + E)",
    "tags": [
      "graph",
      "shortest-path",
      "dijkstra",
      "heap"
    ],
    "stages": [
      {
        "name": "Stage 1: Dijkstra with Priority Queue",
        "description": "Use min-heap to greedily expand shortest distance edges in O(E log V).",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(E log V)",
        "expected_space_complexity": "O(V + E)"
      }
    ],
    "test_cases": [
      {
        "input": "4 3 2\n2 1 1\n2 3 1\n3 4 1",
        "expected_output": "2",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1 1\n1 2 1",
        "expected_output": "1",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2 1 2\n1 2 1",
        "expected_output": "-1",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 86,
    "title": "Word Ladder (Shortest Transformation)",
    "slug": "word-ladder-shortest-transformation",
    "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\nGiven beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.\n\n### Input Format\nFirst line contains beginWord and endWord.\nSecond line contains integer N (size of wordList).\nNext N lines each contain a word in wordList.\n\n### Output Format\nPrint the minimum sequence length, or 0.\n\n### Constraints\n1 <= length(beginWord) <= 10\n1 <= N <= 5000\nAll words have identical length.",
    "difficulty": "HARD",
    "topic": "Graphs",
    "subtopics": [
      "Shortest path",
      "BFS"
    ],
    "constraints": "1 <= |beginWord| <= 10, 1 <= N <= 5000.",
    "input_format": "Line 1: beginWord endWord. Line 2: N. Next N lines: words.",
    "output_format": "Single integer length or 0.",
    "examples": [
      {
        "input": "hit cog\n6\nhot\ndot\ndog\nlot\nlog\ncog",
        "output": "5",
        "explanation": "hit -> hot -> dot -> dog -> cog (length 5)."
      }
    ],
    "expected_time_complexity": "O(N * M * 26)",
    "expected_space_complexity": "O(N * M)",
    "tags": [
      "graph",
      "bfs",
      "hash-table",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: BFS Shortest Path with Hash Set",
        "description": "For each word, mutate each of the M letters from 'a' to 'z' and visit words in BFS queue.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(N * M * 26)",
        "expected_space_complexity": "O(N * M)"
      },
      {
        "name": "Stage 2: Bidirectional BFS",
        "description": "Search simultaneously from beginWord and endWord to cut search tree size exponentially.",
        "order_index": 2,
        "is_required": true,
        "expected_time_complexity": "O(N * M * 26)",
        "expected_space_complexity": "O(N * M)"
      }
    ],
    "test_cases": [
      {
        "input": "hit cog\n6\nhot\ndot\ndog\nlot\nlog\ncog",
        "expected_output": "5",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "hit cog\n5\nhot\ndot\ndog\nlot\nlog",
        "expected_output": "0",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "a c\n2\na\nc",
        "expected_output": "2",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  },
  {
    "id": 87,
    "title": "Alien Dictionary",
    "slug": "alien-dictionary",
    "description": "There is a new alien language that uses the English alphabet. However, the order among letters is unknown to you.\nYou are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.\n\n### Input Format\nFirst line contains integer N.\nNext N lines each contain an alien word.\n\n### Output Format\nPrint the sorted alphabet string, or \"\" if invalid.\n\n### Constraints\n1 <= N <= 100\n1 <= length(words[i]) <= 100",
    "difficulty": "HARD",
    "topic": "Graphs",
    "subtopics": [
      "Topological sorting",
      "Cycle detection"
    ],
    "constraints": "1 <= N <= 100, 1 <= |words[i]| <= 100.",
    "input_format": "Line 1: N. Next N lines: words.",
    "output_format": "Sorted alphabet string or empty.",
    "examples": [
      {
        "input": "5\nwrt\nwrf\ner\nett\nrftt",
        "output": "wertf",
        "explanation": "Comparing adjacent words derives the letter order."
      }
    ],
    "expected_time_complexity": "O(C)",
    "expected_space_complexity": "O(1) (26 letters)",
    "tags": [
      "graph",
      "topological-sort",
      "hard-interview"
    ],
    "stages": [
      {
        "name": "Stage 1: Adjacent Pair Graph Extraction & Topological Sort",
        "description": "Extract directed edges between first differing characters of adjacent words and verify DAG topological ordering.",
        "order_index": 1,
        "is_required": true,
        "expected_time_complexity": "O(C)",
        "expected_space_complexity": "O(1)"
      }
    ],
    "test_cases": [
      {
        "input": "5\nwrt\nwrf\ner\nett\nrftt",
        "expected_output": "wertf",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\nz\nx",
        "expected_output": "zx",
        "is_sample": true,
        "category": "SAMPLE"
      },
      {
        "input": "2\nz\nz",
        "expected_output": "z",
        "is_sample": false,
        "category": "BOUNDARY"
      }
    ]
  }
];
