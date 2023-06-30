<template>
  <div class="StoreGuestTrend2">
    <div class="header">
      <div class="left">
        <div class="h-cel title">
          按门店-到店客次趋势走向
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
    name: 'StoreGuestTrend2',
    components: { VChart },
    props: {},
    data: function () {
      return {
        chart: {
          option: {
            legend: {},
            tooltip: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            dataset: {
              source: [
                ['日期', '开卡充值客数', '日均到店客数'],
                ['2022-06', 43.3, 85.8],
                ['2022-07', 82.1, 73.4],
                ['2022-08', 86.4, 65.2],
                ['2022-09', 72.4, 53.9],
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
                  color: '#14a091',
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
  .StoreGuestTrend2 {
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
