<template>
  <div style="display: inline-block; padding: 4px;" title="Search">
    <input ref="euiEl" :style="styles" :disabled="disabled">
    <div :id="menuId">
      <div v-for="item in menu" :key="item.name"
           :data-options="`name: '${item.name}'`">
        {{ item.label || item.name }}
      </div>
    </div>
  </div>
</template>

<script>
  import { randomString } from '@/utils/util'
  import EuiInputBase from './EuiInputBase'

  export default {
    name: 'EuiSearchbox',
    mixins: [EuiInputBase],
    props: {
      menu: {
        type: Array,
        default: () => [{
          name: 'action1',
          label: 'Action 1'
        }]
      }
    },
    data () {
      let menuId = randomString(8, 'eui_search_')
      return {
        type: 'searchbox',
        menuId,
        options_d: {
          height: 30,
          width: 240,
          searcher: (value, name) => {
            this.$emit('search', value, name)
          },
          menu: '#' + menuId,
          prompt: 'Search'
        }
      }
    },
    created () {
      console.log(this.type)
    }
  }
</script>

<style scoped>
</style>
