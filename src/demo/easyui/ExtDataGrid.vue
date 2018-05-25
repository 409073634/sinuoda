<template>
  <section class="content">
    <div style="position: absolute; right: 0; margin: 20px;">
      <eui-datagrid ref="edg"
                    :options="dgOptions"
                    styles="width:400px;height:250px">
      </eui-datagrid>
    </div>
  </section>
</template>

<script>
import EUI_GLOBAL from '@/assets/plugins/easyui/extension'
import TabPane from '@/components/views/TabPane'
import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'

export default {
  name: 'ExtDataGrid',
  mixins: [TabPane],
  components: {
    EuiDatagrid
  },
  data () {
    return {
      subdata: [
        {field: 'code', title: 'Code'},
        {field: 'name', title: 'Name'},
        {field: 'price', title: 'Price', align: 'right'}
      ],
      dgOptions: {
        height: 'auto',
        fitColumns: true,
        singleSelect: true,
        view: EUI_GLOBAL.datagrid_detailview,
        detailFormatter: (index, row) => {
          return `<div style="padding:2px;position:relative;">
                    <table class="ddv"></table>
                  </div>`
        },
        onExpandRow: (index, row) => {
          var ddv = this.$refs.edg.callByName('getRowDetail', index).find('table.ddv')
          ddv.datagrid({
            height: 'auto',
            fitColumns: true,
            singleSelect: true,
            onLoadSuccess: () => {
              this.$refs.edg.callByName('fixDetailRowHeight', index)
            },
            data: [
              {code: 1, name: 'x', price: '224'},
              {code: 2, name: 'y', price: '226'}
            ],
            columns: [
              this.subdata
            ]
          })
        },
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
  }
}
</script>

<style scoped>

</style>
