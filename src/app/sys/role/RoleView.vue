<template>

  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="onBtnClick"> </main-toolbar>

      <eui-datagrid slot="center" ref="roleGrid"
                    :options="euiOptions.roleGrid"
                    styles="width: 100%; height: 100%;">
      </eui-datagrid>

      <eui-tree slot="east" ref="menuTree" :options="euiOptions.menuTree"> </eui-tree>

    </eui-layout>

    <eui-window ref="roleDialog" :options="euiOptions.roleDialog" styles="max-height: 400px;">
      <div>
        <div class="form-group">
          <label for="sys_role_name">{{ ROLE_PROPS.role }}:</label>
          <eui-input id="sys_role_name" v-model="currentRole.role" required> </eui-input>
        </div>
        <div class="form-group">
          <label for="sys_role_desc">{{ ROLE_PROPS.description }}:</label>
          <eui-input id="sys_role_desc" :options="{multiline: true, height: 90}" v-model="currentRole.description"> </eui-input>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="saveRole">保存</button>
        <button class="btn btn-default" @click="cancelRole">取消</button>
      </div>
    </eui-window>

  </section>

</template>

<script>
  import api from '@/api'
  import { getMainButtons, getTreeData } from '@/app/common'
  import { messager, CopyHelper } from '@/utils'

  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/MainToolbar'

  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'

  const LAYOUT_CONFIG = {
    styles: 'width:100%; min-width:600px; min-height:400px;',
    options: {
      fit: true
    },
    regions: {
      north: {
        options: 'border:false,minHeight:46',
        styles: 'width:100%'
      },
      east: {
        options: 'border:false,minWidth:100,split:true,maxWidth:400',
        styles: 'width:300px'
      },
      center: {
        options: 'border:false',
        styles: 'min-width:400px'
      }
    }
  }
  const ROLE_GRID_OPTIONS = {
    rownumbers: true,
    pagination: true,
    pageSize: 20,
    singleSelect: true,
    selectOnCheck: false,
    checkOnSelect: false,
    columns: [[
      // { field: 'checkbox', checkbox: true },
      { field: 'role', title: '角色名', editor: 'text' },
      { field: 'description', title: '描述', editor: 'text' }
    ]]
  }
  const EMPTY_ROLE = {
    role: '',
    description: ''
  }
  const ROLE_PROPS = {
    role: '角色名',
    description: '描述'
  }

  export default {
    _meta: {
      path: 'sys/role',
      title: '角色权限'
    },

    name: 'RolesView',

    mixins: [TabPane],

    components: {
      MainToolbar,
      EuiLayout,
      EuiDatagrid,
      EuiTree,
      EuiWindow,
      EuiForm,
      EuiInput
    },

    data () {
      return {
        currentRole: this.getEmptyRole(),

        toolButtons: getMainButtons({
          pullRight: ['btnSet']
        }),

        ROLE_PROPS,

        LAYOUT_CONFIG,

        // Eui Options
        euiOptions: {
          roleGrid: Object.assign({}, ROLE_GRID_OPTIONS, {
            loader: (params, success, error) => {
              let query = {
                page: params.page,
                pageSize: params.rows
              }
              api.role.paged(query).then(data => {
                data.rows = data.records
                success(data)
              })
            },
            onSelect: (idx, row) => {
              if (this.currentRole !== row) {
                this.currentRole = row
                this.callMyName('menuTree', 'reload')
              }
            },
            onUnselect: (idx, row) => {
              if (this.currentRole === row) {
                let selected = this.callMyName('roleGrid', 'getSelected')
                this.currentRole = selected || this.getEmptyRole()
              }
            },
            onDblClickRow: (idx, row) => {
              // check permission
              if (this.toolButtons.find(btn => btn.btnKey === 'btnEdit')) {
                this.openDialog()
              }
            }
          }),

          menuTree: {
            checkbox: true,
            loader: (params, success, error) => {
              api.permission.getRoleTree(this.currentRole.id || '0').then(menus => {
                let treeData = getTreeData(menus, 'rolePermissionDtoList', {text: 'name'})
                if (treeData) {
                  success(treeData)
                } else {
                  error()
                }
              })
            }
          },

          roleDialog: {
            title: '角色设置',
            onBeforeClose: () => {
              if (this.copyHelper.isChanged()) {
                this.cancelRole()
                return false
              }
              return true
            }
          }
        }
      }
    },

    methods: {
      onBtnClick (btnKey) {
        let btnHandlers = {
          btnAdd: this.addRole,
          btnEdit: this.editRole,
          btnDelete: this.deleteRole,
          btnPrint: () => { /* TODO */ },
          btnDownload: () => { /* TODO */ },
          btnCopy: this.copyRole,
          btnSet: this.setPermission
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },

      addRole () {
        this.currentRole = this.getEmptyRole()
        this.openDialog()
      },

      editRole () {
        if (this.singleSelected('编辑')) {
          this.getSelectedRow().then(() => {
            this.openDialog()
          })
        }
      },

      deleteRole () {
        let rows = this.callMyName('roleGrid', 'getSelections') // OR 'getChecked'
        let msg = '删除以下角色？<br>' + rows.map(r => r.role).toString()
        messager.confirm('确认', msg).then(() => {
          if (rows && rows.length) {
            Promise.all(
              rows.map(row => api.role.delete(row.id))
            ).then(() => {
              this.callMyName('roleGrid', 'reload')
            })
          }
        })
      },

      copyRole () {
        this.currentRole = JSON.parse(JSON.stringify(this.currentRole))
        delete this.currentRole.id
        this.openDialog()
      },

      setPermission () {
        if (!this.singleSelected('权限设置')) {
          return
        }
        if (this.currentRole && this.currentRole.id) {
          let rootNodes = this.callMyName('menuTree', 'getRoots')
          let permissionList = this.getPermissionList(rootNodes, [])
          api.role.setPermission({
            permissionList: permissionList,
            roleId: this.currentRole.id
          }).then(() => {
            messager.info('提示', '保存权限成功！')
          })
        }
      },

      // Form

      saveRole () {
        let role = this.currentRole
        if (!role.role) {
          messager.info('提示', '角色名不能为空！')
        }
        let saveDone = () => {
          this.callMyName('roleGrid', 'reload')
          this.copyHelper.sync()
          this.closeDialog()
        }
        if (!role.id) {
          api.role.add(role).then(saveDone)
        } else {
          api.role.update(role).then(saveDone)
        }
      },

      cancelRole () {
        this.copyHelper.confirm().then(this.closeDialog)
      },

      // Private

      getEmptyRole () {
        return JSON.parse(JSON.stringify(EMPTY_ROLE))
      },

      callMyName (ref, method, ...data) {
        return this.$refs[ref].callByName(method, ...data)
      },

      singleSelected (actionName) {
        let rows = this.callMyName('roleGrid', 'getSelections')
        if (rows && rows.length !== 1) {
          messager.info('提醒', '请选择一条记录' + (actionName ? '进行' + actionName : ''))
          return false
        }
        return true
      },

      getSelectedRow () {
        return new Promise((resolve, reject) => {
          let row = this.callMyName('roleGrid', 'getSelected')
          if (row && row.id) {
            resolve(row)
          } else if (row && !row.id) {
            reject(row)
          }
        })
      },

      getPermissionList (nodes, result) {
        return nodes.reduce((result2, node) => {
          if (node.checked) {
            result2.push(node.id)
          }
          if (node.children && node.children.length) {
            return this.getPermissionList(node.children, result2)
          } else {
            return result2
          }
        }, result)
      },

      // Dialog
      openDialog () {
        this.copyHelper = new CopyHelper(this.currentRole, ROLE_PROPS)
        this.callMyName('roleDialog', 'open')
      },
      closeDialog () {
        this.callMyName('roleDialog', 'close')
      }
    },

    mounted () {
    }
  }
</script>

<style scoped lang="scss">
.content {
  height: 100%;

  .form-group {
    font-size: 14px;

    label {
      width: 4em;
    }
  }
}
</style>
