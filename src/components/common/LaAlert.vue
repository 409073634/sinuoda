<template>
  <div :class="['alert', 'alert-'+type, {'alert-dismissible': dismissible, hidden: hidden}]">
    <button v-if="dismissible" type="button" class="close" @click="hide">&times;</button>
    <h4 v-if="message.title"><i class="icon fa" :class="alterIcon"></i> {{ message.title }} </h4>
    <div v-html="msgContent"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'LaAlert',
    props: {
      type: {
        type: String,
        default: 'info'
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      timeout: {
        type: Number,
        default: 0
      },
      callback: {
        type: Function
      },
      message: {
        type: [Object, String],
        default: () => {
          return {
            title: 'Welcome!',
            content: ''
          }
        }
      },
      visible: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        hidden: !this.visible,
        defaultMsg: 'Hello World! <a href="http://www.jianzb.cn/" target="_blank"><i class="fa fa-globe fa-2x"></i></a>'
      }
    },

    computed: {
      msgContent () {
        return (this.message.content || this.message.content === '') ? this.message.content : this.defaultMsg
      },
      alterIcon () {
        switch (this.type) {
          case 'danger':
            return 'fa-ban'
          case 'success':
            return 'fa-check'
          case 'warning':
            return 'fa-warning'
          case 'info':
            return 'fa-info-circle'
        }
      }
    },

    watch: {
      visible () {
        this.hidden = !this.visible
        if (this.visible && this.timeout) {
          this.setTimeout()
        }
      }
    },

    methods: {
      hide () {
        this.hidden = true
        this.$emit('hide')
        if (typeof this.callback === 'function') {
          this.callback()
        }
      },
      setTimeout () {
        setTimeout(this.hide, this.timeout)
      }
    }
  }
</script>

<style scoped>
  .alert {
    margin: 15px;
  }
  .alert .close {
    min-width: 21px;
    color: white;
    opacity: 1;
  }
</style>
