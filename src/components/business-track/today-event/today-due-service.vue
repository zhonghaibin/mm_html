<template>
  <div class="TodayDueService">
    <div class="header">
      <div class="left">
        <div class="h-cel title">今日服务到期</div>
        <div class="h-cel">
          <SelectShop v-model="searchData.sid" @on-select="search" />
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
        <vxe-column field="vip_name" title="会员信息">
          <template #default="{ row }">
            <div>{{ row.vip_name }}</div>
            <div>{{ row.vip_tel }}</div>
          </template>
        </vxe-column>
        <vxe-column field="shop_name" title="所属门店" />
        <vxe-column field="service_name" title="服务项目" />
        <vxe-column field="service_num" title="已服务次数" />
        <vxe-column field="minTime" title="最后一次服务时间" width="140" />
        <vxe-column field="tasktime" title="距下次服务时间" width="140">
          <template #default="{ row }">
            <div>{{ row.tasktime }} 天</div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>
<script>
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'TodayDueService',
    components: {
      SelectShop,
    },
    data: function () {
      return {
        loading: false,
        tableData: [],
        searchData: {
          remind_type: 0, //为空为0是待提醒，为1是已到期
          search: '', //会员名称或手机号码
          search2: '', //项目名称
          service_tid: '', //项目分类 id
          remind_status: '', //提醒状态 -1已提醒 2是未提醒
          day: 1, //距离下次时间
          sid: '', //门店id，默认是全部门店
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
      headerCellClassName() {
        return 'col-color'
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
<style lang="less">
  .TodayDueService {
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
        background-color: #efe9e0;
      }
    }
  }
</style>
