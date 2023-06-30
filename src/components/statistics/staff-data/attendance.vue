<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <AttendanceList v-if="current(item, '考勤详情')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import AttendanceList from '@/components/statistics/staff-data/attendance/attendance-list'

  export default {
    name: 'Attendance',
    components: {
      AttendanceList,
    },
    data: function () {
      return {
        tab_index: '考勤详情',
        tab_list: [
          { name: '考勤详情', id: 1 },
          { name: '月考勤统计', id: 2 },
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
  }
</style>
