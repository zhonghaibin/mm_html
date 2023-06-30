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
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="搜索卡名称/大类/小类"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="row">
      <div class="card">
        <div class="header">
          <div class="l">关键数据指标</div>
          <div class="r">
            <Poptip placement="left-start" transfer trigger="hover">
              <div class="explain">?字段说明</div>
              <div slot="content">
                <div class="fields-remark">
                  <p class="text">
                    <span style="font-weight: bold">总业绩(实收金额)：</span>
                    在统计时间内现金类收入总和,现金类收入是指通过现金、微信、支付宝等自定义支付方式开单收银的订单成交额;在统计时间内如有订单退款,不计算统计。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">总耗卡：</span>
                    在统计时间内会员资产消耗总和,会员资产包括次卡、赠品等支付方式开单收银的订单成交额;在统计时间内如有订单退款,不计算统计。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">到店消费人数：</span>
                    在统计时间内有订单消费的人数(仅办卡未消费品项不计入人数)散客订单按订单数统计,同一客户去重按1统计。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">到店消费人次：</span>
                    在统计时间内有订单消费的人次(仅办卡未消费品项不计入人数)
                    ;如果同一个会员一天多次到店,按最大次数统计。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">人效：</span>
                    在统计时间内产生的业绩/门店员工数量。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">坪效：</span>
                    在统计时间内产生的业绩/门店面积。
                  </p>
                  <p class="text">
                    <span style="font-weight: bold">新增持卡会员：</span>
                    在统计时间内首次办卡的会员;同一客户重复办卡去重按1统计。
                  </p>
                </div>
              </div>
            </Poptip>
          </div>
        </div>
        <div class="content">
          <div class="c-cell">
            <div class="c-row">总业绩(实收金额)</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row">总耗卡</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row">到店消费人数</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row">到店消费人次</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="c-cell">
            <div class="c-row">人效</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color2">￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row">坪效</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row">新增持卡会员</div>
            <div class="c-row">
              <span class="text">￥324234</span>
            </div>
            <div class="c-row">
              环比:
              <span class="color1">-￥1,33423423</span>
            </div>
          </div>
          <div class="c-cell">
            <div class="c-row"></div>
            <div class="c-row">
              <span class="text"></span>
            </div>
            <div class="c-row">
              <span class="color1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="cell">
        <Achievements />
      </div>
      <div class="cell">
        <ChannelData />
      </div>
    </div>
    <div class="row">
      <MonthlyTarget />
    </div>
    <div class="row">
      <div class="cell">
        <NewVipList />
      </div>
      <div class="cell">
        <OldVipList />
      </div>
    </div>
    <div class="row">
      <div class="cell">
        <CompletionList />
      </div>
      <div class="cell">
        <HotSalesStatisticsList />
      </div>
    </div>
    <div class="row">
      <MonthlyTrafficList />
    </div>
  </div>
</template>

<script>
  import Achievements from '@/components/statistics/business-data/data-overview/achievements'
  import ChannelData from '@/components/statistics/business-data/data-overview/channel-data'
  import MonthlyTarget from '@/components/statistics/business-data/data-overview/monthly-target'
  import NewVipList from '@/components/statistics/business-data/data-overview/new-vip-list'
  import OldVipList from '@/components/statistics/business-data/data-overview/old-vip-list'
  import CompletionList from '@/components/statistics/business-data/data-overview/completion-list'
  import HotSalesStatisticsList from '@/components/statistics/business-data/data-overview/hot-sales-statistics-list'
  import MonthlyTrafficList from '@/components/statistics/business-data/data-overview/monthly-traffic-list'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'DataOverview',
    components: {
      SelectShop,
      MonthlyTrafficList,
      HotSalesStatisticsList,
      CompletionList,
      OldVipList,
      NewVipList,
      MonthlyTarget,
      ChannelData,
      Achievements,
    },

    data: function () {
      return {
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
      }
    },
    activated() {},
    created() {},
    methods: {
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

      .cell {
        border-radius: 8px;
        width: 49%;
        background: white;
      }

      .card {
        background: white;
        width: 100%;

        .color1 {
          color: green;
        }

        .color2 {
          color: red;
        }

        .text {
          font-weight: bold;
          font-size: 18px;
        }

        .header {
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
          border-bottom: 1px solid #eeeeee;
          display: flex;

          .c-cell {
            padding: 0 10px 10px 10px;
            border-right: 1px solid #f8f8f8;
            flex: 1;

            .c-row {
              padding: 4px;
            }
          }
        }
      }
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
  }
</style>
