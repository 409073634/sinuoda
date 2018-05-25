<template>
  <section class="content">
    <div class="btns-wrapper">
      <a v-for="toolBtn in toolButtons" href="javascript:void(0)" @click="btnClick(toolBtn.btnKey)"
         class="btn btn-info"><i :class="toolBtn.logo"></i>{{ toolBtn.name }}</a>
    </div>

    <div id="org_department_layout"
         class="easyui-layout"
         style="width:100%; min-width:600px; min-height:400px;">
      <!--左侧etree-->
      <div data-options="region:'west',border:false,minWidth:100,split:true,maxWidth:300"
           style="width:200px; background: #ecf0f5">
        <eui-tree ref="etree" :options="trOptions" @click="onClickTree"></eui-tree>
      </div>
      <!--右侧-->
      <div data-options="region:'center',border:false"
           style="background: #ecf0f5; min-width: 400px;">
        <div class="form-wrapper">
          <eui-form :styles="'padding:5px 10px'">
            <div class="item" v-for="mpk in Object.keys(menuProps)" :key="mpk">
              <span class="item-font" v-if="mpk === 'code' && !state.adding">{{ menuProps[mpk].label }}:</span>
              <span class="item-font" v-else-if="mpk === 'name'">{{ menuProps[mpk].label }}:</span>
              <span class="item-font" v-else-if="mpk === 'pid'">{{ menuProps[mpk].label }}:</span>
              <eui-combotree v-if="mpk === 'pid'"
                             v-model="currentMenu[mpk]"
                             :options="comboOptions.pid"
                             :disabled="!state.editing || state.isroot">
              </eui-combotree>
              <eui-textbox v-else-if="mpk === 'code' && !state.adding" v-model="currentMenu[mpk]"
                           :disabled="true"></eui-textbox>
              <eui-textbox :options="{required: menuProps[mpk].required}" v-else-if="mpk === 'name'"
                           v-model="currentMenu[mpk]"
                           :disabled="!state.editing"></eui-textbox>

            </div>
            <div class="form-btn-wrapper" v-show="state.editing">
              <button type="button" class="btn btn-success" @click="saveDeparment"><i class="fa fa-check"></i>保存
              </button>
              <button type="button" class="btn btn-primary" @click="quitDeparment"><i class="fa fa-times"></i>放弃
              </button>
            </div>
          </eui-form>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  import api from '@/api'
  import { getMainButtons } from '@/app/common'
  import TabPane from '@/components/views/TabPane'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'
  import EuiCombotree from '@/components/easyui/form/EuiCombotree'
  import config from '@/config'

  const menuProps = {
    code: {label: '部门编号'},
    name: {label: '部门名称', required: true},
    pid: {label: '上级部门', required: true}
  }
  const emptyMenu = {
    name: '',   // 名称
    pid: '',    // 上级部门
    id: '',     // 部门id
    memo: '',   // memo备注
    seq: 1,     // 排序
    version: 0,  // 版本
    code: ''     // 部门编号
  }
  export default {
    _meta: {
      path: 'sys/department',
      title: '部门管理'
    },
    name: 'DepartmentsView',
    mixins: [TabPane],

    components: {
      EuiTree,
      EuiForm,
      EuiTextbox,
      EuiNumberbox,
      EuiCombotree
    },

    data() {
      return {
        // State
        menus: [],
        currentMenu: emptyMenu,
        currentMenuCopy: {},
        state: {
          editing: false,
          isroot: false,
          adding: false
        },
        // Names
        menuProps,
        toolButtons: [],
        // Options
        tbOptions: {
          onChange: data => {
            console.log('e:input changed', data)
          }
        },
        trOptions: {
          onClick: node => {
          },
          onContextMenu() {
            console.log('e:right click')
          },
          loader: (params, success, error) => {
            let token = this.$store.state.token || ''
            let url = config.serverURI + '/sys/department/tree'
            return axios.get(url, {
              headers: {token}
            }).then(resp => {
              this.menus = resp.data.data
              success(this.menus)
            })
          },
          loadFilter: data => {
            let childProp = 'children'
            let setName = node => ({
              id: node.id,
              text: node.name,
              children: (node[childProp] && node[childProp].length) ? node[childProp].map(setName) : undefined,
              attributes: node
            })
            return [{
              id: data.id,
              text: data.name,
              children: data[childProp].map(setName),
              attributes: data
            }]
          }
        },
        comboOptions: {
          pid: {
            required: true,
            data: []
          }
        }
      }
    },

    methods: {
      onClickTree(node, f) {
        this.setCurrentMenu()
      },

      setCurrentMenu() {
        if (!this.state.editing) {
          let selectedNode = this.$refs['etree'].callByName('getSelected')
          this.currentMenuCopy = selectedNode ? selectedNode.attributes : {}
          this.currentMenu = Object.assign({}, this.currentMenuCopy)
        }
      },

      initLayout() {
        $('#org_department_layout').layout()
      },

      log() {
        console.log('log log', new Date())
      },
      saveDeparment() {
        this.setCurrentMenu()
        if (this.currentMenu['pid'] === '') {
          this.currentMenu['pid'] = null
        }
        if (!this.currentMenu.name) {
          $.messager.info('提醒', '请输入部门名称')
        } else {
          if (!this.currentMenu.pid) {
            $.messager.info('提醒', '请选择父级目录')
          } else {
            console.log(this.currentMenu)
            let token = this.$store.state.token || ''
            let url = config.serverURI
            if (!this.state.adding) {
              url += '/sys/department/update'
            } else {
              url += '/sys/department/add'
            }
            axios.post(url, this.currentMenu, {headers: {token}}
            ).then(resp => {
              console.log(resp)
              this.state.editing = false
              this.state.isroot = false
              this.state.adding = false
              this.reloadMenus()
              this.getTypes()
            })
          }
        }
      },
      quitDeparment() {
        this.state.editing = false
        this.state.isroot = false
        this.state.adding = false
        this.currentMenu = Object.assign({}, this.currentMenuCopy)
      },
      btnClick(btnKey) {
        let btnHandlers = {
          btnAdd: () => {
            this.state.editing = true
            this.state.adding = true
            this.currentMenu = {
              name: '',
              pid: '',
              id: '',
              memo: '',
              seq: 1,
              version: 0,
              code: ''
            }
          },
          btnEdit: () => {
            let selectedNode = this.$refs['etree'].callByName('getSelected')
            if (!selectedNode) {
              $.messager.info('提醒', '请先选择要编辑的条目')
              return
            }
            console.log(selectedNode)
            if (!selectedNode.attributes.pid) {
              this.state.isroot = true
            }
            this.state.editing = true
          },
          btnDelete: () => {
            if (this.currentMenu.id) {
              let msg = `是否删除该部门: ${this.currentMenu.name}?`
              $.messager.confirm('确认', msg, r => {
                if (r) {
                  api.department.delete(this.currentMenu.id).then((data) => {
                    if (data) {
                      $.messager.info('删除成功', '部门')
                      this.reloadMenus()
                    }
                  })
                }
              })
            } else {
              $.messager.info('提醒', '请先选择要删除的部门')
            }
          },
          btnPrint: () => {
            console.log('print')
          },
          btnDownload: () => {
            console.log('download...')
            this.reloadMenus()
            this.getTypes()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      reloadMenus() {
        this.$refs['etree'].callByName('reload')
        // TODO focus
      },
      getTypes() {
        let token = this.$store.state.token || ''
        let url = config.serverURI + '/sys/department/tree'
        axios.get(url, {
          headers: {token}
        }).then(resp => {
          this.comboOptions.pid.data = this.getTreeData(resp.data.data, 'children')
        })
      },
      getTreeData(data, childProp) {
        let setName = node => ({
          id: node.id,
          text: node.name,
          children: (node[childProp] && node[childProp].length) ? node[childProp].map(setName) : undefined,
          attributes: node
        })
        return [{
          id: data.id,
          text: data.name,
          children: data[childProp].map(setName),
          attributes: data
        }]
      }
    },

    mounted() {
      this.toolButtons = getMainButtons()
      this.initLayout()
      this.getTypes()
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content
    overflow: auto
    padding: 0
    margin-top: 0

  .btns-wrapper
    padding: 10px 10px
    border-bottom: 1px solid #ddd
    i
      margin-right: 2px

  .tree-btn
    padding: 5px 10px

  .btn-info
    margin: 5px 5px

  .form-wrapper
    width: 300px
    padding: 20px
    .item
      margin: 10px 0
      .item-font
        margin: 0 10px
        display: inline-block
        font-size: 14px
        height: 32px
        line-height: 32px
        vertical-align: top
    .form-btn-wrapper
      width: 100%
      text-align: right
</style>
