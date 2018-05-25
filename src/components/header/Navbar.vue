<template>
  <header class="main-header">

    <span class="logo-mini">
      <router-link to="/">
        <div class="center-block logo">
          <img :src="require('../../../static/img/copilot-logo-white.svg')" alt="Logo" class="img-responsive">
        </div>
      </router-link>
    </span>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation" @transitionend="toggleCollapse">

      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <message-menu :messages="userInfo.messages"> </message-menu>

          <notification-menu :notifications="userInfo.notifications"> </notification-menu>

          <task-menu :tasks="userInfo.tasks"> </task-menu>

          <account-menu @showpwddlg="showdlg" :display-name="displayName" :picture-url="pictureUrl"> </account-menu>

          <li v-if="fullScreenEnabled" class="dropdown" :title="fullScreen ? '退出全屏' : '全屏'" @click="toggleFullscreen">
            <a href="javascript:;"> <i :class="['fa', fullScreen ? 'fa-window-restore' : 'fa-window-maximize']"></i> </a>
          </li>

          <!--<li>-->
            <!--<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>-->
          <!--</li>-->
          <about-menu> </about-menu>
        </ul>
      </div>

    </nav>

  </header>
</template>

<script>
import { mapState } from 'vuex'
import MessageMenu from './MessageMenu'
import NotificationMenu from './NotificationMenu'
import TaskMenu from './TaskMenu'
import AccountMenu from './AccountMenu'
import AboutMenu from './AboutMenu'

export default {
  name: 'Navbar',
  props: ['displayName', 'pictureUrl'],
  components: {
    MessageMenu,
    NotificationMenu,
    TaskMenu,
    AboutMenu,
    AccountMenu
  },
  data () {
    return {
      fullScreen: false,
      fullScreenEnabled: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    toggleCollapse () {
      this.$store.commit('TOGGLED_SIDEBAR')
    },
    toggleFullscreen () {
      let app = document.getElementById('app')
      app.requestFullScreen = app.webkitRequestFullScreen || app.mozRequestFullScreen || app.msRequestFullscreen
      document.exitFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
      if (this.fullScreen) {
        typeof document.exitFullScreen === 'function' && document.exitFullScreen()
      } else {
        typeof app.requestFullScreen === 'function' && app.requestFullScreen()
      }
    },
    fsHandler: function () {
      if (this.fullScreenEnabled) {
        this.fullScreen = !this.fullScreen
      }
    },
    showdlg() {
      this.$emit('showpwd')
    }
  },
  destroyed () {
    document.removeEventListener('webkitfullscreenchange', this.fsHandler, false)
    document.removeEventListener('mozfullscreenchange', this.fsHandler, false)
    document.removeEventListener('fullscreenchange', this.fsHandler, false)
    document.removeEventListener('MSFullscreenChange', this.fsHandler, false)
  },
  created () {
    this.fullScreenEnabled = Boolean(document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
    document.addEventListener('webkitfullscreenchange', this.fsHandler, false)
    document.addEventListener('mozfullscreenchange', this.fsHandler, false)
    document.addEventListener('fullscreenchange', this.fsHandler, false)
    document.addEventListener('MSFullscreenChange', this.fsHandler, false)
  }
}
</script>

<style lang="scss">
.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: .4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.sidebar-collapse .main-header .logo {
  padding: 0;
}
.main-header .logo {
  img {
    max-height: 50px;
    display: inline-block;
  }
  img + span {
    height: 47px;
    display: inline-block;
    top: 3px;
    position: relative;
    // white-space: nowrap;
    margin-left: -4px;
  }
}
</style>
