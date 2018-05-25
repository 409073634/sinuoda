<template>
  <div class="content">
    <eui-layout :config="LAYOUT_CONFIG">
      <main-toolbar slot="north" :buttons="toolButtons" @click="btnClick" @search="searchCustomer">
      </main-toolbar>

      <div slot="center" style="height:100%;">
        <eui-datagrid ref="sizeGrid" :options="euiOptions" style="width: 100%;height: 100%"></eui-datagrid>
      </div>
    </eui-layout>
    <eui-window ref="sizeDialog" :options="winOptions">
      <div class="dg-content" v-for="item in Object.keys(DIALOG)">
        <label>{{DIALOG[item].title}}</label>
        <eui-textbox :id="item" :ref="DIALOG[item].ref"
                     @input="newValue => onInputChange(item, newValue)"
                     :style="DIALOG[item].styles"
                     :data-options="DIALOG[item].options"></eui-textbox>
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
  import axios from 'axios'
  import fileDownload from 'js-file-download'
  import api from '@/api'
  import config from '@/config'
  import { getMainButtons } from '@/app/common'
  import messager from '@/utils/messager'
  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'

  const DIALOG = {
    code: {
      title: '编号',
      ref: 'size_dg_code'
    },
    name: {
      title: '名称',
      ref: 'size_dg_name'
    },
    memo: {
      title: '备注',
      ref: 'size_dg_memo',
      styles: 'height: 100px',
      options: 'multiline:true'
    }
  }
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
  export default {
    components: {
      EuiTextbox,
      EuiWindow,
      EuiDatagrid,
      EuiLayout,
      MainToolbar
    },
    _meta: {
      path: 'basic/product-size',
      title: '尺码管理'
    },
    mixins: [TabPane],
    data () {
      return {
        LAYOUT_CONFIG,
        DIALOG,
        toolButtons: [],
        pager: null,
        dialog: {},
        state: {
          dgType: 0, // 0添加 1编辑
          pageTotal: 0,
          page: {
            page: 1,
            pageSize: 20
          }
        },
        winOptions: {
          title: '颜色管理',
          onBeforeClose: () => {
            console.log('onBeforeClose')
            this.dialog = {}
            Object.keys(this.DIALOG).map(k => {
              this.callBoxName(this.DIALOG[k].ref, 'setValue', '')
            })
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
          columns: [[
            {field: 'code', title: '编号', width: 1},
            {field: 'name', title: '尺码名称', width: 1},
            {field: 'memo', title: '备注', width: 1}
          ]],
          onDblClickRow: (index, field, value) => {
            this.state.dgType = 1
            this.openDialog()
          },
          loader: (params, success, error) => {
            api.size.getPage(this.state.page).then(data => {
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
      btnClick (btn) {
        console.log(btn)
        switch (btn) {
          case 'btnAdd':
            this.state.dgType = 0
            this.openDialog()
            break
          case 'btnEdit':
            this.state.dgType = 1
            this.openDialog()
            break
          case 'btnDelete':
            this.deleteRow()
            break
          case 'btnInput':
            break
          case 'btnOutput':
            this.outPutExcel()
            break
        }
      },
      searchCustomer (newValue) {
        this.state.page.key = newValue
        this.loadData()
      },
      initPager () {
        this.pager = this.callMyName('sizeGrid', 'getPager')
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
        this.callMyName('sizeGrid', 'reload')
      },
      saveRoom () {
        let data = {}
        Object.keys(this.dialog).map(k => {
          data[k] = $.trim(this.dialog[k])
        })
        if (data['code'] && data['name']) {
          this.closeDialog()
          if (this.state.dgType === 0) {
            api.size.addColor(data).then(data => {
              this.loadData()
            })
          } else {
            let row = this.callMyName('sizeGrid', 'getSelected')
            if (row !== null) {
              Object.keys(data).map(k => {
                row[k] = $.trim(data[k])
              })
              api.size.editColor(row).then(data => {
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
        if (this.state.dgType === 1) {
          let row = this.callMyName('sizeGrid', 'getSelected')
          if (row !== null) {
            Object.keys(this.DIALOG).map(k => {
              this.callBoxName(this.DIALOG[k].ref, 'setValue', row[k])
            })
            this.callMyName('sizeDialog', 'open')
          }
        } else {
          this.callMyName('sizeDialog', 'open')
        }
      },
      closeDialog () {
        this.callMyName('sizeDialog', 'close')
      },
      deleteRow () {
        let row = this.callMyName('sizeGrid', 'getSelected')
        if (row !== null) {
          let msg = '删除以下尺码？<br>' + row.name.toString()
          messager.confirm('确认', msg).then(() => {
            api.size.deleteColor(row.id).then(data => {
              this.loadData()
            })
          })
        }
      },
      outPutExcel () {
        axios.post(config.serverURI + '/sys/size/exportAllPaged', {}, {responseType: 'arraybuffer'})
          .then(res => {
            let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
            fileDownload(blob, '尺码管理.xlsx')
          })
      },
      onInputChange (mpk, newValue) {
        this.dialog[mpk] = newValue
      },
      callMyName (ref, method, ...data) {
        return this.$refs[ref].callByName(method, ...data)
      },
      callBoxName (ref, method, ...data) {
        return this.$refs[ref][0].callByName(method, ...data)
      }
    },
    created () {
      console.log('created')
      this.toolButtons = getMainButtons()
    }
  }
</script>
<style scoped>
  .content {
    height: 100%;
    padding: 0;
  }

  .dg-content {
    margin-bottom: 10px;
  }
</style>
