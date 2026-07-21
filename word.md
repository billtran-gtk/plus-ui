# 桦灏自动标签转换系统 - PC 前端项目文档

## 一、项目概述

- **项目名称**: ruoyi-vue-plus (桦灏自动标签转换系统)
- **项目版本**: 5.5.3-2.5.3
- **项目描述**: 基于 RuoYi-Vue-Plus 多租户管理系统的定制化前端项目
- **开源协议**: MIT

---

## 二、核心技术栈及版本

### 2.1 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.22 | 前端核心框架 |
| TypeScript | ~5.9.3 | 开发语言 |
| Vite | 6.4.1 | 构建工具 |
| Element Plus | 2.11.7 | UI 组件库 |
| Vue Router | 4.6.3 | 路由管理 |
| Pinia | 3.0.3 | 状态管理 |

### 2.2 重要依赖

| 技术 | 版本 | 说明 |
|------|------|------|
| axios | 1.13.1 | HTTP 请求库 |
| vue-i18n | 11.1.12 | 国际化（支持中文/英文/越南语） |
| echarts | 5.6.0 | 图表库 |
| vxe-table | 4.17.7 | 高性能表格组件 |
| @vueuse/core | 13.9.0 | Vue 组合式 API 工具集 |
| jsencrypt | 3.5.4 | RSA 加密 |
| crypto-js | 4.2.0 | 加密工具 |
| @vueup/vue-quill | 1.2.0 | 富文本编辑器 |
| vue-cropper | 1.1.4 | 图片裁剪 |
| vue-json-pretty | 2.6.0 | JSON 格式化展示 |
| highlight.js | 11.11.1 | 代码高亮 |
| animate.css | 4.1.1 | CSS 动画库 |
| screenfull | 6.0.2 | 全屏切换 |
| nprogress | 0.2.0 | 页面加载进度条 |
| file-saver | 2.0.5 | 文件下载保存 |
| js-cookie | 3.0.5 | Cookie 操作 |

### 2.3 开发依赖

| 技术 | 版本 | 说明 |
|------|------|------|
| sass | 1.93.3 | CSS 预处理器 |
| unocss | 66.5.4 | 原子化 CSS 引擎 |
| unplugin-auto-import | 19.3.0 | API 自动导入 |
| unplugin-vue-components | 28.8.0 | 组件自动注册 |
| unplugin-icons | 22.5.0 | 图标自动导入 |
| eslint | 9.39.1 | 代码检查 |
| prettier | 3.6.2 | 代码格式化 |
| vitest | 3.2.4 | 单元测试框架 |
| vite-plugin-compression | 0.5.1 | 构建压缩（gzip/brotli） |
| vite-plugin-svg-icons-ng | ^1.5.2 | SVG 图标处理 |
| autoprefixer | 10.4.21 | CSS 浏览器兼容前缀 |

### 2.4 运行环境要求

| 项目 | 要求 |
|------|------|
| Node.js | >= 20.15.0 |
| npm | >= 8.19.0 |
| 包管理器 | yarn（项目脚本使用 yarn） |

### 2.5 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | >= 87 |
| Edge | >= 88 |
| Safari | >= 14 |
| Firefox | >= 78 |

---

## 三、项目结构

```
plus-ui/
├── bin/                    # Windows 批处理脚本
│   ├── build.bat           # 生产构建脚本
│   ├── package.bat         # 依赖安装脚本
│   └── run-web.bat         # 开发启动脚本
├── public/                 # 静态资源（不经过构建）
│   ├── templates/          # 模板文件
│   └── favicon.ico         # 网站图标
├── src/                    # 源代码
│   ├── api/                # API 接口定义
│   ├── assets/             # 静态资源（经过构建）
│   ├── components/         # 公共组件
│   ├── directive/          # 自定义指令
│   ├── enums/              # 枚举定义
│   ├── hooks/              # 组合式函数
│   ├── lang/               # 国际化语言包
│   ├── layout/             # 布局组件
│   ├── plugins/            # 插件注册
│   ├── router/             # 路由配置
│   ├── store/              # Pinia 状态管理
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   ├── main.ts             # 应用入口
│   ├── permission.ts       # 路由权限控制
│   └── settings.ts         # 全局配置
├── vite/                   # Vite 插件配置
│   └── plugins/            # 构建插件
├── .env.development        # 开发环境变量
├── .env.production         # 生产环境变量
├── index.html              # HTML 入口
├── tsconfig.json           # TypeScript 配置
├── uno.config.ts           # UnoCSS 配置
├── vite.config.ts          # Vite 配置
└── package.json            # 项目配置
```

---

## 四、环境配置

### 4.1 开发环境 (.env.development)

