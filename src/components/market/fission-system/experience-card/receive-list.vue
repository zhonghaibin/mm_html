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
            placeholder="输入体验卡名称/领卡人/发卡人/手机号"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">剩余</span>
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="天数"
            style="width: 80px"
          />
          天失效
        </div>
        <div class="box">
          <span class="text">使用状态</span>
          <SelectExperienceCardStatus
            v-model="searchData.sid"
            @on-select="search"
          />
        </div>
        <div class="box">
          <span class="text">转化状态</span>
          <SelectExperienceCardTransferStatus
            v-model="searchData.sid"
            @on-select="search"
          />
        </div>
        <div class="box">
          <div class="add-bt">导出</div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="header">
      <div class="header-box">
        <div class="header-content color1">
          <div class="header-cell">
            发放总卡数
            <br />
            <h5>342</h5>
          </div>
        </div>
        <div class="header-content color2">
          <div class="header-cell">
            已领取总数
            <br />
            <h5>342</h5>
          </div>
        </div>
        <div class="header-content color3">
          <div class="header-cell">
            使用总总数
            <br />
            <h5>342</h5>
          </div>
        </div>
        <div class="header-content color4">
          <div class="header-cell">
            已使用总数
            <br />
            <h5>342</h5>
          </div>
        </div>
        <div class="header-content color5">
          <div class="header-cell">
            未使用总数
            <br />
            <h5>342</h5>
          </div>
        </div>
        <div class="header-content color6">
          <div class="header-cell">
            已失效总数
            <br />
            <h5>342</h5>
          </div>
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
    />
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectExperienceCardStatus from '@/components/form/select-experience-card-status'
  import SelectExperienceCardTransferStatus from '@/components/form/select-experience-card-transfer-status'
  export default {
    name: 'ReceiveList',
    components: {
      SelectExperienceCardTransferStatus,
      SelectExperienceCardStatus,
      SelectShop,
    },

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
            title: '领取门店',
            key: '0',
          },
          {
            title: '领卡人',
            key: '1',
          },
          {
            title: '发卡人',
            key: '2',
          },
          {
            title: '领卡费',
            key: '3',
          },
          {
            title: '领卡时间',
            key: '4',
          },
          {
            title: '剩余有效天数',
            key: '5',
          },
          {
            title: '使用状态',
            key: '6',
          },
          {
            title: '卡名称',
            key: '7',
          },
          {
            title: '转化状态',
            key: '8',
          },
          {
            title: '转化详情',
            key: '9',
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
        align-items: center;
        justify-content: center;
        height: 60px;
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
        .color5 {
          background: #fdeff5;
        }
        .color6 {
          background: #d2d5dd;
        }
        .header-content {
          height: 60px;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          margin: 0 10px;
        }
        .header-cell {
          flex: 1;

          text-align: center;
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
