import { hashPassword, dateKey, shiftDateKey } from '../util.js'
import { seedAchievements, evaluateAchievements } from '../achievements.js'
import { englishCourses } from './en.js'
import { japaneseCourses } from './ja.js'
import { koreanCourses } from './ko.js'

const AVATARS = ['violet', 'cyan', 'rose', 'amber', 'emerald', 'sky', 'fuchsia', 'lime']

const hoursAgo = h => new Date(Date.now() - h * 3600 * 1000).toISOString()
const daysAgo = d => new Date(Date.now() - d * 86400 * 1000).toISOString()

function normalizeCourse(course) {
  const units = (course.units || []).map((unit, ui) => {
    const unitId = `${course.id}-u${ui + 1}`
    const lessons = (unit.lessons || []).map((lesson, li) => {
      const id = `${unitId}-l${li + 1}`
      return {
        ...lesson,
        id,
        unitId,
        dialogue: (lesson.dialogue || []).map(([speaker, text, meaning]) => ({ speaker, text, meaning })),
        vocab: (lesson.vocab || []).map(([word, reading, meaning, pos, example, exampleMeaning], vi) => ({
          id: `${id}-v${vi + 1}`,
          word,
          reading,
          meaning,
          pos,
          example,
          exampleMeaning
        })),
        grammar: (lesson.grammar || []).map((g, gi) => ({
          id: `${id}-g${gi + 1}`,
          title: g.title,
          pattern: g.pattern,
          explanation: g.explanation,
          examples: (g.examples || []).map(([text, meaning]) => ({ text, meaning }))
        })),
        exercises: (lesson.exercises || []).map((e, ei) => ({
          id: `${id}-e${ei + 1}`,
          kind: e.kind,
          question: e.question,
          prompt: e.prompt || '',
          audioText: e.audioText || '',
          options: e.options,
          answer: e.answer,
          explanation: e.explanation || ''
        })),
        speaking: (lesson.speaking || []).map((s, si) => ({
          id: `${id}-s${si + 1}`,
          text: s.text,
          reading: s.reading || '',
          meaning: s.meaning,
          tip: s.tip || ''
        }))
      }
    })
    return { id: unitId, title: unit.title, subtitle: unit.subtitle, sort: ui, lessons }
  })
  return { ...course, units }
}

