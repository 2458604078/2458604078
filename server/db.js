import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import { seedDatabase } from './seed/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const dbFile = path.join(dataDir, 'linguaflow.db')
if (process.env.RESET_DB === '1' && fs.existsSync(dbFile)) fs.unlinkSync(dbFile)

export const db = new DatabaseSync(dbFile)
db.exec('PRAGMA journal_mode = WAL;')
db.exec('PRAGMA foreign_keys = ON;')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password_hash TEXT,
  name TEXT NOT NULL,
  avatar TEXT DEFAULT 'violet',
  native_lang TEXT DEFAULT 'zh',
  target_lang TEXT DEFAULT 'en',
  level TEXT DEFAULT 'A1',
  daily_goal INTEGER DEFAULT 20,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active TEXT,
  onboarded INTEGER DEFAULT 0,
  is_bot INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  level TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  accent TEXT,
  icon TEXT,
  tag TEXT,
  sort INTEGER DEFAULT 0,
  learners INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  sort INTEGER DEFAULT 0,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  skill TEXT NOT NULL,
  focus TEXT,
  xp INTEGER DEFAULT 40,
  minutes INTEGER DEFAULT 10,
  dialogue TEXT,
  grammar TEXT,
  exercises TEXT,
  speaking TEXT,
  sort INTEGER DEFAULT 0,
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vocab (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  word TEXT NOT NULL,
  reading TEXT,
  meaning TEXT NOT NULL,
  pos TEXT,
  example TEXT,
  example_meaning TEXT,
  sort INTEGER DEFAULT 0,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_lessons (
  user_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  completed_at TEXT NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS user_skills (
  user_id INTEGER NOT NULL,
  skill TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  correct INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  sessions INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, skill)
);

CREATE TABLE IF NOT EXISTS vocab_reviews (
  user_id INTEGER NOT NULL,
  vocab_id TEXT NOT NULL,
  box INTEGER DEFAULT 1,
  due TEXT NOT NULL,
  correct INTEGER DEFAULT 0,
  wrong INTEGER DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  last_seen TEXT,
  PRIMARY KEY (user_id, vocab_id)
);

CREATE TABLE IF NOT EXISTS activity (
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  minutes INTEGER DEFAULT 0,
  lessons INTEGER DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, date)
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  topic TEXT,
  language TEXT,
  likes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS post_likes (
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tier TEXT,
  metric TEXT,
  threshold INTEGER,
  sort INTEGER
);

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id INTEGER NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TEXT NOT NULL,
  PRIMARY KEY (user_id, achievement_id)
);
`)

const row = db.prepare('SELECT COUNT(*) AS c FROM courses').get()
if (!row || row.c === 0) {
  seedDatabase(db)
  console.log('[db] seeded fresh database')
}
