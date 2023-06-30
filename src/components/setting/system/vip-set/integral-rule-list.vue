<template>
  <div class="IntegralRuleList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <Input
            clearable
            enter-button
            placeholder="搜索规则名称"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div style="color: red; display: flex; align-items: center">
          *积分规则设置后立即生效,但不会影响会员的历史积分
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('添加积分规则', 'IntegralRule')">
          添加积分规则
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
          <template>
            <span class="bt">编辑</span>
            <span class="bt">下架</span>
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
      <IntegralRule v-if="modalShow('IntegralRule')" />
    </Modal>
  </div>
</template>

<script>
  import IntegralRule from '@/components/setting/system/vip-set/integral-rule'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'IntegralRuleList',
    components: { SelectShop, IntegralRule },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '序号',
            key: '0',
          },
          {
            title: '积分规则名称',
            key: '1',
          },
          {
            title: '适用门店',
            key: '2',
          },
          {
            title: '积分规则',
            key: '3',
          },
          {
            title: '生效日期',
            key: '4',
          },
          {
            title: '失效日期',
            key: '5',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        searchData: {
          sid: '',
          search: '',
          start_time: '',
          end_time: '',
          p: 1,
          page: 10,
          count: 0,
        },
        date: [],
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 286
      },
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
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
  .IntegralRuleList {
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
