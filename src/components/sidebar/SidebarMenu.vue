<template>
  <div class="sidebar-menu">
    <div v-for="(folder, fid) in menus"
        :key="folder.id || folder.name"
        :class="{opened: isOpened(fid)}"
        class="menu-entry menu-entry-1">

      <!-- folder entry -->
      <menu-item :menu="folder"
                 :opened="isOpened(fid)"
                 @toggle="toggleFolder(0, fid)">
      </menu-item>

      <div class="folder-menus">
        <div v-for="(menu, mid) in folder.items"
            :key="menu.id || menu.name"
            :class="{opened: isOpened(fid, mid)}"
            class="menu-entry menu-entry-2">

          <!-- menu entry -->
          <menu-item :menu="menu"
                     :opened="isOpened(fid, mid)"
                     @active="openFolder(fid)"
                     @toggle="toggleFolder(1, mid)">
          </menu-item>

          <div v-if="menu.items" class="folder-menus">
            <div v-for="(submenu, sid) in menu.items"
                :key="submenu.id || submenu.name"
                :class="{opened: isOpened(fid, mid, sid)}"
                class="menu-entry menu-entry-3">

              <!-- submenu entry -->
              <menu-item :menu="submenu"
                         :opened="isOpened(fid, mid, sid)"
                         @active="openFolder(fid, mid)"
                         @toggle="toggleFolder(2, sid)">
              </menu-item>

              <div v-if="submenu.items" class="folder-menus">
                <div v-for="submenu2 in submenu.items"
                    :key="submenu2.id || submenu2.name"
                    class="menu-entry menu-entry-4">

                  <!-- submenu2 entry -->
                  <menu-item :menu="submenu2"
                             @active="openFolder(fid, mid, sid)">
                  </menu-item>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appMenus from '@/app/app.menus'
import demoMenus from '@/demo/demo.menus'
import MenuItem from './MenuItem'

export default {
  name: 'SidebarMenu2',
  components: {
    MenuItem
  },
  data () {
    return {
      openedFolder: [-1, -1, -1],
      currentFolder: [],
      menus: demoMenus.concat(appMenus)
    }
  },
  methods: {
    setMenus () {
      let dynMenus = this.$store.state.menus
      let mapMenus = perms => perms ? perms
        .sort((p1, p2) => p1.seq - p2.seq)
        .map(p => ({
          name: p.name || 'No title',
          icon: p.logo || 'fa-bars',
          link: p.resourceType === '1' ? p.url : null,
          items: p.resourceType === '0' ? mapMenus(p['childUserPermission']) : null
        })) : null
      if (dynMenus && dynMenus.length) {
        this.menus = mapMenus(dynMenus).concat(demoMenus)
      }
    },
    toggleFolder (lv, idx) {
      let isCurrent = this.currentFolder[lv] === idx && this.openedFolder[lv] !== idx
      this.$set(this.openedFolder, lv, this.openedFolder[lv] === idx ? -1 : idx)
      this.openedFolder.forEach((f, i) => {
        if (i > lv) {
          this.$set(this.openedFolder, i, isCurrent ? this.currentFolder[i] : -1)
        }
      })
    },
    openFolder (...indexes) {
      this.openedFolder = indexes
      this.currentFolder = JSON.parse(JSON.stringify(this.openedFolder))
    },
    isOpened (...indexes) {
      return this.openedFolder.slice(0, indexes.length).toString() === indexes.toString()
    }
  },
  mounted () {
    this.setMenus()
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  color: white;

  .folder-menus > .menu-entry > .menu-item {
    height: 0;
    transition: 0.5s all ease;
  }
  .opened > .folder-menus > .menu-entry > .menu-item {
    height: 36px;
  }

  .menu-entry-1 .menu-item {
    padding-left: 0;
  }
  .menu-entry-2 .menu-item {
    padding-left: 20px;
  }
  .menu-entry-3 .menu-item {
    padding-left: 40px;
  }
  .menu-entry-4 .menu-item {
    padding-left: 60px;
  }
}
</style>

