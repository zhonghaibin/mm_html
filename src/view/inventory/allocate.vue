<template>
  <div class="box">
    <div class="column">调拨管理</div>
    <Tabs v-model="tab_index" type="card" @on-click="handleTabClick">
      <TabPane
        v-for="item in tab_list"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <PutStorageList v-if="current(item, '调拨入库')" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import PutStorageList from '@/components/inventory/allocate/put-storage-list'

  export default {
    name: 'Allocate',
    components: { PutStorageList },
    data: function () {
      return {
        tab_index: '调拨入库',
        tab_list: [
          { name: '调拨入库', id: 1 },
          { name: '调拨出库', id: 2 },
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
