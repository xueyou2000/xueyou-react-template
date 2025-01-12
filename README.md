# React项目模板

> 注意 `lint-staged` 只会检查 git 暂存区(staged)的文件，而不是所有文件。如果历史文件有lint错误，请手动执行`npm run lint`
> 并且 `lint-staged` 会自动尝试修复代码, 比如格式化

本模板使用技术(使用最新技术):

- 构建： Turborepo, RsBuild, PNPM多仓管理
- 前端框架: React V19
- 性能优化: React Scan
- 状态管理: Zustand
- 路由: React Router V7
- 样式: SCSS
- 图标: React Icons
- 代码规范: ESLint, Stylelint, Prettier, Husky, Commitlint, Branchlint

## 使用方式

### 1. 安装依赖

```bash
pnpm i
```

### 2. 启动开发环境

默认端口8080, 访问 http://localhost:8080

```bash
pnpm dev
```

### 3. 启动生产环境

默认端口3000, 访问 http://localhost:3000

```bash
pnpm build

# 本地预览
pnpm preview
```

### 4. 分析构建产物

```bash
pnpm analyze
```

### 5. 服务端渲染(开发模式)

默认端口3000, 访问 http://localhost:3000

右键查看源码，能够看到的确是服务端渲染了内容。然后再与客户端脚本进行Hybrid渲染。

```bash
pnpm dev:ssr
```

### 6. 服务端渲染(生产模式)

```bash
# 首先构建全部
pnpm build:all

# 然后启动服务端渲染服务器
pnpm build:ssr
```

访问 http://localhost:3000 可以看见服务端渲染的html内容。

> 这只是一个用于演示的例子，实际项目中，可以改造express， 保留一个api服务，用于编译对应路径的html内容

## todo

- [x] 优化服务端渲染首加载css闪屏的问题
- [ ] 增加service-worker
- [ ] 使用copy插件，manifest文件复制到dist目录
- [ ] 主动构建全部页面, 发布github pages
