# React项目模板

<br />
<p align="center">
    <img src="https://github.com/xueyou2000/xueyou-react-template/raw/main/application/public/icon.svg" alt="Logo" width="156" height="156">
  <h2 align="center" style="font-weight: 600">XueYou React Template</h2>

  <p align="center">
    紧跟最新版的React项目模板, 支持服务端预渲染
    <br />
    <a href="https://github.com/xueyou2000/xueyou-react-template/" target="blank"><strong>🌎 GitHub仓库</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://xueyou2000.github.io/xueyou-react-template/" target="blank"><strong>📦️ 在线预览</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://github.com/xueyou2000/i18n-framework-template" target="blank"><strong>🌎 国际化多入口版</strong></a>
  </p>
  <p align="center">
    <a href="https://github.com/xueyou2000/xueyou-react-template/README.md" target="blank"><strong>🇨🇳 简体中文</strong></a>
    <br />
  </p>
</p>

## 特性

- ⚙️ 构建： `Turborepo`, `RsBuild`, PNPM多仓管理
- 🚀 前端框架: `React` V19
- 🚀 性能优化: `React Scan`
- 📦 状态管理: `Zustand`
- 🛣️ 路由: `React Router` V7
- 🎨 样式: `SCSS`
- 📊 图标: `React Icons`
- 🛠️ 服务端预渲染
- 📃 代码规范: `ESLint`, `Stylelint`, `Prettier`, `Husky`, `Commitlint`, `Branchlint`
- 📱 `PWA` 应用
- 🚀 `Service Worker` 缓存

> 注意 `lint-staged` 只会检查 git 暂存区(staged)的文件，而不是所有文件。如果历史文件有lint错误，请手动执行`npm run lint`
> 并且 `lint-staged` 会自动尝试修复代码, 比如格式化

## Todo List

- [x] 优化服务端渲染首加载css闪屏的问题
- [x] 增加service-worker, manifest
- [x] 主动构建全部页面, 发布github pages
- [ ] 实现类似于`webpack.DllPlugin`和`webpack.DllReferencePlugin`的插件

## ⚙️ 使用方式

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
# 首先构建
pnpm build

# 然后启动服务端渲染服务器
pnpm build:ssr
```

访问 http://localhost:3000 可以看见服务端渲染的html内容。

> 这只是一个用于演示的例子，实际项目中，可以改造express， 保留一个api服务，用于编译对应路径的html内容

## 部署github pages

> 注意： 由于whistle代理不支持像nginx一样，优先寻找.html后缀作为页面内容，所以需要手动配置代理。就如这里的performance路由一样。
> 当然，为了完美，你也可以修改路由配置，给每一个路由配置一个 `path: 'performance.html'` 的路由配置，就能直接访问到服务端渲染的html内容。
> 由于 github pages支持nginx一样的代理，所以可以直接访问

```bash
# 构建产物, 唯一的区别是env不同，CLIENT_ASSET_PREFIX会改为github仓库的名称
pnpm build:github

# 编译所有路由服务端渲染html
pnpm build:ssr:github

# whistle代理配置, 具体路径自行替换
^xueyou.com/xueyou-react-template/$  file://<D:/playground/xueyou-react-template/application/dist/index.html>
^xueyou.com/xueyou-react-template/performance$  file://<D:/playground/xueyou-react-template/application/dist/performance.html>
^xueyou.com/xueyou-react-template/*** file://D:/playground/xueyou-react-template/application/dist/$1
```

[![Star History Chart](https://api.star-history.com/svg?repos=xueyou2000/xueyou-react-template&type=Date)
