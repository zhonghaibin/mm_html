<template>
  <div class="box">
    <div class="column">经营数据</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <DataOverview v-if="current(item, '数据总览')" />
        <BusinessAnalysis v-if="current(item, '经营分析')" />
        <ChannelAnalysis v-if="current(item, '渠道分析')" />
        <VipAnalysis v-if="current(item, '会员分析')" />
        <ItemCardAnalysis v-if="current(item, '品项/卡分析')" />
        <ContrastiveAnalysis v-if="current(item, '对比分析')" />
        <FinancialAnalysis v-if="current(item, '财务分析')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import FinancialAnalysis from '@/components/statistics/business-data/financial-analysis'
  import ContrastiveAnalysis from '@/components/statistics/business-data/contrastive-analysis'
  import ItemCardAnalysis from '@/components/statistics/business-data/project-card-analysis'
  import VipAnalysis from '@/components/statistics/business-data/vip-analysis'
  import BusinessAnalysis from '@/components/statistics/business-data/business-analysis'
  import DataOverview from '@/components/statistics/business-data/data-overview'
  import ChannelAnalysis from '@/components/statistics/business-data/channel-analysis'

  export default {
    name: 'BusinessData',
    components: {
      DataOverview,
      FinancialAnalysis,
      ContrastiveAnalysis,
      ItemCardAnalysis,
      VipAnalysis,
      BusinessAnalysis,
      ChannelAnalysis,
    },
    data: function () {
      return {
        tab_index: '数据总览',
        tab_list: [
          { name: '数据总览', id: 1 },
          { name: '经营分析', id: 2 },
          { name: '渠道分析', id: 3 },
          { name: '会员分析', id: 4 },
          { name: '品项/卡分析', id: 5 },
          { name: '对比分析', id: 6 },
          { name: '财务分析', id: 7 },
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
<style lang="less" scoped></style>
