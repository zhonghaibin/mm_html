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
    <div class="big-box">
      <div class="header">每月新客趋势</div>
      <div class="content">
        <NewGuestTrend />
      </div>
    </div>
    <div class="big-box">
      <div class="header">爱消费的项目排行</div>
      <div class="content">
        <TopProjectList />
      </div>
    </div>
    <div class="big-box">
      <div class="header">
        按门店-新客转卡率
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
        <TurnCardRate />
      </div>
    </div>
    <div class="big-box">
      <div class="header">新客来源排行</div>
      <div class="content">
        <TopSourceList />
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
  import NewGuestTrend from '@/components/statistics/business-data/vip-analysis/new-guest-list/new-guest-trend'
  import TopProjectList from '@/components/statistics/business-data/vip-analysis/new-guest-list/top-project-list'
  import TurnCardRate from '@/components/statistics/business-data/vip-analysis/new-guest-list/turn-card-rate'
  import TopSourceList from '@/components/statistics/business-data/vip-analysis/new-guest-list/top-source-list'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'NewGuestList',
    components: {
      SelectShop,
      TopSourceList,
      TurnCardRate,
      TopProjectList,
      NewGuestTrend,
    },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
        },
        searchData: { sid: '', search: '', start: '', end: '' },
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
