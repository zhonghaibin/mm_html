<template>
  <div class="SendSmsPhone">
    <div class="list">
      <vxe-table
        ref="xTable"
        :column-config="{ resizable: true }"
        :data="tableData"
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
      <div class="page">
        <Page
          :current="searchData.p"
          :page-size="searchData.page"
          show-elevator
          show-sizer
          size="small"
          :total="searchData.count"
          @on-change="currentPage"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SendSmsPhone',
    components: {},
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '13800000000',
          },
        ],
        tableColumns: [
          {
            title: '手机号码',
            key: '0',
          },
        ],
        searchData: { sid: '', end: '', start: '' },
      }
    },
    methods: {
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {},
    },
  }
</script>

<style lang="less" scoped>
  .SendSmsPhone {
    background: white;
    .list {
      .table {
        border-spacing: 0;
        width: 100%;
        text-align: left;
        background: white;
      }

      tr {
        color: black;
        height: 40px;

        th {
          background: #ffe1ef;
          text-indent: 1em;
        }

        td {
          text-indent: 1em;
          border-bottom: 1px solid #eeeeee;
        }

        .text {
          color: #1298e6;
          cursor: pointer;
        }
      }

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }
  }
</style>
