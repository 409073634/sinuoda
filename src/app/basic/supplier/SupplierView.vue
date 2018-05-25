<template>

  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="onBtnClick"
                    @search="searchSupplier">
      </main-toolbar>

      <eui-tree slot="west" ref="supplierTree"
                :options="treeOptions">
      </eui-tree>

      <eui-datagrid slot="center" ref="supplierGrid"
                    styles="width: 100%; height: 100%;"
                    :options="gridOptions">
      </eui-datagrid>

    </eui-layout>

    <supplier-dialog ref="spDialog"
                     :supplier="currentSupplier"
                     :tree="sortTree"
                     @saved="reloadGrid">
    </supplier-dialog>
    <supplier-sort-dialog ref="csDialog"
                          :sort="currentSort"
                          :tree="sortTree"
                          @saved="reloadTree">
    </supplier-sort-dialog>

  </section>

</template>

<script>
  import { getMainButtons } from '@/app/common'

  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiTree from '@/components/easyui/data/EuiTree'

  import SupplierDialog from './SupplierDialog'
  import SupplierSortDialog from './SupplierSortDialog'

  import { LAYOUT_CONFIG, FEATURE_BUTTONS } from './supplier.config'

  import SupplierService from './supplier.service'

  export default {
    _meta: {
      path: 'basic/supplier',
      title: '供应商'
    },

    name: 'SuppliersView',

    mixins: [TabPane],

    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiTree,
      SupplierDialog,
      SupplierSortDialog
    },

    data () {
      let service = new SupplierService(this)
      return {
        service,

        // Constants
        LAYOUT_CONFIG,

        toolButtons: [],

        currentSupplier: service.getEmptyModel(),
        currentSort: service.getEmptyModel(true),
        sortTree: [],
        suppliers: [],

        // EUI Options
        treeOptions: {
          loader: service.treeLoader,
          onClick: service.treeOnClick,
          onDblClick: service.treeOnDblClick
        },

        gridOptions: {
          pagination: true,
          pageSize: 20,
          rownumbers: true,
          singleSelect: true,
          columns: [ service.getGridColumns() ],
          loader: service.gridLoader,
          onSelect: (idx, row) => { this.currentSupplier = row },
          onDblClickRow: service.gridOnDblClickRow
        }
      }
    },

    methods: {
      // Main toolbar
      onBtnClick (btnKey) {
        let btnHandlers = {
          btnAdd: this.service.addSupplier,
          btnEdit: this.service.editSupplier,
          btnDelete: this.service.deleteSupplier,
          btnCopy: this.service.copySupplier,
          btnAddSort: this.service.addSupplierSort,
          btnEditSort: this.service.editSupplierSort,
          btnDeleteSort: this.service.deleteSupplierSort,
          btnCopySort: this.service.copySupplierSort,
          btnPrint: () => { },
          btnDownload: () => { }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey]()
        }
      },

      searchSupplier (kw) {
        // TODO
      },

      reloadGrid () {
        this.service.reload('supplierGrid')
      },

      reloadTree () {
        this.service.reload('supplierTree')
      }
    },

    created () {
      getMainButtons({buttons: FEATURE_BUTTONS}).then(btns => {
        this.toolButtons = btns
      })
    }
  }
</script>
