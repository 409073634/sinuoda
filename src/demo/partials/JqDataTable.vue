<template>
  <div class="box">

    <div class="box-header">
      <h3 class="box-title">{{ table.title }}</h3>
    </div>
    <!-- /.box-header -->

    <div class="box-body">

      <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
        <div class="row">
          <div class="col-sm-6">
            <div id="example1_length" class="dataTables_length">

            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 table-responsive">

            <table id="example1" aria-describedby="example1_info" role="grid"
                   class="table dataTable" :class="[table.type]">

              <thead>
                <tr role="row">
                  <th v-for="(col, idx) in table.cols"
                      :aria-label="col.name + ': activate to sort column descending'"
                      aria-sort="ascending" aria-controls="example1" tabindex="0"
                      :style="col.style" colspan="1" rowspan="1"
                      :class="[idx === 1 ? 'sorting_asc' : 'sorting']">
                    {{ col.name  }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, idx1) in table.rows"
                    :class="[idx1 % 2 ? 'even' : 'odd']" role="row">
                  <td v-for="(col, idx2) in table.cols"
                      :class="{'sorting_1': idx2 === 1}">
                    {{ row[col.id] }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th v-for="col in table.cols" colspan="1" rowspan="1">{{ col.name }}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <!-- /.box-body -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'DataTable',
  props: ['tableData'],
  data () {
    return {
      table: this.tableData
    }
  },
  mounted () {
    this.$nextTick(() => {
      $('#example1').DataTable()
    })
  }
}
</script>

<style lang="scss">
table th {
  text-transform: capitalize;
}
</style>
