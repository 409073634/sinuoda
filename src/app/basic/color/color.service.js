import api from '@/api'
import { messager } from '@/utils'
import { BaseService, doPromise } from '@/app/common'
import { COLOR_PROPS } from './color.config'

export default class ColorService extends BaseService {
  constructor (vm) {
    super()
    this.vm = vm
    this.searchName = ''
  }

  addColor () {
    this.vm.editingColor = this.getEmptyModel()
    this.openDialog()
  }

  editColor () {
    this.getSelectedRow().then(color => {
      this.vm.editingColor = color
      this.openDialog()
    })
  }

  deleteColor () {
    this.getSelectedRow().then(row => {
      let msg = '删除以下颜色？<br>' + row.name.toString()
      messager.confirm('确认', msg).then(() => {
        api.color.delete(row.id).then(this.reloadData)
      })
    })
  }

  searchColor (colorName) {
    this.searchName = colorName
    this.reloadData()
  }

  exportColors () {
    // TODO
  }

  // Datagrid Options
  gridLoader (params, success, error) {
    let query = {
      name: this.searchName,
      page: params.page,
      pageSize: params.rows
    }
    api.color.paged(query).then(data => {
      data.rows = data.records
      this.vm.colors = data.records
      success(data)
    })
  }
  gridOnDblClickRow (idx, row) {
    if (this.vm.toolButtons.find(btn => btn.id === 'btnEdit')) {
      this.editColor()
    }
  }

  openDialog () {
    this.vm.$refs['colorDialog'].openDialog()
  }

  reloadData() {
    this.callMyName('colorGrid', 'reload')
  }

  getEmptyModel() {
    return JSON.parse(JSON.stringify(COLOR_PROPS.map(v => v.default || '')))
  }

  getSelectedRow() {
    let row = this.callMyName('colorGrid', 'getSelected')
    return doPromise(row && row.id, row, '请选择一个颜色')
  }

  callMyName(ref, method, ...data) {
    return this.vm.$refs[ref].callByName(method, ...data)
  }
}
