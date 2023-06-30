<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">时间</span>
          <Select
            v-model="date"
            clearable
            filterable
            style="width: 80px"
            transfer
          >
            <div slot="empty">未找到数据</div>
            <Option
              v-for="item in dateList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
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
      <div class="right"></div>
    </div>
    <div class="row">
      <ChannelDataComparison />
    </div>
    <div class="row">
      <div class="box1">
        <ChannelNewGuestRatio />
      </div>
      <div class="box2">
        <div class="header">
          <div class="l">渠道数据报表</div>
          <div class="r">
            <Poptip placement="left-start" transfer trigger="hover">
              <div class="explain">?字段说明</div>
              <div slot="content">
                <div class="fields-remark">
                  <p class="text">
                    <span style="font-weight: bold">提示:</span>
                    当前模块的各类数据根据时间以及门店筛选计算展示。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">渠道名称:</span>
                    会员来源渠道名称,可在会员设置-会员来源渠道设置进行编辑或新增设置。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">总业绩:</span>
                    当前会员渠道的业绩总和。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">老客业绩:</span>
                    当前会员渠道的老客业绩。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">新客业绩:</span>
                    当前会员渠道的新客业绩。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">新客数量:</span>
                    当前会员渠道新客的数量。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">Top20%会员数:</span>
                    截止到筛选时间截点,门店所有渠道累计消费前20%的会员在当前会员渠道的人数。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">新客转卡率:</span>
                    当前会员渠道新增持卡会员/新客人数的占比。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">套餐次卡业绩:</span>
                    当前会员渠道客户使用现金类支付方式在门店购买套餐次卡、充卡以及卡换等产生的业绩。
                  </p>
                </div>
              </div>
            </Poptip>
            <div class="add-bt" @click="exportDataEvent">导出</div>
            <Toolbar
              :table-columns="tableColumns"
              :total-columns="totalColumns"
              @on-change="changeColumns"
            />
          </div>
        </div>
        <div class="list">
          <vxe-table
            ref="xTable"
            :column-config="{ resizable: true }"
            :data="tableData"
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
              :title="item.title"
            />
          </vxe-table>
          <div class="page">
            <Page
              :current="searchData.p"
              :page-size="searchData.page"
              show-elevator
              show-sizer
              size="small"
              :total="searchData.count"
              @on-change="currentPage"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChannelDataComparison from '@/components/statistics/channel-analysis/channel-data-comparison'
  import ChannelNewGuestRatio from '@/components/statistics/channel-analysis/channel-new-guest-ratio'
  import SelectShop from '@/components/form/select-shop'
  import Toolbar from '@/components/toolbar'

  export default {
    name: 'DataOverview',
    components: {
      Toolbar,
      SelectShop,
      ChannelDataComparison,
      ChannelNewGuestRatio,
    },

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
            title: '总业绩',
            key: '1',
            width: 120,
          },
          {
            title: '老客业绩',
            key: '2',
            width: 120,
          },
          {
            title: '新客业绩',
            key: '3',
            width: 120,
          },
          {
            title: '渠道到店总数',
            key: '4',
            width: 120,
          },
          {
            title: '新客数量',
            key: '5',
            width: 120,
          },
          {
            title: '老客数量',
            key: '6',
            width: 120,
          },
          {
            title: '新客转卡率',
            key: '7',
            width: 120,
          },
          {
            title: 'top20%会员数',
            key: '8',
            width: 120,
          },
        ],
        totalColumns: [
          {
            title: '总业绩',
            key: '1',
          },
          {
            title: '老客业绩',
            key: '2',
          },
          {
            title: '新客业绩',
            key: '3',
          },
          {
            title: '渠道到店总数',
            key: '4',
          },
          {
            title: '新客数量',
            key: '5',
          },
          {
            title: '老客数量',
            key: '6',
          },
          {
            title: '新客转卡率',
            key: '7',
          },
          {
            title: 'top20%会员数',
            key: '8',
          },
          {
            title: '储值卡业绩',
            key: '9',
          },
          {
            title: '优惠券业绩',
            key: '10',
          },
          {
            title: '项目业绩',
            key: '11',
          },
          {
            title: '商品业绩',
            key: '12',
          },
          {
            title: '爆品业绩',
            key: '13',
          },
        ],
        dateList: [
          {
            label: '今天',
            value: '1',
          },
          {
            label: '昨天',
            value: '2',
          },
          {
            label: '上周',
            value: '3',
          },
          {
            label: '上月',
            value: '4',
          },
        ],
        date: '',
        searchData: { sid: '', search: '', start: '', end: '' },
        columns: [
          {
            title: '渠道名称',
            key: 'time',
          },
          {
            title: '总业绩',
            key: 'suname',
          },
          {
            title: '老客业绩',
            key: 'name',
          },
          {
            title: '新客业绩',
            key: 'info',
          },
          {
            title: '渠道到店总数',
            key: 'info',
          },
          {
            title: '新客数量',
            key: 'info',
          },
          {
            title: '老客数量',
            key: 'info',
          },
          {
            title: '新客转卡率',
            key: 'info',
          },
          {
            title: 'top20会员数',
            key: 'info',
          },
          {
            title: '套餐次卡业绩',
            key: 'info',
          },
          {
            title: '优惠券业绩',
            key: 'info',
          },
        ],
        list: [
          {
            info: 1,
          },
        ],
      }
    },
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - (60 + 40 + 26 + 34 + 52) - 406
      },
      changeColumns(tableColumns) {
        this.tableColumns = tableColumns
      },
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
        this.search()
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
        this.search()
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {
        this.searchData.p = 1
        this.getList()
      },
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
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          margin-right: 20px;

          .text {
            font-weight: bold;
            margin: 0 5px;
          }
        }
      }

      .right {
        display: flex;

        .bt {
          border: 1px solid #c1c1c1;
          color: #000;
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1.5;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 5px 15px 6px;
          font-size: 12px;
          border-radius: 4px;
          transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear, box-shadow 0.2s linear;
        }
      }
    }

    .row {
      margin-top: 10px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;

      .box2 {
        border-radius: 8px;
        width: 73%;
        background: white;

        .header {
          padding: 10px;
          display: flex;
          align-items: center;
          .l {
            font-weight: bold;
            flex: 1;
          }

          .r {
            display: flex;
            align-items: center;
            .explain {
              border: 1px solid #e1e1e1;
              padding: 0 4px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              height: 30px;
              line-height: 30px;
            }

            .add-bt {
              color: white;
              cursor: pointer;
              background: #f19ec2;
              padding: 0 14px;
              height: 30px;
              line-height: 30px;
              border-radius: 4px;
              margin-left: 10px;
              font-size: 12px;
            }
          }
        }

        .list {
          .page {
            height: 40px;
            padding: 8px 0;
            text-align: center;
            background: white;
          }
        }
      }

      .box1 {
        margin-right: 20px;
        width: 25%;
      }
    }
  }
</style>
