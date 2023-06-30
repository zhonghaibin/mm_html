<template>
  <div class="VipGoodsDeposit">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in lab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <VipDepositData
          v-if="current(item, '寄存数据')"
          :member-info="memberInfo"
        />
        <VipDepositDetails
          v-if="current(item, '寄存记录')"
          :member-info="memberInfo"
        />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import VipDepositData from '@/components/vip-details/vip-goods-deposit/vip-deposit-data'
  import VipDepositDetails from '@/components/vip-details/vip-goods-deposit/vip-deposit-details'

  export default {
    name: 'VipGoodsDeposit',
    components: {
      VipDepositData,
      VipDepositDetails,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        tab_index: '寄存数据',
        lab_list: [
          {
            id: 1,
            name: '寄存数据',
          },
          {
            id: 2,
            name: '寄存记录',
          },
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
  .VipGoodsDeposit {
  }
</style>
