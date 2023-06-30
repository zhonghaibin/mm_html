<template>
  <div class="box">
    <div class="column">订单管理</div>
    <div ref="tab" class="tab">
      <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <BusinessDetailsList v-if="current(item, '营业明细')" />
          <BalanceOrderList v-if="current(item, '欠款订单')" />
          <PendingOrderList v-if="current(item, '挂单待结')" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import BalanceOrderList from '@/components/cashier/order/balance-order-list'
  import PendingOrderList from '@/components/cashier/order/pending-order-list'
  import BusinessDetailsList from '@/components/business-track/business-details-list'

  export default {
    name: 'Index',
    components: {
      BalanceOrderList,
      PendingOrderList,
      BusinessDetailsList,
    },
    data: function () {
      return {
        tab_index: '营业明细',
        tab_list: [
          { name: '营业明细', id: 1 },
          { name: '欠款订单', id: 2 },
          { name: '挂单待结', id: 3 },
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
    mounted() {
      this.$nextTick(() => {
        this.tabHeight()
      })
    },
    activated() {
      let tab_index = this.$route.params.tab_index
      if (tab_index) {
        this.jump(tab_index)
      }
    },
    created() {
      let tab_index = this.$route.params.tab_index
      if (tab_index) {
        this.jump(tab_index)
      }
    },
    methods: {
      tabHeight() {
        let orgTreeHeight = window.innerHeight
        let divHeight = orgTreeHeight - 230
        this.$refs.tab.style.minHeight = divHeight + 'px'
        console.log(orgTreeHeight, divHeight)
      },
      handleTabClick(index) {
        this.tabHeight()
        this.tab_index = index
      },
      jump(string) {
        this.tab_index = string
      },
    },
  }
</script>
<style lang="less" scoped></style>
