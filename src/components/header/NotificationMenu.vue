<template>
  <!-- Notifications Menu -->
  <li class="dropdown notifications-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-bell-o"></i>
      <span class="label label-warning">{{ notifications | count }}</span>
    </a>
    <ul class="dropdown-menu">
      <li class="header">You have {{ notifications | count }} notification(s)</li>
      <li v-if="notifications.length > 0">
        <!-- Inner Menu: contains the notifications -->
        <ul class="menu">
          <li>
            <!-- start notification -->
            <a href="javascript:;">
              <i class="fa fa-users text-aqua"></i> 5 new members joined today
            </a>
          </li>
          <!-- end notification -->
        </ul>
      </li>
      <li class="footer" v-if="notifications.length > 0">
        <a href="javascript:;">View all</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'NotificationMenu',
  props: ['notifications'],
  data () {
    return {}
  }
}
</script>
