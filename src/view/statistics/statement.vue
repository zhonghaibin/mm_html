<template>
  <div class="box">
    <div class="column">各类报表</div>
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
        <div class="box">
          <span style="color: #cb2f19">
            *时间筛选不可超过1年,点击对应表格即可下载
          </span>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="list">
      <div class="header">财务报表</div>
      <div class="content">
        <div v-for="(item, index) in list1" :key="index" class="cell color1">
          <div class="l">{{ item.name }}</div>
          <div class="r">
            <Icon :size="30" type="md-bookmarks" />
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="header">品项报表</div>
      <div class="content">
        <div v-for="(item, index) in list2" :key="index" class="cell color2">
          <div class="l">{{ item.name }}</div>
          <div class="r">
            <Icon :size="30" type="md-bookmarks" />
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="header">会员报表</div>
      <div class="content">
        <div v-for="(item, index) in list3" :key="index" class="cell color3">
          <div class="l">{{ item.name }}</div>
          <div class="r">
            <Icon :size="30" type="md-bookmarks" />
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="header">员工报表</div>
      <div class="content">
        <div v-for="(item, index) in list1" :key="index" class="cell color4">
          <div class="l">{{ item.name }}</div>
          <div class="r">
            <Icon :size="30" type="md-bookmarks" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  export default {
    name: 'Statement',
    components: { SelectShop },
    data: function () {
      return {
        list1: [
          {
            name: '财务对账表',
            path: '',
          },
          {
            name: '经营日报表',
            path: '',
          },
          {
            name: '门店流水表',
            path: '',
          },
          {
            name: '成交分析表',
            path: '',
          },
          {
            name: '跨店消费表',
            path: '',
          },
          {
            name: '订单明细表',
            path: '',
          },
          {
            name: '商品收入',
            path: '',
          },
          {
            name: '项目收入',
            path: '',
          },
          {
            name: '储值卡收入',
            path: '',
          },
          {
            name: '储值卡收入',
            path: '',
          },
          {
            name: '套餐次卡收入',
            path: '',
          },
          {
            name: '优惠券收入',
            path: '',
          },
          {
            name: '赠送统计',
            path: '',
          },
          {
            name: '渠道分析表',
            path: '',
          },
          {
            name: '订单明细表',
            path: '',
          },
          {
            name: '商品收入表',
            path: '',
          },
          {
            name: '项目收入表',
            path: '',
          },
        ],
        list2: [
          {
            name: '耗卡列表',
            path: '',
          },
          {
            name: '增品消耗表',
            path: '',
          },
          {
            name: '储值卡分析',
            path: '',
          },
          {
            name: '套餐次卡分析',
            path: '',
          },
        ],
        list3: [
          {
            name: '会员套餐次卡统计',
            path: '',
          },
          {
            name: '会员充值卡统计',
            path: '',
          },
          {
            name: '会员优惠券统计',
            path: '',
          },
          {
            name: '会员增品统计',
            path: '',
          },

          {
            name: '新会员统计',
            path: '',
          },
          {
            name: '会员到店统计',
            path: '',
          },
          {
            name: '会员总账户',
            path: '',
          },
          {
            name: '会员消费表',
            path: '',
          },
        ],
        list4: [
          {
            name: '会员消费表',
            path: '',
          },
        ],
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
      margin-top: 20px;
      background: white;
      border-radius: 8px;

      .header {
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
      }

      .content {
        display: flex;
        flex-flow: wrap;
        padding: 0 10px;

        .color1 {
          background: #cedbde;
        }

        .color2 {
          background: #cdd2e0;
        }

        .color3 {
          background: #daebff;
        }

        .color4 {
          background: #f2cccc;
        }

        .cell {
          width: 160px;
          font-size: 14px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          padding: 0 10px;
          margin-bottom: 24px;
          margin-right: 20px;
          cursor: pointer;

          .l {
            flex: 1;
          }

          .r {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 50px;
          }
        }
      }
    }
  }
</style>
