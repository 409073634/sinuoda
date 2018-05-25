<template>
  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="onBtnClick"> </main-toolbar>

      <eui-datagrid slot="center"
                    :options="mainOptions" id="main_datagrid"
                    style="height: 100%; width: 100%">
      </eui-datagrid>

      <eui-datagrid slot="south"
                    :options="subOptions" id="sub_datagrid"
                    style="height: 100%; width: 100%">
      </eui-datagrid>

    </eui-layout>

    <div id="dictionaries_dialog" class="easyui-dialog"
         style="padding: 10px 200px 20px 20px"
         data-options="buttons:'#dd',resizable:true,modal:true,inline:true,closed:true">
      <div v-for="item in DIALOG.content" style="margin-top:10px">
        <label>{{item.name}}</label>
        <eui-textbox :id="item.id" v-if="item.type === 'text'&&item.key !== 'memo'"> </eui-textbox>
        <eui-textbox :id="item.id"v-else-if="item.key === 'memo'"
                     :options="dgOpMultiline"
                     style="height: 100px">
        </eui-textbox>
        <!--<eui-textbox :id="item.id" v-else data-options="validType:'integer'"></eui-textbox>-->
        <eui-numberbox v-else v-model="sort"> </eui-numberbox>
      </div>
    </div>

    <div id="dd" v-show="false">
      <button :id="btn.id" v-for="btn in DIALOG.buttons"
              :class="btn.clazz" :title="btn.title"
              v-show="btn.show"
              @click="btnDgClick(btn.id)">
        <i :class="btn.icon"></i>
        {{ btn.title }}
      </button>
    </div>

  </section>
