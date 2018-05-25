<template>
  <section class="content">

    <h2 class="page-header">Custom Tabs</h2>

    <div class="row">

      <div class="col-md-6">

        <la-tab :tab-data="tabData1">

          <template slot="header">
            <la-dropdown></la-dropdown>
            <li class="pull-right">
              <a href="#" class="text-muted">
                <i class="fa fa-gear"></i>
              </a>
            </li>
          </template>

          <template slot="content_3">
            <div class="clearfix">
              <la-info-box color="info"></la-info-box>
            </div>
          </template>

        </la-tab>

      </div>

      <div class="col-md-6">

        <la-tab :tab-data="tabData2">

          <template slot="header">
            <la-dropdown></la-dropdown>
          </template>

        </la-tab>

      </div>

    </div>

    <h2 class="page-header">Carousel & Accordion</h2>

    <div class="row">
      <la-card size="6" title="Hello Carousel">
        <la-carousel :bg-style="{backgroundSize: 'cover', paddingBottom: '55%'}">
        </la-carousel>
      </la-card>

      <la-card size="6" title="Accordion Title">
        <la-accordion :accordion-data="accordionData">
          <template slot='content_2' slot-scope="props">
            <la-info-box :color="props.data.color"></la-info-box>
          </template>
        </la-accordion>
      </la-card>
    </div>

  </section>
</template>

<script>
import LaTab from 'lazuli/src/components/containers/LaTab'
import LaCard from 'lazuli/src/components/containers/LaCard'
import LaDropdown from 'lazuli/src/components/general/LaDropdown'
import LaCarousel from 'lazuli/src/components/containers/LaCarousel'
import LaAccordion from 'lazuli/src/components/containers/LaAccordion'
import LaInfoBox from 'lazuli/src/components/widgets/LaInfoBox'
import { tabdata, accordiondata } from '../demo.data'

export default {
  name: 'GeneralView',
  components: {
    LaInfoBox,
    LaTab,
    LaCard,
    LaCarousel,
    LaAccordion,
    LaDropdown
  },
  data () {
    return {
      tabData1: Object.assign({}, tabdata, {title: ''}),
      tabData2: tabdata,
      accordionData: accordiondata
    }
  }
}
</script>
