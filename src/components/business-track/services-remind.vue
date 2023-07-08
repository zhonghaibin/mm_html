<template>
  <div class="box bg">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <NotRemindServiceList v-if="current(item, '待提醒服务列表')" />
        <DueRemindServiceList v-if="current(item, '已到期服务列表')" />
        <VipServicePeriod v-if="current(item, '服务周期设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import VipServicePeriod from '@/components/business-track/services-remind/vip-service-period'
  import DueRemindServiceList from '@/components/business-track/services-remind/due-remind-service-list'
  import NotRemindServiceList from '@/components/business-track/services-remind/not-remind-service-list'

  export default {
    name: 'VipList2',
    components: {
      DueRemindServiceList,
      VipServicePeriod,
      NotRemindServiceList,
    },
    data: function () {
      return {
        tab_index: '待提醒服务列表',
        tab_list: [
          { name: '待提醒服务列表', id: 1 },
          { name: '已到期服务列表', id: 2 },
          { name: '服务周期设置', id: 3 },
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
  .bg {
    background: #ffffffff;
  }
</style>
