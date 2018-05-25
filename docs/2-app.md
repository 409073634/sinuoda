# 2. 应用 App

## 2.1 概览 General

- app 目录下按大模块设置目录，比如 basic

- 每个小模块都是单独目录，比如 basic/color

- 小模块基本目录结构
  * entry.js: 构建独立页面的入口，必需
  * XxxView.vue: 页面主组件，包含布局模板和状态等
  * xxx.config.js: 常量配置
  * xxx.service.js: 页面交互和回调方法
  * eui.helper.js: EasyUI 相关的方法，供 xxx.service.js 调用

- 对于复杂页面，按情况细分组件，比如单独的对话框组件 XxxDialog.vue

- 路由和菜单 Routes & Menus
  * 大模块必须引入到路由 app.routes.js
  * 菜单为单页应用菜单侧栏，app.menus.js 内定义模块信息

## 2.2 通用 Common

### 2.2.1 基础服务类 BaseService

- 各 Service 类必须继承该基础类，以自动绑定 this

### 2.2.2 辅助方法 Helpers

- 获取主功能按钮 getMainButtons
  * 每个页面都需要获取对应的功能按钮
  * 参数 config 为 `{ buttons: <按钮设置> }` 形式
  * 默认按钮设置只包括 _新增、编辑、删除_
  * 需覆盖默认按钮，不会合并默认按钮
  * 按钮设置格式：`{ id: 'btnAdd', name: '新增', icon: 'fa-plus' }`

- 转换树形结构 getTreeData
  * 转换后端返回数据为 EasyUi 所需的树形结构
  * 参数：
    - rawData: 原始数据
    - childProp: 原始数据中子节点属性名称，会转换为 `children`
    - maps: 属性名称转换
    - cond:
      * close: 设置节点为关闭的条件
      * child: 设置节点为有子节点的条件

## 2.3 功能模块 Features

### 2.3.1 页面组件 View Component

- name: 页面名称，必需

- _meta: 页面元信息，必需
  * path: 页面路径
  * title: 页面标题

- mixins:
  - TabPane: 标签页基础组件，必需
