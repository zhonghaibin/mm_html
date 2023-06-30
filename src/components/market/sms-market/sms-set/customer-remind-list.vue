<template>
  <div class="box">
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
        <vxe-column field="status" title="状态" width="120">
          <template #default="{ row }">
            <i-switch v-model="row.status" @on-change="change" />
          </template>
        </vxe-column>
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt" @click="showModal('短信内容', 'CustomerRemind')">
              编辑
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
      <CustomerRemind v-if="modalShow('CustomerRemind')" />
    </Modal>
  </div>
</template>

<script>
  import CustomerRemind from '@/components/market/sms-market/sms-set/customer-remind'
  export default {
    name: 'CustomerRemindList',
    components: { CustomerRemind },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            type: '会员预约成功',
            content:
              '亲~您已预订成功【项目名】:时间为【时间】,请接时抵到,期待你的光临~',
            status: 1,
          },
        ],
        tableColumns: [
          {
            title: '短信类型',
            key: 'type',
          },
          {
            title: '短信内容',
            key: 'content',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        searchData: {
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
    activated() {},
    created() {},
    methods: {
      change() {},
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
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .list {
      margin-top: 10px;

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
