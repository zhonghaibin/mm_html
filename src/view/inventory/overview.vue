<template>
  <div class="box">
    <div class="column">
      <div class="l">商品总览</div>
      <div class="r">
        <Poptip placement="left-start" transfer trigger="hover">
          <span class="explain explain-bg">?字段说明</span>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">待处理事项：</span>
                做处只是示未处理事项,如南看更多调版单,请到调线管理模块。
              </p>
              <p class="text">
                <span style="font-weight: bold">库存预警：</span>
                默认只展示库存预警数值小于5的商品。如需查看更多库存,请至库存管理模块查看。
              </p>
              <p class="text">
                <span style="font-weight: bold">商品保质期预警：</span>
                根据商品的生产日期和保质期月份计算出商品到期时间,在即将到期的节点进行提醒通知。
              </p>
              <p class="text">
                <span style="font-weight: bold">库存下限：</span>
                商品的最低库存值,门店可自行设置不同商品的库存下限,用于库存预警。
              </p>
              <p class="text">
                <span style="font-weight: bold">预警值：</span>
                预警值=库存数量-库存下限。数值越小,表明该商品供货越紧张。
              </p>
              <p class="text">
                <span style="font-weight: bold">最新库存动态：</span>
                只显示7日内的出入库信息。如需查看更多,请至库存管理模块查看。
              </p>
              <p class="text">
                <span style="font-weight: bold">商品销量TOP：</span>
                默认当前月,需查看其它时间,可自行筛选。如需查看更多商品数据,可至数据统计模块查看。
              </p>
            </div>
          </div>
        </Poptip>
      </div>
    </div>
    <div class="header">
      <div class="top">
        待处理事项
        <span class="color">（共15条）</span>
      </div>
      <div class="bottom">
        <div class="bt">
          待确认收货
          <span class="color">（4）</span>
        </div>
        <div class="bt">
          调拨申请处理
          <span class="color">（4）</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
          <TabPane
            v-for="item in tab_list"
            :key="item.id"
            :label="item.name"
            :name="item.name"
          >
            <InventoryWarningList v-if="current(item, '预警库存')" />
            <ShelfLifeWarningList v-if="current(item, '商品保质期预警')" />
            <LatestInventoryList v-if="current(item, '最新库存状态')" />
          </TabPane>
        </Tabs>
      </div>
      <div class="right"><GoodsTop /></div>
    </div>
  </div>
</template>
<script>
  import InventoryWarningList from '@/components/inventory/overview/inventory-warning-list'
  import ShelfLifeWarningList from '@/components/inventory/overview/shelf-life-warning-list'
  import LatestInventoryList from '@/components/inventory/overview/latest-inventory-list'
  import GoodsTop from '@/components/inventory/overview/goods-top'

  export default {
    name: 'Overview',
    components: {
      GoodsTop,
      InventoryWarningList,
      ShelfLifeWarningList,
      LatestInventoryList,
    },
    data: function () {
      return {
        tab_index: '预警库存',
        tab_list: [
          { name: '预警库存', id: 1 },
          { name: '商品保质期预警', id: 2 },
          { name: '最新库存状态', id: 3 },
        ],
      }
    },
    computed: {
      current() {
        return (item, name) => {
          return name === item.name && this.tab_index === name
        }
      },
    },
    methods: {
      handleTabClick(index) {
        this.tab_index = index
      },
    },
  }
</script>
<style lang="less" scoped>
  .column {
    display: flex;
    align-items: center;
    .l {
      flex: 1;
      font-weight: bold;
      font-size: 14px;
      height: 100%;
    }
    .r {
      font-weight: normal;
      font-size: 12px;
    }
  }
  .header {
    margin: 0 0 12px 0;
    padding: 8px 12px;
    background: white;
    border-radius: 8px;

    .color {
      color: #cf021c;
    }

    .top {
      padding: 0 0 12px 0;
      font-weight: bold;
      font-size: 14px;
    }

    .bottom {
      padding: 0 0 12px 0;
      display: flex;

      .bt {
        font-weight: bold;
        text-align: center;
        margin-right: 20px;
        cursor: pointer;
        border: 1px solid #d2d2d2;
        padding: 6px 8px;
        border-radius: 4px;
        margin-bottom: 1px;
        width: 160px;
      }
    }
  }
  .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    .left {
      width: 76%;
    }

    .right {
      padding-top: 30px;
      width: 24%;
      margin-left: 10px;
      float: right;
    }
  }

  .explain {
    width: 70px;
    border: 1px solid #e1e1e1;
    padding: 2px 4px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
  }
  .explain-bg {
    background: #ffffff;
  }
</style>
