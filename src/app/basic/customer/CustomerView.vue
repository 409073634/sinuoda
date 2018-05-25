<template>

  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="onBtnClick">
      </main-toolbar>

      <eui-tree slot="west" ref="customerTree" :options="treeOptions"> </eui-tree>

      <eui-datagrid slot="center" ref="customerGrid"
                    styles="width: 100%; height: 100%;"
                    :options="gridOptions">
      </eui-datagrid>

    </eui-layout>

    <customer-dialog ref="spDialog"
                     :customer="currentCustomer"
                     @saved="reloadGrid">
    </customer-dialog>
    <customer-sort-dialog ref="csDialog"
                          :sort="currentSort"
                          :tree="sortTree"
                          @saved="reloadTree">
    </customer-sort-dialog>

  </section>

</template>

<script>
  import api from '@/api'
  import { getMainButtons, getTreeData } from '@/app/common'
  import { messager } from '@/utils'

  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiTree from '@/components/easyui/data/EuiTree'

  import CustomerDialog from './CustomerDialog'
  import CustomerSortDialog from './CustomerSortDialog'

  import { CUSTOMER_PROPS, SORT_PROPS, FEATURE_BUTTONS } from './customer-data'

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

  export default {
    _meta: {
      path: 'basic/customer',
      title: '客户管理'
    },

    name: 'CustomersView',

    mixins: [TabPane],

    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiTree,
      CustomerDialog,
      CustomerSortDialog
    },

    data () {
      return {
        // Constants
        LAYOUT_CONFIG,

        toolButtons: [],

        currentCustomer: this.getEmptyModel(),
        currentSort: this.getEmptyModel(true),
        sortTree: [],
        customers: [],

        // EUI Options
        treeOptions: {
          loader: (params, success, error) => {
            api.customerSort.getTree().then(sortTree => {
              this.sortTree = sortTree
              let treeData = getTreeData(sortTree, 'customerSortDtoList', {text: 'name'})
              if (treeData) {
                success(treeData)
              } else {
                error()
              }
            })
          },
          onClick: node => {
            if (this.currentSort !== node.attributes) {
              this.currentSort = node.attributes
              this.callMyName('customerGrid', 'reload')
            }
          },
          onDblClick: node => {
            if (this.toolButtons.find(btn => btn.btnKey === 'btnEditSort')) {
              this.editCustomerSort()
            }
          }
        },

        gridOptions: {
          pagination: true,
          pageSize: 20,
          rownumbers: true,
          singleSelect: true,
          columns: [
            CUSTOMER_PROPS.toArray().filter(p => !p.value['inside']).map(p => ({
              field: p.key,
              title: p.value.label
            }))
          ],
          loader: (params, success, error) => {
            let query = {
              page: params.page,
              pageSize: params.rows,
              customerSortId: (this.currentSort && this.currentSort.id) || '0'
            }
            api.customer.paged(query).then(data => {
              data.rows = data.records
              this.customers = data.records
              success(data)
            })
          },
          onSelect: (idx, row) => {
            this.currentCustomer = row
          },
          onDblClickRow: (idx, row) => {
            // Check permission before editing
            if (this.toolButtons.find(btn => btn.btnKey === 'btnEdit')) {
              this.openDialog()
            }
          }
        },

        dialogOptions: {
          title: '客户详情',
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
      onBtnClick (btnKey, ...data) {
        let btnHandlers = {
          btnAdd: this.addCustomer,
          btnEdit: this.editCustomer,
          btnDelete: this.deleteCustomer,
          btnCopy: this.copyCustomer,
          btnInputSearch: this.searchCustomer,
          btnImport: () => { },
          btnExport: this.exportCustomers,
          btnAddSort: this.addCustomerSort,
          btnEditSort: this.editCustomerSort,
          btnDeleteSort: this.deleteCustomerSort,
          btnCopySort: this.copyCustomerSort,
          btnPrint: () => { },
          btnDownload: () => { }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, ...data)
        }
      },

      searchCustomer (kw) {
        // TODO
        console.log('search', kw)
      },

      exportCustomers (btnIdx) {
        // TODO
        console.log('export', btnIdx)
      },

      // Main Action Handlers
      addCustomer () {
        this.currentCustomer = this.getEmptyModel()
        let node = this.callMyName('customerTree', 'getSelected')
        if (node && node.id && (!node.children || !node.children.length)) {
          this.currentCustomer.pid = node.id
        }
        this.openDialog()
      },
      editCustomer () {
        this.getSelectedRow(() => {
          this.openDialog()
        })
      },
      deleteCustomer () {
        this.getSelectedCustomers(rows => {
          let msg = `<p>删除客户？</p><strong>${rows.map(r => r.name).join(', ')}</strong>`
          messager.confirm('确认', msg).then(() => {
            if (rows && rows.length) {
              // Delete rows then reload
              Promise.all(
                rows.map(row => api.customer.delete(row.id))
              ).then(() => {
                this.callMyName('customerGrid', 'reload')
              })
            }
          })
        })
      },
      copyCustomer () {
        this.getSelectedRow(row => {
          this.currentCustomer = JSON.parse(JSON.stringify(row))
          delete this.currentCustomer.id
          this.openDialog()
        })
      },

      addCustomerSort () {
        this.currentSort = this.getEmptyModel(true)
        this.openSortDialog()
      },
      editCustomerSort () {
        this.getSelectedSort(node => {
          this.currentSort = node.attributes
          this.openSortDialog()
        })
      },
      deleteCustomerSort () {
        this.getSelectedSort(node => {
          if (this.customers && this.customers.length) {
            return messager.info('sort-not-empty')
          }
          let msg = `<p>删除客户类别？</p><strong>${node.attributes.name}</strong>`
          messager.confirm('确认', msg).then(() => {
            api.customerSort.delete(node.id).then(() => this.callMyName('customerTree', 'reload'))
          })
        })
      },
      copyCustomerSort () {
        this.getSelectedSort(node => {
          this.currentSort = JSON.parse(JSON.stringify(node.attributes))
          delete this.currentSort.id
          this.openSortDialog()
        })
      },

      openDialog () {
        this.$refs['spDialog'].openDialog()
      },
      openSortDialog () {
        this.$refs['csDialog'].openDialog()
      },

      reloadGrid () {
        this.callMyName('customerGrid', 'reload')
      },

      reloadTree () {
        this.callMyName('customerTree', 'reload')
      },

      // Private Methods
      getEmptyModel (sort) {
        return JSON.parse(JSON.stringify((sort ? SORT_PROPS : CUSTOMER_PROPS).map(v => v.default || '')))
      },
      callMyName (ref, method, ...data) {
        return this.$refs[ref].callByName(method, ...data)
      },
      getSelectedCustomers (callback) {
        let rows = this.callMyName('customerGrid', 'getSelections') // OR 'getChecked'
        if (!rows.length) {
          messager.info('提醒', '请选择客户')
        } else {
          callback(rows)
        }
      },
      getSelectedRow (callback) {
        let row = this.callMyName('customerGrid', 'getSelected')
        if (row && row.id) {
          callback(row)
        } else {
          messager.info('提醒', '请选择一个客户')
        }
      },
      getSelectedSort (callback) {
        let node = this.callMyName('customerTree', 'getSelected')
        if (!node || !node.id) {
          messager.info('提醒', '请选择一个类别')
        } else {
          callback(node)
        }
      }
    },

    mounted () {
      getMainButtons({buttons: FEATURE_BUTTONS}).then(btns => {
        this.toolButtons = btns
      })
    }
  }
</script>

<style scoped>
</style>
