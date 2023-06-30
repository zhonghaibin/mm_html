<template>
  <div class="box">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <ExperienceCardList v-if="current(item, '体验卡列表')" />
        <ReceiveList v-if="current(item, '领卡详情')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import ExperienceCardList from '@/components/market/fission-system/experience-card/experience-card-list'
  import ReceiveList from '@/components/market/fission-system/experience-card/receive-list'
  export default {
    name: 'ExperienceCard',
    components: { ReceiveList, ExperienceCardList },
    data: function () {
      return {
        tab_index: '体验卡列表',
        tab_list: [
          { name: '体验卡列表', id: 1 },
          { name: '领卡详情', id: 2 },
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
