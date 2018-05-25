<template>
  <div class="content" style="position: relative;">
    <div id="cc" class="easyui-layout" style="width:100%;height:580px;">
      <div data-options="region:'east',split:true" title="East" style="width:100px;"></div>
      <div data-options="region:'west',split:true" title="West" style="width:100px;"></div>
      <div data-options="region:'center',title:'Main Title',iconCls:'icon-ok'" style="height: 580px">
        <table id="dg_goods" class="easyui-datagrid"></table>
      </div>
    </div>

    <div id="dd" class="easyui-dialog" v-show="false" title="My Dialog" style="width:400px;height:200px;"
         data-options="iconCls:'icon-save',resizable:true,modal:true,inline:true">
      Dialog Content.
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { goodsAPI } from '../demo.data'
  import TabPane from '../../components/views/TabPane'

  export default {
    name: 'EasyLayout',

    mixins: [TabPane],

    data () {
      return {
        goodsDg: null
      }
    },

    methods: {
      init () {
        $('#cc').layout()
        this.goodsDg = $('#dg_goods')
        this.goodsDg.datagrid({
          remoteSort: false,
          rownumbers: true,
          singleSelect: true,
          pagination: true,
          toolbar: [
            {
              iconCls: 'icon-edit',
              text: 'Edit',
              handler: function () { $('#dd').dialog() }
            },
            '-',
            {
              iconCls: 'icon-help',
              text: 'Help',
              handler: () => this.goodsDg.datagrid('selectAll')
            }
          ],
          columns: [[
            { field: 'Name', title: '名称', sortable: true },
            { field: 'Description', title: '描述' },
            { field: 'Memo', title: '备注' },
            { field: 'Score', title: '分数', sortable: true },
            { field: 'Quantity', title: '数量' }
          ]]
        })
        goodsAPI.getList(0, 20).then(goods => {
          console.log(goods)
          this.goodsDg.datagrid({
            data: goods.PageData
          })
        })
      }
    },

    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
</style>
