<template>
  <div class="PackageCardList">
    <div class="header">
      <div class="left">
        <div class="h-cel title">套餐次卡营收</div>
      </div>
      <div class="right">
        <div class="bt">
          <RadioGroup v-model="type" size="small" type="button">
            <Radio
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
            />
          </RadioGroup>
        </div>
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
    name: 'PackageCardList',
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
            title: '排名',
            key: '0',
          },
          {
            title: '类别',
            key: '1',
          },
          {
            title: '产值',
            key: '2',
          },
          {
            title: '销量',
            key: '3',
          },
          {
            title: '占比',
            key: '4',
          },
        ],
        type: '1',
        typeList: [
          {
            label: '套餐大类',
            value: '1',
          },
          {
            label: '具体套餐',
            value: '2',
          },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
      }
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
    },
  }
</script>
<style lang="less" scoped>
  .PackageCardList {
    border: 1px solid #eeeeee;
    border-radius: 6px;
    height: 604px;
    background: white;

    .header {
      display: flex;
      height: 40px;
      padding: 0 10px;

      .left {
        display: flex;
        align-items: center;
        flex: 1;

        .title {
          font-weight: bold;
        }

        .h-cel {
          padding: 0 4px;
          float: left;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          padding: 5px;
          color: #1298e6;
          cursor: pointer;
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
  }
</style>
