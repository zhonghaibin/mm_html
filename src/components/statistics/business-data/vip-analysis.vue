<template>
  <div class="box bg">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <TopVipList v-if="current(item, 'top20%会员')" />
        <VipLifeCycleList v-if="current(item, '会员生命周期')" />
        <OpenCardTopUpList v-if="current(item, '开卡充值能力')" />
        <NoHandleCard v-if="current(item, '到店未办卡')" />
        <NewVipList v-if="current(item, '新会员与新办卡')" />
        <VipActiveRate v-if="current(item, '会员活跃率')" />
        <NewGuestList v-if="current(item, '新客')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import TopVipList from '@/components/statistics/business-data/vip-analysis/top-vip-list'
  import VipLifeCycleList from '@/components/statistics/business-data/vip-analysis/vip-life-cycle-list'
  import OpenCardTopUpList from '@/components/statistics/business-data/vip-analysis/open-card-top-up-list'
  import NoHandleCard from '@/components/statistics/business-data/vip-analysis/no-handle-card'
  import NewVipList from '@/components/statistics/business-data/vip-analysis/new-vip-list'
  import VipActiveRate from '@/components/statistics/business-data/vip-analysis/vip-active-rate'
  import NewGuestList from '@/components/statistics/business-data/vip-analysis/new-guest-list'

  export default {
    name: 'VipAnalysis',
    components: {
      NewGuestList,
      VipActiveRate,
      NewVipList,
      NoHandleCard,
      OpenCardTopUpList,
      TopVipList,
      VipLifeCycleList,
    },
    data: function () {
      return {
        tab_index: 'top20%会员',
        tab_list: [
          { name: 'top20%会员', id: 1 },
          { name: '会员生命周期', id: 2 },
          { name: '开卡充值能力', id: 3 },
          { name: '到店未办卡', id: 4 },
          { name: '新会员与新办卡', id: 5 },
          { name: '会员活跃率', id: 6 },
          { name: '新客', id: 7 },
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
