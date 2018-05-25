import Vue from 'vue'
import axios from 'axios'
import config from '@/config'

import EuiBase from '../base/EuiBase'

export default Vue.extend({
  name: 'EuiData',
  mixins: [EuiBase],
  methods: {
    $_eui_setMyOption (prop) {
      if (prop === 'myLoader') {
        if (!this.options[prop].path) {
          return
        }
        let token = this.$store.state.token || ''
        let url = config.serverURI + this.options[prop].path
        let data = this.options[prop].data
        let method = this.options[prop].method || 'post'
        this.options_d.loader = (params, success, error) => {
          return axios({
            method,
            url,
            data,
            headers: { token }
          }).then(resp => {
            success(resp.data)
          })
        }
      }
    }
  }
})

