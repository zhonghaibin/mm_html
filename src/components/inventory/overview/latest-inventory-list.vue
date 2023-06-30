<template>
  <div class="LatestInventoryList">
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
          />
          <vxe-column title="操作" width="120">
            <template>
              <span class="bt">查看详情</span>
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
    />
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectStockOutType from '@/components/form/select-stock-out-type'

  export default {
    name: 'LatestInventoryList',
    components: { SelectStockOutType, SelectShop },

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
            key: '0',
          },
          {
            title: '商品分类',
            key: '1',
          },
          {
            title: '商品名称',
            key: '2',
          },
          {
            title: '商品编号',
            key: '3',
          },
          {
            title: '出入库类型',
            key: '4',
          },
          {
            title: '库存变动',
            key: '5',
          },
          {
            title: '操作日期',
            key: '6',
          },
          {
            title: '经办人 ',
            key: '7',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: { sid: '', search: '', month: '' },
      }
    },
    computed: {},
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
  .LatestInventoryList {
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
