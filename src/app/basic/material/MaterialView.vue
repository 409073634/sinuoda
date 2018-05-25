<template>
  <section class="content">
    <h4>Todo</h4>

    <eui-layout :confit="LAYOUT_CONFIG">

      <!--<main-toolbar slot="north" />-->

    </eui-layout>

  </section>
</template>

<script>
  import EuiLayout from '@/components/easyui/layout/EuiLayout'

  const LAYOUT_CONFIG = {
  }

  export default {
    name: 'MaterialView',

    _meta: {
      path: 'basic/material',
      title: '原材料管理',
      icon: 'fa-leaf'
    },

    components: {
      EuiLayout
    },

    data () {
      return {
        LAYOUT_CONFIG
      }
    }
  }
</script>
