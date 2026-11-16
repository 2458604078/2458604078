import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth, serializeUser } from '../auth.js'
import { hashPassword, verifyPassword, newToken } from '../util.js'

const router = Router()
const AVATARS = ['violet', 'cyan', 'rose', 'amber', 'emerald', 'sky', 'fuchsia', 'lime']
const LANGS = ['en', 'ja', 'ko']
const LEVELS = ['A1', 'A2', 'B1']

function createSession(userId) {
  const token = newToken()
  db.prepare('INSERT INTO sessions (token,user_id,created_at) VALUES (?,?,?)').run(token, userId, new Date().toISOString())
  return token
}

router.post('/register', (req, res) => {
  const { email, password, name } = req.body || {}
  const cleanEmail = String(email || '').trim().toLowerCase()
  const cleanName = String(name || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return res.status(400).json({ error: '请输入有效的邮箱地址' })
  if (!password || String(password).length < 6) return res.status(400).json({ error: '密码至少需要 6 位' })
  if (!cleanName || cleanName.length > 20) return res.status(400).json({ error: '请输入 1-20 个字符的昵称' })
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail)
  if (exists) return res.status(409).json({ error: '该邮箱已注册，请直接登录' })

  const info = db
    .prepare(
      'INSERT INTO users (email,password_hash,name,avatar,native_lang,target_lang,level,daily_goal,xp,streak,onboarded,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    )
    .run(cleanEmail, hashPassword(String(password)), cleanName, AVATARS[Math.floor(Math.random() * AVATARS.length)], 'zh', 'en', 'A1', 20, 0, 0, 0, new Date().toISOString())

  const userId = Number(info.lastInsertRowid)
  const token = createSession(userId)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  res.status(201).json({ token, user: serializeUser(user) })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  const cleanEmail = String(email || '').trim().toLowerCase()
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND is_bot = 0').get(cleanEmail)
  if (!user || !verifyPassword(String(password || ''), user.password_hash)) {
    return res.status(401).json({ error: '邮箱或密码不正确' })
  }
  const token = createSession(user.id)
  res.json({ token, user: serializeUser(user) })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: serializeUser(req.user) })
})

router.post('/logout', requireAuth, (req, res) => {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(req.token)
  res.json({ ok: true })
})

router.put('/profile', requireAuth, (req, res) => {
  const body = req.body || {}
  const updates = []
  const values = []

  if (body.name !== undefined) {
    const name = String(body.name).trim()
    if (!name || name.length > 20) return res.status(400).json({ error: '昵称需要 1-20 个字符' })
    updates.push('name = ?')
    values.push(name)
  }
  if (body.avatar !== undefined) {
    if (!AVATARS.includes(body.avatar)) return res.status(400).json({ error: '头像样式不支持' })
    updates.push('avatar = ?')
    values.push(body.avatar)
  }
  if (body.targetLang !== undefined) {
    if (!LANGS.includes(body.targetLang)) return res.status(400).json({ error: '目标语言不支持' })
    updates.push('target_lang = ?')
    values.push(body.targetLang)
  }
  if (body.level !== undefined) {
    if (!LEVELS.includes(body.level)) return res.status(400).json({ error: '难度等级不支持' })
    updates.push('level = ?')
    values.push(body.level)
  }
  if (body.dailyGoal !== undefined) {
    const goal = Number(body.dailyGoal)
    if (!Number.isFinite(goal) || goal < 5 || goal > 120) return res.status(400).json({ error: '每日目标需在 5-120 分钟之间' })
    updates.push('daily_goal = ?')
    values.push(Math.round(goal))
  }
  if (body.onboarded !== undefined) {
    updates.push('onboarded = ?')
    values.push(body.onboarded ? 1 : 0)
  }
  if (!updates.length) return res.json({ user: serializeUser(req.user) })

  values.push(req.user.id)
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  res.json({ user: serializeUser(user) })
})

export default router
