<template>
  <div class="box bg">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <PackageCard v-if="current(item, '套餐次卡')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import PackageCard from '@/components/cashier/cashier/buy/package-card'

  export default {
    name: 'Buy',
    components: { PackageCard },
    data: function () {
      return {
        tab_index: '套餐次卡',
        tab_list: [
          { name: '套餐次卡', id: 1 },
          { name: '储值卡', id: 2 },
          { name: '优惠券', id: 3 },
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
