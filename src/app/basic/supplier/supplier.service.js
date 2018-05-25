import api from '@/api'
import { BaseService, getTreeData } from '@/app/common'
import { SUPPLIER_PROPS, SORT_PROPS } from './supplier.config'
import EuiHelper from './eui.helper'

export default class SupplierService extends BaseService {
  constructor(vm) {
    super()
    this.vm = vm
    this.euiHelper = new EuiHelper(vm.$refs)
  }

  // Main action handlers
  addSupplier() {
    this.vm.currentSupplier = this.getEmptyModel()
    // Check leaf node first
    this.euiHelper.getSelectedLeafId().then(nodeId => {
      this.vm.currentSupplier.pid = nodeId
      this.openDialog()
    })
  }
  editSupplier() {
    this.euiHelper.getSelectedRow().then(this.openDialog)
  }
  deleteSupplier() {
    this.euiHelper.deleteSelectedRows().then(rows => {
      // Delete rows then reload
      Promise.all(
        rows.map(row => api.supplier.delete(row.id))
      ).then(() => {
        this.reload('supplierGrid')
      })
    })
  }
  copySupplier() {
    this.euiHelper.getSelectedRow().then(row => {
      this.vm.currentSupplier = JSON.parse(JSON.stringify(row))
      delete this.vm.currentSupplier.id
      this.openDialog()
    })
  }

  addSupplierSort() {
    this.vm.currentSort = this.getEmptyModel(true)
    this.openSortDialog()
  }
  editSupplierSort() {
    this.euiHelper.getSelectedSort().then(node => {
      this.vm.currentSort = node.attributes
      this.openSortDialog()
    })
  }
  deleteSupplierSort() {
    this.euiHelper.deleteSelectedSort(this.vm.suppliers).then(sortId => {
      api.supplierSort.delete(sortId)
    }).then(() => {
      this.reload('supplierTree')
    })
  }
  copySupplierSort() {
    this.euiHelper.getSelectedSort().then(node => {
      this.vm.currentSort = JSON.parse(JSON.stringify(node.attributes))
      delete this.vm.currentSort.id
      this.openSortDialog()
    })
  }

  // Tree options
  treeLoader(params, success, error) {
    api.supplierSort.getTree().then(sortTree => {
      this.vm.sortTree = sortTree
      let treeData = getTreeData(sortTree, 'supplierSortDtoList', { text: 'name' })
      if (treeData) {
        success(treeData)
      } else {
        error()
      }
    })
  }
  treeOnClick(node) {
    if (this.vm.currentSort !== node.attributes) {
      this.vm.currentSort = node.attributes
      this.reload('supplierGrid')
    }
  }
  treeOnDblClick(node) {
    if (this.vm.toolButtons.find(btn => btn.id === 'btnEditSort')) {
      this.editSupplierSort()
    }
  }

  // Grid options
  gridOnSelect(idx, row) {
  }
  gridOnDblClickRow(idx, row) {
    // Check permission before editing
    if (this.vm.toolButtons.find(btn => btn.id === 'btnEdit')) {
      this.openDialog()
    }
  }
  gridLoader(params, success, error) {
    let query = {
      page: params.page,
      pageSize: params.rows,
      supplierSortId: this.vm.currentSort && this.vm.currentSort.id
    }
    api.supplier.paged(query).then(data => {
      data.rows = data.records
      this.vm.suppliers = data.records
      success(data)
    })
  }

  // Common
  reload(componentName) {
    this.euiHelper.callMyName(componentName, 'reload')
  }
  openDialog() {
    this.vm.$refs['spDialog'].openDialog()
  }
  openSortDialog() {
    this.vm.$refs['csDialog'].openDialog()
  }

  // Others
  getEmptyModel(isSort) {
    return JSON.parse(JSON.stringify((isSort ? SORT_PROPS : SUPPLIER_PROPS).map(v => v.default || '')))
  }
  getGridColumns() {
    return SUPPLIER_PROPS.toArray().filter(p => !p.value['inside']).map(p => ({
      field: p.key,
      title: p.value.label,
      formatter: p.key === 'pid' ? pid => this.findParentName(pid) : undefined
    }))
  }
  findParentName(pid) {
    let parent = null
    let findParent = nodes => {
      nodes.find(node => {
        if (node.id === pid) {
          parent = node
          return true
        }
        return node.supplierSortDtoList ? findParent(node.supplierSortDtoList) : false
      })
    }
    findParent(this.vm.sortTree)
    return (parent || { name: pid }).name
  }

}
