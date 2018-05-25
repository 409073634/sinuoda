<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">

      <la-alert type="success" :dismissible='true'></la-alert>

      <la-info-box v-for="info in dashinfo1" :key="info.text"
                size="3" :info="info" :color='info.color' :icon="info.icon">
      </la-info-box>

    </div>
    <!-- /.row -->

    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">

            <div class="col-sm-6 col-xs-12">
              <la-chart-line title="Web Traffic Overview">
              </la-chart-line>
            </div>

            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <la-chart-pie title="Language Overview"
                         :legend="{position: 'right'}"
                         :labels="['HTML', 'JavaScript', 'CSS']"
                         :numbers="[56.6, 37.7, 4.1]">
              </la-chart-pie>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">

      <la-info-box v-for="info in dashinfo2" :key="info.text"
                :info="info" :full-color="info.color"
                :progress="info.progress">
      </la-info-box>

    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</template>

<script>
import LaAlert from 'lazuli/src/components/widgets/LaAlert'
import LaInfoBox from 'lazuli/src/components/widgets/LaInfoBox'
import LaChartPie from 'lazuli/src/components/charts/LaChartPie'
import LaChartLine from 'lazuli/src/components/charts/LaChartLine'
import {dashinfo1, dashinfo2} from '../demo.data'

export default {
  data () {
    return {
      dashinfo1: dashinfo1,
      dashinfo2: dashinfo2
    }
  },
  components: {
    LaAlert,
    LaInfoBox,
    LaChartLine,
    LaChartPie
  }
}
</script>
<style>
.fullCanvas {
  width: 100%;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
