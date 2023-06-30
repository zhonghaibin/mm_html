<template>
  <div class="SearchVipList">
    <Input
      v-model="searchData.search"
      clearable
      enter-button
      placeholder="可搜索会员姓名/电话/卡号 "
      search
      style="width: 220px"
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
            title: '会员信息',
            key: 'name',
            render: (h, params) => {
              let html = h('div', [
                // 插入文本
                h(
                  'span',
                  {
                    style: {
                      display: 'block',
                    },
                  },
                  params.row.name
                ),

                h(
                  'span',
                  {
                    style: {
                      display: 'block',
                    },
                  },
                  params.row.tel
                ),
              ])
              return html
            },
          },
          {
            title: '卡余额',
            key: 'money',
          },
          {
            title: '所属门店',
            key: 'shop_name',
          },
          {
            title: '会员等级',
            key: 'type_name',
          },
          {
            title: '专属顾问',
            key: 'adviser_name',
          },
          {
            title: '专属产康师',
            key: 'dispose_staff_name',
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
          console.log(this.searchData)
          this.loading = true
          const { data } = { data: { list: [{ name: 11 }] } }
          this.loading = false
          this.list = data.list
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
  .SearchVipList {
    position: relative;

    .list {
      width: 750px;
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
