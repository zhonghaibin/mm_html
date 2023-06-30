<template>
  <div class="VipNodeList">
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
          <span class="bt">修改</span>
          <span class="bt">删除</span>
        </template>
      </vxe-column>
    </vxe-table>
    <div class="footer">
      <div class="add-node">
        <Icon :size="12" type="md-add" />
        新增备注信息
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipNodeList',
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
            title: '备注内容',
            key: '0',
          },
          {
            title: '操作时间',
            key: '1',
          },
          {
            title: '最后操作人',
            key: '2',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .VipNodeList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .footer {
      .add-node {
        margin-top: 4px;
        background: #f19ec2;
        color: white;
        text-align: center;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
</style>
