import { UFObject } from '@/utils'

export const SUPPLIER_PROPS = new UFObject({
  account: { label: '帐号', required: true },
  name: { label: '供应商名称', required: true },
  code: { label: '供应商编码', required: true },
  type: { label: '供应商类型', required: true },
  pid: { label: '类别', required: true, type: 'combotree' },
  pName: { label: '类别', hidden: true },
  status: { label: '状态', required: true },
  shortName: { label: '简称' },
  hotkey: { label: '搜索键' },
  address: { label: '地址' },
  bank: { label: '开户银行' },
  email: { label: '联系人邮件' },
  fax: { label: '传真' },
  linkman: { label: '联系人' },
  memo: { label: '备注' },
  mobile: { label: '联系人手机' },
  phone: { label: '联系人电话' },
  post: { label: '邮政编码' },
  qq: { label: '联系人QQ' },
  tax: { label: '税号' },
  term: { label: '账期' },
  createTime: { label: '创建时间', readonly: true },
  createUser: { label: '创建者', readonly: true },
  updateTime: { label: '更新时间', readonly: true },
  updateUser: { label: '更新者', readonly: true },
  version: { label: '版本号', readonly: true }
})

export const SORT_PROPS = new UFObject({
  name: { label: '名称', required: true },
  code: { label: '编码', required: true },
  pid: { label: '父节点', required: true, type: 'combotree' },
  seq: { label: '排序', required: true },
  hotkey: { label: '快捷搜索键' },
  memo: { label: '备注' },
  version: { label: '版本号', readonly: true, hidden: true }
})

export const FEATURE_BUTTONS = [
  { id: 'btnAddSort', name: '新增分类', icon: 'fa-plus' },
  { id: 'btnEditSort', name: '编辑分类', icon: 'fa-pencil' },
  { id: 'btnDeleteSort', name: '删除分类', icon: 'fa-trash' },
  { id: 'btnCopySort', name: '复制分类', icon: 'fa-copy' },
  { id: 'btnAdd', name: '新增', icon: 'fa-plus' },
  { id: 'btnEdit', name: '编辑', icon: 'fa-pencil' },
  { id: 'btnDelete', name: '删除', icon: 'fa-trash' },
  { id: 'btnCopy', name: '复制', icon: 'fa-copy' }
]

export const LAYOUT_CONFIG = {
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
