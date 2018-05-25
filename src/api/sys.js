import { request, createApi } from './common'

export default {
  feature: createApi('Feature', [
    { name: 'getAuthButtons', method: 'get' },
    { name: 'getRoleFeatures', method: 'get', end: 'Tree' },
    { name: 'getUserFeatures', method: 'get', end: 'GetPersonalFeatureTree' },
    { name: 'setRoleFeatures', end: 'SaveFeatureTree', query: 'roleGuid' },
    { name: 'setUserFeatures', end: 'SaveUserFeatureTree', query: 'userGuid' }
  ]),

  // role: createApi('Role', []),
  // department: createApi('Department', []),
  operator: createApi('Operator', []),
  parameters: createApi('SysParameters', []),
  attrCode: createApi('AttrCode', []),
  attrValue: createApi('AttrValue', []),

  permission: createApi('/sys/permission/', [
    { name: 'getRoleTree', method: 'post', end: 'roletree', wrap: 'id' },
    { name: 'getTypes', method: 'get', end: 'newpermission' }
  ]),

  role: createApi('/sys/role/', [
    { name: 'getAll', end: 'getall' },
    { name: 'paged' },
    { name: 'setPermission', end: 'setRolePermission' }
  ]),

  department: {
    getDepartmentTree() {
      return request('get', '/sys/department/tree')
    },
    delete(id) {
      return request('get', '/sys/department/del', {id})
    }
  },

  personnel: {
    getPersonnelInfo(condition) {
      return request('post', '/sys/user/paged', condition)
    },
    getComboboxInfo() {
      return request('post', '/sys/user/newuser', {})
    },
    getAvatarUrl(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', '/sys/user/uploadAvatar', data)
    },
    addPersonnelInfo(info) {
      return request('post', '/sys/user/add', info)
    },
    getPersonnnelInputInfo(id) {
      return request('post', '/sys/user/openupdate', {id})
    },
    editPersonnelInfo(info) {
      return request('post', '/sys/user/update', info)
    },
    deletePersonInfo(id) {
      return request('post', '/sys/user/del', {id})
    },
    downloadPersonInfo() {
      return request('post', '')
    },
    getRolesAll() {
      return request('post', '/sys/role/getall', {})
    },
    getPersonnelRole(id) {
      return request('post', '/sys/user/get', {id})
    },
    setPersonnelRole(data) {
      return request('post', '/sys/user/setUserRole', data)
    }
  },

  dictionaries: {
    getPage (query) {
      return request('post', '/attrCode/paged', query)
    },
    getSubData (attrCode) {
      return request('get', '/attrValue/getByAttrCode', { attrCode })
    },
    addMainData (data) {
      return request('post', '/attrCode/add', data)
    },
    addSubData (data) {
      return request('post', '/attrValue/add', data)
    },
    deleteMainData (id) {
      return request('get', '/attrCode/Delete/' + id)
    },
    deleteSubData (id) {
      return request('get', '/attrValue/Delete/' + id)
    },
    editSubRow (data) {
      return request('post', '/attrValue/Update', data)
    },
    editMainRow (data) {
      return request('post', '/attrCode/Update', data)
    },
    getSubRow (id) {
      return request('get', '/attrValue/Get/' + id)
    }
  }
}
