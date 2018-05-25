<template>
  <section class="content">
    <div class="row">
      <la-card size="12">
        <template slot="title">
          <select id="linechart_type" name="" v-model="linechartType">
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="bar">Bar</option>
          </select>
        </template>
        <la-chart-line :type="lineType" :config="lineConfig"></la-chart-line>
      </la-card>
    </div>
    <div class="row">
      <la-card size="12">
        <la-chart-pie></la-chart-pie>
      </la-card>
    </div>
  </section>
</template>

<script>
import LaChartLine from 'lazuli/src/components/charts/LaChartLine.vue'
import LaChartPie from 'lazuli/src/components/charts/LaChartPie.vue'
import LaCard from 'lazuli/src/components/containers/LaCard.vue'

export default {
  name: 'ChartsView',

  components: {
    LaCard,
    LaChartLine,
    LaChartPie
  },

  data () {
    return {
      linechartType: 'line'
    }
  },

  computed: {
    lineType () {
      return this.linechartType === 'area' ? 'line' : this.linechartType
    },
    lineConfig () {
      return {
        fill: this.linechartType === 'area'
      }
    }
  }
}
</script>

<style scoped>
.box {
  padding-top: 20px;
}
</style>
