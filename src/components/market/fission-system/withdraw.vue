<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <WithdrawList v-if="current(item, '提现列表')" />
        <WithdrawRecord v-if="current(item, '提现记录')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import WithdrawList from '@/components/market/fission-system/withdraw/withdraw-list'
  import WithdrawRecord from '@/components/market/fission-system/withdraw/withdraw-record'
  export default {
    name: 'Withdraw',
    components: { WithdrawRecord, WithdrawList },
    data: function () {
      return {
        tab_index: '提现列表',
        tab_list: [
          { name: '提现列表', id: 1 },
          { name: '提现记录', id: 2 },
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
