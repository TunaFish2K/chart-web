# Chart Web - 音游铺面管理系统

> [!NOTE]
> 本项目由 AI 辅助编写。

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
