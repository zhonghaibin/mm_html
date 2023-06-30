<template>
  <div class="ChannelDataComparison">
    <div class="header">
      <div class="l">渠道数据对比</div>
      <div class="r">
        <RadioGroup v-model="type" size="small" type="button">
          <Radio
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.label"
          />
        </RadioGroup>
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
    name: 'ChannelDataComparison',
    components: { VChart },

    data: function () {
      return {
        type: '1',
        typeList: [
          {
            label: '业绩',
            value: '1',
          },
          {
            label: '新客转卡率',
            value: '2',
          },
        ],
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
  .ChannelDataComparison {
    width: 100%;
    background: white;
    border-radius: 8px;

    .header {
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;

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
