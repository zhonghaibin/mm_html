<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">商品编号： 212121</span>
        </div>
        <div class="box">
          <span class="text">商品名称：茶树精油</span>
        </div>
        <div class="box">
          <span class="text">品牌：欧莱雅</span>
        </div>
        <div class="box">
          <span class="text">仓库/门店：总部仓库</span>
        </div>
        <div class="box">
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
          <div class="add-bt">查询</div>
        </div>
      </div>
      <div class="right"></div>
    </div>

    <div class="list">
      <table>
        <thead>
          <tr>
            <td class="color" rowspan="2">单号</td>
            <td class="color" rowspan="2">出/入库时间</td>
            <td class="color" rowspan="2">类型</td>
            <td class="color1" colspan="3">入库</td>
            <td class="color2" colspan="3">出库</td>
            <td class="color3" colspan="3">结余</td>
          </tr>
          <tr>
            <td class="color1">数量</td>
            <td class="color1">单个成本</td>
            <td class="color1">总成本</td>
            <td class="color2">数量</td>
            <td class="color2">单个成本</td>
            <td class="color2">总成本</td>
            <td class="color3">数量</td>
            <td class="color3">单个成本</td>
            <td class="color3">总成本</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">CK-202205090001</td>
            <td rowspan="2">2022-05-22 19:21</td>
            <td rowspan="2">出库-盘点</td>
            <td class="color1">0</td>
            <td class="color1">￥0</td>
            <td class="color1">￥0</td>
            <td class="color2">0</td>
            <td class="color2">￥0</td>
            <td class="color2">￥0</td>
            <td class="color3">0</td>
            <td class="color3">￥0</td>
            <td class="color3">￥0</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="total">
      <div class="row">
        <div class="cell">初期数量：0</div>
        <div class="cell">初期成本价：￥0</div>
        <div class="cell">初期成本总额：￥0</div>
      </div>
      <div class="row">
        <div class="cell">末期数量：0</div>
        <div class="cell">末期成本价：￥0</div>
        <div class="cell">末期成本总额：￥0</div>
      </div>
    </div>
    <div class="footer">
      <div class="row">
        总计
        <span class="text">3</span>
        条数据
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CostDetail',
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

    .color1 {
      background: #e6e7fb;
    }

    .color2 {
      background: #e0efef;
    }

    .color3 {
      background: #fceae8;
    }

    .color4 {
      background: #efe9e0;
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

    .total {
      display: flex;

      .row {
        margin-right: 50px;
        display: flex;

        .cell {
          padding: 10px;
          font-weight: bold;
        }
      }
    }

    .footer {
      display: flex;

      .row {
        margin-right: 50px;
        display: flex;
        padding: 10px;
        font-weight: bold;

        .text {
          color: #c13565;
        }
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
