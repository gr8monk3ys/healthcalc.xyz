CREATE TABLE IF NOT EXISTS newsletter_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT '',
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_created_at
  ON newsletter_submissions(created_at DESC);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at
  ON contact_submissions(created_at DESC);

CREATE TABLE IF NOT EXISTS embed_request_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  calculator TEXT NOT NULL DEFAULT '',
  calculator_slug TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_embed_created_at
  ON embed_request_submissions(created_at DESC);
