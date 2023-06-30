<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <SetRules v-if="current(item, '规则设置')" />
        <GradeList v-if="current(item, '等级设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import SetRules from '@/components/market/fission-system/rules-set/set-rules'
  import GradeList from '@/components/market/fission-system/rules-set/grade-list'
  export default {
    name: 'RulesSet',
    components: { GradeList, SetRules },
    data: function () {
      return {
        tab_index: '规则设置',
        tab_list: [
          { name: '规则设置', id: 1 },
          { name: '等级设置', id: 2 },
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
