<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
            style="width: 180px"
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
            placeholder="搜索员工姓名"
            search
            style="width: 200px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">在职</span>
          <SelectStaffStatus v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">全部职位</span>
          <SelectPosition v-model="searchData.sid" @on-select="search" />
        </div>
      </div>
      <div class="right">
        <Checkbox class="checkbox-bt">包含跨店数据</Checkbox>
        <div class="add-bt">导出</div>
      </div>
    </div>
    <div class="list">
      <div class="cell">
        <div class="title">当月业绩排行榜</div>
        <table class="table">
          <thead>
            <tr>
              <th>排名</th>
              <th>员工姓名</th>
              <th>业绩金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>骨盆修复</td>
              <td>￥32132</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cell">
        <div class="title">当月耗卡排行榜</div>
        <table class="table">
          <thead>
            <tr>
              <th>排名</th>
              <th>员工姓名</th>
              <th>耗卡金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>骨盆修复</td>
              <td>￥32132</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cell">
        <div class="title">当月服务项目数排行榜</div>
        <table class="table">
          <thead>
            <tr>
              <th>排名</th>
              <th>员工姓名</th>
              <th>服务项目数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>骨盆修复</td>
              <td>￥32132</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cell">
        <div class="title">当月服务客数排行榜</div>
        <table class="table">
          <thead>
            <tr>
              <th>排名</th>
              <th>员工姓名</th>
              <th>服务客数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>骨盆修复</td>
              <td>￥32132</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectPosition from '@/components/form/select-position'
  import SelectStaffStatus from '@/components/form/select-staff-status'
  export default {
    name: 'StaffTopList',
    components: { SelectStaffStatus, SelectPosition, SelectShop },

    data: function () {
      return {
        searchData: { sid: '', search: '', start: '', end: '' },
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

    .list {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;

      .cell {
        width: 24%;
        border: 1px solid #eeeeee;

        .title {
          align-items: center;
          display: flex;
          font-weight: bold;
          font-size: 14px;
          color: black;
          height: 40px;
          background: white;
          line-height: 40px;
          text-indent: 1em;
        }

        .table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          text-align: center;
          background: white;
        }

        tr {
          color: black;

          th {
            padding: 10px 2px;
            font-size: 13px;
            background: #ffe1ef;
          }

          td {
            border-bottom: 1px solid #f3f3f3;
            border-left: 1px solid #f3f3f3;
            padding: 10px 2px;
            font-size: 14px;
          }

          .text {
            color: #1298e6;
            cursor: pointer;
          }
        }
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .checkbox-bt {
      padding: 0;
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
