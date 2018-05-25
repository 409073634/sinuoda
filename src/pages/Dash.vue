<template>
  <div :class="['wrapper', classes]">

    <!-- Header Navbar -->
    <navbar @showpwd="_showpwd" :display-name="user.RealName" :picture-url="avatar"> </navbar>

    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :enableSearch="false"/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header" v-if="false">
        <ol class="breadcrumb">
          <li>
            <router-link to="/">
              <i class="fa fa-home"></i>
              Home
            </router-link>
          </li>
          <li v-for="route in routes" class="active" :key="route.path"
              v-if="route.path !== '/' && (route.meta && !route.meta['root'])">
            <router-link :to="route.path">
              {{ route.meta['title'] || route.name }}
            </router-link>
          </li>
        </ol>
      </section>

      <router-view> </router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <!--<footer class="main-footer">-->
    <!--<strong>Copyright &copy; {{year}}-->
    <!--<a href="javascript:;">Lapis Admin</a>.</strong> All rights reserved.-->
    <!--</footer>-->

    <div id="changepwd" class="easyui-dialog" closed="true" title="密码修改" style="width:300px;">
      <div class="pwd-wrapper">
        <p>原始密码:</p>
        <input type="password" v-model="oldPwd" class="form-control"/>
        <p>新的密码:</p>
        <input type="password" v-model="newPwd" class="form-control"/>
        <p>再次输入:</p>
        <input type="password" v-model="oneMore" class="form-control"/>
      </div>
      <div class="text-red">{{checkout}}</div>
      <div class="btn-wrapper">
        <button type="button" class="btn btn-success" @click="savePwd"><i class="fa fa-check"></i>保存</button>
        <button type="button" class="btn btn-primary" @click="closePwdDialog"><i class="fa fa-times"></i>关闭</button>
      </div>

    </div>

    <alert-div @hiddenAlert="hideAlert" v-show="showalert" :visible="showalert" :content="alertcontent"></alert-div>
    <!-- Control Sidebar -->
    <control-bar></control-bar>

  </div>
  <!-- ./wrapper -->
</template>

<script>
  import config from '@/config'
  import Sidebar from '@/components/sidebar/Sidebar'
  import Navbar from '@/components/header/Navbar'
  import ControlBar from '@/components/sidebar/ControlBar'
  import AlertDiv from '@/components/common/AlertDiv'
  import $ from 'jquery'

  export default {
    name: 'Dash',
    components: {
      Navbar,
      Sidebar,
      ControlBar,
      AlertDiv
    },
    data: function () {
      return {
        user: {RealName: ''},
        avatar: '',
        // section: 'Dash',
        year: new Date().getFullYear(),
        classes: {
          fixed_layout: config.fixedLayout,
          hide_logo: config.hideLogoOnMobile
        },
        routes: [],
        oldPwd: '',
        newPwd: '',
        oneMore: '',
        checkout: '',
        alertcontent: '',
        showalert: false
      }
    },
    computed: {
      viewTitle() {
        return this.$route.meta.title || this.$route.name
      }
    },
    watch: {
      '$store.state.route'() {
        this.updateBreadcrumb()
      },
      '$store.state.token'() {
        if (!this.$store.state.token) {
          this.$router.push({name: 'LoginView'})
        }
      },
      '$store.state.user'() {
        this.setAvatar()
      }
    },
    methods: {
      updateBreadcrumb() {
        // TODO jump from /a to /b/c
        this.routes = [this.$route]
        if (this.$store.state.route['from']) {
          let parentPath = this.$store.state.route['from']['path']
          if (parentPath.length > 1 && this.$route.path.indexOf(parentPath) === 0) {
            this.routes.unshift(this.$store.state.route['from'])
          }
        }
      },
      changeloading() {
        this.$store.commit('TOGGLE_SEARCHING')
      },
      checkLayout() {
        if (config.fixedLayout && document.body.className.split(' ').indexOf('fixed') < 0) {
          document.body.className += ' fixed'
        }
      },
      setAvatar() {
        // Load user info from $store or fetch from server, then set it to this.user
        // this.user
        // this.avatar
      },
      init() {
        $('#changepwd').dialog({
          inline: true
        })
      },
      _showpwd() {
        $('#changepwd').dialog('open')
      },
      closePwdDialog() {
        $('#changepwd').dialog('close')
        this.checkout = ''
      },
      savePwd() {
        console.log(this.oldPwd)
        console.log(this.newPwd)
        console.log(this.oneMore)
        this.checkout = '等待接口.....'
        this.showalert = true
        this.alertcontent = '保存成功!!'
      },
      hideAlert() {
        this.showalert = !this.showalert
      }
    },
    mounted() {
      this.checkLayout()
      this.updateBreadcrumb()
      this.setAvatar()
      this.init()
    },
    destroyed() {
      console.log('destroyed Dash!!')
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper.fixed_layout {
    height: 100vh !important;
    width: 100vw;

    .main-header {
      position: fixed;
      width: 100%;
    }

    .content-wrapper {
      margin-top: 50px;
      padding-top: 0;
      height: calc(100vh - 50px);
      overflow: auto;
      min-height: 200px !important;

      .breadcrumb {
        margin-bottom: 10px;
      }
    }

    .main-sidebar {
      position: fixed;
      height: 100vh;
    }
  }

  .wrapper.hide_logo {
    @media (max-width: 767px) {
      .main-header .logo {
        display: none;
      }
    }
  }

  .pwd-wrapper {
    padding: 20px 40px 0px;
    p {
      font-size: 16px;
      margin: 0;
    }
    input {
      font-size: 16px;
      margin-bottom: 5px
    }
  }

  .btn-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #eee;
    padding: 5px;
    text-align: right;
  }

  .easyui-dialog .text-red {
    width: 100%;
    padding: 5px 40px;
    height: 20px;
    color: #f00 !important;
    margin-bottom: 46px;
  }

  /*.wrapper .panel.window.panel-htop, .window-shadow {*/
    /*position: fixed !important;*/
    /*height: 320px !important;;*/
    /*top: 0 !important;*/
    /*bottom: 0 !important;;*/
    /*left: 0 !important;*/
    /*right: 0 !important;;*/
    /*margin: auto;*/
    /*background-color: #fff !important;*/
  /*}*/


</style>
