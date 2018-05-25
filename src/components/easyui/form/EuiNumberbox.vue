<template>
  <div style="display: inline;">
    <input ref="euiEl" type="number" :style="styles" :disabled="disabled">
  </div>
</template>

<script>
import $ from 'jquery'
import EuiInputBase from './EuiInputBase'

export default {
  name: 'EuiNumberbox',
  mixins: [EuiInputBase],
  props: {
    value: {
      default: 0
    }
  },
  data () {
    return {
      type: 'numberbox',
      options_d: {
        onChange () { },
        events: {
          input: () => {
            let v2 = $('.numberbox input', this.$el).val()
            this.$emit('input', v2, this.value)
          }
        }
      }
    }
  },
  mounted () {
    if (this.value !== '') {
      this.eui_d[this.type]('setValue', this.value)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .number-input
    vertical-align: top
</style>
