import { dateKey } from './util.js'

export const ACHIEVEMENTS = [
  { id: 'first_step', title: '初出茅庐', description: '完成第一节课程', icon: 'flag', tier: 'bronze', metric: 'lessons', threshold: 1 },
  { id: 'lessons_10', title: '渐入佳境', description: '累计完成 10 节课程', icon: 'book', tier: 'silver', metric: 'lessons', threshold: 10 },
  { id: 'lessons_30', title: '学习惯犯', description: '累计完成 30 节课程', icon: 'layers', tier: 'gold', metric: 'lessons', threshold: 30 },
  { id: 'xp_500', title: '能量满格', description: '累计获得 500 XP', icon: 'bolt', tier: 'silver', metric: 'xp', threshold: 500 },
  { id: 'xp_2000', title: '火力全开', description: '累计获得 2000 XP', icon: 'flame', tier: 'gold', metric: 'xp', threshold: 2000 },
  { id: 'streak_3', title: '三日之约', description: '连续学习 3 天', icon: 'calendar', tier: 'bronze', metric: 'streak', threshold: 3 },
  { id: 'streak_7', title: '一周不断更', description: '连续学习 7 天', icon: 'calendar-check', tier: 'silver', metric: 'streak', threshold: 7 },
  { id: 'streak_30', title: '月度铁人', description: '连续学习 30 天', icon: 'crown', tier: 'platinum', metric: 'streak', threshold: 30 },
  { id: 'words_20', title: '词汇萌芽', description: '掌握 20 个单词', icon: 'sprout', tier: 'bronze', metric: 'words', threshold: 20 },
  { id: 'words_100', title: '词汇富翁', description: '掌握 100 个单词', icon: 'gem', tier: 'gold', metric: 'words', threshold: 100 },
  { id: 'speaking_5', title: '开口达人', description: '完成 5 次口语跟读', icon: 'mic', tier: 'silver', metric: 'speakingSessions', threshold: 5 },
  { id: 'listening_5', title: '顺风耳', description: '完成 5 次听力训练', icon: 'headphones', tier: 'silver', metric: 'listeningSessions', threshold: 5 },
  { id: 'grammar_5', title: '语法侦探', description: '完成 5 次语法练习', icon: 'search', tier: 'silver', metric: 'grammarSessions', threshold: 5 },
  { id: 'posts_1', title: '首次发声', description: '在社区发布 1 条动态', icon: 'message', tier: 'bronze', metric: 'posts', threshold: 1 },
  { id: 'languages_2', title: '多语并行', description: '在 2 种语言中完成课程', icon: 'globe', tier: 'silver', metric: 'languages', threshold: 2 },
  { id: 'reviews_50', title: '复习狂人', description: '累计完成 50 次单词复习', icon: 'repeat', tier: 'silver', metric: 'reviews', threshold: 50 },
  { id: 'perfect_1', title: '满分通关', description: '以 100 分完成一节课', icon: 'star', tier: 'gold', metric: 'perfect', threshold: 1 },
  { id: 'perfect_5', title: '完美主义', description: '以满分完成 5 节课', icon: 'sparkles', tier: 'platinum', metric: 'perfect', threshold: 5 }
]

export function seedAchievements(db) {
  const insert = db.prepare(
    'INSERT OR IGNORE INTO achievements (id,title,description,icon,tier,metric,threshold,sort) VALUES (?,?,?,?,?,?,?,?)'
  )
  ACHIEVEMENTS.forEach((a, i) => {
    insert.run(a.id, a.title, a.description, a.icon, a.tier, a.metric, a.threshold, i)
  })
}

export function getMetrics(db, userId) {
  const get = (sql, ...args) => {
    const row = db.prepare(sql).get(...args)
    return row || {}
  }
  const lessons = get('SELECT COUNT(*) c FROM user_lessons WHERE user_id = ?', userId).c || 0
  const perfect = get('SELECT COUNT(*) c FROM user_lessons WHERE user_id = ? AND score >= 100', userId).c || 0
  const words = get('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ?', userId).c || 0
  const reviews = get('SELECT COALESCE(SUM(reviews),0) c FROM vocab_reviews WHERE user_id = ?', userId).c || 0
  const posts = get('SELECT COUNT(*) c FROM posts WHERE user_id = ?', userId).c || 0
  const xp = get('SELECT xp FROM users WHERE id = ?', userId).xp || 0
  const streak = get('SELECT streak FROM users WHERE id = ?', userId).streak || 0
  const sessions = {}
  for (const r of db.prepare('SELECT skill, sessions FROM user_skills WHERE user_id = ?').all(userId)) {
    sessions[r.skill] = r.sessions || 0
  }
  const languages = get(
    `SELECT COUNT(DISTINCT c.language) c FROM user_lessons ul
     JOIN lessons l ON l.id = ul.lesson_id JOIN courses c ON c.id = l.course_id
     WHERE ul.user_id = ?`,
    userId
  ).c || 0

  return {
    lessons,
    perfect,
    words,
    reviews,
    posts,
    xp,
    streak,
    languages,
    speakingSessions: sessions.speaking || 0,
    listeningSessions: sessions.listening || 0,
    grammarSessions: sessions.grammar || 0,
    vocabSessions: sessions.vocab || 0
  }
}

export function evaluateAchievements(db, userId) {
  const metrics = getMetrics(db, userId)
  const unlocked = new Set(
    db.prepare('SELECT achievement_id FROM user_achievements WHERE user_id = ?').all(userId).map(r => r.achievement_id)
  )
  const now = new Date().toISOString()
  const insert = db.prepare('INSERT OR IGNORE INTO user_achievements (user_id, achievement_id, unlocked_at) VALUES (?,?,?)')
  const fresh = []
  for (const a of ACHIEVEMENTS) {
    if (unlocked.has(a.id)) continue
    if ((metrics[a.metric] || 0) >= a.threshold) {
      insert.run(userId, a.id, now)
      fresh.push(a)
    }
  }
  return fresh
}

export function bumpStreak(db, userId) {
  const user = db.prepare('SELECT streak, last_active FROM users WHERE id = ?').get(userId)
  const today = dateKey()
  if (!user) return 0
  if (user.last_active === today) return user.streak
  const yesterday = dateKey(new Date(Date.now() - 86400000))
  const streak = user.last_active === yesterday ? (user.streak || 0) + 1 : 1
  db.prepare('UPDATE users SET streak = ?, last_active = ? WHERE id = ?').run(streak, today, userId)
  return streak
}
