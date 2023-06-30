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
    name: 'TurnCardRate',
    components: { VChart },
    props: {},
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
            grid: {
              top: '14%',
              left: '3%',
              right: '4%',
              bottom: '12%',
              containLabel: true,
            },
            toolbox: {
              feature: {},
            },
            legend: {
              data: ['新客办卡数', '新客', '新客转卡率'],
              orient: 'horizontal',
              top: 'bottom',
            },
            xAxis: [
              {
                type: 'category',
                data: ['分店11', '分店12', '分店13', '分店14', '分店15'],
                axisPointer: {
                  type: 'shadow',
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  formatter: '{value}',
                },
              },
              {
                type: 'value',
                axisLabel: {
                  formatter: '{value}  %',
                },
              },
            ],
            series: [
              {
                name: '新客办卡数',
                type: 'bar',
                itemStyle: {
                  color: '#649276',
                },
                barWidth: '16',
                tooltip: {
                  valueFormatter: function (value) {
                    return value
                  },
                },
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 6.4, 3.3],
              },
              {
                name: '新客',
                type: 'bar',
                itemStyle: {
                  color: '#5c59c3',
                },
                barWidth: '16',
                tooltip: {
                  valueFormatter: function (value) {
                    return value
                  },
                },
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 6.4, 3.3],
              },
              {
                name: '新客转卡率',
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

<style lang="less" scoped>
  .e-chart {
    height: 300px;
  }
</style>
