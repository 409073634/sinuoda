<template>
  <section class="content">
    <eui-layout :config="LAYOUT_CONFIG">
      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="onBtnClick">
      </main-toolbar>
      <eui-datagrid ref="currency" slot="center" :options="CurrencyDgOptions"
                    style="width:100%;height:100%"></eui-datagrid>
    </eui-layout>
    <eui-window ref="currencydialog" :options="CurrencyDialogOptions">
      <div class="dialog-content">
        <div class="row"><label>编码:</label>
          <eui-input class="eui-input" v-model="currencyDetail.code"></eui-input>
        </div>
        <div class="row"><label>名称:</label>
          <eui-input class="eui-input" v-model="currencyDetail.name"></eui-input>
        </div>
        <div class="row"><label>备注:</label>
          <eui-input class="eui-input" style="height:60px" :data-options="'multiline:true'"
                     v-model="currencyDetail.memo"></eui-input>
        </div>
      </div>
      <div class="dlgbtns-wrapper" slot="footer">
        <button class="btn btn-success" @click="currencyDlgSave"><i class="fa fa-check"></i>保存</button>
        <button class="btn btn-primary" @click="currencyDlgCancel"><i class="fa fa-close"></i>退出</button>
      </div>
    </eui-window>
  </section>
</template>

<script>
  import $ from 'jquery'
  import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import TabPane from '@/components/views/TabPane'

  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'

  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiInput from '@/components/easyui/form/EuiInput'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import MainToolbar from '@/components/common/MainToolbar'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid.vue'

  const LAYOUT_CONFIG = {
    styles: 'width:100%; min-width:600px; min-height:400px;',
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
        styles: 'min-width: 400px'
      }
    }
  }
  const INIT_CURRENCY = {
    code: '',
    name: '',
    memo: ''
  }
  export default {
    _meta: {
      path: 'basic/currency',
      title: '货币设置'
    },
    components: {
      MainToolbar,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiDatagrid,
      EuiNumberbox,
      EuiTextbox,
      EuiForm
    },
    mixins: [TabPane],
    name: 'CurrencyView',
    data() {
      return {
        LAYOUT_CONFIG,
        flags: {
          editing: false
        },
        toolButtons: [],
        CurrencyDgOptions: {
          rownumbers: true,
          remoteSort: false,
          singleSelect: true,
          columns: [[
            {field: 'code', title: '编码', width: 200},
            {field: 'name', title: '名称', width: 200},
            {field: 'memo', title: '备注', width: 200}
          ]],
          onDblClickRow: (rowIndex, rowData) => {
            this.flags.editing = true
            let selectedNode = this.$refs.currency.callByName('getSelected')
            this.currencyDetail = selectedNode
            this.currencyCopyDetail = JSON.parse(JSON.stringify(selectedNode))
            this.$refs.currencydialog.callByName('title', '修改信息')
            this.$refs.currencydialog.callByName('open')
          },
          loader: (params, success, error) => {
            api.currency.getCurrency().then((data) => {
              let _data = {}
              _data['total'] = data.length
              _data['rows'] = data
              success(data)
            })
          }
        },
        CurrencyDialogOptions: {
          width: 350,
          height: 250,
          title: '货币信息',
          onBeforeClose: () => {
            if (this.isChanged(this.currencyDetail, this.currencyCopyDetail)) {
              let msg = `<p>以下内容未保存，放弃这些更改?</p>`
              this.confirm('确认', msg).then(() => {
                Object.assign(this.currencyDetail, this.currencyCopyDetail)
                this.$refs.currencydialog.callByName('close')
              })
              return false
            }
            return true
          }
        },
        currencyDetail: this.initCurrencyDetail(),
        currencyCopyDetail: this.initCurrencyDetail()
      }
    },
    methods: {
      init() {
      },
      initCurrencyDetail() {
        return JSON.parse(JSON.stringify(INIT_CURRENCY))
      },
      currencyDlgSave() {
        if (this.flags.editing) {
          console.log('editing save')
          api.currency.updateCurrency(this.currencyDetail).then((data) => {
            console.log('data', data)
            this.reloadCurrencyData()
            $.messager.info('提醒', '货币信息修改成功')
            this.currencyCopyDetail = Object.assign({}, this.currencyDetail)
            this.$refs.currencydialog.callByName('close')
            this.currencyDetail = this.initCurrencyDetail()
            this.flags.editing = false
          })
        } else {
          api.currency.addCurrency(this.currencyDetail).then(() => {
            this.reloadCurrencyData()
            $.messager.info('提醒', '添加货币信息成功')
            this.currencyCopyDetail = Object.assign({}, this.currencyDetail)
            this.$refs.currencydialog.callByName('close')
            this.currencyDetail = this.initCurrencyDetail()
          })
        }
      },
      currencyDlgCancel() {
        this.$refs.currencydialog.callByName('close')
      },
      reloadCurrencyData() {
        api.currency.getCurrency().then((data) => {
          let _data = {}
          _data['total'] = data.length
          _data['rows'] = data
          this.$refs.currency.callByName('loadData', _data)
        })
      },
      onBtnClick(btnKey, index) {
        let btnHandlers = {
          btnAdd: () => {
            this.currencyDetail = this.initCurrencyDetail()
            this.currencyCopyDetail = this.initCurrencyDetail()
            this.$refs.currencydialog.callByName('title', '新增货币')
            this.$refs.currencydialog.callByName('open')
            // this.CurrencyDialogOptions.title = '新增货币'
          },
          btnEdit: () => {
            this.flags.editing = true
            let selectedNode = this.$refs.currency.callByName('getSelected')
            if (!selectedNode) {
              $.messager.info('提醒', '请先选择要编辑的条目')
              return
            }
            this.currencyDetail = selectedNode
            this.currencyCopyDetail = JSON.parse(JSON.stringify(selectedNode))
            this.$refs.currencydialog.callByName('title', '修改信息')
            this.$refs.currencydialog.callByName('open')
          },
          btnDelete: () => {
            let selectedNode = this.$refs.currency.callByName('getSelected')
            if (selectedNode) {
              let msg = `是否删除该货币信息: ${selectedNode.name}?`
              $.messager.confirm('确认', msg, r => {
                if (r) {
                  api.currency.deleteCurrency(selectedNode.id).then((data) => {
                    $.messager.info('提醒', '删除成功')
                    this.reloadCurrencyData()
                  })
                }
              })
            } else {
              $.messager.info('提醒', '请先选择要删除的货币')
            }
          }
        }
        // TODO print & download
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      isChanged(obj, copyobj) {
        return Boolean(Object.keys(obj).find(k => {
          return copyobj[k] !== obj[k]
        }))
      },
      confirm(title, msg) {
        let confirmPromise = new Promise((resolve, reject) => {
          $.messager.confirm(title, msg, r => {
            if (r) {
              resolve(r)
            }
          })
        })
        return confirmPromise
      }
    },
    mounted() {
      this.init()
    },
    created () {
      getMainButtons().then(btns => {
        this.toolButtons = btns
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content
    height: 100%
    padding: 0
    .dlgbtns-wrapper
      button
        width: 60px
    .dialog-content
      padding: 10px 20px
      .row
        margin-bottom: 10px
        label
          display: inline-block
          width: 50px
          text-align: left
        .eui-input
          width: 200px
</style>
