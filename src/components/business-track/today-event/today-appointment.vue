<template>
  <div class="TodayAppointment">
    <div class="header">
      <div class="left">
        <div class="h-cel title">今日预约客户</div>
        <div class="h-cel">
          <SelectShop v-model="searchData.sid" @on-select="getList" />
        </div>
      </div>
      <div class="right">
        <div class="bt">查看详情 ></div>
      </div>
    </div>
    <div class="content">
      <vxe-table
        class="table-style"
        :data="tableData"
        :header-cell-class-name="headerCellClassName"
        :height="326"
        :loading="loading"
        :row-config="{ isHover: true }"
        size="mini"
      >
        <vxe-column field="timeer" title="预约时间" />
        <vxe-column field="uname" title="会员信息">
          <template #default="{ row }">
            <div>{{ row.uname }}</div>
            <div>{{ row.tel }}</div>
          </template>
        </vxe-column>
        <vxe-column field="service" title="预约项目" />
        <vxe-column field="staff" title="预约产康师" />
        <vxe-column field="shop_name" title="预约门店" />
        <vxe-column field="status_name" title="状态" />
      </vxe-table>
    </div>
  </div>
</template>
<script>
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'TodayAppointment',
    components: {
      SelectShop,
    },
    data: function () {
      return {
        loading: false,
        tableData: [],
        searchData: {
          sid: '',
          p: 1,
          page: 5,
          search: '', //预约状态 2待到店 3已完成 4已作废 5已到店
          search2: '', //会员卡号/手机号/名称
          status: '', //0全部状态 2待到店 3已完成 4已作废 5已到店
          start: '', //预约起始时间
          end: '', //预约结束时间
        },
      }
    },
    activated() {
      this.getList()
    },
    created() {
      this.getList()
    },
    methods: {
      headerCellClassName() {
        return 'col-color'
      },
      async getList() {
        const toDay = this.getFormatDate(new Date()).substr(0, 11)
        const start = toDay + '00:00:00'
        const end = toDay + '23:59:59'
        this.searchData.start = start
        this.searchData.end = end
        this.loading = true
        this.loading = false
        this.list = []
      },
      getFormatDate(date) {
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return (
          date.getFullYear() +
          '-' +
          month +
          '-' +
          strDate +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds()
        )
      },
    },
  }
</script>
<style lang="less">
  .TodayAppointment {
    min-height: 323px;
    border-radius: 6px;
    background: white;
    .header {
      display: flex;
      height: 40px;
      border: 1px solid #e8eaec;
      .left {
        display: flex;
        align-items: center;
        padding: 0 5px;
        flex: 1;

        .title {
          font-weight: bold;
        }

        .h-cel {
          padding: 0 4px;
          float: left;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          padding: 5px;
          color: #1298e6;
          cursor: pointer;
        }
      }
    }
    .content {
      clear: both;
      .table-style .vxe-header--column.col-color {
        background-color: #e0efef;
      }
    }
  }
</style>
