export const koreanCourses = [
  {
    id: 'ko-a1',
    language: 'ko',
    level: 'A1',
    title: '韩语零基础起航',
    subtitle: '한국어 첫걸음',
    description: '从第一句안녕하세요开始，掌握问候、点单、作息与邀约的日常韩语。',
    accent: '#a78bfa',
    icon: '한',
    tag: '零基础友好',
    learners: 48300,
    units: [
      {
        title: 'Unit 1 · 첫 만남',
        subtitle: '初次见面',
        lessons: [
          {
            title: '인사와 자기소개',
            subtitle: '问候与自我介绍',
            skill: 'mixed',
            focus: '은/는 · 입니다',
            xp: 40,
            minutes: 10,
            dialogue: [
              ['민지', '안녕하세요. 처음 뵙겠습니다. 저는 민지입니다.', '你好。初次见面。我是敏智。'],
              ['지호', '안녕하세요. 지호입니다. 만나서 반갑습니다.', '你好。我是智浩。很高兴见到你。'],
              ['민지', '어느 나라에서 왔어요?', '你来自哪个国家？'],
              ['지호', '중국에서 왔어요.', '我来自中国。']
            ],
            vocab: [
              ['안녕하세요', 'annyeonghaseyo', '你好', '问候', '안녕하세요, 선생님.', '老师，您好。'],
              ['감사합니다', 'gamsahamnida', '谢谢', '问候', '도와주셔서 감사합니다.', '谢谢您的帮助。'],
              ['처음', 'cheoeum', '初次', '名词', '처음 뵙겠습니다.', '初次见面。'],
              ['이름', 'ireum', '名字', '名词', '이름이 뭐예요?', '你叫什么名字？'],
              ['저', 'jeo', '我（谦称）', '代词', '저는 학생입니다.', '我是学生。'],
              ['만나다', 'mannada', '见面', '动词', '만나서 반갑습니다.', '很高兴见到你。']
            ],
            grammar: [
              {
                title: '助词 은/는 与 입니다',
                pattern: '名词 + 은/는 + 名词 + 입니다',
                explanation: '은/는 提示句子主题：有收音加 은，无收音加 는。입니다 是礼貌的“是”。自我介绍用「저는～입니다」。',
                examples: [
                  ['저는 민지입니다.', '我是敏智。'],
                  ['지호 씨는 학생입니다.', '智浩是学生。'],
                  ['저는 중국 사람입니다.', '我是中国人。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '저___ 학생입니다.', options: ['는', '를', '에'], answer: 0, explanation: '저 无收音，主题助词用 는。' },
              { kind: 'grammar', question: '选择正确形式：저는 민지___。', options: ['입니다', '합니다', '있습니다'], answer: 0, explanation: '名词后接 입니다 表示“是”。' },
              { kind: 'listening', audioText: '안녕하세요. 처음 뵙겠습니다. 저는 민지입니다.', prompt: '听录音，说话人是谁？', options: ['敏智', '智浩', '老师'], answer: 0, explanation: '录音中说的是 저는 민지입니다。' },
              { kind: 'vocab', question: '“谢谢”用韩语怎么说？', options: ['안녕하세요', '감사합니다', '죄송합니다'], answer: 1, explanation: '감사합니다 意为谢谢。' }
            ],
            speaking: [
              { text: '안녕하세요. 처음 뵙겠습니다. 저는 민지입니다.', reading: 'annyeonghaseyo. cheoeum boepgetseumnida. jeoneun minjiimnida.', meaning: '你好。初次见面。我是敏智。', tip: '뵙겠습니다 的 ㅂ 收音要收住。' },
              { text: '만나서 반갑습니다.', reading: 'mannaseo bangapseumnida.', meaning: '很高兴见到你。', tip: '반갑습니다 是固定问候，读得连贯一些。' }
            ]
          },
          {
            title: '카페에서 주문하기',
            subtitle: '在咖啡店点单',
            skill: 'vocab',
            focus: '주세요 · 얼마예요',
            xp: 45,
            minutes: 11,
            dialogue: [
              ['직원', '어서 오세요. 무엇을 주문하시겠어요?', '欢迎光临。您要点什么？'],
              ['지호', '커피 한 잔 주세요.', '请给我一杯咖啡。'],
              ['직원', '뜨거운 커피로 드릴까요?', '给您热咖啡吗？'],
              ['지호', '네. 얼마예요?', '好的。多少钱？']
            ],
            vocab: [
              ['커피', 'keopi', '咖啡', '名词', '커피를 좋아해요.', '我喜欢咖啡。'],
              ['차', 'cha', '茶', '名词', '차 한 잔 주세요.', '请给我一杯茶。'],
              ['물', 'mul', '水', '名词', '물 좀 주세요.', '请给我一点水。'],
              ['주세요', 'juseyo', '请给我', '句型', '메뉴 주세요.', '请给我菜单。'],
              ['얼마', 'eolma', '多少钱', '疑问词', '이거 얼마예요?', '这个多少钱？'],
              ['메뉴', 'menyu', '菜单', '名词', '메뉴를 보여 주세요.', '请给我看菜单。']
            ],
            grammar: [
              {
                title: '주세요 / 얼마예요?',
                pattern: '名词 + (을/를) + 주세요',
                explanation: '「주세요」表示“请给我”，是点单最实用的表达。询问价格用「얼마예요?」。量词用 잔（杯）、개（个）等。',
                examples: [
                  ['커피 한 잔 주세요.', '请给我一杯咖啡。'],
                  ['이거 얼마예요?', '这个多少钱？'],
                  ['메뉴 주세요.', '请给我菜单。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '커피 한 잔___주세요.', options: ['을', '를', '이'], answer: 0, explanation: '잔 有收音，宾语助词用 을。' },
              { kind: 'vocab', question: '“多少钱”用韩语怎么说？', options: ['얼마예요?', '어디예요?', '누구예요?'], answer: 0, explanation: '얼마예요? 意为多少钱。' },
              { kind: 'listening', audioText: '어서 오세요. 무엇을 주문하시겠어요?', prompt: '听录音，这句话最可能出现在哪里？', options: ['咖啡店', '医院', '机场'], answer: 0, explanation: '주문하시겠어요 是店员询问点单。' },
              { kind: 'vocab', question: '“水”用韩语怎么说？', options: ['물', '차', '커피'], answer: 0, explanation: '물 意为水。' }
            ],
            speaking: [
              { text: '커피 한 잔 주세요.', reading: 'keopi han jan juseyo.', meaning: '请给我一杯咖啡。', tip: '한 잔 连读为 /han jan/。' },
              { text: '이거 얼마예요?', reading: 'igeo eolmayeyo?', meaning: '这个多少钱？', tip: '句尾用升调。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · 일상생활',
        subtitle: '日常生活',
        lessons: [
          {
            title: '나의 하루',
            subtitle: '我的一天',
            skill: 'grammar',
            focus: '-아요/어요 · 时间助词',
            xp: 45,
            minutes: 12,
            dialogue: [
              ['민지', '보통 몇 시에 일어나요?', '你通常几点起床？'],
              ['지호', '일곱 시에 일어나요. 그리고 아침을 먹어요.', '七点起床。然后吃早饭。'],
              ['민지', '회사에는 몇 시까지 가요?', '几点之前到公司？'],
              ['지호', '아홉 시까지 가요. 밤에는 열한 시에 자요.', '九点之前到。晚上十一点睡觉。']
            ],
            vocab: [
              ['일어나다', 'ireonada', '起床', '动词', '아침 일곱 시에 일어나요.', '早上七点起床。'],
              ['아침', 'achim', '早晨；早饭', '名词', '아침을 먹어요.', '吃早饭。'],
              ['회사', 'hoesa', '公司', '名词', '회사에 가요.', '去公司。'],
              ['점심', 'jeomsim', '午饭', '名词', '점심을 먹었어요.', '吃了午饭。'],
              ['저녁', 'jeonyeok', '晚饭；晚上', '名词', '저녁에 운동해요.', '晚上运动。'],
              ['자다', 'jada', '睡觉', '动词', '열한 시에 자요.', '十一点睡觉。']
            ],
            grammar: [
              {
                title: '非正式敬语 -아요/어요',
                pattern: '动词词干 + 아요 / 어요',
                explanation: '日常会话最常用 -아요/어요。词干最后一个元音是 ㅏ/ㅗ 时加 아요，其余加 어요。时间点后用 에，까지 表示“到……为止”。',
                examples: [
                  ['일곱 시에 일어나요.', '七点起床。'],
                  ['아침을 먹어요.', '吃早饭。'],
                  ['아홉 시까지 가요.', '九点之前去。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '일곱 시___일어나요.', options: ['에', '를', '도'], answer: 0, explanation: '具体时间后用助词 에。' },
              { kind: 'grammar', question: '选择正确形式：아침을 ___.', options: ['먹어요', '먹어', '먹'], answer: 0, explanation: '礼貌体用 먹어요。' },
              { kind: 'listening', audioText: '저는 보통 일곱 시에 일어나서 아홉 시까지 회사에 가요.', prompt: '听录音，几点之前到公司？', options: ['七点', '八点', '九点'], answer: 2, explanation: '录音中说的是 아홉 시까지。' },
              { kind: 'vocab', question: '“午饭”用韩语怎么说？', options: ['아침', '점심', '저녁'], answer: 1, explanation: '점심 意为午饭。' }
            ],
            speaking: [
              { text: '저는 일곱 시에 일어나서 아침을 먹어요.', reading: 'jeoneun ilgop sie ireonaseo achimeul meogeoyo.', meaning: '我七点起床，然后吃早饭。', tip: '-아서/어서 连接两个先后动作。' },
              { text: '회사에는 몇 시까지 가요?', reading: 'hoesaneun myeot sikkaji gayo?', meaning: '几点之前到公司？', tip: '까지 表示“到……为止”。' }
            ]
          },
          {
            title: '주말 계획',
            subtitle: '周末计划',
            skill: 'speaking',
            focus: '-(으)ㄹ까요 · 邀约',
            xp: 50,
            minutes: 12,
            dialogue: [
              ['민지', '이번 주말에 시간 있어요?', '这个周末有时间吗？'],
              ['지호', '토요일은 좀 바빠요. 일요일은 괜찮아요.', '周六有点忙。周日可以。'],
              ['민지', '우리 같이 영화 볼까요?', '我们一起看电影好吗？'],
              ['지호', '좋아요. 몇 시에 만날까요?', '好啊。几点见面？']
            ],
            vocab: [
              ['주말', 'jumal', '周末', '名词', '주말에 뭐 해요?', '周末做什么？'],
              ['약속', 'yaksok', '约定', '名词', '주말에 약속이 있어요.', '周末有约。'],
              ['영화', 'yeonghwa', '电影', '名词', '영화를 봐요.', '看电影。'],
              ['시간', 'sigan', '时间', '名词', '시간이 있어요?', '有时间吗？'],
              ['같이', 'gachi', '一起', '副词', '같이 가요.', '一起去吧。'],
              ['만나다', 'mannada', '见面', '动词', '몇 시에 만날까요?', '几点见面？']
            ],
            grammar: [
              {
                title: '征求意见：-(으)ㄹ까요?',
                pattern: '动词词干 + (으)ㄹ까요?',
                explanation: '「-(으)ㄹ까요?」用于委婉地提议或征求对方意见，“要不要……？/……好吗？”。有收音加 을까요，无收音加 ㄹ까요。',
                examples: [
                  ['우리 같이 영화 볼까요?', '我们一起看电影好吗？'],
                  ['몇 시에 만날까요?', '几点见面？'],
                  ['제가 도와줄까요?', '要我帮忙吗？']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '우리 같이 영화 ___까요?', options: ['볼', '봐', '봤'], answer: 0, explanation: '보다 无收音，加 ㄹ까요 → 볼까요。' },
              { kind: 'vocab', question: '“周末”用韩语怎么说？', options: ['주말', '평일', '매일'], answer: 0, explanation: '주말 意为周末。' },
              { kind: 'listening', audioText: '토요일은 바빠요. 일요일은 괜찮아요.', prompt: '听录音，什么时候可以？', options: ['周六', '周日', '周一'], answer: 1, explanation: '일요일은 괜찮아요 表示周日可以。' }
            ],
            speaking: [
              { text: '이번 주말에 시간 있어요?', reading: 'ibeon jumare sigan isseoyo?', meaning: '这个周末有时间吗？', tip: '있어요 句尾用升调。' },
              { text: '우리 같이 영화 볼까요?', reading: 'uri gachi yeonghwa bolkkayo?', meaning: '我们一起看电影好吗？', tip: '볼까요 语气委婉，适合提议。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ko-a2',
    language: 'ko',
    level: 'A2',
    title: '韩语场景突破',
    subtitle: '여행과 쇼핑',
    description: '机场、酒店、商店、街头四个高频场景，练出真正能用的韩语。',
    accent: '#c084fc',
    icon: '한',
    tag: '旅行必备',
    learners: 36900,
    units: [
      {
        title: 'Unit 1 · 여행',
        subtitle: '旅行场景',
        lessons: [
          {
            title: '공항에서',
            subtitle: '在机场',
            skill: 'listening',
            focus: '-아/어야 하다 · 机场表达',
            xp: 55,
            minutes: 13,
            dialogue: [
              ['직원', '여권을 보여 주세요.', '请出示护照。'],
              ['지호', '여기요. 짐을 먼저 부쳐야 해요?', '给您。要先托运行李吗？'],
              ['직원', '네, 저쪽에서 부치세요. 탑승권은 여기 있습니다.', '是的，在那边托运。登机牌在这里。'],
              ['지호', '비행기가 지연됐나요?', '航班延误了吗？']
            ],
            vocab: [
              ['여권', 'yeogwon', '护照', '名词', '여권을 보여 주세요.', '请出示护照。'],
              ['탑승권', 'tapseunggwon', '登机牌', '名词', '탑승권을 받았어요.', '拿到了登机牌。'],
              ['게이트', 'geiteu', '登机口', '名词', '게이트는 십이 번이에요.', '登机口是 12 号。'],
              ['지연', 'jiyeon', '延误', '名词', '비행기가 지연됐어요.', '航班延误了。'],
              ['짐', 'jim', '行李', '名词', '짐이 많아요.', '行李很多。'],
              ['출발', 'chulbal', '出发', '名词', '출발 시간이 언제예요?', '出发时间是几点？']
            ],
            grammar: [
              {
                title: '必须：-아/어야 하다',
                pattern: '动词词干 + 아/어야 하다',
                explanation: '「-아/어야 하다」表示“必须、应该做某事”。机场、酒店等场景中常用来确认流程。',
                examples: [
                  ['짐을 먼저 부쳐야 해요.', '必须先托运行李。'],
                  ['여권을 보여 줘야 해요.', '必须出示护照。'],
                  ['탑승권을 가지고 가야 해요.', '必须带上登机牌。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '짐을 먼저 부치___ 해요.', options: ['어야', '어서', '으면'], answer: 0, explanation: '부치다 + 어야 해요 表示“必须托运”。' },
              { kind: 'vocab', question: '“登机口”用韩语怎么说？', options: ['게이트', '여권', '탑승권'], answer: 0, explanation: '게이트 意为登机口。' },
              { kind: 'listening', audioText: '비행기가 사십 분 지연됐습니다. 게이트는 십이 번입니다.', prompt: '听录音，航班延误多久？', options: ['14 分钟', '40 分钟', '4 小时'], answer: 1, explanation: '사십 분 表示 40 分钟。' }
            ],
            speaking: [
              { text: '짐을 먼저 부쳐야 해요?', reading: 'jimeul meonjeo buchyeoya haeyo?', meaning: '要先托运行李吗？', tip: '부쳐야 连读自然。' },
              { text: '비행기가 사십 분 지연됐어요.', reading: 'bihaenggiga sasip bun jiyeondwaesseoyo.', meaning: '航班延误了四十分钟。', tip: '지연됐어요 表示“延误了”。' }
            ]
          },
          {
            title: '호텔 체크인',
            subtitle: '酒店入住',
            skill: 'mixed',
            focus: '-(으)ㄹ 수 있다 · 酒店表达',
            xp: 55,
            minutes: 13,
            dialogue: [
              ['지호', '체크인하려고 합니다. 예약한 지호입니다.', '我要办理入住。我是预订过的智浩。'],
              ['직원', '네, 여권을 보여 주세요. 방은 삼 층입니다.', '好的，请出示护照。房间在三楼。'],
              ['지호', '와이파이 비밀번호를 알 수 있어요?', '我能知道 Wi-Fi 密码吗？'],
              ['직원', '물론이죠. 아침 식사는 일곱 시부터 열 시까지입니다.', '当然。早餐从七点到十点。']
            ],
            vocab: [
              ['예약', 'yeyak', '预订', '名词', '호텔을 예약했어요.', '预订了酒店。'],
              ['체크인', 'chekeuin', '入住', '名词', '세 시에 체크인해요.', '三点入住。'],
              ['방', 'bang', '房间', '名词', '방이 아주 좋아요.', '房间很好。'],
              ['열쇠', 'yeolsoe', '钥匙', '名词', '방 열쇠를 주세요.', '请给我房间钥匙。'],
              ['조식', 'josik', '早餐', '名词', '조식은 몇 시예요?', '早餐是几点？'],
              ['가능하다', 'ganeunghada', '可以、可能', '形容词', '예약이 가능해요?', '可以预订吗？']
            ],
            grammar: [
              {
                title: '能/不能：-(으)ㄹ 수 있다/없다',
                pattern: '动词词干 + (으)ㄹ 수 있다 / 없다',
                explanation: '「-(으)ㄹ 수 있다」表示“能、可以”，「없다」表示“不能”。在酒店、商店询问服务时非常实用。',
                examples: [
                  ['와이파이를 사용할 수 있어요?', '可以使用 Wi-Fi 吗？'],
                  ['방을 바꿀 수 있어요?', '可以换房间吗？'],
                  ['지금 체크인할 수 없어요.', '现在不能办理入住。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '와이파이를 사용할 수 ___?', options: ['있어요', '있어', '있다'], answer: 0, explanation: '礼貌疑问用 있어요?。' },
              { kind: 'vocab', question: '“早餐”用韩语怎么说？', options: ['조식', '점심', '저녁'], answer: 0, explanation: '조식 意为早餐。' },
              { kind: 'listening', audioText: '아침 식사는 일곱 시부터 열 시까지입니다.', prompt: '听录音，早餐供应到几点？', options: ['七点', '九点', '十点'], answer: 2, explanation: '录音中说的是 열 시까지。' }
            ],
            speaking: [
              { text: '체크인하려고 합니다. 예약한 지호입니다.', reading: 'chekeuinharyeogo hamnida. yeyakhan jihoimnida.', meaning: '我要办理入住。我是预订过的智浩。', tip: '-하려고 합니다 表示“打算做”。' },
              { text: '와이파이 비밀번호를 알 수 있어요?', reading: 'waipai bimilbeonhoreul al su isseoyo?', meaning: '我能知道 Wi-Fi 密码吗？', tip: '알 수 있어요 表示“能知道”。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · 쇼핑과 생활',
        subtitle: '购物与生活',
        lessons: [
          {
            title: '물건 사기',
            subtitle: '购物',
            skill: 'vocab',
            focus: '-아/어 보다 · 比较',
            xp: 60,
            minutes: 13,
            dialogue: [
              ['지호', '이 셔츠 얼마예요?', '这件衬衫多少钱？'],
              ['직원', '삼만 원입니다.', '三万韩元。'],
              ['지호', '조금 비싸네요. 더 싼 거 있어요?', '有点贵呢。有更便宜的吗？'],
              ['직원', '이건 이만 원이에요. 한번 입어 보세요.', '这件两万韩元。试穿一下吧。']
            ],
            vocab: [
              ['비싸다', 'bissada', '贵', '形容词', '이거 너무 비싸요.', '这个太贵了。'],
              ['싸다', 'ssada', '便宜', '形容词', '더 싼 거 있어요?', '有更便宜的吗？'],
              ['입어 보다', 'ibeo boda', '试穿', '动词', '한번 입어 보세요.', '试穿一下吧。'],
              ['사이즈', 'saijeu', '尺码', '名词', '사이즈가 어떻게 돼요?', '尺码是多少？'],
              ['교환', 'gyohwan', '更换', '名词', '교환할 수 있어요?', '可以更换吗？'],
              ['원', 'won', '韩元', '名词', '이만 원이에요.', '两万韩元。']
            ],
            grammar: [
              {
                title: '尝试：-아/어 보다',
                pattern: '动词词干 + 아/어 보다',
                explanation: '「-아/어 보다」表示尝试做某事，如「입어 보세요」（试穿看看）、「먹어 봤어요」（吃过）。比较时用 더 表示“更”。',
                examples: [
                  ['한번 입어 보세요.', '试穿一下吧。'],
                  ['이거 먹어 봤어요?', '你吃过这个吗？'],
                  ['더 싼 거 있어요?', '有更便宜的吗？']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '한번 입어 ___세요.', options: ['보', '서', '야'], answer: 0, explanation: '입어 보세요 表示“试穿一下看看”。' },
              { kind: 'grammar', question: '选择正确：이거보다 저게 더 ___요.', options: ['싸', '싼', '싸서'], answer: 0, explanation: '形容词词干 + 아/어요：싸다 → 싸요。' },
              { kind: 'listening', audioText: '이 셔츠는 삼만 원이고, 저 셔츠는 이만 원입니다.', prompt: '听录音，另一件衬衫多少钱？', options: ['1 万韩元', '2 万韩元', '3 万韩元'], answer: 1, explanation: '저 셔츠는 이만 원 表示两万韩元。' },
              { kind: 'vocab', question: '“试穿”用韩语怎么说？', options: ['입어 보다', '교환하다', '사다'], answer: 0, explanation: '입어 보다 意为试穿。' }
            ],
            speaking: [
              { text: '조금 비싸네요. 더 싼 거 있어요?', reading: 'jogeum bissaneyo. deo ssan geo isseoyo?', meaning: '有点贵呢。有更便宜的吗？', tip: '네요 表达轻微的感叹。' },
              { text: '한번 입어 보세요.', reading: 'hanbeon ibeo boseyo.', meaning: '试穿一下吧。', tip: '보세요 语气友好。' }
            ]
          },
          {
            title: '길 찾기',
            subtitle: '问路',
            skill: 'speaking',
            focus: '-에서 / -까지 · 方位',
            xp: 60,
            minutes: 13,
            dialogue: [
              ['지호', '실례합니다. 역이 어디예요?', '打扰一下，车站在哪里？'],
              ['행인', '이 길로 쭉 가서 두 번째 모퉁이에서 오른쪽으로 가세요.', '沿这条路直走，在第二个拐角向右走。'],
              ['지호', '근처에 편의점이 있어요?', '附近有便利店吗？'],
              ['행인', '네, 역 앞에 있어요.', '有，在车站前面。']
            ],
            vocab: [
              ['실례합니다', 'sillyehamnida', '打扰一下', '问候', '실례합니다, 질문이 있어요.', '打扰一下，我有个问题。'],
              ['직진', 'jikjin', '直走', '名词', '여기서 직진하세요.', '从这里直走。'],
              ['모퉁이', 'motungi', '拐角', '名词', '두 번째 모퉁이에서 세요.', '在第二个拐角转弯。'],
              ['오른쪽', 'oreunjjok', '右边', '名词', '오른쪽으로 가세요.', '请往右走。'],
              ['왼쪽', 'oenjjok', '左边', '名词', '왼쪽에 있어요.', '在左边。'],
              ['근처', 'geuncheo', '附近', '名词', '근처에 지하철역이 있어요.', '附近有地铁站。']
            ],
            grammar: [
              {
                title: '问路：-이/가 어디예요?',
                pattern: '地点 + 이/가 어디예요? / -에서 오른쪽으로',
                explanation: '询问地点用「～이/가 어디예요?」。有收音用 이，无收音用 가。描述方向时用「-에서 오른쪽으로 가세요」。',
                examples: [
                  ['역이 어디예요?', '车站在哪里？'],
                  ['두 번째 모퉁이에서 오른쪽으로 가세요.', '在第二个拐角向右走。'],
                  ['근처에 편의점이 있어요?', '附近有便利店吗？']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '역___어디예요?', options: ['이', '을', '에서'], answer: 0, explanation: '역 有收音，主格助词用 이。' },
              { kind: 'vocab', question: '“拐角”用韩语怎么说？', options: ['모퉁이', '근처', '길'], answer: 0, explanation: '모퉁이 意为拐角。' },
              { kind: 'listening', audioText: '이 길로 쭉 가서 두 번째 모퉁이에서 오른쪽으로 가세요.', prompt: '听录音，在第二个拐角向哪边转？', options: ['左边', '右边', '直走'], answer: 1, explanation: '录音中说的是 오른쪽으로。' }
            ],
            speaking: [
              { text: '실례합니다. 역이 어디예요?', reading: 'sillyehamnida. yeogi eodiyeyo?', meaning: '打扰一下，车站在哪里？', tip: '실례합니다 用于礼貌地引起注意。' },
              { text: '이 길로 쭉 가서 두 번째 모퉁이에서 오른쪽으로 가세요.', reading: 'i gillo jjuk gaseo du beonjjae motungieseo oreunjjogeuro gaseyo.', meaning: '沿这条路直走，在第二个拐角向右走。', tip: '쭉 表示“一直、径直”。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ko-b1',
    language: 'ko',
    level: 'B1',
    title: '韩语表达进阶',
    subtitle: '의견과 문화',
    description: '表达观点、讲述经历、听懂新闻，用韩语完成有深度的交流。',
    accent: '#e879f9',
    icon: '한',
    tag: '进阶表达',
    learners: 23700,
    units: [
      {
        title: 'Unit 1 · 의견과 경험',
        subtitle: '观点与经历',
        lessons: [
          {
            title: '찬성과 반대',
            subtitle: '赞成与反对',
            skill: 'speaking',
            focus: '-다고 생각하다 · 观点',
            xp: 70,
            minutes: 15,
            dialogue: [
              ['민지', '재택근무가 생산성을 떨어뜨린다고 생각해요.', '我认为远程办公会降低生产效率。'],
              ['지호', '물론 그런 면도 있지만, 저는 효율이 높아진다고 봐요.', '当然有那种一面，但我认为效率提高了。'],
              ['민지', '왜 그렇게 생각해요?', '你为什么这么想？'],
              ['지호', '출퇴근 시간이 줄어서 더 집중할 수 있거든요.', '因为通勤时间减少，能更专注。']
            ],
            vocab: [
              ['찬성', 'chanseong', '赞成', '名词', '저는 그 의견에 찬성해요.', '我赞成那个意见。'],
              ['반대', 'bandae', '反对', '名词', '저는 반대예요.', '我反对。'],
              ['의견', 'uigyeon', '意见', '名词', '의견을 말해 주세요.', '请说说你的意见。'],
              ['물론', 'mullon', '当然', '副词', '물론 그렇죠.', '当然是这样。'],
              ['그러나', 'geureona', '但是', '连词', '그러나 문제도 있어요.', '但是也有问题。'],
              ['이유', 'iyu', '理由', '名词', '이유를 알려 주세요.', '请告诉我理由。']
            ],
            grammar: [
              {
                title: '认为：-다고 생각하다',
                pattern: '动词/形容词词干 + 다고 생각하다',
                explanation: '「-다고 생각하다」表示“认为……”。先承认对方观点（물론 그런 면도 있지만）再转折，是韩语讨论中的礼貌策略。',
                examples: [
                  ['저는 효율이 높아진다고 생각해요.', '我认为效率会提高。'],
                  ['저는 그렇게 생각하지 않아요.', '我不那么认为。'],
                  ['물론 그런 면도 있지만, 저는 반대예요.', '当然有那种一面，但我反对。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '저는 효율이 높아진다고 ___요.', options: ['생각해', '생각', '생각해서'], answer: 0, explanation: '생각하다 的礼貌体是 생각해요。' },
              { kind: 'vocab', question: '“찬성”的反义词是？', options: ['반대', '의견', '이유'], answer: 0, explanation: '반대 意为反对。' },
              { kind: 'listening', audioText: '물론 그런 면도 있지만, 저는 효율이 높아진다고 봐요.', prompt: '听录音，说话人的态度是？', options: ['完全反对', '部分认同但持不同看法', '完全不关心'], answer: 1, explanation: '先承认一面，再表达不同看法。' }
            ],
            speaking: [
              { text: '물론 그런 면도 있지만, 저는 효율이 높아진다고 생각해요.', reading: 'mullon geureon myeondo itjiman, jeoneun hyoyuri nopajindago saenggakaeyo.', meaning: '当然有那种一面，但我认为效率会提高。', tip: '지만 前后要有停顿。' },
              { text: '출퇴근 시간이 줄어서 더 집중할 수 있거든요.', reading: 'chultoegeun sigani jureoseo deo jipjunghal su itgeodeunyo.', meaning: '因为通勤时间减少，能更专注。', tip: '거든요 用来补充说明原因。' }
            ]
          },
          {
            title: '경험 이야기',
            subtitle: '讲述经历',
            skill: 'mixed',
            focus: '-(으)ㄴ 적이 있다 · 经历',
            xp: 70,
            minutes: 15,
            dialogue: [
              ['민지', '한국에 가 본 적이 있어요?', '你去过韩国吗？'],
              ['지호', '네, 한 번 있어요. 대학 때 유학했어요.', '有，去过一次。大学时留过学。'],
              ['민지', '좋은 경험이었겠네요. 계기가 뭐였어요?', '那一定是很好的经历。契机是什么？'],
              ['지호', '어렸을 때 본 드라마가 계기였어요.', '是小时候看的电视剧。']
            ],
            vocab: [
              ['경험', 'gyeongheom', '经验', '名词', '좋은 경험이에요.', '是很好的经验。'],
              ['한 번', 'han beon', '一次', '词组', '한 번 가 봤어요.', '去过一次。'],
              ['유학', 'yuhak', '留学', '名词', '대학 때 유학했어요.', '大学时留过学。'],
              ['계기', 'gyegi', '契机', '名词', '그게 계기였어요.', '那就是契机。'],
              ['어리다', 'eorida', '年幼', '形容词', '어렸을 때 이야기예요.', '是小时候的故事。'],
              ['영향', 'yeonghyang', '影响', '名词', '큰 영향을 받았어요.', '受到了很大影响。']
            ],
            grammar: [
              {
                title: '经历：-(으)ㄴ 적이 있다',
                pattern: '动词词干 + (으)ㄴ 적이 있다 / 없다',
                explanation: '「-(으)ㄴ 적이 있다」表示“曾经……过”，否定形式为「-ㄴ 적이 없다」。具体过去时间用一般过去时。',
                examples: [
                  ['한국에 가 본 적이 있어요.', '去过韩国。'],
                  ['그 영화를 본 적이 없어요.', '没看过那部电影。'],
                  ['대학 때 유학했어요.', '大学时留过学。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '한국에 가 본 ___이 있어요?', options: ['적', '번', '것'], answer: 0, explanation: '가 본 적이 있다 表示“去过”。' },
              { kind: 'grammar', question: '选择正确形式：대학 때 유학을 ___.', options: ['했어요', '하어요', '해요'], answer: 0, explanation: '过去时用 했어요。' },
              { kind: 'listening', audioText: '어렸을 때 본 드라마가 계기가 되어서 한국어를 배우기 시작했어요.', prompt: '听录音，学习韩语的契机是什么？', options: ['小时候看的电视剧', '大学的课程', '一次旅行'], answer: 0, explanation: '录音中说的是 어렸을 때 본 드라마。' }
            ],
            speaking: [
              { text: '한국에 가 본 적이 있어요?', reading: 'hanguge ga bon jeogi isseoyo?', meaning: '你去过韩国吗？', tip: '가 본 적이 连读自然。' },
              { text: '어렸을 때 본 드라마가 계기였어요.', reading: 'eoryeosseul ttae bon deuramaga gyegieosseoyo.', meaning: '是小时候看的电视剧。', tip: '계기였어요 表示“曾是契机”。' }
            ]
          }
        ]
      },
      {
        title: 'Unit 2 · 문화와 미디어',
        subtitle: '文化与媒体',
        lessons: [
          {
            title: '한국 문화',
            subtitle: '韩国文化',
            skill: 'speaking',
            focus: '-(으)면서 · 文化词汇',
            xp: 75,
            minutes: 15,
            dialogue: [
              ['민지', '한국 문화에서 가장 인상 깊었던 게 뭐예요?', '韩国文化中印象最深的是什么？'],
              ['지호', '온천이요. 경치를 보면서 들어가는 온천이 최고예요.', '是温泉。一边看风景一边泡温泉最棒了。'],
              ['민지', '예절도 중요하게 생각하죠?', '也很重视礼仪吧？'],
              ['지호', '네, 특히 인사예요.', '是的，特别是问候。']
            ],
            vocab: [
              ['문화', 'munhwa', '文化', '名词', '한국 문화를 좋아해요.', '喜欢韩国文化。'],
              ['습관', 'seupgwan', '习惯', '名词', '나라마다 습관이 달라요.', '每个国家的习惯不同。'],
              ['예절', 'yejeol', '礼仪', '名词', '예절을 중요하게 생각해요.', '重视礼仪。'],
              ['축제', 'chukje', '庆典', '名词', '축제에 갔어요.', '去了庆典。'],
              ['온천', 'oncheon', '温泉', '名词', '온천에 가고 싶어요.', '想去温泉。'],
              ['존경', 'jongyeong', '尊敬', '名词', '선생님을 존경해요.', '尊敬老师。']
            ],
            grammar: [
              {
                title: '同时进行：-(으)면서',
                pattern: '动词词干 + (으)면서',
                explanation: '「-(으)면서」表示两个动作同时进行，如「음악을 들으면서 공부해요」（一边听音乐一边学习）。前后主语要一致。',
                examples: [
                  ['음악을 들으면서 공부해요.', '一边听音乐一边学习。'],
                  ['경치를 보면서 온천에 들어가요.', '一边看风景一边泡温泉。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '음악을 들으___ 공부해요.', options: ['면서', '면서도', '어서'], answer: 0, explanation: '들으면서 表示一边听一边……。' },
              { kind: 'vocab', question: '“温泉”用韩语怎么说？', options: ['온천', '축제', '습관'], answer: 0, explanation: '온천 意为温泉。' },
              { kind: 'listening', audioText: '경치를 보면서 온천에 들어가는 것을 좋아해요.', prompt: '听录音，说话人喜欢什么？', options: ['一边看风景一边泡温泉', '一边听音乐一边学习', '一边吃饭一边聊天'], answer: 0, explanation: '录音中提到了 경치를 보면서 온천에 들어가는 것。' }
            ],
            speaking: [
              { text: '경치를 보면서 온천에 들어가는 것을 좋아해요.', reading: 'gyeongchireul bomyeonseo oncheone deureoganeun geoseul joahaeyo.', meaning: '我喜欢一边看风景一边泡温泉。', tip: '보면서 连接两个同时进行的动作。' },
              { text: '예절도 중요하게 생각하죠?', reading: 'yejeoldo jungyohage saenggakhajyo?', meaning: '也很重视礼仪吧？', tip: '죠 表示寻求认同。' }
            ]
          },
          {
            title: '뉴스 듣기',
            subtitle: '听新闻',
            skill: 'listening',
            focus: '-다고 하다 · 新闻词汇',
            xp: 75,
            minutes: 16,
            dialogue: [
              ['민지', '어제 뉴스 봤어요?', '昨天的新闻你看了吗？'],
              ['지호', '네. 경제가 회복되고 있다고 해요.', '看了。据说经济正在复苏。'],
              ['민지', '그런데 물가도 오르고 있다고 해요.', '不过听说物价也在上涨。'],
              ['지호', '생활이 힘들어질 것 같아요.', '生活似乎会变得艰难。']
            ],
            vocab: [
              ['뉴스', 'nyuseu', '新闻', '名词', '매일 뉴스를 봐요.', '每天看新闻。'],
              ['기사', 'gisa', '报道', '名词', '이 기사를 읽었어요.', '读了这篇报道。'],
              ['정부', 'jeongbu', '政府', '名词', '정부가 발표했어요.', '政府发布了消息。'],
              ['경제', 'gyeongje', '经济', '名词', '경제가 회복되고 있어요.', '经济正在复苏。'],
              ['늘다', 'neulda', '增加', '动词', '물가가 늘고 있어요.', '物价在上涨。'],
              ['줄다', 'julda', '减少', '动词', '인구가 줄고 있어요.', '人口在减少。']
            ],
            grammar: [
              {
                title: '传闻：-다고 하다',
                pattern: '动词/形容词词干 + 다고 하다',
                explanation: '「-다고 하다」表示“据说、听说”，是新闻和转述中最常用的表达。口语中常简化为「-다고 해요」。',
                examples: [
                  ['경제가 회복되고 있다고 해요.', '据说经济正在复苏。'],
                  ['물가가 오른다고 해요.', '据说物价上涨了。'],
                  ['내일 비가 온다고 해요.', '据说明天会下雨。']
                ]
              }
            ],
            exercises: [
              { kind: 'grammar', question: '경제가 회복되고 있다___해요.', options: ['고', '는', '서'], answer: 0, explanation: '间接引语用 -다고 해요。' },
              { kind: 'grammar', question: '选择正确形式：물가가 ___ 것 같아요.', options: ['오를', '오르', '올라'], answer: 0, explanation: '오르다 + ㄹ 것 같아요 → 오를 것 같아요。' },
              { kind: 'listening', audioText: '경제는 회복되고 있지만 물가도 오르고 있다고 합니다.', prompt: '听录音，哪项描述正确？', options: ['经济在复苏，但物价也在上涨', '经济下滑，物价下降', '物价和经济都没有变化'], answer: 0, explanation: '录音同时提到了经济复苏与物价上涨。' }
            ],
            speaking: [
              { text: '경제가 회복되고 있다고 해요.', reading: 'gyeongjega hoebokdoego itdago haeyo.', meaning: '据说经济正在复苏。', tip: '다고 해요 表示传闻。' },
              { text: '생활이 힘들어질 것 같아요.', reading: 'saenghwari himdeureojil geot gatayo.', meaning: '生活似乎会变得艰难。', tip: '것 같아요 表示推测。' }
            ]
          }
        ]
      }
    ]
  }
]
