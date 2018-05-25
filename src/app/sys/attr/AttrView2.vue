<template>
  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="onBtnClick">
      </main-toolbar>

      <eui-datagrid slot="center" ref="mainGrid" :options="mainOptions"
                                  style="height: 100%; width: 100%;">
      </eui-datagrid>

      <eui-datagrid slot="south" ref="subGrid" :options="subOptions"
                                 style="height: 100%; width: 100%;">
      </eui-datagrid>

    </eui-layout>

    <eui-window ref="mainDialog" :options="{ title: '字典详情' }">
      <div class="form-group col-lg-3 col-md-4 col-xs-6"
           v-for="(pv, pk) in modelProps" v-if="!pv.hidden">
        <label>{{ pv.label }}</label>
        <eui-input :eui-type="pv.type"
                                          :disabled="pv.readonly"
                                          :required="pv.required"
                                          :options="inputOptions[pk]"
                                          v-model="currentDict[pk]">
        </eui-input>
      </div>
      <!-- TODO sub-grid -->
      <div slot="footer">
        <button class="btn btn-primary" @click="saveDict">保存</button>
        <button class="btn btn-default" @click="cancelDict">取消</button>
      </div>
    </eui-window>

    <!-- eui-window subDialog -->

  </section>
</template>
<script>
  import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import { messager, UFObject, CopyHelper } from '@/utils'

  import TabPane from '@/components/views/TabPane'

  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiInput from '@/components/easyui/form/EuiInput'
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

  const DICT_PROPS = new UFObject({
    code: { label: '编号', required: true, hidden: true },
    name: { label: '名称', required: true },
    seq: { label: '排序', required: true, inside: false },
    hotkey: { label: '搜索键', required: true, inside: false },
    memo: { label: '备注' }
  })

  export default {
    _meta: {
      path: 'sys/attr',
      title: '数据字典'
    },

    name: 'AttrView',

    mixins: [TabPane],

    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiWindow,
      EuiInput,
      EuiNumberbox
    },

    data () {
      return {
        LAYOUT_CONFIG,
        toolButtons: getMainButtons(),
        modelProps: DICT_PROPS.toObject(),

        currentDict: this.getEmptyModel(),
        currentEntry: {},

        inputOptions: {
        },

        mainOptions: {
          singleSelect: true,
          rownumber: true,
          nowrap: false,
          fitColumns: true,
          pagination: true,
          columns: [
            DICT_PROPS.toArray()
              .filter(p => !p.value['inside'])
              .map(p => ({
                field: p.key,
                title: p.value.label,
                width: 1
              }))
          ],
          onSelect: (idx, row) => {
            this.currentDict = row
            this.$refs['subGrid'].callByName('reload')
          },
          onDblClickRow: (idx, row) => {
            // TODO
            this.editDict()
          },
          loader: (params, success, error) => {
            let query = {
              page: params.page,
              pageSize: params.rows
            }
            api.dictionaries.getPage(query).then(data => {
              data.rows = data.records
              success(data)
            })
          }
        },

        subOptions: {
          singleSelect: true,
          rownumber: true,
          fitColumns: true,
          columns: [
            DICT_PROPS.toArray()
              .filter(p => !p.value['inside'])
              .map(p => ({
                field: p.key,
                title: p.value.label,
                width: 1
              }))
          ],
          onDblClickRow: (idx, row) => {
            // TODO
          },
          loader: (params, success, error) => {
            if (this.currentDict && this.currentDict.code) {
              api.dictionaries.getSubData(this.currentDict.code).then(data => {
                data.rows = data.records
                success(data)
              })
            }
          }
        }
      }
    },

    computed: {
      modelNames: () => DICT_PROPS.flatMap('label')
    },

    methods: {
      onBtnClick (btnKey) {
        let btnHandlers = {
          btnAdd: this.addDict,
          btnEdit: this.editDict,
          btnDelete: () => { },
          btnAddValue: () => { },
          btnEditValue: () => { },
          btnDeleteValue: () => { }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },

      addDict () {
        this.currentDict = this.getEmptyModel()
        this.openMainDialog()
      },

      editDict () {
        this.openMainDialog()
      },

      deleteDict () {
        this.getSelectedDicts(rows => {
          let msg = `<p>删除数据字典？</p><strong>${rows.map(r => r.name).join(', ')}</strong>`
          messager.confirm('确认', msg).then(() => {
            if (rows && rows.length) {
              Promise.all(
                rows.map(row => api.dictionaries.deleteMainData(row.id))
              ).then(() => {
                this.callMyName('mainGrid', 'reload')
              })
            }
          })
        })
      },

      saveDict () {
        api.dictionaries.addMainData(this.currentDict).then(() => {
          this.closeMainDialog()
        })
      },
      cancelDict () {
        this.copyHelper.confirm().then(this.closeMainDialog())
      },

      getSelectedDicts (callback) {
        let rows = this.callMyName('mainGrid', 'getSelections') // OR 'getChecked'
        if (!rows.length) {
          messager.info('提醒', '请选择数据字典')
        } else {
          callback(rows)
        }
      },

      getSelectedRow (callback) {
        let row = this.callMyName('mainGrid', 'getSelected')
        if (row && row.id) {
          callback(row)
        } else {
          messager.info('提醒', '请选择数据字典')
        }
      },

      getEmptyModel () {
        return JSON.parse(JSON.stringify(DICT_PROPS.map(v => v.default || '')))
      },

      openMainDialog () {
        this.copyHelper = new CopyHelper(this.currentDict, this.modelProps)
        this.$refs['mainDialog'].callByName('open')
      },

      closeMainDialog () {
        this.$refs['mainDialog'].callByName('close')
      }
    }
  }

</script>

<style scoped>
  .form-group label {
    width: 3em;
  }
</style>
