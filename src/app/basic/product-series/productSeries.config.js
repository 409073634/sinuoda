import { UFObject } from '@/utils'

export const PRODUCT_PROPS = new UFObject({
  code: { label: '编号', required: true, clazz: 'col-md-6', styles: 'width: 80%' },
  name: { label: '名称', required: true, default: '', clazz: 'col-md-6', styles: 'width: 80%' },
  customerName: { label: '客户', type: 'combogrid', clazz: 'col-md-6', styles: 'width: 80%' },
  attrType: { label: '类别', default: '', clazz: 'col-md-6', styles: 'width: 80%' },
  coeYarn: { label: '纱线', default: '' },
  coeCoverYarn: { label: '包纱', default: '' },
  coeRubber: { label: '橡筋', default: '' },
  coeLoss: { label: '损耗', default: '' },
  coeProcessCost: { label: '加工费', default: '' },
  coePackageCost: { label: '包装费', default: '' },
  coeExchangeRate: { label: '汇率', default: '' },
  createTime: { label: '创建时间', default: '', readonly: true, clazz: 'col-md-6', styles: 'width: 80%' },
  memo: { label: '备注', options: {multiline: true}, styles: 'width: 100%;height: 100px', clazz: 'col-md-12' }
})

export const SERIES_PROPS = new UFObject({
  code: { label: '编号', required: true, clazz: 'col-md-6', styles: 'width: 80%' },
  name: { label: '名称', required: true, default: '', clazz: 'col-md-6', styles: 'width: 80%' },
  customerId: { label: '客户', required: true, type: 'combogrid', clazz: 'col-md-6', styles: 'width: 80%' },
  attrType: { label: '类别', required: true, type: 'combogrid', clazz: 'col-md-6', styles: 'width: 80%' },
  coeYarn: { label: '纱线', default: '0', type: 'numberbox' },
  coeCoverYarn: { label: '包纱', default: '0', type: 'numberbox' },
  coeRubber: { label: '橡筋', default: '0', type: 'numberbox' },
  coeLoss: { label: '损耗', default: '0', type: 'numberbox' },
  coeProcessCost: { label: '加工费', default: '0', type: 'numberbox' },
  coePackageCost: { label: '包装费', default: '0', type: 'numberbox' },
  coeExchangeRate: { label: '汇率', default: '0', type: 'numberbox' },
  memo: { label: '备注', options: {multiline: true}, styles: 'width: 100%;height: 100px', clazz: 'col-md-12' }
})

export const SEARCH_PROPS = new UFObject({
  code: { label: '编号', clazz: 'col-md-6', styles: 'width: 80%' },
  name: { label: '名称', default: '', clazz: 'col-md-6', styles: 'width: 80%' },
  client: { label: '客户', type: 'combobox', default: '', clazz: 'col-md-6', styles: 'width: 80%' },
  type: { label: '类别', type: 'combobox', clazz: 'col-md-6', styles: 'width: 80%' }
})

export const LAYOUT_CONFIG = {
  styles: 'width:100%; min-width:600px; height:100%;',
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
      styles: 'width:100%'
    }
  }
}

export const FEATURE_BUTTONS = [
  { id: 'btnAdd', name: '新增', icon: 'fa-plus' },
  { id: 'btnEdit', name: '编辑', icon: 'fa-pencil' },
  { id: 'btnDelete', name: '删除', icon: 'fa-trash' },
  { id: 'btnSearch', name: '查询', icon: 'fa-search' }
]
