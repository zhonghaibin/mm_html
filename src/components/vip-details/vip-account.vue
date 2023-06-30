<template>
  <div>
    <Tabs
      v-model="tab_index"
      name="child-name"
      size="small"
      @on-click="handleTabClick"
    >
      <TabPane
        v-for="item in lab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
        tab="child-name"
      >
        <PackageList
          v-if="current(item, '套餐次卡')"
          :member-info="memberInfo"
        />
        <ValueCardList v-if="current(item, '储值卡')" />
        <CouponList v-if="current(item, '优惠券')" />
        <GiftList v-if="current(item, '赠送')" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import PackageList from '@/components/vip-details/vip-account/package-list'
  import ValueCardList from '@/components/vip-details/vip-account/value-card-list'
  import CouponList from '@/components/vip-details/vip-account/coupon-list'
  import GiftList from '@/components/vip-details/vip-account/gift-list'

  export default {
    name: 'VipAccount',
    components: {
      PackageList,
      ValueCardList,
      CouponList,
      GiftList,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        tab_index: '套餐次卡',
        lab_list: [
          {
            id: '套餐次卡',
            name: '套餐次卡',
          },
          {
            id: 2,
            name: '储值卡',
          },
          {
            id: 3,
            name: '优惠券',
          },
          {
            id: 4,
            name: '赠送',
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

<style lang="less" scoped></style>