| 配置项 | 值 | 说明 |
|--------|-----|------|
| VITE_APP_TITLE | 桦灏自动标签转换系统 | 页面标题 |
| VITE_APP_ENV | development | 环境标识 |
| VITE_APP_BASE_API | /dev-api | API 前缀 |
| VITE_APP_CONTEXT_PATH | / | 应用访问路径 |
| VITE_APP_PORT | 81 | 开发服务器端口 |
| VITE_APP_ENCRYPT | true | 接口加密开关 |
| VITE_APP_WEBSOCKET | false | WebSocket 开关 |
| VITE_APP_SSE | true | SSE 推送开关 |

- 开发模式下，API 请求通过 Vite 代理转发至 `http://localhost:8080`

### 4.2 生产环境 (.env.production)

| 配置项 | 值 | 说明 |
|--------|-----|------|
| VITE_APP_TITLE | HuaHao | 页面标题 |
| VITE_APP_ENV | production | 环境标识 |
| VITE_APP_BASE_API | /prod-api | API 前缀 |
| VITE_APP_CONTEXT_PATH | / | 应用访问路径 |
| VITE_BUILD_COMPRESS | gzip | 构建压缩方式 |
| VITE_APP_PORT | 80 | 端口 |
| VITE_APP_ENCRYPT | true | 接口加密开关 |
| VITE_APP_WEBSOCKET | false | WebSocket 开关 |
| VITE_APP_SSE | true | SSE 推送开关 |

---

## 五、构建与发布

### 5.1 NPM Scripts

```bash
# 开发模式启动
npm run dev
# 等同于: vite serve --mode development

# 生产环境构建
npm run build:prod
# 等同于: vite build --mode production

# 开发环境构建
npm run build:dev
# 等同于: vite build --mode development

# 预览构建产物
npm run preview

# ESLint 代码检查
npm run lint:eslint

# ESLint 自动修复
npm run lint:eslint:fix

# Prettier 代码格式化
npm run prettier
```

### 5.2 Windows 批处理脚本

项目 `bin/` 目录下提供了 Windows 批处理脚本：

| 脚本 | 命令 | 说明 |
|------|------|------|
| `bin/package.bat` | `yarn --registry=https://registry.npmmirror.com` | 安装依赖（使用国内镜像） |
| `bin/run-web.bat` | `yarn dev` | 启动开发服务器 |
| `bin/build.bat` | `yarn build:prod` | 生产环境构建 |

### 5.3 构建产物

- 构建输出目录: `dist/`
- 生产构建启用 **gzip 压缩**（通过 `vite-plugin-compression`），生成 `.gz` 文件
- 同时支持 brotli 压缩（配置 `VITE_BUILD_COMPRESS=brotli` 或 `gzip,brotli`）

### 5.4 Vite 构建插件

| 插件 | 说明 |
|------|------|
| @vitejs/plugin-vue | Vue 3 SFC 支持 |
| vite-plugin-vue-devtools | Vue 开发者工具 |
| unocss | 原子化 CSS 引擎 |
| unplugin-auto-import | API 自动导入（Vue/Router/Pinia 等无需手动 import） |
| unplugin-vue-components | 组件自动注册（Element Plus 组件按需加载） |
| unplugin-icons | 图标按需导入 |
| vite-plugin-svg-icons-ng | SVG Sprite 图标 |
| vite-plugin-compression | 静态资源压缩（gzip/brotli） |
| unplugin-vue-setup-extend-plus | setup 语法扩展（支持 setup name） |

### 5.5 部署流程

1. **安装依赖**:
   ```bash
   yarn --registry=https://registry.npmmirror.com
   ```
   或
   ```bash
   npm install
   ```

2. **构建生产包**:
   ```bash
   yarn build:prod
   ```
   或
   ```bash
   npm run build:prod
   ```

3. **部署**:
   - 将 `dist/` 目录下的文件部署到 Web 服务器（如 Nginx）
   - Nginx 需配置反向代理，将 `/prod-api` 转发至后端服务
   - 如启用 gzip，Nginx 需开启 `gzip_static on` 以支持 `.gz` 预压缩文件
   - SPA 应用需配置所有路由 fallback 到 `index.html`

4. **Nginx 参考配置**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /usr/share/nginx/html;
       index index.html;

       # gzip 预压缩
       gzip_static on;

       # API 反向代理
       location /prod-api/ {
           proxy_pass http://backend-server:8080/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       # SPA 路由 fallback
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## 六、关键特性

| 特性 | 说明 |
|------|------|
| 多租户 | 支持多租户隔离管理 |
| 国际化 | 支持中文（zh_CN）、英文（en_US）、越南语（vi_VN） |
| RSA 加密 | 前后端接口数据 RSA 加密传输 |
| SSE 推送 | 基于 Server-Sent Events 的实时消息推送 |
| WebSocket | 可选的 WebSocket 实时通信（默认关闭） |
| 权限控制 | 基于路由和按钮级别的权限控制 |
| 暗黑模式 | 支持暗黑主题切换 |
| 开发者工具保护 | 生产环境防止开发者工具调试 |
