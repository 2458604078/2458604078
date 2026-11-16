import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { db } from './db.js'
import authRoutes from './routes/auth.js'
import learningRoutes from './routes/learning.js'
import communityRoutes from './routes/community.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, courses: db.prepare('SELECT COUNT(*) c FROM courses').get().c })
})
app.use('/api/auth', authRoutes)
app.use('/api/community', communityRoutes)
app.use('/api', learningRoutes)
app.use('/api', (req, res) => res.status(404).json({ error: '接口不存在' }))

const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  app.use(express.static(distDir))
  app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) return next(err)
  res.status(500).json({ error: '服务器开小差了，请稍后重试' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[linguaflow] API server running at http://localhost:${PORT}`)
})
