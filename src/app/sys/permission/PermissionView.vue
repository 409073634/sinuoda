<template>
  <section class="content">

    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north" :buttons="toolButtons" @click="onBtnClick"> </main-toolbar>

      <eui-tree slot="west" ref="etree" :options="trOptions"> </eui-tree>

      <div slot="center">
        <div class="clearfix form-container">
          <div v-for="mpk in Object.keys(MENU_PROPS)" :key="mpk" class="form-group col-xs-6 col-lg-3">
            <label class="form-label">{{ MENU_PROPS[mpk].label }}:</label>
            <eui-input :ref="'input_' + mpk"
                       :eui-type="MENU_PROPS[mpk].type"
                       :options="inputOptions[mpk]"
                       :disabled="!state.editing"
                       :styles="commonStyles.input"
                       v-model="currentMenu[mpk]"
                       @input="newValue => onInputChange(mpk, newValue)">
            </eui-input>
          </div>
        </div>
        <div class="form-footer" v-if="state.editing">
          <button class="btn btn-primary" @click="saveMenu">保存</button>
          <button class="btn btn-default" @click="abortEditing">放弃</button>
        </div>
      </div>

    </eui-layout>

  </section>
</template>

<script>
import $ from 'jquery'

import api from '@/api'
import UFObject from '@/utils/ufobject'
import { getMainButtons, getTreeData } from '@/app/common'
import { MENU_PROPS, EMPTY_MENU, LAYOUT_CONFIG } from './configure'

import TabPane from '@/components/views/TabPane'
import MainToolbar from '@/components/common/MainToolbar'

import EuiLayout from '@/components/easyui/layout/EuiLayout'
import EuiTree from '@/components/easyui/data/EuiTree'
import EuiForm from '@/components/easyui/form/EuiForm'
import EuiInput from '@/components/easyui/form/EuiInput'

