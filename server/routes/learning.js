import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth, optionalAuth, serializeUser } from '../auth.js'
import {
  dateKey,
  lastNDates,
  shiftDateKey,
  parseJSON,
  levelInfo,
  SKILLS,
  LANGUAGE_META,
  LEVEL_META
} from '../util.js'
import { evaluateAchievements, getMetrics, bumpStreak } from '../achievements.js'

const router = Router()
const LEVEL_ORDER = { A1: 0, A2: 1, B1: 2 }

function completedSet(userId) {
  if (!userId) return new Set()
  return new Set(db.prepare('SELECT lesson_id FROM user_lessons WHERE user_id = ?').all(userId).map(r => r.lesson_id))
}

function courseLessonRow(courseId, userId) {
  const completed = completedSet(userId)
  const lessons = db
    .prepare(
      `SELECT l.*, u.title AS unit_title, u.sort AS unit_sort
       FROM lessons l JOIN units u ON u.id = l.unit_id
       WHERE l.course_id = ? ORDER BY u.sort, l.sort`
    )
    .all(courseId)
  return { lessons, completed }
}

function nextLessonOf(courseId, userId) {
  const done = completedSet(userId)
  const { lessons } = courseLessonRow(courseId, userId)
  return lessons.find(l => !done.has(l.id)) || null
}

function recommendFor(userId) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  if (!user) return { path: [], weakest: null }
  const done = completedSet(userId)
  const skills = skillStats(userId)
  const studied = skills.filter(s => s.total > 0)
  const weakest = studied.length
    ? studied.reduce((min, s) => (s.accuracy < min.accuracy ? s : min), studied[0])
    : null

  const all = db
    .prepare(
      `SELECT l.id, l.title, l.subtitle, l.skill, l.minutes, l.xp, l.focus,
              c.id AS course_id, c.title AS course_title, c.level, c.language, c.accent, c.icon
       FROM lessons l JOIN courses c ON c.id = l.course_id
       WHERE c.language = ?
       ORDER BY CASE c.level WHEN ? THEN 0 WHEN 'A1' THEN 1 WHEN 'A2' THEN 2 ELSE 3 END, c.sort, l.sort`
    )
    .all(user.target_lang, user.level)

  const candidates = all.filter(l => !done.has(l.id))
  const pool = candidates.slice(0, 8)
  // 优先把薄弱技能相关的课程排进路径
  if (weakest) {
    const idx = pool.findIndex(l => l.skill === weakest.key)
    if (idx > 0) {
      const [picked] = pool.splice(idx, 1)
      pool.splice(Math.min(2, pool.length), 0, picked)
    }
  }
  const path = pool.slice(0, 5).map((l, i) => {
    let reason = '承接当前级别，保持学习节奏'
    if (i === 0) reason = '根据你的进度，这是最合适的下一节'
    else if (weakest && l.skill === weakest.key) reason = `你的${SKILLS[weakest.key]}正确率为 ${weakest.accuracy}%，这节重点突破`
    else if (i === pool.length - 1) reason = '完成它，你就能解锁本级别更多内容'
    else if (l.focus) reason = `围绕「${l.focus}」的真实场景练习`
    return {
      lessonId: l.id,
      title: l.title,
      subtitle: l.subtitle,
      courseId: l.course_id,
      courseTitle: l.course_title,
      level: l.level,
      levelLabel: LEVEL_META[l.level]?.short || l.level,
      language: l.language,
      accent: l.accent,
      skill: l.skill,
      skillLabel: l.skill === 'mixed' ? '综合' : SKILLS[l.skill] || l.skill,
      minutes: l.minutes,
      xp: l.xp,
      reason
    }
  })

  if (!path.length && all.length) {
    const last = all[all.length - 1]
    path.push({
      lessonId: last.id,
      title: last.title,
      subtitle: last.subtitle,
      courseId: last.course_id,
      courseTitle: last.course_title,
      level: last.level,
      levelLabel: LEVEL_META[last.level]?.short || last.level,
      language: last.language,
      accent: last.accent,
      skill: last.skill,
      skillLabel: last.skill === 'mixed' ? '综合' : SKILLS[last.skill] || last.skill,
      minutes: last.minutes,
      xp: last.xp,
      reason: '本级别已全部完成，建议复习巩固并挑战更高难度'
    })
  }

  return {
    path,
    weakest,
    userLevel: user.level,
    language: user.target_lang,
    languageMeta: LANGUAGE_META[user.target_lang]
  }
}

