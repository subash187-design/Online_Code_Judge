-- Phase 2 Progressive Stage Progression Migration

-- 1. Configurable problem stages
CREATE TABLE IF NOT EXISTS problem_stages (
    id SERIAL PRIMARY KEY,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL,
    is_required BOOLEAN NOT NULL DEFAULT TRUE,
    expected_time_complexity VARCHAR(50),
    expected_space_complexity VARCHAR(50),
    time_limit_ms INT DEFAULT NULL,
    memory_limit_kb INT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_problem_stage_order UNIQUE (problem_id, order_index)
);

-- 2. User progress state machine per stage
CREATE TABLE IF NOT EXISTS user_stage_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    stage_id INT NOT NULL REFERENCES problem_stages(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'LOCKED' 
        CHECK (status IN ('LOCKED', 'UNLOCKED', 'COMPLETED')),
    attempts_count INT NOT NULL DEFAULT 0,
    best_execution_time_ms INT DEFAULT NULL,
    best_memory_used_kb INT DEFAULT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_stage UNIQUE (user_id, stage_id)
);

-- 3. Individual submissions tied directly to a stage
CREATE TABLE IF NOT EXISTS stage_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    stage_id INT NOT NULL REFERENCES problem_stages(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL DEFAULT 'cpp',
    code TEXT NOT NULL,
    verdict VARCHAR(30) NOT NULL,
    execution_time_ms INT DEFAULT NULL,
    memory_used_kb INT DEFAULT NULL,
    compile_output TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_problem_stages_prob ON problem_stages(problem_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_stage_progress ON user_stage_progress(user_id, problem_id);
CREATE INDEX IF NOT EXISTS idx_stage_submissions_history ON stage_submissions(user_id, stage_id, created_at DESC);
