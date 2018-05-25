<template>
  <div class="container container-table">
      <div class="container">
        <div class="text-center" id="login_container">
          <div class="top-pic">
            <img src="../assets/img/logo1.png" width="111" height="111">
          </div>
          <!-- login form -->
          <p class="top-title">丝诺达后台管理系统</p>
          <form class="ui form loginForm"  @submit.prevent="checkCreds">

            <div class="input-group">
              <!--<span class="input-group-addon"><i class="fa fa-user"></i></span>-->
              <input class="login-input" name="username" placeholder="Username" type="text" v-model="username">
            </div>

            <div class="input-group">
              <!--<span class="input-group-addon"><i class="fa fa-lock"></i></span>-->
              <input class="login-input" name="password" placeholder="Password" type="password" v-model="password">
            </div>
            <div class="input-group">
              <div class="form-group">
                <input type="checkbox" id="rem" spellcheck="false" >
                <label for="rem" @click = "toggleChecked">记住账号</label>
                <button id="submit" type="submit" ripple=""><i id="icon_wait" :class="loadingclass"></i>&nbsp;<span id="font_wait">登录</span></button>
                <!-- errors -->
                <div  class="text-red"><p>{{errormsg}}</p></div>
              </div>
              <!--<button style="float: right" type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">登录</button>-->
            </div>

          </form>
          <div class="conpany" >{{year}}&copy; 浙江汉脑数码科技有限公司</div>

        </div>
      </div>

      <div id="screen">
        <div id="command">
          <div id="bar"></div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '@/api'