function skillStats(userId) {
  const rows = db.prepare('SELECT skill, xp, correct, total, sessions FROM user_skills WHERE user_id = ?').all(userId)
  const map = Object.fromEntries(rows.map(r => [r.skill, r]))
  return Object.keys(SKILLS).map(key => {
    const r = map[key] || { xp: 0, correct: 0, total: 0, sessions: 0 }
    return {
      key,
      label: SKILLS[key],
      xp: r.xp || 0,
      correct: r.correct || 0,
      total: r.total || 0,
      sessions: r.sessions || 0,
      accuracy: r.total ? Math.round((r.correct / r.total) * 100) : 0
    }
  })
}

function weeklyActivity(userId) {
  const dates = lastNDates(7)
  const rows = db.prepare('SELECT * FROM activity WHERE user_id = ? AND date >= ?').all(userId, dates[0])
  const map = Object.fromEntries(rows.map(r => [r.date, r]))
  return dates.map((date, i) => ({
    date,
    weekday: ['日', '一', '二', '三', '四', '五', '六'][new Date(date + 'T00:00:00Z').getUTCDay()],
    xp: map[date]?.xp || 0,
    minutes: map[date]?.minutes || 0,
    lessons: map[date]?.lessons || 0,
    reviews: map[date]?.reviews || 0,
    isToday: i === dates.length - 1
  }))
}

function leaderboard(range = 'week') {
  if (range === 'all') {
    return db
      .prepare('SELECT id,name,avatar,xp,streak,target_lang,level,is_bot FROM users ORDER BY xp DESC, id ASC LIMIT 30')
      .all()
      .map((u, i) => ({ ...u, score: u.xp, rank: i + 1 }))
  }
  const start = lastNDates(7)[0]
  return db
    .prepare(
      `SELECT u.id, u.name, u.avatar, u.xp, u.streak, u.target_lang, u.level, u.is_bot,
              COALESCE(SUM(a.xp),0) AS score
       FROM users u LEFT JOIN activity a ON a.user_id = u.id AND a.date >= ?
       GROUP BY u.id ORDER BY score DESC, u.xp DESC LIMIT 30`
    )
    .all(start)
    .map((u, i) => ({ ...u, rank: i + 1 }))
}

function communityPreview(userId) {
  const rows = db
    .prepare(
      `SELECT p.*, u.name, u.avatar, u.is_bot,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count
       FROM posts p JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC LIMIT 3`
    )
    .all()
  const liked = new Set(db.prepare('SELECT post_id FROM post_likes WHERE user_id = ?').all(userId).map(r => r.post_id))
  return rows.map(r => ({
    id: r.id,
    content: r.content,
    topic: r.topic,
    language: r.language,
    likes: r.likes,
    commentCount: r.comment_count,
    liked: liked.has(r.id),
    createdAt: r.created_at,
    author: { id: r.user_id, name: r.name, avatar: r.avatar, isBot: !!r.is_bot }
  }))
}

