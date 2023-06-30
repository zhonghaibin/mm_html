<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <div class="h-cel title">爆品销售数量统计</div>
      </div>
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                在统计时间内,爆品在系统中通过开单完成交易的数量。每个门店显示销量前十(在统计时间内,如有订单退款的,不计算统计)
              </p>
            </div>
          </div>
        </Poptip>
        <div class="add-bt" @click="exportDataEvent">导出</div>
      </div>
    </div>
    <div class="content">
      <vxe-table
        ref="xTable"
        :cell-style="{ textAlign: 'center' }"
        :column-config="{ resizable: true }"
        :data="tableData"
        header-align="center"
        :height="tableHeight"
        :loading="loading"
        :row-config="{ isHover: true }"
        size="small"
      >
        <vxe-column
          v-for="(item, index) in tableColumns"
          :key="index + item.key"
          :field="item.key"
          :fixed="item.fixed"
          :min-width="item.width"
          show-overflow="title"
          :title="item.title"
        />
      </vxe-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HotSalesStatisticsList',
    components: {},
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '门店',
            key: '0',
          },
          {
            title: '商品名',
            key: '1',
          },
          {
            title: '销量',
            key: '2',
          },
        ],
      }
    },
    methods: {
      exportDataEvent() {
        setTimeout(() => {
          const list = []
          this.$refs.xTable.exportData({
            filename: '',
            type: 'csv',
            isHeader: true,
            isFooter: true,
            data: list,
          })
        }, 100)
      },
    },
  }
</script>
<style lang="less" scoped>
  .box {
    border: 1px solid #eeeeee;
    border-radius: 6px;
    height: 300px;
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
      clear: both;
    }

    .explain {
      border: 1px solid #e1e1e1;
      padding: 0 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      height: 32px;
      line-height: 32px;
    }

    .add-bt {
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 0 14px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
</style>
