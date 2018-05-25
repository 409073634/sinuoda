<template>
  <section class="content">
    <h3>DataGrid 1</h3>
    <table id="dg" style="width:400px;height:250px"></table>

    <h3>DataGrid 2</h3>
    <table id="dg2" class="easyui-datagrid" style="width:400px;height:250px"
           :data-options="table2Options">
      <thead>
      <tr>
        <th data-options="field:'code',width:100">Code</th>
        <th data-options="field:'name',width:100">Name</th>
        <th data-options="field:'price',width:100,align:'right'">Price</th>
      </tr>
      </thead>
    </table>

    <h3>EuiDataGrid</h3>
    <eui-datagrid :options="dgOptions" styles="width:400px;height:250px"></eui-datagrid>
  </section>
</template>

<script>
  import $ from 'jquery'
  import TabPane from '@/components/views/TabPane'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'

  export default {
    name: 'EasyDataGrid',

    mixins: [TabPane],

    components: {
      EuiDatagrid
    },

    data () {
      return {
        dgOptions: {
          data: [
            {code: 1, name: 'x', price: '333'},
            {code: 2, name: 'y', price: '335'}
          ],
          columns: [[
            {field: 'code', title: 'Code', width: 100},
            {field: 'name', title: 'Name', width: 100},
            {field: 'price', title: 'Price', width: 100, align: 'right'}
          ]]
        }
      }
    },

    computed: {
      table2Options () {
        return `
          data: [{code: 1, name: 'x', price: '333'}],
          fitColumns: true,
          singleSelect: true
        `
      }
    },

    methods: {
      initGrid () {
        $('#dg').datagrid(this.dgOptions)
        $('#dg2').datagrid()
      }
    },

    mounted () {
      this.initGrid()
    }
  }
</script>

<style scoped>
</style>

