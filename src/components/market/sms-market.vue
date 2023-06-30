<template>
  <div class="box">
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <SendSms v-if="current(item, '发短信')" />
        <SmsSet v-if="current(item, '短信设置')" />
        <SmsTemplateList v-if="current(item, '短信模板管理')" />
        <SmsRecharge v-if="current(item, '余量与充值')" />
        <SmsGroupSendList v-if="current(item, '手动群发记录')" />
        <SmsSystemSendList v-if="current(item, '系统推送记录')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import SmsSet from '@/components/market/sms-market/sms-set'
  import SmsRecharge from '@/components/market/sms-market/sms-recharge'
  import SendSms from '@/components/market/sms-market/send-sms'
  import SmsSystemSendList from '@/components/market/sms-market/sms-system-send-list'
  import SmsGroupSendList from '@/components/market/sms-market/sms-group-send-list'
  import SmsTemplateList from '@/components/market/sms-market/sms-template-list'

  export default {
    name: 'SmsMarket',
    components: {
      SmsTemplateList,
      SendSms,
      SmsRecharge,
      SmsSet,
      SmsSystemSendList,
      SmsGroupSendList,
    },
    data: function () {
      return {
        tab_index: '发短信',
        tab_list: [
          { name: '发短信', id: 1 },
          { name: '短信设置', id: 2 },
          { name: '短信模板管理', id: 3 },
          { name: '余量与充值', id: 4 },
          { name: '手动群发记录', id: 5 },
          { name: '系统推送记录', id: 6 },
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
