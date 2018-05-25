import DemoComponents from './index'

// Demo Routes
const DemoRoutes = [
  {
    path: 'easy-layout',
    component: DemoComponents.EasyLayout,
    name: 'EasyLayout'
  }, {
    path: 'easy-datagrid',
    component: DemoComponents.EasyDataGrid,
    name: 'EasyDataGrid'
  }, {
    path: 'ext-datagrid',
    component: DemoComponents.ExtDataGrid,
    name: 'ExtDataGrid'
  }, {
    path: 'invoice',
    component: DemoComponents.InvoiceView,
    name: 'InvoiceView',
    meta: {
      description: 'Invoice example'
    }
  }, {
    path: 'tasks',
    component: DemoComponents.TasksView,
    name: 'TasksView',
    meta: {
      description: 'Tasks page in the form of a timeline'
    }
  }, {
    path: 'empty/:id?',
    component: DemoComponents.EmptyView,
    name: 'EmptyView',
    meta: {
      description: 'Empty page'
    }
  }, {
    path: 'icons',
    component: DemoComponents.IconsView,
    name: 'IconsView',
    meta: {
      description: 'All icons'
    }
  }, {
    path: 'buttons',
    component: DemoComponents.ButtonsView,
    name: 'ButtonsView',
    meta: {
      description: 'All buttons'
    }
  }
]

export default DemoRoutes
