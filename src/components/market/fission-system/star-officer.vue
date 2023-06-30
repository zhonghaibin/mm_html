<template>
  <div class="box">
    <Tabs
      v-model="tab_index"
      name="child"
      size="small"
      @on-click="handleTabClick"
    >
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
        tab="child"
      >
        <StarOfficerList v-if="current(item, '消费型股东列表')" />
        <ReferrerRewardList v-if="current(item, '推荐奖励详情')" />
        <StarOfficerChildList
          v-if="current(item, '消费型股东发展消费型股东记录')"
        />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import StarOfficerList from '@/components/market/fission-system/star-officer/star-officer-list'
  import ReferrerRewardList from '@/components/market/fission-system/star-officer/referrer-reward-list'
  import StarOfficerChildList from '@/components/market/fission-system/star-officer/star-officer-child-list'
  export default {
    name: 'StarOfficer',
    components: { StarOfficerChildList, StarOfficerList, ReferrerRewardList },
    data: function () {
      return {
        tab_index: '消费型股东列表',
        tab_list: [
          { name: '消费型股东列表', id: 1 },
          { name: '推荐奖励详情', id: 2 },
          { name: '消费型股东发展消费型股东记录', id: 3 },
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
