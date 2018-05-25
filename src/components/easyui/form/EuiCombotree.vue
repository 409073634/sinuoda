<template>
  <input :style="styles" :disabled="disabled" :value="value">
</template>

<script>
import EuiInputBase from './EuiInputBase'

export default {
  name: 'EuiCombotree',
  mixins: [EuiInputBase],
  data () {
    return {
      type: 'combotree'
    }
  }
}
</script>

