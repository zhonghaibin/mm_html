<template>
  <div class="StampCard">
    <div ref="content" class="content">
      <div class="left">
        <Tabs
          v-model="tab_index"
          name="child"
          size="small"
          @on-click="handleTabClick"
        >
          <TabPane
            v-for="item in tab_list"
            :key="item.id"
            :label="item.name"
            :name="item.name"
            tab="child"
          >
            <PackageList v-if="current(item, '套餐次卡')" @on-select="addRow" />
            <ProjectList v-if="current(item, '项目')" @on-select="addRow" />
            <GoodsList v-if="current(item, '商品')" @on-select="addRow" />
          </TabPane>
        </Tabs>
      </div>
      <div class="right">
        <div class="list">
          <div class="header">
            <div class="cell title">名称</div>
            <div class="cell title">员工</div>
            <div class="cell title">手工费</div>
            <div class="cell title">业绩</div>
            <div class="cell title">耗卡业绩</div>
            <div class="cell title">比例</div>
            <div class="cell title">单价</div>
            <div class="cell title">数量</div>
            <div class="cell title">支付金额</div>
            <div class="cell title">操作</div>
            <div style="width: 10px"></div>
          </div>
          <div v-for="(item, index) in data" :key="index" class="item">
            <div class="item-left">
              <div class="row">
                <div class="cell row-center"><h3>骨盆修复</h3></div>
                <div class="staff-box">
                  <div
                    v-for="(val, key) in item.staffList"
                    :key="key"
                    class="staff-row"
                  >
                    <div class="cell row-center">
                      <SearchStaffList />
                    </div>
                    <div class="cell row-center">
                      <Input placeholder="" size="small" style="width: 60px" />
                    </div>
                    <div class="cell row-center">
                      <Input placeholder="" size="small" style="width: 60px" />
                    </div>
                    <div class="cell row-center">
                      <Input placeholder="" size="small" style="width: 60px" />
                    </div>
                    <div class="cell row-center">
                      <Input placeholder="" size="small" style="width: 60px" />
                      <Icon
                        v-if="key === 0"
                        style="font-size: 16px; color: #00b8ec; cursor: pointer"
                        type="ios-add-circle-outline"
                        @click="addStaff(item)"
                      />
                      <Icon
                        v-else
                        style="font-size: 16px; color: #00b8ec; cursor: pointer"
                        type="ios-remove-circle-outline"
                        @click="delStaff(key, item)"
                      />
                    </div>
                  </div>
                </div>
                <div class="cell row-center">
                  <Input placeholder="" size="small" style="width: 60px" />
                </div>
                <div class="cell row-center">
                  <Input placeholder="" size="small" style="width: 60px" />
                </div>
                <div class="cell row-center">
                  小计：
                  <Input placeholder="" size="small" style="width: 60px" />
                </div>
                <div class="cell row-center">
                  <div>
                    <div>
                      <span
                        class="bt"
                        @click="showModal('选择优惠内容', 'Preferential', item)"
                      >
                        可用优惠
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding: 0 6px">
                <Tag
                  v-for="(val, key) in item.preferential"
                  :key="key"
                  closable
                  color="primary"
                  @on-close="handleClose(item, key)"
                >
                  使用： {{ val.name }} 抵扣：{{ val.value }}
                </Tag>
              </div>
            </div>
            <div class="item-right" @click="delRow(index)">X</div>
          </div>
        </div>
      </div>
    </div>

    <div ref="footer" class="footer">
      <div class="footer-left">
        <div class="cell">
          <Checkbox>补单</Checkbox>
          <DatePicker
            placeholder="请选择补单日"
            size="small"
            style="width: 120px"
            type="date"
          />
        </div>
        <div class="cell">
          流水单号
          <Input placeholder="没有则不填" size="small" style="width: 200px" />
        </div>
        <div class="cell">
          备注信息
          <Input
            placeholder="填写订单备注信息"
            size="small"
            style="width: 200px"
          />
        </div>
        <div class="cell">
          会员到店
          <Input placeholder="" size="small" style="width: 60px" />
        </div>
        <div class="cell">
          散客到店
          <Input placeholder="" size="small" style="width: 60px" />
        </div>
      </div>
      <div class="footer-right">
        <div class="money">
          还需支付:
          <span class="text">￥3033</span>
        </div>
        <div class="cell">
          <div class="add-bt color" @click="showModal('确认收款', 'Checkout')">
            确认收款
          </div>
        </div>
        <div class="cell">
          <div class="add-bt color1">挂单待结</div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <Preferential v-if="modalShow('Preferential')" @on-select="select" />
      <Checkout v-if="modalShow('Checkout')" />
    </Modal>
  </div>
