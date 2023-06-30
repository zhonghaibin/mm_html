<template>
  <div class="Supplier">
    <Tabs v-model="tab_index" size="small" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <ServiceList v-if="current(item, '项目类别设置')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import ServiceList from '@/components/setting/project/type/service-list'

  export default {
    name: 'Supplier',
    components: { ServiceList },
    data: function () {
      return {
        tab_index: '项目类别设置',
        tab_list: [
          { name: '项目类别设置', id: 1 },
          { name: '套餐次卡类别设置', id: 2 },
          { name: '商品类别设置', id: 3 },
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
  .Supplier {
    background: white;
  }
</style>
