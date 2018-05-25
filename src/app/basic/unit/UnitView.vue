<template>
  <div id="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="btnClick">
        <eui-textbox style="width: 200px" data-options="prompt:'编号或名称搜索',buttonText:'搜索'"
                     @input="newValue => onSearchInputChange(newValue)"></eui-textbox>
      </main-toolbar>
      <div slot="center" style="height:100%;">
        <eui-datagrid id="dg_units" :options="dgOptions" style="width: 100%;height: auto"></eui-datagrid>
      </div>

    </eui-layout>


    <div id="unit_dialog" class="easyui-dialog"
         style="padding: 10px 200px 20px 20px"
         data-options="buttons:'#bb',resizable:true,modal:true,inline:true"
         v-show="false" :title="DIALOG.title">
      <div v-for="item in DIALOG.content" style="margin-top: 10px">
        <label>{{ item.name }}</label>
        <eui-textbox v-if="item.type !== 'multiline'" :id="item.id"
                     @input="newValue => onInputChange(item.id, newValue)"></eui-textbox>
        <eui-textbox v-else :id="item.id" :options="dgOpMultiline" @input="newValue => onInputChange(item.id, newValue)"
                     style="height: 100px"></eui-textbox>
      </div>
    </div>

    <div id="bb" v-show="false">
      <button :id="btn.id" v-for="btn in DIALOG.buttons"
              :class="btn.clazz" :title="btn.title"
              v-show="btn.show"
              @click="btnClick(btn.btnKey)">
        <i :class="btn.icon"></i>
        {{ btn.title }}
      </button>
    </div>

    <div id="msg" class="esayui-dialog" style="padding: 20px">

    </div>
  </div>

