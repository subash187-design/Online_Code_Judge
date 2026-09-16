/**
 * TwoSumGenerator
 * Deterministic test case generator for Sum of Two Numbers.
 * Supports BOUNDARY, WORST_CASE, DUPLICATE_HEAVY, and RANDOM modes.
 */
class TwoSumGenerator {
  static generate(seed, mode = 'RANDOM', constraints = { maxN: 2, maxVal: 1e9 }) {
    // 64-bit Linear Congruential Generator (LCG) for strict reproducibility
    let state = BigInt(seed);
    const nextRand = () => {
      state = (state * 6364136223846793005n + 1442695040888963407n) & 0xFFFFFFFFFFFFFFFFn;
      return Number(state >> 32n) / 0xFFFFFFFF;
    };

    let a = 0;
    let b = 0;

    switch (mode) {
      case 'BOUNDARY':
        // Test exact constraint edges
        const choices = [-1000000000, 1000000000, 0, -1, 1];
        a = choices[Math.floor(nextRand() * choices.length)];
        b = choices[Math.floor(nextRand() * choices.length)];
        break;

      case 'DUPLICATE_HEAVY':
        // Both values identical
        const base = Math.floor(nextRand() * 2000000000) - 1000000000;
        a = base;
        b = base;
        break;

      case 'WORST_CASE':
        // Large disparate signs
        a = 1000000000;
        b = -1000000000;
        break;

      case 'RANDOM':
      default:
        a = Math.floor(nextRand() * 2000000000) - 1000000000;
        b = Math.floor(nextRand() * 2000000000) - 1000000000;
        break;
    }

    return `${a} ${b}\n`;
  }
}

module.exports = TwoSumGenerator;
