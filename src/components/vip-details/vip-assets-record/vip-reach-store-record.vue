<template>
  <div class="VipReachStoreRecord">
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
          <span class="text">服务老师</span>
          <Select v-model="teacher" style="width: 200px" transfer>
            <Option
              v-for="item in teacher_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <Input
            enter-button
            placeholder="消费内容"
            search
            style="width: 250px"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="exportDataEvent">导出</div>
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
  </div>
</template>

<script>
  export default {
    name: 'VipReachStoreRecord',
    data: function () {
      return {
        loading: false,
        tableHeight: 400,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        searchData: {
          start_time: '',
          end_time: '',
          p: 1,
          page: 10,
          count: 0,
        },
        tableColumns: [
          {
            title: '到店日期',
            key: 'name',
            width: '200px',
          },
          {
            title: '所到门店',
            key: 'username',
          },
          {
            title: '服务老师',
            key: 'money',
          },
          {
            title: '消费内容',
            key: 'count',
          },
          {
            title: '消费金额',
            key: 'price',
          },
        ],
        teacher: '0',
        teacher_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '老师1',
          },
          {
            value: '2',
            label: '老师2',
          },
        ],
      }
    },
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
      exportDataEvent() {
        setTimeout(() => {
          const list = []
          this.$refs.xTable.exportData({
            filename: '',
            type: 'csv',
            isHeader: true,
            isFooter: true,
            data: list,
          })
        }, 100)
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipReachStoreRecord {
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
      margin-right: 20px;
    }
  }
</style>
