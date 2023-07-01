<template>
  <div class="VipDividendsInfo">
    <div class="baseInfo">
      <div class="row">
        <div class="cell">
          <div class="left">消费型股东等级：</div>
          <div class="right">{{ statistical.level_name }}</div>
        </div>
        <div class="cell">
          <div class="left">上级推荐人：</div>
          <div class="right">{{ statistical.super }}</div>
        </div>
        <div class="cell">
          <div class="left">累计推荐人数：</div>
          <div class="right">{{ statistical.count }}</div>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div class="left">成为消费型股东时间：</div>
          <div class="right">{{ statistical.time }}</div>
        </div>
        <div class="cell">
          <div class="left">累计消费金额：</div>
          <div class="right">{{ statistical.total }}</div>
        </div>
        <div class="cell">
          <div class="left">直接推荐人数：</div>
          <div class="right">{{ statistical.zjcount }}</div>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div class="left">剩余可用分红/积分：</div>
          <div class="right">{{ statistical.commission_balance }}</div>
        </div>
        <div class="cell">
          <div class="left">累计分红/积分：</div>
          <div class="right">{{ statistical.commission }}</div>
        </div>
        <div class="cell">
          <div class="left">间接推荐人：</div>
          <div class="right">{{ statistical.indirect }}</div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">时间</span>
          <DatePicker
            placeholder="开始时间-结束时间"
            style="width: 200px"
            transfer
            type="datetimerange"
            @on-change="changeDatePicker"
            @on-clear="clearDate"
            @on-open-change="changeDatePicker"
          />
        </div>
        <div class="box">
          <Select v-model="searchData.type" style="width: 200px" transfer>
            <Option
              v-for="item in relation_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="姓名/电话/卡号"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right">
        <div
          class="add-bt"
          @click="showModal('添加他推荐的会员', 'Referrer', 500)"
        >
          添加他推荐的会员
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
            <span class="bt" @click="relieve(row)">解除关系</span>
          </template>
        </vxe-column>
      </vxe-table>
    </div>

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

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <Referrer v-if="modalShow('Referrer')" />
    </Modal>
  </div>
</template>

<script>
  import Referrer from '@/components/vip-details/vip-shareholder-dividends/referrer'

  export default {
    name: 'VipDividendsInfo',
    components: { Referrer },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 300,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '他的推荐',
            key: 'name',
            width: '200px',
          },
          {
            title: '与他的关系',
            key: 'relate',
          },
          {
            title: '累计贡献分红/积分',
            key: 'tcommission',
          },
          {
            title: '累计消费金额',
            key: 'total',
          },
          {
            title: '绑定时间',
            key: 'reg_time',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        statistical: {
          count: 0,
          jjcount: 0,
          zjcount: 0,
          commission: 0,
          commission_balance: 0,
          total: 0,
          super: '-',
          time: '-',
        },
        relation_list: [
          {
            value: '0',
            label: '全部股东关系',
          },
          {
            value: '1',
            label: '直接关系',
          },
          {
            value: '2',
            label: '间接关系',
          },
        ],
        searchData: {
          vid: this.memberInfo.id,
          search: '',
          type: '',
          start: '',
          end: '',
          p: 1,
          page: 10,
          count: 0,
        },

        list: [],
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    created() {
      this.getFromBossTotal()
      this.search()
    },
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
      },
      relieve(data) {
        this.$Modal.confirm({
          title: '解除关系',
          content:
            '若解除推荐关系，已产生分红/积分的订单进行退款时，该部分分红/积分将不会再退回，是否确定解除推荐关系？',
          okText: '确定',
          cancelText: '取消',
          onOk: async () => {
            this.delLower(data.id)
          },
        })
      },
      async getFromBossTotal() {
        const { data, status, msg } = { data: [], status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.statistical = data
        }
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
      async delLower(vid) {
        console.log(vid)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.search()
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipDividendsInfo {
    .baseInfo {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 10px 14px;
      margin: 5px 5px 10px 5px;

      .row {
        display: flex;

        .cell {
          flex: 1;
          height: 25px;
          line-height: 25px;
          display: flex;

          .left {
          }

          .right {
            flex: 1;
          }
        }
      }
    }

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
