<template>
  <div class="BusinessDetails">
    <div class="header">
      <div class="profile">
        <Avatar
          class="img"
          src="https://cdn.learnku.com//uploads/communities/WtC3cPLHzMbKRSZnagU9.png!/both/44x44"
        />
      </div>
      <div class="content">
        <div class="left">
          <div class="cell">张三:15307523643</div>
          <div class="cell">消费门店:分店1</div>
        </div>
        <div class="right">会员详情></div>
      </div>
    </div>
    <div class="user-info">
      <div class="cell">
        <div class="row">
          <div class="l">所属门店：</div>
          <div class="r">分店1</div>
        </div>
        <div class="row">
          <div class="l">收银人员：</div>
          <div class="r">李四</div>
        </div>
        <div class="row">
          <div class="l">订单备注：</div>
          <div class="r">无 编辑</div>
        </div>
        <div class="row">
          <div class="l">专属顾问：</div>
          <div class="r">赵四</div>
        </div>
      </div>
      <div class="cell">
        <div class="row">
          <div class="l">开单时间：</div>
          <div class="r">2022-02-12 12:12:12</div>
        </div>
        <div class="row">
          <div class="l">收银时间：</div>
          <div class="r">2022-02-12 12:12:12</div>
        </div>
        <div class="row">
          <div class="l">到店人数：</div>
          <div class="r">1</div>
        </div>
        <div class="row">
          <div class="l"></div>
          <div class="r"></div>
        </div>
      </div>
      <div class="cell"></div>
    </div>
    <div class="tab">
      <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <OrderList v-if="current(item, '订单内容')" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import OrderList from '@/components/business-track/business-details-list/order-list'

  export default {
    name: 'BusinessDetails',
    components: { OrderList },
    data: function () {
      return {
        tab_index: '订单内容',
        tab_list: [
          { name: '订单内容', id: 1 },
          { name: '上传附件', id: 2 },
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
  .BusinessDetails {
    .header {
      display: flex;
      border: 1px solid #eeeeee;
      padding: 10px;

      .profile {
        .img {
          height: 60px;
          width: 60px;
        }
      }

      .content {
        flex: 1;
        display: flex;
        font-size: 14px;

        .left {
          display: flex;
          align-items: center;
          flex: 1;

          .cell {
            padding: 10px;
          }
        }

        .right {
          display: flex;
          padding: 10px;
          align-items: center;
          color: #ca2465;
          cursor: pointer;
        }
      }
    }

    .user-info {
      margin-top: 10px;
      display: flex;
      border: 1px solid #eeeeee;
      padding: 10px;

      .cell {
        flex: 1;

        .row {
          font-size: 14px;
          padding: 4px;
          display: flex;

          .l {
          }

          .r {
          }
        }
      }
    }
    .add-bt {
      margin-bottom: 10px;
      text-align: center;
      width: 120px;
      color: white;
      margin-right: 20px;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
    }
  }
</style>
