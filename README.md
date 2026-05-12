# Self Resume

一个基于 Next.js 的个人简历网站模板，支持中英文双语、亮色/暗色主题、A4 打印排版、浏览器 PDF 导出和 Docker 部署。

<img src="/readme/self-resume.png" alt="Self Resume Preview" />

## 功能特性

- 中英文双语：通过 `?lang=zh` / `?lang=en` 或页面按钮切换，数据分别维护在两份 JSON 中。
- 运行时读取简历数据：客户端从 `public/resume-data.zh.json` 和 `public/resume-data.en.json` 拉取数据，修改 JSON 后刷新页面即可看到结果。
- 主题切换：默认跟随系统 `prefers-color-scheme`，也可以手动切换亮色和暗色。
- A4 简历版式：页面预览按 A4 尺寸排版，并提供打印样式。
- PDF 导出：页面按钮调用 `/api/export-pdf`，使用本机 Chrome / Edge / Chromium 的 headless 打印能力生成 PDF；失败时回退到浏览器打印。
- Docker 支持：提供多阶段 `Dockerfile` 和 `docker-compose.yml`，生产镜像使用 Next.js standalone 输出，并内置 Chromium 供 PDF 导出使用。
- SEO / 分享图：包含 favicon、manifest、Open Graph metadata 和动态 `opengraph-image.tsx`。

## 技术栈

- Next.js `16.2.6`
- React `19.2.6`
- TypeScript
- Tailwind CSS `3.4`
- ESLint `9`
- pnpm
- lucide-react

## 快速开始

### 环境要求

- Node.js 20+
- pnpm

### 本地开发

```bash
pnpm install
pnpm dev
```

访问 <http://localhost:3000> 查看页面。

常用命令：

```bash
pnpm dev      # 启动开发服务器
pnpm build    # 生产构建
pnpm start    # 启动生产服务
pnpm lint     # ESLint 检查
```

## 修改简历内容

简历内容存放在 `public/` 目录：

| 文件 | 说明 |
| --- | --- |
| `public/resume-data.zh.json` | 中文简历数据 |
| `public/resume-data.en.json` | 英文简历数据 |
| `public/avatar.jpg` | 头像或一寸照，路径由 JSON 中的 `avatar` 字段引用 |

两份 JSON 使用同一套字段结构。开发模式下修改后刷新页面即可生效；Docker 部署时如果保留 `./public:/app/public:ro` 挂载，也可以直接更新宿主机上的 JSON 和头像文件。

头像示例：

```json
{
  "avatar": "/avatar.jpg"
}
```

## PDF 导出

页面顶部的 PDF 按钮会请求：

```text
/api/export-pdf?lang=zh
/api/export-pdf?lang=en
```

本地运行时需要机器上安装 Chrome、Edge 或 Chromium。也可以显式设置：

```bash
CHROME_EXECUTABLE_PATH=/path/to/chrome pnpm start
# 或
PUPPETEER_EXECUTABLE_PATH=/path/to/chromium pnpm start
```

Docker 镜像会安装 Alpine Chromium，并设置 `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser`。

## Docker 部署

本地构建并启动：

```bash
docker compose up -d --build
```

访问：

```text
http://localhost:3000
```

停止服务：

```bash
docker compose down
```

当前 `docker-compose.yml` 会把宿主机 `./public` 只读挂载到容器的 `/app/public`：

```yaml
volumes:
  - ./public:/app/public:ro
```

这意味着修改简历 JSON、头像、favicon 等静态资源后，通常只需要刷新页面，不需要重新构建镜像。修改应用代码、依赖或构建配置后才需要重新 build。

## GitHub Actions 部署

仓库包含 `.github/workflows/deploy.yml`，流程为：

1. 推送到 `main` 或手动触发 workflow。
2. 构建 Docker 镜像并推送到 GitHub Container Registry。
3. 通过 SSH 登录服务器，拉取最新镜像并执行 `docker compose up -d --no-build --pull never`。

需要在 GitHub 仓库的 `Settings -> Secrets and variables -> Actions` 中配置：

| Secret | 说明 |
| --- | --- |
| `DEPLOY_HOST` | 服务器 IP 或域名 |
| `DEPLOY_USER` | SSH 用户名 |
| `DEPLOY_KEY` | SSH 私钥，PEM 格式 |
| `DEPLOY_PORT` | SSH 端口，未配置时使用 `22` |

注意：workflow 中会把 GHCR 镜像地址写入 `IMAGE` 环境变量。服务器上的 compose 文件需要引用该变量，例如 `image: ${IMAGE}`；如果仍使用本仓库当前的 `image: self-resume:latest`，需要按自己的部署方式调整 workflow 或 compose。

## 项目结构

```text
self-resume/
├─ app/
│  ├─ api/export-pdf/route.ts   # PDF 导出接口
│  ├─ globals.css               # 全局样式、主题变量、A4/打印样式
│  ├─ layout.tsx                # 根布局与 metadata
│  ├─ opengraph-image.tsx       # Open Graph 分享图
│  └─ page.tsx                  # 服务端入口，读取 lang 参数
├─ components/
│  ├─ Resume.tsx                # 简历主体渲染组件
│  └─ ResumePageClient.tsx      # 客户端数据加载、语言/主题/PDF 控制
├─ lib/
│  └─ types.ts                  # 简历数据 TypeScript 类型
├─ public/
│  ├─ favicons/                 # favicon 和 web manifest
│  ├─ resume-data.zh.json       # 中文简历数据
│  ├─ resume-data.en.json       # 英文简历数据
│  └─ avatar.jpg                # 头像或一寸照
├─ readme/
│  └─ self-resume.png           # README 预览图
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ pnpm-lock.yaml
├─ tailwind.config.ts
├─ tsconfig.json
└─ next.config.mjs
```

## 数据结构

核心字段定义位于 `lib/types.ts`。JSON 文件建议保持下面的结构：

```ts
interface ResumeData {
  name: string;
  title: string;
  tagline?: string;
  avatar?: string;
  location: string;
  email: string;
  phone?: string;
  wechat?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects?: Project[];
  languages?: Language[];
  certifications?: Certification[];
  awards?: Award[];
}

interface Experience {
  company: string;
  title: string;
  location: string;
  employmentType?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string[];
  technologies?: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  courses?: string[];
  patents?: Patent[];
  papers?: Paper[];
}

interface Patent {
  authors: string;
  title: string;
  number?: string;
  status: string;
}

interface Paper {
  authors: string;
  title: string;
  journal: string;
  doi?: string;
  note?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface Award {
  name: string;
  level?: string;
  date?: string;
}
```

## 自定义样式

主题颜色集中在 `app/globals.css` 的 CSS 变量中：

```css
:root {
  --bg-page: #ffffff;
  --bg-resume: #ffffff;
  --text-primary: #111111;
  --text-secondary: #444444;
  --border: #e5e7eb;
  --link: #1a56db;
}

[data-theme="dark"] {
  --bg-page: #0f1117;
  --bg-resume: #1a1d27;
  --text-primary: #f0f0f0;
  --text-secondary: #c0c0c0;
  --border: #2d3141;
  --link: #60a5fa;
}
```

打印样式位于同一文件的 `@media print` 和 `@page` 中，默认按 A4 输出。

## License

MIT
