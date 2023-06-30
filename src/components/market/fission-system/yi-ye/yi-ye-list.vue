<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="输入消费型股东姓名/手机号"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
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
        <div class="box">
          <div class="add-bt">导出</div>
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('添加资源型股东', 'YiYe')">
          添加资源型股东
        </div>
      </div>
    </div>
    <div class="header">
      <div class="header-box">
        <div class="header-cell color2">
          <div class="header-cell-l">
            <div class="cell-title">店主合计</div>
          </div>
          <div class="header-cell-r">
            <div class="cell-content">可用分红：</div>
            <div class="cell-content">已用分红：</div>
            <div class="cell-content">累计分红：</div>
          </div>
        </div>
        <div class="header-cell color1">
          <div class="header-cell-l">
            <div class="cell-title">店主合计</div>
          </div>
          <div class="header-cell-r">
            <div class="cell-content">可用分红：</div>
            <div class="cell-content">已用分红：</div>
            <div class="cell-content">累计分红：</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <vxe-table
        ref="xTable"
        border
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
          field="0"
          fixed="left"
          show-overflow="title"
          title="所属门店"
          width="120"
        />
        <vxe-column
          field="1"
          show-overflow="title"
          title="资源型股东信息"
          width="120"
        />
        <vxe-column
          field="2"
          show-overflow="title"
          title="资源型股东等级"
          width="120"
        />
        <vxe-column field="3" show-overflow="title" title="规则" width="120" />
        <vxe-column
          field="4"
          show-overflow="title"
          title="已绑店员数"
          width="120"
        />
        <vxe-column
          field="5"
          show-overflow="title"
          title="个人分红%"
          width="120"
        />
        <vxe-column
          field="6"
          show-overflow="title"
          title="店主分红%"
          width="120"
        />
        <vxe-column
          field="7"
          show-overflow="title"
          title="店员分红%"
          width="120"
        />
        <vxe-column
          field="8"
          show-overflow="title"
          title="所属门店"
          width="120"
        />
        <vxe-colgroup title="店主">
          <vxe-column field="11" title="可用分红" width="120" />
          <vxe-column field="12" title="已用分红" width="120" />
          <vxe-column field="13" title="累计分红" width="120" />
        </vxe-colgroup>
        <vxe-colgroup title="店员">
          <vxe-column field="21" title="可用分红" width="120" />
          <vxe-column field="22" title="已用分红" width="120" />
          <vxe-column field="23" title="累计分红" width="120" />
        </vxe-colgroup>
        <vxe-column
          field="9"
          show-overflow="title"
          title="身份到期时间"
          width="120"
        />
        <vxe-column
          field="10"
          show-overflow="title"
          title="添加时间"
          width="120"
        />
        <vxe-column fixed="right" title="操作" width="120">
          <template>
            <span class="bt">编辑</span>
            <span class="bt">删除</span>
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
      <YiYe v-if="modalShow('YiYe')" />
    </Modal>
  </div>
</template>

<script>
  import YiYe from '@/components/market/fission-system/yi-ye/yi-ye'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'YiYeList',
    components: { SelectShop, YiYe },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: {
          sid: '',
          search: '',
          start: '',
          end: '',
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

    .header {
      background: white;

      .header-box {
        display: flex;
        .color1 {
          background: #cedbde;
        }
        .color2 {
          background: #daebff;
        }
        .color3 {
          background: #f2cccc;
        }
        .color4 {
          background: #efdbe7;
        }
        .header-cell {
          flex: 1;
          margin: 0 10px;
          text-align: center;
          border-radius: 8px;
          display: flex;
          padding: 20px 0;
          .header-cell-l {
            .cell-title {
              width: 100px;
              border-right: 1px dashed #b9b9b9;
            }
          }
          .header-cell-r {
            flex: 1;
            display: flex;
            align-items: center;
            .cell-content {
              flex: 1;
            }
          }
        }
      }
    }

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
