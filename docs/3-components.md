# 3. 组件 Components

## 3.1 通用 Common

### 3.1.1 MainToolbar 主工具栏，权限控制

  - props
    * buttons:
      - type: Array
      - default: []
      - 可以通过辅助函数 `common/getMainButtons({buttons})` 获取
      - 下拉按钮: btn.name 中用;分隔各按钮名称，click事件参数data为序号
      - 带按钮的输入框: btn.name 以 btnInput 开头，click事件参数data为输入内容

  - events
    * click: 回传参数 btnKey, data

  - slot
    * 其他类型请使用 slot


### 3.1.2 下拉按钮 SplitButton

  - props
    * button: 主按钮
    * menu: 下拉菜单
  - events
    * click: 回传参数 序号

### 3.1.3 基础表单对话框 FormDialog

  - 编辑对话框，可用于简单的编辑操作

  - props
    * value:
      - 数据绑定用，v-model
      - type: Object
    * modelName:
      - 模型名称，和 api 接口对应
      - type: String
    * modelConfig:
      - 模型属性
      - type: UFObject (详见 utils 文档)
    * dialogOptions:
      - 对话框参数，即 EasyUI window 插件参数
      - type: Object
    * inputOptions:
      - 输入框参数
      - type: Object
      - 每个属性名称对应模型各属性名称
      - 同 EasyUI 各类型输入框参数

  - events:
    * saved: 保存成功

  - 示例：颜色编辑对话框，详见 basic/color/ColorView.vue
    ``` html
      <form-dialog ref="colorDialog"
                   v-model="editingColor"
                   model-name="color"
                   :model-config="COLOR_PROPS"
                   :dialog-options="dialogOptions"
                   @saved="reloadColors">
      </form-dialog>
    ```


## 3.2 EasyUI

### 3.2.0 base/EuiBase
  - 基础组件，不包含模板

  - 其他 Eui 组件均继承于本组件

  - props
    * options: 对应 EasyUI 插件的参数，对象形式，具体内容参考 EasyUI 文档
    * styles: EasyUI 插件目标节点上的 CSS

  - data
    * eui_d: $('#目标节点') 对象
    * options_d: 预置参数，可由 props.options 覆盖，其中方法则会合并
    * eui_state: 实例内部状态

  - methods
    * callByName: 调用 EasyUI 插件方法
    * callByNames: 依次调用多个方法，上一个方法的输出作为下一个方法的参数输入，返回最后一个方法的结果
    * chainByName: 链式调用方法，返回实例本身
    * getChainResult: 获取链式调用当前结果

  - events
    * options 中的事件方法（on 开头）将会转换成 Vue 事件，参数相同
    * 事件名称 `onSomeEvent -> some-event`
    * 同时保留 onSomeEvent 也会执行，若只希望使用 Vue 事件则置为空方法 `() => {}`
    * options 中可以使用 `events` 自定义 EasyUI 未提供的原生方法

### 3.2.1 data/EuiData
  - 基础数据组件

### 3.2.1.1 data/EuiDatagrid
  - 数据表格组件 datagrid

### 3.2.1.2 data/EuiTree
  - 树形组件 tree

### 3.2.2 form/EuiInputBase
  - 基础输入组件，输入框类型的组件均继承本组件

  - props
    * value: 输入值
    * disabled: 是否禁用

  - events
    * input: EasyUI 的 change 事件将会同时触发 input 事件

### 3.2.2.1 form/EuiForm
  - 表单组件 form

### 3.2.2.2 form/EuiInput
  - 通用输入组件

  - props
    * euiType: 输入框类型，默认 textbox

### 3.2.2.3 form/EuiTextbox
  - 文本输入组件 textbox

### 3.2.2.4 form/EuiNumberbox
  - 数字输入组件 numberbox

### 3.2.2.5 form/EuiSearchbox
  - 搜索框组件 searchbox

### 3.2.2.6 form/EuiDatebox
  - 日期组件 datebox

### 3.2.2.7 form/EuiFilebox
  - 文件上传框组件 filebox

### 3.2.2.8 form/EuiCombobox
  - 下拉框组件 combobox

### 3.2.2.9 form/EuiCombotree
  - 下拉树框组件 combotree

### 3.2.3 layout/EuiLayout
  - 布局组件

  - props
    * config，格式如下
      ```
      {
        options: {},      // layout 参数，对象形式
        styles: '',       // layout 样式
        regions: {
          north: {
            options: '',  // north region 参数，字符串形式
            styles: ''    // north region 样式
          },
          // ...
        }
      }
      ```

### 3.2.4 window/EuiWindow
  - 窗口组件

  - props
    * footerHeight: 底栏高度，默认 4em 


## 3.3 头栏 header

### 3.3.1 Navbar

### 3.3.2 TaskMenu

### 3.3.3 MessageMenu

### 3.3.4 AccountMenu

### 3.3.4 AboutMenu


## 3.4 侧栏 sidebar

### 3.4.1 Sidebar

### 3.4.2 SidebarMenu

### 3.4.3 MenuItem

### 3.4.4 ControlBar


## 3.5 视图 views

### 3.5.1 多标签页组件 TabsView