</template>
<script>
  import $ from 'jquery'
  import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import messager from '@/utils/messager'

  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'

  const LAYOUT_CONFIG = {
    styles: 'width:100%; min-width:600px; min-height:400px;',
    options: {
      fit: true
    },
    regions: {
      north: {
        options: 'border:false,minHeight:46',
        styles: ''
      },
      center: {
        options: 'border:false',
        styles: ''
      },
      south: {
        options: 'border:false',
        styles: '',
        height: '35%'
      }
    }
  }

  const FEATURE_BUTTONS = [
    { id: 'btnAdd', name: '新增定义', icon: 'fa-plus' },
    { id: 'btnEdit', name: '编辑定义', icon: 'fa-pencil' },
    { id: 'btnDelete', name: '删除定义', icon: 'fa-trash' },
    { id: 'btnAddValue', name: '新增属性', icon: 'fa-plus' },
    { id: 'btnEditValue', name: '编辑属性', icon: 'fa-pencil' },
    { id: 'btnDeleteValue', name: '删除属性', icon: 'fa-trash' }
  ]

  const DIALOG = {
    addTitle: '新增',
    editTitle: '编辑',
    content: [{
      id: 'dic_tb_name',
      name: '名称',
      key: 'name',
      type: 'text'
    }, {
      id: 'dic_tb_id',
      name: '排序',
      key: 'seq',
      type: 'number'
    }, {
      id: 'dic_tb_memo',
      name: '备注',
      key: 'memo',
      type: 'text'
    }],
    buttons: [{
      id: 'dic_btn_add',
      clazz: 'btn btn-success',
      icon: 'fa fa-plus',
      show: true,
      title: '新增'
    }, {
      id: 'dic_btn_edit',
      clazz: 'btn btn-info',
      icon: 'fa fa-pencil',
      show: false,
      title: '修改'
    }, {
      id: 'dic_btn_close',
      clazz: 'btn btn-danger',
      icon: 'fa fa-trash',
      show: true,
      title: '取消'
    }]
  }
  const COLUMNS = [[
    {field: 'code', title: '编号', width: 1},
    {field: 'name', title: '名称', width: 1},
    {field: 'memo', title: '备注', width: 1}
  ]]
  export default {
    _meta: {
      path: 'sys/attr',
      title: '数据字典'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiTree,
      EuiWindow,
      EuiForm,
      EuiInput,
      EuiTextbox,
      EuiNumberbox
    },
    methods: {
      onBtnClick (btnKey) {
        let btnHandlers = {
          btnAdd: () => {
            this.showDialog(0, 0)
          },
          btnEdit: () => {
            this.showDialog(2, 1)
          },
          btnDelete: () => {
            this.mainDelete()
          },
          btnAddValue: () => {
            this.showDialog(1, 3)
          },
          btnEditValue: () => {
            this.showDialog(3, 4)
          },
          btnDeleteValue: () => {
            this.subDelete()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      btnDgClick (id) {
        switch (id) {
          case 'dic_btn_add':
            this.dialogOk()
            break
          case 'dic_btn_edit':
            this.dialogOk()
            break
          case 'dic_btn_close':
            this.dialogClose()
            break
        }
      },
      /**
       * 初始化
       */
      init () {
        this.mainDatagrid = $('#main_datagrid')
        this.subDatagrid = $('#sub_datagrid')
      },
      initPager () {
        this.pager = this.mainDatagrid.datagrid('getPager')
        console.log('pageTotal ' + this.state.pageTotal)
        this.pager.pagination({
          total: this.state.pageTotal,
          pageSize: 10,
          pageNumber: this.state.page.page,
          showPageList: false,
          showRefresh: false,
          onBeforeRefresh: () => {
            this.loadData()
          },
          onSelectPage: (pageNumber, pageSize) => {
            this.state.page.page = pageNumber
            this.loadData()
            console.log(pageNumber + '...' + pageSize)
          }
        })
      },
      /**
       * 删除主表列数据
       */
      mainDelete () {
        let row = this.mainDatagrid.datagrid('getSelected')
        console.log(this.mainDatagrid.datagrid('getSelected'))
        if (row !== null) {
          let msg = '删除以下定义？<br>' + row.name.toString()
          messager.confirm('确认', msg).then(() => {
            console.log(row.id)
            api.dictionaries.deleteMainData(row.id).then(data => {
              console.log(data)
              this.loadData()
            })
          })
        }
      },
      /**
       * 删除从表列数据
       */
      subDelete () {
        let row = this.subDatagrid.datagrid('getSelected')
        let msg = '删除以下属性？<br>' + row.name.toString()
        if (row !== null) {
          let row = this.mainDatagrid.datagrid('getSelected')
          if (row !== null) {
            console.log(row)
            messager.confirm('确认', msg).then(() => {
              console.log(row.id)
              api.dictionaries.deleteSubData(row.id).then(data => {
                console.log(data)
                this.loadSubData(this.mainValue.code)
              })
            })
          }
        }
      },
      /**
       * 显示弹出框
       * @param event
       * @param isEdit
       */
      showDialog (type, tnumb) {
        this.state.dgType = type
        if (type === 0 || type === 1) {
          for (let i in DIALOG.content) {
            if (DIALOG.content[i].type === 'text') {
              $('#' + DIALOG.content[i].id).textbox('setValue', '')
            }
          }
          this.sort = 1
          this.DIALOG.buttons[0].show = true
          this.DIALOG.buttons[1].show = false
        } else if (type === 2) {
          let row = this.mainDatagrid.datagrid('getSelected')
          for (let i in DIALOG.content) {
            if (DIALOG.content[i].type === 'text') {
              $('#' + DIALOG.content[i].id).textbox('setValue', row[DIALOG.content[i].key])
            } else if (DIALOG.content[i].type === 'number') {
              this.sort = row[DIALOG.content[i].key]
            }
          }
          this.DIALOG.buttons[0].show = false
          this.DIALOG.buttons[1].show = true
        } else {
          let row = this.subDatagrid.datagrid('getSelected')
          for (let i in DIALOG.content) {
            if (DIALOG.content[i].type === 'text') {
              $('#' + DIALOG.content[i].id).textbox('setValue', row[DIALOG.content[i].key])
            } else if (DIALOG.content[i].type === 'number') {
              this.sort = row[DIALOG.content[i].key]
            }
          }
          this.DIALOG.buttons[0].show = false
          this.DIALOG.buttons[1].show = true
        }
        $('#dictionaries_dialog').dialog({
          title: FEATURE_BUTTONS[tnumb].name,
          closed: false
        })
      },
      /**
       * 关闭弹出框
       */
      dialogClose () {
        $('#dictionaries_dialog').dialog('close')
      },
      /**
       * 弹出框确认按钮点击事件
       */
      dialogOk: function () {
        let id = this.sort
        let name = $('#dic_tb_name').textbox('getValue')
        if (name.length === 0) {
          return
        }
        let memo = $('#dic_tb_memo').textbox('getValue')
        if (this.state.dgType === 2) { // 编辑主表数据
//          console.log('增加主表数据')
          let row = this.mainDatagrid.datagrid('getSelected')
          if (row !== null) {
            let value = {
              id: row.id,
              name: name,
              memo: memo,
              seq: id
            }
            this.eidtMainValue(value)
          }
        } else if (this.state.dgType === 3) { // 编辑从表数据
          let row = this.subDatagrid.datagrid('getSelected')
          if (row !== null) {
            this.attrValueGet(row.id, name, memo, id)
          }
        } else if (this.state.dgType === 0) {
          console.log('增加主表数据')
          if (id.length === 0) {
            let value = {
              name: name,
              memo: memo
            }
            this.addMainValue(value)
          } else {
            let value = {
              name: name,
              memo: memo,
              seq: id
            }
            this.addMainValue(value)
          }
        } else {
          if (id.length === 0) {
            let value = {
              pid: this.mainValue.id,
              name: name,
              memo: memo
            }
            this.addSubValue(value)
          } else {
            let value = {
              pid: this.mainValue.id,
              name: name,
              memo: memo,
              seq: id
//            seq: seq
            }
            this.addSubValue(value)
          }
        }
        this.dialogClose()
      },
      /**
       * 加载主表数据
       */
      loadData () {
        this.mainDatagrid.datagrid('reload')
      },
      /**
       * 加载从表数据
       * @param code 主表code
       */
      loadSubData (code) {
        this.subDatagrid.datagrid('reload')
      },
      /**
       *
       */
      addMainValue (value) {
        console.log(value)
        api.dictionaries.addMainData(value).then(data => {
          if (data) {
            this.loadData()
            this.subDatagrid.datagrid({
              data: null
            })
          }
        })
      },
      /**
       * 增加从表列数据
       * @param value
       */
      addSubValue (value) {
        console.log(value)
        api.dictionaries.addSubData(value).then(data => {
          if (data) {
            this.loadSubData(this.mainValue.code)
          }
        })
      },
      /**
       * 编辑从表数据
       */
      editSubValue (value) {
        console.log(value)
        api.dictionaries.editSubRow(value).then(data => {
          if (data) {
            this.loadSubData(this.mainValue.code)
          }
        })
      },
      /**
       * 编辑主表数据
       */
      eidtMainValue (value) {
        console.log(value)
        api.dictionaries.editMainRow(value).then(data => {
          if (data) {
            this.loadData()
          }
        })
      },
      attrValueGet (id, name, memo, seq) {
        api.dictionaries.getSubRow(id).then(data => {
          let value = data
          value.name = name
          value.memo = memo
          value.seq = seq
          this.editSubValue(value)
        })
      }
    },
    /**
     * 钩子函数
     */
    mounted: function () {
      this.init()
      this.loadData()
    },
    name: 'AttrView',
    created () {
      getMainButtons({buttons: FEATURE_BUTTONS}).then(btns => {
        this.toolButtons = btns
      })
    },
    data () {
      return {
        DIALOG,
        toolButtons: [],
        LAYOUT_CONFIG,
        pager: null,
        mainValue: null, // 主表选中项列数据
        addButton: null,
        sort: 0,
        mainDatagrid: null,
        subDatagrid: null,
        data: null,
        subData: null,
        state: {
          dgType: 0,
          dgEditIndex: -1,
          pageTotal: 0,
          page: {
            page: 1,
            pageSize: 10
          }
        },
        dgOpMultiline: {
          multiline: true
        },
        mainOptions: {
          remoteSort: false,
          singleSelect: true,
          fitColumns: true,
          nowrap: false,
          rownumbers: true,
          pagination: true,
          onClickRow: (rowIndex, rowData) => {
            this.mainValue = rowData
            this.loadSubData(rowData.code)
          },
          onDblClickRow: (index, row) => {
            this.showDialog(2, 1)
          },
          columns: COLUMNS,
          loader: (param, success, error) => {
            api.dictionaries.getPage(this.state.page).then(data => {
              console.log(data)
              this.state.pageTotal = data.total
              this.data = data.records
              success(this.data)
              if (this.pager === null) {
                this.initPager()
              } else {
                this.pager.pagination('refresh', {
                  total: this.state.pageTotal,
                  pageNumber: this.state.page.page
                })
              }
              this.mainValue = null
              this.loadSubData()
              console.log('清空从表数据')
            })
          }
        },
        subOptions: {
          remoteSort: false,
          singleSelect: true,
          fitColumns: true,
          rownumbers: true,
          nowrap: false,
          onDblClickRow: (index, row) => {
            this.showDialog(3, 4)
          },
          pagePosition: 'top',
          columns: COLUMNS,
          loader: (param, success, error) => {
            if (this.mainValue === null || this.mainValue.code === -1) {
              this.subData = []
              success(this.subData)
            } else {
              api.dictionaries.getSubData(this.mainValue.code).then(data => {
                console.log(data)
                this.subData = data
                success(this.subData)
              })
            }
          }
        }
      }
    }
  }
</script>
<style scoped>
  .content {
    height: 100%;
    overflow-x: auto;
  }
  .my-dialog {
    display: flex;
    flex-direction: column-reverse;
  }

  .my-dialog-footer {
    display: flex;
    flex-direction: row-reverse;
  }

  label {
    width: 4em;
  }

  .btn {
    margin: 0 4px;
    padding: 4px 12px;
    font-size: 12px;
  }
</style>
