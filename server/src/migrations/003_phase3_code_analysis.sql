-- Phase 3 Code & Complexity Analysis Migration

CREATE TABLE IF NOT EXISTS submission_analyses (
    id SERIAL PRIMARY KEY,
    submission_id UUID NOT NULL REFERENCES stage_submissions(id) ON DELETE CASCADE,
    stage_id INT NOT NULL REFERENCES problem_stages(id) ON DELETE CASCADE,
    detected_approach VARCHAR(100) NOT NULL,
    time_complexity VARCHAR(50) NOT NULL,
    space_complexity VARCHAR(50) NOT NULL,
    confidence_level VARCHAR(20) NOT NULL CHECK (confidence_level IN ('HIGH', 'MEDIUM', 'LOW')),
    stage_match_status VARCHAR(30) NOT NULL CHECK (stage_match_status IN ('MATCHES_STAGE_TARGET', 'POSSIBLY_SUBOPTIMAL', 'BETTER_THAN_EXPECTED', 'UNDETERMINED')),
    detected_patterns JSONB NOT NULL DEFAULT '[]',
    runtime_notes TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_submission_analysis UNIQUE (submission_id)
);

CREATE INDEX IF NOT EXISTS idx_submission_analyses_stage ON submission_analyses(stage_id);
CREATE INDEX IF NOT EXISTS idx_submission_analyses_sub ON submission_analyses(submission_id);
