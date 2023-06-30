<template>
  <div class="box">
    <div class="column">品项设置</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <ProjectList v-if="current(item, '项目')" />
        <PackageList v-if="current(item, '套餐次卡')" />
        <GoodsList v-if="current(item, '商品')" />
        <ValueCardList v-if="current(item, '储值卡')" />
        <DiscountCardList v-if="current(item, '折扣卡')" />
        <CouponList v-if="current(item, '优惠券')" />
        <Type v-if="current(item, '类别设置')" />
        <Supplier v-if="current(item, '品牌/供应商/商品单位设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import ProjectList from '@/components/setting/project/project-list'
  import PackageList from '@/components/setting/project/package-list'
  import Supplier from '@/components/setting/project/supplier'
  import Type from '@/components/setting/project/type'
  import GoodsList from '@/components/setting/project/goods-list'
  import ValueCardList from '@/components/setting/project/value-card-list'
  import DiscountCardList from '@/components/setting/project/discount-card-list'
  import CouponList from '@/components/setting/project/coupon-list'

  export default {
    name: 'Index',
    components: {
      CouponList,
      DiscountCardList,
      ValueCardList,
      ProjectList,
      Supplier,
      Type,
      PackageList,
      GoodsList,
    },
    data: function () {
      return {
        tab_index: '项目',
        tab_list: [
          { name: '项目', id: 1 },
          { name: '套餐次卡', id: 2 },
          { name: '商品', id: 3 },
          { name: '储值卡', id: 4 },
          { name: '折扣卡', id: 5 },
          { name: '优惠券', id: 6 },
          { name: '类别设置', id: 7 },
          { name: '品牌/供应商/商品单位设置', id: 8 },
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
