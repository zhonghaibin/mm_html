<template>
  <div class="box">
    <div class="column">商品入库</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <PutStockDetailsList v-if="current(item, '入库明细')" />
        <PutStockList v-if="current(item, '入库单')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import PutStockDetailsList from '@/components/inventory/put-storage/put-stock-details-list'
  import PutStockList from '@/components/inventory/put-storage/put-stock-list'

  export default {
    name: 'OutStorage',
    components: { PutStockDetailsList, PutStockList },
    data: function () {
      return {
        tab_index: '入库明细',
        tab_list: [
          { name: '入库明细', id: 1 },
          { name: '入库单', id: 2 },
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
