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
      <button class="btn btn-primary" @click="search">查询</button>
      <button class="btn btn-default" @click="cancel">取消</button>
    </div>
  </eui-window>

</template>

<script>
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
      customerOptions: {
        type: Array,
        default: () => ([])
      },
      typeOptions: {
        type: Array,
        default: () => ([])
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

    computed: {
      inputOptions () {
        // let rootNode = this.inputOptions
        // this.customerOptions.forEach((item) => (item.value = item.id))
        return {
          customerId: {
            columns: [[
              {field: 'code', title: '编码', width: 100},
              {field: 'name', title: '客户名', width: 100}
            ]],
            textField: 'name',
            idField: 'id',
            data: JSON.parse(JSON.stringify(this.customerOptions || [])),
            fitColumns: true
          },
          attrType: {
            columns: [[
              {field: 'code', title: '编码', width: 100},
              {field: 'name', title: '系列类别', width: 100}
            ]],
            textField: 'name',
            idField: 'id',
            data: JSON.parse(JSON.stringify(this.typeOptions || [])),
            fitColumns: true
          }
        }
      }
    },

    methods: {
      // Dialog Action Handlers
      search () {
        // Validate
        let validateProps = this.modelConfig.filter(p => p.required)
        let invalid = Object.keys(validateProps).filter(p => this.value[p] === '')
        if (invalid && invalid.length) {
          let msg = invalid.map(k => validateProps[k].label).join(', ')
          messager.info('下列内容不能为空', msg)
          return
        }

        this.copyHelper.sync()
        this.closeDialog()
        this.$emit('searched')
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
