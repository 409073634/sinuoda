import { createApi } from './common'

/**
 * 基础模块
 * 1. 客户分类 basic_customer_sort
 * 2. 客户档案 basic_customer
 * 3. 供应商分类 basic_supplier_sort
 * 4. 供应商档案 basic_supplier
 * 5. 收发货地址 basic_address
 * 6. 原材料分类 basic_materil_sort
 * 7. 原材料档案 basic_material
 * 8. 产品表 basic_product                 // TODO
 * 9. 产品尺寸 basic_product_size
 * 10. 尺寸明细 basic_product_size_item    // TODO
 * 11. 产品系列表 basic_series             // TODO
 * 12. 报价系数 basic_series_offer         // TODO
 * 13. 验货标准 basic_series_inspect       // TODO
 * 14. 颜色档案 basic_color
 * 15. 单位档案 basic_unit
 * 16. 币种档案 basic_currency
 * 17. 币种汇率 basic_currency_rate
 * 18. 仓库档案 basic_stockroom
 */
export default {
  // 1. 客户分类 basic_customer_sort
  customerSort: createApi('CustomerSort', [
    { name: 'getTree', method: 'get', end: 'tree' }
  ]),

  // 2. 客户档案 basic_customer
  customer: createApi('Customer', [
    { name: 'paged' },
    { name: 'newCustomer', method: 'get' },
    { name: 'openUpdate', path: 'id' },
    { name: 'switchStatus', path: 'id' }
  ]),

  // 3. 供应商分类 basic_supplier_sort
  supplierSort: createApi('SupplierSort', [
    { name: 'getTree', method: 'get', end: 'tree' }
  ]),

  // 4. 供应商档案 basic_supplier
  supplier: createApi('Supplier', [
    { name: 'allChoose' },  // TODO
    { name: 'paged' },
    { name: 'openUpdate', path: 'id' },
    { name: 'switchStatus', path: 'id' },
    { name: 'getAll', method: 'get', end: 'all' }
  ]),

  /**
   * 5. 收发货地址 basic_address
   */
  address: createApi('Address', [
    { name: 'delete', method: 'get', path: 'id' },
    { name: 'get', method: 'get', path: 'id' },
    { name: 'getListByPid', method: 'get', path: 'id' }
  ]),

  // 6. 原材料分类 basic_material_sort
  materialSort: createApi('MaterilSort', [
    { name: 'delete', end: 'del', query: 'id' },
    { name: 'getTree', method: 'get', end: 'tree' }
  ]),

  // 7. 原材料档案 basic_material
  material: createApi('Materil', [
    { name: 'delete', end: 'del', query: 'id' },
    { name: 'getAll', end: 'all' },
    { name: 'paged' }
  ]),

  // 8. 产品表 basic_product
  product: createApi('TODO', []),

  // 9. 产品尺寸 basic_product_size
  productSize: createApi('Size', [
    { name: 'delete', method: 'get', path: 'id' },
    { name: 'get', method: 'get', path: 'id' },
    { name: 'getAll', method: 'get' },
    { name: 'paged', end: 'page' }
  ]),

  // 10. 尺寸明细 basic_product_size_item
  productSizeItem: createApi('TODO', []),

  // 11. 产品系列表 basic_series
  series: createApi('Series', [
    { name: 'del', method: 'post', path: 'id' },
    { name: 'Get', method: 'get', path: 'id' },
    { name: 'paged' },
    { name: 'all', method: 'post' },
    { name: 'Add', method: 'post' },
    { name: 'Update', method: 'post', path: 'id' }
  ]),

  // 12. 报价系数 basic_series_offer
  seriesOffer: createApi('TODO', []),

  // 13. 验货标准 basic_series_inspect
  seriesInspect: createApi('TODO', []),

  // 14. 颜色档案 basic_color
  color: createApi('Color', [
    { name: 'paged' },
    { name: 'get', method: 'get', path: 'id' },
    { name: 'list', method: 'get' },
    { name: 'delete', path: 'id' }
  ]),

  // 15. 单位档案 basic_unit
  unit: createApi('Unit', [
    { name: 'delete', method: 'get', path: 'id' },
    { name: 'get', method: 'get', path: 'id' },
    { name: 'getAll', method: 'get' },
    { name: 'paged', end: 'page' }
  ]),

  // 16. 币种档案 basic_currency
  currency: createApi('Currency', [
    { name: 'delete', end: 'del', query: 'id' },
    { name: 'getAll', end: 'all' },
    { name: 'paged' }
  ]),

  // 17. 币种汇率 basic_currency_rate
  currencyRate: createApi('CurrencyRate', [
    { name: 'delete', end: 'del', query: 'id' },
    { name: 'getAll', end: 'all' },
    { name: 'paged' }
  ]),

  // 18. 仓库档案 basic_stockroom
  stockroom: createApi('StockRoom', [
    { name: 'getAll', end: 'all', method: 'get' },
    { name: 'paged' },
    { name: 'delete', method: 'get', path: 'id' },
    { name: 'get', method: 'get', path: 'id' },
    { name: 'getByCode', method: 'get' }
  ]),

  // 19. 下拉框
  combo: createApi('Combo', [
    { name: 'GetCustomerComboBox', method: 'get' },
    { name: 'GetCustomerComboGrid', method: 'get' },
    { name: 'GetAttrValueComboBox', method: 'get' },
    { name: 'GetSupplierComboBox', method: 'get' },
    { name: 'GetSeriesComboGrid', method: 'get' }
  ])
}