export function seedDatabase(db) {
  const allCourses = [...englishCourses, ...japaneseCourses, ...koreanCourses].map(normalizeCourse)

  const insertCourse = db.prepare(
    'INSERT INTO courses (id,language,level,title,subtitle,description,accent,icon,tag,sort,learners) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  )
  const insertUnit = db.prepare('INSERT INTO units (id,course_id,title,subtitle,sort) VALUES (?,?,?,?,?)')
  const insertLesson = db.prepare(
    'INSERT INTO lessons (id,unit_id,course_id,title,subtitle,skill,focus,xp,minutes,dialogue,grammar,exercises,speaking,sort) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  )
  const insertVocab = db.prepare(
    'INSERT INTO vocab (id,lesson_id,word,reading,meaning,pos,example,example_meaning,sort) VALUES (?,?,?,?,?,?,?,?,?)'
  )

  db.exec('BEGIN')
  try {
    let courseSort = 0
    const languageIndex = { en: 0, ja: 0, ko: 0 }
    for (const course of allCourses) {
      languageIndex[course.language] = (languageIndex[course.language] || 0) + 1
      insertCourse.run(
        course.id,
        course.language,
        course.level,
        course.title,
        course.subtitle,
        course.description,
        course.accent,
        course.icon,
        course.tag || '',
        courseSort++,
        course.learners || 0
      )
      for (const unit of course.units) {
        insertUnit.run(unit.id, course.id, unit.title, unit.subtitle || '', unit.sort)
        unit.lessons.forEach((lesson, li) => {
          insertLesson.run(
            lesson.id,
            lesson.unitId,
            course.id,
            lesson.title,
            lesson.subtitle || '',
            lesson.skill,
            lesson.focus || '',
            lesson.xp || 40,
            lesson.minutes || 10,
            JSON.stringify(lesson.dialogue),
            JSON.stringify(lesson.grammar),
            JSON.stringify(lesson.exercises),
            JSON.stringify(lesson.speaking),
            li
          )
          lesson.vocab.forEach((v, vi) => {
            insertVocab.run(v.id, lesson.id, v.word, v.reading || '', v.meaning, v.pos || '', v.example || '', v.exampleMeaning || '', vi)
          })
        })
      }
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }

  seedAchievements(db)
  seedCommunity(db)
  seedDemoUser(db)
}

function createUser(db, data) {
  const stmt = db.prepare(
    `INSERT INTO users (email,password_hash,name,avatar,native_lang,target_lang,level,daily_goal,xp,streak,last_active,onboarded,is_bot,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  )
  const info = stmt.run(
    data.email || null,
    data.password_hash || null,
    data.name,
    data.avatar || 'violet',
    data.native_lang || 'zh',
    data.target_lang || 'en',
    data.level || 'A1',
    data.daily_goal || 20,
    data.xp || 0,
    data.streak || 0,
    data.last_active || null,
    data.onboarded ?? 0,
    data.is_bot ?? 0,
    data.created_at || daysAgo(30)
  )
  return Number(info.lastInsertRowid)
}

function seedCommunity(db) {
  const bots = [
    { name: '周子墨', avatar: 'cyan', target_lang: 'en', level: 'B1', xp: 5820, streak: 21 },
    { name: 'Yuki', avatar: 'rose', target_lang: 'ja', level: 'A2', xp: 4310, streak: 14 },
    { name: 'Minji', avatar: 'violet', target_lang: 'ko', level: 'B1', xp: 4960, streak: 18 },
    { name: 'Alex', avatar: 'emerald', target_lang: 'ja', level: 'A1', xp: 2380, streak: 7 },
    { name: '苏晚', avatar: 'amber', target_lang: 'ko', level: 'A2', xp: 3570, streak: 11 },
    { name: '金在勋', avatar: 'sky', target_lang: 'en', level: 'A2', xp: 2890, streak: 9 },
    { name: '佐藤遥', avatar: 'fuchsia', target_lang: 'en', level: 'B1', xp: 6240, streak: 26 },
    { name: '林一', avatar: 'lime', target_lang: 'ja', level: 'A2', xp: 3120, streak: 5 }
  ]
  const botIds = []
  for (const b of bots) {
    const id = createUser(db, { ...b, is_bot: 1, onboarded: 1, created_at: daysAgo(120) })
    botIds.push(id)
    const act = db.prepare('INSERT OR REPLACE INTO activity (user_id,date,xp,minutes,lessons,reviews) VALUES (?,?,?,?,?,?)')
    for (let i = 6; i >= 0; i--) {
      const date = shiftDateKey(dateKey(), -i)
      const xp = Math.round(30 + Math.random() * 130)
      act.run(id, date, xp, 8 + Math.round(Math.random() * 25), Math.round(Math.random() * 2), Math.round(Math.random() * 12))
    }
  }

  const posts = [
    {
      bot: 1,
      content: '今天把《At the Airport》刷到 100 分了。最大的心得：先盲听两遍再对答案，耳朵真的会慢慢打开。有人一起练听力吗？',
      topic: '学习方法',
      language: 'en',
      likes: 46,
      hours: 3
    },
    {
      bot: 0,
      content: '想问一下大家，日语 は 和 が 的区别到底怎么记？我看语法讲解明白了，一开口又乱了。',
      topic: '提问',
      language: 'ja',
      likes: 18,
      hours: 6
    },
    {
      bot: 3,
      content: '连续第 7 天打卡。从一句话都说不完整，到现在敢在跟读里拿 80 分，进步是悄悄发生的。',
      topic: '打卡',
      language: 'ja',
      likes: 52,
      hours: 9
    },
    {
      bot: 2,
      content: '分享一个韩语发音小技巧：读 받침 的时候先别急着收尾，把气流停住，听起来会自然很多。',
      topic: '资源分享',
      language: 'ko',
      likes: 37,
      hours: 14
    },
    {
      bot: 6,
      content: "Debate practice today: \"Remote work does more harm than good.\" I argued for it and got totally destroyed. Any good phrases for conceding politely?",
      topic: '口语练习',
      language: 'en',
      likes: 29,
      hours: 20
    },
    {
      bot: 4,
      content: '单词复习的间隔重复真的有用。昨天差点忘记的词，今天在复习队列里又遇到，一下子就记住了。',
      topic: '学习方法',
      language: 'ko',
      likes: 33,
      hours: 26
    }
  ]
  const insertPost = db.prepare(
    'INSERT INTO posts (user_id,content,topic,language,likes,created_at) VALUES (?,?,?,?,?,?)'
  )
  const insertComment = db.prepare('INSERT INTO comments (post_id,user_id,content,created_at) VALUES (?,?,?,?)')
  const comments = [
    '我也是先盲听再对答案，正确率提升很明显。',
    'は 提示主题，が 强调主语，多读例句就有感觉了。',
    '太励志了，一起坚持！',
    '받침 这条太实用了，感谢分享。',
    '“I see your point, but...” 让步很好用。',
    '间隔重复 + 跟读，效率真的翻倍。'
  ]
  posts.forEach((p, i) => {
    const info = insertPost.run(botIds[p.bot], p.content, p.topic, p.language, p.likes, hoursAgo(p.hours))
    const postId = Number(info.lastInsertRowid)
    const c1 = botIds[(p.bot + 2) % botIds.length]
    insertComment.run(postId, c1, comments[i % comments.length], hoursAgo(p.hours - 1))
    if (i % 2 === 0) {
      const c2 = botIds[(p.bot + 4) % botIds.length]
      insertComment.run(postId, c2, comments[(i + 2) % comments.length], hoursAgo(Math.max(0.2, p.hours - 2)))
    }
  })
}

function seedDemoUser(db) {
  const demoId = createUser(db, {
    email: 'demo@linguaflow.app',
    password_hash: hashPassword('demo1234'),
    name: '林知夏',
    avatar: 'cyan',
    target_lang: 'en',
    level: 'A2',
    daily_goal: 20,
    xp: 1240,
    streak: 6,
    last_active: dateKey(),
    onboarded: 1,
    created_at: daysAgo(42)
  })

  const lessons = db
    .prepare("SELECT id, course_id, skill, xp FROM lessons WHERE id IN ('en-a1-u1-l1','en-a1-u1-l2','en-a1-u2-l1','en-a1-u2-l2','en-a2-u1-l1','en-a2-u1-l2') ORDER BY id")
    .all()
  const scores = { 'en-a1-u1-l1': 100, 'en-a1-u1-l2': 92, 'en-a1-u2-l1': 88, 'en-a1-u2-l2': 95, 'en-a2-u1-l1': 84, 'en-a2-u1-l2': 90 }
  const insertLesson = db.prepare('INSERT INTO user_lessons (user_id,lesson_id,score,completed_at) VALUES (?,?,?,?)')
  const insertSkill = db.prepare(
    `INSERT INTO user_skills (user_id,skill,xp,correct,total,sessions) VALUES (?,?,?,?,?,?)
     ON CONFLICT(user_id,skill) DO UPDATE SET xp = xp + excluded.xp, correct = correct + excluded.correct, total = total + excluded.total, sessions = sessions + excluded.sessions`
  )
  const insertReview = db.prepare(
    'INSERT OR REPLACE INTO vocab_reviews (user_id,vocab_id,box,due,correct,wrong,reviews,last_seen) VALUES (?,?,?,?,?,?,?,?)'
  )
  const today = dateKey()

  lessons.forEach((lesson, idx) => {
    insertLesson.run(demoId, lesson.id, scores[lesson.id] || 90, daysAgo(6 - idx))
    const skill = lesson.skill === 'mixed' ? 'vocab' : lesson.skill
    insertSkill.run(demoId, skill, skill === 'vocab' ? 40 : 25, 7, 8, 1)
    if (lesson.skill === 'mixed') insertSkill.run(demoId, 'grammar', 20, 7, 8, 1)
    const vocab = db.prepare('SELECT id FROM vocab WHERE lesson_id = ?').all(lesson.id)
    vocab.forEach((v, vi) => {
      const due = vi % 3 === 0 ? today : shiftDateKey(today, 1 + (vi % 4))
      insertReview.run(demoId, v.id, 2 + (vi % 3), due, 1 + (vi % 2), vi % 4 === 0 ? 1 : 0, 1 + (vi % 3), daysAgo(1 + (vi % 4)))
    })
  })

  const activity = db.prepare('INSERT OR REPLACE INTO activity (user_id,date,xp,minutes,lessons,reviews) VALUES (?,?,?,?,?,?)')
  const weekly = [65, 90, 45, 120, 80, 110, 95]
  weekly.forEach((xp, i) => {
    activity.run(demoId, shiftDateKey(today, -(6 - i)), xp, 12 + i * 2, i % 3 === 0 ? 1 : 0, 4 + i)
  })

  db.prepare('INSERT INTO posts (user_id,content,topic,language,likes,created_at) VALUES (?,?,?,?,?,?)').run(
    demoId,
    '给自己定了个小目标：每天 20 分钟，先坚持 30 天。今天完成了机场场景的听力，居然全对。',
    '打卡',
    'en',
    12,
    hoursAgo(30)
  )

  evaluateAchievements(db, demoId)
}
