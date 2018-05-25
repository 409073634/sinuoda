<template>
  <div class="btn-group">
    <button type="button" class="btn" :class="button.classes"
            @click="handleClick(0)">
      <i :class="button.icon"></i>
      {{ button.label }}
    </button>
    <button type="button" data-toggle="dropdown"
            class="btn dropdown-toggle" :class="button.classes">
      <span class="caret"></span>
    </button>
    <ul role="menu" class="dropdown-menu">
      <li v-for="(subBtn, idx) in menu" :key="subBtn"
          @click="handleClick(idx + 1)">
        <a href="#">{{ subBtn }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SplitButton',
    props: {
      button: {
        type: Object,
        default: () => {}
      },
      menu: {
        type: Array,
        default: () => ['Action1', 'Action2']
      }
    },
    data () {
      return {
        button_d: {
          label: 'Action',
          icon: 'fa fa-info',
          classes: 'btn-default'
        }
      }
    },
    computed: {
      button_c () {
        return Object.assign({}, this.button_d, this.button)
      }
    },
    methods: {
      handleClick (btnIdx) {
        this.$emit('click', btnIdx)
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    min-width: 100%;
  }
</style>
