import { db } from './db.js'
import { levelInfo } from './util.js'

export function serializeUser(user) {
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    nativeLang: user.native_lang,
    targetLang: user.target_lang,
    level: user.level,
    dailyGoal: user.daily_goal,
    xp: user.xp,
    streak: user.streak,
    lastActive: user.last_active,
    onboarded: !!user.onboarded,
    createdAt: user.created_at,
    levelInfo: levelInfo(user.xp || 0)
  }
}

export function getUserByToken(token) {
  if (!token) return null
  return (
    db
      .prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?')
      .get(token) || null
  )
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const user = getUserByToken(token)
  if (!user) return res.status(401).json({ error: '请先登录后再继续' })
  req.user = user
  req.token = token
  next()
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  req.user = getUserByToken(token)
  req.token = token
  next()
}
