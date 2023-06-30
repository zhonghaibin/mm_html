<template>
  <content>
    <div class="search">
      <Input
        v-model="searchData.search"
        clearable
        enter-button
        placeholder="搜索套餐次卡名称"
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
          <th>剩余次数</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in list">
          <tr :key="index">
            <td
              colspan="2"
              style="padding: 0 10px; text-align: left"
              @click="show(index, $event)"
            >
              <Icon :size="16" type="md-arrow-dropright" />
              {{ item.name }}
            </td>
          </tr>
          <tr
            v-for="(val, key) in item.children"
            :key="`${index}.${key}`"
            :ref="`children${index}`"
            style="display: none"
            @click="select(val)"
          >
            <td>{{ val.name }}</td>
            <td>{{ val.number }}</td>
          </tr>
        </template>
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
            children: [
              {
                name: '骨盆修复 1-1',
                number: 1,
              },
              {
                name: '骨盆修复 2-1',
                number: 1,
              },
            ],
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
      show(index, obj) {
        if (
          obj.currentTarget.children[0].className ===
          'ivu-icon ivu-icon-md-arrow-dropright'
        ) {
          obj.currentTarget.children[0].className =
            'ivu-icon ivu-icon-md-arrow-dropdown'
        } else {
          obj.currentTarget.children[0].className =
            'ivu-icon ivu-icon-md-arrow-dropright'
        }

        this.$refs[`children${index}`].forEach((item) => {
          if (item.style.display === 'none') {
            item.style.display = 'table-row'
          } else {
            item.style.display = 'none'
          }
        })
      },
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
