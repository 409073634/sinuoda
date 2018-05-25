<template>
  <div class="tabs-view">
    <ul class="nav nav-tabs">
      <li v-for="(tab, idx) in tabs" :key="tab.title"
          :class="{active: activeTabIdx === idx}">
        <div class="tab-link">
          <router-link :to="tab.fullPath">{{ tab.title }}</router-link>
          <span v-if="tabs.length > 1 && !tab.meta.keep" class="close-btn" @click="closeTab(idx)">&times;</span>
        </div>
      </li>
    </ul>

    <div id="tabContents" class="tab-contents">
      <router-multi-view v-if="routerMode"></router-multi-view>
      <div v-else>
        <div v-for="(tab, idx) in tabs" :key="tab.title"
             v-show="activeTabIdx === idx"
             class="tab-content">
          <div :id="'mount' + tab.name"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DemoComponents from '../../demo'
import AppComponents from '../../app/index'
import Vue from 'vue'

export default {
  name: 'TabsView',

  data () {
    return {
      routerMode: true,
      components: Object.assign({}, DemoComponents, AppComponents),
      activeTabIdx: -1,
      cachedViews: {}
    }
  },

  computed: {
    ...mapState([
      'tabs'
    ])
  },

  methods: {
    closeTab (tabIdx) {
      let tabName = this.tabs[tabIdx].name

      if (this.routerMode) {
        let tabPath = Object.keys(this._routerViewCache).find(p => this._routerViewCache[p].default.name === tabName)
        if (tabPath || tabPath === '') {
          delete this._routerViewCache[tabPath]
        }
      }

      // Destroy view ??????????????????????
      let view2close = this.cachedViews[tabName]
      if (view2close) {
        console.log('1:destroyed', tabName)
        view2close.$destroy()
        delete this.cachedViews[tabName]
      }

      // Remove tab
      this.$store.commit('REMOVE_TAB', tabName)

      // Update active tab & route
      if (tabIdx < this.activeTabIdx) {  // 如果关闭的标签小于active的标签号 则不用跳转
        // No push
        this.updateIndex()
      } else if (tabIdx === this.activeTabIdx) {  // 如果关闭的标签是active标签
        // Push next || prev || home
        let toPath = '/'
        let tl = this.tabs.length
        if (tl) {
          if (tabIdx >= tl) {   // 关闭的active标签是最后一个
            toPath = this.tabs[tl - 1].path
          } else {   // 关闭的actice标签位于前面 不是最后一个
            toPath = this.tabs[tabIdx].path
          }
        }
        this.$router.push(toPath)
      } else {
        // Do nothing
      }
    },

    mountTab (tabIdx) {
      let tab = this.tabs[tabIdx]
      if (tab && !this.cachedViews[tab.name]) {
        let tabComponent = this.components[tab.name]
        if (tabComponent) {
          let tabInstance = new Vue({
            ...tabComponent
          })
          tabInstance.$mount('#mount' + tab.name)
          this.cachedViews[tab.name] = tabInstance
        }
      }
    },

    updateIndex () {
      this.activeTabIdx = this.tabs.findIndex(tab => tab.path === this.$route.path) || 0
    }
  },

  created () {
    this.updateIndex()
  },

  watch: {
    activeTabIdx () {
      if (!this.routerMode) {
        this.$nextTick(() => this.mountTab(this.activeTabIdx))
      }
    },
    '$route.path' () {
      this.updateIndex()
    }
  }
}
</script>

<style scoped lang="scss">
  @media (max-width: 767px) {
    .tabs-view {
      margin-top: 50px;
    }
  }

  .tabs-view {
    padding: 4px 0 0;
    height: 100%;

    .nav-tabs {
      height: 28px;
    }

    .tab-contents {
      height: calc(100% - 28px);
    }
    .tab-contents>div {
      overflow: auto;
      height: 100%;
    }

    .active .tab-link {
      background: white;
      border-top: 3px #00c0ef solid;

      .close-btn {
        opacity: 1;
        background: #e3e3e3;
      }
    }

    .tab-link {
      display: block;
      position: relative;
      margin: 3px 3px 0;
      border: 1px solid rgba(195, 209, 205, 0.4);
      border-top-width: 3px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      cursor: pointer;

      &:hover .close-btn {
        opacity: 1;
        background: #e3e3e3;
      }

      a {
        display: inline-block;
        padding: 2px 8px;
      }

      .close-btn {
        position: absolute;
        top: -9px;
        right: -9px;
        height: 18px;
        width: 18px;
        font-size: 19px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        opacity: 0;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .4);

        &:hover {
          background: lightgray;
        }
      }
    }
  }
</style>
