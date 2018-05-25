<template>
  <div :style="windowStyles_c">
    <div class="window-content">
      <slot></slot>
    </div>
    <div class="window-footer" :style="footerHeight_c" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import EuiBase from '../base/EuiBase'

  export default {
    name: 'EuiWindow',
    mixins: [EuiBase],
    props: {
      footerHeight: {
        type: [String],
        default: '4em'
      }
    },
    computed: {
      windowStyles_c() {
        return (this.$slots.footer ? ('margin-bottom: ' + this.footerHeight + ';') : '') + this.styles
      },
      footerHeight_c() {
        return 'height: ' + this.footerHeight + ';'
      }
    },
    data() {
      return {
        options_d: {
          closed: true,
          closable: true,
          collapsible: false,
          maximizable: false,
          minimizable: false,
          resizable: false,
          modal: true,
          inline: true
        },
        type: 'window'
      }
    },
    methods: {
      callByName(name, data) {
        if (this.eui_d && this.type && name) {
          try {
            if (name === 'title') {
              return this.eui_d[this.type]({title: data})
            } else {
              return this.eui_d[this.type](name, data)
            }
          } catch (error) {
            // console.warn(this.$options.name, '-- method not found:', name)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .window-content {
    padding: 12px 36px;
  }

  .window-footer {
    width: 100%;
    position: absolute;
    padding: 11px 32px;
    bottom: 0;
    text-align: right;
    background: linear-gradient(to top, #ffffff, #f0f0f0 80%, #e1e1e1);
  }
</style>
