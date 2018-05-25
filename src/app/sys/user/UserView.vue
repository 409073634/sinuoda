<template>
  <section class="content">
    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="onBtnClick">
      </main-toolbar>
      <eui-tree slot="west" ref="etree" :options="trOptions"> </eui-tree>

      <div id="dg_personnel" slot="center" class="easyui-datagrid" style="width:100%;height:100%"></div>
    </eui-layout>
    <div id="personnel_dialog" closed="true" class="easyui-dialog">
      <div id="personnel_tabs" class="easyui-tabs" data-options="narrow:true,border:false,fit:true">
        <div title="基本信息" data-options="border:false,closable:false, pill:true,border:false">
          <form id="personnel_form" style="width:100%;padding:15px">
            <table class="personinfo-wrapper">
              <tr>
                <td width="80"><span class="item-font">工号:</span></td>
                <td width="150">
                  <eui-textbox :options="{required: true}" v-model="formdata.username"></eui-textbox>
                </td>
                <td width="80"><span class="item-font">姓名:</span></td>
                <td width="150">
                  <eui-textbox ref="name" :options="nameOptions" v-model="formdata.name"></eui-textbox>
                </td>
                <td colspan="2" rowspan="4">
                  <div class="avatar-wrapper">
                    <div id="avatarbox">
                      <img id="avatar" :src="imgsrc" width="180" height="120"/>
                    </div>
                    <eui-filebox @changepic="changeAvatar" ref="avatar" :styles="'width:180px'"
                                 :options="avatarOptions" :fileboxname="name_avatar"></eui-filebox>
                  </div>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">部门:</span></td>
                <td>
                  <eui-combotree :options="combotreeOptions.department" v-model="formdata.depcode"></eui-combotree>
                </td>
                <td><span class="item-font">拼音码:</span></td>
                <td>
                  <eui-textbox v-model="formdata.hotkey"></eui-textbox>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><span class="item-font">出生年月:</span></td>
                <td>
                  <eui-datebox v-model="formdata.birthday"></eui-datebox>
                </td>
                <td><span class="item-font">性别:</span></td>
                <td>
                  <eui-combobox :options="comboboxOptions.sex" v-model="formdata.sex"></eui-combobox>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><span class="item-font">身份证号:</span></td>
                <td>
                  <eui-textbox :options="{required: true, validType: 'idCard'}" v-model="formdata.idcard"></eui-textbox>
                </td>
                <td><span class="item-font">手机号:</span></td>
                <td>
                  <eui-textbox :options="{validType: 'mobile', required: true}" v-model="formdata.mobile"></eui-textbox>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><span class="item-font">毕业学校:</span></td>
                <td>
                  <eui-textbox v-model="formdata.graduate"></eui-textbox>
                </td>
                <td><span class="item-font">员工状态:</span></td>
                <td>
                  <eui-combobox :options="comboboxOptions.poststatus" v-model="formdata.postStatus"></eui-combobox>
                </td>
                <td><span class="item-font">学历:</span></td>
                <td>
                  <eui-combobox :options="comboboxOptions.degree" v-model="formdata.degree"></eui-combobox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">政治面貌:</span></td>
                <td>
                  <eui-combobox :options="comboboxOptions.politics" v-model="formdata.politics"></eui-combobox>
                </td>
                <td><span class="item-font">名族:</span></td>
                <td>
                  <eui-textbox v-model="formdata.nation"></eui-textbox>
                </td>
                <td><span class="item-font">卡号:</span></td>
                <td>
                  <eui-textbox v-model="formdata.mediaNo"></eui-textbox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">职称:</span></td>
                <td>
                  <!--<eui-textbox v-model="formdata.positionalTitles"></eui-textbox>-->
                  <eui-combobox :options="comboboxOptions.positionalTitles"
                                v-model="formdata.positionalTitles"></eui-combobox>
                </td>
                <td><span class="item-font">邮箱地址:</span></td>
                <td>
                  <eui-textbox :options="{validType: 'email'}" v-model="formdata.email"></eui-textbox>
                </td>
                <td><span class="item-font">卡号(超高频):</span></td>
                <td>
                  <eui-textbox v-model="formdata.smediaNo"></eui-textbox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">试用开始:</span></td>
                <td>
                  <eui-datebox v-model="formdata.trialStart" :options="trialStartOptions"></eui-datebox>
                </td>
                <td><span class="item-font">合同开始:</span></td>
                <td>
                  <eui-datebox v-model="formdata.contractStart" :options="contractStartOptions"></eui-datebox>
                </td>
                <td width="80"><span class="item-font">专业:</span></td>
                <td width="150">
                  <eui-textbox v-model="formdata.major"></eui-textbox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">试用结束:</span></td>
                <td>
                  <eui-datebox v-model="formdata.trialEnd" :options="trialEndOptions"></eui-datebox>
                </td>
                <td><span class="item-font">合同结束:</span></td>
                <td>
                  <eui-datebox v-model="formdata.contractEnd" :options="contractEndOptions"></eui-datebox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">离职时间:</span></td>
                <td>
                  <eui-datebox v-model="formdata.dimissionTime"></eui-datebox>
                </td>
                <td><span class="item-font">居住地址:</span></td>
                <td colspan="3">
                  <eui-textbox v-model="formdata.address"></eui-textbox>
                </td>
              </tr>
              <tr>
                <td><span class="item-font">离职原因:</span></td>
                <td colspan="3">
                  <eui-textbox :styles="'width:100%'" v-model="formdata.dimission"></eui-textbox>
                </td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </form>
        </div>
        <div title="岗位信息" data-options="closable:true,closable:false, pill:true,border:false">
          <div id="roleinfo" class="easyui-datagrid"></div>
        </div>
      </div>
    </div>
    <eui-window ref="search_dialog" :options="searchOptions">
      <div class="row-wrap">
        <label>员工号:</label>
        <eui-input eui-type="textbox" style="width: 150px" v-model="searchCondition.username"></eui-input>
        <label>姓名:</label>
        <eui-input eui-type="textbox" style="width: 150px" v-model="searchCondition.name"></eui-input>
      </div>
      <div class="row-wrap">
        <label>部门:</label>
        <eui-combotree :options="combotreeOptions.departmentInSearch" v-model="searchCondition.depcode"></eui-combotree>
        <label>性别:</label>
        <eui-combobox style="width: 150px" :options="comboboxOptions.sex" v-model="searchCondition.sex"></eui-combobox>
      </div>
      <div class="row-wrap">
        <label>状态:</label>
        <eui-combobox style="width: 150px" :options="comboboxOptions.poststatusInSearch"
                      v-model="searchCondition.postStatus"></eui-combobox>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="SearchSure">确定</button>
        <button class="btn btn-default" @click="SearchCancel">取消</button>
      </div>
    </eui-window>
    <div id="personnel_dialog_buttons">
      <button class="btn btn-success" @click="personnelDialogSave"><i class="fa fa-check"></i>保存</button>
      <button class="btn btn-primary" @click="personnelDialogCancel"><i class="fa fa-close"></i>退出</button>
    </div>
  </section>
