<template>
  <div class="main-toolbar">
    <div v-for="toolBtn in buttons" :key="toolBtn.id"
         class="button-wrapper" :class="{'pull-right': toolBtn.floatRight}">
      <div v-if="toolBtn.id.startsWith('btnInput')" class="tool-search">
        <eui-textbox :options="searchOptions(toolBtn)"
                     styles="min-width: 240px"
                     v-model="searchKeyword">
        </eui-textbox>
        <span v-if="searchKeyword"
              class="clear-btn fa fa-close" title="清除"
              @click="clearSearch(toolBtn.id)">
        </span>
      </div>
      <div v-else-if="toolBtn.name.includes(';')" :title="splitBtn(toolBtn, 0)">
        <split-button :button="splitButton0(toolBtn)"
                      :menu="splitBtn(toolBtn)"
                      @click="btnIdx => onBtnClick(toolBtn.id, btnIdx)">
        </split-button>
      </div>
      <button v-else
              class="btn"
              :title="toolBtn.name"
              :class="btnClasses(toolBtn)"
              @click="onBtnClick(toolBtn.id)">
        <i :class="btnIcon(toolBtn.icon)"></i> {{ toolBtn.name }}
      </button>
    </div>
    <slot> </slot>
  </div>
</template>

<script>
  import SplitButton from '@/components/common/SplitButton'
  import EuiTextbox from '@/components/easyui/form/EuiTextbox.vue'

  export default {
    name: 'MainToolbar',
    components: {
      SplitButton,
      EuiTextbox
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        searchKeyword: ''
      }
    },
    methods: {
      searchOptions (btn) {
        return {
          height: 28,
          buttonText: btn.name,
          prompt: btn.memo || '',
          onClickButton: () => {
            this.$emit('click', btn.id, this.searchKeyword)
          }
        }
      },
      clearSearch (btnId) {
        this.searchKeyword = ''
        this.$emit('clear', btnId)
      },
      splitButton0 (btn) {
        return {
          label: this.splitBtn(btn, 0),
          icon: this.btnIcon(btn.icon),
          classes: this.btnClasses(btn)
        }
      },
      splitBtn (btn, idx) {
        let btns = btn.name.split(';')
        if (!isNaN(idx) && btns.length > idx) {
          return btns[idx]
        }
        return btns
      },
      btnIcon (icon) {
        if (icon && icon.startsWith('fa-')) {
          icon = 'fa ' + icon
        }
        return icon || ''
      },
      onBtnClick (btnId, data) {
        this.$emit('click', btnId, data)
      },
      btnClasses (btn) {
        return {
          btnAdd: 'btn-success',
          btnEdit: 'btn-info',
          btnDelete: 'btn-danger',
          btnSearch: 'btn-primary'
        }[btn.id] || 'btn-default'
      }
    }
  }
</script>

<style scoped>
  .main-toolbar {
    padding: 5px;
    border-bottom: 1px solid lightgray;
    height: 100%;
    /* margin-right: -9px; */
  }
  .button-wrapper {
    display: inline-block;
    padding: 5px 1px;
    vertical-align: top;
  }
  .tool-search {
    margin: 0 4px;
    position: relative;
  }
  .clear-btn {
    position: absolute;
    width: 22px;
    height: 24px;
    top: 2px;
    right: 48px;
    padding: 4px 6px;
    line-height: 16px;
    color: gray;
    cursor: pointer;
  }
  .clear-btn:hover {
    background: rgba(228, 228, 228, 0.75);
  }
  >>> button {
    height: 28px;
  }
</style>
