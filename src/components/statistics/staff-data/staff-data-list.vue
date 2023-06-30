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
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="搜索员工姓名"
            search
            style="width: 200px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">在职</span>
          <SelectStaffStatus v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">全部职位</span>
          <SelectPosition v-model="searchData.sid" @on-select="search" />
        </div>
      </div>
      <div class="right">
        <Checkbox class="checkbox-bt">包含跨店数据</Checkbox>
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">总业绩：</span>
                时间段内,该员工的总业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">项目业绩：</span>
                总业绩里项目的部分。
              </p>
              <p class="text">
                <span style="font-weight: bold">商品业绩：</span>
                总业绩里的商品业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">套餐次卡业绩：</span>
                总业绩里的套餐次卡业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">储值卡业绩：</span>
                总业绩里的储值卡业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">优惠券业绩：</span>
                总业绩里的优惠券业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">爆品业绩：</span>
                总业绩里,设置为爆品的品项的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">服务客人(客次)：</span>
                按照订单里的服务人员来统计,同一天同一个客人,只算1个,不同的两天同一个客人算2个。
              </p>
              <p class="text">
                <span style="font-weight: bold">服务散客(客次)：</span>
                服务客人数中散客的部分。
              </p>
              <p class="text">
                <span style="font-weight: bold">服务新会员(客次)：</span>
                服务客人数中,新客的部分。
              </p>
              <p class="text">
                <span style="font-weight: bold">服务老会员(客次)：</span>
                服务除新会员以外的生命周期。
              </p>
              <p class="text">
                <span style="font-weight: bold">新会员转卡率：</span>
                售卡人员是该员工的新会员人数/服务新会员人数*100%。
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
  import SelectStaffStatus from '@/components/form/select-staff-status'
  import SelectPosition from '@/components/form/select-position'
  import Toolbar from '@/components/toolbar'
  export default {
    name: 'StaffDataList',
    components: {
      Toolbar,
      SelectPosition,
      SelectStaffStatus,
      SelectShop,
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
            title: '员工姓名',
            key: '0',
            fixed: 'left',
            width: 120,
          },
          {
            title: '总业绩',
            key: '1',
            width: 120,
          },
          {
            title: '项目业绩',
            key: '2',
            width: 120,
          },
          {
            title: '商品业绩',
            key: '3',
            width: 120,
          },
          {
            title: '套餐次卡业绩',
            key: '4',
            width: 120,
          },
          {
            title: '储值卡业绩',
            key: '5',
            width: 120,
          },
          {
            title: '优惠券业绩',
            key: '6',
            width: 120,
          },
          {
            title: '爆品业绩',
            key: '7',
            width: 120,
          },
          {
            title: '耗卡',
            key: '8',
            width: 120,
          },
          {
            title: '赠品耗卡',
            key: '9',
            width: 120,
          },
          {
            title: '项目数',
            key: '10',
            width: 120,
          },
        ],
        totalColumns: [
          {
            title: '员工姓名',
            key: '0',
            fixed: 'left',
          },
          {
            title: '总业绩',
            key: '1',
          },
          {
            title: '项目业绩',
            key: '2',
          },
          {
            title: '商品业绩',
            key: '3',
          },
          {
            title: '套餐次卡业绩',
            key: '4',
          },
          {
            title: '储值卡业绩',
            key: '5',
          },
          {
            title: '优惠券业绩',
            key: '6',
          },
          {
            title: '爆品业绩',
            key: '7',
          },
          {
            title: '耗卡',
            key: '8',
          },
          {
            title: '赠品耗卡',
            key: '9',
          },
          {
            title: '项目数',
            key: '10',
          },
          {
            title: '服务客人(客次)',
            key: '11',
          },
          {
            title: '服务散客',
            key: '12',
          },
          {
            title: '服务新客(客次)',
            key: '13',
          },
          {
            title: '服务老客(客次)',
            key: '14',
          },
          {
            title: '服务新客数',
            key: '15',
          },
          {
            title: '服务老客数',
            key: '16',
          },
          {
            title: '新会员转卡率',
            key: '17',
          },
          {
            title: '客单价(按客次)',
            key: '18',
          },
          {
            title: '客单价(按客数)',
            key: '19',
          },
          {
            title: '总服务时间长',
            key: '20',
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
        this.tableHeight = window.innerHeight - 254
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
