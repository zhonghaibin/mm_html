<template>
  <div class="StockList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">出入库类型</span>
          <SelectStockOutType v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">品牌</span>
          <SelectBrand v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
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
          <Input
            v-model="searchData.search"
            enter-button
            placeholder="可搜索商品名称/编号"
            search
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="exportDataEvent">导出</div>
      </div>
    </div>
    <div ref="content" class="content">
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
          <vxe-column title="操作" width="200">
            <template>
              <span class="bt" @click="showModal('入库详情', 'InStockDetails')">
                查看详情
              </span>
              <span
                class="bt"
                @click="showModal('出库单详情', 'OutStockDetails')"
              >
                查看详情
              </span>
              <br />
              <span class="bt">出库撤销</span>
            </template>
          </vxe-column>
        </vxe-table>
        <div class="page">
          <Page
            :current="searchData.p"
            :page-size="searchData.page"
            size="small"
            :total="searchData.count"
            transfer
            @on-change="currentPage"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <InStockDetails v-if="modalShow('InStockDetails')" />
      <OutStockDetails v-if="modalShow('OutStockDetails')" />
    </Modal>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectStockOutType from '@/components/form/select-stock-out-type'
  import SelectBrand from '@/components/form/select-brand'
  import InStockDetails from '@/components/inventory/overview/inventory-warning-list/in-stock-details'
  import OutStockDetails from '@/components/inventory/overview/inventory-warning-list/out-stock-details'

  export default {
    name: 'StockList',
    components: {
      OutStockDetails,
      InStockDetails,
      SelectBrand,
      SelectStockOutType,
      SelectShop,
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
            title: '单号',
            key: '0',
          },
          {
            title: '仓库/门店',
            key: '1',
          },
          {
            title: '出入库类型',
            key: '2',
          },

          {
            title: '商品编号',
            key: '3',
          },
          {
            title: '商品名称',
            key: '4',
          },
          {
            title: '品牌',
            key: '5',
          },
          {
            title: '库存变动',
            key: '6',
          },
          {
            title: '操作日期',
            key: '7',
          },
          {
            title: '操作人 ',
            key: '8',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 80,
        },
        searchData: { sid: '', search: '', month: '' },
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
  .StockList {
    .search {
      display: flex;
      padding: 10px 0;
      background: white;

      .left {
        flex: 1;
        display: flex;

        .box {
          display: flex;
          margin-right: 20px;
          align-items: center;

          .text {
            font-weight: bold;
            margin: 0 5px;
            display: block;
            padding: 0 2px;
            width: 100%;
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
      margin-top: 20px;
      background: white;

      .list {
        margin-top: 20px;

        .page {
          height: 40px;
          padding: 8px 0;
          text-align: center;
          background: white;
        }
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .add-bt {
      margin-right: 10px;
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
