-- Phase 1 Initial Schema
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    time_limit_ms INT NOT NULL DEFAULT 1000,
    memory_limit_kb INT NOT NULL DEFAULT 262144,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_cases (
    id SERIAL PRIMARY KEY,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL DEFAULT 'cpp',
    code TEXT NOT NULL,
    verdict VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    execution_time_ms INT DEFAULT NULL,
    memory_used_kb INT DEFAULT NULL,
    compile_output TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON submissions(problem_id);
