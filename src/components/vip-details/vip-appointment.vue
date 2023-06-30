<template>
  <div class="VipAppointment">
    <div class="search">
      <div class="box">
        <span class="text">时间</span>
        <DatePicker
          format="yyyy-MM-dd"
          placeholder="开始时间-结束时间"
          style="width: 200px"
          transfer
          type="datetimerange"
          value-format="yyyy-MM-dd"
          @on-change="changeDatePicker"
          @on-clear="clearDate"
          @on-open-change="changeDatePicker"
        />
      </div>
      <div class="box">
        <Input
          v-model="searchData.search"
          clearable
          enter-button
          placeholder="可搜索服务人员/预约内容"
          search
          style="width: 250px"
          @on-clear="search"
          @on-search="search"
        />
      </div>
    </div>
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
    name: 'VipAppointment',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 400,
        tableData: [],
        tableColumns: [
          {
            title: '预约时间',
            key: 'make_time',
          },
          {
            title: '预约门店',
            key: 'shop_name',
          },
          {
            title: '预约产康师',
            key: 'staff',
          },
          {
            title: '预约内容',
            key: 'service',
          },
          {
            title: '项目第X次',
            key: 'service_num',
          },
          {
            title: '预约状态',
            key: 'status_name',
          },
        ],
        searchData: {
          vip_id: this.memberInfo.vip_id,
          search: '',
          start: '',
          end: '',
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
  .VipAppointment {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .box {
        margin-right: 20px;

        .text {
          font-weight: bold;
          margin: 0 5px;
        }
      }
    }

    .list {
      margin-top: 10px;

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }
  }
</style>