router.get('/catalog', optionalAuth, (req, res) => {
  const userId = req.user?.id || 0
  const language = req.query.language
  const rows = db
    .prepare(
      `SELECT c.*,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
        (SELECT COUNT(*) FROM units u WHERE u.course_id = c.id) AS unit_count,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id AND l.id IN
          (SELECT lesson_id FROM user_lessons WHERE user_id = ?)) AS completed
       FROM courses c ORDER BY c.sort`
    )
    .all(userId)

  const languages = Object.values(LANGUAGE_META).map(meta => {
    const courses = rows
      .filter(c => c.language === meta.code && (!language || language === 'all' || language === meta.code))
      .map(c => {
        const next = nextLessonOf(c.id, userId)
        return {
          id: c.id,
          language: c.language,
          level: c.level,
          levelLabel: LEVEL_META[c.level]?.label || c.level,
          title: c.title,
          subtitle: c.subtitle,
          description: c.description,
          accent: c.accent,
          icon: c.icon,
          tag: c.tag,
          learners: c.learners,
          lessonCount: c.lesson_count,
          unitCount: c.unit_count,
          completed: c.completed,
          progress: c.lesson_count ? Math.round((c.completed / c.lesson_count) * 100) : 0,
          nextLesson: next ? { id: next.id, title: next.title } : null
        }
      })
    return {
      ...meta,
      courses,
      courseCount: courses.length,
      lessonCount: courses.reduce((n, c) => n + c.lessonCount, 0),
      completed: courses.reduce((n, c) => n + c.completed, 0)
    }
  })
  res.json({ languages })
})

router.get('/courses/:id', optionalAuth, (req, res) => {
  const userId = req.user?.id || 0
  const course = db
    .prepare(
      `SELECT c.*,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
        (SELECT COUNT(*) FROM units u WHERE u.course_id = c.id) AS unit_count
       FROM courses c WHERE c.id = ?`
    )
    .get(req.params.id)
  if (!course) return res.status(404).json({ error: '课程不存在' })

  const done = completedSet(userId)
  const scores = Object.fromEntries(
    userId
      ? db.prepare('SELECT lesson_id, score FROM user_lessons WHERE user_id = ?').all(userId).map(r => [r.lesson_id, r.score])
      : []
  )
  const units = db.prepare('SELECT * FROM units WHERE course_id = ? ORDER BY sort').all(course.id).map(u => {
    const lessons = db.prepare('SELECT * FROM lessons WHERE unit_id = ? ORDER BY sort').all(u.id).map(l => ({
      id: l.id,
      title: l.title,
      subtitle: l.subtitle,
      skill: l.skill,
      skillLabel: l.skill === 'mixed' ? '综合' : SKILLS[l.skill] || l.skill,
      focus: l.focus,
      xp: l.xp,
      minutes: l.minutes,
      completed: done.has(l.id),
      score: scores[l.id] || 0
    }))
    return { id: u.id, title: u.title, subtitle: u.subtitle, lessons }
  })

  const completed = units.reduce((n, u) => n + u.lessons.filter(l => l.completed).length, 0)
  const total = units.reduce((n, u) => n + u.lessons.length, 0)
  const next = nextLessonOf(course.id, userId)

  res.json({
    course: {
      id: course.id,
      language: course.language,
      level: course.level,
      levelLabel: LEVEL_META[course.level]?.label || course.level,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      accent: course.accent,
      icon: course.icon,
      tag: course.tag,
      learners: course.learners,
      lessonCount: total,
      unitCount: units.length,
      completed,
      progress: total ? Math.round((completed / total) * 100) : 0,
      nextLesson: next ? { id: next.id, title: next.title } : null,
      languageMeta: LANGUAGE_META[course.language],
      units
    }
  })
})

