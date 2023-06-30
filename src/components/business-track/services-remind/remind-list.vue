<template>
  <div class="RemindList">
    <div class="list">
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
      <div class="page">
        <Page
          :current="searchData.p"
          :page-size="searchData.page"
          show-elevator
          show-sizer
          size="small"
          :total="searchData.count"
          transfer
          @on-change="currentPage"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RemindList',
    props: {
      taskId: {
        type: [String, Number],
        default: () => '',
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '提醒时间',
            key: 'tasktime',
          },
          {
            title: '提醒方式',
            key: 'type_name',
          },
          {
            title: '提醒备注',
            key: 'content',
          },
          {
            title: '操作时间',
            key: 'addtime',
          },
          {
            title: '操作人员',
            key: 'suname',
          },
        ],
        searchData: {
          task_id: this.taskId,
          p: 1,
          page: 10,
          count: 0,
        },
      }
    },
    activated() {
      this.search()
    },
    created() {
      this.search()
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
      search() {
        this.searchData.p = 1
        this.getList()
      },
      async getList() {
        this.loading = true

        this.loading = false
        this.tableData = []
        this.searchData.count = Number(0)
        this.searchData.p = Number(1)
      },
    },
  }
</script>

<style lang="less" scoped>
  .list {
    margin-top: 10px;

    .page {
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }
  }
</style>
