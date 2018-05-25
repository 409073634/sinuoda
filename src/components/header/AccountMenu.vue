<template>
  <!-- User Account Menu -->
  <li class="dropdown">
    <div class="dropdown-toggle" @mouseenter="menuShow" @mouseleave="menuHide">
      <span>用户中心</span>
      <i class="fa fa-angle-down"></i>
    </div>

    <ul class="showmenu" v-show="menushowflag" @mouseleave="menuHideFromShowMenu">
      <li class="item" @click="showPasswodrDialog">
        <span><i class="fa fa-lock" ></i>修改密码</span>
      </li>
      <li class="item" @click="logout">
        <span><i class="fa fa-sign-out"></i>登出</span>
      </li>
    </ul>
  </li>
</template>

<script>
//  import api from '@/api'
//  import $ from 'jquery'
  export default {
    name: 'AccountMenu',
    props: ['displayName', 'pictureUrl'],
    data() {
      return {
        menushowflag: false,
        avatar: this.pictureUrl
      }
    },
    watch: {
      pictureUrl() {
        this.avatar = this.pictureUrl || ''
      },
      '$store.state.avatar'() {
        this.avatar = this.$store.state.avatar
      }

    },
    methods: {
      menuShow() {
        this.menushowflag = true
      },
      menuHide(obj) {
        let toElement = obj.toElement  // 移出时的目标元素
        let toElement2  // 可能移到元素li,则取父元素ul.showmenu
        let el = document.getElementsByClassName('showmenu')[0]   // 弹出最外层showmenu
        toElement2 = toElement ? (toElement.parentNode ? toElement.parentNode : null) : null
        if (toElement !== el && toElement2 !== el) {
          this.menushowflag = false
        }
      },
      menuHideFromShowMenu(obj) {
        let toElement = obj.toElement
        let el = document.getElementsByTagName('dropdown-toggle')[0]
        if (toElement !== el) {
          this.menushowflag = false
        }
      },
      showPasswodrDialog() {
        this.$emit('showpwddlg')
      },
      logout() {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', '')
        if (window.localStorage) {
          window.localStorage.setItem('user', '')
          window.localStorage.setItem('token', '')
        }
        this.$router.push('/login')
//        api.user.logout(this.$store.state.token)
//          .then(data => {
//            if (data) {
//              // Remove user info
//              this.$store.commit('SET_USER', null)
//              this.$store.commit('SET_TOKEN', '')
//
//              if (window.localStorage) {
//                window.localStorage.setItem('user', '')
//                window.localStorage.setItem('token', '')
//              }
//
//              this.$router.push('/login')
//            }
//          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dropdown-toggle
    color: #fff
    height: 50px
    line-height: 50px
    font-size: 12px
    padding: 0 10px
    &:hover
      background: rgba(52, 125, 214, 1)
      cursor: pointer

  .showmenu
    /*display: none*/
    position: absolute
    min-width: 120px
    border: 1px solid #ccc
    right: 0
    background: #fff
    padding: 5px 0
    li
      display: block
      color: #555
      height: 40px
      line-height: 40px
      cursor: pointer
      &:hover
        background: rgba(246, 246, 246, 1)
        cursor: pointer
      span
        margin-left: 15px
        font-size: 14px
        i
          width: 15px
          margin-right: 9px
</style>
