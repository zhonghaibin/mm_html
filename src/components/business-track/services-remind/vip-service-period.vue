<template>
  <div class="VipServicePeriod">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">服务项目</span>
          <SelectObject v-model="searchData.service_tid" @on-select="search" />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="输入项目名称筛选"
            search
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('添加服务提醒', 'ServiceRemind')">
          添加服务提醒
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
        <vxe-column title="操作" width="200">
          <template #default="{ row }">
            <span
              class="bt"
              @click="showModal('修改周期', 'ServiceRemind', row)"
            >
              修改周期
            </span>
            <span class="bt" @click="delRow(row)">删除</span>
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
      <ServiceRemind
        v-if="modalShow('ServiceRemind')"
        :data="data"
        @change="change"
      />
    </Modal>
  </div>
</template>

<script>
  import ServiceRemind from '@/components/business-track/services-remind/service-remind'
  import SelectObject from '@/components/form/select-object'

  export default {
    name: 'VipServicePeriod',
    components: {
      ServiceRemind,
      SelectObject,
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '服务项目',
            key: 'service_name',
          },
          {
            title: '服务周期',
            key: 'day',
          },
          {
            title: '发短信天数',
            key: 'msg_day',
          },
          {
            title: '短信内容',
            key: 'msg_info',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: {
          search: '', //项目名称搜索
          service_tid: '', //项目分类id
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 264
      },
      change() {
        this.modal.show = false
        this.search()
      },
      showModal(title, type, data = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.data = data
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
      delRow(data = {}) {
        this.$Modal.confirm({
          title: '警告？',
          content: '确定要删除吗？',
          onOk: () => {
            this.delData({
              remind_id: data.id,
            })
          },
          onCancel: () => {},
        })
      },
      async delData(params) {
        console.log(params)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.info('操作成功')
          this.search()
        }
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

<style lang="less" scoped>
  .VipServicePeriod {
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
