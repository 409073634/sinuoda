<template>
  <table :style="styles"></table>
</template>

<script>
import EuiData from './EuiData'

export default {
  name: 'EuiDatagrid',
  mixins: [EuiData],
  data () {
    return {
      type: 'datagrid'
    }
  }
}
</script>

