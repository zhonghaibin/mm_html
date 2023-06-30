<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <ProjectAnalysis v-if="current(item, '项目分析')" />
        <GoodsAnalysis v-if="current(item, '商品分析')" />
        <CardAnalysis v-if="current(item, '卡分析')" />
        <HotProductAnalysis v-if="current(item, '爆品销售分析')" />
        <SalesRank v-if="current(item, '销售排行')" />
        <ProjectTransferCardAnalysis v-if="current(item, '项目转卡分析')" />
        <ProjectCardInto v-if="current(item, '指定品项转化')" />
        <ProjectService v-if="current(item, '项目服务')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import ProjectAnalysis from '@/components/statistics/business-data/project-card-analysis/project-analysis'
  import GoodsAnalysis from '@/components/statistics/business-data/project-card-analysis/goods-analysis'
  import CardAnalysis from '@/components/statistics/business-data/project-card-analysis/card-analysis'
  import HotProductAnalysis from '@/components/statistics/business-data/project-card-analysis/hot-product-analysis'
  import ProjectTransferCardAnalysis from '@/components/statistics/business-data/project-card-analysis/project-transfer-card-analysis'
  import ProjectService from '@/components/statistics/business-data/project-card-analysis/project-service'
  import SalesRank from '@/components/statistics/business-data/project-card-analysis/sales-rank'
  import ProjectCardInto from '@/components/statistics/business-data/project-card-analysis/project-card-into'

  export default {
    name: 'ProjectCardAnalysis',
    components: {
      ProjectCardInto,
      ProjectService,
      ProjectTransferCardAnalysis,
      HotProductAnalysis,
      CardAnalysis,
      GoodsAnalysis,
      ProjectAnalysis,
      SalesRank,
    },
    data: function () {
      return {
        tab_index: '项目分析',
        tab_list: [
          { name: '项目分析', id: 1 },
          { name: '商品分析', id: 2 },
          { name: '卡分析', id: 3 },
          { name: '爆品销售分析', id: 4 },
          { name: '销售排行', id: 5 },
          { name: '项目转卡分析', id: 6 },
          { name: '指定品项转化', id: 7 },
          { name: '项目服务', id: 8 },
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
