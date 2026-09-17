CREATE TABLE IF NOT EXISTS study_state_backups (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  updated_at INTEGER NOT NULL,
  payload TEXT NOT NULL,
  archived_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, updated_at)
);
--> statement-breakpoint
CREATE TRIGGER IF NOT EXISTS preserve_study_state
BEFORE UPDATE ON study_states
WHEN OLD.payload <> NEW.payload
BEGIN
  INSERT OR IGNORE INTO study_state_backups(user_id, updated_at, payload, archived_at)
  VALUES(OLD.user_id, OLD.updated_at, OLD.payload, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
  DELETE FROM study_state_backups
  WHERE user_id = OLD.user_id
    AND updated_at NOT IN (
      SELECT updated_at FROM study_state_backups WHERE user_id = OLD.user_id ORDER BY updated_at DESC LIMIT 20
    )
    AND (
      archived_at < (CAST(strftime('%s', 'now') AS INTEGER) - 30 * 86400) * 1000
      OR updated_at NOT IN (
        SELECT MIN(updated_at) FROM study_state_backups WHERE user_id = OLD.user_id GROUP BY archived_at / 86400000
      )
    );
END;
