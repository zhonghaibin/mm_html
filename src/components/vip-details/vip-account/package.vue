<template>
  <div class="Package">
    <div class="header">
      <div class="left">
        <div class="card">
          <div class="title">{{ cardInfo.cname }}</div>
          <div class="content">
            <div class="row">
              <div class="l">购买价格</div>
              <div class="r">{{ cardInfo.money }}</div>
            </div>
            <!--            <div class="row">-->
            <!--              <div class="l">推销人员</div>-->
            <!--              <div class="r">323456</div>-->
            <!--            </div>-->
            <div class="row">
              <div class="l">购买时间</div>
              <div class="r">{{ cardInfo.time }}</div>
            </div>
            <div class="row">
              <div class="l">启用时间</div>
              <div class="r">{{ cardInfo.start_time }}</div>
            </div>
            <div class="row">
              <div class="l">到期时间</div>
              <div class="r">{{ cardInfo.end_time }}</div>
            </div>
            <div class="row">
              <div class="l">套餐类型</div>
              <div class="r">{{ cardInfo.tname }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="bt">未锁卡</div>
        <div class="bt">续次</div>
        <div class="bt">换卡</div>
        <div class="bt">退次</div>
      </div>
    </div>
    <div class="tab">
      <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
        <TabPane
          v-for="item in lab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <VipCardList v-if="current(item, '次卡内容')" :card-vid="cardVid" />
          <VipConsumptionList
            v-if="current(item, '消费记录')"
            :card-vid="cardVid"
          />
          <VipChangeList v-if="current(item, '修改记录')" />
          <VipNodeList
            v-if="current(item, '备注信息')"
            :card-vid="cardVid"
            :member-info="memberInfo"
          />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import VipCardList from '@/components/vip-details/vip-account/package-list/vip-card-list'
  import VipConsumptionList from '@/components/vip-details/vip-account/package-list/vip-consumption-list'
  import VipChangeList from '@/components/vip-details/vip-account/package-list/vip-change-list'
  import VipNodeList from '@/components/vip-details/vip-account/package-list/vip-node-list'
  export default {
    name: 'Package',
    components: {
      VipCardList,
      VipConsumptionList,
      VipChangeList,
      VipNodeList,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
      cardVid: {
        type: Number,
        default: () => 0,
      },
    },
    data: function () {
      return {
        tab_index: '次卡内容',
        lab_list: [
          {
            id: 1,
            name: '次卡内容',
          },
          {
            id: 2,
            name: '消费记录',
          },
          {
            id: 3,
            name: '修改记录',
          },
          {
            id: 4,
            name: '备注信息',
          },
        ],
        cardInfo: [],
        searchData: {},
      }
    },
    computed: {
      current() {
        return (item, name) => {
          return name === item.name && this.tab_index === name
        }
      },
    },
    activated() {
      this.search()
    },
    created() {
      this.search()
    },
    methods: {
      search() {
        this.$set(this.searchData, 'card_vid', this.cardVid)
        this.getVipCardDetails()
      },
      async getVipCardDetails() {
        const { data } = []
        console.log(data)
        this.cardInfo = data
      },
      handleTabClick(index) {
        this.tab_index = index
      },
    },
  }
</script>

<style lang="less" scoped>
  .Package {
    .header {
      display: flex;
      margin-left: 10px;

      .left {
        .card {
          border: 1px solid #fceef4;
          width: 420px;
          background: #fceef4;
          border-radius: 10px;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
          margin: 4px 2px;

          .title {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            font-weight: bold;
            padding: 0 16px;
            border-bottom: 1px dashed #cc749a;
          }

          .content {
            display: flex;
            flex-flow: wrap;

            .row {
              display: flex;
              justify-content: flex-end;
              padding: 2px 20px;
              width: 50%;

              .l {
                flex: 1;
              }

              .r {
              }
            }
          }
        }
      }

      .right {
        display: flex;
        flex-flow: wrap;
        padding: 2px 30px;

        .bt {
          width: 40%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 10px 8px;
          background: #c75181;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
</style>
