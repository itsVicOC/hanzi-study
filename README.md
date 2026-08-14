# 汉字小课堂 · 中班识字启蒙

面向**幼儿园中班（4–5 岁）**孩子的亲子汉字启蒙学习网站。家长陪伴小朋友，通过**象形识字 + 字卡游戏**，每天 10 分钟，快乐认字、不超前、不小学化。

适配 **PC 端与移动端**，使用 **shadcn/ui** 构建。

> 🌐 在线访问：<https://itsvicoc.github.io/hanzi-study/>

## 功能

- **汉字库**：约 78 个常用汉字，按 10 个主题分类（数字、自然、身体、动物、家庭、方位、大小多少、生活动作、颜色、季节），支持搜索与「只看已学」筛选。
- **汉字详情页**：大字展示、拼音、发音朗读、象形记忆小妙招、字源演变、组词（点击朗读）、**笔画顺序动画**（hanzi-writer，含离线回退）。
- **三个学习游戏**：字卡翻翻看、字图配对、听音找字，可按主题切换，闯关式鼓励反馈。
- **学习进度**：记录「已学会 / 收藏」和游戏最佳成绩，按分类展示进度，数据保存在浏览器本地（localStorage）。
- **家长指南**：中班认知特点、6 种识字方法、每日 10 分钟示例、常见误区与注意事项。

## 技术栈

- Vite + React 18 + TypeScript
- **shadcn/ui**（Radix UI 组件）+ Tailwind CSS v4
- react-router-dom（HashRouter，便于静态部署）
- Web Speech API（浏览器中文语音合成，无需音频资源）
- hanzi-writer（笔画动画，单字数据从 CDN 懒加载）

## 快速开始

```bash
pnpm install        # 安装依赖
pnpm dev            # 本地开发（http://localhost:5173）
pnpm build          # 类型检查 + 生产构建（输出 dist/）
pnpm preview        # 本地预览生产构建
```

> 需要 Node.js 22+。若 `pnpm` 不可用，可改用 `npm install` / `npm run dev`。

## 调研结论（内容依据）

**中班（4–5 岁）认知特点**：具体形象思维为主（认字需借助图片/实物/象形联想）；注意力仅 10–15 分钟（需短时高频、游戏化）；文字意识刚萌芽（以兴趣启蒙为主）。教育部明确要求幼儿园**不超前、不小学化**——不以机械抄写、强制背诵、考试排名方式教学。

**识字方法**：象形/字源识字、字卡游戏、游戏化闯关、亲子共读、生活识字、儿歌韵律，以及「每天 10 分钟」的节奏。

**汉字清单（约 78 字，10 类）**：

| 主题 | 汉字 |
|------|------|
| 数字 | 一 二 三 四 五 六 七 八 九 十 |
| 自然·天气 | 日 月 山 水 火 木 土 天 地 云 雨 风 |
| 身体 | 人 口 手 足 目 耳 头 心 |
| 动物 | 牛 马 羊 鸟 鱼 虫 狗 兔 |
| 家庭·称谓 | 爸 妈 家 儿 子 女 爷 奶 |
| 方位 | 上 下 左 右 中 前 后 |
| 大小·多少 | 大 小 多 少 |
| 生活·动作 | 吃 喝 走 跑 看 听 说 笑 开 关 门 车 |
| 颜色 | 红 黄 蓝 白 黑 |
| 季节 | 春 夏 秋 冬 |

完整字库与字源讲解见 `src/data/characters.ts`。

## 目录结构

```
src/
├─ data/characters.ts        # 汉字数据 + 分类 + 检索
├─ lib/                      # cn / speech / storage / games / nav
├─ hooks/                    # useProgress（进度状态）、useSpeech（发音）
├─ components/
│  ├─ ui/                    # shadcn/ui 组件
│  ├─ layout/                # AppShell / Header / MobileNav / Footer
│  ├─ char/                  # CharCard / CharBig / StrokeDemo
│  └─ games/                 # 翻翻看 / 配对 / 听音找字
└─ pages/                    # Home / Library / CharacterDetail / Games / Progress / Guide
```

## 说明

- **发音**：使用浏览器 `speechSynthesis`（`zh-CN`），个别设备无中文语音时按钮会静默降级，不影响其它功能。
- **笔画动画**：单字笔画数据从 jsdelivr CDN 懒加载；离线或加载失败时回退为「笔画数 + 描一描」提示。
- **进度存储**：保存在本设备浏览器 localStorage 中，清除浏览器数据或点击「重置进度」会清空。
