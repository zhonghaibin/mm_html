<template>
  <div class="Achievements">
    <div class="header">
      <div class="l">业绩构成</div>
      <div class="r"></div>
    </div>
    <div class="content">
      <div class="l">
        <v-chart
          ref="chart"
          :auto-resize="true"
          class="e-chart"
          :option="chart.option"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="r">
        <div class="h">占比：</div>
        <div class="c-row">
          <div class="c-l">套餐次卡</div>
          <div class="c-r">50%</div>
        </div>
        <div class="c-row">
          <div class="c-l">商品</div>
          <div class="c-r">50%</div>
        </div>
        <div class="c-row">
          <div class="c-l">项目</div>
          <div class="c-r">50%</div>
        </div>
        <div class="c-row">
          <div class="c-l">储值卡</div>
          <div class="c-r">50%</div>
        </div>
        <div class="c-row">
          <div class="c-l">优惠券</div>
          <div class="c-r">50%</div>
        </div>
      </div>
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
    name: 'AchievementsAchievements',
    components: { VChart },

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
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true,
            },
            xAxis: [
              {
                axisLine: {
                  show: false, // 不显示坐标轴线
                },
                axisTick: {
                  //x轴刻度线
                  show: false,
                  alignWithLabel: true,
                },
                type: 'category',
                data: ['套餐次卡', '商品', '项目', '储值卡', '优惠券'],
              },
            ],
            yAxis: [
              {
                axisLabel: {
                  show: false, // 不显示坐标轴上的文字
                },
                axisLine: {
                  show: false, // 不显示坐标轴线
                },
                type: 'value',
                splitLine: {
                  show: false,
                },
              },
            ],
            series: [
              {
                name: '数量',
                type: 'bar',
                barWidth: '17',
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
                    value: 100,
                    itemStyle: {
                      color: '#e0efef',
                    },
                  },
                  {
                    value: 20,
                    itemStyle: {
                      color: '#efe9e0',
                    },
                  },
                  {
                    value: 400,
                    itemStyle: {
                      color: '#d7e0f4',
                    },
                  },
                  {
                    value: 60,
                    itemStyle: {
                      color: '#f1c5c5',
                    },
                  },
                  {
                    value: 220,
                    itemStyle: {
                      color: '#f19ec2',
                    },
                  },
                ],
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
  .Achievements {
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
      display: flex;

      .l {
        flex: 1;

        .e-chart {
          height: 240px;
        }
      }

      .r {
        padding: 0 10px;
        width: 150px;
        font-size: 14px;

        .h {
        }

        .c-row {
          display: flex;
          padding: 4px 0;

          .c-l {
            width: 80px;
            padding: 2px;
          }

          .c-r {
            padding: 2px;
          }
        }
      }
    }
  }
</style>
