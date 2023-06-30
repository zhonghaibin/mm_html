<template>
  <div class="VipGiftRecord">
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
        <!--        <div class="box">-->
        <!--          <span class="text">赠送来源</span>-->
        <!--          <Select v-model="gift_source" style="width: 200px" transfer>-->
        <!--            <Option-->
        <!--              v-for="project in gift_source_list"-->
        <!--              :key="project.value"-->
        <!--              :value="project.value"-->
        <!--            >-->
        <!--              {{ project.label }}-->
        <!--            </Option>-->
        <!--          </Select>-->
        <!--        </div>-->
        <div class="box">
          <span class="text">赠送类型</span>
          <Select v-model="searchData.type" style="width: 200px" transfer>
            <Option
              v-for="item in giftTypeList"
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
            placeholder="可搜索赠送内容"
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
  </div>
</template>

<script>
  export default {
    name: 'VipGiftRecord',
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
        tableData: [],
        tableColumns: [
          {
            title: '获赠时间',
            key: 'time',
          },
          {
            title: '赠送门店',
            key: 'shop_name',
          },
          {
            title: '赠送来源',
            key: 'card_name',
          },
          {
            title: '赠送类型',
            key: 'type_name',
          },
          {
            title: '赠送内容',
            key: 'data_name',
          },
        ],
        gift_source: '0',
        gift_source_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '随手赠送',
          },
          {
            value: '2',
            label: '手动赠送',
          },
        ],
        giftTypeList: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '商品',
          },
          {
            value: '2',
            label: '项目',
          },
        ],
        searchData: {
          search: '',
          start: '',
          end: '',
          type: '',
          vip_id: this.memberInfo.vip_id,
          p: 1,
          page: 10,
          count: 0,
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
  .VipGiftRecord {
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