router.get('/lessons/:id', requireAuth, (req, res) => {
  const row = db
    .prepare(
      `SELECT l.*, u.title AS unit_title, u.subtitle AS unit_subtitle,
              c.title AS course_title, c.language, c.level, c.accent, c.icon
       FROM lessons l
       JOIN units u ON u.id = l.unit_id
       JOIN courses c ON c.id = l.course_id
       WHERE l.id = ?`
    )
    .get(req.params.id)
  if (!row) return res.status(404).json({ error: '课程内容不存在' })

  const vocab = db.prepare('SELECT * FROM vocab WHERE lesson_id = ? ORDER BY sort').all(row.id)
  const { lessons } = courseLessonRow(row.course_id, req.user.id)
  const index = lessons.findIndex(l => l.id === row.id)
  const completed = db
    .prepare('SELECT score, completed_at FROM user_lessons WHERE user_id = ? AND lesson_id = ?')
    .get(req.user.id, row.id)

  res.json({
    lesson: {
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      skill: row.skill,
      focus: row.focus,
      xp: row.xp,
      minutes: row.minutes,
      dialogue: parseJSON(row.dialogue, []),
      grammar: parseJSON(row.grammar, []),
      exercises: parseJSON(row.exercises, []),
      speaking: parseJSON(row.speaking, []),
      vocab: vocab.map(v => ({
        id: v.id,
        word: v.word,
        reading: v.reading,
        meaning: v.meaning,
        pos: v.pos,
        example: v.example,
        exampleMeaning: v.example_meaning
      })),
      completed: !!completed,
      bestScore: completed?.score || 0
    },
    course: {
      id: row.course_id,
      title: row.course_title,
      language: row.language,
      level: row.level,
      accent: row.accent,
      icon: row.icon,
      languageMeta: LANGUAGE_META[row.language]
    },
    unit: { title: row.unit_title, subtitle: row.unit_subtitle },
    prevLesson: index > 0 ? { id: lessons[index - 1].id, title: lessons[index - 1].title } : null,
    nextLesson: index >= 0 && index < lessons.length - 1 ? { id: lessons[index + 1].id, title: lessons[index + 1].title } : null
  })
})

router.post('/lessons/:id/complete', requireAuth, (req, res) => {
  const lesson = db
    .prepare('SELECT l.*, c.language FROM lessons l JOIN courses c ON c.id = l.course_id WHERE l.id = ?')
    .get(req.params.id)
  if (!lesson) return res.status(404).json({ error: '课程内容不存在' })

  const body = req.body || {}
  const score = Math.max(0, Math.min(100, Math.round(Number(body.score) || 0)))
  const minutes = Math.max(1, Math.min(180, Math.round(Number(body.minutes) || lesson.minutes)))
  const results = body.results && typeof body.results === 'object' ? body.results : {}
  const vocabIds = Array.isArray(body.vocabIds) ? body.vocabIds : []

  const existing = db
    .prepare('SELECT * FROM user_lessons WHERE user_id = ? AND lesson_id = ?')
    .get(req.user.id, lesson.id)
  const repeated = !!existing
  const quality = score >= 90 ? 1 : score >= 70 ? 0.85 : 0.7
  const xpEarned = Math.max(8, Math.round(lesson.xp * quality * (repeated ? 0.3 : 1)))

  const now = new Date().toISOString()
  db.prepare(
    `INSERT INTO user_lessons (user_id,lesson_id,score,completed_at) VALUES (?,?,?,?)
     ON CONFLICT(user_id,lesson_id) DO UPDATE SET
       score = MAX(user_lessons.score, excluded.score),
       completed_at = excluded.completed_at`
  ).run(req.user.id, lesson.id, score, now)

  const skillEntries = Object.entries(results).filter(([key, value]) => SKILLS[key] && value && Number(value.total) > 0)
  const share = skillEntries.length ? Math.max(1, Math.round(xpEarned / skillEntries.length)) : 0
  for (const [key, value] of skillEntries) {
    const correct = Math.max(0, Math.min(Number(value.total), Number(value.correct) || 0))
    const total = Number(value.total)
    db.prepare(
      `INSERT INTO user_skills (user_id,skill,xp,correct,total,sessions) VALUES (?,?,?,?,?,1)
       ON CONFLICT(user_id,skill) DO UPDATE SET
         xp = user_skills.xp + excluded.xp,
         correct = user_skills.correct + excluded.correct,
         total = user_skills.total + excluded.total,
         sessions = user_skills.sessions + 1`
    ).run(req.user.id, key, share, correct, total)
  }

  const lessonVocab = new Set(db.prepare('SELECT id FROM vocab WHERE lesson_id = ?').all(lesson.id).map(v => v.id))
  const insertReview = db.prepare(
    `INSERT OR IGNORE INTO vocab_reviews (user_id,vocab_id,box,due,correct,wrong,reviews,last_seen)
     VALUES (?,?,1,?,0,0,0,?)`
  )
  const tomorrow = shiftDateKey(dateKey(), 1)
  for (const vocabId of vocabIds.slice(0, 50)) {
    if (lessonVocab.has(vocabId)) insertReview.run(req.user.id, vocabId, tomorrow, dateKey())
  }

  const today = dateKey()
  db.prepare(
    `INSERT INTO activity (user_id,date,xp,minutes,lessons,reviews) VALUES (?,?,?,?,1,0)
     ON CONFLICT(user_id,date) DO UPDATE SET
       xp = activity.xp + excluded.xp,
       minutes = activity.minutes + excluded.minutes,
       lessons = activity.lessons + 1`
  ).run(req.user.id, today, xpEarned, minutes)

  db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(xpEarned, req.user.id)
  const streak = bumpStreak(db, req.user.id)
  const newAchievements = evaluateAchievements(db, req.user.id)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  const todayRow = db.prepare('SELECT * FROM activity WHERE user_id = ? AND date = ?').get(req.user.id, today)

  res.json({
    xpEarned,
    totalXp: user.xp,
    levelInfo: levelInfo(user.xp),
    streak,
    newAchievements,
    repeated,
    today: { xp: todayRow?.xp || 0, minutes: todayRow?.minutes || 0, lessons: todayRow?.lessons || 0 },
    user: serializeUser(user)
  })
})

