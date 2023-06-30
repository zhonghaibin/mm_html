<template>
  <div class="OperationList">
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
      <vxe-column title="操作" width="120">
        <template>
          <span class="bt">立即消费</span>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
  export default {
    name: 'OperationList',
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
            title: '操作时间',
            key: '0',
          },
          {
            title: '操作内容',
            key: '1',
          },
          {
            title: '操作人',
            key: '2',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .OperationList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
