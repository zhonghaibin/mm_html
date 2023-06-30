<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <VipReturnVisitList v-if="current(item, '回访记录')" />
        <VipNurseList v-if="current(item, '护理档案')" />
        <VipRemindList v-if="current(item, '提醒记录')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import VipReturnVisitList from '@/components/business-track/return-visit/vip-return-visit-list'
  import VipNurseList from '@/components/business-track/return-visit/vip-nurse-list'
  import VipRemindList from '@/components/business-track/return-visit/vip-remind-list'

  export default {
    name: 'ReturnVisit',
    components: { VipReturnVisitList, VipNurseList, VipRemindList },
    data: function () {
      return {
        tab_index: '回访记录',
        tab_list: [
          { name: '回访记录', id: 1 },
          { name: '护理档案', id: 2 },
          { name: '提醒记录', id: 3 },
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
