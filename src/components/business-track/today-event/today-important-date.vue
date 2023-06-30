<template>
  <div class="TodayImportantDate">
    <div class="header">
      <div class="left">
        <div class="h-cel title">今日重要日期</div>
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
        <vxe-column field="name" title="日期类型" />
        <vxe-column field="info" title="日期" />
        <vxe-column field="vip_name" title="会员信息">
          <template #default="{ row }">
            <div>{{ row.vip_name }}</div>
            <div>{{ row.tel }}</div>
          </template>
        </vxe-column>
        <vxe-column field="shop_name" title="所属门店" />
        <!--        <vxe-column field="info" title="累计消费" />-->
        <!--        <vxe-column field="info" title="上次到店时间" />-->
      </vxe-table>
    </div>
  </div>
</template>
<script>
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'TodayImportantDate',
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
          type: 2, //客情记录类型，1是文本，2是日期
          order: '', //asc或desc
          day: '', //筛选日期 type为2的日期类型才有效
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
        this.tableData = []
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
  .TodayImportantDate {
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
        background-color: #fceae8;
      }
    }
  }
</style>
