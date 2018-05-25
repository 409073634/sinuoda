<template>
  <!-- Tasks Menu -->
  <li class="dropdown about-menu" title="关于">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-lightbulb-o"></i>
      <span class="label label-danger"></span>
    </a>
    <ul class="dropdown-menu">
      <li class="header">浙江汉脑</li>
      <li class="body"> Logo </li>
      <li class="footer"> 当前版本: {{ version }} </li>
    </ul>
  </li>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'AboutMenu',
    data () {
      return {
        version: config.version || ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .dropdown-menu {
    text-align: center;

    .body, .header {
      padding: 12px;
    }
    .footer {
      margin-top: 8px;
      font-size: 80%;
    }
  }
</style>
