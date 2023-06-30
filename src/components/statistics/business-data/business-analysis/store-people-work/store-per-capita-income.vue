<template>
  <div class="StorePerCapitaIncome">
    <div class="header">
      <div class="l">
        按门店-门店人均营收
        <DatePicker
          format="yyyy-MM-dd"
          placeholder="开始时间-结束时间"
          size="small"
          style="width: 180px"
          transfer
          type="datetimerange"
          value-format="yyyy-MM-dd"
          @on-change="changeDatePicker"
          @on-clear="clearDate"
          @on-open-change="changeDatePicker"
        />
      </div>
      <div class="r"></div>
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
    name: 'StorePerCapitaIncome',
    components: { VChart },

    data: function () {
      return {
        searchData: { search: '', start: '', end: '' },
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
                  color: '#7bc9be',
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
                  color: '#ec7c72',
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
    methods: {
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .StorePerCapitaIncome {
    .header {
      padding: 10px;
      display: flex;

      .l {
        font-weight: bold;
        flex: 1;
      }

      .r {
      }
    }

    .content {
      .e-chart {
        height: 240px;
      }
    }
  }
</style>
