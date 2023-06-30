<template>
  <div class="box">
    <div class="list">
      <table class="table">
        <thead>
          <tr>
            <th>订单内容</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>支付</th>
            <th>服务人员</th>
            <th>业绩/耗卡/手工</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="dot">划</span>
              骨盆修复
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              骨盆修复10次(1次),耗卡:
              <span class="color">¥198.00</span>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="4">
              支付合计统计:耗卡
              <span class="color">¥198.00</span>
            </td>

            <td>
              共计:
              <span class="color">¥198.00</span>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
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
    name: 'OrderList',
    components: {},

    data: function () {
      return {
        list: [
          {
            info: 1,
          },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
      }
    },
    activated() {},
    created() {},
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
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .dot {
      color: #6daa56;
      border: 1px solid #6daa56;
    }

    .list {
      .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        text-align: center;
        background: white;
      }

      .color {
        color: #c85481;
      }

      tr {
        color: black;

        th {
          padding: 10px 2px;
          font-size: 13px;
          background: #ffe1ef;
        }

        td {
          border: 1px solid #f3f3f3;
          padding: 10px 2px;
          font-size: 14px;
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
