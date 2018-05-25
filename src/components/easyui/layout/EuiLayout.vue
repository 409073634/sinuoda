<template>
  <div :style="styles_d">
    <div v-if="regions_d.north" :data-options="regions_d.north.options" :style="regions_d.north.styles" class="layout-region">
      <slot name="north"> </slot>
    </div>
    <div v-if="regions_d.west" :data-options="regions_d.west.options" :style="regions_d.west.styles" class="layout-region">
      <slot name="west"> </slot>
    </div>
    <div v-if="regions_d.center" :data-options="regions_d.center.options" :style="regions_d.center.styles" class="layout-region">
      <slot name="center"> </slot>
    </div>
    <div v-if="regions_d.east" :data-options="regions_d.east.options" :style="regions_d.east.styles" class="layout-region">
      <slot name="east"> </slot>
    </div>
    <div v-if="regions_d.south" :data-options="regions_d.south.options" :style="regions_d.south.styles" class="layout-region">
      <slot name="south"> </slot>
    </div>
  </div>
</template>

<script>
  import EuiBase from '../base/EuiBase'
  export default {
    name: 'EuiLayout',
    mixins: [EuiBase],
    props: {
      regions: {
        type: Object,
        default: () => {}
      },
      config: {
        type: Object,
        default: () => ({
          options: {},
          regions: {},
          styles: ''
        })
      }
    },
    data () {
      return {
        type: 'layout',
        routePath: '',
        regions_d: {},
        options_d: this.config.options || {},
        styles_d: this.styles || this.config.styles
      }
    },
    methods: {
      resizeLayout () {
        if (this.$route && this.routePath === this.$route.path) {
          this.eui_d[this.type]('resize', {
            height: 'auto',
            width: 'auto'
          })
        }
      }
    },
    watch: {
      '$route.path' () {
        this.resizeLayout()
      },
      '$store.state.sidebar.toggle' () {
        this.resizeLayout()
      }
    },
    created () {
      let _regions = JSON.parse(JSON.stringify(this.regions || this.config.regions || {}))
      for (let k in _regions) {
        if (_regions.hasOwnProperty(k)) {
          let rk = _regions[k]
          rk.options = 'region:\'' + k + '\',' + rk.options
          if (rk.height) {
            rk.styles = (rk.styles ? rk.styles + ',' : '') + 'height:' + rk.height
          }
        }
      }
      this.regions_d = _regions
      this.routePath = this.$route ? this.$route.path : ''
      window.addEventListener('resize', () => {
        for (let k in this.regions_d) {
          if (this.regions_d.hasOwnProperty(k)) {
            this.eui_d[this.type]('panel', k).panel('resize', {
              height: this.regions_d[k].height || 'auto'
            })
          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .layout-panel-north {
    overflow: visible;

    .layout-region {
      overflow: visible;
    }
  }
</style>
