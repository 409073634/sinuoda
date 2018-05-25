import HomeView from './HomeView'
import sys from './sys'
import basic from './basic'

let extractRoutes = function (modules) {
  return (modules.length || [...arguments])
    .reduce((routes, module) => {
      return routes.concat(Object.keys(module)
          .filter(k => module[k] && module[k]._meta && module[k]._meta.path)
          .map(k => ({
            path: module[k]._meta.path,
            component: module[k],
            name: module[k].name,
            meta: module[k]._meta
          })))
    }, [])
}

export default [
  {
    path: '',
    component: HomeView,
    name: 'HomeView',
    meta: {
      title: '主页',
      keep: true
    }
  },
  ...extractRoutes(
    sys,
    basic
  )
]
