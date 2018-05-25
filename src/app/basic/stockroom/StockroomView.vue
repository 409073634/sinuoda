<template>
  <div class="content">

    <eui-layout :config="LAYOUT_CONFIG">
      <main-toolbar slot="north" :buttons="toolButtons" @click="btnClick">
        <eui-searchbox :menu="SEARCH_MENU" :options="{ prompt: '编号/名称/缩写' }"> </eui-searchbox>
      </main-toolbar>

      <div slot="center" style="height:100%;">
        <eui-datagrid ref="roomGrid" :options="euiOptions" style="width: 100%;height: 100%"></eui-datagrid>
      </div>
    </eui-layout>

    <eui-window ref="roomDialog" :options="winOptions" style="width: 600px">
      <div class="win-div" v-for="item in DIALOG_CONTENT">
        <div v-for="k in Object.keys(item)" :class="item[k].clazz">
          <div v-if="item[k].type === 'checkbox'">
            <input v-model="item[k].data" type="checkbox"/>
            <label>{{item[k].label}}</label>
          </div>
          <div v-else>
            <label>{{item[k].label}}</label>
            <eui-input v-model="item[k].data"
                       :options="item[k].options"
                       :eui-type="item[k].type"
                       :style="item[k].styles"
                       :data-options="item[k].dataOptions"></eui-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="saveRoom">保存</button>
        <button class="btn btn-default" @click="cancelRoom">取消</button>
      </div>
    </eui-window>
  </div>
