import sys from './sys'
import basic from './basic'

const linkIcons = {
  'sys/department': 'fa-building',
  'sys/role': 'fa-suitcase',
  'sys/user': 'fa-users',
  'sys/permission': 'fa-bars',
  'sys/attr': 'fa-book',
  'basic/supplier': 'fa-ship',
  'basic/customer': 'fa-users',
  'basic/product': 'fa-object-group',
  'basic/product-series': 'fa-tag',
  'basic/color': 'fa-paint-brush',
  'basic/currency': 'fa-dollar',
  'basic/unit': 'fa-at',
  'basic/stockroom': 'fa-clone'
}

const modules = [
  { name: '系统设置', items: sys, icon: 'fa-cogs' },
  { name: '基础信息', items: basic }
]

const extractMenus = function (modules) {
  return (modules.length ? modules : [...arguments])
    .reduce((menus, module) => {
      console.log(module)
      return menus.concat({
        name: module.name,
        icon: module.icon,
        items: Object.values(module.items)
          .filter(v => v && v._meta)
          .map(v => ({
            name: v._meta.title,
            link: '/' + v._meta.path,
            page: true,
            icon: v._meta.icon || linkIcons[v._meta.path]
          }))
      })
    }, [])
}

export default extractMenus(modules)