</template>
<script>
  import $ from 'jquery'
  import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import messager from '@/utils/messager'
  import TabPane from '@/components/views/TabPane'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid.vue'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox.vue'
  import MainToolbar from '@/components/common/MainToolbar'
  import EuiLayout from '../../../components/easyui/layout/EuiLayout.vue'

  const LAYOUT_CONFIG = {
    styles: 'width:100%; min-width:600px; height:100%;',
    options: {
      fit: true
    },
    regions: {
      north: {
        options: 'border:false,minHeight:46',
        styles: 'width:100%'
      },
      center: {
        options: 'border:false',
        styles: 'width:100%'
      }
    }
  }
  const TOOL_BUTTONS = [{
    btnKey: 'btnAdd',
    name: '新增',
    clazz: 'btn btn-success',
    logo: 'fa fa-plus'
  }, {
    btnKey: 'btnEdit',
    name: '编辑',
    clazz: 'btn btn-info',
    logo: 'fa fa-pencil'
  }, {
    btnKey: 'btnDelete',
    name: '删除',
    clazz: 'btn btn-danger',
    logo: 'fa fa-trash'
  }, {
    btnKey: 'btnPrint',
    name: '打印',
    clazz: 'btn btn-default',
    logo: 'fa fa-print'
  }, {
    btnKey: 'btnDownload',
    name: '输出',
    clazz: 'btn btn-default',
    logo: 'fa fa-download'
  }]
  const DATAGRID_TITLE = [[
    {field: 'code', title: '编号', width: 1},
    {field: 'name', title: '名称', width: 1},
    {field: 'memo', title: '备注', width: 1}
  ]]
  const DIALOG = {
    title: '单位',
    content: [{
      id: 'code',
      type: 'normal',
      name: '编号'
    }, {
      id: 'name',
      type: 'normal',
      name: '名称'
    }, {
      id: 'memo',
      type: 'multiline',
      name: '备注'
    }],
    buttons: [{
      id: 'btnDgAdd',
      btnKey: 'btnDgAdd',
      icon: 'fa fa-plus',
      clazz: 'btn btn-success',
      title: ' 新增',
      show: true
    }, {
      id: 'btnDgEdit',
      btnKey: 'btnDgEdit',
      icon: 'fa fa-pencil',
      clazz: 'btn btn-info',
      title: ' 编辑',
      show: false
    }, {
      id: 'btnDgCancel',
      btnKey: 'btnDgCancel',
      icon: 'fa fa-trash',
      clazz: 'btn btn-danger',
      title: ' 取消',
      show: true
    }]
  }
  export default {
    components: {
      EuiLayout,
      EuiTextbox,
      EuiDatagrid,
      MainToolbar
    },
    _meta: {
      path: 'basic/unit',
      title: '单位设置'
    },
    mixins: [TabPane],
    name: 'UnitsView',
    data () {
      return {
        TOOL_BUTTONS,
        DIALOG,
        LAYOUT_CONFIG,
        toolButtons: [],
        pager: null,
        dgOpMultiline: {
          multiline: true
        },
        state: {
          dialog: 0, // 0增加 1修改
          dgContent: {},
          pageTotal: 0,
          searchTxt: null,
          page: {
            page: 1,
            pageSize: 20
          }
        },
        dgOptions: {
          fitColumns: true,
          pagination: true,
          singleSelect: true,
          rownumbers: true,
          fit: true,
          columns: DATAGRID_TITLE,
          onDblClickRow: (index, row) => {
            this.showDialog(1)
          },
          loader: (params, success, error) => {
            console.log('loading')
            let value
            if (this.state.searchTxt === null || this.state.searchTxt.length === 0) {
              value = this.state.page
            } else {
              value = {}
              Object.keys(this.state.page)
                .map(k => {
                  value[k] = this.state.page[k]
                })
              value['key'] = this.state.searchTxt
            }
            return api.unit.getPage(value).then(data => {
              success(data.records)
              this.state.pageTotal = data.total
              if (this.pager === null) {
                this.initPager()
              } else {
                this.pager.pagination('refresh', {
                  total: this.state.pageTotal,
                  pageNumber: this.state.page.page
                })
              }
            })
          }
        }
      }
    },
    methods: {
      initPager () {
        this.pager = $('#dg_units').datagrid('getPager')
        this.pager.pagination({
          total: this.state.pageTotal,
          pageSize: this.state.page.pageSize,
          pageNumber: this.state.page.page,
          showPageList: false,
          showRefresh: false,
          onBeforeRefresh: () => {
            this.loadData()
          },
          onSelectPage: (pageNumber, pageSize) => {
            this.state.page.page = pageNumber
            this.loadData()
          }
        })
      },
      addData: function () {
        if (!this.state.dgContent['name'] || !this.state.dgContent['code']) {
          return
        }
        let data = {}
        Object.keys(this.state.dgContent)
          .map(k => {
            data[k] = this.state.dgContent[k]
          })
        return api.unit.addUnit(data).then(data => {
          this.loadData()
          this.dismissDialog()
        })
      },
      editRow () {
        let row = $('#dg_units').datagrid('getSelected')
        if (row !== null) {
          Object.keys(this.state.dgContent)
            .map(k => {
              row[k] = this.state.dgContent[k]
            })
        }
        api.unit.editUnit(row).then(data => {
          this.loadData()
          this.dismissDialog()
        })
      },
      btnClick (btnKey) {
        console.log(btnKey)
        switch (btnKey) {
          case 'btnAdd':
            this.showDialog(0)
            break
          case 'btnEdit':
            this.showDialog(1)
            break
          case 'btnDelete':
            this.deleteRow()
            break
          case 'btnDgAdd':
            this.addData()
            break
          case 'btnDgEdit':
            this.editRow()
            break
          case 'btnDgCancel':
            this.dismissDialog()
            break
        }
      },
      showDialog (type) {
        this.state.dialog = type
        if (type === 0) {
          this.DIALOG.content.forEach((e, i) => {
            $('#' + e.id).textbox('setValue', '')
          })
          this.DIALOG.buttons[0].show = true
          this.DIALOG.buttons[1].show = false
          $('#unit_dialog').dialog()
        } else {
          let row = $('#dg_units').datagrid('getSelected')
          if (row !== null) {
            this.DIALOG.content.forEach((e, i) => {
              $('#' + e.id).textbox('setValue', row[e.id])
            })
            this.DIALOG.buttons[0].show = false
            this.DIALOG.buttons[1].show = true
            $('#unit_dialog').dialog()
          }
        }
      },
      dismissDialog () {
        Object.keys(this.state.dgContent)
          .map(k => {
            delete this.state.dgContent[k]
          })
        $('#unit_dialog').dialog('close')
      },
      onInputChange (code, newValue) {
        this.state.dgContent[code] = newValue
      },
      loadData () {
        $('#dg_units').datagrid('reload')
      },
      deleteRow () {
        let rows = $('#dg_units').datagrid('getSelected') // OR 'getChecked'
        let msg = '删除以下单位？<br>' + rows.name.toString()
        messager.confirm('确认', msg).then(() => {
          let row = $('#dg_units').datagrid('getSelected')
          if (row !== null) {
            api.unit.deleteUnit(row.id).then(data => {
              this.loadData()
            })
          }
        })
      },
      onSearchInputChange (newValue) {
        this.state.searchTxt = newValue
        this.state.page.page = 1
        this.loadData()
      }
    },
    created () {
      getMainButtons().then(btns => {
        this.toolButtons = btns
      })
    }
  }
</script>
<style scoped>
  #content {
    height: 100%;
  }

  .div-buttoms {
    padding: 10px 10px;
    border-bottom: 1px solid #ddd
  }

  label {
    width: 4em;
  }

  i {
    margin-right: 2px
  }
</style>
