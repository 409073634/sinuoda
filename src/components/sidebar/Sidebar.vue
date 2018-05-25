<template>
  <aside class="main-sidebar">
    <div class="scrollbar-hidden">

    <!-- sidebar: style can be found in sidebar.less -->
    <div class="sidebar-wrapper">
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div v-if="enableUserPanel" class="user-panel">
          <div class="pull-left image">
            <img :src="pictureUrl" />
          </div>
          <div class="pull-left info">
            <div>
              <p class="white">{{ displayName }}</p>
            </div>
            <a href="javascript:;">
              <i class="fa fa-circle text-success"></i> Online
            </a>
          </div>
        </div>

        <!-- search form (Optional) -->
        <form v-if="enableSearch" v-on:submit.prevent class="sidebar-form">
          <div class="input-group">
            <input type="text"
                   name="search"
                   id="search"
                   class="search form-control"
                   data-toggle="hideseek" placeholder="Search Menus"
                   data-list=".sidebar-menu">
            <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <sidebar-menu />
        <!-- /.sidebar-menu -->

      </section>
    </div>
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import SidebarMenu from './SidebarMenu'
import 'hideseek'

export default {
  name: 'Sidebar',
  props: ['displayName', 'pictureUrl', 'enableSearch', 'enableUserPanel'],
  components: { SidebarMenu }
}
</script>
<style lang="scss">

.user-panel {
  height: 4em;

  .image img {
    border-radius: 50%;
  }
}

// Hide right scrollbar of sidemenu
.main-sidebar {
  overflow: hidden;
}
.scrollbar-hidden {
  height: 100vh;
  overflow-y: scroll;
  margin-right: -70px;
  padding-right: 50px;
}
.sidebar-wrapper {
  padding-bottom: 80px;
}

</style>
