const db = require('../config/database');
const all100Problems = require('./problemsData');

async function seed100Problems() {
  console.log(`Starting seeding of ${all100Problems.length} problems into Algomind Code Judge database...`);
  const client = await db.pool ? await db.pool.connect() : null;

  try {
    // Ensure primary key sequences are synchronized past existing rows
    await db.query("SELECT setval('problem_stages_id_seq', (SELECT COALESCE(MAX(id), 1) FROM problem_stages));");
    await db.query("SELECT setval('test_cases_id_seq', (SELECT COALESCE(MAX(id), 1) FROM test_cases));");

    let problemCount = 0;
    let stageCount = 0;
    let testCaseCount = 0;

    for (const p of all100Problems) {
      // 1. Insert or Update Problem
      await db.query(
        `INSERT INTO problems (
          id, title, slug, description, difficulty, time_limit_ms, memory_limit_kb,
          topic, subtopics, constraints, input_format, output_format,
          examples, expected_time_complexity, expected_space_complexity, tags
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          difficulty = EXCLUDED.difficulty,
          time_limit_ms = EXCLUDED.time_limit_ms,
          memory_limit_kb = EXCLUDED.memory_limit_kb,
          topic = EXCLUDED.topic,
          subtopics = EXCLUDED.subtopics,
          constraints = EXCLUDED.constraints,
          input_format = EXCLUDED.input_format,
          output_format = EXCLUDED.output_format,
          examples = EXCLUDED.examples,
          expected_time_complexity = EXCLUDED.expected_time_complexity,
          expected_space_complexity = EXCLUDED.expected_space_complexity,
          tags = EXCLUDED.tags`,
        [
          p.id,
          p.title,
          p.slug,
          p.description,
          p.difficulty,
          p.time_limit_ms || 1000,
          p.memory_limit_kb || 262144,
          p.topic,
          p.subtopics || [],
          p.constraints || '',
          p.input_format || '',
          p.output_format || '',
          JSON.stringify(p.examples || []),
          p.expected_time_complexity || 'O(N)',
          p.expected_space_complexity || 'O(1)',
          p.tags || []
        ]
      );
      problemCount++;

      // 2. Insert Stages
      if (p.stages && p.stages.length > 0) {
        for (const stage of p.stages) {
          await db.query(
            `INSERT INTO problem_stages (
              problem_id, name, description, order_index, is_required,
              expected_time_complexity, expected_space_complexity
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (problem_id, order_index) DO UPDATE SET
              name = EXCLUDED.name,
              description = EXCLUDED.description,
              is_required = EXCLUDED.is_required,
              expected_time_complexity = EXCLUDED.expected_time_complexity,
              expected_space_complexity = EXCLUDED.expected_space_complexity`,
            [
              p.id,
              stage.name,
              stage.description,
              stage.order_index,
              stage.is_required !== false,
              stage.expected_time_complexity || 'O(N)',
              stage.expected_space_complexity || 'O(1)'
            ]
          );
          stageCount++;
        }
      }

      // 3. Clear existing test cases for this problem and re-insert fresh
      await db.query('DELETE FROM test_cases WHERE problem_id = $1', [p.id]);

      if (p.test_cases && p.test_cases.length > 0) {
        let order = 1;
        for (const tc of p.test_cases) {
          await db.query(
            `INSERT INTO test_cases (
              problem_id, input, expected_output, is_sample, category, order_index
            )
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              p.id,
              tc.input,
              tc.expected_output,
              Boolean(tc.is_sample),
              tc.category || (tc.is_sample ? 'SAMPLE' : 'BOUNDARY'),
              order++
            ]
          );
          testCaseCount++;
        }
      }
    }

    // Reset sequence so auto-increment works if needed
    await db.query("SELECT setval('problems_id_seq', (SELECT MAX(id) FROM problems));");
    await db.query("SELECT setval('problem_stages_id_seq', (SELECT MAX(id) FROM problem_stages));");
    await db.query("SELECT setval('test_cases_id_seq', (SELECT MAX(id) FROM test_cases));");

    console.log(`\n=========================================================`);
    console.log(`✓ Successfully seeded ${problemCount} problems!`);
    console.log(`✓ Successfully seeded ${stageCount} problem stages!`);
    console.log(`✓ Successfully seeded ${testCaseCount} test cases!`);
    console.log(`=========================================================\n`);
    return { problemCount, stageCount, testCaseCount };
  } catch (err) {
    console.error('Failed to seed 100 problems:', err);
    throw err;
  } finally {
    if (client) client.release();
  }
}

if (require.main === module) {
  seed100Problems()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = seed100Problems;
