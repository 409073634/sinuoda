<template>

  <eui-window ref="csWindow" :options="dialogOptions" styles="max-width: 60%; max-height: 80%;">
    <div>
      <div class="form-group col-lg-3 col-md-4 col-xs-6"
           v-for="(pv, pk) in modelProps" v-if="!pv.hidden">
        <label>{{ pv.label }}</label>
        <eui-input :eui-type="pv.type"
                   :required="pv.required"
                   :disabled="pv.readonly"
                   :options="inputOptions[pk]"
                   v-model="sort[pk]">
        </eui-input>
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-primary" @click="saveSort">保存</button>
      <button class="btn btn-default" @click="cancelSort">取消</button>
    </div>
  </eui-window>

</template>

<script>
  import api from '@/api'
  import { CopyHelper } from '@/utils'
  import { getTreeData } from '@/app/common'

  import EuiWindow from '@/components/easyui/window/EuiWindow'
  import EuiForm from '@/components/easyui/form/EuiForm'
  import EuiInput from '@/components/easyui/form/EuiInput'

  import { SORT_PROPS } from '@/app/basic/customer/customer-data'

  export default {
    name: 'CustomerSortDialog',

    props: {
      sort: {
        type: Object,
        default: () => {}
      },
      tree: {
        type: Array,
        default: () => []
      }
    },

    components: {
      EuiWindow,
      EuiForm,
      EuiInput
    },

    data () {
      return {
        modelProps: SORT_PROPS.toObject(),
        dialogOptions: {
          title: '客户类别',
          onBeforeClose: () => {
            // Check changes before close
            if (this.copyHelper.isChanged()) {
              // Show confirm dialog
              this.cancelSort()
              // Keep window
              return false
            }
            // Close
            return true
          }
        }
      }
    },

    computed: {
      modelNames: () => SORT_PROPS.flatMap('label'),
      inputOptions () {
        let rootNode = {
          id: '0',
          text: '根目录',
          children: getTreeData(JSON.parse(JSON.stringify(this.tree || [])), 'customerSortDtoList', {text: 'name'})
        }
        return {
          pid: {
            data: [ rootNode ]
          }
        }
      }
    },

    methods: {
      saveSort () {
        let onSuccess = () => {
          this.copyHelper.sync()
          this.closeDialog()
          this.$emit('saved')
        }
        if (this.sort.id) {
          api.customerSort.update(this.sort).then(onSuccess)
        } else {
          api.customerSort.add(this.sort).then(onSuccess)
        }
      },
      cancelSort () {
        this.copyHelper.confirm().then(this.closeDialog)
      },

      openDialog () {
        this.copyHelper = new CopyHelper(this.sort, this.modelNames)
        this.$refs['csWindow'].callByName('open')
      },
      closeDialog () {
        this.$refs['csWindow'].callByName('close')
      }
    }
  }
</script>

<style scoped>

</style>
