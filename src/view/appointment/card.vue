<template>
  <div class="box">
    <div class="column">项目预约</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <CardTable v-if="current(item, '项目预约')" />
        <CardTableList v-if="current(item, '列表展示')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CardTable from '@/components/appointment/card/card-table'
  import CardTableList from '@/components/appointment/card/card-table-list'

  export default {
    name: 'Course',
    components: { CardTable, CardTableList },
    data: function () {
      return {
        tab_index: '项目预约',
        tab_list: [
          { name: '项目预约', id: 1 },
          { name: '列表展示', id: 2 },
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