export default {
  _meta: {
    path: 'sys/permission',
    title: '菜单管理'
  },

  name: 'MenusView',

  mixins: [TabPane],

  components: {
    MainToolbar,
    EuiLayout,
    EuiTree,
    EuiForm,
    EuiInput
  },

  data () {
    return {
      // State
      menus: [],
      currentMenu: EMPTY_MENU,
      _currentMenu_copy: EMPTY_MENU,

      currentFolderId: null,

      state: {
        isNew: false,
        editing: false,
        changed: {}
      },

      LAYOUT_CONFIG,

      MENU_PROPS,

      toolButtons: [],

      // Options
      tbOptions: {
        onChange: data => {
          console.log('e:input changed', data)
        }
      },
      trOptions: {
        onBeforeSelect: this.onBeforeSelect,
        onSelect: node => {
          if (node.attributes && node.attributes.resourceType === '2') {
            let parentNode = this.$refs['etree'].callByName('getParent', node.target)
            if (parentNode && parentNode.id) {
              this.currentFolderId = parentNode.id
            }
          }
        },
        onContextMenu () {
          console.log('e:right click')
        },
        onLoadSuccess: this.selectTreeNodeByMenu,
        loader: (params, success, error) => {
          this.getTypes().then(data => {
            if (data['permissionList']) {
              success(data['permissionList'])
            } else {
              error()
            }
          })
        },
        loadFilter: data => {
          this.menus = data
          let childProp = 'rolePermissionDtoList'
          return getTreeData(this.menus, childProp, { text: 'name' }, {
            close: node => node.resourceType === '1' && node[childProp] && node[childProp].length && node.id !== this.currentFolderId
          })
        }
      },

      // Input options
      inputOptions: Object.assign(new UFObject(MENU_PROPS).mapFilter('required'), {
        channel: {
          editable: false,
          data: []
        },
        resourceType: {
          editable: false,
          data: []
        },
        pid: {
          data: []
        }
      }),

      commonStyles: {
        input: 'width:180px;'
      }
    }
  },

  methods: {
    abortEditing () {
      this.checkState(() => {
        this.setCurrentMenu()
        this.state.editing = false
      })
    },

    reloadMenus () {
      this.$refs['etree'].callByName('reload')
    },

    saveMenu () {
      for (let k in MENU_PROPS) {
        if ((MENU_PROPS[k].required === true || MENU_PROPS[k].required === this.currentMenu.resourceType) &&
            (!this.currentMenu[k] && this.currentMenu[k] !== 0)) {
          $.messager.info('提醒', '部分输入项不能为空')
          return
        }
      }
      let updateState = () => {
        this.reloadMenus()
        this.state.editing = false
        this.state.isNew = false
        $.messager.info('提醒', '保存成功')
      }
      if (this.state.isNew) {
        return api.permission.add(this.currentMenu).then(updateState)
      } else {
        return api.permission.update(this.currentMenu).then(updateState)
      }
    },

    deleteMenu (onSuccess) {
      if (this.currentMenu.id) {
        let types = this.inputOptions.resourceType.data
        let menuType = ''
        if (types && types.length) {
          let found = types.find(t => t.value === this.currentMenu.resourceType)
          if (found) {
            menuType = found.text
          }
        }
        let msg = `删除${menuType}: ${(this.currentMenu.name || this.currentMenu.id)}?`
        $.messager.confirm('确认', msg, r => {
          if (r) {
            api.permission.delete(this.currentMenu.id).then(() => {
              $.messager.info('删除成功', '菜单')
              this.reloadMenus()
              onSuccess()
            })
          }
        })
      } else {
        $.messager.info('提醒', '内容未保存')
      }
    },

    createMenu () {
      let pid = this.currentMenu.resourceType >= 2 ? this.currentMenu.pid : this.currentMenu.id || '0'
      let resourceType = this.currentMenu.resourceType >= 1 ? '2' : '1'
      this.$refs['etree'].callByName('select', '')  // select none first
      this._currentMenu_copy = Object.assign({}, EMPTY_MENU, { pid, resourceType })
      this.currentMenu = JSON.parse(JSON.stringify(this._currentMenu_copy))
    },

    copyMenu () {
      let _currentMenuCopy = JSON.parse(JSON.stringify(this.currentMenu))
      if (_currentMenuCopy.hasOwnProperty('id')) {
        delete _currentMenuCopy.id
      }
      this.$refs['etree'].callByName('select', '')  // select none first, this will reset this.currentMenu/_copy
      this._currentMenu_copy = _currentMenuCopy
      this.currentMenu = JSON.parse(JSON.stringify(this._currentMenu_copy))
    },

    onBtnClick (btnKey) {
      let btnHandlers = {
        btnAdd: () => {
          this.checkState(() => {
            this.state.changed = {}
            this.createMenu()
            this.state.isNew = true
            this.state.editing = true
          })
        },
        btnEdit: () => {
          if (this.currentMenu && this.currentMenu.id) {
            this.state.isNew = false
            this.state.editing = true
          } else {
            $.messager.info('提醒', '请先选择要编辑的条目')
          }
        },
        btnDelete: () => {
          this.deleteMenu(() => {
            this.state.isNew = false
            this.state.editing = false
          })
        },
        btnCopy: () => {
          this.checkState(() => {
            this.state.changed = {}
            this.copyMenu()
            this.state.isNew = true
            this.state.editing = true
          })
        },
        btnRefresh: () => {
          this.reloadMenus()
        }
      }
      // TODO print & download
      if (btnHandlers[btnKey]) {
        btnHandlers[btnKey].call(this)
      }
    },

    onInputChange (mpk, newValue) {
      if (!this._currentMenu_copy) {
        return
      }
      let origValue = this._currentMenu_copy[mpk]
      let _origValue = typeof origValue === 'number' ? ('' + origValue) : origValue
      let _newValue = typeof newValue === 'number' ? ('' + newValue) : newValue
      this.state.changed[mpk] = _origValue !== _newValue
      if (mpk === 'resourceType') {
        this.toggleValidation()
      }
    },

    toggleValidation () {
      switch (this.currentMenu.resourceType) {
        case '2':
          this.$refs['input_btnKey'][0].callByName('enableValidation')
          break
        case '1':
        case '0':
          this.$refs['input_btnKey'][0].callByName('disableValidation')
          break
      }
    },

    checkState (callback, node) {
      if (this.state.editing) {
        let modified = Object.keys(this.state.changed)
          .filter(k => this.state.changed[k])
          .map(k => MENU_PROPS[k].label || k)
        if (modified.length) {
          let msg = `<p>以下内容未保存，放弃这些更改？</p>
                     <p> <strong>${modified}</strong> </p>`
          $.messager.confirm('确认', msg, r => {
            if (r) {
              typeof callback === 'function' && callback()
              if (node) {
                this.$refs['etree'].callByName('select', node.target)
              }
            }
          })
          return false
        }
      }
      typeof callback === 'function' && callback()
      return true
    },

    selectTreeNodeByMenu (menu) {
      menu = menu || this.currentMenu
      // Note: new created menu has no id
      if (menu.id) {
        let currentNode = this.$refs['etree'].callByName('find', menu.id)
        this.$refs['etree'].callByName('select', currentNode.target)
      }
    },

    onBeforeSelect (node) {
      return this.checkState(() => {
        this.state.editing = false
        this.state.isNew = false
        this.setCurrentMenu(node)
      }, node)
    },

    setCurrentMenu (node) {
      let selectedNode = node || this.$refs['etree'].callByName('getSelected')
      this._currentMenu_copy = selectedNode ? selectedNode.attributes : {}
      this.currentMenu = JSON.parse(JSON.stringify(this._currentMenu_copy))
    },

    getTypes () {
      return api.permission.getTypes().then(data => {
        if (data.channel) {
          this.inputOptions.channel.data = Object.keys(data.channel).map(k => ({value: +k, text: data.channel[k]}))
        }
        if (data.type) {
          this.inputOptions.resourceType.data = Object.keys(data.type).map(k => ({value: k, text: data.type[k]}))
        }
        if (data['permissionList']) {
          let rootNode = {
            id: '0',
            text: '根目录',
            children: getTreeData(data['permissionList'], 'rolePermissionDtoList', {text: 'name'}, {
              child: node => node.resourceType !== '1'
            })
          }
          this.inputOptions.pid.data = [rootNode]
        }
        return data
      })
    }
  },

  created () {
    this.toolButtons = getMainButtons()
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  margin-top: 15px;
}
.form-label {
  width: 56px;
}
.form-footer {
  margin: 20px 80px 0 0;
  text-align: center;
}
</style>

