-- Phase 6 Advanced Testing & Judge Reliability Migration

-- 1. Extend test_cases with categorization, versioning, and input sizes
ALTER TABLE test_cases 
ADD COLUMN IF NOT EXISTS category VARCHAR(30) DEFAULT 'SAMPLE'
    CHECK (category IN ('SAMPLE', 'BOUNDARY', 'EDGE_CASE', 'ADVERSARIAL', 'SCALE', 'DUPLICATE_HEAVY', 'RANDOMIZED')),
ADD COLUMN IF NOT EXISTS version INT NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS input_size INT NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_test_cases_cat ON test_cases(problem_id, category);

-- 2. Problem reference solutions (for differential stress testing)
CREATE TABLE IF NOT EXISTS problem_reference_solutions (
    id SERIAL PRIMARY KEY,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL DEFAULT 'cpp',
    code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_problem_ref_sol UNIQUE (problem_id, language)
);

-- 3. Problem stress test configuration
CREATE TABLE IF NOT EXISTS problem_stress_configs (
    id SERIAL PRIMARY KEY,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    generator_name VARCHAR(100) NOT NULL,
    max_stress_cases INT NOT NULL DEFAULT 10,
    max_input_size INT NOT NULL DEFAULT 100000,
    timeout_multiplier FLOAT NOT NULL DEFAULT 2.0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_problem_stress_cfg UNIQUE (problem_id)
);

-- 4. Audit failure logs for stress test diagnostics (Quarantined from public APIs)
CREATE TABLE IF NOT EXISTS stress_failure_logs (
    id SERIAL PRIMARY KEY,
    submission_id UUID NOT NULL REFERENCES stage_submissions(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    seed BIGINT NOT NULL,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    actual_output TEXT NOT NULL,
    diff_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stress_fail_sub ON stress_failure_logs(submission_id);
