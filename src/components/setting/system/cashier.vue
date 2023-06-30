<template>
  <div class="Cashier">
    <Tabs
      v-model="tab_index"
      class="tab"
      size="small"
      @on-click="handleTabClick"
    >
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <CashierSet v-if="current(item, '收银设置')" />
        <Print v-if="current(item, '小票打印设置')" />
        <PrintSet v-if="current(item, '打印机设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CashierSet from '@/components/setting/system/cashier/cashier-set'
  import Print from '@/components/setting/system/cashier/print'
  import PrintSet from '@/components/setting/system/cashier/print-set'

  export default {
    name: 'Cashier',
    components: { CashierSet, Print, PrintSet },
    data: function () {
      return {
        tab_index: '收银设置',
        tab_list: [
          { name: '收银设置', id: 1 },
          { name: '小票打印设置', id: 2 },
          { name: '打印机设置', id: 3 },
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
  .Cashier {
    background: white;
  }
</style>
