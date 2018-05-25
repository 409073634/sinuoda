<template>
  <div id="app" class="skin-blue">
    <router-view></router-view>

    <la-alert id="app_msg" type="danger"
              :visible="Boolean(appMsg.title)"
              :dismissible='true'
              :timeout="appMsg.timeout || 5000"
              :message="appMsg"
              @hide="resetAppMsg">
    </la-alert>
  </div>
</template>

<script>
  import LaAlert from './components/common/LaAlert'
  export default {
    name: 'App',
    components: {
      LaAlert
    },
    data () {
      return {
        section: 'Head'
      }
    },
    computed: {
      // Global app message
      appMsg () {
        return this.$store.state.appMsg || {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      resetAppMsg () {
        this.$store.commit('SET_APPMSG', {
          title: '',
          content: ''
        })
      },
      logout () {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.push('/login')
      }
    },
    mounted () {
      if (this.$route.path && this.$route.path.indexOf('index.html') > 0) {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
#app_msg {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1066;
  margin: 15px 0 0;
  min-width: 300px;
}

</style>
