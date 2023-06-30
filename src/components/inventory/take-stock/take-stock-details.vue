<template>
  <div class="TakeStockDetails">
    <div class="header">
      <div class="left">
        <div class="cell">仓库:分店1</div>
        <div class="cell">盘点单号: PD-2022062030002</div>
        <div class="cell">盘点时间: 2022-06-2014:20</div>
        <div class="cell">经办人:蒋娟</div>
        <div class="cell">制单人:蒋娟</div>
      </div>
      <div class="right"><div class="add-bt">打印</div></div>
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
  </div>
</template>

<script>
  export default {
    name: 'TakeStockDetails',
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
            title: '商品编号',
            key: '0',
          },
          {
            title: '商品名称',
            key: '1',
          },
          {
            title: '单位 ',
            key: '2',
          },
          {
            title: '盘点前库存',
            key: '3',
          },
          {
            title: '实际盘点数量',
            key: '4',
          },
          {
            title: '盘点状态',
            key: '5',
          },
          {
            title: '备注',
            key: '6',
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
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 266
      },
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
    },
  }
</script>

<style lang="less" scoped>
  .TakeStockDetails {
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
      .list {
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