router.get('/dashboard', requireAuth, (req, res) => {
  const user = req.user
  const today = dateKey()
  const todayRow = db.prepare('SELECT * FROM activity WHERE user_id = ? AND date = ?').get(user.id, today)
  const weekly = weeklyActivity(user.id)
  const skills = skillStats(user.id)
  const totals = {
    xp: user.xp,
    lessons: db.prepare('SELECT COUNT(*) c FROM user_lessons WHERE user_id = ?').get(user.id).c,
    words: db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ?').get(user.id).c,
    minutes: db.prepare('SELECT COALESCE(SUM(minutes),0) c FROM activity WHERE user_id = ?').get(user.id).c,
    activeDays: db.prepare('SELECT COUNT(*) c FROM activity WHERE user_id = ? AND xp > 0').get(user.id).c
  }
  const done = completedSet(user.id)
  const continueRow = db
    .prepare(
      `SELECT l.id, l.title, l.subtitle, l.skill, l.minutes, l.xp,
              c.id AS course_id, c.title AS course_title, c.level, c.accent, c.language
       FROM lessons l JOIN courses c ON c.id = l.course_id
       WHERE c.language = ? AND l.id NOT IN (SELECT lesson_id FROM user_lessons WHERE user_id = ?)
       ORDER BY CASE WHEN c.level = ? THEN 0 ELSE 1 END, c.sort, l.sort LIMIT 1`
    )
    .get(user.target_lang, user.id, user.level)
  const rec = recommendFor(user.id)
  const board = leaderboard('week')
  const myEntry = board.find(r => r.id === user.id)
  const unlockedCount = db.prepare('SELECT COUNT(*) c FROM user_achievements WHERE user_id = ?').get(user.id).c
  const totalAchievements = db.prepare('SELECT COUNT(*) c FROM achievements').get().c
  const recentAchievements = db
    .prepare(
      `SELECT a.*, ua.unlocked_at FROM user_achievements ua
       JOIN achievements a ON a.id = ua.achievement_id
       WHERE ua.user_id = ? ORDER BY ua.unlocked_at DESC LIMIT 3`
    )
    .all(user.id)
  const due = db
    .prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ? AND due <= ?')
    .get(user.id, today).c

  res.json({
    user: serializeUser(user),
    today: {
      xp: todayRow?.xp || 0,
      minutes: todayRow?.minutes || 0,
      lessons: todayRow?.lessons || 0,
      reviews: todayRow?.reviews || 0,
      goalProgress: Math.min(100, Math.round(((todayRow?.minutes || 0) / (user.daily_goal || 20)) * 100))
    },
    weekly,
    weeklyXp: weekly.reduce((n, d) => n + d.xp, 0),
    totals,
    skills,
    continueLesson: continueRow
      ? {
          ...continueRow,
          skillLabel: continueRow.skill === 'mixed' ? '综合训练' : SKILLS[continueRow.skill],
          levelLabel: LEVEL_META[continueRow.level]?.short
        }
      : null,
    path: rec.path.slice(0, 3),
    weakestSkill: rec.weakest,
    languageMeta: LANGUAGE_META[user.target_lang],
    achievements: { unlocked: unlockedCount, total: totalAchievements, recent: recentAchievements },
    community: communityPreview(user.id),
    reviewDue: due,
    leaderboard: { top: board.slice(0, 5), me: myEntry ? { rank: myEntry.rank, score: myEntry.score } : null }
  })
})

