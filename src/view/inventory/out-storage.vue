<template>
  <div class="box">
    <div class="column">商品出库</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <OutStockDetailsList v-if="current(item, '出库明细')" />
        <OutStockList v-if="current(item, '出库单')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import OutStockDetailsList from '@/components/inventory/out-storage/out-stock-details-list'
  import OutStockList from '@/components/inventory/out-storage/out-stock-list'

  export default {
    name: 'OutStorage',
    components: { OutStockDetailsList, OutStockList },
    data: function () {
      return {
        tab_index: '出库明细',
        tab_list: [
          { name: '出库明细', id: 1 },
          { name: '出库单', id: 2 },
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
