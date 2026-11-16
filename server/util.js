import crypto from 'node:crypto'

const TZ_OFFSET = 8 * 60 * 60 * 1000

export function dateKey(d = new Date()) {
  return new Date(d.getTime() + TZ_OFFSET).toISOString().slice(0, 10)
}

export function shiftDateKey(key, days) {
  const d = new Date(key + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function lastNDates(n) {
  const today = dateKey()
  const out = []
  for (let i = n - 1; i >= 0; i--) out.push(shiftDateKey(today, -i))
  return out
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 32).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false
  const [salt, hash] = stored.split(':')
  const candidate = crypto.scryptSync(password, salt, 32).toString('hex')
  const a = Buffer.from(hash, 'hex')
  const b = Buffer.from(candidate, 'hex')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function newToken() {
  return crypto.randomBytes(24).toString('hex')
}

export function parseJSON(str, fallback) {
  if (!str) return fallback
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

export function levelInfo(xp = 0) {
  const perLevel = 250
  const level = Math.floor(xp / perLevel) + 1
  const current = xp % perLevel
  return {
    level,
    current,
    needed: perLevel,
    progress: Math.round((current / perLevel) * 100),
    title: level >= 12 ? '语言大师' : level >= 8 ? '表达者' : level >= 5 ? '进阶学习者' : level >= 3 ? '探索者' : '初学者'
  }
}

export const SKILLS = {
  vocab: '单词',
  grammar: '语法',
  listening: '听力',
  speaking: '口语'
}

export const LANGUAGE_META = {
  en: {
    code: 'en',
    name: '英语',
    nativeName: 'English',
    accent: '#5b8cff',
    accent2: '#22d3ee',
    icon: 'A',
    phrase: 'Small steps, every day.',
    phraseMeaning: '每天一小步，终将行千里。',
    tts: 'en-US',
    learners: 184200
  },
  ja: {
    code: 'ja',
    name: '日语',
    nativeName: '日本語',
    accent: '#ff6b8a',
    accent2: '#ffb86b',
    icon: 'あ',
    phrase: '継続は力なり。',
    phraseMeaning: '坚持就是力量。',
    tts: 'ja-JP',
    learners: 96400
  },
  ko: {
    code: 'ko',
    name: '韩语',
    nativeName: '한국어',
    accent: '#a78bfa',
    accent2: '#f472b6',
    icon: '한',
    phrase: '천 리 길도 한 걸음부터.',
    phraseMeaning: '千里之行，始于足下。',
    tts: 'ko-KR',
    learners: 72300
  }
}

export const LEVEL_META = {
  A1: { label: 'A1 · 入门', short: '入门', desc: '从零开始，掌握日常高频表达' },
  A2: { label: 'A2 · 基础', short: '基础', desc: '应对旅行、工作等常见场景' },
  B1: { label: 'B1 · 进阶', short: '进阶', desc: '表达观点，理解真实语料' }
}
