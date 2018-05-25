import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
  name: 'EuiBase',

  props: {
    styles: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },

  data () {
    return {
      eui_state: {
        created: false,
        destroyed: false
      },
      eui_d: null,
      options_d: {}
    }
  },

  methods: {
    callByName (name, data) {
      if (this.eui_d && this.type && name) {
        try {
          return this.eui_d[this.type](name, data)
        } catch (error) {
          // console.warn(this.$options.name, '-- method not found:', name)
        }
      }
    },
    callByNames (names, data) {
      return names.reduce((result, name) => {
        return this.callByName(name, result)
      }, data)
    },
    chainByName (name, data) {
      let _data = data === undefined ? this.$_eui_chainResult : data
      this.$_eui_chainResult = this.callByName(name, _data)
      return this
    },
    getChainResult () {
      return this.$_eui_chainResult
    },

    // Private methods
    $_eui_cameCase2dash (name) {
      return name.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase()
      }).replace(/^on-/, '')
    },
    $_eui_setOption (prop) {  // example prop='onContentMenu'
      if (typeof this.options[prop] === 'function') {  // options中有prop方法
        if (prop.startsWith('on')) {   //   is function and startwith on
          let customKallback = (...data) => {
            let eventName = this.$_eui_cameCase2dash(prop)  // example 'onContentMenu' --> 'content-menu'
            this.$emit(eventName, ...data)               // 添加vue父组件监听事件的返回
            return this.options[prop](...data)           // 如果easyui的on方法有返回结果的话 则返回
          }
          if (typeof this.options_d[prop] === 'function') {  // 如果子组件里的on方法和easyui里的on方法同名，则2个都执行
            let origKallback = this.options_d[prop]
            this.options_d[prop] = (...data) => {
              origKallback(...data)
              return customKallback(...data)
            }
          } else {
            this.options_d[prop] = customKallback  // 如果子组件options_d中的方法option里没有，则直接执行
          }
        } else {  // is function and not startwith on
          this.options_d[prop] = this.options[prop]
        }
      } else {    // not function
        this.options_d[prop] = this.options[prop]
      }
    },
    $_eui_setMyOption (prop) {
      console.warn(this.$options.name, '-- ignoring property:', prop)
    },
    $_eui_setup () {
      Object.keys(this.options || {}).forEach(k => {
        if (k.startsWith('my')) { // Non-easyui properties
          this.$_eui_setMyOption(k)
        } else {
          this.$_eui_setOption(k)
        }
      })
    }
  },
  watch: {
    'options.data' () {
      this.callByName('loadData', this.options.data)
    }
  },

  created () {
    if (!this.eui_state.created) {
      this.$_eui_setup()
      this.eui_state.created = true
    }
  },
  mounted () {
    if (this.type && !this.eui_d) {
      this.eui_d = $(this.$refs.euiEl || this.$el)
      this.eui_d[this.type](this.options_d)
    }
  },
  beforeDestroy() {
    if (!this.eui_state.destroyed) {
      this.callByName('destroy')
      this.eui_state.destroyed = true
    }
  }
})