router.get('/recommendations', requireAuth, (req, res) => {
  const rec = recommendFor(req.user.id)
  const today = dateKey()
  const due = db
    .prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ? AND due <= ?')
    .get(req.user.id, today).c
  const words = db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ?').get(req.user.id).c
  const user = req.user

  const dates = []
  for (let i = 0; i < 7; i++) dates.push(shiftDateKey(today, i))
  const plan = []
  let lessonIndex = 0
  for (let i = 0; i < 7; i++) {
    if ((i === 2 || i === 5) && words > 0) {
      plan.push({
        date: dates[i],
        day: i === 0 ? '今天' : i === 1 ? '明天' : `第 ${i + 1} 天`,
        type: 'review',
        title: '单词间隔复习',
        meta: `${due || Math.min(12, words)} 个待复习词 · 约 10 分钟`,
        reason: '趁记忆即将模糊时复习，效果最佳'
      })
      continue
    }
    const item = rec.path[lessonIndex]
    if (item) {
      plan.push({
        date: dates[i],
        day: i === 0 ? '今天' : i === 1 ? '明天' : `第 ${i + 1} 天`,
        type: 'lesson',
        title: item.title,
        meta: `${item.courseTitle} · ${item.minutes} 分钟 · +${item.xp} XP`,
        reason: item.reason,
        lessonId: item.lessonId,
        skillLabel: item.skillLabel,
        accent: item.accent
      })
      lessonIndex++
    } else {
      plan.push({
        date: dates[i],
        day: i === 0 ? '今天' : i === 1 ? '明天' : `第 ${i + 1} 天`,
        type: 'community',
        title: '社区输出练习',
        meta: '用目标语言发一条动态 · +10 XP',
        reason: '输出是最好的复习，去社区分享你的学习心得'
      })
    }
  }

  const levelCourses = db
    .prepare('SELECT id, title, level FROM courses WHERE language = ? ORDER BY sort')
    .all(user.target_lang)

  res.json({
    path: rec.path,
    plan,
    weakest: rec.weakest,
    languageMeta: LANGUAGE_META[user.target_lang],
    level: user.level,
    levelLabel: LEVEL_META[user.level]?.label,
    target: {
      dailyGoal: user.daily_goal,
      weeklyXp: weeklyActivity(user.id).reduce((n, d) => n + d.xp, 0),
      due,
      words
    },
    courses: levelCourses
  })
})

