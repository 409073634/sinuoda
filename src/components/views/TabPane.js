import Vue from 'vue'

export default Vue.extend({
  name: 'TabPane',
  data () {
    return {
      viewName: this.$attrs['data-route-name']
    }
  },
  watch: {
    '$store.state.tabs' () {
      if (this.viewName) {
        let found = this.$store.state.tabs.find(tab => tab.name === this.viewName)
        if (!found) {
          this.$destroy(true)
        }
      }
    }
  },
  destroyed () {
    console.log('2:destroyed', this.viewName)
  }
})
