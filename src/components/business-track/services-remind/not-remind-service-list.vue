<template>
  <div class="NotRemindServiceList">
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
            placeholder="输入姓名/手机号/卡号"
            search
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">提醒状态</span>
          <Select
            v-model="searchData.remind_status"
            style="width: 100px"
            transfer
            @on-select="search"
          >
            <Option
              v-for="item in statusList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <span class="text">服务项目</span>
          <SelectObjectType
            v-model="searchData.service_tid"
            @on-select="search"
          />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search2"
            clearable
            enter-button
            placeholder="输入项目名称筛选"
            style="width: 150px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">距离下次时间</span>
          <SelectNextDays
            v-model="searchData.day"
            :width="100"
            @on-select="search"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt">导出</div>
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
        :row-config="{ isHover: true, height: 120 }"
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
        >
          <template #default="{ row }" v-if="item.title === '会员信息'">
            <div>
              <span style="display: block">{{ row.vip_name }}</span>
              <span style="display: block">{{ row.vip_tel }}</span>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="提醒记录" width="120">
          <template #default="{ row }">
            <span
              v-if="row.number > 0"
              class="bt"
              @click="showModal('提醒记录', 'RemindList', row)"
            >
              已提醒 {{ row.number }} 次
            </span>
            <span v-else>未提醒</span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="120">
          <template #default="{ row }">
            <span class="bt" @click="showModal('服务提醒', 'Remind', row)">
              提醒
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
      <RemindList v-if="modalShow('RemindList')" :task-id="data.id" />
      <Remind v-if="modalShow('Remind')" :data="data" @change="change" />
    </Modal>
  </div>
</template>

<script>
  import RemindList from '@/components/business-track/services-remind/remind-list'
  import Remind from '@/components/business-track/services-remind/remind'
  import SelectObjectType from '@/components/form/select-object-type'
  import SelectNextDays from '@/components/form/select-next-days'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'NotRemindServiceList',
    components: {
      SelectShop,
      RemindList,
      Remind,
      SelectObjectType,
      SelectNextDays,
    },
    props: {},
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '会员信息',
            key: 'name',
          },
          {
            title: '所属门店',
            key: 'shop_name',
          },
          {
            title: '服务项目',
            key: 'service_name',
          },
          {
            title: '首次服务时间',
            key: 'maxTime',
          },
          {
            title: '已服务次数',
            key: 'service_num',
          },
          {
            title: '最后一次服务时间',
            key: 'minTime',
          },
          {
            title: '据下次服务时间',
            key: 'tasktime',
          },
          {
            title: '本次提醒',
            key: 'remindtime',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
        },
        statusList: [
          {
            label: '全部',
            value: '0',
          },
          {
            label: '已提醒',
            value: '-1',
          },
          {
            label: '未提醒',
            value: '2',
          },
        ],
        timeList: [
          {
            label: '10天内',
            value: '1',
          },
          {
            label: '15天内',
            value: '2',
          },
          {
            label: '20天内',
            value: '3',
          },
          {
            label: '25天内',
            value: '4',
          },
          {
            label: '30天内',
            value: '5',
          },
        ],
        searchData: {
          remind_type: '0', //为空为0是待提醒，为1是已到期
          search: '', //会员名称或手机号码
          search2: '', //项目名称
          service_tid: '', //项目分类 id
          remind_status: '', //提醒状态 -1已提醒 2是未提醒
          day: '', //距离下次时间
          sid: '', //门店id，默认是全部门店
          p: 1,
          page: 10,
          count: 0,
        },
        data: {},
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
        console.log('data', this.data)
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
    },
  }
</script>

<style lang="less" scoped>
  .NotRemindServiceList {
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
      .bt {
        color: #1298e6;
        margin-right: 20px;
        cursor: pointer;
      }

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
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
