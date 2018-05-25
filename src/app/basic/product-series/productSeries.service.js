import api from '@/api'
import { messager } from '@/utils'
import { BaseService, doPromise } from '@/app/common'
import { SERIES_PROPS } from './productSeries.config'

export default class SeriesService extends BaseService {
  constructor (vm) {
    super()
    this.vm = vm
    this.searchName = ''
  }

  addSeries () {
    this.vm.editingSeries = this.getEmptyModel()
    this.openDialog()
  }

  editSeries () {
    this.getSelectedRow().then(series => {
      this.vm.editingSeries = series
      this.openDialog()
    })
  }

  deleteSeries () {
    this.getSelectedRow().then(row => {
      let msg = '删除以下产品系列？<br>' + row.name.toString()
      messager.confirm('确认', msg).then(() => {
        api.series.delete(row.id).then(this.reloadData)
      })
    })
  }

  searchSeries () {
    this.openSearchDialog()
  }

  customerCombo () {
    api.combo.GetCustomerComboGrid().then(data => {
      this.vm.customerCombo = data
    })
  }

  seriesCombo () {
    api.combo.GetSeriesComboGrid().then(data => {
      this.vm.typeCombo = data
    })
  }

  exportSeries () {
    // TODO
  }

  // Datagrid Options
  gridLoader (params, success, error) {
    let query = {
      name: this.searchName,
      code: this.searchCode,
      client: this.searchClient,
      type: this.searchType,
      page: params.page,
      pageSize: params.rows
    }
    api.series.paged(query).then(data => {
      data.rows = data.records
      this.vm.colors = data.records
      success(data)
    })
  }
  gridOnDblClickRow (idx, row) {
    if (this.vm.toolButtons.find(btn => btn.id === 'btnEdit')) {
      this.editSeries()
    }
  }

  openDialog () {
    this.vm.$refs['seriesDialog'].openDialog()
  }

  openSearchDialog () {
    this.vm.$refs['searchDialog'].openDialog()
  }

  reloadData() {
    this.callMyName('seriesGrid', 'reload')
  }

  getEmptyModel() {
    return JSON.parse(JSON.stringify(SERIES_PROPS.map(v => v.default || '')))
  }

  getSelectedRow() {
    let row = this.callMyName('seriesGrid', 'getSelected')
    return doPromise(row && row.id, row, '请选择一个系列')
  }

  callMyName(ref, method, ...data) {
    return this.vm.$refs[ref].callByName(method, ...data)
  }
}

