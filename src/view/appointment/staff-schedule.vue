<template>
  <div class="box">
    <div class="column">员工排班</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <ScheduleList v-if="current(item, '员工排班')" />
        <ScheduleSet v-if="current(item, '班次设置')" />
        <ScheduleListTemplate v-if="current(item, '排班模版')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import ScheduleList from '@/components/appointment/staff-schedule/schedule-list'
  import ScheduleSet from '@/components/appointment/staff-schedule/schedule-set'
  import ScheduleListTemplate from '@/components/appointment/staff-schedule/schedule-list-template'

  export default {
    name: 'StaffSchedule',
    components: { ScheduleList, ScheduleSet, ScheduleListTemplate },
    data: function () {
      return {
        tab_index: '员工排班',
        tab_list: [
          { name: '员工排班', id: 1 },
          { name: '班次设置', id: 2 },
          { name: '排班模版', id: 3 },
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
