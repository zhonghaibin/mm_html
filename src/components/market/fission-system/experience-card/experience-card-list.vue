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
          <div class="add-bt">导出</div>
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('添加体验卡', 'ExperienceCard')">
          添加体验卡
        </div>
      </div>
    </div>
    <div class="header">
      <div class="header-box">
        <div class="header-cell color1">已发放：22</div>
        <div class="header-cell color2">已领取：22</div>
        <div class="header-cell color3">已核销：22</div>
        <div class="header-cell color4">领卡费实收：22</div>
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
        <vxe-column title="操作" width="220">
          <template>
            <span class="bt">已上架</span>
            <span class="bt">编辑</span>
            <span class="bt">发放</span>
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
      <ExperienceCard v-if="modalShow('ExperienceCard')" />
    </Modal>
  </div>
</template>

<script>
  import ExperienceCard from '@/components/market/fission-system/experience-card/experience-card'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'ExperienceCardList',
    components: { SelectShop, ExperienceCard },

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
            title: '适用门店',
            key: '0',
          },
          {
            title: '体验卡名称',
            key: '1',
          },
          {
            title: '适用等级',
            key: '2',
          },
          {
            title: '卡项内容',
            key: '3',
          },
          {
            title: '可赠送数',
            key: '4',
          },
          {
            title: '已发放',
            key: '5',
          },
          {
            title: '朋友可赠送数',
            key: '6',
          },
          {
            title: '已领取数量',
            key: '7',
          },
          {
            title: '已核销数量',
            key: '8',
          },
          {
            title: '领卡费',
            key: '9',
          },
          {
            title: '卡有效期',
            key: '10',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 80,
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
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-radius: 8px;
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
