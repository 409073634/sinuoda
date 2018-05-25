<template>

  <eui-window ref="customerDialog" :options="dialogOptions" styles="max-width: 90%; max-height: 80%;">
    <div>
      <div class="form-group col-lg-3 col-md-4 col-xs-6"
           v-for="(pv, pk) in modelProps" v-if="!pv.hidden">
        <label>{{ pv.label }}</label>
        <eui-input :ref="'input_' + pk"
                   :eui-type="pv.type"
                   :disabled="pv.readonly"
                   :required="pv.required"
                   :options="inputOptions[pk]"
                   v-model="customer[pk]">
        </eui-input>
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-primary" @click="saveCustomer">保存</button>
      <button class="btn btn-default" @click="cancelCustomer">取消</button>
    </div>
  </eui-window>

</template>

<script>
  import api from '@/api'
  import { getTreeData } from '@/app/common'
  import { messager, CopyHelper } from '@/utils'

  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'

  import { CUSTOMER_PROPS } from './customer-data'

  export default {
    name: 'CustomerDialog',

    props: {
      customer: {
        type: Object,
        default: () => {}
      }
    },

    components: {
      EuiWindow,
      EuiForm,
      EuiInput
    },

    data () {
      return {
        modelProps: CUSTOMER_PROPS.toObject(),
        dialogOptions: {
          title: '客户详情',
          onBeforeClose: () => {
            // Check changes before close
            console.log('onBeforeCloseonBeforeClose')
            if (this.copyHelper.isChanged()) {
              // Show confirm dialog
              this.cancelCustomer()
              // Keep window
              return false
            }
            // Close
            return true
          }
        },
        inputOptions: {
          pid: {
            data: [],
            onBeforeSelect: node => {
              if (node.children && node.children.length) {
                messager.info('last-node')
                this.$refs['input_pid'].callByName('showPanel')
                return false
              }
              return true
            }
          }
        }
      }
    },

    computed: {
      modelNames: () => CUSTOMER_PROPS.flatMap('label')
    },

    methods: {
      // Dialog Action Handlers
      saveCustomer () {
        // Validate
        let validateProps = CUSTOMER_PROPS.filter(p => p.required)
        let invalid = Object.keys(validateProps).filter(p => this.customer[p] === '')
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
        if (this.customer.id) {
          // update
          api.customer.update(this.customer).then(saveDone)
        } else {
          // add
          api.customer.add(this.customer).then(saveDone)
        }
      },
      cancelCustomer () {
        this.copyHelper.confirm().then(this.closeDialog)
      },

      getInputOptions () {
        api.customer.getOptions().then(data => {
          this.inputOptions.pid.data = getTreeData(data, 'customerSortDtoList', {text: 'name'})
        })
      },

      // Dialog
      openDialog () {
        this.copyHelper = new CopyHelper(this.customer, this.modelNames)
        this.$refs['customerDialog'].callByName('open')
      },
      closeDialog () {
        this.$refs['customerDialog'].callByName('close')
      }
    },

    created () {
      this.getInputOptions()
    }
  }
</script>

<style scoped>
  .form-group label {
    width: 5em;
  }
</style>
