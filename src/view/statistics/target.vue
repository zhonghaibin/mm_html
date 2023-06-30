<template>
  <div class="box">
    <div class="column">目标管理</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <StoreTargetList v-if="current(item, '门店业绩目标')" />
        <StaffTargetList v-if="current(item, '员工业绩目标')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import StoreTargetList from '@/components/statistics/target/store-target-list'
  import StaffTargetList from '@/components/statistics/target/staff-target-list'

  export default {
    name: 'Target',
    components: { StoreTargetList, StaffTargetList },
    data: function () {
      return {
        tab_index: '门店业绩目标',
        tab_list: [
          { name: '门店业绩目标', id: 1 },
          { name: '门店耗卡目标', id: 2 },
          { name: '门店客流目标', id: 3 },
          { name: '门店客次目标', id: 4 },
          { name: '门店客数目标', id: 5 },
          { name: '员工业绩目标', id: 6 },
          { name: '员工耗卡目标', id: 7 },
          { name: '员工客流目标', id: 8 },
          { name: '员工客次目标', id: 9 },
          { name: '员工客数目标', id: 10 },
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
