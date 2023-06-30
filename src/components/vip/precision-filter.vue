<template>
  <div class="PrecisionFilter">
    <VipSearch />
    <div class="list-top">
      <div>
        <span class="black">筛选结果</span>
        <span class="grey">共找到0个会员</span>
      </div>
      <div class="bt-left">
        <Button class="add-bt" type="primary">批量群发</Button>
        <Button class="add-bt" type="primary">批量送积分</Button>
        <Button class="add-bt" type="primary">企微群发</Button>
      </div>
      <div class="bt-right">
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
  import VipSearch from '@/components/vip/precision-filter/vip-search'

  export default {
    name: 'PrecisionFilter',
    components: {
      VipSearch,
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '会员信息',
            key: '0',
          },
          {
            title: '会员账户',
            key: '1',
          },
          {
            title: '总消费',
            key: '2',
          },
          {
            title: '到店次数',
            key: '3',
          },
          {
            title: '上次消费',
            key: '4',
          },
          {
            title: '来源',
            key: '5',
          },
          {
            title: '生日',
            key: '6',
          },
          {
            title: '顾问',
            key: '7',
          },
          {
            title: '锁定状态',
            key: '8',
          },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
      }
    },
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {},
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
  .PrecisionFilter {
    background: white;
    padding: 10px;

    .list-top {
      margin-top: 14px;
      margin-bottom: 6px;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      display: flex;

      .black {
        color: black;
        font-weight: bold;
      }

      .grey {
        color: #d2cfcf;
        font-weight: bold;
        margin-left: 20px;
      }

      .bt-left {
        flex: 1;

        .bt {
          margin-left: 16px;
        }
      }

      .bt-right {
        .bt {
          margin-left: auto;
        }
      }
    }
    .list {
      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }
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
</style>
