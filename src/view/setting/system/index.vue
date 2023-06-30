<template>
  <div class="box">
    <div class="column">系统设置</div>
    <div ref="tab" class="tab">
      <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <PayList v-if="current(item, '支付方式')" />
          <Appointment v-if="current(item, '预约设置')" />
          <Cashier v-if="current(item, '收银设置')" />
          <VipSet v-if="current(item, '会员设置')" />
          <SpendTypeList v-if="current(item, '支出类别设置')" />
          <TagList v-if="current(item, '标签管理')" />
          <CustomFieldList v-if="current(item, '自定义字段')" />
          <Attendance v-if="current(item, '考勤设置')" />
          <QuestionnaireSurveyList v-if="current(item, '问卷调查')" />
          <PushTemplateList v-if="current(item, '企业微信推送')" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import PayList from '@/components/setting/system/pay-list'
  import PushTemplateList from '@/components/setting/system/push-template-list'
  import CustomFieldList from '@/components/setting/system/custom-field-list'
  import TagList from '@/components/setting/system/tag-list'
  import SpendTypeList from '@/components/setting/system/spend-type-list'
  import Appointment from '@/components/setting/system/appointment'
  import Cashier from '@/components/setting/system/cashier'
  import VipSet from '@/components/setting/system/vip-set'
  import Attendance from '@/components/setting/system/attendance'
  import QuestionnaireSurveyList from '@/components/setting/system/questionnaire-survey-list'

  export default {
    name: 'Index',
    components: {
      PayList,
      TagList,
      CustomFieldList,
      PushTemplateList,
      SpendTypeList,
      Appointment,
      Cashier,
      VipSet,
      Attendance,
      QuestionnaireSurveyList,
    },
    data: function () {
      return {
        tab_index: '支付方式',
        tab_list: [
          { name: '支付方式', id: 1 },
          { name: '预约设置', id: 2 },
          { name: '收银设置', id: 3 },
          { name: '会员设置', id: 4 },
          { name: '支出类别设置', id: 5 },
          { name: '标签管理', id: 6 },
          { name: '自定义字段', id: 7 },
          { name: '考勤设置', id: 8 },
          { name: '问卷调查', id: 9 },
          { name: '企业微信推送', id: 10 },
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
    activated() {
      let tab_index = this.$route.params.tab_index
      if (tab_index) {
        this.jump(tab_index)
      }
    },
    created() {
      let tab_index = this.$route.params.tab_index
      if (tab_index) {
        this.jump(tab_index)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tabHeight()
      })
    },
    methods: {
      handleTabClick(index) {
        this.tabHeight()
        this.tab_index = index
      },
      tabHeight() {
        let orgTreeHeight = window.innerHeight
        let divHeight = orgTreeHeight - 210

        this.$refs.tab.style.minHeight = divHeight + 'px'
        console.log(orgTreeHeight, divHeight)
      },
      jump(string) {
        this.tab_index = string
      },
    },
  }
</script>
<style lang="less" scoped></style>
