<template>
  <section class="content">
    <div class="row center-block">
      <h2>Simple</h2>
      <div class="col-md-12">

        <la-table :table-data="table1" :filter="true" @sort="sortTable1">

          <template v-for="n in table1.rows.length" :slot="'label_'+n" slot-scope="props">
            <span :class="['badge', 'bg-'+(props.color || 'light-blue')]" :key="n">
              {{ props.value }}
            </span>
          </template>

        </la-table>

      </div>
    </div>

    <div class="row center-block">
      <h2>Data table</h2>
      <ex-data-table></ex-data-table>
    </div>

    <div class="row center-block">
      <h2>Data table (jQuery plugin)</h2>
      <div class="col-md-12">

        <jq-data-table :table-data="table2"></jq-data-table>

      </div>
    </div>
  </section>
</template>

<script>
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import LaTable from 'lazuli/src/components/tables/LaTable'

import JqDataTable from '../partials/JqDataTable'
import ExDataTable from '../partials/ExDataTable'

import {tableData1, tableData2} from '../demo.data'

export default {
  name: 'TablesView',
  components: {
    LaTable,
    ExDataTable,
    JqDataTable
  },
  data () {
    return {
      table1: tableData1,
      table2: tableData2
    }
  },
  methods: {
    sortTable1 (col) {
      this.table1.cols.forEach(col_ => {
        if (col_.hasOwnProperty('sort') && col_.id !== col.id) {
          col_.sort = 0
        }
      })
      this.table1.rows.sort((a, b) => col.sort * (a[col.id].localeCompare(b[col.id])))
    }
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
