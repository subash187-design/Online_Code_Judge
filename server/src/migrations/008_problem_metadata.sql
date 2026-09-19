-- Phase 8: Problem Extended Metadata Schema Migration
ALTER TABLE problems ADD COLUMN IF NOT EXISTS subtopics TEXT[] DEFAULT '{}';
ALTER TABLE problems ADD COLUMN IF NOT EXISTS constraints TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS input_format TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS output_format TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS examples JSONB DEFAULT '[]';
ALTER TABLE problems ADD COLUMN IF NOT EXISTS expected_time_complexity VARCHAR(50);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS expected_space_complexity VARCHAR(50);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
