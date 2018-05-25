<template>

  <div class="col-md-12">

    <la-data-table :config="tableConfig">

      <template slot="header">
        <div class="pull-right">
          <button class="btn btn-info" @click="showModal(null)">
            添加物品
          </button>
        </div>
      </template>

    </la-data-table>

    <goods-modal :show="modalView"
                    :modal-data="modalData"
                    @save="saveItem"
                    @cancel="hideModal">
    </goods-modal>

    <la-confirm-modal v-if="confirms['msg']"
                      :message="confirms['msg']"
                      :data="confirms['data']"
                      @confirm="deleteItem"
                      @cancel="hideConfirmModal">
    </la-confirm-modal>

  </div>

</template>

<script>
import find from 'lodash/find'
import LaDataTable from 'lazuli/src/components/tables/LaDataTable'
import LaConfirmModal from 'lazuli/src/components/dialogs/LaConfirmModal'

import GoodsModal from './GoodsModal'
import { goodsAPI } from '../demo.data'

export default {
  name: 'ExDataTable',

  components: {
    LaDataTable,
    LaConfirmModal,
    GoodsModal
  },

  data () {
    return {
      // 原始数据
      goods: [],

      // 表格配置
      tableConfig: {
        pageSize: 5,
        startPage: 1, // TODO

        // 刷新数据（初始值必须为false，需要手动刷新表格数据时改为true）
        update: false,

        title: '测试',
        cols: [
          /**
           * 表格列属性对象
           *
           * id: 列ID
           * name: 显示名
           * type: 类型
           * sort: 启用排序（可选），-1: 倒序，0: 启用但不排序，1: 正序；
           *       多列启用时，初始按第一非0列排序
           * hidden: 是否隐藏（可选）
           * style: 自定义样式（可选）
           * 其他属性: 自定义项，在本组件内使用（本例中sid: 排序时使用的原始数据中的属性名）
           */
          { id: 'name', name: '名称', type: 'text', sid: 'Name' },
          { id: 'desc', name: '描述', type: 'text', sid: 'Description' },
          { id: 'memo', name: '备注', type: 'text', sid: 'Memo' },
          { id: 'score', name: '分数', type: 'number', sid: 'Score', sort: -1 },
          { id: 'qty', name: '数量', type: 'number', sid: 'Quantity', sort: 0 },
          { id: 'actions', name: '操作', type: 'buttons', style: 'width: 120px' }
        ],

        // 表格参数
        options: {
          collapsable: false, // 是否可收起
          filter: true,       // 是否启用过滤框
          searchable: true    // 是否可搜索
        },

        callbacks: {
          // 获取数据
          fetchData: function (page, pageSize, searchName) {
            return goodsAPI.getList(page - 1, pageSize, searchName)
          },

          // 从接口返回结果中获取总数
          total: function (respData) {
            return respData['Total']
          },

          // 数据映射
          // Use arrow function or .bind(this) explicitly
          dataMap: function (respData) {
            this.goods = respData['PageData']
            return this.goods.map(item => {
              // 返回行对象，属性名称对应各列id
              return {
                name: item.Name,
                desc: item.Description,
                memo: item.Memo,
                score: item.Score,
                qty: item.Quantity,
                icon: item.Icon,
                // 按钮(buttons)类型的单元格
                actions: [
                  // name 和 action 为必需
                  { color: 'aqua', name: '编辑', action: 'edit', id: item.Id },
                  { color: 'red', name: '删除', action: 'delete', id: item.Id }
                ]
              }
            })
          }.bind(this)
        },

        // Custom sort method
        sorts: {
          score (rows, col) {
            rows.sort((a, b) => col.sort * ('' + a[col.id]).localeCompare('' + b[col.id]))
          },
          colName: function () {}
        },

        // Action handlers
        actions: {
          // Use arrow function or .bind(this) explicitly
          actionName: () => {},
          edit: btn => {
            this.showModal(btn.id)
          },
          delete: btn => {
            this.showConfirmModal(btn.id)
          }
        }
      },

      // 数据展示的模态框
      modalView: false,
      modalData: {},

      // 确认框数据
      confirms: {
        msg: '',
        data: ''
      }
    }
  },

  methods: {
    // 显示单项数据窗口
    showModal (itemId) {
      if (itemId) {
        this.modalData = find(this.goods, item => item.Id === itemId)
      } else {
        this.modalData = {}
      }
      this.modalView = true
    },
    // 隐藏数据窗口
    hideModal () {
      this.modalData = null
      this.modalView = false
    },

    // 显示确认窗口
    showConfirmModal (itemId) {
      let item = find(this.goods, _item => _item.Id === itemId)
      if (item) {
        this.confirms['msg'] = '确认删除物品：' + item.Name + '？'
        this.confirms['data'] = itemId
      }
    },
    // 隐藏确认窗口
    hideConfirmModal () {
      this.confirms['msg'] = ''
      this.confirms['data'] = null
    },

    // 修改或新增数据项
    saveItem (item) {
      if (item['Id']) {
        // 调用数据接口保存修改
        goodsAPI.update(item).then(data => {
          this.tableConfig.update = true
          this.hideModal()
        })
      } else {
        // 调用数据接口新增数据
        goodsAPI.add(item).then(() => {
          this.tableConfig.update = true
          this.hideModal()
        })
      }
    },

    // 删除项
    deleteItem (itemId) {
      // 调用数据接口删除数据
      goodsAPI.delete(itemId).then(() => {
        this.tableConfig.update = true
        this.hideConfirmModal()
      })
    }
  }
}
</script>
