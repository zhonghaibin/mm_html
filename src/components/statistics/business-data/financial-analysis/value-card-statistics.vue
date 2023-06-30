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
      <div class="right"></div>
    </div>
    <div class="baseInfo">
      <div class="box color2">
        <div class="header"><span class="text">会员余额</span></div>
        <div class="content">
          <div class="cell">￥2342342.22 万元</div>
        </div>
      </div>
      <div class="box color1">
        <div class="header"><span class="text">消耗率</span></div>
        <div class="content">
          <div class="cell">123%</div>
        </div>
      </div>
      <div class="box color4">
        <div class="header"><span class="text">进30天充值金额</span></div>
        <div class="content">
          <div class="cell">￥2342342.22 万元</div>
        </div>
      </div>
      <div class="box color3">
        <div class="header"><span class="text">进30天卡扣金额</span></div>
        <div class="content">
          <div class="cell">￥2342342.22万元</div>
        </div>
      </div>
    </div>
    <div class="big-box">
      <div class="header">各类储值卡余额</div>
      <div class="content">
        <ValueCard />
      </div>
    </div>
    <div class="big-box">
      <div class="header">剩余总金额分层统计各层所占人数</div>
      <div class="content">
        <BalanceLevel />
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
  import ValueCard from '@/components/statistics/business-data/financial-analysis/e-chart/value-card'
  import BalanceLevel from '@/components/statistics/business-data/financial-analysis/e-chart/balance-level'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'ValueCardStatistics',
    components: { SelectShop, ValueCard, BalanceLevel },

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
        list: [
          {
            info: 1,
          },
        ],
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

    .baseInfo {
      margin-top: 10px;
      background: white;
      padding: 10px 14px;
      display: flex;

      .box {
        flex: 1;
        margin-right: 24px;
        border-radius: 12px;
        padding: 14px;
        cursor: pointer;
        text-align: center;

        .header {
          text-align: left;
          font-weight: bold;

          .text {
            padding: 18px 0 0 0;
            font-size: 12px;
          }
        }

        .content {
          justify-content: center;
          margin-top: 2px;
          display: flex;

          .cell {
            font-size: 22px;
            padding: 10px 0;
          }
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

    .color {
      background: #fdeff5;
    }

    .color1 {
      background: #e6e7fb;
    }

    .color2 {
      background: #e0efef;
    }

    .color3 {
      background: #fceae8;
    }

    .color4 {
      background: #efe9e0;
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
