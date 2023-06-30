<template>
  <div class="box">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">调出门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">调入门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">经办人</span>
          <SelectStaff v-model="searchData.sid" @on-select="search" />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('选择商品', 'GoodsList')">
          选择商品
        </div>
      </div>
    </div>

    <div class="list">
      <table>
        <thead>
          <tr>
            <td class="color">商品编号</td>
            <td class="color">商品名称</td>
            <td class="color">单位</td>
            <td class="color">品牌</td>
            <td class="color">当前库存</td>
            <td class="color" style="width: 120px">调拨数量</td>
            <td class="color">调拨单价</td>
            <td class="color">小计</td>
            <td class="color" style="width: 140px">备注</td>
            <td class="color">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>￥0</td>
            <td>￥0</td>
            <td>0</td>
            <td>0</td>
            <td><Input placeholder="" /></td>
            <td>￥0</td>
            <td>-￥0</td>
            <td><Input placeholder="" /></td>
            <td>
              <div class="bt">删除</div>
            </td>
          </tr>
          <tr>
            <td>合计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>2</td>
            <td></td>
            <td>￥0</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">制单人:王五</td>
            <td colspan="2">调拨单号:DB-2022052200001</td>
            <td colspan="6">
              备注:
              <Input placeholder="" style="width: 200px" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="3">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <Checkbox>打印调拨单</Checkbox>
                <div class="add-bt" style="width: 100px; float: right">
                  提交
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <GoodsList v-if="modalShow('GoodsList')" />
    </Modal>
  </div>
</template>

<script>
  import GoodsList from '@/components/inventory/goods-list'
  import SelectShop from '@/components/form/select-shop'
  import SelectStaff from '@/components/form/select-staff'

  export default {
    name: 'PutStorage',
    components: { SelectStaff, SelectShop, GoodsList },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
        },
        list: [
          {
            info: 1,
          },
        ],
        searchData: { sid: '', search: '', start: '', end: '' },
      }
    },

    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.modal.width = window.innerWidth - 200
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
        this.search()
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
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          display: flex;
          align-items: center;
          margin-right: 20px;

          .text {
            font-weight: bold;
            margin: 0 5px;
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

    .color {
      background: #fdeff5;
    }

    .list {
      margin-top: 10px;
      border-top: 1px solid #eeeeee;
      padding: 16px;

      table {
        text-align: center;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        tr {
          td {
            height: 40px;
            border: 1px solid #f8f8f8;

            .text {
              color: #1298e6;
              cursor: pointer;
            }
          }
        }
      }

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .add-bt {
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 0 14px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
</style>
