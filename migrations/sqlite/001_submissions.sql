PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

CREATE TABLE IF NOT EXISTS newsletter_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  source TEXT DEFAULT '',
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_created_at
  ON newsletter_submissions(created_at DESC);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at
  ON contact_submissions(created_at DESC);

CREATE TABLE IF NOT EXISTS embed_request_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT DEFAULT '',
  calculator TEXT DEFAULT '',
  calculator_slug TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_embed_created_at
  ON embed_request_submissions(created_at DESC);
