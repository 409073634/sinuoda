# 1. 接口 API

## 1.1 概览 General

- 接口代码位于 /src/api 目录下

- 通过 `import api from '@/api'` 引用

- 各个大模块分别置于独立文件，比如基础模块 basic.js

- 模块代码引入，然后于 `export default {...}` 内导出

## 1.2 通用 Common

- 包括一些基础方法定义，和请求的预处理

- createApi 方法
  * 使用该方法，可以以配置的形式生成接口方法
  * 默认包含：get, delete, add, update 四个基础方法
  * 如果接口形式不匹配，可以覆盖基础方法
  * 参数配置：
    - name: 方法名称，即调用的方法名
    - method: 请求方法，默认 post
    - end: 接口端点，即接口URL最后一个片段，默认与 name 相同
    - path: 路径参数，位于URL上的参数
    - wrap: 包装参数，例如 id 将包装为 `{ id: someData }` 作为请求数据，someData 为调用方法时接受的数据

- download 方法
  * 通过 ajax 方式下载文件

## 1.3 功能模块 Features

- 按大模块分文件

- 按功能分组，与开发文档保持一致
