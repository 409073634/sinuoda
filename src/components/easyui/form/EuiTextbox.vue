<template>
  <input type="text" :style="styles" :disabled="disabled">
</template>

<script>
import EuiInputBase from './EuiInputBase'

export default {
  name: 'EuiTextbox',
  mixins: [EuiInputBase],
  data () {
    return {
      type: 'textbox'
    }
  }
}
</script>

