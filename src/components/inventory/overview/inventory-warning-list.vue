<template>
  <div class="InventoryWarningList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">分类</span>
          <SelectProductType
            v-model="searchData.goods_type_id"
            @on-select="search"
          />
        </div>
        <div class="box">
          <span class="text">品牌</span>
          <SelectBrand v-model="searchData.brand" @on-select="search" />
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
          :column-config="{ resizable: true }"
          :data="tableData"
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
            <template #header>
              <span v-if="item.title === '库存下限'">
                库存下限
                <Tooltip content="库存下限提示" transfer>
                  <Icon type="md-help-circle" />
                </Tooltip>
              </span>
              <span v-else-if="item.title === '预警值'">
                预警值
                <Tooltip content="预警值提示" transfer>
                  <Icon type="md-help-circle" />
                </Tooltip>
              </span>
              <span v-else>{{ item.title }}</span>
            </template>
          </vxe-column>
          <vxe-column title="操作" width="120">
            <template #default="{ row }">
              <span
                class="bt"
                @click="showModal('查看入库明细', 'StockList', row)"
              >
                查看入库明细
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
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <StockList v-if="modalShow('StockList')" />
    </Modal>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectProductType from '@/components/form/select-product-type'
  import SelectBrand from '@/components/form/select-brand'
  import StockList from '@/components/inventory/overview/inventory-warning-list/stock-list'

  export default {
    name: 'InventoryWarningList',
    components: { StockList, SelectBrand, SelectProductType, SelectShop },

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
            title: '仓库/门店',
            key: '1',
          },
          {
            title: '商品分类',
            key: '2',
          },
          {
            title: '商品名称',
            key: '3',
          },
          {
            title: '品牌',
            key: '4',
          },
          {
            title: '单位',
            key: '5',
          },
          {
            title: '库存数量',
            key: '6',
          },
          {
            title: '库存下限',
            key: '7',
          },
          {
            title: '预警值',
            key: '8',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 80,
        },

        list: [
          {
            info: 1,
          },
        ],
        searchData: {
          sid: '',
          goods_type_id: '',
          brand: '',
          start: '',
          end: '',
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
        this.tableHeight = window.innerHeight - 376
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
  .InventoryWarningList {
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
      .list {
        margin-top: 10px;

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