router.get('/progress', requireAuth, (req, res) => {
  const userId = req.user.id
  const today = dateKey()
  const dates = []
  for (let i = 34; i >= 0; i--) dates.push(shiftDateKey(today, -i))
  const rows = db.prepare('SELECT * FROM activity WHERE user_id = ? AND date >= ?').all(userId, dates[0])
  const map = Object.fromEntries(rows.map(r => [r.date, r]))

  const courses = db
    .prepare(
      `SELECT c.id, c.title, c.language, c.level, c.accent, c.icon,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id AND l.id IN
          (SELECT lesson_id FROM user_lessons WHERE user_id = ?)) AS completed
       FROM courses c ORDER BY c.sort`
    )
    .all(userId)
    .map(c => ({
      id: c.id,
      title: c.title,
      language: c.language,
      level: c.level,
      accent: c.accent,
      icon: c.icon,
      lessonCount: c.lesson_count,
      completed: c.completed,
      progress: c.lesson_count ? Math.round((c.completed / c.lesson_count) * 100) : 0
    }))

  const recent = db
    .prepare(
      `SELECT ul.lesson_id, ul.score, ul.completed_at, l.title, l.skill, l.xp,
              c.title AS course_title, c.language, c.accent
       FROM user_lessons ul
       JOIN lessons l ON l.id = ul.lesson_id
       JOIN courses c ON c.id = l.course_id
       WHERE ul.user_id = ? ORDER BY ul.completed_at DESC LIMIT 8`
    )
    .all(userId)

  const totals = {
    xp: req.user.xp,
    lessons: db.prepare('SELECT COUNT(*) c FROM user_lessons WHERE user_id = ?').get(userId).c,
    words: db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ?').get(userId).c,
    minutes: db.prepare('SELECT COALESCE(SUM(minutes),0) c FROM activity WHERE user_id = ?').get(userId).c,
    activeDays: db.prepare('SELECT COUNT(*) c FROM activity WHERE user_id = ? AND xp > 0').get(userId).c
  }
  const skillRows = skillStats(userId)
  const totalCorrect = skillRows.reduce((n, s) => n + s.correct, 0)
  const totalAnswers = skillRows.reduce((n, s) => n + s.total, 0)

  res.json({
    totals,
    streak: req.user.streak,
    levelInfo: levelInfo(req.user.xp),
    weekly: weeklyActivity(userId),
    heatmap: dates.map(date => ({
      date,
      xp: map[date]?.xp || 0,
      minutes: map[date]?.minutes || 0,
      lessons: map[date]?.lessons || 0
    })),
    skills: skillRows,
    overallAccuracy: totalAnswers ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    courses: courses.filter(c => c.completed > 0 || c.language === req.user.target_lang),
    recent
  })
})

router.get('/review', requireAuth, (req, res) => {
  const userId = req.user.id
  const today = dateKey()
  const mode = req.query.mode === 'all' ? 'all' : 'due'
  const stats = {
    due: db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ? AND due <= ?').get(userId, today).c,
    total: db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ?').get(userId).c,
    mastered: db.prepare('SELECT COUNT(*) c FROM vocab_reviews WHERE user_id = ? AND box >= 4').get(userId).c,
    today: db.prepare('SELECT COALESCE(reviews,0) c FROM activity WHERE user_id = ? AND date = ?').get(userId, today)?.c || 0
  }
  let sql = `SELECT r.box, r.due, r.correct, r.wrong, r.reviews, v.*, c.language, c.accent, l.title AS lesson_title
    FROM vocab_reviews r
    JOIN vocab v ON v.id = r.vocab_id
    JOIN lessons l ON l.id = v.lesson_id
    JOIN courses c ON c.id = l.course_id
    WHERE r.user_id = ?`
  const params = [userId]
  if (mode === 'due') {
    sql += ' AND r.due <= ?'
    params.push(today)
  }
  sql += mode === 'all' ? ' ORDER BY RANDOM() LIMIT 30' : ' ORDER BY r.due, r.box LIMIT 30'

  const rows = db.prepare(sql).all(...params)
  res.json({
    mode,
    stats,
    items: rows.map(r => ({
      vocabId: r.id,
      word: r.word,
      reading: r.reading,
      meaning: r.meaning,
      pos: r.pos,
      example: r.example,
      exampleMeaning: r.example_meaning,
      language: r.language,
      accent: r.accent,
      lessonTitle: r.lesson_title,
      box: r.box,
      due: r.due
    }))
  })
})

