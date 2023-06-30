<template>
  <div class="box">
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <CourseTimeList v-if="current(item, '设置列表')" />
        <CourseTimeSet v-if="current(item, '时间设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CourseTimeSet from '@/components/appointment/course/course-time/course-time-set'
  import CourseTimeList from '@/components/appointment/course/course-time/course-time-list'

  export default {
    name: 'CourseTime',
    components: { CourseTimeSet, CourseTimeList },
    data: function () {
      return {
        tab_index: '设置列表',
        tab_list: [
          { name: '设置列表', id: 1 },
          { name: '时间设置', id: 2 },
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
