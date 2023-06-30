<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <YiYeList v-if="current(item, '资源型股东列表')" />
        <ReferralBonusList v-if="current(item, '推荐奖励详情')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import YiYeList from '@/components/market/fission-system/yi-ye/yi-ye-list'
  import ReferralBonusList from '@/components/market/fission-system/yi-ye/referral-bonus-list'
  export default {
    name: 'YiYe',
    components: { ReferralBonusList, YiYeList },
    data: function () {
      return {
        tab_index: '资源型股东列表',
        tab_list: [
          { name: '资源型股东列表', id: 1 },
          { name: '推荐奖励详情', id: 2 },
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
