<template>
  <div class="alert-black">{{content}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        timeout: 2000
      }
    },
    props: {
      content: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hidden() {
        setTimeout(() => {
          this.$emit('hiddenAlert')
        }, this.timeout)
      }
    },
    watch: {
      visible() {
        if (this.visible) {
          this.hidden()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .alert-black
    position: fixed !important
    width: 200px
    bottom: 0
    right: 0
</style>
