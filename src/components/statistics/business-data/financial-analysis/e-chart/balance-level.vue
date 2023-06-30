<template>
  <content>
    <v-chart
      ref="chart"
      :auto-resize="true"
      class="e-chart"
      :option="chart.option"
    />
  </content>
</template>

<script>
  import { use } from 'echarts/core'
  import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components'
  import { BarChart, LineChart } from 'echarts/charts'
  import { UniversalTransition } from 'echarts/features'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
  ])

  export default {
    name: 'ValueCardBarLine',
    components: { VChart },

    data: function () {
      return {
        chart: {
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999',
                },
              },
            },
            toolbox: {
              feature: {},
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '12%',
              containLabel: true,
            },
            legend: {
              data: ['人数', '占比'],
              orient: 'horizontal',
              top: 'bottom',
            },
            xAxis: [
              {
                type: 'category',
                data: [
                  '剩余3千以下',
                  '剩余3千到1万',
                  '剩余1万到3万',
                  '剩余3万到6万',
                  '剩余6万以上',
                ],
                axisPointer: {
                  type: 'shadow',
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                  formatter: '{value}',
                },
              },
              {
                type: 'value',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                  formatter: '{value} %',
                },
              },
            ],
            series: [
              {
                name: '人数',
                type: 'bar',
                barWidth: '16',
                itemStyle: {
                  color: '#5c59c3',
                },
                tooltip: {
                  valueFormatter: function (value) {
                    return value
                  },
                },
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 6.4, 3.3],
              },
              {
                name: '占比',
                type: 'line',
                itemStyle: {
                  color: '#c35843',
                },
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' %'
                  },
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 23.0, 16.5, 12.0, 6.2],
              },
            ],
          },
        },
      }
    },
    activated() {},
    created() {},
    mounted() {
      this.$nextTick(() => {
        this.$refs.chart.resize()
      })
    },
    methods: {},
  }
</script>

<style scoped>
  .e-chart {
    height: 300px;
  }
</style>
