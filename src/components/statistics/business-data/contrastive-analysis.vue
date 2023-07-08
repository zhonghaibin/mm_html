<template>
  <div class="box bg">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <SameStoreContrast v-if="current(item, '单店对比历史')" />
        <ManyStoreContrast v-if="current(item, '店与店对比')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import SameStoreContrast from '@/components/statistics/business-data/contrastive-analysis/same-store-contrast'
  import ManyStoreContrast from '@/components/statistics/business-data/contrastive-analysis/many-store-contrast'

  export default {
    name: 'ContrastiveAnalysis',
    components: { ManyStoreContrast, SameStoreContrast },
    data: function () {
      return {
        tab_index: '单店对比历史',
        tab_list: [
          { name: '单店对比历史', id: 1 },
          { name: '店与店对比', id: 2 },
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
