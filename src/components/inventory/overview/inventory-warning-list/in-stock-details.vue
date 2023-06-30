<template>
  <div class="InStockDetails">
    <div class="header">
      <div class="left">
        <div class="cell">入库日期:2022/5/5</div>
        <div class="cell">经办人:王五</div>
        <div class="cell">商品供应商:广州唯爱</div>
        <div class="cell">备注:</div>
      </div>
      <div class="right"><div class="add-bt">打印</div></div>
    </div>

    <div ref="content" class="content">
      <div class="list-top">
        <div class="cell">共2款商品</div>
        <div class="cell">合计: ¥1000.00</div>
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
            size="small"
            :total="searchData.count"
            transfer
            @on-change="currentPage"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cell">单号:CG-20220510990001</div>
      <div class="cell">操作人:王五</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InStockDetails',
    components: {},
    props: {},
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
            title: '出库类型',
            key: '1',
          },

          {
            title: '商品编号',
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
            title: '商品供应商',
            key: '5',
          },
          {
            title: '批号',
            key: '6',
          },
          {
            title: '单位 ',
            key: '7',
          },
          {
            title: '成本价',
            key: '8',
          },
          {
            title: '入库数量 ',
            key: '9',
          },
          {
            title: '成本总价 ',
            key: '10',
          },
        ],
        searchData: { sid: '', p: '', page: '' },
      }
    },
    computed: {},
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
    },
    methods: {
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {},
      save() {},
      setHeight() {},
    },
  }
</script>

<style lang="less" scoped>
  .InStockDetails {
    .header {
      display: flex;
      align-items: center;
      font-weight: bold;
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        .cell {
          padding: 2px 6px;
        }
      }
      .right {
      }
    }
    .content {
      background: white;
      .list-top {
        display: flex;
        align-items: center;
        font-weight: bold;
        background: white;
        height: 36px;
        line-height: 36px;
        .cell {
          padding: 2px 6px;
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
    }
    .footer {
      display: flex;
      align-items: center;
      font-weight: bold;
      .cell {
        padding: 2px 6px;
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
