<template>
  <div class="box">
    <div class="list">
      <table>
        <tr>
          <th style="width: 200px">短信类型</th>
          <th colspan="2">设置项</th>
        </tr>
        <template v-for="(item, index) in list">
          <tr v-for="(val, key) in item.shopList" :key="`${index}_${key}`">
            <td v-if="key === 0" :rowspan="item.shopList.length">
              {{ item.type }}
            </td>
            <td>
              <div
                v-for="(v, k) in val.phoneList"
                :key="`${index}_${key}_${k}`"
                class="row"
              >
                <div class="label">
                  <span v-if="k === 0">{{ val.name }}</span>
                </div>
                <div class="content">
                  <Input
                    v-model="v.phone"
                    placeholder="请输入手机号"
                    size="small"
                    style="width: 200px"
                  />
                  <Icon
                    v-if="k === 0"
                    class="bt"
                    type="md-add-circle"
                    @click="add(index, key)"
                  />
                  <Icon
                    v-else
                    class="bt"
                    type="md-remove-circle"
                    @click="delRow(index, key, k)"
                  />
                </div>
              </div>
            </td>
            <td style="width: 200px">
              <Input placeholder="" size="small" style="width: 80px" />
              :00
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MerchantRemindList',
    components: {},

    data: function () {
      return {
        loading: false,
        list: [
          {
            type: '每日财务汇总',
            shopList: [
              {
                name: '分店1',
                phoneList: [
                  {
                    phone: '',
                  },
                ],
              },
              {
                name: '分店2',
                phoneList: [
                  {
                    phone: '',
                  },
                ],
              },
            ],
          },
          {
            type: '预约通知',
            shopList: [
              {
                name: '分店1',
                phoneList: [
                  {
                    phone: '',
                  },
                ],
              },
              {
                name: '分店2',
                phoneList: [
                  {
                    phone: '',
                  },
                ],
              },
            ],
          },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
      }
    },
    activated() {},
    created() {},
    methods: {
      delRow(key1, key2, index) {
        this.list[key1].shopList[key2].phoneList.splice(index, 1)
      },
      add(key1, key2) {
        this.list[key1].shopList[key2].phoneList.push({
          phone: '',
        })
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
  .box {
    .list {
      margin-top: 10px;
      .row {
        padding: 2px;
        display: flex;
        align-items: center;
        .label {
          padding: 0 10px;
          width: 200px;
        }
        .content {
          text-align: left;
          flex: 1;
        }
        .bt {
          font-size: 16px;
          color: #f19ec2;
          cursor: pointer;
        }
      }
      table {
        border: 1px solid #dcdee2;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        text-align: center;
        background: white;
        tr {
          height: 40px;
          cursor: pointer;

          th {
            background-color: #f8f8f9;
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
