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
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components'
  import { BarChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
  ])

  export default {
    name: 'GuestSituation',
    components: { VChart },
    props: {},
    data: function () {
      return {
        chart: {
          option: {
            legend: {
              orient: 'horizontal',
              top: 'bottom',
            },
            tooltip: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '12%',
              containLabel: true,
            },

            dataset: {
              source: [
                ['日期', '老客到店活跃率', '到店老人数', '客数'],
                ['2022-06', 43.3, 85.8, 85.8],
                ['2022-07', 82.1, 73.4, 85.8],
                ['2022-08', 86.4, 65.2, 85.8],
                ['2022-09', 72.4, 53.9, 85.8],
              ],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
              {
                type: 'bar',
                barWidth: '30',
                itemStyle: {
                  color: '#229ddc',
                },
                label: {
                  // 柱图头部显示值
                  show: true,
                  position: 'top',
                  color: '#333',
                  fontSize: '12px',

                  formatter: (params) => {
                    return params.value[params.encode.x[1]]
                  },
                },
              },
              {
                type: 'bar',
                barWidth: '30',
                itemStyle: {
                  color: '#ed7d31',
                },
                label: {
                  // 柱图头部显示值
                  show: true,
                  position: 'top',
                  color: '#333',
                  fontSize: '12px',
                  formatter: (params) => {
                    return params.value[params.encode.x[1]]
                  },
                },
              },
              {
                type: 'bar',
                barWidth: '30',
                itemStyle: {
                  color: '#a5a5a5',
                },
                label: {
                  // 柱图头部显示值
                  show: true,
                  position: 'top',
                  color: '#333',
                  fontSize: '12px',
                  formatter: (params) => {
                    return params.value[params.encode.x[1]]
                  },
                },
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
