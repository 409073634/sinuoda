<template>
  <form-dialog ref="supplier_dlg"
               v-model="supplier"
               model-name="supplier"
               :model-config="SUPPLIER_PROPS"
               :dialog-options="dialogOptions"
               :input-options="inputOptions">
  </form-dialog>
</template>

<script>
  import FormDialog from '@/components/common/FormDialog'

  import { SUPPLIER_PROPS } from './supplier.config'

  import { getTreeData } from '@/app/common'
  import { messager } from '@/utils'

  export default {
    name: 'SupplierDialog2',
    props: {
      supplier: {
        type: Object,
        required: true
      },
      tree: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        SUPPLIER_PROPS,
        dialogOptions: {
          title: '供应商详情'
        }
      }
    },
    components: {
      FormDialog
    },
    computed: {
      inputOptions: () => {
        let treeCopy = JSON.parse(JSON.stringify(this.tree || []))
        return {
          pid: {
            data: getTreeData(treeCopy, 'supplierSortDtoList', {text: 'name'}),
            onBeforeSelect: node => {
              if (node.children && node.children.length) {
                messager.info('last-node')
                this.$refs['supplier_dlg'].callMyName('input_pid', 'showPanel')
                return false
              }
              return true
            }
          }
        }
      }
    }
  }
</script>
