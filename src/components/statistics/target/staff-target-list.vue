<template>
  <div class="StaffTargetList">
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
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
      </div>
      <div class="right">
        <div class="add-bt">批量清空</div>
        <div class="add-bt" @click="exportDataEvent">导出</div>
        <div class="add-bt">设置显示员工</div>
      </div>
    </div>
    <div ref="content" class="content">
      <div class="left">
        <div class="cell">
          <div class="title">门店月度业绩目标:</div>
          <div class="money">￥43000000.00</div>
        </div>
        <div class="cell">
          <div class="title">已设员工业绩目标合计:</div>
          <div class="money">￥43000000.00</div>
        </div>
        <div class="cell">
          <div class="title">已设员工累计完成业绩:</div>
          <div class="money">￥43000000.00</div>
          <div class="circle">
            <i-circle
              :percent="80"
              stroke-color="#f46b53"
              :stroke-width="10"
              :trail-width="10"
            >
              <span style="font-size: 24px">80%</span>
            </i-circle>
          </div>
        </div>
      </div>
      <div class="right">
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
                <span class="bt" @click="showModal('编辑目标', 'StaffTarget')">
                  编辑目标
                </span>
                <br />
                <span class="bt">详情</span>
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
              @on-change="currentPage"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <StaffTarget v-if="modalShow('StaffTarget')" />
    </Modal>
  </div>
</template>

<script>
  import StaffTarget from '@/components/statistics/target/staff-target'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'StaffTargetList',
    components: { SelectShop, StaffTarget },

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
            title: '员工',
            key: '0',
          },
          {
            title: '业绩目标',
            key: '1',
          },
          {
            title: '已完成业绩',
            key: '2',
          },
          {
            title: '业绩完成进度',
            key: '3',
          },
          {
            title: '当前应完成',
            key: '4',
          },
          {
            title: '排名',
            key: '5',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: { sid: '', start: '', end: '' },
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 300
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
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      search() {},
      save() {},
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
  .StaffTargetList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          display: flex;
          margin-right: 20px;
          align-items: center;

          .text {
            font-weight: bold;
            margin: 0 5px;
            display: block;
            padding: 0 2px;
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

    .content {
      display: flex;
      background: white;
      padding: 20px;
      border-radius: 8px;

      .left {
        border: 1px solid #d7d7d7;
        width: 240px;
        border-radius: 8px;
        padding: 0 10px;
        height: 450px;

        .cell {
          padding: 10px 0;

          .title {
            padding: 10px;
            color: #9d9d9d;
          }

          .money {
            font-weight: 500;
            font-size: 20px;
            color: black;
          }

          .circle {
            width: 120px;
            line-height: 120px;
            margin: 20px auto 0 auto;
          }
        }
      }

      .right {
        flex: 1;

        .list {
          padding-left: 20px;

          .page {
            height: 40px;
            padding: 8px 0;
            text-align: center;
            background: white;
          }
        }
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
