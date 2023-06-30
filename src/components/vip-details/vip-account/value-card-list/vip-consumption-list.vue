<template>
  <div class="VipConsumptionList">
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
    name: 'VipConsumptionList',
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
            title: '消费时间',
            key: '0',
          },
          {
            title: '消费内容',
            key: '1',
          },
          {
            title: '服务人员',
            key: '2',
          },
          {
            title: '消费前余额',
            key: '3',
          },
          {
            title: '消费',
            key: '4',
          },
          {
            title: '余额',
            key: '5',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .VipConsumptionList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
