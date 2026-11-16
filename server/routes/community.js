import { Router } from 'express'
import { db } from '../db.js'
import { requireAuth } from '../auth.js'
import { evaluateAchievements } from '../achievements.js'

const router = Router()
const TOPICS = ['学习方法', '口语练习', '打卡', '提问', '资源分享']

function shapePost(row, likedSet) {
  return {
    id: row.id,
    content: row.content,
    topic: row.topic,
    language: row.language,
    likes: row.likes,
    commentCount: row.comment_count || 0,
    liked: likedSet ? likedSet.has(row.id) : false,
    createdAt: row.created_at,
    author: {
      id: row.user_id,
      name: row.name,
      avatar: row.avatar,
      isBot: !!row.is_bot,
      targetLang: row.target_lang
    }
  }
}

router.get('/', requireAuth, (req, res) => {
  const language = req.query.language
  const sort = req.query.sort === 'hot' ? 'hot' : 'latest'
  let sql = `SELECT p.*, u.name, u.avatar, u.is_bot, u.target_lang,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count
    FROM posts p JOIN users u ON u.id = p.user_id WHERE 1 = 1`
  const params = []
  if (language && ['en', 'ja', 'ko'].includes(language)) {
    sql += ' AND p.language = ?'
    params.push(language)
  }
  sql += sort === 'hot' ? ' ORDER BY (p.likes * 1.0 + comment_count * 2) DESC, p.created_at DESC' : ' ORDER BY p.created_at DESC'
  sql += ' LIMIT 40'

  const rows = db.prepare(sql).all(...params)
  const liked = new Set(db.prepare('SELECT post_id FROM post_likes WHERE user_id = ?').all(req.user.id).map(r => r.post_id))
  const stats = {
    posts: db.prepare('SELECT COUNT(*) c FROM posts').get().c,
    learners: db.prepare('SELECT COUNT(*) c FROM users WHERE is_bot = 0').get().c + 8640,
    todayPosts: db
      .prepare('SELECT COUNT(*) c FROM posts WHERE created_at >= ?')
      .get(new Date(Date.now() - 86400000).toISOString()).c
  }
  const active = db
    .prepare(
      `SELECT u.id, u.name, u.avatar, u.target_lang, u.streak, COALESCE(SUM(a.xp),0) AS week_xp
       FROM users u LEFT JOIN activity a ON a.user_id = u.id AND a.date >= ?
       GROUP BY u.id ORDER BY week_xp DESC LIMIT 5`
    )
    .all(require('../util.js').lastNDates(7)[0])

  res.json({
    posts: rows.map(r => shapePost(r, liked)),
    stats,
    active: active.map(u => ({ ...u, isMe: u.id === req.user.id })),
    topics: TOPICS
  })
})

router.post('/', requireAuth, (req, res) => {
  const { content, topic, language } = req.body || {}
  const text = String(content || '').trim()
  if (!text || text.length > 500) return res.status(400).json({ error: '内容需要 1-500 个字符' })
  const lang = ['en', 'ja', 'ko'].includes(language) ? language : null
  const tag = TOPICS.includes(topic) ? topic : '学习方法'
  const info = db
    .prepare('INSERT INTO posts (user_id,content,topic,language,likes,created_at) VALUES (?,?,?,?,0,?)')
    .run(req.user.id, text, tag, lang, new Date().toISOString())
  const newAchievements = evaluateAchievements(db, req.user.id)
  const row = db
    .prepare(
      `SELECT p.*, u.name, u.avatar, u.is_bot, u.target_lang,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count
       FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?`
    )
    .get(Number(info.lastInsertRowid))
  res.status(201).json({ post: shapePost(row, new Set()), newAchievements })
})

router.post('/:id/like', requireAuth, (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: '动态不存在' })
  const liked = db.prepare('SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ?').get(post.id, req.user.id)
  if (liked) {
    db.prepare('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?').run(post.id, req.user.id)
    db.prepare('UPDATE posts SET likes = MAX(0, likes - 1) WHERE id = ?').run(post.id)
  } else {
    db.prepare('INSERT INTO post_likes (post_id,user_id) VALUES (?,?)').run(post.id, req.user.id)
    db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(post.id)
  }
  const updated = db.prepare('SELECT likes FROM posts WHERE id = ?').get(post.id)
  res.json({ liked: !liked, likes: updated.likes })
})

router.get('/:id/comments', requireAuth, (req, res) => {
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: '动态不存在' })
  const rows = db
    .prepare(
      `SELECT c.*, u.name, u.avatar, u.is_bot FROM comments c
       JOIN users u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.created_at ASC`
    )
    .all(post.id)
  res.json({
    comments: rows.map(r => ({
      id: r.id,
      content: r.content,
      createdAt: r.created_at,
      author: { id: r.user_id, name: r.name, avatar: r.avatar, isBot: !!r.is_bot }
    }))
  })
})

router.post('/:id/comments', requireAuth, (req, res) => {
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: '动态不存在' })
  const text = String(req.body?.content || '').trim()
  if (!text || text.length > 300) return res.status(400).json({ error: '评论需要 1-300 个字符' })
  const info = db
    .prepare('INSERT INTO comments (post_id,user_id,content,created_at) VALUES (?,?,?,?)')
    .run(post.id, req.user.id, text, new Date().toISOString())
  const row = db
    .prepare('SELECT c.*, u.name, u.avatar, u.is_bot FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = ?')
    .get(Number(info.lastInsertRowid))
  res.status(201).json({
    comment: {
      id: row.id,
      content: row.content,
      createdAt: row.created_at,
      author: { id: row.user_id, name: row.name, avatar: row.avatar, isBot: !!row.is_bot }
    }
  })
})

export default router