import {m3D} from '@/utils/login_animation'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      captchaCode: '',
      inputCode: '',
      errormsg: '',
      loadingclass: ''
    }
  },
  methods: {
    toggleLoading () {
      this.loadingclass = (this.loadingclass === '') ? 'fa fa-circle-o-notch fa-spin' : ''
    },
    toggleChecked () {
      let checked = window.localStorage.getItem('checked') || 'false'
      let checkbox = document.getElementById('rem')
      if (checked === 'true') {
        checkbox.checked = true
        window.localStorage.setItem('checked', 'false')
      } else {
        checkbox.checked = false
        window.localStorage.setItem('checked', 'true')
      }
    },
    checkCreds () {
      /* Making API call to authenticate a user */
      let usermsg = {
        'from': '0',
        'username': this.username,
        'password': this.password
      }
      this.errormsg = usermsg.username ? '' : '用户名不能为空'
      if (this.errormsg) {
        return
      }
      this.errormsg = usermsg.password ? '' : '密码不能为空'
      if (this.errormsg) {
        return
      }
      this.toggleLoading()
      api.user.login(this.username, this.password).then(token => {
        this.toggleLoading()
        let user = {
          username: usermsg.username
        }
        this.$store.commit('SET_USER', user)
        this.$store.commit('SET_TOKEN', token)
        if (window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(user))
          window.localStorage.setItem('token', token)
        }
        this.$router.push('/')
      }).catch(() => {
        this.toggleLoading()
        this.errormsg = '请求接口异常'
      })
    },
    loginAnimation () {
      setTimeout(function () {
        m3D.init(
          [{
            src: '1-1.jpg'
          }, {
            src: '1-2.jpg'
          }, {
            src: '1-3.jpg'
          }, {
            src: '1-4.jpg'
          }, {
            src: '1-5.jpg'
          }, {
            src: '1-6.jpg'
          }, {
            src: '1-7.jpg'
          }, {
            src: '1-8.jpg'
          }, {
            src: '1-9.jpg'
          }, {
            src: '1-10.jpg'
          }, {
            src: '1-11.jpg'
          }, {
            src: '1-12.jpg'
          }, {
            src: '1-13.jpg'
          }, {
            src: '2.jpg'
          }, {
            src: '3.jpg'
          }, {
            src: '4.jpg'
          }, {
            src: '5.jpg'
          }, {
            src: '6.jpg'
          }, {
            src: '7.jpg'
          }, {
            src: '8.jpg'
          }, {
            src: '9.jpg'
          }, {
            src: '10.jpg'
          }, {
            src: '11.jpg'
          }, {
            src: '1.jpg'
          }]
        )
      }, 500)
    },
    checked () {
      if (window.localStorage) {
        let checked = window.localStorage.getItem('checked') || 'false'
        let checkbox = document.getElementById('rem')
        if (checked === 'true') {
          checkbox.checked = true
        } else {
          checkbox.checked = false
        }
      }
    },
    showSaveUser () {
      let checked = window.localStorage.getItem('checked') || 'false'
      if (checked === 'true') {
        let username = window.localStorage.getItem('user') || null
        if (username) {
          this.username = JSON.parse(username).username
        }
      }
    }
  },
  mounted () {
  //    this.createCode()
    this.checked()
    this.showSaveUser()
  },
  created () {
    this.loginAnimation()
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  },
  destroyed () {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container
  width: 100% !important
  padding: 0 !important
.container-table
  width: 100%
  height: 100%
  background-color: #282B30 !important

.container-table
    display: table
    color: white

.top-pic
  position: absolute
  top: -63px
  left: 37%

.top-title
  text-align: center
  font-size: 20px
  margin-top: 52px
  color: #878787

.input-group
  width: 100%
  i
    font-style: normal

.login-input
  display: block
  height: 36px
  width: 100%
  color: #555
  border: none
  border-radius: 0
  font-size: 17px
  font-family: inherit
  font-weight: 300
  padding: 0
  background-color: transparent
  box-shadow: none
  border-bottom: 1px solid rgba(117, 117, 117, 0.15)
  /*transition: border-color ease-in-out 1s, box-shadow ease-in-out 1s;*/

.login-input:focus
  /*border: none;*/
  outline:none
  border-bottom: 2px solid rgba(0, 120, 176, 1)

::-webkit-input-placeholder  /* WebKit browsers */
  color: rgba(135,135,135,0.6)
:-moz-placeholder   /* Mozilla Firefox 4 to 18 */
  color: rgba(135,135,135,0.6)
::-moz-placeholder /* Mozilla Firefox 19+ */
  color: rgba(135,135,135,0.6)
:-ms-input-placeholder  /* Internet Explorer 10+ */
  color: rgba(135,135,135,0.6)
input[type=checkbox]
  display: none
  visibility: hidden

input[type="checkbox"] + label
  float: left
  cursor: pointer
  font-size: 15px
  font-weight: 500
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out

input[type=checkbox]:checked + label:before
  background-image: url("../assets/img/loginlabel.png")
  background-color: rgb(3, 169, 245)
  border-color: rgb(3, 169, 245)
  background-repeat: no-repeat
  background-size: 14px 14px

input[type="checkbox"] + label:before
  display: inline-block
  content: ""
  margin: 0 15px 3px 0px
  width: 18px
  height: 18px
  background-color: #fff
  border: 2px solid #5a5a5a
  border-radius: 2px
  vertical-align: middle

label
  user-select: none
  color: #878787

button[type="submit"]
  width: 300px
  margin-top: 50px
  font-family: inherit
  font-weight: 100
  font-size: 20px
  border: 0
  padding: 5px 15px
  border-radius: 3px
  cursor: pointer
  background: rgb(3, 169, 245)
  color: #fff
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37)


.loginForm .input-group
  padding-top: 2em
  /*height: 4em;*/

.input-group .fa
  min-width: 14px

#captcha_code
  position: absolute
  /*border: 1px solid #d3d3d3;*/
  top: 14px
  right: 14px
  z-index: 4

#login_container
  /*max-width: 400px;*/
  /*min-width: 300px;*/
  /*margin: 0 auto;*/
  position: absolute
  padding: 18px 20px 10px
  left: -moz-calc(80% - 200px)
  left: -webkit-calc(80% - 200px)
  left: calc(80% - 200px)
  top: -moz-calc(50% - 15em)
  top: -webkit-calc(50% - 15em)
  top: calc(50% - 15em)
  width: 400px
  height: 450px
  border-radius: 3px
  background: white
  opacity: 0.8
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.26)
  /* overflow: hidden; */
  z-index: 99999
.conpany
  position: absolute
  font-size: 12px
  color: #878787
  top: 94%
  left: 33%
.text-red
  padding: 5px 0
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/styl/screen"
  @import "../assets/styl/account"
</style>
