<template>
  <section class="content">

    <div class="row" style="padding-bottom: 200px;">

      <!-- Form example -->
      <la-card size="6" :info="{title: 'Form Example'}" :options="{color: 'info', collapsable: true}">
        <ex-form action="#"></ex-form>
      </la-card>

      <!-- Input with addons -->
      <la-card size="6" title="Input with addons" :options="{color: 'warning'}">

        <la-input-addon></la-input-addon>
        <br>

        <la-input-addon left="@" type="email" placeholder="Email" size="sm"></la-input-addon>
        <br>

        <la-input-addon left="fa-dollar" right="fa-ambulance"></la-input-addon>
        <br>

        <la-input-addon :left="leftBtn"></la-input-addon>
        <br>

        <la-input-addon size="lg">
          <div class="input-group-btn" slot="left">
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
              Action <span class="fa fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </div>
        </la-input-addon>

      </la-card>

      <!-- Color Pickers -->
      <la-card size="6" title="ColorPicker" id="color_pickers">
        <div class="color-picker">
          <sketch-picker v-model="color"></sketch-picker>
        </div>
        <div class="color-picker slider-picker">
          <slider-picker v-model="color"></slider-picker>
        </div>
      </la-card>

      <!-- Select -->
      <la-card size="6" title="Vue Select">

        <v-select v-model="selected" :options="['foo','bar']"></v-select>
        <br>

        <v-select multiple v-model="selected2" :options="['foo','bar']"></v-select>

      </la-card>

      <!-- Date & Time Pickers -->
      <la-card size="6" title="Date Picker">

        <div class="col-xs-6">
          <h4>Date</h4>
          <date-picker v-model="selectedDate"></date-picker>
        </div>

        <div class="col-xs-6">
          <h4>Date Range</h4>
          <date-picker v-model="dateRange" range></date-picker>
        </div>

        <div class="col-xs-6" id="monthpicker">
          <h4>Month</h4>
          <month-picker v-model="selectedMonth"
                        input-class="input"
                        :yearOnly="false"
                        place-holder="选择月份">
          </month-picker>
        </div>

        <div class="col-xs-6" id="timepicker">
          <h4>Time</h4>
          <time-picker></time-picker>
        </div>

      </la-card>

    </div>

  </section>
</template>

<script>
import LaCard from 'lazuli/src/components/containers/LaCard'
import ExForm from '../partials/ExForm'

import LaInputAddon from 'lazuli/src/components/inputs/LaInputAddon'
import MonthPicker from 'lazuli/src/components/inputs/LaMonthPicker'
import DatePicker from 'vue2-datepicker'
import TimePicker from 'vue2-timepicker'
import vSelect from 'vue-select'
import { Slider, Sketch } from 'vue-color'

export default {
  name: 'FormsView',
  components: {
    SliderPicker: Slider,
    SketchPicker: Sketch,
    TimePicker,
    DatePicker,
    MonthPicker,
    vSelect,
    LaCard,
    LaInputAddon,
    ExForm
  },
  data () {
    let defaultColor = {
      hex: '#194d33',
      hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      a: 1
    }
    return {
      selected: null,
      selected2: [],
      selectedDate: '',
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 12), new Date()],
      selectedMonth: '',
      leftBtn: {
        type: 'button',
        text: 'ion-unlocked',
        color: 'danger'
      },
      color: defaultColor
    }
  }
}
</script>

<style lang="scss">
#timepicker {
  span.time-picker {
    width: 100%;
    max-width: 210px;

    input.display-time {
      width: 100%;
      border-radius: 4px;
    }
  }
}

#monthpicker .vue-monthly-picker {
  max-width: 210px;
}

#color_pickers {
  .color-picker {
    float: left;
    padding: 5px;
  }
}
</style>
