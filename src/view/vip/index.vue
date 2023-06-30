<template>
  <div class="box">
    <div class="column">会员管理</div>
    <div ref="tab" class="tab">
      <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <VipList v-if="current(item, '会员列表')" />
          <PrecisionFilter v-if="current(item, '精准筛选')" />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import VipList from '@/components/vip/vip-list'
  import PrecisionFilter from '@/components/vip/precision-filter'

  export default {
    name: 'Index',
    components: {
      VipList,
      PrecisionFilter,
    },
    data: function () {
      return {
        tab_index: '会员列表',
        tab_list: [
          { name: '会员列表', id: 1 },
          { name: '精准筛选', id: 2 },
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
