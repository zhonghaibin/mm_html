<template>
  <div class="VipShareholderDividends">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in lab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <VipDividendsInfo
          v-if="current(item, '消费型股东信息')"
          :member-info="memberInfo"
        />
        <VipShareholderDetails
          v-if="current(item, '分红/积分记录')"
          :member-info="memberInfo"
        />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import VipDividendsInfo from '@/components/vip-details/vip-shareholder-dividends/vip-dividends-info'
  import VipShareholderDetails from '@/components/vip-details/vip-shareholder-dividends/vip-shareholder-details'

  export default {
    name: 'VipShareholderDividends',
    components: {
      VipDividendsInfo,
      VipShareholderDetails,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        tab_index: '消费型股东信息',
        lab_list: [
          {
            id: 1,
            name: '消费型股东信息',
          },
          {
            id: 2,
            name: '分红/积分记录',
          },
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
  .VipShareholderDividends {
  }
</style>
