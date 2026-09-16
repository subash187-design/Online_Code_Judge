-- Phase 4 AI Mentor & Progressive Hint System Migration

-- 1. Base AI feedback per submission
CREATE TABLE IF NOT EXISTS mentor_feedbacks (
    id SERIAL PRIMARY KEY,
    submission_id UUID NOT NULL REFERENCES stage_submissions(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stage_id INT NOT NULL REFERENCES problem_stages(id) ON DELETE CASCADE,
    approach TEXT NOT NULL,
    complexity TEXT NOT NULL,
    what_you_are_doing_well TEXT NOT NULL,
    what_could_be_improved TEXT NOT NULL,
    next_goal TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_mentor_submission UNIQUE (submission_id)
);

-- 2. Progressive hints unlocked per user, stage, and level (1 -> 2 -> 3)
CREATE TABLE IF NOT EXISTS mentor_hints (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stage_id INT NOT NULL REFERENCES problem_stages(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL REFERENCES stage_submissions(id) ON DELETE CASCADE,
    hint_level INT NOT NULL CHECK (hint_level BETWEEN 1 AND 3),
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_stage_hint UNIQUE (user_id, stage_id, hint_level)
);

-- 3. Contextual conversational follow-up messages
CREATE TABLE IF NOT EXISTS mentor_conversations (
    id SERIAL PRIMARY KEY,
    submission_id UUID NOT NULL REFERENCES stage_submissions(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mentor_feedbacks_user ON mentor_feedbacks(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_hints_lookup ON mentor_hints(user_id, stage_id);
CREATE INDEX IF NOT EXISTS idx_mentor_conv_sub ON mentor_conversations(submission_id, created_at ASC);
