<template>
  <div class="VipConsumptionRecord">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">时间</span>
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
          <span class="text">消费类型</span>
          <Select v-model="searchData.type" style="width: 200px" transfer>
            <Option
              v-for="item in typeList"
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
            placeholder="服务人员/消费内容"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
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
        >
          <template #default="{ row }" v-if="item.title === '服务/销售人员'">
            <span v-for="(val, key) in row.staff" :key="key">
              {{ val }}
            </span>
          </template>
          <template #default="{ row }" v-else-if="item.title === '消费内容'">
            <span v-for="(val, key) in row.content" :key="key">
              {{ val }}
            </span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt">查看</span>
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
  </div>
</template>

<script>
  export default {
    name: 'VipConsumptionRecord',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 400,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '消费时间',
            key: 'time',
            width: '200px',
          },
          {
            title: '消费门店',
            key: 'shop_name',
          },
          {
            title: '服务/销售人员',
            key: '1',
          },
          {
            title: '消费类型',
            key: 'title',
          },
          {
            title: '消费内容',
            key: '2',
          },
          {
            title: '消费金额',
            key: 'total',
          },
        ],
        typeList: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '收银',
          },
          {
            value: '2',
            label: '套餐',
          },
          {
            value: '3',
            label: '充值',
          },
          {
            value: '4',
            label: '退款',
          },
        ],
        searchData: {
          search: '',
          start: '',
          end: '',
          vid: this.memberInfo.id,
          type: '',
          is_check: '',
          p: 1,
          page: 10,
        },
      }
    },
    created() {
      this.search()
    },
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
  .VipConsumptionRecord {
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
    }

    .list {
      margin-top: 10px;
    }

    .page {
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
  }
</style>
