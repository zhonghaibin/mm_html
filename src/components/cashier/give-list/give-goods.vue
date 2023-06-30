<template>
  <div class="GiveGoods">
    <div ref="content" class="content">
      <div class="left">
        <table>
          <tbody>
            <tr>
              <td>
                <Input
                  v-model="searchData.search2"
                  clearable
                  enter-button
                  placeholder="输入商品名称"
                  search
                  @on-clear="search"
                  @on-search="search"
                />
              </td>
            </tr>
            <tr>
              <td style="background: #fdf1f6">商品</td>
            </tr>
            <tr>
              <td style="padding: 0 10px; text-align: left">
                <Tree
                  :data="list"
                  show-checkbox
                  @on-check-change="checkChange"
                  @on-select-change="selectChange"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right">
        <div class="list-top">
          <div>
            <span class="black">已选内容</span>
            <span class="grey">（0）</span>
          </div>
          <div class="bt-left"></div>
          <div class="bt-right"></div>
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
            size="mini"
          >
            <vxe-column field="name" title="商品名称" />
            <vxe-column field="count" title="商品数量">
              <template #default="{ row }">
                <InputNumber v-model="row.count" :min="1" size="small" />
              </template>
            </vxe-column>
            <vxe-column title="操作" width="120">
              <template #default="{ row }">
                <div class="bt" @click="delRow(index, row)">删除</div>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GiveGoods',
    components: {},
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            name: '商品',
            count: 10,
          },
        ],
        list: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1',
                  },
                  {
                    title: 'leaf 1-1-2',
                  },
                ],
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1',
                  },
                  {
                    title: 'leaf 1-2-1',
                  },
                ],
              },
            ],
          },
        ],
        searchData: { p: 1, page: 10, count: 0 },
        formData: {},
      }
    },
    computed: {},
    activated() {},
    created() {},
    destroyed() {},
    methods: {
      checkChange(row) {
        console.log(row, 'row11')
      },
      selectChange(row) {
        console.log(row, 'row22')
      },
      addRow(row) {
        console.log(row, 'row33')
        this.data.push({
          name: '123',
          count: 0,
        })
      },
      delRow(index) {
        this.data.splice(index, 1)
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
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .GiveGoods {
    position: relative;
    background: white;
    padding: 10px;

    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      text-align: center;
      background: white;

      tr {
        height: 40px;
        cursor: pointer;

        td {
        }

        .text {
          color: #1298e6;
          cursor: pointer;
        }
      }
    }

    .content {
      display: flex;
      overflow: auto;

      justify-content: space-between;

      .left {
        min-width: 260px;
      }

      .right {
        margin-left: 10px;
        flex: 1;

        .list-top {
          padding: 10px;
          font-size: 12px;
          display: flex;
          align-items: center;

          .black {
            color: black;
            font-weight: bold;
          }

          .grey {
            color: #d2cfcf;
            font-weight: bold;
          }

          .bt-left {
            flex: 1;

            .bt {
              margin-left: 16px;
            }
          }

          .bt-right {
            .bt {
              margin-left: auto;
            }
          }
        }

        .list {
          padding-bottom: 70px;
          width: 100%;

          .bt {
            color: #1298e6;
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;

      .bt {
        margin-right: 10px;
        width: 80px;
        text-align: center;
        background: #f19ec2;
        border-radius: 2px;
        color: white;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
</style>
