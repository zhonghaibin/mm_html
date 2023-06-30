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
    <div class="page">
      <Page
        :current="searchData.p"
        :page-size="searchData.page"
        show-elevator
        size="small"
        :total="searchData.count"
        transfer
        @on-change="currentPage"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipConsumptionList',
    props: {
      cardVid: {
        type: Number,
        default: () => 0,
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 500,
        tableData: [],
        tableColumns: [
          {
            title: '耗卡门店',
            key: 'shop_name',
          },
          {
            title: '耗卡金额',
            key: 'hk_price',
          },
          {
            title: '消耗次数',
            key: 'number',
          },
          {
            title: '服务人员',
            key: 'staff_name',
          },
          {
            title: '服务时间',
            key: 'time',
            width: '150px',
          },
        ],
        searchData: {
          card_vid: this.cardVid,
          p: 1,
          page: 5,
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
  .bt {
    color: #1298e6;
    margin-right: 20px;
    cursor: pointer;
  }

  .page {
    clear: both;
    height: 40px;
    padding: 8px 0;
    text-align: center;
    background: white;
  }
</style>
