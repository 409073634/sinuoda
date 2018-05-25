<template>
  <section class="content">
    <eui-layout :config="LAYOUT_CONFIG">
      <main-toolbar slot="north"
                    :buttons="toolButtons"
                    @click="">
      </main-toolbar>
      <eui-datagrid ref="currency" slot="center" :options="CurrencyDgOptions"
                    style="width:100%;height:100%"></eui-datagrid>
    </eui-layout>
  </section>
</template>

<script>
  import $ from 'jquery'
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'

  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'

  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiInput from '@/components/easyui/form/EuiInput'
  import EuiLayout from '@/components/easyui/layout/EuiLayout'
  import MainToolbar from '@/components/common/MainToolbar'
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
      center: {
        options: 'border:false',
        styles: 'min-width: 400px'
      }
    }
  }
  const INIT_CURRENCY = {
    code: '',
    name: '',
    memo: ''
  }
  export default {
    _meta: {
      path: 'basic/currency-rate',
      title: '汇率管理'
    },
    components: {
      MainToolbar,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiDatagrid,
      EuiNumberbox,
      EuiTextbox,
      EuiForm
    },
    mixins: [TabPane],
    name: 'CurrencyRateView',
    data() {
      return {
        LAYOUT_CONFIG
    },
    methods: {
      init() {
      },
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content
    height: 100%
    padding: 0
</style>
