<template>

  <form role="form" :action="action">

    <div class="box-body">

      <la-input type="email" :label="labelwithicon" placeholder="Enter email" status="success"></la-input>

      <la-input type="password" label="Your password" placeholder="Enter password" :disabled="true">
        <p class="help-block">Example block-level help text here.</p>
      </la-input>

      <la-input type="file" label="File input">
        <p class="help-block">Example block-level help text here.</p>
      </la-input>

      <la-input type="textarea" label="Content"></la-input>

      <la-input type="checkbox" label="Check me"></la-input>

      <la-input type="radio" :options="radios"></la-input>

      <la-input type="select" label="Select one" :options="selectOptions"></la-input>

    </div>
    <!-- /.box-body -->

    <div class="box-footer">
      <button v-for="btn in formButtons" :type="btn.type || btn" :class="['btn', 'btn-'+(btn.color || 'default')]">
        {{ btn.text || btn }}
      </button>
    </div>
  </form>

</template>

<script>
import LaInput from 'lazuli/src/components/inputs/LaInput.vue'
export default {
  name: 'ExForm',
  props: {
    action: {
      type: String,
      required: true
    },
    buttons: {
      type: Array
    }
  },
  components: {
    LaInput
  },
  computed: {
    formButtons () {
      return this.customBtns || this.buttons || {
        type: 'submit',
        text: 'Submit'
      }
    }
  },
  data () {
    return {
      customBtns: [{
        type: 'button',
        text: 'OK'
      }, {
        type: 'submit',
        text: 'Submit',
        color: 'primary'
      },
      {
        type: 'reset',
        text: 'Reset',
        color: 'danger'
      }],
      radios: [{
        value: 4,
        label: 'Option one is this and that—be sure to include why it',
        checked: true
      }, {
        value: 8,
        label: 'Option two can be something else and selecting it wil'
      }, {
        value: 12,
        label: 'Option three is disabled',
        disabled: true
      }],
      selectOptions: [{
        label: 'Option 1',
        value: 111
      }, {
        label: 'Option 3',
        value: 333,
        selected: true
      }, {
        label: 'Option 2',
        value: 222
      }],
      labelwithicon: '<i class="fa fa-envelope"></i> Email address'
    }
  }
}
</script>

<style scoped>
.box-footer button {
  margin-right: 20px;
}
</style>
