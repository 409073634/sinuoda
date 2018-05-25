<template>

  <eui-window ref="formDialog" :options="dialogOptions_c" styles="max-width: 90%; max-height: 80%;">
    <div>
      <div class="form-group col-lg-3 col-md-4 col-xs-6"
           v-for="(pv, pk) in modelProps" :key="pk" v-if="!pv.hidden">
        <label>{{ pv.label }}</label>
        <eui-input :ref="'input_' + pk"
                   :eui-type="pv.type"
                   :disabled="pv.readonly"
                   :required="pv.required"
                   :styles="pv.styles || inputStyles"
                   :options="inputOptions[pk] || pv.options"
                   v-model="value[pk]">
        </eui-input>
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-primary" @click="save">保存</button>
      <button class="btn btn-default" @click="cancel">取消</button>
    </div>
  </eui-window>

</template>

<script>
  import api from '@/api'
  import { messager, UFObject, CopyHelper } from '@/utils'

  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'

  export default {
    name: 'FormDialog',

    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      modelName: {
        type: String,
        required: true
      },
      modelConfig: {
        type: UFObject,
        required: true
      },
      dialogOptions: {
        type: Object,
        default: () => ({})
      },
      inputOptions: {
        type: Object,
        default: () => ({})
      }
    },

    components: {
      EuiWindow,
      EuiForm,
      EuiInput
    },

    data () {
      return {
        modelNames: this.modelConfig.flatMap('label'),
        modelProps: this.modelConfig.toObject(),
        inputStyles: '',
        dialogOptions_c: Object.assign({
          title: 'Dialog Title',
          onBeforeClose: () => {
            // Check changes before close
            if (this.copyHelper.isChanged()) {
              // Show confirm dialog
              this.cancel()
              // Keep window
              return false
            }
            // Close
            return true
          }
        }, this.dialogOptions)
      }
    },

    methods: {
      // Dialog Action Handlers
      save () {
        // Validate
        let validateProps = this.modelConfig.filter(p => p.required)
        let invalid = Object.keys(validateProps).filter(p => this.value[p] === '')
        if (invalid && invalid.length) {
          let msg = invalid.map(k => validateProps[k].label).join(', ')
          messager.info('下列内容不能为空', msg)
          return
        }

        // Reload and close dialog
        let saveDone = () => {
          this.copyHelper.sync()
          this.closeDialog()
          this.$emit('saved')
        }

        // Save or update
        if (this.value.id) {
          // update
          api[this.modelName].update(this.value).then(saveDone)
        } else {
          // add
          console.log(12)
          api[this.modelName].add(this.value).then(saveDone)
        }
      },
      cancel () {
        this.copyHelper.confirm().then(this.closeDialog)
      },

      // Public
      callMyName (inputRef, action, data) {
        if (this.$refs[inputRef] && this.$refs[inputRef].callByName) {
          this.$refs[inputRef].callByName(action, data)
        }
      },

      // Dialog
      openDialog () {
        this.copyHelper = new CopyHelper(this.value, this.modelNames)
        this.$refs['formDialog'].callByName('open')
      },
      closeDialog () {
        this.$refs['formDialog'].callByName('close')
      }

    }
  }
</script>

<style scoped>
  .form-group label {
    width: 5em;
  }
</style>
