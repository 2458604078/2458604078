export const englishCourses = [
  {
    id: 'en-a1',
    language: 'en',
    level: 'A1',
    title: '英语零基础起航',
    subtitle: 'English Foundations',
    description: '从问候、点单到日常作息，用真实场景搭建你的第一套英语表达。',
    accent: '#5b8cff',
    icon: 'A',
    tag: '零基础友好',
    learners: 94200,
    units: [
      {
        title: 'Unit 1 · Everyday Basics',
        subtitle: '日常基础',
        lessons: [
          {
            title: 'Hello & Introductions',
            subtitle: '问候与自我介绍',
            skill: 'mixed',
            focus: 'be 动词 · 自我介绍',
            xp: 40,
            minutes: 10,
            dialogue: [
              ['Mia', "Hi, I'm Mia. Nice to meet you.", '你好，我是米娅。很高兴认识你。'],
              ['Leo', "Nice to meet you too. I'm Leo.", '我也很高兴认识你。我是莱奥。'],
              ['Mia', 'Where are you from?', '你来自哪里？'],
              ['Leo', "I'm from Canada. And you?", '我来自加拿大。你呢？']
            ],
            vocab: [
              ['hello', '/həˈloʊ/', '你好', 'int.', 'Hello, everyone!', '大家好！'],
              ['name', '/neɪm/', '名字', 'n.', 'My name is Ken.', '我的名字是肯。'],
              ['nice', '/naɪs/', '令人愉快的', 'adj.', 'Nice to meet you.', '很高兴认识你。'],
              ['meet', '/miːt/', '遇见', 'v.', "Let's meet at six.", '我们六点见。'],
              ['from', '/frəm/', '来自', 'prep.', "I'm from China.", '我来自中国。'],
              ['friend', '/frend/', '朋友', 'n.', 'She is my friend.', '她是我的朋友。']
            ],
            grammar: [
              {
                title: 'be 动词的三种形式',
                pattern: 'I am / you are / he, she, it is',
                explanation: 'be 动词随主语变化：I 用 am，you 和复数用 are，第三人称单数用 is。自我介绍时最常用的句型是 I am + 名字 / 身份。',
                examples: [
                  ["I'm a student.", '我是一名学生。'],
                  ['You are my friend.', '你是我的朋友。'],
                  ['She is from Japan.', '她来自日本。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '选择正确的形式：I ___ a student.', options: ['am', 'is', 'are'], answer: 0, explanation: '主语是 I 时，be 动词用 am。' },
              { kind: 'grammar', question: '选择正确的形式：She ___ from Japan.', options: ['am', 'is', 'are'], answer: 1, explanation: '主语 she 是第三人称单数，be 动词用 is。' },
              { kind: 'listening', audioText: 'Hi, my name is Leo. Nice to meet you.', prompt: '听录音，选择你听到的句子', options: ['Hi, my name is Mia.', 'Hi, my name is Leo.', 'Hi, I am from Canada.'], answer: 1, explanation: '录音中说的是 “my name is Leo”。' },
              { kind: 'vocab', question: '“很高兴认识你”用英语怎么说？', options: ['See you later.', 'Nice to meet you.', 'How old are you?'], answer: 1, explanation: '初次见面时用 Nice to meet you 表示“很高兴认识你”。' }
            ],
            speaking: [
              { text: "Hi, I'm Mia. Nice to meet you.", meaning: '你好，我是米娅。很高兴认识你。', tip: '注意 Nice to meet you 中 meet 和 you 的连读。' },
              { text: "Where are you from? I'm from China.", meaning: '你来自哪里？我来自中国。', tip: 'Where are you from 句尾用降调，听起来更自然。' }
            ]
          },
          {
            title: 'At the Coffee Shop',
            subtitle: '在咖啡店点单',
            skill: 'vocab',
            focus: '点单表达 · 冠词 a / an',
            xp: 45,
            minutes: 11,
            dialogue: [
              ['Barista', 'Hi, what can I get for you?', '你好，请问需要什么？'],
              ['Leo', "I'd like a latte, please.", '我要一杯拿铁，谢谢。'],
              ['Barista', 'For here or to go?', '堂食还是外带？'],
              ['Leo', 'To go, please. How much is it?', '外带，谢谢。多少钱？']
            ],
            vocab: [
              ['coffee', '/ˈkɔːfi/', '咖啡', 'n.', 'I drink coffee every morning.', '我每天早上喝咖啡。'],
              ['latte', '/ˈlɑːteɪ/', '拿铁', 'n.', 'A latte, please.', '请来一杯拿铁。'],
              ['tea', '/tiː/', '茶', 'n.', 'Would you like some tea?', '你想喝点茶吗？'],
              ['water', '/ˈwɔːtər/', '水', 'n.', 'A bottle of water, please.', '请给我一瓶水。'],
              ['please', '/pliːz/', '请', 'adv.', 'Two coffees, please.', '请来两杯咖啡。'],
              ['bill', '/bɪl/', '账单', 'n.', 'Can I have the bill?', '可以结账吗？']
            ],
            grammar: [
              {
                title: '冠词 a / an 与礼貌点单',
                pattern: "a / an + 名词；I'd like ...",
                explanation: 'a 用在辅音音素开头的词前，an 用在元音音素开头的词前。点单时用 I\'d like ... 比 I want ... 更礼貌。',
                examples: [
                  ["I'd like a coffee, please.", '我要一杯咖啡，谢谢。'],
                  ['She wants an apple.', '她想要一个苹果。'],
                  ["I'd like a cup of tea.", '我想要一杯茶。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: "选择正确的一项：I'd like ___ apple, please.", options: ['a', 'an', 'the'], answer: 1, explanation: 'apple 以元音音素开头，用 an。' },
              { kind: 'vocab', question: '在咖啡店结账时，你可以说：', options: ['Can I have the bill, please?', 'Nice to meet you.', 'Where are you from?'], answer: 0, explanation: 'Can I have the bill, please? 意为“可以结账吗？”。' },
              { kind: 'listening', audioText: "I'd like a cup of tea, please.", prompt: '听录音，这位顾客点了什么？', options: ['一杯咖啡', '一杯茶', '一瓶水'], answer: 1, explanation: '录音中提到了 a cup of tea。' },
              { kind: 'vocab', question: '“外带”用英语怎么说？', options: ['For here', 'To go', 'Sit down'], answer: 1, explanation: 'To go 表示外带，For here 表示堂食。' }
            ],
            speaking: [
              { text: "I'd like a latte, please.", meaning: '我要一杯拿铁，谢谢。', tip: "I'd like 读作 /aɪd laɪk/，语气更礼貌。" },
              { text: 'For here or to go? To go, please.', meaning: '堂食还是外带？外带，谢谢。', tip: 'to go 中的 to 要轻读。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · Daily Rhythm',
        subtitle: '日常节奏',
        lessons: [
          {
            title: 'My Day',
            subtitle: '我的一天',
            skill: 'grammar',
            focus: '一般现在时 · 频率副词',
            xp: 45,
            minutes: 12,
            dialogue: [
              ['Anna', 'What time do you wake up?', '你几点起床？'],
              ['Ken', 'I usually wake up at seven.', '我通常七点起床。'],
              ['Anna', 'Do you have breakfast at home?', '你在家吃早饭吗？'],
              ['Ken', 'Yes, I do. Then I go to work at eight thirty.', '是的。然后我八点半去上班。']
            ],
            vocab: [
              ['wake up', '/weɪk ʌp/', '醒来，起床', 'v.', 'I wake up at seven.', '我七点起床。'],
              ['breakfast', '/ˈbrekfəst/', '早餐', 'n.', 'Breakfast is ready.', '早餐做好了。'],
              ['work', '/wɜːrk/', '工作', 'n./v.', 'I work in a school.', '我在一所学校工作。'],
              ['lunch', '/lʌntʃ/', '午餐', 'n.', "Let's have lunch together.", '我们一起吃午饭吧。'],
              ['dinner', '/ˈdɪnər/', '晚餐', 'n.', 'We have dinner at seven.', '我们七点吃晚饭。'],
              ['usually', '/ˈjuːʒuəli/', '通常', 'adv.', 'I usually walk to work.', '我通常走路去上班。']
            ],
            grammar: [
              {
                title: '一般现在时',
                pattern: 'I / you / we / they + 动词原形；he / she / it + 动词加 -s',
                explanation: '描述习惯和规律用一般现在时。主语是第三人称单数时，动词要加 -s 或 -es：go → goes，have → has。',
                examples: [
                  ['I go to work at eight.', '我八点去上班。'],
                  ['She goes to work at eight.', '她八点去上班。'],
                  ['They have lunch at noon.', '他们中午吃午饭。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: 'She ___ to work at eight.', options: ['go', 'goes', 'going'], answer: 1, explanation: '主语 she 是第三人称单数，动词用 goes。' },
              { kind: 'grammar', question: 'We ___ dinner at seven every day.', options: ['has', 'have', 'having'], answer: 1, explanation: '主语 we 是复数，用动词原形 have。' },
              { kind: 'listening', audioText: 'I usually wake up at seven and have breakfast at home.', prompt: '听录音，他通常几点起床？', options: ['六点', '七点', '八点'], answer: 1, explanation: '录音中说的是 wake up at seven。' },
              { kind: 'vocab', question: '“晚餐”用英语怎么说？', options: ['breakfast', 'lunch', 'dinner'], answer: 2, explanation: 'dinner 意为晚餐。' }
            ],
            speaking: [
              { text: 'I usually wake up at seven and have breakfast at home.', meaning: '我通常七点起床，在家吃早饭。', tip: 'usually 放在实义动词前：usually wake up。' },
              { text: 'What time do you go to work?', meaning: '你几点去上班？', tip: '特殊疑问句句尾用降调。' }
            ]
          },
          {
            title: 'Making Plans',
            subtitle: '邀约与计划',
            skill: 'speaking',
            focus: 'want to / be going to',
            xp: 50,
            minutes: 12,
            dialogue: [
              ['Mia', 'Are you free this weekend?', '这个周末你有空吗？'],
              ['Leo', "I'm busy on Saturday, but Sunday works.", '周六我很忙，但周日可以。'],
              ['Mia', 'Great. Do you want to see a movie?', '太好了。你想看电影吗？'],
              ['Leo', "Sure. Let's meet at the cinema at six.", '好啊。我们六点在电影院见吧。']
            ],
            vocab: [
              ['weekend', '/ˈwiːkend/', '周末', 'n.', 'I read on weekends.', '我周末读书。'],
              ['free', '/friː/', '有空的', 'adj.', 'Are you free tonight?', '你今晚有空吗？'],
              ['busy', '/ˈbɪzi/', '忙碌的', 'adj.', "I'm busy this morning.", '我今天上午很忙。'],
              ['movie', '/ˈmuːvi/', '电影', 'n.', 'We watched a great movie.', '我们看了一部很棒的电影。'],
              ['cinema', '/ˈsɪnəmə/', '电影院', 'n.', 'The cinema is near my home.', '电影院离我家很近。'],
              ['plan', '/plæn/', '计划', 'n./v.', 'What are your plans?', '你有什么计划？']
            ],
            grammar: [
              {
                title: '表达计划：want to / be going to',
                pattern: 'want to + 动词原形；be going to + 动词原形',
                explanation: 'want to 表示“想要做”，be going to 表示已经打算好的计划。注意主语变化时 be 动词也要变化。',
                examples: [
                  ['I want to see a movie.', '我想看一部电影。'],
                  ['We are going to meet at six.', '我们打算六点见面。'],
                  ['She wants to visit Japan.', '她想去日本旅行。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '选择正确形式：She ___ to visit Japan next year.', options: ['want', 'wants', 'wanting'], answer: 1, explanation: '第三人称单数 she 后用 wants。' },
              { kind: 'vocab', question: '“这个周末你有空吗？”用英语怎么说？', options: ['Are you free this weekend?', 'What time is it?', 'How much is it?'], answer: 0, explanation: 'Are you free this weekend? 用来询问周末是否有空。' },
              { kind: 'listening', audioText: "I'm busy on Saturday, but Sunday works for me.", prompt: '听录音，对方什么时候有空？', options: ['周六', '周日', '周一'], answer: 1, explanation: '录音中 Sunday works for me 表示周日可以。' }
            ],
            speaking: [
              { text: 'Are you free this weekend? Do you want to see a movie?', meaning: '这个周末你有空吗？你想看电影吗？', tip: '两个一般疑问句连用，句尾都上扬。' },
              { text: "I'm busy on Saturday, but Sunday works.", meaning: '我周六很忙，但周日可以。', tip: 'works 在这里表示“可以、行得通”。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'en-a2',
    language: 'en',
    level: 'A2',
    title: '英语场景突破',
    subtitle: 'Everyday Fluency',
    description: '覆盖机场、酒店、会议与邮件四大真实场景，让英语真正用起来。',
    accent: '#38bdf8',
    icon: 'A',
    tag: '旅行必备',
    learners: 76800,
    units: [
      {
        title: 'Unit 1 · Travel',
        subtitle: '旅行场景',
        lessons: [
          {
            title: 'At the Airport',
            subtitle: '在机场',
            skill: 'listening',
            focus: '现在完成时 · 机场高频词',
            xp: 55,
            minutes: 13,
            dialogue: [
              ['Agent', 'Good morning. May I see your passport, please?', '早上好，请出示您的护照。'],
              ['Leo', "Here you are. I've already checked in online.", '给您。我已经在网上值机了。'],
              ['Agent', "Great. Your gate is B12, but there's a slight delay.", '好的。您的登机口是 B12，但有轻微延误。'],
              ['Leo', 'How long is the delay?', '延误多久？']
            ],
            vocab: [
              ['passport', '/ˈpæspɔːrt/', '护照', 'n.', 'Show me your passport, please.', '请出示您的护照。'],
              ['boarding pass', '/ˈbɔːrdɪŋ pæs/', '登机牌', 'n.', 'Keep your boarding pass with you.', '请随身携带登机牌。'],
              ['gate', '/ɡeɪt/', '登机口', 'n.', 'Boarding starts at gate B12.', '在 B12 登机口开始登机。'],
              ['delay', '/dɪˈleɪ/', '延误', 'n./v.', 'The flight has a long delay.', '航班延误很久。'],
              ['luggage', '/ˈlʌɡɪdʒ/', '行李', 'n.', 'Where can I collect my luggage?', '我在哪里取行李？'],
              ['security', '/sɪˈkjʊrəti/', '安检', 'n.', 'Please go through security.', '请通过安检。']
            ],
            grammar: [
              {
                title: '现在完成时（入门）',
                pattern: 'have / has + 过去分词',
                explanation: '现在完成时连接过去与现在，常与 already、yet、ever 连用，表示动作已完成或曾经经历过。',
                examples: [
                  ['I have checked in online.', '我已经在线值机了。'],
                  ['Have you ever been to London?', '你去过伦敦吗？'],
                  ['She has lost her boarding pass.', '她把登机牌弄丢了。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: 'I ___ already checked in online.', options: ['have', 'has', 'had'], answer: 0, explanation: '主语 I 用 have + 过去分词。' },
              { kind: 'grammar', question: '选择正确形式：She ___ her boarding pass.', options: ['have lost', 'has lost', 'losing'], answer: 1, explanation: '主语 she 用 has lost。' },
              { kind: 'listening', audioText: 'Your flight to London is delayed by forty minutes.', prompt: '听广播，航班延误了多久？', options: ['14 分钟', '40 分钟', '4 小时'], answer: 1, explanation: '录音中 delayed by forty minutes 表示延误 40 分钟。' },
              { kind: 'vocab', question: '“登机口”用英语怎么说？', options: ['gate', 'seat', 'ticket'], answer: 0, explanation: 'gate 是登机口。' }
            ],
            speaking: [
              { text: 'May I see your passport, please? Here you are.', meaning: '请出示您的护照。给您。', tip: 'Here you are 是递东西时的自然表达。' },
              { text: 'My flight has been delayed by forty minutes.', meaning: '我的航班延误了四十分钟。', tip: 'has been delayed 是被动语态的现在完成时。' }
            ]
          },
          {
            title: 'Hotel Check-in',
            subtitle: '酒店入住',
            skill: 'mixed',
            focus: '情态动词 could · 酒店表达',
            xp: 55,
            minutes: 13,
            dialogue: [
              ['Receptionist', 'Good evening. Do you have a reservation?', '晚上好，请问您有预订吗？'],
              ['Leo', 'Yes, under the name Leo Wang.', '有的，名字是王 Leo。'],
              ['Receptionist', 'Could I see your ID, please? Your room is on the eighth floor.', '请出示一下证件。您的房间在八楼。'],
              ['Leo', 'Could you tell me the Wi-Fi password?', '能告诉我 Wi-Fi 密码吗？']
            ],
            vocab: [
              ['reservation', '/ˌrezərˈveɪʃn/', '预订', 'n.', 'I have a reservation for tonight.', '我预订了今晚的房间。'],
              ['check in', '/tʃek ɪn/', '办理入住', 'v.', 'We can check in after two.', '我们两点后可以入住。'],
              ['key card', '/ˈkiː kɑːrd/', '房卡', 'n.', 'Here is your key card.', '这是您的房卡。'],
              ['available', '/əˈveɪləbl/', '可用的', 'adj.', 'Is a single room available?', '还有单人间吗？'],
              ['floor', '/flɔːr/', '楼层', 'n.', 'The gym is on the third floor.', '健身房在三楼。'],
              ['Wi-Fi', '/ˈwaɪ faɪ/', '无线网络', 'n.', 'The Wi-Fi is free.', '无线网络是免费的。']
            ],
            grammar: [
              {
                title: '用 could 礼貌地请求',
                pattern: 'Could I / Could you + 动词原形 ...?',
                explanation: 'Could 比 Can 更委婉，适合在酒店、商店等正式场合提出请求。',
                examples: [
                  ['Could I have a room key?', '可以给我一张房卡吗？'],
                  ['Could you help me with my luggage?', '您能帮我拿一下行李吗？']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '选择更礼貌的请求：___ you tell me the Wi-Fi password?', options: ['Could', 'Must', 'Should'], answer: 0, explanation: 'Could you ...? 是最常用的礼貌请求句式。' },
              { kind: 'vocab', question: '“预订”用英语怎么说？', options: ['reservation', 'reception', 'restaurant'], answer: 0, explanation: 'reservation 意为预订。' },
              { kind: 'listening', audioText: 'Your room is on the eighth floor, and breakfast is served from seven to ten.', prompt: '听录音，早餐供应到几点？', options: ['七点', '九点', '十点'], answer: 2, explanation: 'from seven to ten 表示早餐供应到十点。' }
            ],
            speaking: [
              { text: 'Could I see your ID, please? Your room is on the eighth floor.', meaning: '可以看一下您的证件吗？您的房间在八楼。', tip: 'Could I ... 句尾用升调更礼貌。' },
              { text: 'Could you tell me the Wi-Fi password?', meaning: '能告诉我 Wi-Fi 密码吗？', tip: 'tell me 连读为 /tel mi/。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · Work & Study',
        subtitle: '工作与学习',
        lessons: [
          {
            title: 'Meetings That Matter',
            subtitle: '高效会议',
            skill: 'grammar',
            focus: 'should 提建议 · 会议表达',
            xp: 60,
            minutes: 14,
            dialogue: [
              ['Manager', "Let's start. Could you give us a quick update?", '我们开始吧。你能简单汇报一下进展吗？'],
              ['Lena', 'Sure. The client approved the design, but the deadline is tight.', '好的。客户通过了设计，但截止日期很紧。'],
              ['Manager', 'What do you need from the team?', '你需要团队提供什么支持？'],
              ['Lena', 'I need two more days to confirm the schedule.', '我需要再多两天来确认日程。']
            ],
            vocab: [
              ['agenda', '/əˈdʒendə/', '议程', 'n.', 'Let me share the agenda.', '我来分享一下议程。'],
              ['deadline', '/ˈdedlaɪn/', '截止日期', 'n.', 'The deadline is Friday.', '截止日期是周五。'],
              ['update', '/ˈʌpdeɪt/', '最新进展', 'n.', 'Give me a quick update.', '简单说说最新进展。'],
              ['client', '/ˈklaɪənt/', '客户', 'n.', 'The client approved the plan.', '客户批准了方案。'],
              ['schedule', '/ˈskedʒuːl/', '日程安排', 'n.', 'The schedule is tight.', '日程很紧。'],
              ['confirm', '/kənˈfɜːrm/', '确认', 'v.', 'Please confirm the time.', '请确认时间。']
            ],
            grammar: [
              {
                title: '用 should 提建议',
                pattern: '主语 + should + 动词原形',
                explanation: 'should 表示“应该”，用于给出建议或提出应当做的事；否定形式为 shouldn\'t。',
                examples: [
                  ['We should confirm the schedule today.', '我们今天应该确认日程。'],
                  ["You shouldn't miss the deadline.", '你不应该错过截止日期。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '选择正确形式：We ___ confirm the schedule before Friday.', options: ['should', 'should to', 'shoulding'], answer: 0, explanation: 'should 后直接接动词原形。' },
              { kind: 'vocab', question: '“截止日期”用英语怎么说？', options: ['deadline', 'update', 'client'], answer: 0, explanation: 'deadline 意为截止日期。' },
              { kind: 'listening', audioText: 'The client approved the design, but we need two more days to confirm the schedule.', prompt: '听录音，团队还需要多少时间来确认日程？', options: ['两天', '三天', '一周'], answer: 0, explanation: 'two more days 表示还需要两天。' }
            ],
            speaking: [
              { text: 'The client approved the design, but the deadline is tight.', meaning: '客户通过了设计，但截止日期很紧。', tip: 'tight 在这里表示时间紧张。' },
              { text: 'We should confirm the schedule before Friday.', meaning: '我们应该在周五前确认日程。', tip: 'before 后的名词重读。' }
            ]
          },
          {
            title: 'Email Essentials',
            subtitle: '邮件写作',
            skill: 'vocab',
            focus: '正式邮件 · 礼貌用语',
            xp: 55,
            minutes: 12,
            dialogue: [
              ['Lena', 'Hi team, please find the agenda attached.', '大家好，议程见附件。'],
              ['Lena', 'Could you reply by Thursday and confirm your availability?', '请在周四前回复并确认您是否方便。'],
              ['Tom', "Thanks, Lena. I'll forward it to the design team.", '谢谢，Lena。我会转发给设计团队。'],
              ['Tom', 'I look forward to the meeting.', '期待这次会议。']
            ],
            vocab: [
              ['attach', '/əˈtætʃ/', '附上', 'v.', 'I attached the report.', '我附上了报告。'],
              ['reply', '/rɪˈplaɪ/', '回复', 'v.', 'Please reply by Friday.', '请在周五前回复。'],
              ['forward', '/ˈfɔːrwərd/', '转发', 'v.', 'I will forward your email.', '我会转发你的邮件。'],
              ['subject', '/ˈsʌbdʒɪkt/', '主题', 'n.', 'Write a clear subject line.', '写一个清晰的主题。'],
              ['regards', '/rɪˈɡɑːrdz/', '问候（邮件结尾）', 'n.', 'Best regards, Lena', '此致，Lena'],
              ['availability', '/əˌveɪləˈbɪləti/', '可用时间', 'n.', 'Please confirm your availability.', '请确认您的时间安排。']
            ],
            grammar: [
              {
                title: '正式邮件的礼貌表达',
                pattern: 'Please find ... attached / I look forward to ...',
                explanation: '正式邮件中常用 Please find ... attached 表示“附件请查收”，用 I look forward to your reply 结尾，语气礼貌而专业。',
                examples: [
                  ['Please find the file attached.', '请查收附件。'],
                  ['I look forward to your reply.', '期待您的回复。']
                ]
              }
            ],
            exercises: [
              { kind: 'vocab', question: '邮件的“主题”栏用英语怎么说？', options: ['Subject', 'Object', 'Title'], answer: 0, explanation: '邮件主题的固定说法是 Subject。' },
              { kind: 'vocab', question: '“转发邮件”用英语怎么说？', options: ['reply to', 'forward', 'delete'], answer: 1, explanation: 'forward 表示转发。' },
              { kind: 'listening', audioText: 'Please reply by Thursday and confirm your availability for the meeting.', prompt: '听录音，需要在周几前回复？', options: ['周二', '周四', '周五'], answer: 1, explanation: '录音中说的是 by Thursday。' }
            ],
            speaking: [
              { text: 'Please find the agenda attached. Could you confirm your availability?', meaning: '议程见附件。你能确认一下时间安排吗？', tip: 'attached 的尾音 /t/ 要轻。' },
              { text: 'I look forward to your reply.', meaning: '期待您的回复。', tip: 'look forward to 后面接名词或动名词。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'en-b1',
    language: 'en',
    level: 'B1',
    title: '英语表达进阶',
    subtitle: 'Confident English',
    description: '学会表达观点、讲述经历、读懂新闻，让英语成为你的第二表达系统。',
    accent: '#7c83ff',
    icon: 'A',
    tag: '进阶表达',
    learners: 52300,
    units: [
      {
        title: 'Unit 1 · Opinions & Stories',
        subtitle: '观点与叙事',
        lessons: [
          {
            title: 'Agreeing & Disagreeing',
            subtitle: '赞同与反对',
            skill: 'speaking',
            focus: '让步从句 · 观点表达',
            xp: 70,
            minutes: 15,
            dialogue: [
              ['Host', 'I think remote work makes teams less creative.', '我认为远程办公会让团队创造力下降。'],
              ['Nadia', "I see your point, but I'm not sure I agree.", '我理解你的观点，但我不太同意。'],
              ['Host', 'Why not?', '为什么？'],
              ['Nadia', "While it's true that we meet less, online collaboration can actually reach more people.", '虽然我们见面少了，但线上协作反而能触达更多人。']
            ],
            vocab: [
              ['opinion', '/əˈpɪnjən/', '观点', 'n.', 'In my opinion, it works.', '在我看来，这行得通。'],
              ['agree', '/əˈɡriː/', '同意', 'v.', 'I agree with you.', '我同意你。'],
              ['disagree', '/ˌdɪsəˈɡriː/', '不同意', 'v.', 'I respectfully disagree.', '我礼貌地表示不同意。'],
              ['however', '/haʊˈevər/', '然而', 'adv.', 'However, not everyone agrees.', '然而，并非所有人都同意。'],
              ['convince', '/kənˈvɪns/', '说服', 'v.', 'He convinced me to try.', '他说服我去尝试。'],
              ['perspective', '/pərˈspektɪv/', '视角', 'n.', 'From my perspective, it helps.', '从我的角度看，这有帮助。']
            ],
            grammar: [
              {
                title: '让步与对比：although / while / however',
                pattern: 'Although / While + 从句，主句；However, 句子',
                explanation: 'although 和 while 引导让步从句，表示“虽然”；however 是副词，后面接逗号，连接两个独立句子。',
                examples: [
                  ['Although it is expensive, it works well.', '尽管很贵，但它很好用。'],
                  ['While it is true that we meet less, online collaboration has advantages.', '虽然我们见面少了，但线上协作有它的优势。'],
                  ['However, not everyone agrees.', '然而，并不是每个人都同意。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '___ it is difficult, I still enjoy learning.', options: ['Although', 'Because', 'So'], answer: 0, explanation: '前后是让步关系，用 Although。' },
              { kind: 'grammar', question: '选择正确的一项：I see your point. ___, I disagree.', options: ['However', 'Therefore', 'Moreover'], answer: 0, explanation: '前后转折，用 However。' },
              { kind: 'listening', audioText: 'While it is true that we meet less, online collaboration can reach more people.', prompt: '听录音，说话人是什么态度？', options: ['完全反对线上协作', '部分认同但强调线上协作的优势', '认为应该取消所有会议'], answer: 1, explanation: '说话人先承认见面少，再强调线上协作的优势。' }
            ],
            speaking: [
              { text: "I see your point, but I'm not sure I agree.", meaning: '我理解你的观点，但我不太同意。', tip: '语气要温和，but 前稍作停顿。' },
              { text: "While it's true that we meet less, online collaboration can actually reach more people.", meaning: '虽然我们见面少了，但线上协作反而能触达更多人。', tip: 'While 从句和主句之间要有明显停顿。' }
            ]
          },
          {
            title: 'Telling Stories',
            subtitle: '讲述一段经历',
            skill: 'mixed',
            focus: '过去进行时 · 叙事连接词',
            xp: 70,
            minutes: 15,
            dialogue: [
              ['Mia', 'What happened on your trip?', '你的旅行发生了什么？'],
              ['Leo', 'We were waiting for the train when suddenly the lights went out.', '我们正在等火车，突然灯灭了。'],
              ['Mia', 'What did you do?', '你们做了什么？'],
              ['Leo', 'Eventually we found a taxi and realized we had left the tickets at the hotel.', '最后我们找到一辆出租车，才发现把票落在酒店了。']
            ],
            vocab: [
              ['suddenly', '/ˈsʌdənli/', '突然', 'adv.', 'Suddenly, it started to rain.', '突然下起雨来。'],
              ['eventually', '/ɪˈventʃuəli/', '最终', 'adv.', 'Eventually, we found the way.', '最终我们找到了路。'],
              ['realize', '/ˈriːəlaɪz/', '意识到', 'v.', 'I realized I was wrong.', '我意识到我错了。'],
              ['mention', '/ˈmenʃn/', '提到', 'v.', 'She mentioned your name.', '她提到了你的名字。'],
              ['experience', '/ɪkˈspɪriəns/', '经历', 'n.', 'It was a strange experience.', '那是一次奇怪的经历。'],
              ['unforgettable', '/ˌʌnfərˈɡetəbl/', '难忘的', 'adj.', 'It was an unforgettable trip.', '那是一次难忘的旅行。']
            ],
            grammar: [
              {
                title: '过去进行时 vs 一般过去时',
                pattern: 'was / were + doing；did',
                explanation: '过去进行时描述过去某一时刻正在发生的动作，常与 when 引导的突然事件（一般过去时）搭配。',
                examples: [
                  ['We were waiting when the lights went out.', '我们正在等的时候，灯灭了。'],
                  ['She was cooking when I called.', '我打电话时她正在做饭。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: 'We ___ for the train when the lights went out.', options: ['waited', 'were waiting', 'have waited'], answer: 1, explanation: '强调过去某一刻正在进行的动作，用过去进行时。' },
              { kind: 'grammar', question: '选择正确形式：I ___ I had left my keys at home.', options: ['realized', 'was realizing', 'realize'], answer: 0, explanation: '意识到是一个瞬间动作，用一般过去时。' },
              { kind: 'listening', audioText: 'Eventually we found a taxi and realized we had left the tickets at the hotel.', prompt: '听录音，他们把什么落在了酒店？', options: ['护照', '车票', '行李'], answer: 1, explanation: '录音中提到了 tickets。' }
            ],
            speaking: [
              { text: 'We were waiting for the train when suddenly the lights went out.', meaning: '我们正在等火车，突然灯灭了。', tip: '用 when 连接背景动作和突发事件。' },
              { text: 'Eventually we found a taxi and realized we had left the tickets at the hotel.', meaning: '最后我们找到一辆出租车，才发现把票落在酒店了。', tip: '注意 had left 表示“更早之前”的过去完成。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · Culture & Media',
        subtitle: '文化与媒体',
        lessons: [
          {
            title: 'News & Headlines',
            subtitle: '新闻与标题',
            skill: 'listening',
            focus: '被动语态 · 新闻词汇',
            xp: 75,
            minutes: 16,
            dialogue: [
              ['Editor', "What's the headline for tomorrow?", '明天的头条是什么？'],
              ['Reporter', '"City announces new cycling plan." We have two sources.', '是“城市公布新骑行计划”。我们有两个消息源。'],
              ['Editor', 'Is there any evidence of public support?', '有公众支持的证据吗？'],
              ['Reporter', 'Yes, a survey claims that 68% of residents are in favor.', '有，一项调查称 68% 的居民支持。']
            ],
            vocab: [
              ['headline', '/ˈhedlaɪn/', '新闻标题', 'n.', 'The headline caught my eye.', '那个标题吸引了我的注意。'],
              ['source', '/sɔːrs/', '消息来源', 'n.', 'We need a reliable source.', '我们需要可靠的消息源。'],
              ['bias', '/ˈbaɪəs/', '偏见', 'n.', 'Always check for bias.', '要时刻警惕偏见。'],
              ['evidence', '/ˈevɪdəns/', '证据', 'n.', 'There is no evidence yet.', '目前还没有证据。'],
              ['claim', '/kleɪm/', '声称', 'v.', 'The report claims it is safe.', '报告声称它是安全的。'],
              ['coverage', '/ˈkʌvərɪdʒ/', '报道', 'n.', 'The event got wide coverage.', '该事件得到了广泛报道。']
            ],
            grammar: [
              {
                title: '被动语态',
                pattern: 'be + 过去分词',
                explanation: '被动语态强调动作的承受者，新闻中非常常见。时态变化体现在 be 动词上。',
                examples: [
                  ['The plan was announced yesterday.', '该计划于昨天公布。'],
                  ['More bikes are being used in the city.', '城市里正在使用更多自行车。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: 'The plan ___ announced yesterday.', options: ['was', 'were', 'is'], answer: 0, explanation: 'plan 是单数，过去被动用 was announced。' },
              { kind: 'grammar', question: '选择正确形式：More bikes ___ used in the city now.', options: ['are being', 'is being', 'been'], answer: 0, explanation: 'bikes 是复数，现在进行时的被动用 are being used。' },
              { kind: 'listening', audioText: 'A new survey claims that sixty-eight percent of residents support the cycling plan.', prompt: '听录音，有多少居民支持该计划？', options: ['38%', '58%', '68%'], answer: 2, explanation: '录音中是 sixty-eight percent。' },
              { kind: 'vocab', question: '“证据”用英语怎么说？', options: ['evidence', 'opinion', 'headline'], answer: 0, explanation: 'evidence 意为证据。' }
            ],
            speaking: [
              { text: 'The plan was announced yesterday, and a survey claims that most residents support it.', meaning: '该计划于昨日公布，一项调查称多数居民支持它。', tip: '被动语态 was announced 要读得连贯。' },
              { text: 'What is the headline for tomorrow?', meaning: '明天的头条是什么？', tip: 'headline 重音在第一个音节。' }
            ]
          },
          {
            title: 'Podcast Listening',
            subtitle: '听懂一档播客',
            skill: 'listening',
            focus: '定语从句 · 听力策略',
            xp: 75,
            minutes: 16,
            dialogue: [
              ['Host', 'Welcome back to The Curious Mind.', '欢迎回到《好奇心》播客。'],
              ['Guest', 'Thanks for having me.', '谢谢邀请。'],
              ['Host', 'What first got you interested in language learning?', '是什么让你开始对语言学习感兴趣？'],
              ['Guest', "Honestly, it was a song I couldn't understand but couldn't stop listening to.", '说实话，是一首我听不懂却停不下来的歌。']
            ],
            vocab: [
              ['episode', '/ˈepɪsoʊd/', '一集节目', 'n.', 'This episode is worth listening to.', '这一集值得一听。'],
              ['host', '/hoʊst/', '主持人', 'n.', 'The host asked a great question.', '主持人问了一个好问题。'],
              ['guest', '/ɡest/', '嘉宾', 'n.', 'Our guest is a writer.', '我们的嘉宾是一位作家。'],
              ['insight', '/ˈɪnsaɪt/', '洞见', 'n.', 'She shared a useful insight.', '她分享了一个有用的见解。'],
              ['subscribe', '/səbˈskraɪb/', '订阅', 'v.', 'Subscribe to our channel.', '订阅我们的频道。'],
              ['curiosity', '/ˌkjʊriˈɑːsəti/', '好奇心', 'n.', 'Curiosity drives learning.', '好奇心驱动学习。']
            ],
            grammar: [
              {
                title: '定语从句（who / which / that）',
                pattern: '名词 + who / which / that + 从句',
                explanation: '定语从句用来修饰名词。先行词是人时常用 who，是物时常用 which 或 that。',
                examples: [
                  ["It was a song that I couldn't understand.", '那是一首我听不懂的歌。'],
                  ['She is the host who started the podcast.', '她就是创办这档播客的主持人。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: "It was a song ___ I couldn't understand.", options: ['who', 'that', 'where'], answer: 1, explanation: '先行词 song 是物，用 that（或 which）。' },
              { kind: 'grammar', question: '选择正确形式：She is the host ___ started the podcast.', options: ['which', 'who', 'whose'], answer: 1, explanation: '先行词 host 是人，用 who。' },
              { kind: 'listening', audioText: 'Honestly, it was a song I could not understand but could not stop listening to.', prompt: '听录音，是什么激发了嘉宾对语言的兴趣？', options: ['一部电影', '一首歌', '一本书'], answer: 1, explanation: '录音中说的是 a song。' },
              { kind: 'vocab', question: '“订阅播客”用英语怎么说？', options: ['subscribe to a podcast', 'delete a podcast', 'record a podcast'], answer: 0, explanation: 'subscribe to 表示订阅。' }
            ],
            speaking: [
              { text: 'What first got you interested in language learning?', meaning: '是什么让你开始对语言学习感兴趣？', tip: 'got you interested 连读时注意失去爆破。' },
              { text: "It was a song that I couldn't understand but couldn't stop listening to.", meaning: '那是一首我听不懂却停不下来的歌。', tip: 'couldn\'t 中的 t 常被吞掉。' }
            ]
          }
        ]
      }
    ]
  }
]
