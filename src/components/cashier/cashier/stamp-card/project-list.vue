<template>
  <content>
    <div class="search">
      <Input
        v-model="searchData.search"
        clearable
        enter-button
        placeholder="搜索项目名称"
        search
        style="width: 250px"
        @on-clear="search"
        @on-search="search"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>单价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" @click="select(item)">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <Page
              :current="searchData.p"
              :page-size="searchData.page"
              size="small"
              :total="searchData.count"
              @on-change="currentPage"
              @on-page-size-change="pageSizeChange"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </content>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number, Array],
        default: '1',
      },
    },
    data: function () {
      return {
        searchData: { p: 1, page: 10, count: 0 },
        formData: {},
        list: [
          {
            name: '产后修复3大项',
            price: '343',
          },
        ],
        valueData: '',
      }
    },
    watch: {},
    created() {
      this.valueData = this.value
    },
    methods: {
      select(row) {
        this.$emit('on-select', row)
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
    },
  }
</script>

<style lang="less" scoped>
  .search {
    display: flex;
    justify-content: center;
    padding: 4px 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    text-align: center;
    background: white;

    tr {
      height: 30px;
      cursor: pointer;

      th {
        background: #fdf1f6;
      }

      td {
        border: 1px solid #eeeeee;
      }

      .text {
        color: #1298e6;
        cursor: pointer;
      }
    }
  }
</style>
