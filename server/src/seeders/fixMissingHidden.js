const fs = require('fs');
const path = require('path');

function addHidden(fileName, problemId, hiddenCase) {
  const filePath = path.join(__dirname, 'data', fileName);
  const problems = require(filePath);
  const p = problems.find(x => x.id === problemId);
  if (p) {
    p.test_cases.push(hiddenCase);
    const content = 'module.exports = ' + JSON.stringify(problems, null, 2) + ';\n';
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Added hidden test case to problem ${problemId}`);
  } else {
    console.error(`Problem ${problemId} not found in ${filePath}`);
  }
}

addHidden('two_pointers_sliding_window.js', 34, {
  input: "4 2\n-1 -2 -3 -4",
  expected_output: "-1.50",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('linked_list.js', 55, {
  input: "1 1 0 0\n3\n3",
  expected_output: "3",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('stack_queue.js', 59, {
  input: "4\npush 10\npush 20\npop\npop",
  expected_output: "20\n10",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('stack_queue.js', 61, {
  input: "5\npush 1\npush 2\ngetMin\npop\ngetMin",
  expected_output: "1\n1",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('stack_queue.js', 64, {
  input: "5\n4 2 + 3 *",
  expected_output: "18",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('trees_bst.js', 75, {
  input: "1\n2 1 3",
  expected_output: "1",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('trees_bst.js', 76, {
  input: "3\n1 2 3\n2 1 3",
  expected_output: "2 3 1",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('graphs.js', 80, {
  input: "2\n2\n1",
  expected_output: "2\n1",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('graphs.js', 86, {
  input: "a c\n2\na\nc",
  expected_output: "2",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('dynamic_programming.js', 93, {
  input: "1 10\n5\n11",
  expected_output: "0",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('greedy_heap_intervals.js', 99, {
  input: "1 1\n10\n5",
  expected_output: "0",
  is_sample: false,
  category: "BOUNDARY"
});

addHidden('greedy_heap_intervals.js', 102, {
  input: "2\naddNum 5\nfindMedian",
  expected_output: "5.0",
  is_sample: false,
  category: "BOUNDARY"
});
