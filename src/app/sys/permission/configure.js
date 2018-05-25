export const MENU_PROPS = {
  name: { type: 'textbox', label: '名称', required: true },
  memo: { type: 'textbox', label: '备注' },
  seq: { type: 'textbox', label: '排序' },
  resourceType: { type: 'combobox', label: '类型', required: true },
  permission: { type: 'textbox', label: '权限', required: true },
  pid: { type: 'combotree', label: '上级菜单', required: true },
  url: { type: 'textbox', label: 'URL', required: true },
  channel: { type: 'combobox', label: '终端', required: true },
  btnKey: { type: 'textbox', label: '键名', required: '2' },
  logo: { type: 'textbox', label: '图标' }
}

export const EMPTY_MENU = {
  name: '',
  memo: '',
  seq: 0,
  resourceType: '',
  permission: '',
  parentId: '0',
  url: '',
  channel: 0,
  btnKey: '',
  available: 1,
  logo: ''
}

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

export default {
  MENU_PROPS,
  EMPTY_MENU,
  LAYOUT_CONFIG
}
