<template>
  <form :style="styles">
    <slot></slot>
  </form>
</template>

<script>
import EuiBase from '../base/EuiBase'

export default {
  name: 'EuiForm',
  mixins: [EuiBase],
  props: {
    styles: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      type: 'form'
    }
  }
}
</script>

