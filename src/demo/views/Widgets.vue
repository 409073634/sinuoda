<template>
  <section class="content">
    <div class="row">

      <la-info-box v-for="info in dashinfo1" :key="info.text"
                size="3" :info="info" :color='info.color' :icon="info.icon">
      </la-info-box>

      <la-info-box v-for="info in dashinfo2" :key="info.text"
                :info="info" :full-color="info.color"
                :progress="info.progress">
      </la-info-box>

      <la-stat-box v-for="info in dashinfo3" :key="info.text" :info="info">
      </la-stat-box>

    </div>

    <div class="row">

      <la-card></la-card>

      <la-card :info="cardinfo"></la-card>

      <la-card :info="cardinfo"
            :options="{color: 'success', solid: true, removable: true, collapsable: false}">
          <span slot="title">
            <i class="fa fa-th"></i> Title with icon
          </span>
          <div>
            <la-info-box size="12" full-color="green"
                      :info="{text: 'InfoBox inside la-card', num: '333'}">
            </la-info-box>
          </div>
      </la-card>

      <la-card :info="cardinfo" :options="{loading: true, color: 'danger'}">
        <span slot="title">
          Card Loading
        </span>
      </la-card>

    </div>
  </section>
</template>

<script>
import LaStatBox from 'lazuli/src/components/widgets/LaStatBox'
import LaInfoBox from 'lazuli/src/components/widgets/LaInfoBox'
import LaCard from 'lazuli/src/components/containers/LaCard'

import {dashinfo1, dashinfo2, dashinfo3} from '../demo.data'

export default {
  name: 'WidgetsView',
  components: {
    LaCard,
    LaStatBox,
    LaInfoBox
  },
  data () {
    return {
      cardinfo: {
        title: 'Card Title',
        content: 'The body of the card',
        options: {
          collapsable: true,
          color: 'warning'
        }
      },
      dashinfo1: dashinfo1,
      dashinfo2: dashinfo2,
      dashinfo3: dashinfo3
    }
  }
}
</script>
