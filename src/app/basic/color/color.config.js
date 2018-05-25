import { UFObject } from '@/utils'

export const COLOR_PROPS = new UFObject({
  code: { label: '编号', required: true },
  name: { label: '名称', required: true, default: '' },
  memo: { label: '备注', styles: 'width: 300px', options: {multiline: true} }
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
  { id: 'btnInput', name: '搜索', icon: 'fa-search' },
  { id: 'btnImport', name: '导入', icon: 'fa-upload' },
  { id: 'btnExport', name: '导出', icon: 'fa-download' }
]
