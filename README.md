# Chart Web - 音游铺面管理系统

> [!NOTE]
> 本项目由 AI 辅助编写。 这个文档也是。

一个基于 Vue 3 + TypeScript + Vite 构建的现代化音游铺面管理系统前端。

## 🚀 项目简介

Chart Web 是一个专为音游爱好者设计的铺面管理系统，提供直观的界面来浏览、搜索和管理各种音游铺面。项目采用现代化的前端技术栈，具有优秀的开发体验和性能表现。

## ✨ 功能特性

- 🎵 **多频道支持** - 支持多个音游频道的铺面管理
- 📊 **铺面浏览** - 直观的铺面列表和详情展示
- 🔍 **搜索筛选** - 支持按难度、级别等条件筛选铺面
- 📱 **响应式设计** - 适配各种设备屏幕
- ⚡ **快速加载** - 基于 Vite 的快速开发构建
- 🛠 **类型安全** - 完整的 TypeScript 支持

## 🛠 技术栈

- **前端框架**: Vue 3 + Composition API
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **代码规范**: Prettier
- **包管理器**: npm

## 📦 项目结构

```
chart-web/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 公共组件
│   ├── views/             # 页面组件
│   │   ├── HomePage.vue   # 首页
│   │   ├── ChannelPage.vue # 频道页
│   │   └── ChartPage.vue  # 铺面详情页
│   ├── router/            # 路由配置
│   │   └── index.ts
│   ├── config/            # 配置文件
│   │   └── api.ts         # API 配置
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── package.json           # 项目依赖
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- npm: 最新版本

### 安装依赖

```bash
npm install
```

### 开发环境

1. 复制环境配置文件：

```bash
cp .env.example .env.development
```

2. 配置 API 基础 URL（在 `.env.development` 中）：

```env
VITE_API_BASE_URL=http://localhost:8787
```

3. 启动开发服务器：

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 生产构建

```bash
# 类型检查和构建
npm run build

# 预览生产版本
npm run preview
```

### 静态页面部署

> [!IMPORTANT]
> 如需部署到各种 Pages 服务（GitHub Pages、Cloudflare Pages、Vercel 等），请先 Fork 本项目到您自己的仓库，然后根据具体平台进行配置：

#### GitHub Pages

1. 在仓库设置中启用 GitHub Pages
2. 选择构建分支（通常是 `gh-pages` 或 `main` 分支的 `dist` 目录）
3. 配置正确的 base URL 以适应 GitHub Pages 的路径结构

#### Cloudflare Pages

1. 连接您的 GitHub 仓库到 Cloudflare Pages
2. 设置构建命令：`npm run build`
3. 设置构建输出目录：`dist`
4. 配置环境变量（如需要）

#### Vercel

1. 导入您的 GitHub 仓库到 Vercel
2. Vercel 会自动检测 Vue 项目并配置构建设置
3. 配置环境变量（如需要）

#### 其他 Pages 服务

大多数 Pages 服务都支持静态站点部署，通常需要：

- 构建命令：`npm run build`
- 输出目录：`dist`
- 环境变量配置（如 `VITE_API_BASE_URL`）

注意：由于本项目为私有仓库，您需要 Fork 到自己的公开仓库才能使用各种 Pages 服务。

## 📖 路由说明

- `/` - 首页，显示站点信息和频道列表
- `/:channel` - 频道页，显示指定频道的铺面列表
- `/:channel/:id` - 铺面详情页，显示具体铺面的详细信息

## 🔧 开发脚本

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产版本
npm run preview

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

## 🎯 API 接口

项目通过 RESTful API 与后端服务通信，主要接口包括：

- `GET /` - 获取站点信息
- `GET /:channel` - 获取频道信息
- `GET /:channel/:id` - 获取铺面详情
- `GET /:channel/:id/:fileType` - 获取文件下载链接
