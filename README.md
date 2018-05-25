**丝诺达前端项目** 基于 [Vue.js](https://vuejs.org), [jQuery-EasyUI](https://www.jeasyui.com/) 和 [AdminLTE](https://almsaeedstudio.com)


如何开发
------------

### 开发环境

1. Webstorm、VS Code 或者其他编辑器

2. Node.js 和 yarn
  - Node.js：[官网下载](https://nodejs.org/)
  - 安装 yarn：`npm install -g yarn`

3. 浏览器扩展：Vue.js devtools
  - [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [手动安装](https://github.com/vuejs/vue-devtools)

### 开发与调试

1. 安装依赖
  - `yarn`

2. 运行开发服务
  - `yarn dev`
  - 浏览器访问 `localhost:8086`

### 构建生产版本

1. 多页面
  - `yarn build-pages`
  - 重新生成 dist 目录，dist/pages 下是各个独立页面文件

2. 单页应用
  - `yarn build`
  - 重新生成 dist 目录，不包含 dist/pages

### 项目结构

- build: 构建过程
- config: 构建配置
- dist: 编译结果
- docs: 文档
- electron: 桌面版配置
- node_modules: 项目依赖
- src: 项目源代码
  - api: 接口
  - app: 应用主目录
  - assets: 静态资源（相对路径引用，构建中自动处理）
  - components: 通用组件
  - config: 应用全局配置
  - demo: 代码样例
  - filters: Vue过滤器
  - pages: 独立页面
  - router: Vue路由
  - store: Vuex，应用状态管理
  - utils: 工具类代码
  - App.vue: 单页应用主组件
  - main.js: 单页应用入口
  - pages.main.js: 多页应用入口
- static: 静态资源（绝对路径引用，将直接复制到服务器上）
- test: 测试
- index.html: 主页
- package.json: 项目信息
- README.md: 本文件
- yarn.lock: 依赖版本锁定

详细信息参考本项目文档 docs

### 参考文档与源代码

- EasyUI - [在线文档](https://www.jeasyui.com/)
- AdminLTE - [在线文档](https://almsaeedstudio.com/themes/AdminLTE/documentation/index.html)
- Bootstrap 3 - [代码](https://github.com/twbs/bootstrap)
- Vue.js - [代码](https://github.com/vuejs/vue)
- Vuex - [代码](https://github.com/vuejs/vuex)
- Axios - [代码](https://github.com/mzabriskie/axios)

### 浏览器支持
- IE 9+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)
