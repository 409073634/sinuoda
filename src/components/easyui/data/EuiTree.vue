<template>
  <ul :style="styles"></ul>
</template>

<script>
import EuiData from './EuiData'

export default {
  name: 'EuiTree',
  mixins: [EuiData],
  data () {
    return {
      type: 'tree'
    }
  }
}
</script>

