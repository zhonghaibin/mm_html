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
                <span style="font-weight: bold">总业绩:</span>
                在统计时间内该咨询顾问的总业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">总卡耗:</span>
                在统计时间内该咨询顾问的总卡耗。
              </p>
              <p class="text">
                <span style="font-weight: bold">接待新客数:</span>
                在统计时间内,该顾问所接待并产生消费的新客人数
              </p>
              <p class="text">
                <span style="font-weight: bold">接待总客数:</span>
                在统计时间内,该顾问所接待并产生消费的人数(不包含散客)。
              </p>
              <p class="text">
                <span style="font-weight: bold">接待总客次:</span>
                在统计时间内,该顾问所接待并产生消费的人次。
              </p>
              <p class="text">
                <span style="font-weight: bold">预约成单人数:</span>
                在统计时间内,该顾问所接待的预约单转化为订单的预约人数
              </p>
              <p class="text">
                <span style="font-weight: bold">接待办卡客数:</span>
                在统计时间内接待的客户有产生办卡行为的顾客计为接待办卡客数
              </p>
            </div>
          </div>
        </Poptip>
        <div class="add-bt" @click="exportDataEvent">导出</div>
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
  export default {
    name: 'ConsultantPerformanceList',
    components: { SelectPosition, SelectStaffStatus, SelectShop },

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
          },
          {
            title: '总业绩',
            key: '1',
          },
          {
            title: '办套餐次卡/续次业绩',
            key: '2',
          },
          {
            title: '办储值卡/续充业绩',
            key: '3',
          },
          {
            title: '总耗卡',
            key: '4',
          },
          {
            title: '总卡扣',
            key: '5',
          },
          {
            title: '接待新客数',
            key: '6',
          },
          {
            title: '接待总客数',
            key: '7',
          },
          {
            title: '预约成单人数',
            key: '8',
          },
          {
            title: '接待办卡客数',
            key: '9',
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
        this.tableHeight = window.innerHeight - 296
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
      margin-top: 10px;

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
