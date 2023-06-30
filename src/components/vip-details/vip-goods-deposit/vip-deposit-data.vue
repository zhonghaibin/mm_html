<template>
  <div class="VipDividendsInfo">
    <div class="search">
      <div class="left">
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="搜索商品名称"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('添加寄存商品', 'Deposit')">
          添加寄存商品
        </div>
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
        <vxe-column title="操作" width="120">
          <template #default="{ row }">
            <span class="bt" @click="showModal('操作存取商品', 'Take', row)">
              存取商品
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

    <Modal v-model="modal.show" :footer-hide="true" :title="modal.title">
      <Deposit
        v-if="modalShow('Deposit')"
        :member-info="memberInfo"
        @changeDeposit="changeDeposit"
      />
      <Take
        v-if="modalShow('Take')"
        :deposit="deposit"
        :member-info="memberInfo"
        @changeDeposit="changeDeposit"
      />
    </Modal>
  </div>
</template>

<script>
  import Deposit from '@/components/vip-details/vip-goods-deposit/deposit'
  import Take from '@/components/vip-details/vip-goods-deposit/take'

  export default {
    name: 'VipDividendsInfo',
    components: {
      Deposit,
      Take,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 400,
        tableData: [],
        tableColumns: [
          {
            title: '寄存时间',
            key: 'addtime',
            width: '200px',
          },
          {
            title: '寄存商品名称',
            key: 'goods_name',
          },
          {
            title: '数量',
            key: 'use_num',
          },
        ],
        deposit: {},
        modal: {
          show: false,
          title: '',
          type: false,
        },
        searchData: {
          vid: this.memberInfo.id,
          search: '',
          search2: '',
          sid: '',
          p: 1,
          page: 10,
          count: 0,
        },
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
    methods: {
      showModal(title, type, data = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.deposit = data
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
      changeDeposit() {
        this.modal.show = false
        this.search()
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipDividendsInfo {
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
      margin-top: 10px;
    }

    .page {
      clear: both;
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }

    .bt {
      color: #1298e6;
      margin-right: 4px;
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
