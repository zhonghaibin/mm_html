<template>
  <div class="ChannelNewGuestRatio">
    <div class="header">
      <div class="l">渠道新客占比</div>
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
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components'
  import { PieChart } from 'echarts/charts'
  import { LabelLayout } from 'echarts/features'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
  ])

  export default {
    name: 'ChannelNewGuestRatio',
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
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: '未设置' },
                  { value: 735, name: '美团' },
                  { value: 580, name: '第一妇幼' },
                  { value: 484, name: '儿童摄影' },
                  { value: 300, name: '抖音' },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
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
  .ChannelNewGuestRatio {
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
