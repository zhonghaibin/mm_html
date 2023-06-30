<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">选择时间段</span>
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
          <span class="text">对比时间段</span>
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
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">提示:</span>
                当前模块的各类数据根据时间以及门店务选计算展示。
              </p>
              <p class="text">
                <span style="font-weight: bold">总业绩:</span>
                现金类收入总和,现金类收入是指通过现金、微信、支付宝及POS等支付方式开单收银的订单成交额。
              </p>
              <p class="text">
                <span style="font-weight: bold">项目业绩:</span>
                客户使用现金类支付方式在门店消费项目产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">套餐次卡业绩:</span>
                客户使用现金类支付方式在门店开卡、续卡以及卡换卡产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">储值卡/优惠券业绩:</span>
                客户使用现金类支付方式在门店购买储值卡、优恋券、续卡产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">商品业绩:</span>
                客户使用现金类支付方式在门店消费商品产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">转介绍业绩:</span>
                来源深道为【老带新】的客人产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">营业收入:</span>
                门店实际收入总和,实际收入是指商品、项日、套餐及附加费的现金类业绩以及真实卡耗的总和。
              </p>
              <p class="text">
                <span style="font-weight: bold">总耗卡:</span>
                在统计时间内会员资产消耗总和,会员资产消耗包括储值卡、套餐次卡、赠品以及会员钱包等支付方式开单收银的订单成交额。
              </p>
              <p class="text">
                <span style="font-weight: bold">业绩卡耗比:</span>
                总业结/总耗卡的占比。
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
      <div class="page">
        <Page
          :current="searchData.p"
          :page-size="searchData.page"
          show-elevator
          show-sizer
          size="small"
          :total="searchData.count"
          transfer
          @on-change="currentPage"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import Toolbar from '@/components/toolbar'
  export default {
    name: 'SameStoreContrast',
    components: { Toolbar, SelectShop },

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
            width: 120,
            fixed: 'left',
          },
          {
            title: '总业绩',
            key: '1',
            width: 120,
          },
          {
            title: '营业收入',
            key: '2',
            width: 120,
          },
          {
            title: '总耗卡',
            key: '3',
            width: 120,
          },
          {
            title: '待收欠款总额',
            key: '4',
            width: 120,
          },
          {
            title: '储值卡总余额',
            key: '5',
            width: 120,
          },
          {
            title: '项目业绩',
            key: '6',
            width: 120,
          },
          {
            title: '商品业绩',
            key: '7',
            width: 120,
          },
          {
            title: '套餐次卡业绩',
            key: '8',
            width: 120,
          },
          {
            title: '储值卡业绩',
            key: '9',
            width: 120,
          },
          {
            title: '优惠券业绩',
            key: '10',
            width: 120,
          },
          {
            title: '老带新业绩',
            key: '11',
            width: 120,
          },
          {
            title: '到店客次',
            key: '12',
            width: 120,
          },
          {
            title: '新客到店人数',
            key: '13',
            width: 120,
          },
          {
            title: '老客到店人数',
            key: '14',
            width: 120,
          },
          {
            title: '新增持卡会员',
            key: '15',
            width: 120,
          },
          {
            title: '新客成交率',
            key: '16',
            width: 120,
          },
          {
            title: '老带新新客数',
            key: '17',
            width: 120,
          },
          {
            title: '新客占比',
            key: '18',
            width: 120,
          },
          {
            title: '老客占比',
            key: '19',
            width: 120,
          },
          {
            title: '新客业绩',
            key: '20',
            width: 120,
          },
          {
            title: '老客业绩',
            key: '21',
            width: 120,
          },
          {
            title: '散客业绩',
            key: '22',
            width: 120,
          },
          {
            title: '新客业绩占比',
            key: '23',
            width: 120,
          },
          {
            title: '老客业绩占比',
            key: '24',
            width: 120,
          },
          {
            title: '散客业绩占比',
            key: '25',
            width: 120,
          },
          {
            title: '客单价',
            key: '26',
            width: 120,
          },
          {
            title: '客单价(不含卡)',
            key: '27',
            width: 120,
          },
          {
            title: '客单价(新客)',
            key: '28',
            width: 120,
          },
          {
            title: '客单价(老客)',
            key: '29',
            width: 120,
          },
          {
            title: '客单价(老带新)',
            key: '30',
            width: 120,
          },
          {
            title: '本月目标',
            key: '31',
            width: 120,
          },
          {
            title: '目标完成率',
            key: '32',
            width: 120,
          },
          {
            title: '人效',
            key: '33',
            width: 120,
          },
          {
            title: '坪效',
            key: '34',
            width: 120,
          },
          {
            title: '待耗卡总额',
            key: '35',
            width: 120,
          },
        ],
        totalColumns: [
          {
            title: '门店',
            key: '0',
            fixed: 'left',
          },
          {
            title: '总业绩',
            key: '1',
          },
          {
            title: '营业收入',
            key: '2',
          },
          {
            title: '总耗卡',
            key: '3',
          },
          {
            title: '待收欠款总额',
            key: '4',
          },
          {
            title: '储值卡总余额',
            key: '5',
          },
          {
            title: '项目业绩',
            key: '6',
          },
          {
            title: '商品业绩',
            key: '7',
          },
          {
            title: '套餐次卡业绩',
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
            title: '老带新业绩',
            key: '11',
          },
          {
            title: '到店客次',
            key: '12',
          },
          {
            title: '新客到店人数',
            key: '13',
          },
          {
            title: '老客到店人数',
            key: '14',
          },
          {
            title: '新增持卡会员',
            key: '15',
          },
          {
            title: '新客成交率',
            key: '16',
          },
          {
            title: '老带新新客数',
            key: '17',
          },
          {
            title: '新客占比',
            key: '18',
          },
          {
            title: '老客占比',
            key: '19',
          },
          {
            title: '新客业绩',
            key: '20',
          },
          {
            title: '老客业绩',
            key: '21',
          },
          {
            title: '散客业绩',
            key: '22',
          },
          {
            title: '新客业绩占比',
            key: '23',
          },
          {
            title: '老客业绩占比',
            key: '24',
          },
          {
            title: '散客业绩占比',
            key: '25',
          },
          {
            title: '客单价',
            key: '26',
          },
          {
            title: '客单价(不含卡)',
            key: '27',
          },
          {
            title: '客单价(新客)',
            key: '28',
          },
          {
            title: '客单价(老客)',
            key: '29',
          },
          {
            title: '客单价(老带新)',
            key: '30',
          },
          {
            title: '本月目标',
            key: '31',
          },
          {
            title: '目标完成率',
            key: '32',
          },
          {
            title: '人效',
            key: '33',
          },
          {
            title: '坪效',
            key: '34',
          },
          {
            title: '待耗卡总额',
            key: '35',
          },
        ],
        searchData: {
          sid: '',
          search: '',
          start: '',
          end: '',
          p: 1,
          page: 10,
          count: 0,
        },
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
        this.tableHeight = window.innerHeight - 286
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
        align-items: center;

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

    .list {
      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .checkbox-bt {
      padding: 0;
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
