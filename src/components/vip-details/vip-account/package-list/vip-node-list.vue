<template>
  <div class="VipNodeList">
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
          <span class="bt" @click="showModal('修改备注信息', 'VipNode', row)">
            修改
          </span>
          <span class="bt" @click="confirm(row)">删除</span>
        </template>
      </vxe-column>
    </vxe-table>
    <div class="page">
      <Page
        :current="searchData.p"
        :page-size="searchData.page"
        show-elevator
        size="small"
        :total="searchData.count"
        transfer
        @on-change="currentPage"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <div class="footer">
      <div class="add-node" @click="showModal('新增备注信息', 'VipNode')">
        <Icon :size="12" type="md-add" />
        新增备注信息
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <VipNode
        v-if="modalShow('VipNode')"
        :card-vid="cardVid"
        :member-info="memberInfo"
        :remarks="remarks"
        @saveModal="saveModal"
      />
    </Modal>
  </div>
</template>

<script>
  import VipNode from '@/components/vip-details/vip-account/package-list/vip-node-list/vip-node'

  export default {
    name: 'VipNodeList',
    components: {
      VipNode,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
      cardVid: {
        type: Number,
        default: () => 0,
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 500,
        tableData: [],
        tableColumns: [
          {
            title: '备注内容',
            key: 'info',
          },
          {
            title: '操作时间',
            key: 'addtime',
          },
          {
            title: '最后操作人',
            key: 'suname',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 400,
        },
        searchData: {
          card_vid: this.cardVid,
          p: 1,
          page: 5,
          count: 0,
        },
        remarks: {},
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
      saveModal() {
        this.search()
      },
      showModal(title, type, remarks = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.remarks = remarks
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
      confirm(remarks = {}) {
        this.$Modal.confirm({
          title: '警告？',
          content: '确定要删除吗？',
          onOk: () => {
            this.delVipCardRemarks({
              remarks_id: remarks.id,
            })
          },
          onCancel: () => {},
        })
      },
      async delVipCardRemarks(params) {
        console.log(params)
        const { msg, status } = [0, '']
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.info('操作成功')
          this.search()
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipNodeList {
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .page {
      clear: both;
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }

    .footer {
      .add-node {
        margin-top: 4px;
        background: #f19ec2;
        color: white;
        text-align: center;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
</style>
