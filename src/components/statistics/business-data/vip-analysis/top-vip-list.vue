<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
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
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">提示:</span>
                当前模块的各类数据根据时间以及门店筛选计算展示。
              </p>
              <p class="text">
                <span style="font-weight: bold">Top20%客户:</span>
                在统计时间内,门店所有累计消费前20%的客户。
              </p>
              <p class="text">
                <span style="font-weight: bold">Top20%下榜名单:</span>
                在统计时间内,环比上一个周期属于Top20%,而在这个周期跌出Top20%的客户。
              </p>
              <p class="text">
                <span style="font-weight: bold">生命周期:</span>
                该客户所属的生命周期。
              </p>
              <p class="text">
                <span style="font-weight: bold">到店次数:</span>
                该客户到店消费的次数。
              </p>
              <p class="text">
                <span style="font-weight: bold">当月到店次数:</span>
                时间筛选里的截止月份,客户到店的次数(有订单的天数)。总业绩:
                该客户在门店消费产生的业绩之和。
              </p>
              <p class="text">
                <span style="font-weight: bold">
                  项目/套餐次卡/商品/储值卡/优惠券/爆品业绩:
                </span>
                该客户在对应的项目/套餐次卡/商品/储值卡/优惠券/爆品消费产生的业绩之和。
              </p>
              <p class="text">
                <span style="font-weight: bold">总卡耗:</span>
                该客户在门店使用资产产生的消耗之和。
              </p>
              <p class="text">
                <span style="font-weight: bold">项目/产品卡耗:</span>
                该客户在门店使用资产消费项目/产品产生的消耗。
              </p>
              <p class="text">
                <span style="font-weight: bold">同比:</span>
                筛选月份后,与去年的该时间段内的对比。
              </p>
              <p class="text">
                <span style="font-weight: bold">环比:</span>
                筛选月份后,与上一个周期的对比
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
    name: 'TopVipList',
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
            title: '会员信息',
            key: '1',
            fixed: 'left',
            width: 120,
          },
          {
            title: '手机号',
            key: '1',
            width: 120,
          },
          {
            title: '生命周期',
            key: '2',
            width: 120,
          },
          {
            title: '到店次数',
            key: '3',
            width: 120,
          },
          {
            title: '当月到店次数',
            key: '4',
            width: 120,
          },
          {
            title: '总业绩',
            key: '5',
            width: 120,
          },
          {
            title: '项目业绩',
            key: '6',
            width: 120,
          },
          {
            title: '套餐次卡业绩',
            key: '7',
            width: 120,
          },
          {
            title: '商品业绩',
            key: '8',
            width: 120,
          },
          {
            title: '爆品业绩',
            key: '9',
            width: 120,
          },
          {
            title: '储值卡业绩',
            key: '10',
            width: 120,
          },
          {
            title: '优惠券业绩',
            key: '11',
            width: 120,
          },
          {
            title: '总耗卡',
            key: '12',
            width: 120,
          },
        ],
        totalColumns: [
          {
            title: '会员信息',
            key: '1',
            fixed: 'left',
          },
          {
            title: '手机号',
            key: '1',
          },
          {
            title: '生命周期',
            key: '2',
          },
          {
            title: '到店次数',
            key: '3',
          },
          {
            title: '当月到店次数',
            key: '4',
          },
          {
            title: '总业绩',
            key: '5',
          },
          {
            title: '项目业绩',
            key: '6',
          },
          {
            title: '套餐次卡业绩',
            key: '7',
          },
          {
            title: '商品业绩',
            key: '8',
          },
          {
            title: '爆品业绩',
            key: '9',
          },
          {
            title: '储值卡业绩',
            key: '10',
          },
          {
            title: '优惠券业绩',
            key: '11',
          },
          {
            title: '总耗卡',
            key: '12',
          },
          {
            title: '项目耗卡',
            key: '13',
          },
          {
            title: '商品耗卡',
            key: '14',
          },
          {
            title: '专属产康师',
            key: '15',
          },
          {
            title: '专属顾问',
            key: '16',
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
