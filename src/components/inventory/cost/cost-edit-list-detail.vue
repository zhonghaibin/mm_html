<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">仓库/门店：总部仓库</span>
        </div>
        <div class="box">
          <span class="text">成本调整单号： 212121</span>
        </div>
        <div class="box">
          <span class="text">调整时间：2022-02-22 19:21</span>
        </div>
        <div class="box">
          <span class="text">经办人：欧莱雅</span>
        </div>
        <div class="box">
          <span class="text">制单人：欧莱雅</span>
        </div>
      </div>
      <div class="right">
        <div class="add-bt">打印</div>
      </div>
    </div>

    <div class="list">
      <table>
        <thead>
          <tr>
            <td class="color">商品编号</td>
            <td class="color">商品名称</td>
            <td class="color">单位</td>
            <td class="color">当前库存</td>
            <td class="color">调整前成本价</td>
            <td class="color">调整后成本价</td>
            <td class="color">成本总额</td>
            <td class="color">备注</td>
            <td class="color">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>￥0</td>
            <td>￥0</td>
            <td>0</td>
            <td>￥0</td>
            <td>￥0</td>
            <td>0</td>
            <td>￥0</td>
            <td>
              <div class="bt">删除</div>
            </td>
          </tr>
          <tr>
            <td>合计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>￥0</td>
            <td>￥0</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CostEditListDetail',
    components: {},

    data: function () {
      return {
        list: [
          {
            info: 1,
          },
        ],
        searchData: { search: '', start: '', end: '' },
      }
    },
    activated() {},
    created() {},
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
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          display: flex;
          align-items: center;
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

        .bt {
          border: 1px solid #c1c1c1;
          color: #000;
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1.5;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 5px 15px 6px;
          font-size: 12px;
          border-radius: 4px;
          transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear, box-shadow 0.2s linear;
        }
      }
    }

    .color {
      background: #fdeff5;
    }

    .list {
      margin-top: 10px;
      border-top: 1px solid #eeeeee;
      padding: 16px;

      table {
        text-align: center;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        tr {
          td {
            height: 40px;
            border: 1px solid #f8f8f8;

            .text {
              color: #1298e6;
              cursor: pointer;
            }
          }
        }
      }

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
