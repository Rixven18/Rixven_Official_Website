-- RIXVEN Database Schema v1
-- Run: wrangler d1 execute rixven-db --local --file=./migrations/001_schema.sql

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id             TEXT PRIMARY KEY NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  company        TEXT,
  job_title      TEXT,
  category       TEXT NOT NULL CHECK(category IN ('enterprise','partnership','developer','press','support','general')),
  message        TEXT NOT NULL,
  product        TEXT CHECK(product IN ('rixven-os','rixven-ai','rixven-lang','all')),
  submitter_ip   TEXT NOT NULL,
  user_agent     TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','read','replied','closed')),
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Early access applications
CREATE TABLE IF NOT EXISTS early_access_applications (
  id             TEXT PRIMARY KEY NOT NULL,
  email          TEXT NOT NULL,
  full_name      TEXT NOT NULL,
  organization   TEXT,
  product        TEXT NOT NULL CHECK(product IN ('rixven-os','rixven-ai','rixven-lang')),
  use_case       TEXT NOT NULL,
  github         TEXT,
  approved       INTEGER NOT NULL DEFAULT 0,
  access_token   TEXT,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_early_access_email ON early_access_applications(email);