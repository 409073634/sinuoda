# 4. 静态资源 Assets & Static

## 4.1 Assets

- 目录：src/assets

- 该目录用于放置相对路径引用的静态文件

- 目录结构
  * img
    - 静态图片
  * plugins
    - 插件，非 npm 来源的依赖包，或者代码片段
    - 该目录不会经过 babel 进行转译，引入前请检查兼容性
  * scss
    - scss 格式的全局样式文件
  * styl
    - styl 格式的样式文件

## 4.2 Static

- 目录：static

- 该目录用于放置绝对路径引用的静态文件，一般用于特殊插件

- 该目录下的文件将按原目录结构拷贝到生成目录
