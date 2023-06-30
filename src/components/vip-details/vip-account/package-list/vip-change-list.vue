<template>
  <div class="VipChangeList">
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
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt">详情</span>
            <span class="bt">还款</span>
            <span class="bt">取消还款</span>
          </template>
        </vxe-column>
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
    name: 'VipChangeList',
    data: function () {
      return {
        loading: false,
        tableHeight: 500,
        tableData: [],
        tableColumns: [
          {
            title: '员工姓名',
            key: 'suname',
          },
          {
            title: '操作类型',
            key: 'act_name',
          },
          {
            title: '操作日志',
            key: 'info',
          },
          {
            title: '操作时间',
            key: 'addtime',
          },
        ],
        searchData: {
          vid: '', //会员id
          type: 2, //为1的时候是会员修改记录，2的时候套餐修改记录
          start: '', //记录区间的起始时间
          end: '', //记录区间的结束时间
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
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
        this.search()
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
        this.search()
      },
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
    .page {
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }
  }

  .bt {
    color: #1298e6;
    margin-right: 20px;
    cursor: pointer;
  }
</style>
