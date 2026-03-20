# 📄 Self Resume

个人简历网站，支持中英双语切换、亮/暗主题，本地部署开箱即用。

<img src="/readme/self-resume.png" alt="Self-resume Preview" />

## ✨ 特性

- 🌍 **中英双语**：一键切换中文/英文简历，数据独立维护
- 🌙 **主题跟随系统**：默认跟随 `prefers-color-scheme`，可手动切换白天/夜晚
- 📱 **移动端适配**：小屏自动切换为全宽布局，字号与内边距自适应
- 🎨 **A4 排版**：精准还原 PDF 简历版式，打印输出干净无页眉页脚
- 📋 **完整简历结构**：工作经历、教育（含专利/论文）、技能分类、项目、奖项、证书
- 🐳 **Docker 支持**：配套 Dockerfile与docker-compose.yml

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm（推荐）

### 安装与启动

```bash
# 克隆或解压项目
cd self-resume

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看简历。

### 生产构建

```bash
pnpm build
pnpm start
```

## ✏️ 修改简历内容

简历数据以 JSON 文件形式存放在 `public/` 目录，**无需重新构建**即可生效：

| 文件 | 说明 |
|------|------|
| `public/resume-data.zh.json` | 中文简历数据 |
| `public/resume-data.en.json` | 英文简历数据 |

两份文件共享同一套字段结构（见下方[数据结构说明](#-数据结构说明)），各自独立维护内容。

> **Docker 部署用户**：将 `public/` 目录挂载为 volume，直接编辑 JSON 文件后刷新浏览器即可看到更改，无需 `docker compose up --build`。

### 添加 1 寸照片

将照片文件命名为 `avatar.jpg` 放入 `public/` 目录，然后在 JSON 数据中添加：

```json
"avatar": "/avatar.jpg"
```

## 📐 数据结构说明

```ts
ResumeData {
  // ── 基本信息 ──────────────────────────────
  name: string            // 姓名
  title: string           // 职位头衔
  tagline?: string        // 简短标语（显示在姓名下方）
  avatar?: string         // 1寸照片路径，如 "/avatar.jpg"
  location: string        // 所在城市

  // ── 联系方式 ──────────────────────────────
  email: string           // 邮箱（显示图标+文字，可点击）
  phone?: string          // 手机（显示图标+文字）
  wechat?: string         // 微信号（显示图标+文字）
  website?: string        // 个人网站（仅显示图标，可点击）
  linkedin?: string       // LinkedIn（仅显示图标）
  github?: string         // GitHub（仅显示图标）

  // ── 正文内容 ──────────────────────────────
  summary: string         // About 段落
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects?: Project[]
  awards?: Award[]
  certifications?: Certification[]
  languages?: Language[]
}

Experience {
  company: string
  title: string
  location: string
  employmentType?: string   // "Full-Time" | "Contract" | "Internship" 等
  startDate: string
  endDate: string
  current?: boolean
  description: string[]     // 工作内容，每条为一个字符串
  technologies?: string[]   // 技术标签（可选）
}

Education {
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string
  patents?: Patent[]        // 专利列表（可选）
  papers?: Paper[]          // 发表论文列表（可选）
}

Patent {
  authors: string           // 作者列表
  title: string             // 专利名称
  number?: string           // 专利号，如 "CN114791993B"
  status: string            // "授权" | "公开" | "参与，授权" 等
}

Paper {
  authors: string           // 作者列表
  title: string             // 论文标题
  journal: string           // 期刊/会议名称及卷期信息
  doi?: string              // DOI 链接（可点击）
  note?: string             // 期刊等级，如 "JCR Q1, IF = 9.40"
}

SkillCategory {
  category: string          // 分类名（纯中文会自动两端对齐）
  items: string[]           // 技能标签列表
}

Project {
  name: string
  description: string
  url?: string              // 不含协议，如 "github.com/user/repo"
  technologies?: string[]
}

Award {
  name: string
  date?: string
}

Certification {
  name: string
  issuer: string
  date: string
}

Language {
  name: string
  proficiency: string       // "母语" | "专业工作水平" 等
}
```

## 📁 项目结构

```
resume-site/
├── app/
│   ├── globals.css          # 全局样式、CSS 变量（亮/暗/系统主题）、移动端、打印样式
│   ├── layout.tsx           # 根布局，加载字体
│   ├── opengraph-image.tsx  # OG Card
│   └── page.tsx             # 首页：语言切换、主题切换、渲染简历
├── components/
│   └── Resume.tsx           # 简历核心组件（所有区块）
├── lib/
│   └── types.ts             # TypeScript 类型定义
├── public/
│   ├── favicons             # favicon
│   ├── resume-data.zh.json  # 中文简历数据 ← 在这里填写你的信息
│   ├── resume-data.en.json  # 英文简历数据 ← 英文版在这里
│   └── avatar.jpg           # 1寸照片（自行添加，可选）
├── Dockerfile               # 双阶段构建
├── docker-compose.yml       # 本地/服务器部署
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🐳 Docker 部署

### 本地 Docker

```bash
# 构建并启动
docker compose up -d --build

# 访问
http://localhost:3000

# 停止
docker compose down
```

### 挂载数据目录（推荐）

将 `public/` 挂载为 volume，修改 JSON 后无需重建镜像：

```yaml
# docker-compose.yml
services:
  resume:
    volumes:
      - ./public:/app/public
```

### 修改端口

编辑 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "3000:3000"   # 改左侧数字即可
```

### GitHub Actions 自动部署

在仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret | 说明 |
|--------|------|
| `DEPLOY_HOST` | 服务器 IP 或域名 |
| `DEPLOY_USER` | SSH 用户名（如 `ubuntu`） |
| `DEPLOY_KEY` | SSH 私钥（PEM 格式） |
| `DEPLOY_PORT` | SSH 端口，默认 `22`（可选） |

推送到 `main` 分支后自动触发：构建镜像 → 推送到 GHCR → SSH 热更新服务器。

## 🎨 自定义主题色

所有颜色通过 CSS 变量管理，在 `app/globals.css` 的 `:root`（亮色）和 `[data-theme="dark"]`（暗色）中修改：

```css
:root {
  --text-primary:  #111111;   /* 主文字 */
  --text-muted:    #6b7280;   /* 次要文字 */
  --border:        #e5e7eb;   /* 分割线 */
  --tag-bg:        #f3f4f6;   /* 技能标签背景 */
  --link:          #1a56db;   /* 链接色 */
  /* ... */
}
```

主题切换逻辑：
- **跟随系统**（默认）：读取 `prefers-color-scheme`，系统切换时实时响应
- **白天 / 夜晚**：手动覆盖，通过 `data-theme` attribute 写入 `<html>`
- 工具栏按钮循环切换：**跟随系统 → 白天 → 夜晚 → 跟随系统**

## 📜 License

MIT
