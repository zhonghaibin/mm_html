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
            style="width: 200px"
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
        <div class="add-bt">导出</div>
      </div>
    </div>

    <div class="list">
      <div class="title">客单价</div>
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
    <div class="big-box">
      <div class="header">项目消耗客单价</div>
      <div class="content">
        <ProjectConsumptionCustomerUnitPrice />
      </div>
    </div>
    <div class="big-box">
      <div class="header">
        按门店-项目消耗客单价
        <DatePicker
          format="yyyy-MM-dd"
          placeholder="开始时间-结束时间"
          size="small"
          style="width: 200px"
          transfer
          type="datetimerange"
          value-format="yyyy-MM-dd"
          @on-change="changeDatePicker"
          @on-clear="clearDate"
          @on-open-change="changeDatePicker"
        />
      </div>
      <div class="content">
        <ProjectConsumptionCustomerUnitPrice />
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    />
  </div>
</template>

<script>
  import ProjectConsumptionCustomerUnitPrice from '@/components/statistics/business-data/business-analysis/customer-unit-price-analysis/project-consumption-customer-unit-price'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'CustomerUnitPriceAnalysis',
    components: {
      SelectShop,
      ProjectConsumptionCustomerUnitPrice,
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
            title: '日期',
            key: '0',
          },
          {
            title: '客流',
            key: '1',
          },
          {
            title: '营收',
            key: '2',
          },
          {
            title: '客单价',
            key: '3',
          },
          {
            title: '项目耗卡金额',
            key: '4',
          },
          {
            title: '项目售卖金额',
            key: '5',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
        },
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
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.modal.width = window.innerWidth - 200
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
          display: flex;
          align-items: center;
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
      .title {
        padding: 10px;
        background: white;
        font-size: 14px;
        font-weight: bold;
      }

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }

    .big-box {
      margin-top: 10px;
      background: white;

      .header {
        font-weight: bold;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
      }

      .content {
        height: 300px;
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
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
