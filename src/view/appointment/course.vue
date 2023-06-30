<template>
  <div class="box">
    <div class="column">课程</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <CourseTable v-if="current(item, '课程预约')" />
        <CourseTableList v-if="current(item, '列表展示')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CourseTable from '@/components/appointment/course/course-table'
  import CourseTableList from '@/components/appointment/course/course-table-list'

  export default {
    name: 'Course',
    components: { CourseTable, CourseTableList },
    data: function () {
      return {
        tab_index: '课程预约',
        tab_list: [
          { name: '课程预约', id: 1 },
          { name: '列表展示', id: 2 },
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
