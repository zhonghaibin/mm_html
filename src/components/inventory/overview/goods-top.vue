<template>
  <div class="goodsTop">
    <div class="title">
      <div class="cell">
        <Icon color="#f19ec2" :size="24" type="ios-trophy" />
        商品销量TOP
      </div>
      <div class="cell">
        <SelectShop v-model="searchData.sid" :width="160" @on-select="search" />
      </div>
    </div>
    <div class="date">
      <div class="date-time">
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

      <div class="add-bt" @click="exportDataEvent">导出</div>
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
  import SelectShop from '@/components/form/select-shop'
  export default {
    name: 'GoodsTop',
    components: { SelectShop },
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
            title: '排名',
            key: '0',
          },
          {
            title: '商品名称',
            key: '1',
          },
          {
            title: '销售额',
            key: '2',
          },
          {
            title: '销量',
            key: '3',
          },
        ],
        searchData: { sid: '', end: '', start: '' },
      }
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
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {},
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
  .goodsTop {
    background: white;

    .title {
      align-items: center;
      display: flex;
      padding: 12px;
      font-weight: bold;
      font-size: 14px;
      color: black;

      .cell {
        flex: 1;
        padding: 0 2px;
      }
    }

    .date {
      display: flex;
      text-align: left;
      padding-left: 8px;
      padding-bottom: 8px;

      .date-time {
        flex: 1;
      }
    }

    .list {
      .table {
        border-spacing: 0;
        width: 100%;
        text-align: center;
        background: white;
      }

      tr {
        color: black;
        height: 40px;

        th {
          background: #ffe1ef;
        }

        td {
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

    .add-bt {
      margin-right: 10px;
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
