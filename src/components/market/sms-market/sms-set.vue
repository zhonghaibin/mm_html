<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <CustomerRemindList v-if="current(item, '客户提醒')" />
        <MerchantRemindList v-if="current(item, '商家提醒')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CustomerRemindList from '@/components/market/sms-market/sms-set/customer-remind-list'
  import MerchantRemindList from '@/components/market/sms-market/sms-set/merchant-remind-list'
  export default {
    name: 'SmsSet',
    components: { MerchantRemindList, CustomerRemindList },
    data: function () {
      return {
        tab_index: '客户提醒',
        tab_list: [
          { name: '客户提醒', id: 1 },
          { name: '商家提醒', id: 2 },
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