</template>

<script>
  import $ from 'jquery'
  import api from '@/api'
  import axios from 'axios'
  import fileDownload from 'js-file-download'
  import { getMainButtons } from '@/app/common'
  import TabPane from '@/components/views/TabPane'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'
  import EuiCombotree from '@/components/easyui/form/EuiCombotree'
  import EuiCombobox from '@/components/easyui/form/EuiCombobox'
  import EuiDatebox from '@/components/easyui/form/EuiDatebox'
  import EuiFilebox from '@/components/easyui/form/EuiFilebox'
  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiInput from '@/components/easyui/form/EuiInput'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import MainToolbar from '@/components/common/MainToolbar'
  import {formatDate} from '@/utils/util'
  import {PreviewImage} from '@/assets/plugins/preview-image'
  import {getZwToPy} from '@/assets/plugins/zw-to-py.js'
  import config from '@/config'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid.vue'

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
  const EMPTY_PERSON_INFO = {
    name: '',  // 姓名
    avatar: '',
    username: '', // 工号
    sex: '',     // 性别
    depcode: '',   // 部门编号
    hotkey: '',    // 拼音码
    nation: '',    // 名族
    birthday: '',  // 生日
    politics: '',  // 政治面貌
    idcard: '',    // 身份证
    mobile: '',    // 手机号
    address: '',   // 住址
    major: '',     // 专业
    degree: '', // 学历
    graduate: '',  // 毕业学校
    mediaNo: '',   // 高频卡号
    smediaNo: '',  // 超高频卡号
    postStatus: '', // 员工状态
    positionalTitles: '', // 职称
    email: '',      // 邮件
    trialStart: '', // 试用开始时间
    trialEnd: '',   // 试用结束时间
    contractStart: '', // 合同开始时间
    contractEnd: '',   // 合同结束时间
    dimissionTime: '', // 离职时间
    dimission: ''      // 离职原因
  }
  const BLANK_PIC = '/static/img/blank.jpg'
  const INIT_CONDITION = {
    depcode: '0001',
    page: 1,
    pageSize: 10,
    username: '',
    name: '',
    sex: '',
    postStatus: ''
  }
  export default {
    _meta: {
      path: 'sys/user',
      title: '员工信息'
    },
    name: 'UserView',
    mixins: [TabPane],
    components: {
      EuiWindow,
      EuiDatagrid,
      EuiTree,
      EuiForm,
      EuiTextbox,
      EuiNumberbox,
      EuiCombotree,
      EuiCombobox,
      EuiDatebox,
      EuiFilebox,
      EuiInput,
      MainToolbar,
      EuiLayout
    },
    data() {
      return {
        LAYOUT_CONFIG,
        role: {},
        toolButtons: getMainButtons(),
        searchCondition: JSON.parse(JSON.stringify(INIT_CONDITION)),
        flags: {
          editing: false
        },
        serverURI: config.serverURI,
        imgsrc: BLANK_PIC,
        name_avatar: 'name_avatar',
        trOptions: {
          onClick: node => {
            let selectedNode = this.$refs['etree'].callByName('getSelected')
            this.searchCondition.depcode = selectedNode ? selectedNode.attributes.code : '0001'
            this.getData().then(data => {
              this.personnelDg.datagrid('loadData', data)
            })
          },
          onContextMenu() {
            console.log('e:right click')
          },
          loader: (params, success, error) => {
            api.department.getDepartmentTree().then(data => {
              success(data)
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
        formdata: JSON.parse(JSON.stringify(EMPTY_PERSON_INFO)),
        nameOptions: {
          required: true,
          onChange: () => {
            this.formdata.hotkey = getZwToPy(this.formdata.name)[0]  // 有多音字 取第一个
          }
        },
        combotreeOptions: {
          department: {
            required: true,
            data: [],
            onChange: (o, n) => {}
          },
          departmentInSearch: {
            data: []
          }
        },
        comboboxOptions: {
          sex: {
            editable: false,
            data: []
          },
          degree: {
            editable: false,
            data: []
          },
          politics: {
            editable: false,
            data: []
          },
          poststatus: {
            editable: false,
            required: true,
            data: []
          },
          poststatusInSearch: {
            editable: false,
            data: []
          },
          positionalTitles: {
            editable: false,
            data: []
          }
        },
        contractStartOptions: {
          formatter: (val) => {  // 合同开始时间小于合同结束时间
            let date = formatDate(new Date(val), 'yyyy-MM-dd')
            let ContractStart = this.formdata.contractStart
            let ContractEnd = this.formdata.contractEnd
            if (ContractEnd !== null && ContractEnd !== '') {
              if (date > ContractEnd) {
                $.messager.alert('消息', '合同开始时间不能大于结束时间')
                return ContractStart
              }
            }
            return date
          }
        },
        contractEndOptions: {
          formatter: (val) => {  // 合同开始时间小于合同结束时间
            let date = formatDate(new Date(val), 'yyyy-MM-dd')
            let ContractStart = this.formdata.contractStart
            let ContractEnd = this.formdata.contractEnd
            if (ContractEnd !== null && ContractEnd !== '') {
              if (ContractStart > date) {
                $.messager.alert('消息', '合同开始时间不能大于结束时间')
                return ContractEnd
              }
            }
            return date
          }
        },
        trialStartOptions: {
          formatter: (val) => {  // 试用开始时间小于合同结束时间
            let date = formatDate(new Date(val), 'yyyy-MM-dd')
            let trialStart = this.formdata.trialStart
            let trialEnd = this.formdata.trialEnd
            if (trialEnd !== null && trialEnd !== '') {
              if (date > trialEnd) {
                $.messager.alert('消息', '试用开始时间不能大于结束时间')
                return trialStart
              }
            }
            return date
          }
        },
        trialEndOptions: {
          formatter: (val) => {  // 试用开始时间小于合同结束时间
            let date = formatDate(new Date(val), 'yyyy-MM-dd')
            let trialStart = this.formdata.trialStart
            let trialEnd = this.formdata.trialEnd
            if (trialEnd !== null && trialEnd !== '') {
              if (trialStart > date) {
                $.messager.alert('消息', '试用开始时间不能大于结束时间')
                return trialEnd
              }
            }
            return date
          }
        },
        avatarOptions: {
          prompt: '选择头像图片',
          buttonText: '&nbsp;选&nbsp;择&nbsp;',
          onChange: () => {
            if (this.$refs.avatar.callByName('getValue')) {
              this.$refs.avatar.getTarget()
            }
          }
        },
        searchOptions: {
          width: 500,
          title: '搜索条件',
          closable: false
        },
        rolelist: []
      }
    },
    methods: {
      init() {
        this._initDialog()
        this._initFormCombobox()
        this._initTabs()
        this._initRoleDatagrid()
        this.personnelDg = $('#dg_personnel')
        this.personnelDg.datagrid({
          remoteSort: false,
          rownumbers: true,
          singleSelect: true,
          pagination: true,
          fitColumns: true,
          pageSize: 10,
          pageList: [5, 10, 20, 30, 40, 50, 100],
          frozenColumns: [[
            {field: 'username', title: '工号', sortable: true, width: 100},
            {field: 'name', title: '姓名', width: 100},
            {field: 'depcode', title: '部门', width: 100}
          ]],
          columns: [[
//            {field: 'ck', checkbox: true},
            {field: 'sex', title: '性别', width: 100},
            {field: 'positionalTitles', title: '职称', width: 100},
            {field: 'idcard', title: '身份证', width: 100},
            {field: 'mobile', title: '手机号', width: 100}
          ]],
          onDblClickRow: (rowIndex, rowData) => {
            this.flags.editing = true
            api.personnel.getPersonnnelInputInfo(rowData.id).then((data) => {
              this.formdata = data.user
              this.imgsrc = this.serverURI + data.user.avatar
              this.p_dlg.dialog({
                title: '编辑职员'
              })
              this.getRoleData().then(data => {
                this.p_dlg.dialog('open')
                this.role.datagrid('loadData', data)
                this.addNewRoleRow()
              })
            })
          }
        })
        this.getData().then(data => {
          this.personnelDg.datagrid('loadData', data)
          this.pager = this.personnelDg.datagrid('getPager')
          this.pager.pagination({
            showRefresh: false,
            onChangePageSize: () => {
            },
            onSelectPage: (pageNumber, pageSize) => {
              this.searchCondition.page = pageNumber
              this.searchCondition.pageSize = pageSize
              this.reloadDatagrid()
            }
          })
        })
      },
      getData() {
        return api.personnel.getPersonnelInfo(this.searchCondition).then(data => {
          let _datagrid = {}
          _datagrid['total'] = data.total
          _datagrid['rows'] = []
          for (let i in data.records) {
            _datagrid['rows'].push(data.records[i])
          }
          return _datagrid
        })
      },
      getRoleData() {
        return api.personnel.getPersonnelRole(this.formdata.id).then((data) => {
          let _datagrid = {}
          this.rolelist = []
          _datagrid['total'] = data.roleList.length
          _datagrid['rows'] = []
          for (let i in data.roleList) {
            _datagrid['rows'].push(data.roleList[i])
            this.rolelist.push(data.roleList[i].id)
          }
          return _datagrid
        })
      },
      onBtnClick(btnKey, index) {
        let btnHandlers = {
          btnAdd: () => {
            this.formdata = JSON.parse(JSON.stringify(EMPTY_PERSON_INFO))
            this.imgsrc = BLANK_PIC
            this.p_dlg.dialog({
              title: '新增职员'
            })
            this.p_dlg.dialog('open')
            this.rolelist = []
            this.addNewRoleRow()
          },
          btnEdit: () => {
            let selectedNode = this.personnelDg.datagrid('getSelected')
            this.flags.editing = true
            if (!selectedNode) {
              $.messager.info('提醒', '请先选择要编辑的条目')
              return
            }
            api.personnel.getPersonnnelInputInfo(selectedNode.id).then((data) => {
              this.formdata = data.user
              this.imgsrc = this.serverURI + data.user.avatar
              this.p_dlg.dialog({
                title: '编辑职员'
              })
              this.getRoleData().then(data => {
                this.p_dlg.dialog('open')
                this.role.datagrid('loadData', data)
                this.addNewRoleRow()
              })
            })
          },
          btnDelete: () => {
            let selectedNode = this.personnelDg.datagrid('getSelected')
            console.log(selectedNode)
            if (selectedNode) {
              let msg = `是否删除该员工信息: ${selectedNode.name}?`
              $.messager.confirm('确认', msg, r => {
                if (r) {
                  api.personnel.deletePersonInfo(selectedNode.id).then((data) => {
                    $.messager.info('提醒', '删除成功')
                    this.reloadDatagrid()
                  })
                }
              })
            } else {
              $.messager.info('提醒', '请先选择要删除的员工')
            }
          },
          btnSearch: () => {
            this.$refs.search_dialog.callByName('open')
          },
          btnPrint: () => {
          },
          btnImport: () => {
          },
          btnDownload: () => {
            alert(index)
            axios.post('http://192.168.2.34:9100/sys/user/exportAllPaged', {}, {responseType: 'arraybuffer'})
              .then(res => {
                let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
//                let objectUrl = URL.createObjectURL(blob)
//              window.location.href = objectUrl
                fileDownload(blob, '员工信息.xlsx')
              })
          }
        }
        // TODO print & download
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      _initDialog() {
        this.p_dlg = $('#personnel_dialog')
        this.p_dlg.dialog({
          width: 800,
          height: 645,
          resizable: true,
          cls: 'dialog',
          maximizable: false,
          inline: true,
          buttons: '#personnel_dialog_buttons'
        })
      },
      _initFormCombobox() {
        this.getSelectInfos()
      },
      _initTabs() {
        $('#personnel_tabs').tabs({
          fit: true,
          narrow: true
        })
      },
      getTreeData(data, childProp) {
        let setName = node => ({
          id: node.code,
          text: node.name,
          children: (node[childProp] && node[childProp].length) ? node[childProp].map(setName) : undefined,
          attributes: node
        })
        return [{
          id: data.code,
          text: data.name,
          children: data[childProp].map(setName),
          attributes: data
        }]
      },
      getSelectInfos() {
        api.personnel.getComboboxInfo().then((data) => {
          for (let k in data.sex) {
            this.comboboxOptions.sex.data.push({value: k, text: data.sex[k]})
          }
          for (let k in data.degree) {
            this.comboboxOptions.degree.data.push({value: k, text: data.degree[k]})
          }
          for (let k in data.politics) {
            this.comboboxOptions.politics.data.push({value: k, text: data.politics[k]})
          }
          for (let k in data.poststatus) {
            this.comboboxOptions.poststatus.data.push({value: k, text: data.poststatus[k]})
            this.comboboxOptions.poststatusInSearch.data.push({value: k, text: data.poststatus[k]})
          }
          for (let k in data.positionalTitle) {
            this.comboboxOptions.positionalTitles.data.push({value: k, text: data.positionalTitle[k]})
          }
          this.combotreeOptions.department.data = this.getTreeData(data.departmentTree, 'children')
          this.combotreeOptions.departmentInSearch.data = JSON.parse(JSON.stringify(this.combotreeOptions.department.data))
        })
      },
      personnelDialogSave() {
        let pslform = $('#personnel_form')
        let validate = pslform.form('validate')
        if (!validate) {
          pslform.find('.validatebox-invalid:first').focus()
        } else {
          if (this.flags.editing) {
            api.personnel.editPersonnelInfo(this.formdata).then(() => {
              let roledata = {}
              roledata['userId'] = this.formdata.id
              roledata['roleIdList'] = this.rolelist
              api.personnel.setPersonnelRole(roledata).then(() => {
                $.messager.info('提示', '员工信息修改成功!')
                this.p_dlg.dialog('close')
                this.flags.editing = false
                this.rolelist = []
                this.reloadDatagrid()
                this.$refs.avatar.callByName('setValue', '')
              })
            })
          } else {
            api.personnel.addPersonnelInfo(this.formdata).then((data) => {
              let roledata = {}
              roledata['userId'] = data.userId
              roledata['roleIdList'] = this.rolelist
              api.personnel.setPersonnelRole(roledata).then(() => {
                $.messager.info('提示', '员工信息添加成功!')
                this.p_dlg.dialog('close')
                this.flags.editing = false
                this.rolelist = []
                this.reloadDatagrid()
                this.$refs.avatar.callByName('setValue', '')
                let t = this.$refs.avatar.callByName('getValue')
                console.log('t', t)
              })
            })
          }
        }
      },
      personnelDialogCancel() {
        this.flags.editing = false
        this.flags.firstenter = true
        this.p_dlg.dialog('close')
      },
      changeAvatar(target) {
        PreviewImage(target, 'avatar', 'avatarbox')
        api.personnel.getAvatarUrl(target.files[0]).then(url => {
          this.formdata.avatar = url.path
          this.imgsrc = this.serverURI + this.formdata.avatar
        })
      },
      reloadDatagrid() {
        this.getData().then(data => {
          this.personnelDg.datagrid('loadData', data)
        })
      },
      _initRoleDatagrid() {
        this.role = $('#roleinfo')
        this.role.datagrid({
          rownumbers: true,
          singleSelect: true,
          fit: true,
          autoRowHeight: false,
          onClickCell: (i, f, v) => {
            // console.log(i, f, v)
            if (f !== 'role') {
              if (!i && this.role.datagrid('getRows').length === 1 || i === (this.role.datagrid('getRows').length - 1)) return
              this.role.datagrid('deleteRow', i)  // 准确根据行号删
              this.rolelist.splice(i, 1)
            }
          },
          columns: [[
            {
              field: '_',
              title: '删除',
              align: 'center',
              width: 60,
              formatter: (v, r, i) => {
                return `<a class='btn-xs'><i class="fa fa-minus"></i></a>`
              }
            }, {
              field: 'role',
              title: '角色',
              width: 150,
              align: 'center',
              editor: {
                type: 'combobox',
                options: {
                  editable: false,
                  valueField: 'id',
                  textField: 'role',
                  align: 'center',
                  loader: (params, success, error) => {
                    api.personnel.getRolesAll().then(data => {
                      success(data)
                    })
                  },
                  loadFilter: data => {
                    return data
                  },
                  onChange: (newv, oldv) => {
                    if (newv) {
                      if (this.rolelist.indexOf(newv) === -1) {  // 如果新角色 不在rolelist中
                        if (!oldv) {                             // combobox旧值 为空
                          this.rolelist.push(newv)
                          this.addNewRoleRow()
                        } else {
                          this.rolelist[this.rolelist.indexOf(oldv)] = newv
                        }
                      } else {
                        if (this.rolelist.length === (this.role.datagrid('getRows').length - 1)) {
                          let ed = this.role.datagrid('getEditor', {
                            index: this.role.datagrid('getRows').length - 1,
                            field: 'role'
                          })
                          $(ed.target).combobox('setValue', '')
                        }
                        $.messager.alert('消息', '请不要选择相同的岗位')
                      }
                    }
                  }
                }
              }
            }
          ]]
        })
      },
      addNewRoleRow() {
        this.role.datagrid('appendRow', {})
        let editIndex = this.role.datagrid('getRows').length - 1
        this.role.datagrid('beginEdit', editIndex)
      },
      SearchSure() {
        this.getData().then(data => {
          this.personnelDg.datagrid('loadData', data)
          this.$refs.search_dialog.callByName('close')
          this.searchCondition = JSON.parse(JSON.stringify(INIT_CONDITION))
        })
      },
      SearchCancel() {
        this.searchCondition = JSON.parse(JSON.stringify(INIT_CONDITION))
        this.$refs.search_dialog.callByName('close')
      }
    },
    mounted() {
      this.init()
    },
    watch: {},
    create() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content
    overflow: auto
    padding: 0
    margin-top: 0
    height: 100%

  .btns-wrapper
    padding: 5px 10px
    border-bottom: 1px solid #ddd
    i
      margin-right: 2px

  .btn-info
    margin: 5px 5px

  .personinfo-wrapper
    width: 100%
    border-collapse: separate
    border-spacing: 6px 8px
    /*tr*/
    /*td:nth-child(2n)*/
    /*width: 150px*/
    .item-font
      display: inline-block
      width: 100%
      font-size: 14px
      text-align: right
      white-space: nowrap

  .avatar-wrapper
    float: right

  .row-wrap
    margin-bottom: 5px
    label
      display: inline-block
      width: 50px
      text-align: right

</style>
<style scoped>
  .content /deep/ .tabs-title {
    font-size: 14px;
  }

  .content /deep/ .tabs-narrow {
    height: 27px !important;
  }

  .content /deep/ .tabs-inner {
    height: 27px !important;
    line-height: 27px !important;
  }

</style>
