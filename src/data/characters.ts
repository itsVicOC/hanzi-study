export interface HanziCategory {
  id: string
  name: string
  emoji: string
  description: string
}

export interface HanziChar {
  char: string
  pinyin: string
  category: string
  emoji: string
  tip: string
  evolution: string
  words: string[]
  strokeCount: number
}

export const categories: HanziCategory[] = [
  { id: "number", name: "数字", emoji: "🔢", description: "从一到十，数数认字" },
  { id: "nature", name: "自然·天气", emoji: "🌞", description: "日月山水，天地万物" },
  { id: "body", name: "身体", emoji: "🖐️", description: "认识自己的身体" },
  { id: "animal", name: "动物", emoji: "🐰", description: "可爱的小动物们" },
  { id: "family", name: "家庭·称谓", emoji: "🏠", description: "爸爸、妈妈和我" },
  { id: "direction", name: "方位", emoji: "🧭", description: "上下左右，前前后后" },
  { id: "size", name: "大小·多少", emoji: "⚖️", description: "比一比，数一数" },
  { id: "action", name: "生活·动作", emoji: "🏃", description: "日常生活里的常用字" },
  { id: "color", name: "颜色", emoji: "🎨", description: "认识缤纷的颜色" },
  { id: "season", name: "季节", emoji: "🍂", description: "春夏秋冬，四季轮转" },
]

