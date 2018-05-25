<template>
  <div class="menu-item"
       :class="{active}"
       @click="toggleFolder">
    <div class="menu-box">
      <i class="menu-icon-e" :class="iconClasses(menu.icon)"></i>
      {{ menu.name }}
      <i v-if="menu.items"
         class="fa fa-angle-left fa-fw"
         :class="{rotate: opened}">
      </i>
      <span v-else-if="menu.page" class="page-link" @click.stop="openPage">
        <i class="fa fa-fw fa-share-square-o"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['menu', 'opened'],
  data () {
    return {
      active: false
    }
  },
  watch: {
    '$route.path' () {
      this.selfCheck()
    }
  },
  methods: {
    selfCheck () {
      if (this.menu['link'] === this.$route.path) {
        this.active = true
        this.$emit('active')
      } else {
        this.active = false
      }
    },
    iconClasses: function (icon) {
      return icon ? icon.indexOf('ion-') >= 0 ? 'ion ' + icon : 'fa fa-fw ' + icon : 'fa fa-info-circle'
    },
    openPage () {
      this.$router.push('/pages' + this.menu.link)
    },
    toggleFolder () {
      if (this.menu.items) {
        this.$emit('toggle')
      } else if (this.menu.link) {
        this.$router.push(this.menu.link)
      }
    }
  },
  created () {
    this.selfCheck()
  }
}
</script>

<style lang="scss" scoped>
.active > .menu-item {
  border-left: 3px solid red;
}
.fa-angle-left {
  transition: all 0.5s;
  position: absolute;
  right: 0.3em;
  top: 13px;
}
.fa-angle-left.rotate {
  transform: rotate(-90deg);
}
.menu-item {
  border: 0;
  border-left: 3px solid transparent;
  margin: 0;

  &.active {
    background: rgba(58, 139, 238, 0.6);
  }

  &:hover {
    background: rgba(58, 139, 238, 0.4);
  }

  .menu-box {
    height: 100%;
    padding: 10px 4px;
    border-bottom: 1px dashed rgba(169, 169, 169, 0.2);

    .menu-icon-e {
      padding-right: 0.4em;
    }
  }
}
.page-link {
  position: absolute;
  right: 0.3em;
}
</style>
