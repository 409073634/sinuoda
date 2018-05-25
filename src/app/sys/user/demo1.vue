<template>
  <section class="content">
    <!-- 顶部 按钮区-->
    <div class="div-buttoms">
      <a v-for="" href="javascript:void(0)" @click=""
         class="btn btn-info"><i :class=""></i>name</a>
    </div>

    <div id=""
         class="easyui-layout"
         style="width:100%; min-width:600px; min-height:400px;">
      <!--左侧etree-->
      <div data-options="region:'west',border:false,minWidth:100,split:true,maxWidth:300"
           style="width:200px; background: #ecf0f5">
        <!-- 左侧树 书写位置-->
        <eui-tree ref="etree" ></eui-tree>
      </div>
      <!--右侧-->
      <div data-options="region:'center',border:false"
           style="background: #ecf0f5; min-width: 400px;">
        <!--右侧表单书写位置-->
      </div>
    </div>
  </section>
</template>

<script>
  //  import $ from 'jquery'
  //  import api from '@/api'
  //  import TabPane from '@/components/views/TabPane'
  import EuiTree from '@/components/easyui/data/EuiTree'
  import EuiForm from '@/components/easyui/form/EuiForm'
  //  import EuiTextbox from '@/components/easyui/form/EuiTextbox'
  //  import EuiNumberbox from '@/components/easyui/form/EuiNumberbox'
  //  import EuiCombotree from '@/components/easyui/form/EuiCombotree'
  //  import config from '@/config'

  export default {
    _meta: {
      path: '',
      title: ''
    },
    name: '',
    mixins: '',
    components: {
      EuiTree,
      EuiForm
    },

    data() {
      return {}
    },
    methods: {},

    mounted() {
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

  .div-buttoms
    padding: 10px 10px
    border-bottom: 1px solid #ddd
    i
      margin-right: 2px

  .btn-info
    margin: 5px 5px

</style>
