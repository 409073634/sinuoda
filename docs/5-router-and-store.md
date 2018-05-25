# 5. 路由和存储 Router & Store

## 5.1 路由 Router

- 本路由为单页应用所使用，独立页面不使用路由

- 路由为 App -> Dash -> Tabs -> View 三层结构

- 单页应用同时支持独立页面形式，即 App -> Page -> View

## 5.2 存储 Store

- 用于存储应用运行时状态和全局数据

- 单页应用和独立页面都有使用

- 用户登录凭证同时存储在 Store 和 Local Storage 中，Store 内容在页面刷新后会丢失，从 Local Storage 从恢复
