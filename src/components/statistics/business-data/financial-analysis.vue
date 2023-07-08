<template>
  <div class="box bg">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <BalanceStatistics v-if="current(item, '欠款统计')" />
        <ValueCardStatistics v-if="current(item, '会员储值卡剩余')" />
        <PackageStatistics v-if="current(item, '会员套餐次卡剩余')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import BalanceStatistics from '@/components/statistics/business-data/financial-analysis/balance-statistics'
  import ValueCardStatistics from '@/components/statistics/business-data/financial-analysis/value-card-statistics'
  import PackageStatistics from '@/components/statistics/business-data/financial-analysis/package-statistics'

  export default {
    name: 'FinancialAnalysis',
    components: { ValueCardStatistics, BalanceStatistics, PackageStatistics },
    data: function () {
      return {
        tab_index: '欠款统计',
        tab_list: [
          { name: '欠款统计', id: 1 },
          { name: '会员储值卡剩余', id: 2 },
          { name: '会员套餐次卡剩余', id: 3 },
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
  .bg {
    background: #ffffffff;
  }
</style>
