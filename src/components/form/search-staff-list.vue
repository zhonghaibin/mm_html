<template>
  <div class="SearchStaffList">
    <Input
      v-model="searchData.search"
      clearable
      enter-button
      placeholder="可搜索员工姓名"
      size="small"
      style="width: 100px"
      @on-change="search"
      @on-clear="search"
    />
    <div v-show="show" class="list">
      <Table
        :columns="columns"
        :data="list"
        :loading="loading"
        size="small"
        @on-row-click="onGroupRowClick"
      />
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
    props: {
      value: {
        type: [String, Number, Array],
        default: '',
      },
    },
    data: function () {
      return {
        loading: false,
        list: [],
        columns: [
          {
            title: '部门',
            key: 'name',
          },
          {
            title: '姓名',
            key: 'name',
          },
        ],
        searchData: {
          search: '',
          p: 1,
          page: 10,
          count: 0,
        },
        valueData: '',
        show: false,
      }
    },
    watch: {},
    created() {
      this.valueData = this.value
    },
    methods: {
      onGroupRowClick(row) {
        this.$emit('on-row-click', row)
        this.show = false
      },
      selectValue(id) {
        this.$emit('input', id)
      },
      clearValue() {
        this.$emit('input', '')
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
      async getList() {
        if (!this.searchData.search) {
          this.show = false
          this.list = []
          this.searchData.count = 0
        } else {
          this.loading = true
          this.loading = false
          this.list = []
          if (this.list.length > 0) {
            this.show = true
          }
          this.searchData.count = Number(0)
          this.searchData.p = Number(1)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .SearchStaffList {
    position: relative;

    .list {
      width: 400px;
      background: #fff;
      top: 40px;
      left: 0;
      position: absolute;
      z-index: 1000;
      border: 1px solid #f4b1ce;
      padding: 10px;
      border-radius: 8px;

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }
  }
</style>
