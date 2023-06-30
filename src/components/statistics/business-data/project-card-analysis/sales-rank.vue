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
        <div class="add-bt">导出</div>
      </div>
    </div>
    <div class="row">
      <div class="cell">
        <SalesRankList />
      </div>
      <div class="cell">
        <HkList title="耗卡排名" />
      </div>
      <div class="cell">
        <HkList title="未耗卡排名" />
      </div>
    </div>
    <div class="row">
      <div class="cell">
        <ProjectList />
      </div>
      <div class="cell">
        <GoodsList />
      </div>
      <div class="cell">
        <PackageCardList />
      </div>
    </div>
  </div>
</template>

<script>
  import SalesRankList from '@/components/statistics/business-data/project-card-analysis/sales-rank/sales-rank-list'
  import HkList from '@/components/statistics/business-data/project-card-analysis/sales-rank/hk-list'
  import ProjectList from '@/components/statistics/business-data/project-card-analysis/sales-rank/project-list'
  import GoodsList from '@/components/statistics/business-data/project-card-analysis/sales-rank/goods-list'
  import PackageCardList from '@/components/statistics/business-data/project-card-analysis/sales-rank/package-card-list'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'SalesRank',
    components: {
      SelectShop,
      PackageCardList,
      GoodsList,
      ProjectList,
      HkList,
      SalesRankList,
    },

    data: function () {
      return {
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
      search() {},
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

    .row {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .cell {
        width: 33%;
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
