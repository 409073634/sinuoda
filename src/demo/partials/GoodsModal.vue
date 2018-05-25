<template>
  <div :style="'display: ' + showModal" class="modal fade in" id="modal-default" style="padding-right: 17px;" @click="cancel">
    <div class="modal-dialog" @click.stop="">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" @click="cancel">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{ item['Id'] ? '编辑物品' : '添加物品' }}</h4>
        </div>
        <div class="modal-body clearfix">
          <la-input label="物品名称" v-model="item['Name']" :status="nameStatus"></la-input>
          <la-input label="物品描述" v-model="item['Description']" type="textarea"></la-input>
          <la-input size="6" label="物品备注" v-model="item['Memo']"></la-input>
          <la-input size="6" type="number" label="物品分数" v-model="item['Score']" :status="scoreStatus"></la-input>
          <la-input size="6" type="number" label="物品数量" v-model="item['Quantity']"></la-input>
          <la-input size="6" type="number" label="冻结数量" v-model="item['FrozenCount']" :disabled="true"></la-input>

          <div class="image-cropper col-xs-12">
            <la-cropper :old-src="item['icon']" title="图片" @reset="resetImage" @save="saveImage"></la-cropper>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">取消</button>
          <button type="button" class="btn btn-success" @click="save">保存</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import LaCropper from 'lazuli/src/components/plugins/LaCropper'
import LaInput from 'lazuli/src/components/inputs/LaInput'

export default {
  name: 'GoodsModal',
  components: {
    LaCropper,
    LaInput
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object,
      default () {
        return {
          Id: null,
          Name: '',
          Memo: '',
          Description: '',
          Score: 0,
          Quantity: 0,
          FrozenCount: 0,
          icon: ''
        }
      }
    }
  },
  data () {
    return {
      show_: true,
      item: {}
    }
  },
  watch: {
    show () {
      this.show_ = true
    },
    modalData () {
      this.show_ = true
      this.item = Object.assign({}, this.modalData)
    }
  },
  computed: {
    showModal () {
      return (this.show && this.show_) ? 'block' : 'none'
    },
    nameStatus () {
      return this.item['Name'] ? '' : 'error'
    },
    scoreStatus () {
      return this.item['Score'] > 0 ? '' : 'error'
    }
  },
  methods: {
    cancel () {
      this.show_ = false
      this.resetImage()
      this.$emit('cancel')
    },
    save () {
      if (this.item['Name'] && this.item['Score'] > 0) {
        this.$emit('save', this.item)
      }
    },
    resetImage () {
      this.item['icon'] = this.modalData['icon']
    },
    saveImage (img) {
      // Upload image to server, then set this.item.icon
      // api.goods.uploadImage(img.replace(/.*base64,/, ''))
      //   .then(path => {
      //     this.item['icon'] = path
      //   })
    }
  }
}
</script>

