<template>
  <div class="QuestionnaireSurvey">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店：</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            clearable
            enter-button
            placeholder="输入会员名称/卡号/问卷名称"
            search
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div class="right">
        <div
          class="bt"
          @click="jumpRouter('setting.system', { tab_index: '问卷调查' })"
        >
          问卷设置
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
            <span
              class="bt"
              @click="showModal('问卷详情', 'QuestionnaireDetails')"
            >
              问卷详情
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
      <QuestionnaireDetails v-if="modalShow('QuestionnaireDetails')" />
    </Modal>
  </div>
</template>

<script>
  import QuestionnaireDetails from '@/components/vip-details/questionnaire-survey/questionnaire-details'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'QuestionnaireSurvey',
    components: {
      SelectShop,
      QuestionnaireDetails,
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
            title: '会员信息',
            key: 'service_name',
          },
          {
            title: '所属门店',
            key: 'day',
          },
          {
            title: '问卷名称',
            key: 'msg_day',
          },
          {
            title: '推送人',
            key: 'msg_info',
          },
          {
            title: '提交时间',
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
          search: '',
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 230
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

      async getList() {},
      jumpRouter(name, params = {}) {
        this.$router.push({ name: name, params: params })
      },
    },
  }
</script>

<style lang="less" scoped>
  .QuestionnaireSurvey {
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
