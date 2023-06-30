<template>
  <div class="GuestAnalysis">
    <div class="header">
      <div class="left">
        <div class="h-cel title">
          按门店-到店客次分析
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
    GridComponent,
    MarkLineComponent,
    TooltipComponent,
  } from 'echarts/components'
  import { BarChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  use([
    GridComponent,
    BarChart,
    CanvasRenderer,
    MarkLineComponent,
    TooltipComponent,
  ])

  export default {
    name: 'GuestAnalysis',
    components: { VChart },
    props: {},
    data: function () {
      return {
        chart: {
          option: {
            backgroundColor: '#FFFFFFFF',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              top: '14%',
              left: '3%',
              right: '4%',
              bottom: '12%',
              containLabel: true,
            },
            xAxis: [
              {
                axisLine: {
                  show: true, // 不显示坐标轴线
                },
                axisTick: {
                  //x轴刻度线
                  show: true,
                  alignWithLabel: true,
                },
                type: 'category',
                data: ['未设置', '美团', '第一妇幼', '儿童摄影', '抖音'],
              },
            ],
            yAxis: [
              {
                axisLabel: {
                  show: true, // 不显示坐标轴上的文字
                },
                axisLine: {
                  show: false, // 不显示坐标轴线
                },
                type: 'value',
                splitLine: {
                  show: true,
                },
              },
            ],
            series: [
              {
                name: '数量',
                type: 'bar',
                barWidth: '17',
                itemStyle: {
                  color: '#00b0f0',
                },
                label: {
                  // 柱图头部显示值
                  show: true,
                  position: 'top',
                  color: '#333',
                  fontSize: '12px',
                  formatter: (params) => {
                    return params.value[params.encode.x[0]]
                  },
                },
                data: [
                  {
                    value: 1002,
                  },
                  {
                    value: 2220,
                  },
                  {
                    value: 4020,
                  },
                  {
                    value: 160,
                  },
                  {
                    value: 2220,
                  },
                ],
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
  .GuestAnalysis {
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
