<template>
  <div class="ServiceNumberMonth">
    <div class="header">
      <div class="left">
        <div class="h-cel title">每月项目服务人数</div>
      </div>
      <div class="right">
        <div class="bt"></div>
      </div>
    </div>
    <div class="content">
      <v-chart
        ref="chart"
        :auto-resize="true"
        class="e-chart"
        :option="chart.option"
      />
    </div>
  </div>
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
    name: 'ServiceNumberMonth',
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
              data: ['营收', '人均营收'],
              orient: 'horizontal',
              top: 'bottom',
            },
            xAxis: [
              {
                type: 'category',
                data: ['2022-01', '2022-02', '2022-03', '2022-04', '2022-05'],
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
                  formatter: '{value}',
                },
              },
            ],
            series: [
              {
                name: '营收',
                type: 'bar',
                itemStyle: {
                  color: '#00b0f0',
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
                name: '人均营收',
                type: 'line',
                itemStyle: {
                  color: '#00b0f0',
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
        searchData: {
          start: '',
          end: '',
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
  .ServiceNumberMonth {
    width: 100%;
    border: 1px solid #eeeeee;
    border-radius: 6px;

    background: white;

    .header {
      display: flex;
      height: 40px;
      padding: 0 10px;

      .left {
        display: flex;
        align-items: center;
        flex: 1;

        .title {
          font-weight: bold;
        }

        .h-cel {
          padding: 0 4px;
          float: left;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          padding: 5px;
          color: #1298e6;
          cursor: pointer;
        }
      }
    }

    .content {
      .e-chart {
        height: 300px;
      }
    }
  }
</style>
