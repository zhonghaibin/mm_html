<template>
  <div class="GiveList">
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
    name: 'GiveList',
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
            title: '名称',
            key: '0',
          },
          {
            title: '类别',
            key: '1',
          },
          {
            title: '金额/次数',
            key: '2',
          },
          {
            title: '当前剩余',
            key: '3',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .GiveList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
