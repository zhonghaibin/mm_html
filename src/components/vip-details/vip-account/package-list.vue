<template>
  <div class="PackageList">
    <div class="search">
      <div class="box">
        <Input
          v-model="searchData.search"
          clearable
          enter-button
          placeholder="输入次卡名称"
          search
          @on-clear="search"
          @on-search="search"
        />
      </div>
      <div class="box">
        <span class="text">状态</span>
        <Select
          v-model="searchData.status"
          style="width: 200px"
          transfer
          @on-change="search"
        >
          <Option
            v-for="item in status_list"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item.id" class="card">
        <div class="header">{{ item.cname }}</div>
        <div class="content">
          <div class="row">
            <div class="left">购卡日期</div>
            <div class="right">
              <div class="text">{{ item.time }}</div>
            </div>
          </div>
          <div class="row">
            <div class="left">卡有效期</div>
            <div class="right">
              <div class="text">{{ item.end_time }}</div>
            </div>
          </div>
          <div class="row">
            <div class="left">剩余次数</div>
            <div class="right">
              <div class="text">{{ item.use_num }}次</div>
            </div>
          </div>
          <div class="more">
            <div class="details" @click="showModal('卡详情', 'Package', item)">
              详情
            </div>
          </div>
        </div>
      </div>
      <Spin v-if="loading" fix size="large" />
      <div v-if="list.length === 0 && !loading" class="nodata">暂无数据</div>
    </div>
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
    <div>
      <Modal
        v-model="modal.show"
        :footer-hide="true"
        :title="modal.title"
        :width="modal.width"
      >
        <Package
          v-if="modalShow('Package')"
          :card-vid="current_card_id"
          :member-info="memberInfo"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
  import Package from '@/components/vip-details/vip-account/package'

  export default {
    name: 'PackageList',
    components: {
      Package,
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
        status_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '使用中',
          },
          {
            value: '2',
            label: '已用完',
          },
          {
            value: '3',
            label: '未使用',
          },
          {
            value: '4',
            label: '已过期',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 700,
        },
        searchData: {
          vip_id: this.memberInfo.vip_id,
          search: '',
          status: '0',
          p: 1,
          page: 8,
          count: 0,
        },
        list: [],
        current_card_id: 0,
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
      showModal(title, type, cardInfo) {
        this.current_card_id = Number(cardInfo.id)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
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
        this.list = []
        this.searchData.count = Number(0)
        this.searchData.p = Number(1)
      },
    },
  }
</script>

<style lang="less" scoped>
  .PackageList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .box {
        .text {
          font-weight: bold;
          margin: 0 5px;
        }
      }
    }

    .list {
      margin-top: 10px;
      display: flex;
      flex-flow: wrap;

      .card {
        border-radius: 8px;
        border: 1px solid #dcdee2;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        width: 23%;
        margin: 1%;
        .header {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          height: 40px;
          line-height: 40px;
          background: #fceef4;
          font-weight: bold;
          padding: 0 10px;
          font-size: 14px;
        }

        .content {
          padding: 12px 12px;

          .row {
            line-height: 30px;
            height: 30px;
            display: flex;

            .left {
              flex: 1;
              margin-left: 12px;
            }

            .right {
              display: flex;
              justify-content: flex-end;
            }
          }

          .more {
            display: flex;
            justify-content: flex-end;

            .details {
              color: #1298e6;
              cursor: pointer;
            }
          }
        }
      }

      .card:hover {
        border: 1px solid #fcbad7;
      }

      .nodata {
        height: 48px;
        line-height: 48px;
        border: 1px solid #eeeeee;
        color: #515a6e;
        font-size: 12px;
        text-align: center;
        width: 100%;
      }
    }

    .page {
      clear: both;
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }
  }
</style>
