<template>
  <div class="ShopRemindList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店：</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">预警不超过</span>
          <Input
            v-model="searchData.day"
            clearable
            placeholder="输入预警天数"
            style="width: 100px"
            transfer
            @on-change="search"
            @on-clear="search"
          />
          天
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
              <span style="display: block">{{ row.name }}</span>
              <span style="display: block">{{ row.tel }}</span>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '套餐次卡'">
            <div>
              <div>
                <div
                  v-for="(val, key) in row.card_list"
                  :key="key"
                  style="color: rgb(49, 112, 143)"
                >
                  {{ val.cname }}
                </div>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column fixed="right" title="操作" width="120">
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
    name: 'ShopRemindList',
    components: {
      SelectShop,
      VipReturnVisit,
    },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '会员信息',
            key: 'suname',
          },
          {
            title: '所属门店',
            key: 'shop_name',
          },
          {
            title: '套餐次卡',
            key: 'cname',
          },
          {
            title: '消费总次数',
            key: 'order_num',
          },
          {
            title: '超出天数',
            key: 'over_time',
          },
          {
            title: '专属产康师',
            key: 'adviser_name',
          },
          {
            title: '专属顾问',
            key: 'dispose_staff_name',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: '40',
        },
        searchData: {
          search: '',
          sid: '',
          day: '',
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
      showModal(title, type, data = {}) {
        this.vid = data.id
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      change() {
        this.modal.show = false
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
  .ShopRemindList {
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
