<template>
  <div class="VipChangeRecord">
    <div class="search">
      <div class="left">
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
          <span class="text">操作人</span>
          <SelectStaff v-model="searchData.suid" />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="可搜索关键词"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="exportDataEvent">导出</div>
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
  import SelectStaff from '@/components/form/select-staff'

  export default {
    name: 'VipChangeRecord',
    components: { SelectStaff },
    data: function () {
      return {
        loading: false,
        tableHeight: 400,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '操作时间',
            key: 'addtime',
          },
          {
            title: '操作门店',
            key: 'shop_name',
          },
          {
            title: '操作人',
            key: 'suname',
          },
          {
            title: '操作事件',
            key: 'info',
          },
        ],
        searchData: {
          search: '',
          suid: '',
          vid: '', //会员id
          type: 1, //为1的时候是会员修改记录，2的时候套餐修改记录
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
      exportDataEvent() {
        setTimeout(() => {
          const list = []
          this.$refs.xTable.exportData({
            filename: '',
            type: 'csv',
            isHeader: true,
            isFooter: true,
            data: list,
          })
        }, 100)
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipChangeRecord {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          margin-right: 20px;

          .text {
            font-weight: bold;
            margin: 0 5px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .add-bt {
          color: white;
          cursor: pointer;
          background: #f19ec2;
          padding: 0 14px;
          height: 32px;
          line-height: 32px;
          border-radius: 4px;
          margin-left: 10px;
          font-size: 12px;
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

    .page {
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
