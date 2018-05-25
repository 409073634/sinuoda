import Vue from 'vue'
import EuiBase from '../base/EuiBase'

export default Vue.extend({
  name: 'EuiInputBase',
  mixins: [EuiBase],
  props: {
    value: {
      default: ''
    },
    disabled: {
      default: false
    }
  },
  data () {
    return {
      type: 'textbox',
      options_d: {
        onChange: (...data) => {
          this.$emit('input', ...data)
        }
      }
    }
  },
  watch: {
    value () {
      this.eui_d[this.type]('setValue', this.value)
    },
    disabled () {
      if (this.disabled) {
        this.callByName('disable')
      } else {
        this.callByName('enable')
      }
    }
  }
})

