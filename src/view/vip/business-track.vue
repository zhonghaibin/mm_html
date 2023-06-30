<template>
  <div class="box">
    <div ref="tab" class="tab">
      <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <TodayEvent v-if="current(item, '今日事项')" />
          <ShopRemindList v-if="current(item, '到店预警')" />
          <ImportantDateList v-if="current(item, '重要日期')" />
          <ReturnVisit v-if="current(item, '回访汇总')" />
          <ServicesRemind v-if="current(item, '服务提醒')" />
          <QuestionnaireSurvey v-if="current(item, '问卷汇总')" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import ServicesRemind from '@/components/business-track/services-remind'
  import ReturnVisit from '@/components/business-track/return-visit'
  import ImportantDateList from '@/components/business-track/important-date-list'
  import ShopRemindList from '@/components/business-track/shop-remind-list'
  import TodayEvent from '@/components/business-track/today-event'
  import QuestionnaireSurvey from '@/components/business-track/questionnaire-survey'

  export default {
    name: 'Index',
    components: {
      QuestionnaireSurvey,
      ServicesRemind,
      ReturnVisit,
      ImportantDateList,
      ShopRemindList,
      TodayEvent,
    },
    data: function () {
      return {
        tab_index: '今日事项',
        tab_list: [
          { name: '今日事项', id: 1 },
          { name: '到店预警', id: 2 },
          { name: '重要日期', id: 3 },
          { name: '回访汇总', id: 4 },
          { name: '服务提醒', id: 5 },
          { name: '问卷汇总', id: 6 },
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
    mounted() {
      this.$nextTick(() => {
        this.tabHeight()
      })
    },
    methods: {
      tabHeight() {
        let orgTreeHeight = window.innerHeight
        let divHeight = orgTreeHeight - 230
        this.$refs.tab.style.minHeight = divHeight + 'px'
        console.log(orgTreeHeight, divHeight)
      },
      handleTabClick(index) {
        this.tabHeight()
        this.tab_index = index
      },
    },
  }
</script>
<style lang="less" scoped></style>
