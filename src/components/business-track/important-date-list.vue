<template>
  <div class="ImportantDateList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店：</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
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
        :row-config="{ isHover: true, height: 120 }"
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
        >
          <template #default="{ row }" v-if="item.title === '会员信息'">
            <div>
              <span style="display: block">{{ row.vip_name }}</span>
              <span style="display: block">{{ row.tel }}</span>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="120">
          <template #default="{ row }">
            <span
              class="bt"
              @click="showModal('添加回访', 'VipReturnVisit', row)"
            >
              添加回访
            </span>
          </template>
        </vxe-column>
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
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <VipReturnVisit
        v-if="modalShow('VipReturnVisit')"
        :vid="vid"
        @change="change"
      />
    </Modal>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import VipReturnVisit from '@/components/vip-details/return-visit/vip-return-visit'

  export default {
    name: 'ImportantDateList',
    components: { VipReturnVisit, SelectShop },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '日期类型',
            key: 'name',
          },
          {
            title: '日期',
            key: 'info',
          },
          {
            title: '会员信息',
            key: 'suname',
          },
          {
            title: '所属门店',
            key: 'shop_name',
          },
          {
            title: '专属顾问',
            key: 'dispose_staff_name',
          },
          {
            title: '专属产康师',
            key: 'adviser_name',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: {
          vid: '', //会员id
          type: 2, //客情记录类型，1是文本，2是日期
          order: '', //asc或desc
          sid: '', //门店id
          day: '', //筛选日期 type为2的日期类型才有效
          p: 1,
          page: 10,
          count: 0,
        },
        vid: '',
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {
      this.search()
    },
    created() {
      this.search()
    },
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 230
      },
      change() {
        this.modal.show = false
        this.search()
      },
      showModal(title, type, data = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.vid = data.vid
      },
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
          const list = this.tableData
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
  .ImportantDateList {
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
