<template>
  <input :style="styles" :disabled="disabled" :value="value">
</template>

<script>
import EuiInputBase from './EuiInputBase'

export default {
  name: 'EuiCombobox',
  mixins: [EuiInputBase],
  data () {
    return {
      type: 'combobox',
      options_d: {
        limitToList: true
      }
    }
  }
}
</script>