router.post('/review', requireAuth, (req, res) => {
  const { vocabId, quality } = req.body || {}
  const q = Number(quality)
  if (![0, 1, 2].includes(q)) return res.status(400).json({ error: '复习质量参数无效' })
  const review = db
    .prepare('SELECT * FROM vocab_reviews WHERE user_id = ? AND vocab_id = ?')
    .get(req.user.id, vocabId)
  if (!review) return res.status(404).json({ error: '该单词不在你的复习队列中' })

  const today = dateKey()
  let box = review.box || 1
  if (q === 2) box = Math.min(6, box + 1)
  else if (q === 0) box = 1
  const intervals = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 15, 6: 30 }
  const due = shiftDateKey(today, intervals[box] || 1)
  const xpEarned = q === 2 ? 8 : q === 1 ? 5 : 2

  db.prepare(
    `UPDATE vocab_reviews SET box = ?, due = ?, correct = correct + ?, wrong = wrong + ?, reviews = reviews + 1, last_seen = ?
     WHERE user_id = ? AND vocab_id = ?`
  ).run(box, due, q === 2 ? 1 : 0, q === 0 ? 1 : 0, today, req.user.id, vocabId)
  db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(xpEarned, req.user.id)
  db.prepare(
    `INSERT INTO activity (user_id,date,xp,minutes,lessons,reviews) VALUES (?,?,?,0,0,1)
     ON CONFLICT(user_id,date) DO UPDATE SET xp = activity.xp + excluded.xp, reviews = activity.reviews + 1`
  ).run(req.user.id, today, xpEarned)
  const streak = bumpStreak(db, req.user.id)
  const newAchievements = evaluateAchievements(db, req.user.id)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)

  res.json({
    xpEarned,
    box,
    due,
    streak,
    totalXp: user.xp,
    levelInfo: levelInfo(user.xp),
    newAchievements
  })
})

router.get('/achievements', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM achievements ORDER BY sort').all()
  const unlocked = new Map(
    db
      .prepare('SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = ?')
      .all(req.user.id)
      .map(r => [r.achievement_id, r.unlocked_at])
  )
  const metrics = getMetrics(db, req.user.id)
  const achievements = rows.map(a => {
    const current = metrics[a.metric] || 0
    return {
      ...a,
      unlocked: unlocked.has(a.id),
      unlockedAt: unlocked.get(a.id) || null,
      current: Math.min(current, a.threshold),
      progress: Math.min(100, Math.round((current / a.threshold) * 100))
    }
  })
  res.json({
    achievements,
    metrics,
    summary: {
      unlocked: achievements.filter(a => a.unlocked).length,
      total: achievements.length,
      xp: req.user.xp,
      streak: req.user.streak,
      levelInfo: levelInfo(req.user.xp)
    }
  })
})

router.get('/leaderboard', requireAuth, (req, res) => {
  const range = req.query.range === 'all' ? 'all' : 'week'
  const board = leaderboard(range)
  const top = board.slice(0, 20)
  const me = board.find(r => r.id === req.user.id)
  const myRank = me
    ? me
    : (() => {
        const all = leaderboard(range)
        const found = all.find(r => r.id === req.user.id)
        return found || { rank: all.length + 1, score: 0, name: req.user.name, avatar: req.user.avatar }
      })()
  res.json({
    range,
    top: top.map((r, i) => ({
      id: r.id,
      name: r.name,
      avatar: r.avatar,
      xp: r.xp,
      streak: r.streak,
      targetLang: r.target_lang,
      level: r.level,
      isBot: !!r.is_bot,
      score: r.score,
      rank: i + 1,
      isMe: r.id === req.user.id
    })),
    me: { ...myRank, isMe: true }
  })
})

export default router
