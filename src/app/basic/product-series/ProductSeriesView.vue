<template>
  <section class="content">
    <eui-layout :config="LAYOUT_CONFIG">

      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="btnClick"
                    @clear="resetSearch">
      </main-toolbar>
      

      <eui-datagrid slot="center" ref="seriesGrid"
                    :options="gridOptions"
                    style="width: 100%;height: 100%">
      </eui-datagrid>

    </eui-layout>

    <series-dialog ref="seriesDialog"
                 v-model="editingSeries"
                 model-name="series"
                 :model-config="SERIES_PROPS"
                 :dialog-options="dialogOptions"
                 :customer-options="customerCombo"
                 :type-options="typeCombo"
                 @saved="service.reloadData">
    </series-dialog>

    <search-dialog ref="searchDialog"
                 v-model="searchSeries"
                 model-name="series"
                 :model-config="SEARCH_PROPS"
                 :dialog-options="searchOptions"
                 :customer-options="customerCombo"
                 :type-options="typeCombo"
                 @searched="searchSeries">
    </search-dialog>

  </section>
</template>

<script>
  import TabPane from '@/components/views/TabPane'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import MainToolbar from '@/components/common/MainToolbar'
  import EuiDatagrid from '@/components/easyui/data/EuiDatagrid'
  import SeriesDialog from './productSeriesDialog'
  import SearchDialog from './seriesSearchDialog'

  import { getMainButtons } from '@/app/common'
  import { PRODUCT_PROPS, SERIES_PROPS, SEARCH_PROPS, LAYOUT_CONFIG, FEATURE_BUTTONS } from './productSeries.config'
  import SeriesService from './productSeries.service'

  export default {
    name: 'ProductSeriesView',

    _meta: {
      path: 'basic/product-series',
      title: '产品系列'
    },

    components: {
      EuiDatagrid,
      EuiLayout,
      SeriesDialog,
      MainToolbar,
      SearchDialog
    },
    mixins: [TabPane],

    data () {
      let service = new SeriesService(this)
      return {
        service,
        LAYOUT_CONFIG,
        SERIES_PROPS,
        SEARCH_PROPS,
        toolButtons: [],

        customerCombo: [],

        typeCombo: [],

        editingSeries: {},

        dialogOptions: {
          title: '产品系列管理'
        },
        searchOptions: {
          title: '查询'
        },
        gridOptions: {
          rownumbers: true,
          pagination: true,
          fitColumns: true,
          singleSelect: true,
          selectOnCheck: false,
          fit: true,
          checkOnSelect: false,
          columns: [
            PRODUCT_PROPS.toArray().map(p => ({
              field: p.key,
              title: p.value.label,
              width: 1
            }))
          ],
          onDblClickRow: service.gridOnDblClickRow,
          loader: service.gridLoader
        }
      }
    },
    methods: {
      btnClick (btnId, data) {
        switch (btnId) {
          case 'btnAdd':
            this.service.addSeries()
            break
          case 'btnEdit':
            this.service.editSeries()
            break
          case 'btnDelete':
            this.service.deleteSeries()
            break
          case 'btnSearch':
            this.service.searchSeries()
            break
        }
      },
      searchSeries () {
        console.log(23)
      },
      resetSearch (btnId) {
        this.service.searchSeries()
      },
      getCustomer () {
        this.service.customerCombo()
      },
      getType () {
        this.service.seriesCombo()
      }
    },

    created () {
      getMainButtons({
        buttons: FEATURE_BUTTONS
      }).then(buttons => {
        this.toolButtons = buttons
        this.getCustomer()
        this.getType()
      })
    }
  }
</script>
