<template>
  <input :style="styles" :disabled="disabled">
</template>

<script>
  import EuiInputBase from './EuiInputBase'

  export default {
    name: 'EuiDatebox',
    mixins: [EuiInputBase],
    data () {
      return {
        type: 'datebox'
      }
    }
  }
</script>

