<template>
  <div class="box">
    <Tabs
      v-model="tab_index"
      name="parent"
      type="card"
      @on-click="handleTabClick"
    >
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
        tab="parent"
      >
        <StarOfficer v-if="current(item, '消费型股东管理')" />
        <YiYe v-if="current(item, '资源型股东管理')" />
        <RulesSet v-if="current(item, '规则设置')" />
        <ExperienceCard v-if="current(item, '体验卡设置')" />
        <Withdraw v-if="current(item, '提现记录')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import StarOfficer from '@/components/market/fission-system/star-officer'
  import YiYe from '@/components/market/fission-system/yi-ye'
  import ExperienceCard from '@/components/market/fission-system/experience-card'
  import RulesSet from '@/components/market/fission-system/rules-set'
  import Withdraw from '@/components/market/fission-system/withdraw'

  export default {
    name: 'FissionSystem',
    components: { Withdraw, RulesSet, ExperienceCard, YiYe, StarOfficer },
    data: function () {
      return {
        tab_index: '消费型股东管理',
        tab_list: [
          { name: '消费型股东管理', id: 1 },
          { name: '资源型股东管理', id: 2 },
          { name: '规则设置', id: 3 },
          { name: '体验卡设置', id: 4 },
          { name: '提现记录', id: 5 },
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
