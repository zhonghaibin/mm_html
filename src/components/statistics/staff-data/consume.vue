<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <EvaluationList v-if="current(item, '评价管理')" />
        <EvaluationStatisticsList v-if="current(item, '评价统计')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import EvaluationList from '@/components/statistics/staff-data/consume/evaluation-list'
  import EvaluationStatisticsList from '@/components/statistics/staff-data/consume/evaluation-statistics-list'

  export default {
    name: 'Consume',
    components: {
      EvaluationList,
      EvaluationStatisticsList,
    },
    data: function () {
      return {
        tab_index: '评价管理',
        tab_list: [
          { name: '评价管理', id: 1 },
          { name: '评价统计', id: 2 },
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