export const characters: HanziChar[] = [
  // ===== 数字 =====
  { char: "一", pinyin: "yī", category: "number", emoji: "1️⃣", tip: "一根横着的小棍，就是数字 1。", evolution: "甲骨文的「一」就是一道横线。", words: ["一个", "第一", "一起"], strokeCount: 1 },
  { char: "二", pinyin: "èr", category: "number", emoji: "2️⃣", tip: "两道横线，就是数字 2。", evolution: "甲骨文画两道横线表示「二」。", words: ["二月", "第二", "十二"], strokeCount: 2 },
  { char: "三", pinyin: "sān", category: "number", emoji: "3️⃣", tip: "三道横线，就是数字 3。", evolution: "甲骨文画三道横线表示「三」。", words: ["三个", "第三", "三十"], strokeCount: 3 },
  { char: "四", pinyin: "sì", category: "number", emoji: "4️⃣", tip: "一个方框里藏着两条腿，就是 4。", evolution: "古文字「四」像一个方框，后来中间加了笔画。", words: ["四个", "第四", "四月"], strokeCount: 5 },
  { char: "五", pinyin: "wǔ", category: "number", emoji: "5️⃣", tip: "上下两横，中间交叉，就是 5。", evolution: "甲骨文「五」是交叉的线条。", words: ["五个", "五星", "十五"], strokeCount: 4 },
  { char: "六", pinyin: "liù", category: "number", emoji: "6️⃣", tip: "像个小屋顶，是数字 6。", evolution: "甲骨文「六」像一座小房子。", words: ["六个", "六月", "十六"], strokeCount: 4 },
  { char: "七", pinyin: "qī", category: "number", emoji: "7️⃣", tip: "一横加一个弯钩，就是 7。", evolution: "甲骨文「七」是一横加一竖弯。", words: ["七个", "七月", "十七"], strokeCount: 2 },
  { char: "八", pinyin: "bā", category: "number", emoji: "8️⃣", tip: "两边张开，像「八」字分开。", evolution: "古文字「八」表示分开、分别。", words: ["八个", "八月", "十八"], strokeCount: 2 },
  { char: "九", pinyin: "jiǔ", category: "number", emoji: "9️⃣", tip: "像一条弯曲的钩子，是数字 9。", evolution: "甲骨文「九」像弯曲的手臂。", words: ["九个", "九月", "十九"], strokeCount: 2 },
  { char: "十", pinyin: "shí", category: "number", emoji: "🔟", tip: "一横一竖，是数字 10。", evolution: "甲骨文「十」是一根竖线，后加横线。", words: ["十个", "十月", "十分"], strokeCount: 2 },

  // ===== 自然·天气 =====
  { char: "日", pinyin: "rì", category: "nature", emoji: "☀️", tip: "圆圆的太阳，中间一横是光芒。", evolution: "甲骨文「日」是圆圈中间一点，像太阳。", words: ["日子", "生日", "日出"], strokeCount: 4 },
  { char: "月", pinyin: "yuè", category: "nature", emoji: "🌙", tip: "弯弯的月亮，像一只小船。", evolution: "甲骨文「月」是弯月的形状。", words: ["月亮", "月份", "月饼"], strokeCount: 4 },
  { char: "山", pinyin: "shān", category: "nature", emoji: "⛰️", tip: "三座山峰并排立在一起。", evolution: "甲骨文「山」像三座并立的山峰。", words: ["大山", "山顶", "高山"], strokeCount: 3 },
  { char: "水", pinyin: "shuǐ", category: "nature", emoji: "💧", tip: "中间是河流，两边溅起水花。", evolution: "甲骨文「水」像流动的河水。", words: ["河水", "喝水", "水花"], strokeCount: 4 },
  { char: "火", pinyin: "huǒ", category: "nature", emoji: "🔥", tip: "像跳动的火苗往上蹿。", evolution: "甲骨文「火」像火焰升腾。", words: ["火苗", "火车", "大火"], strokeCount: 4 },
  { char: "木", pinyin: "mù", category: "nature", emoji: "🌳", tip: "一棵树：上面是树枝，下面是树根。", evolution: "甲骨文「木」像一棵有枝有根的树。", words: ["树木", "木头", "木马"], strokeCount: 4 },
  { char: "土", pinyin: "tǔ", category: "nature", emoji: "🟤", tip: "土地上长出了小草。", evolution: "甲骨文「土」像地上凸起的土堆。", words: ["土地", "泥土", "土豆"], strokeCount: 3 },
  { char: "天", pinyin: "tiān", category: "nature", emoji: "🌤️", tip: "人的头顶上是蓝蓝的天空。", evolution: "甲骨文「天」在人头上加一横，表示头顶上方。", words: ["天空", "天气", "蓝天"], strokeCount: 4 },
  { char: "地", pinyin: "dì", category: "nature", emoji: "🌏", tip: "大地厚实，左边是「土」。", evolution: "「地」由「土」和「也」组成，土表示大地。", words: ["土地", "地面", "大地"], strokeCount: 6 },
  { char: "云", pinyin: "yún", category: "nature", emoji: "☁️", tip: "天空飘着软软的云朵。", evolution: "甲骨文「云」像卷曲的云气。", words: ["白云", "云朵", "乌云"], strokeCount: 4 },
  { char: "雨", pinyin: "yǔ", category: "nature", emoji: "🌧️", tip: "雨点一滴一滴从天上落下来。", evolution: "甲骨文「雨」像天空下雨，雨点纷纷落下。", words: ["下雨", "雨伞", "大雨"], strokeCount: 8 },
  { char: "风", pinyin: "fēng", category: "nature", emoji: "🌬️", tip: "风吹来了，树叶轻轻摇。", evolution: "甲骨文「风」借「凤」表示，后简化成现在的样子。", words: ["大风", "风筝", "刮风"], strokeCount: 4 },

  // ===== 身体 =====
  { char: "人", pinyin: "rén", category: "body", emoji: "🧍", tip: "一个人迈开腿站立。", evolution: "甲骨文「人」像一个人侧身站立、垂手的样子。", words: ["大人", "人们", "好人"], strokeCount: 2 },
  { char: "口", pinyin: "kǒu", category: "body", emoji: "👄", tip: "像张开的嘴巴。", evolution: "甲骨文「口」像张开的嘴。", words: ["口水", "门口", "开口"], strokeCount: 3 },
  { char: "手", pinyin: "shǒu", category: "body", emoji: "✋", tip: "张开手掌，五根手指。", evolution: "金文「手」像张开的手掌和手指。", words: ["小手", "洗手", "手心"], strokeCount: 4 },
  { char: "足", pinyin: "zú", category: "body", emoji: "🦶", tip: "上面是膝盖，下面是脚。", evolution: "甲骨文「足」像腿和脚。", words: ["足球", "手足", "满足"], strokeCount: 7 },
  { char: "目", pinyin: "mù", category: "body", emoji: "👁️", tip: "竖起来看，像一只眼睛。", evolution: "甲骨文「目」是眼睛的形状。", words: ["目光", "目标", "耳目"], strokeCount: 5 },
  { char: "耳", pinyin: "ěr", category: "body", emoji: "👂", tip: "像一只耳朵的形状。", evolution: "甲骨文「耳」像耳朵的轮廓。", words: ["耳朵", "木耳", "耳机"], strokeCount: 6 },
  { char: "头", pinyin: "tóu", category: "body", emoji: "👤", tip: "人最重要的地方是头。", evolution: "繁体「頭」由「頁」(头)组成，简体简化成「头」。", words: ["头发", "点头", "石头"], strokeCount: 5 },
  { char: "心", pinyin: "xīn", category: "body", emoji: "❤️", tip: "像一颗跳动的爱心。", evolution: "甲骨文「心」像心脏的形状。", words: ["爱心", "小心", "开心"], strokeCount: 4 },

  // ===== 动物 =====
  { char: "牛", pinyin: "niú", category: "animal", emoji: "🐮", tip: "牛头上有两只弯弯的角。", evolution: "甲骨文「牛」像牛头，突出两只角。", words: ["牛奶", "小牛", "水牛"], strokeCount: 4 },
  { char: "马", pinyin: "mǎ", category: "animal", emoji: "🐴", tip: "像一匹奔跑的马。", evolution: "甲骨文「马」像马的全身，有头、鬃毛和腿。", words: ["小马", "马路", "马上"], strokeCount: 3 },
  { char: "羊", pinyin: "yáng", category: "animal", emoji: "🐑", tip: "羊头上有两只角。", evolution: "甲骨文「羊」像羊头，突出羊角。", words: ["山羊", "绵羊", "羊毛"], strokeCount: 6 },
  { char: "鸟", pinyin: "niǎo", category: "animal", emoji: "🐦", tip: "像一只站在枝头的小鸟。", evolution: "甲骨文「鸟」像一只鸟，有嘴、翅膀和尾巴。", words: ["小鸟", "鸟儿", "飞鸟"], strokeCount: 5 },
  { char: "鱼", pinyin: "yú", category: "animal", emoji: "🐟", tip: "像一条游动的小鱼。", evolution: "甲骨文「鱼」像鱼的全身，有鳞片和尾巴。", words: ["小鱼", "鱼儿", "金鱼"], strokeCount: 8 },
  { char: "虫", pinyin: "chóng", category: "animal", emoji: "🐛", tip: "像一条弯弯的小虫子。", evolution: "甲骨文「虫」像一条蛇或虫子。", words: ["小虫", "虫子", "毛毛虫"], strokeCount: 6 },
  { char: "狗", pinyin: "gǒu", category: "animal", emoji: "🐶", tip: "小狗是人类的好朋友。", evolution: "甲骨文用「犬」表示狗，像狗的侧影。", words: ["小狗", "狗狗", "热狗"], strokeCount: 8 },
  { char: "兔", pinyin: "tù", category: "animal", emoji: "🐰", tip: "兔子有长长的耳朵。", evolution: "甲骨文「兔」像兔子，突出长耳朵和短尾巴。", words: ["兔子", "白兔", "小兔"], strokeCount: 8 },

  // ===== 家庭·称谓 =====
  { char: "爸", pinyin: "bà", category: "family", emoji: "👨", tip: "「巴」提示读音，爸爸是一家之主。", evolution: "「爸」是形声字，「父」表义、「巴」表声。", words: ["爸爸", "老爸", "爸妈"], strokeCount: 8 },
  { char: "妈", pinyin: "mā", category: "family", emoji: "👩", tip: "「马」提示读音，妈妈最亲。", evolution: "「妈」是形声字，「女」表义、「马」表声。", words: ["妈妈", "老妈", "爸妈"], strokeCount: 6 },
  { char: "家", pinyin: "jiā", category: "family", emoji: "🏠", tip: "屋顶下面有房子，住着一家人。", evolution: "甲骨文「家」是房子里面有一头猪(豕)，有房有畜就是家。", words: ["家庭", "回家", "大家"], strokeCount: 10 },
  { char: "儿", pinyin: "ér", category: "family", emoji: "👶", tip: "像小宝宝的头。", evolution: "甲骨文「儿」像婴儿头顶尚未合闭的囟门。", words: ["儿子", "儿童", "女儿"], strokeCount: 2 },
  { char: "子", pinyin: "zǐ", category: "family", emoji: "👶", tip: "像裹在襁褓里的小宝宝。", evolution: "甲骨文「子」像婴儿裹在襁褓中。", words: ["孩子", "儿子", "果子"], strokeCount: 3 },
  { char: "女", pinyin: "nǚ", category: "family", emoji: "👧", tip: "像一位女子安静地坐着。", evolution: "甲骨文「女」像女子跪坐、双手交叉的样子。", words: ["女儿", "女生", "女孩"], strokeCount: 3 },
  { char: "爷", pinyin: "yé", category: "family", emoji: "👴", tip: "「耶」的右边提示读音，爷爷最慈祥。", evolution: "「爷」是形声字，「父」表义、「耶」表声。", words: ["爷爷", "老爷", "少爷"], strokeCount: 6 },
  { char: "奶", pinyin: "nǎi", category: "family", emoji: "👵", tip: "「乃」提示读音，奶奶最温柔。", evolution: "「奶」是形声字，「女」表义、「乃」表声。", words: ["奶奶", "牛奶", "奶茶"], strokeCount: 5 },

  // ===== 方位 =====
  { char: "上", pinyin: "shàng", category: "direction", emoji: "⬆️", tip: "一横是地面，上面有一条线。", evolution: "甲骨文「上」用短横在长横之上表示上方。", words: ["上面", "上学", "上山"], strokeCount: 3 },
  { char: "下", pinyin: "xià", category: "direction", emoji: "⬇️", tip: "一横是地面，下面有东西。", evolution: "甲骨文「下」用短横在长横之下表示下方。", words: ["下面", "下雨", "下车"], strokeCount: 3 },
  { char: "左", pinyin: "zuǒ", category: "direction", emoji: "⬅️", tip: "左手拿工具干活。", evolution: "甲骨文「左」像左手。", words: ["左边", "左手", "左右"], strokeCount: 5 },
  { char: "右", pinyin: "yòu", category: "direction", emoji: "➡️", tip: "右手拿筷子吃饭。", evolution: "甲骨文「右」像右手。", words: ["右边", "右手", "左右"], strokeCount: 5 },
  { char: "中", pinyin: "zhōng", category: "direction", emoji: "🎯", tip: "一根旗杆插在中间。", evolution: "甲骨文「中」像一面旗帜，旗杆穿过中间。", words: ["中间", "中心", "中国"], strokeCount: 4 },
  { char: "前", pinyin: "qián", category: "direction", emoji: "🔝", tip: "前进的方向在前面。", evolution: "「前」由「止」(脚)和「舟」组成，表示乘船前进。", words: ["前面", "前进", "之前"], strokeCount: 9 },
  { char: "后", pinyin: "hòu", category: "direction", emoji: "🔙", tip: "身后就是后面。", evolution: "「后」古文字与行动有关，表示先后。", words: ["后面", "后来", "前后"], strokeCount: 6 },

  // ===== 大小·多少 =====
  { char: "大", pinyin: "dà", category: "size", emoji: "🐘", tip: "人张开双臂，表示很大。", evolution: "甲骨文「大」像人张开双臂站立。", words: ["大人", "大小", "大象"], strokeCount: 3 },
  { char: "小", pinyin: "xiǎo", category: "size", emoji: "🐭", tip: "像细小的沙粒。", evolution: "甲骨文「小」像细小的微粒。", words: ["小孩", "大小", "小心"], strokeCount: 3 },
  { char: "多", pinyin: "duō", category: "size", emoji: "➕", tip: "两个「夕」叠在一起，表示很多。", evolution: "甲骨文「多」由两个「夕」(肉块)组成，表示数量多。", words: ["多少", "许多", "很多"], strokeCount: 6 },
  { char: "少", pinyin: "shǎo", category: "size", emoji: "➖", tip: "东西不多就是少。", evolution: "甲骨文「少」像细小的颗粒，表示不多。", words: ["多少", "少数", "少见"], strokeCount: 4 },

  // ===== 生活·动作 =====
  { char: "吃", pinyin: "chī", category: "action", emoji: "🍚", tip: "嘴巴吃东西。", evolution: "「吃」由「口」和「乞」组成，口表示用嘴。", words: ["吃饭", "好吃", "小吃"], strokeCount: 6 },
  { char: "喝", pinyin: "hē", category: "action", emoji: "🥤", tip: "用嘴巴喝水。", evolution: "「喝」由「口」和「曷」组成，口表示用嘴。", words: ["喝水", "喝奶", "喝茶"], strokeCount: 12 },
  { char: "走", pinyin: "zǒu", category: "action", emoji: "🚶", tip: "像人迈开步子走路。", evolution: "甲骨文「走」像人摆动双臂奔跑。", words: ["走路", "行走", "走开"], strokeCount: 7 },
  { char: "跑", pinyin: "pǎo", category: "action", emoji: "🏃", tip: "迈开大步向前跑。", evolution: "「跑」由「足」(脚)和「包」组成，足表示用脚。", words: ["跑步", "跑开", "奔跑"], strokeCount: 12 },
  { char: "看", pinyin: "kàn", category: "action", emoji: "👀", tip: "手搭在眼睛上看远方。", evolution: "「看」由「手」和「目」组成，手搭在眼睛上方远望。", words: ["看书", "看见", "好看"], strokeCount: 9 },
  { char: "听", pinyin: "tīng", category: "action", emoji: "🎧", tip: "用耳朵认真听。", evolution: "「听」由「口」和「斤」组成，表示听人说话。", words: ["听说", "听见", "好听"], strokeCount: 7 },
  { char: "说", pinyin: "shuō", category: "action", emoji: "🗣️", tip: "用嘴巴说话。", evolution: "「说」由「讠」(言)和「兑」组成，言表示说话。", words: ["说话", "听说", "小说"], strokeCount: 9 },
  { char: "笑", pinyin: "xiào", category: "action", emoji: "😄", tip: "脸上笑开了花。", evolution: "「笑」由「竹」和「夭」组成，像风吹竹叶弯曲的样子。", words: ["笑声", "微笑", "笑话"], strokeCount: 10 },
  { char: "开", pinyin: "kāi", category: "action", emoji: "🔓", tip: "像把门打开。", evolution: "「开」像双手把门闩拉开。", words: ["开门", "开心", "打开"], strokeCount: 4 },
  { char: "关", pinyin: "guān", category: "action", emoji: "🔒", tip: "把门关上。", evolution: "「关」像用门闩把门插上。", words: ["关门", "关心", "开关"], strokeCount: 6 },
  { char: "门", pinyin: "mén", category: "action", emoji: "🚪", tip: "像两扇大门。", evolution: "甲骨文「门」像两扇对开的门。", words: ["大门", "门口", "开门"], strokeCount: 3 },
  { char: "车", pinyin: "chē", category: "action", emoji: "🚗", tip: "像一辆小汽车。", evolution: "甲骨文「车」像一辆有两轮的车。", words: ["汽车", "火车", "骑车"], strokeCount: 4 },

  // ===== 颜色 =====
  { char: "红", pinyin: "hóng", category: "color", emoji: "🔴", tip: "红红的花朵。", evolution: "「红」由「纟」(丝)和「工」组成，本指红色丝线。", words: ["红色", "红花", "红绿灯"], strokeCount: 6 },
  { char: "黄", pinyin: "huáng", category: "color", emoji: "🟡", tip: "黄黄的土地。", evolution: "「黄」古文字像一块玉佩，表示黄色。", words: ["黄色", "黄花", "蛋黄"], strokeCount: 11 },
  { char: "蓝", pinyin: "lán", category: "color", emoji: "🔵", tip: "蓝蓝的天空。", evolution: "「蓝」由「艹」(草)和「监」组成，本指蓝色染料植物。", words: ["蓝色", "蓝天", "蓝莓"], strokeCount: 13 },
  { char: "白", pinyin: "bái", category: "color", emoji: "⚪", tip: "白白的云朵。", evolution: "甲骨文「白」像拇指或日光，表示白色。", words: ["白色", "白云", "白天"], strokeCount: 5 },
  { char: "黑", pinyin: "hēi", category: "color", emoji: "⚫", tip: "黑黑的夜晚。", evolution: "「黑」古文字像火焰熏黑烟囱，表示黑色。", words: ["黑色", "黑夜", "黑白"], strokeCount: 12 },

  // ===== 季节 =====
  { char: "春", pinyin: "chūn", category: "season", emoji: "🌸", tip: "春天万物发芽。", evolution: "甲骨文「春」像草木在阳光下发芽。", words: ["春天", "春节", "春风"], strokeCount: 9 },
  { char: "夏", pinyin: "xià", category: "season", emoji: "☀️", tip: "夏天太阳火辣辣。", evolution: "甲骨文「夏」像一个人，表示夏天炎热。", words: ["夏天", "夏日", "盛夏"], strokeCount: 10 },
  { char: "秋", pinyin: "qiū", category: "season", emoji: "🍁", tip: "秋天庄稼成熟。", evolution: "甲骨文「秋」像蟋蟀或庄稼成熟，表示秋天。", words: ["秋天", "秋风", "秋季"], strokeCount: 9 },
  { char: "冬", pinyin: "dōng", category: "season", emoji: "❄️", tip: "冬天结冰下雪。", evolution: "甲骨文「冬」像绳子打结，表示一年之末、冬天。", words: ["冬天", "冬季", "冬至"], strokeCount: 5 },
]

export const allChars = characters

export function getCategory(id: string): HanziCategory | undefined {
  return categories.find((c) => c.id === id)
}

export function getCharByChar(char: string): HanziChar | undefined {
  return characters.find((c) => c.char === char)
}

export function getCharsByCategory(id: string): HanziChar[] {
  return characters.filter((c) => c.category === id)
}

export function searchChars(query: string): HanziChar[] {
  const q = query.trim().toLowerCase()
  if (!q) return characters
  return characters.filter((c) => {
    return (
      c.char === q ||
      c.pinyin.toLowerCase().includes(q) ||
      c.words.some((w) => w.includes(query.trim())) ||
      getCategory(c.category)?.name.includes(query.trim())
    )
  })
}

export const totalStrokeCount = characters.reduce((sum, c) => sum + c.strokeCount, 0)
