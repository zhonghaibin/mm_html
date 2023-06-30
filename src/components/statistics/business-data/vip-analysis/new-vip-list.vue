<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
            style="width: 180px"
            transfer
            type="datetimerange"
            value-format="yyyy-MM-dd"
            @on-change="changeDatePicker"
            @on-clear="clearDate"
            @on-open-change="changeDatePicker"
          />
        </div>
        <div class="box">
          <Select
            v-model="type"
            clearable
            filterable
            style="width: 200px"
            transfer
          >
            <div slot="empty">未找到数据</div>
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
          <span class="text">来源渠道</span>
          <Select
            v-model="type"
            clearable
            filterable
            style="width: 200px"
            transfer
          >
            <div slot="empty">未找到数据</div>
            <Option
              v-for="item in typeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">首次到店时间:</span>
                第一次有订单的日期。
              </p>
              <p class="text">
                <span style="font-weight: bold">首次消费项目:</span>
                仅展示项目类,不展示商品和卡。
              </p>
              <p class="text">
                <span style="font-weight: bold">首次到店消费金额:</span>
                首次到店日期里产生的金额。
              </p>
              <p class="text">
                <span style="font-weight: bold">首次办卡时间:</span>
                第一次办卡的日期,不论卡种。
              </p>
              <p class="text">
                <span style="font-weight: bold">首张卡名称:</span>
                顾客办的第一张卡的卡名称。
              </p>
              <p class="text">
                <span style="font-weight: bold">首次办卡业绩:</span>
                顾客办的第一张卡产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">办卡前体验过的项目:</span>
                首次办卡前所有体验过的项目商品和券类的不算。
              </p>
              <p class="text">
                <span style="font-weight: bold">二次办卡时间:</span>
                第二次办卡的日期,不轮卡种(卡换卡不计入)。
              </p>
              <p class="text">
                <span style="font-weight: bold">二次办卡业绩:</span>
                顾客办的第二张卡产生的业绩。
              </p>
              <p class="text">
                <span style="font-weight: bold">二次办卡门店:</span>
                顾客办的第二张卡消费门店。
              </p>
              <p class="text">
                <span style="font-weight: bold">首次办卡后消费的项目:</span>
                首次办卡后所有消费过的项目,商品和券类的不算。
              </p>
            </div>
          </div>
        </Poptip>
        <div class="add-bt">占比分析</div>
        <div class="add-bt" @click="exportDataEvent">导出</div>
        <Toolbar
          :table-columns="tableColumns"
          :total-columns="totalColumns"
          @on-change="changeColumns"
        />
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
          :title="item.title"
        >
          <template #default="{ row }" v-if="item.key === 'time'">
            <div>{{ row.time }}</div>
            <div>{{ row.tel }}</div>
            <div>卡号：{{ row.tel }}</div>
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
  import SelectShop from '@/components/form/select-shop'
  import Toolbar from '@/components/toolbar'
  export default {
    name: 'NewVipList',
    components: { Toolbar, SelectShop },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '张三',
            1: '158204512124',
            2: '测试测试',
            3: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '会员信息',
            key: '0',
            fixed: 'left',
            width: 160,
          },
          {
            title: '所属门店',
            key: '1',
            width: 120,
          },
          {
            title: '首次到店时间',
            key: '2',
            width: 120,
          },
          {
            title: '首次到店门店',
            key: '3',
            width: 120,
          },
          {
            title: '首次消费项目',
            key: '4',
            width: 120,
          },
          {
            title: '首次到店消费金额',
            key: '5',
            width: 120,
          },
          {
            title: '首次办卡时间',
            key: '6',
            width: 120,
          },
          {
            title: '首次办卡门店',
            key: '7',
            width: 120,
          },
          {
            title: '首张卡名称',
            key: '8',
            width: 120,
          },
          {
            title: '首次办卡金额',
            key: '9',
            width: 120,
          },
          {
            title: '办卡前体验过的项目',
            key: '10',
            width: 120,
          },
        ],
        totalColumns: [
          {
            title: '会员信息',
            key: '0',
            fixed: 'left',
          },
          {
            title: '所属门店',
            key: '1',
          },
          {
            title: '首次到店时间',
            key: '2',
          },
          {
            title: '首次到店门店',
            key: '3',
          },
          {
            title: '首次消费项目',
            key: '4',
          },
          {
            title: '首次到店消费金额',
            key: '5',
          },
          {
            title: '首次办卡时间',
            key: '6',
          },
          {
            title: '首次办卡门店',
            key: '7',
          },
          {
            title: '首张卡名称',
            key: '8',
          },
          {
            title: '首次办卡金额',
            key: '9',
          },
          {
            title: '办卡前体验过的项目',
            key: '10',
          },
          {
            title: '来源渠道',
            key: '11',
          },
        ],
        typeList: [
          {
            label: '首次到店',
            value: '1',
          },
          {
            label: '2次到店',
            value: '2',
          },
        ],
        type: '1',
        list: [
          {
            info: 1,
          },
        ],
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
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - (60 + 40 + 26 + 34 + 52) - 80
      },
      changeColumns(tableColumns) {
        this.tableColumns = tableColumns
      },
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

    .checkbox-bt {
      padding: 0;
    }

    .explain {
      border: 1px solid #e1e1e1;
      padding: 0 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      height: 32px;
      line-height: 32px;
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
