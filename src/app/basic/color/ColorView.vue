<template>
  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="btnClick"
                    @clear="resetSearch">
      </main-toolbar>

      <eui-datagrid slot="center" ref="colorGrid"
                    :options="gridOptions"
                    style="width: 100%;height: 100%">
      </eui-datagrid>

    </eui-layout>

    <form-dialog ref="colorDialog"
                 v-model="editingColor"
                 model-name="color"
                 :model-config="COLOR_PROPS"
                 :dialog-options="dialogOptions"
                 @saved="service.reloadData">
    </form-dialog>

  </section>
</template>

<script>
  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import FormDialog from '@/components/common/FormDialog'

  import { getMainButtons } from '@/app/common'
  import { COLOR_PROPS, LAYOUT_CONFIG, FEATURE_BUTTONS } from './color.config'
  import ColorService from './color.service'

  export default {
    name: 'ColorView',
    _meta: {
      path: 'basic/color',
      title: '颜色管理'
    },
    components: {
      EuiDatagrid,
      EuiLayout,
      FormDialog,
      MainToolbar
    },
    mixins: [TabPane],

    data () {
      let service = new ColorService(this)
      return {
        service,
        LAYOUT_CONFIG,
        COLOR_PROPS,
        toolButtons: [],

        editingColor: {},

        dialogOptions: {
          title: '颜色管理'
        },
        gridOptions: {
          rownumbers: true,
          pagination: true,
          fitColumns: true,
          singleSelect: true,
          selectOnCheck: false,
          fit: true,
          checkOnSelect: false,
          columns: [
            COLOR_PROPS.toArray().map(p => ({
              field: p.key,
              title: p.value.label,
              width: 1
            }))
          ],
          onDblClickRow: service.gridOnDblClickRow,
          loader: service.gridLoader
        }
      }
    },

    methods: {
      btnClick (btnId, data) {
        switch (btnId) {
          case 'btnAdd':
            this.service.addColor()
            break
          case 'btnEdit':
            this.service.editColor()
            break
          case 'btnDelete':
            this.service.deleteColor()
            break
          case 'btnInput':
            this.service.searchColor(data)
            break
          case 'btnImport':
            // TODO
            break
          case 'btnExport':
            this.service.exportColors()
            break
        }
      },
      resetSearch (btnId) {
        this.service.searchColor('')
      }
    },

    created () {
      getMainButtons({
        buttons: FEATURE_BUTTONS
      }).then(buttons => {
        this.toolButtons = buttons
      })
    }
  }
</script>
