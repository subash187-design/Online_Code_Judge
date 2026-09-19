const fs = require('fs');
const path = require('path');
const db = require('./config/database');

async function seed() {
  console.log('--- Initializing Complete Database (Phases 1 through 6) ---');

  try {
    const migrations = [
      '001_phase1_init.sql',
      '002_phase2_stage_progression.sql',
      '003_phase3_code_analysis.sql',
      '004_phase4_mentor_system.sql',
      '005_phase5_optimization_analytics.sql',
      '006_phase6_advanced_testing.sql',
      '007_auth_system.sql',
      '008_problem_metadata.sql'
    ];

    for (const m of migrations) {
      const p = path.join(__dirname, 'migrations', m);
      await db.query(fs.readFileSync(p, 'utf-8'));
      console.log(`✓ Migration ${m} applied`);
    }

    // Default User
    await db.query(`
      INSERT INTO users (id, username, email) 
      VALUES (1, 'coder_alice', 'alice@example.com')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Problem 1: Sum of Two Numbers
    await db.query(`
      INSERT INTO problems (id, title, slug, description, difficulty, time_limit_ms, memory_limit_kb, topic)
      VALUES (
        1,
        'Sum of Two Numbers',
        'sum-of-two-numbers',
        'Read two space-separated integers A and B from standard input and output their sum (A + B) on a single line.\n\n### Input Format\nA single line containing two space-separated integers A and B.\n\n### Output Format\nPrint a single integer representing the sum of A and B.\n\n### Constraints\n-10^9 <= A, B <= 10^9',
        'EASY',
        1000,
        262144,
        'Arrays'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Categorized Test Cases for Problem 1
    await db.query(`
      INSERT INTO test_cases (problem_id, input, expected_output, is_sample, category, order_index)
      VALUES 
        (1, '3 4', '7', TRUE, 'SAMPLE', 1),
        (1, '100 -50', '50', FALSE, 'BOUNDARY', 2),
        (1, '1000000 2000000', '3000000', FALSE, 'SCALE', 3),
        (1, '-1000000000 -1000000000', '-2000000000', FALSE, 'BOUNDARY', 4)
      ON CONFLICT DO NOTHING;
    `);

    // Problem Stages for Problem 1 (Single Solution Problem -> Exactly 1 Stage)
    await db.query(`
      INSERT INTO problem_stages (id, problem_id, name, description, order_index, is_required, expected_time_complexity, expected_space_complexity)
      VALUES 
        (1, 1, 'Stage 1: Direct Computation', 'Read inputs and output sum directly without auxiliary storage.', 1, TRUE, 'O(1)', 'O(1)')
      ON CONFLICT (problem_id, order_index) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        is_required = EXCLUDED.is_required,
        expected_time_complexity = EXCLUDED.expected_time_complexity,
        expected_space_complexity = EXCLUDED.expected_space_complexity;
    `);

    // Phase 6: Reference Solution Oracle for Problem 1
    await db.query(`
      INSERT INTO problem_reference_solutions (problem_id, language, code)
      VALUES (
        1,
        'cpp',
        '#include <iostream>\nusing namespace std;\nint main(){\n  long long a, b;\n  if(cin >> a >> b){\n    cout << (a + b) << "\\n";\n  }\n  return 0;\n}'
      )
      ON CONFLICT (problem_id, language) DO UPDATE SET code = EXCLUDED.code;
    `);

    // Phase 6: Stress Configuration for Problem 1
    await db.query(`
      INSERT INTO problem_stress_configs (problem_id, generator_name, max_stress_cases, max_input_size, is_active)
      VALUES (1, 'two_sum.generator.js', 5, 10000, TRUE)
      ON CONFLICT (problem_id) DO UPDATE SET is_active = TRUE;
    `);

    // Problem 2: Reverse a String
    await db.query(`
      INSERT INTO problems (id, title, slug, description, difficulty, time_limit_ms, memory_limit_kb, topic)
      VALUES (
        2,
        'Reverse a String',
        'reverse-string',
        'Given a single word string S, output the reversed string.\n\n### Input Format\nA single word S without spaces.\n\n### Output Format\nThe reversed string S.\n\n### Constraints\n1 <= length(S) <= 10^5',
        'EASY',
        1000,
        262144,
        'Strings'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    await db.query(`
      INSERT INTO test_cases (problem_id, input, expected_output, is_sample, category, order_index)
      VALUES 
        (2, 'hello', 'olleh', TRUE, 'SAMPLE', 1),
        (2, 'competitive', 'evititepmoc', FALSE, 'SCALE', 2),
        (2, 'a', 'a', FALSE, 'BOUNDARY', 3)
      ON CONFLICT DO NOTHING;
    `);

    await db.query(`
      INSERT INTO problem_stages (id, problem_id, name, description, order_index, is_required, expected_time_complexity, expected_space_complexity)
      VALUES 
        (4, 2, 'Stage 1: Auxiliary String Buffer', 'Construct a new string by reading backwards into a secondary buffer.', 1, TRUE, 'O(N)', 'O(N)'),
        (5, 2, 'Stage 2: In-Place Two-Pointer Reverse', 'Reverse the string in-place using two converging pointers without auxiliary memory.', 2, TRUE, 'O(N)', 'O(1)')
      ON CONFLICT (problem_id, order_index) DO NOTHING;
    `);

    const seed100Problems = require('./seeders/seed100Problems');
    await seed100Problems();

    console.log('✓ Seeding complete for all 102 problems (Phases 1 through 8)!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
