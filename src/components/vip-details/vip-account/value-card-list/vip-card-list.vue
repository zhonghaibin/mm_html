<template>
  <div class="VipCardList">
    <vxe-table
      ref="xTable"
      :cell-style="{ textAlign: 'center' }"
      :column-config="{ resizable: true }"
      :data="tableData"
      header-align="center"
      :height="tableHeight"
      :loading="loading"
      :row-config="{ isHover: true }"
      size="small"
    >
      <vxe-column
        v-for="(item, index) in tableColumns"
        :key="index + item.key"
        :field="item.key"
        :fixed="item.fixed"
        :min-width="item.width"
        show-overflow="title"
        :title="item.title"
      />
    </vxe-table>
  </div>
</template>

<script>
  export default {
    name: 'VipCardList',
    data: function () {
      return {
        loading: false,
        tableHeight: 500,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '使用范围',
            key: '0',
          },
          {
            title: '指定门店',
            key: '1',
          },
          {
            title: '独立折扣',
            key: '2',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .VipCardList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