</template>
<script>
  import $ from 'jquery'
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import { getMainButtons } from '@/app/common'
  import MainToolbar from '@/components/common/MainToolbar'
  import messager from '@/utils/messager'
  import { getZwToPy } from '@/assets/plugins/zw-to-py.js'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiInput from '@/components/easyui/form/EuiInput'
  import EuiSearchbox from '@/components/easyui/form/EuiSearchbox'

  const DIALOG_CONTENT = [
    {
      code: {data: '', clazz: 'col-md-5', label: '编号', type: 'textbox', model: 'code', styles: 'width: 80%'},
      type: {
        data: 0,
        clazz: 'col-md-5',
        label: '类型',
        type: 'combobox',
        model: 'type',
        styles: 'width: 80%',
        options: {
          data: [{
            'value': 0,
            'text': '本地仓',
            'selected': true
          }, {
            'value': 1,
            'text': '委外仓'
          }]
        }
      },
      status: {data: false, clazz: 'col-md-2', label: '停用', type: 'checkbox', model: 'status'}
    },
    {
      name: {data: '', clazz: 'col-md-6', label: '名称', type: 'textbox', model: 'name', styles: 'width: 80%'},
      hotkey: {data: '', clazz: 'col-md-6', label: '缩写', type: 'textbox', model: 'hotkey', styles: 'width: 80%'}
    },
    {
      address: {data: '', clazz: 'col-md-12', label: '地址', type: 'textbox', model: 'address', styles: 'width: 90%'}
    },
    {
      memo: {
        data: '',
        clazz: 'col-md-12',
        label: '备注',
        type: 'textbox',
        model: 'memo',
        styles: 'width: 90%;height: 100px',
        dataOptions: 'multiline:true'
      }
    }
  ]

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

  const SEARCH_MENU = [
    {
      name: '全部'
    },
    {
      name: '0',
      label: '本地'
    },
    {
      name: '1',
      label: '委外'
    }
  ]

  const TYPE = {
    data: [{
      'value': 0,
      'text': '本地仓',
      'selected': true
    }, {
      'value': 1,
      'text': '委外仓'
    }]
  }

  export default {
    name: 'StockroomsView',
    components: {
      EuiInput,
      EuiSearchbox,
      EuiWindow,
      EuiDatagrid,
      EuiLayout,
      MainToolbar
    },
    _meta: {
      path: 'basic/stockroom',
      title: '仓库管理'
    },
    mixins: [TabPane],
    data () {
      return {
        DIALOG_CONTENT,
        LAYOUT_CONFIG,
        SEARCH_MENU,
        TYPE,
        dgName: null,
        toolButtons: [],
        dgState: '停用',
        state: {
          dialog: 0, // 0新增 1编辑
          pageTotal: 0,
          page: {
            key: null,
            type: null,
            page: 1,
            pageSize: 20
          }
        },
        pager: null,
        winOptions: {
          title: '仓库设置',
          onBeforeClose: () => {
            for (let i in this.DIALOG_CONTENT) {
              Object.keys(this.DIALOG_CONTENT[i]).map(k => {
                if (typeof this.DIALOG_CONTENT[i][k].data === 'string') {
                  this.DIALOG_CONTENT[i][k].data = ''
                } else if (typeof this.DIALOG_CONTENT[i][k].data === 'number') {
                  this.DIALOG_CONTENT[i][k].data = 0
                } else if (typeof this.DIALOG_CONTENT[i][k].data === 'boolean') {
                  this.DIALOG_CONTENT[i][k].data = false
                }
              })
            }
          }
        },
        euiOptions: {
          rownumbers: true,
          pagination: true,
          fitColumns: true,
          singleSelect: true,
          selectOnCheck: false,
          fit: true,
          checkOnSelect: false,
          onDblClickRow: () => {
            this.state.dialog = 1
            this.editRow()
          },
          columns: [[
            {field: 'code', title: '编号', width: 1},
            {field: 'name', title: '名称', width: 1},
            {field: 'address', title: '地址', width: 1},
            {
              field: 'type',
              title: '类型',
              formatter: (value, row, index) => {
                return value === '0' ? '本地仓' : '委外仓'
              },
              width: 1
            },
            {
              field: 'status',
              title: '状态',
              formatter: (value, row, index) => {
                console.log('formatter')
                return value === 0 ? '停用' : '启用'
              },
              width: 1
            },
            {field: 'memo', title: '备注', width: 1}
          ]],
          loader: (params, success, error) => {
            api.stockroom.getPage(this.state.page).then(data => {
              success(data.records)
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
      btnClick (btn) {
        switch (btn) {
          case 'btnAdd':
            this.state.dialog = 0
            this.openDialog()
            break
          case 'btnEdit':
            this.state.dialog = 1
            this.editRow()
            break
          case 'btnDelete':
            this.deleteRow()
            break
        }
      },
      search (value, name) {
        if (name === '0' || name === '1') {
          this.state.page.key = value
          this.state.page.type = name
        } else {
          this.state.page.key = value
          this.state.page.type = null
        }
        this.loadData()
      },
      initPager () {
        this.pager = this.callMyName('roomGrid', 'getPager')
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
      loadData () {
        this.callMyName('roomGrid', 'reload')
      },
      format (val, row) {
        return val === 0 ? '禁用中' : '启用中'
      },
      saveRoom () {
        let data = {}
        for (let i in this.DIALOG_CONTENT) {
          Object.keys(this.DIALOG_CONTENT[i]).map(k => {
            if (typeof this.DIALOG_CONTENT[i][k].data === 'boolean') {
              data[k] = this.DIALOG_CONTENT[i][k].data ? 0 : 1
            } else {
              data[k] = this.DIALOG_CONTENT[i][k].data
            }
          })
        }
        if (data.code !== '' && data.name !== '') {
          if (this.state.dialog === 0) {
            this.closeDialog()
            api.stockroom.addRoom(data).then(data => {
              this.loadData()
            })
          } else {
            let row = this.callMyName('roomGrid', 'getSelected')
            if (row !== null) {
              Object.keys(data).map(k => {
                row[k] = data[k]
              })
              this.closeDialog()
              api.stockroom.editRoom(row).then(data => {
                this.loadData()
              })
            }
          }
        }
      },
      cancelRoom () {
        this.closeDialog()
      },
      openDialog () {
        this.callMyName('roomDialog', 'open')
      },
      closeDialog () {
        this.callMyName('roomDialog', 'close')
      },
      deleteRow () {
        let row = this.callMyName('roomGrid', 'getSelected')
        if (row !== null) {
          let msg = '删除以下仓库？<br>' + row.name.toString()
          messager.confirm('确认', msg).then(() => {
            api.stockroom.deleteRoom(row.id).then(k => {
              this.loadData()
            })
          })
        }
      },
      editRow () {
        let row = this.callMyName('roomGrid', 'getSelected')
        if (row !== null) {
          for (let i in this.DIALOG_CONTENT) {
            Object.keys(this.DIALOG_CONTENT[i]).map(k => {
              if (k === 'status') {
                this.DIALOG_CONTENT[i][k].data = row[k] === 0
              } else {
                this.DIALOG_CONTENT[i][k].data = row[k]
              }
            })
          }
          this.openDialog()
        }
      },
      callMyName (ref, method, ...data) {
        return this.$refs[ref].callByName(method, ...data)
      }
    },
    watch: {
      'DIALOG_CONTENT[1].name.data' (culVal, oldVal) {
        console.log('watch1')
      },
      'dgName' () {
        console.log('watch')
        this.DIALOG_CONTENT[1].hotkey.data = getZwToPy(this.dgName)[0]
      }
    },
    created () {
      console.log('created')
      for (let i in this.DIALOG_CONTENT) {
        Object.keys(this.DIALOG_CONTENT[i]).map(k => {
          if (k === 'name') {
            console.log('name')
            this.dgName = this.DIALOG_CONTENT[i][k].data
            return
          }
        })
      }
      getMainButtons().then(btns => {
        this.toolButtons = btns
      })
    },
    mounted () {
      $('#ss').searchbox({
        prompt: '编号/名称/缩写'
      })
    }
  }
</script>
<style scoped lang="scss">
  .content {
    height: 100%;
    padding: 0;
  }

  .win-div {
    padding-bottom: 40px;
    text-align: left;
  }
</style>
