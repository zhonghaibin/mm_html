<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <StaffPerformanceList v-if="current(item, '业绩与提成')" />
        <ProjectPerformanceList v-if="current(item, '项目绩效')" />
        <PackagePerformanceList v-if="current(item, '套餐次卡绩效')" />
        <ValueCardPerformanceList v-if="current(item, '储值卡绩效')" />
        <ConsultantPerformanceList v-if="current(item, '顾问绩效')" />
        <StaffTopList v-if="current(item, '排行榜')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import StaffPerformanceList from '@/components/statistics/staff-data/staff-performance/staff-performance-list'
  import ProjectPerformanceList from '@/components/statistics/staff-data/staff-performance/project-performance-list'
  import PackagePerformanceList from '@/components/statistics/staff-data/staff-performance/package-performance-list'
  import ValueCardPerformanceList from '@/components/statistics/staff-data/staff-performance/value-card-performance-list'
  import ConsultantPerformanceList from '@/components/statistics/staff-data/staff-performance/consultant-performance-list'
  import StaffTopList from '@/components/statistics/staff-data/staff-performance/staff-top-list'

  export default {
    name: 'StaffPerformance',
    components: {
      StaffPerformanceList,
      ProjectPerformanceList,
      PackagePerformanceList,
      ValueCardPerformanceList,
      ConsultantPerformanceList,
      StaffTopList,
    },
    data: function () {
      return {
        tab_index: '业绩与提成',
        tab_list: [
          { name: '业绩与提成', id: 1 },
          { name: '项目绩效', id: 2 },
          { name: '套餐次卡绩效', id: 3 },
          { name: '储值卡绩效', id: 4 },
          { name: '顾问绩效', id: 5 },
          { name: '排行榜', id: 6 },
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
  .box {
    background: white;
  }
</style>
