<template>

  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="onBtnClick"> </main-toolbar>

      <eui-tree slot="west" ref="someTree" :options="treeOptions"> </eui-tree>

      <eui-datagrid slot="center" ref="someGrid"
                    styles="width: 100%; height: 100%;"
                    :options="gridOptions">
      </eui-datagrid>

    </eui-layout>

    <eui-window ref="someDialog" :options="dialogOptions">
      <div>
        <div class="form-group">
          <label for="some_input_id">{{ MODEL_PROPS.prop1 }}</label>
          <eui-input id="some_input_id" v-model="currentModel.prop1"> </eui-input>
        </div>
        <!--...-->
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="saveSomething">保存</button>
        <button class="btn btn-default" @click="cancelSomething">取消</button>
      </div>
    </eui-window>

  </section>

</template>

<script>
  // import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import { messager, CopyHelper } from '@/utils'

  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'

  // Constants
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
      west: {
        options: 'border:false,minWidth:100,split:true,maxWidth:300',
        styles: 'width:200px'
      },
      center: {
        options: 'border:false',
        styles: 'min-width: 400px'
      }
    }
  }

  const GRID_OPTIONS = {
    rownumbers: true,
    singleSelect: true,
    columns: [[
      // ...
    ]]
  }

  const EMPTY_MODEL = {
    prop1: ''
  }

  const MODEL_PROPS = {
    prop1: '属性1'
  }

  export default {
    _meta: {
      path: 'relative/path',
      title: 'SomeViewTitle'
    },

    name: 'SomeViewName',

    mixins: [TabPane],

    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiTree,
      EuiWindow,
      EuiForm,
      EuiInput
    },

    data () {
      return {
        // Constants
        LAYOUT_CONFIG,
        MODEL_PROPS,

        toolButtons: getMainButtons(),

        currentModel: this.getEmptyModel(),

        // EUI Options
        treeOptions: {
          checkbox: true,
          loader: (params, success, error) => {
          }
        },

        gridOptions: Object.assign({}, GRID_OPTIONS, {
          // Datagrid Methods
          loader: (params, success, error) => {
          },
          onSelect: (idx, row) => {
          },
          onUnselect: (idx, row) => {
          },
          onDblClickRow: (idx, row) => {
            // Check permission before editing
            if (this.toolButtons.find(btn => btn.btnKey === 'btnEdit')) {
              this.openDialog()
            }
          }
        }),

        dialogOptions: {
          title: 'SomeTitle',
          onBeforeClose: () => {
            // Check changes before close
            if (this.copyHelper.isChanged()) {
              // Show confirm dialog
              this.cancelRole()
              // Keep window
              return false
            }
            // Close
            return true
          }
        }
      }
    },

    methods: {
      // Main toolbar
      onBtnClick (btnKey) {
        let btnHandlers = {
          btnAdd: this.addSomething,
          btnEdit: this.editSomething,
          btnDelete: this.deleteSomething,
          btnCopy: this.copySomething,
          btnPrint: () => { },
          btnDownload: () => { }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },

      // Main Action Handlers
      addSomething () {
        this.currentModel = this.getEmptyModel()
        this.openDialog()
      },
      editSomething () {
        this.getSelectedRow().then(() => {
          this.openDialog()
        })
      },
      deleteSomething () {
        let rows = this.callMyName('roleGrid', 'getSelections') // OR 'getChecked'
        let msg = '删除...？'
        messager.confirm('确认', msg).then(() => {
          if (rows && rows.length) {
            // Delete rows then reload
            // ...
          }
        })
      },
      copySomething () {
        this.currentModel = JSON.parse(JSON.stringify(this.currentModel))
        delete this.currentModel.id
        this.openDialog()
      },
      // ...

      // Dialog Action Handlers
      saveSomething () {
        // Validate
        // ...

        // Save or update
        // ...

        // Reload and close dialog
        //   this.callMyName('someGrid', 'reload')
        //   this.copyHelper.sync()
        //   this.closeDialog()
      },
      cancelSomething () {
        this.copyHelper.confirm().then(this.closeDialog)
      },

      // Dialog
      openDialog () {
        this.copyHelper = new CopyHelper(this.currentModel, MODEL_PROPS)
        this.callMyName('someDialog', 'open')
      },
      closeDialog () {
        this.callMyName('someDialog', 'close')
      },

      // Private Methods
      getEmptyModel () {
        return JSON.parse(JSON.stringify(EMPTY_MODEL))
      },
      callMyName (ref, method, ...data) {
        return this.$refs[ref].callByName(method, ...data)
      },
      getSelectedRow () {
        return new Promise((resolve, reject) => {
          let row = this.callMyName('someGrid', 'getSelected')
          if (row && row.id) {
            resolve(row)
          } else if (row && !row.id) {
            reject(row)
          }
        })
      }
    },

    mounted () {
    }
  }
</script>

<style scoped>
</style>
