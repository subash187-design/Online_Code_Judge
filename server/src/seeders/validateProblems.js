const problems = require('./problemsData');
console.log('Total problems count:', problems.length);

if (problems.length !== 100) {
  console.error('ERROR: Expected 100 problems, found', problems.length);
  process.exit(1);
}

// Check IDs
const ids = problems.map(p => p.id);
const expectedIds = Array.from({ length: 100 }, (_, i) => i + 3);
const idDiff = expectedIds.filter(id => !ids.includes(id));
if (idDiff.length > 0) {
  console.error('ERROR: Missing IDs:', idDiff);
  process.exit(1);
}

// Check difficulties
const diffCounts = {};
problems.forEach(p => {
  diffCounts[p.difficulty] = (diffCounts[p.difficulty] || 0) + 1;
});
console.log('Difficulty breakdown:', diffCounts);

if (diffCounts.EASY !== 30 || diffCounts.MEDIUM !== 50 || diffCounts.HARD !== 20) {
  console.error('ERROR: Difficulty counts mismatch! Expected 30 Easy, 50 Medium, 20 Hard.');
  process.exit(1);
}

// Check topics
const topicCounts = {};
problems.forEach(p => {
  topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
});
console.log('Topic breakdown:', topicCounts);

const expectedTopics = {
  'Arrays & Hashing': 15,
  'Strings': 10,
  'Two Pointers & Sliding Window': 10,
  'Binary Search': 10,
  'Linked List': 10,
  'Stack & Queue': 10,
  'Trees & Binary Search Trees': 10,
  'Graphs': 10,
  'Dynamic Programming': 10,
  'Greedy / Heap / Intervals': 5
};

for (const [t, count] of Object.entries(expectedTopics)) {
  if (topicCounts[t] !== count) {
    console.error('ERROR: Topic ' + t + ' expected ' + count + ', got ' + topicCounts[t]);
    process.exit(1);
  }
}

// Check metadata completeness on EVERY problem
for (const p of problems) {
  const reqProps = [
    'id', 'title', 'slug', 'description', 'difficulty', 'topic',
    'subtopics', 'constraints', 'input_format', 'output_format',
    'examples', 'expected_time_complexity', 'expected_space_complexity',
    'tags', 'stages', 'test_cases'
  ];
  for (const prop of reqProps) {
    if (p[prop] === undefined || p[prop] === null) {
      console.error('ERROR: Problem ' + p.id + ' missing ' + prop);
      process.exit(1);
    }
  }
  const sampleCases = p.test_cases.filter(tc => tc.is_sample);
  const hiddenCases = p.test_cases.filter(tc => !tc.is_sample);
  if (sampleCases.length === 0) {
    console.error('ERROR: Problem ' + p.id + ' has no sample test cases!');
    process.exit(1);
  }
  if (hiddenCases.length === 0) {
    console.error('ERROR: Problem ' + p.id + ' has no hidden test cases!');
    process.exit(1);
  }
}

console.log('>>> SUCCESS: ALL 100 PROBLEMS PASSED COMPLETE VALIDATION! <<<');
