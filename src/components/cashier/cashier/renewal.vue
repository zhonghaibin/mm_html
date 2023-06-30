<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <VipCard v-if="current(item, '套餐次卡')" />
        <ValueCard v-if="current(item, '储值卡')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import VipCard from '@/components/cashier/cashier/renewal/vip-card'
  import ValueCard from '@/components/cashier/cashier/renewal/value-card'

  export default {
    name: 'Renewal',
    components: { ValueCard, VipCard },
    data: function () {
      return {
        tab_index: '套餐次卡',
        tab_list: [
          { name: '套餐次卡', id: 1 },
          { name: '储值卡', id: 2 },
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
