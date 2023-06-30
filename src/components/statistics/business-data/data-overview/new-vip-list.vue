<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <div class="h-cel title">新客到店分析</div>
      </div>
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">新客：</span>
                系统默认以新建档且首次消费后30天内的客户。(系统的新客定义可通过会员设置-生命周期进行自定义)
              </p>
              <p class="text">
                <span style="font-weight: bold">新客人数：</span>
                在统计时间内,新客中首次办卡的人数。
              </p>
              <p class="text">
                <span style="font-weight: bold">新增新客持卡：</span>
                在统计时间内,新客中首次办卡的人数。
              </p>
              <p class="text">
                <span style="font-weight: bold">新客转化率：</span>
                在统计时间内,新增持卡/新卡人数的占比
              </p>
              <p class="text">
                <span style="font-weight: bold">开卡客单价：</span>
                在统计时间内,新客办卡及充值的订单金额总和/新增持卡人数。
              </p>
              <p class="text">
                <span style="font-weight: bold">新客业绩占比：</span>
                在统计时间内,新客的业绩总和/门店业绩总和的占比。
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
    name: 'NewVipList',
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
            title: '新客人数',
            key: '1',
          },
          {
            title: '新赠新客持卡',
            key: '2',
          },
          {
            title: '新客转卡率',
            key: '3',
          },
          {
            title: '开卡客单价',
            key: '4',
          },
          {
            title: '新客业绩占比',
            key: '5',
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
