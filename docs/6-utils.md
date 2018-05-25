# 6. 工具类代码 Utils

## 6.1 概览 General

- 本目录用于放置全局且和应用非强关联的工具类代码

## 6.2 代码清单 List

- copy-helper
  * 拷贝辅助类
  * 在对对象进行编辑时，可使用该类

- messager
  * 消息对象
  * 用于操作提醒和确认

- ufobject
  * 不明飞行对象
  * 用于表格数据模型
  * 支持一些类 Array 方法
  * 示例：颜色页面表格
    ``` JavaScript
    export const COLOR_PROPS = new UFObject({
      code: { label: '编号', required: true },
      name: { label: '名称', required: true, default: '' },
      memo: { label: '备注', styles: 'width: 300px', options: {multiline: true} }
    })
    ```

- login_animation
  * 登录页动画

- util
  * 其他常用方法