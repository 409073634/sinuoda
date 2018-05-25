import { messager } from '@/utils'

export default class EuiHelper {
  constructor(refs) {
    this.refs = refs
  }

  callMyName(ref, method, ...data) {
    return this.refs[ref].callByName(method, ...data)
  }

  doPromise(cond, wanted, msg) {
    if (cond) {
      return Promise.resolve(wanted)
    } else {
      messager.info('提醒', msg)
      return Promise.reject(msg)
    }
  }

  // Tree
  getSelectedSort() {
    let node = this.callMyName('supplierTree', 'getSelected')
    return this.doPromise(node && node.id, node, '请选择一个类别')
  }
  getSelectedLeafId() {
    let node = this.callMyName('supplierTree', 'getSelected')
    return this.doPromise(
      node && node.id && (!node.children || !node.children.length),
      node && node.id,
      '请选择一个供应商类别'
    )
  }
  deleteSelectedSort(suppliers) {
    if (suppliers && suppliers.length) {
      messager.info('sort-not-empty')
      return Promise.reject('sort-not-empty')
    }
    return this.getSelectedSort().then(node => {
      let msg = `<p>删除供应商类别？</p><strong>${node.attributes.name}</strong>`
      return messager.confirm('确认', msg).then(() => node.id)
    })
  }

  // Grid
  getSelectedRows() {
    let rows = this.callMyName('supplierGrid', 'getSelections') // OR 'getChecked'
    return this.doPromise(rows.length, rows, '请选择供应商')
  }
  getSelectedRow() {
    let row = this.callMyName('supplierGrid', 'getSelected')
    return this.doPromise(row && row.id, row, '请选择一个供应商')
  }
  deleteSelectedRows() {
    this.getSelectedRows().then(rows => {
      let msg = `<p>删除供应商？</p><strong>${rows.map(r => r.name).join(', ')}</strong>`
      return rows && rows.length ? messager.confirm('确认', msg).then(() => rows) : Promise.reject('')
    })
  }
}
