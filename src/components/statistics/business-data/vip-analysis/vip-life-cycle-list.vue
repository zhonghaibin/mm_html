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
      </div>
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">提示:</span>
                当前模块的各类数据根据时间以及门店筛选计算展示,如筛选时间段内,会员的生命周期有所变化,取所选截止日期时的会员生命周期。
              </p>
              <p class="text">
                <span style="font-weight: bold">生命周期:</span>
                系统默认新客户、新客成交、活跃客户、沉睡客户、流失客户、结束客户,在会员设置-生命周期设置可自定义这6个生命周期的规则。
              </p>
              <p class="text">
                <span style="font-weight: bold">人数:</span>
                筛选月份后,对应生命周期的人数占比。
              </p>
              <p class="text">
                <span style="font-weight: bold">占总数:</span>
                筛选月份后,对应生命周期的会员数占会员总数的比例。
              </p>
              <p class="text">
                <span style="font-weight: bold">人数变动:</span>
                筛选月份后,环比上月的会员人数变动情况。
              </p>
            </div>
          </div>
        </Poptip>
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
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt">查看名单</span>
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
  export default {
    name: 'VipLifeCycleList',
    components: { SelectShop },
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
            title: '生命周期',
            key: 'suname',
          },
          {
            title: '会员数',
            key: 'name',
          },
          {
            title: '占总人数',
            key: 'info',
          },
          {
            title: '人员变动',
            key: 'info',
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
        this.tableHeight = window.innerHeight - 286
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
