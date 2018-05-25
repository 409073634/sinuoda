<template>
  <input :style="styles" :disabled="disabled" :name="fileboxname">
</template>

<script>
  import EuiInputBase from './EuiInputBase'

  export default {
    name: 'EuiFilebox',
    mixins: [EuiInputBase],
    data() {
      return {
        type: 'filebox'
      }
    },
    props: {
      fileboxname: {
        type: String,
        default: ''
      }
    },
    methods: {
      callByName (name, data) {
        if (this.eui_d && this.type && name) {
          try {
            if (name === 'setValue') {
              return this.eui_d.textbox(name, data)
            }
            return this.eui_d[this.type](name, data)
          } catch (error) {
            // console.warn(this.$options.name, '-- method not found:', name)
          }
        }
      },
      getTarget() {
        let el = document.getElementsByName(this.fileboxname)[0]
        this.$emit('changepic', el)
      }
    },
    destroyed() {
      console.log('destroyed')
    }
  }
</script>

