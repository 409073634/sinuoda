<template>
  <input type="text" :style="styles" :disabled="disabled">
</template>

<script>
  import EuiInputBase from './EuiInputBase'

  export default {
    name: 'EuiInput',
    mixins: [EuiInputBase],
    props: ['euiType'],
    data () {
      return {
        type: this.euiType || 'textbox'
      }
    }
  }
</script>