</template>

<script>
  import SearchStaffList from '@/components/form/search-staff-list'
  import PackageList from '@/components/cashier/cashier/stamp-card/package-list'
  import ProjectList from '@/components/cashier/cashier/stamp-card/project-list'
  import GoodsList from '@/components/cashier/cashier/stamp-card/goods-list'
  import Preferential from '@/components/cashier/preferential'
  import Checkout from '@/components/cashier/cashier/checkout'

  export default {
    name: 'StampCard',
    components: {
      Checkout,
      PackageList,
      ProjectList,
      GoodsList,
      SearchStaffList,
      Preferential,
    },
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
        tab_index: '套餐次卡',
        tab_list: [
          { name: '套餐次卡', id: 1 },
          { name: '项目', id: 2 },
          { name: '商品', id: 3 },
        ],
        data: [],
        selectRow: {},
      }
    },

    computed: {
      current() {
        return (item, name) => {
          return name === item.name && this.tab_index === name
        }
      },
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    destroyed() {},
    methods: {
      showModal(title, type, data = {}) {
        switch (type) {
          case 'Checkout':
            this.modal.width = 600
            break
          default:
            this.modal.width = 1000
        }
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.selectRow = data
      },
      select(data) {
        this.modal.show = false
        this.selectRow.preferential = data
      },
      handleTabClick(index) {
        this.tab_index = index
      },
      handleClose(item, index) {
        item.preferential.splice(index, 1)
      },
      addRow(item) {
        console.log(item)
        this.data.push({
          staffList: [{}],
          preferential: [],
        })
      },
      delRow(index) {
        this.data.splice(index, 1)
      },
      addStaff(item) {
        item.staffList.push({})
      },
      delStaff(index, item) {
        item.staffList.splice(index, 1)
      },
      setHeight() {
        let height = window.innerHeight - this.$refs.footer.offsetHeight - 330
        this.$refs.content.style.height = height + 'px'
      },
    },
  }
</script>

<style lang="less" scoped>
  .StampCard {
    position: relative;
    background: white;
    padding: 10px;

    .content {
      display: flex;
      overflow: auto;

      justify-content: space-between;

      .left {
        width: 260px;
        border: 1px solid #eeeeee;
      }

      .right {
        margin-left: 10px;

        flex: 1;

        .list {
          padding-bottom: 70px;

          .header {
            display: flex;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #fdf1f6;

            .title {
              font-weight: bold;
            }

            .cell {
              flex: 1;
            }
          }

          .item {
            border: 1px solid #eeeeee;
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .item-left {
              flex: 1;
              .cell {
                flex: 1;
                display: flex;
                align-items: center;

                .b {
                  align-items: center;
                  display: flex;
                  justify-content: center;

                  .box1 {
                    padding: 2px;
                  }

                  .box2 {
                    padding: 2px;
                  }

                  padding: 2px;
                }
              }
              .staff-box {
                flex: 5;
                .staff-row {
                  margin-bottom: 2px;
                  display: flex;
                  flex: 1;
                }
              }
              .row {
                padding: 6px;
                text-align: center;
                display: flex;
                justify-content: center;
                font-size: 12px;
                .row-center {
                  justify-content: center;
                  .bt {
                    color: #1298e6;
                    margin-right: 20px;
                    cursor: pointer;
                  }
                }

                .row-left {
                  text-align: left;
                  margin-left: 20px;
                }
              }
            }

            .item-right {
              cursor: pointer;
              width: 40px;
            }
          }
        }
      }
    }

    .footer {
      z-index: 1000;
      display: flex;
      clear: both;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #dedede;
      left: 0;
      right: 0;
      padding: 10px 0;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);

      background: white;

      .footer-left {
        width: 70%;
        display: flex;
        align-items: center;

        .cell {
          padding: 0 10px;
        }
      }

      .footer-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;

        .money {
          flex: 1;
          font-size: 20px;

          .text {
            font-size: 24px;
            color: #f46b53;
          }
        }

        .cell {
        }
      }
    }

    .color {
      border: 1px solid #f19ec2;
      background: #f19ec2;
      color: white;
    }

    .color1 {
      background: white;
      color: #2c2c2c;
      border: 1px solid #2c2c2c;
    }

    .add-bt {
      margin-right: 20px;
      cursor: pointer;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
