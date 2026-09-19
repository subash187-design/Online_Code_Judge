const arraysHashing = require('./data/arrays_hashing');
const strings = require('./data/strings');
const twoPointers = require('./data/two_pointers_sliding_window');
const binarySearch = require('./data/binary_search');
const linkedList = require('./data/linked_list');
const stackQueue = require('./data/stack_queue');
const treesBst = require('./data/trees_bst');
const graphs = require('./data/graphs');
const dynamicProgramming = require('./data/dynamic_programming');
const greedyHeapIntervals = require('./data/greedy_heap_intervals');

const all100Problems = [
  ...arraysHashing,
  ...strings,
  ...twoPointers,
  ...binarySearch,
  ...linkedList,
  ...stackQueue,
  ...treesBst,
  ...graphs,
  ...dynamicProgramming,
  ...greedyHeapIntervals
];

module.exports = all100Problems;
