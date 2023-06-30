<template>
  <div class="box">
    <div class="column">员工数据</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <StaffDataList v-if="current(item, '员工数据分析')" />
        <StaffPerformance v-if="current(item, '员工业绩与提成')" />
        <Attendance v-if="current(item, '考勤统计')" />
        <Consume v-if="current(item, '满意度统计')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import StaffDataList from '@/components/statistics/staff-data/staff-data-list'
  import StaffPerformance from '@/components/statistics/staff-data/staff-performance'
  import Consume from '@/components/statistics/staff-data/consume'
  import Attendance from '@/components/statistics/staff-data/attendance'

  export default {
    name: 'StaffData',
    components: { StaffDataList, StaffPerformance, Consume, Attendance },
    data: function () {
      return {
        tab_index: '员工数据分析',
        tab_list: [
          { name: '员工数据分析', id: 1 },
          { name: '员工业绩与提成', id: 2 },
          { name: '考勤统计', id: 3 },
          { name: '满意度统计', id: 4 },
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
