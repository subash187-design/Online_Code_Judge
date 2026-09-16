-- Phase 5 Optimization Journey & Progress Analytics Migration

-- 1. Pre-aggregated personal bests and journey stats per user per problem
CREATE TABLE IF NOT EXISTS user_problem_summaries (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    is_solved BOOLEAN NOT NULL DEFAULT FALSE,
    total_submissions INT NOT NULL DEFAULT 0,
    hints_used_count INT NOT NULL DEFAULT 0,
    best_execution_time_ms INT DEFAULT NULL,
    best_memory_used_kb INT DEFAULT NULL,
    initial_time_complexity VARCHAR(50) DEFAULT NULL,
    best_time_complexity VARCHAR(50) DEFAULT NULL,
    initial_space_complexity VARCHAR(50) DEFAULT NULL,
    best_space_complexity VARCHAR(50) DEFAULT NULL,
    ai_optimization_insight TEXT DEFAULT NULL,
    first_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    solved_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_prob_summary UNIQUE (user_id, problem_id)
);

-- 2. Add topic column to problems for category breakdown
ALTER TABLE problems ADD COLUMN IF NOT EXISTS topic VARCHAR(50) DEFAULT 'Arrays';
CREATE INDEX IF NOT EXISTS idx_problems_topic ON problems(topic);

-- 3. Composite indices for fast historical filtering
CREATE INDEX IF NOT EXISTS idx_stage_sub_analytics 
ON stage_submissions(user_id, problem_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_user_stage_prog_analytics 
ON user_stage_progress(user_id, problem_id, status);

CREATE INDEX IF NOT EXISTS idx_mentor_hints_user_stage 
ON mentor_hints(user_id, stage_id);

-- 4. Unified chronological learning timeline view
CREATE OR REPLACE VIEW user_learning_events AS
SELECT 
    'SUBMISSION' AS event_type,
    s.id::text AS event_id,
    s.user_id,
    s.problem_id,
    s.stage_id,
    s.verdict AS primary_attribute,
    a.time_complexity AS secondary_attribute,
    s.execution_time_ms,
    s.memory_used_kb,
    s.created_at
FROM stage_submissions s
LEFT JOIN submission_analyses a ON s.id = a.submission_id

UNION ALL

SELECT 
    'HINT_UNLOCKED' AS event_type,
    h.id::text AS event_id,
    h.user_id,
    ps.problem_id,
    h.stage_id,
    CONCAT('Level ', h.hint_level) AS primary_attribute,
    h.title AS secondary_attribute,
    NULL AS execution_time_ms,
    NULL AS memory_used_kb,
    h.created_at
FROM mentor_hints h
JOIN problem_stages ps ON h.stage_id = ps.id

UNION ALL

SELECT 
    'STAGE_COMPLETED' AS event_type,
    usp.id::text AS event_id,
    usp.user_id,
    usp.problem_id,
    usp.stage_id,
    'COMPLETED' AS primary_attribute,
    CONCAT('Attempts: ', usp.attempts_count) AS secondary_attribute,
    usp.best_execution_time_ms,
    usp.best_memory_used_kb,
    usp.completed_at AS created_at
FROM user_stage_progress usp
WHERE usp.status = 'COMPLETED';
