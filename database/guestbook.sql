CREATE TABLE IF NOT EXISTS guestbook_entries (
  id TEXT PRIMARY KEY,
  nickname VARCHAR(40) NOT NULL,
  message VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_idx
ON guestbook_entries (created_at DESC);
