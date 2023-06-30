<template>
  <div class="package">
    <div ref="content" class="content">
      <div class="list">
        <div class="header">
          <div class="cell title">次卡名称</div>
          <div class="cell title">售价</div>
          <div class="cell title">卡内容</div>
          <div class="cell title">时限</div>
          <div class="cell title">支付方式</div>
          <div style="width: 40px"></div>
        </div>
        <div class="item">
          <div class="item-left">
            <div class="row">
              <div class="cell row-center"><h3>骨盆修复</h3></div>
              <div class="cell row-center">￥2324</div>
              <div class="cell row-center">
                <div class="row-cell">
                  <div class="left-cell">
                    <div>骨盆修复*10</div>
                    <div>骨盆修复*10</div>
                  </div>
                  <div class="right-cell">
                    <Icon class="icon" type="ios-create-outline" />
                  </div>
                </div>
              </div>
              <div class="cell row-center">
                <div class="row-cell">
                  <div class="left-cell">
                    <div>永久有效</div>
                  </div>
                  <div class="right-cell">
                    <Icon class="icon" type="ios-create-outline" />
                  </div>
                </div>
              </div>
              <div class="cell row-center">应收款： ￥324234</div>
            </div>
            <div class="row">
              <div class="staff-row">
                <GiveList />
                <StaffPerformance title="充值人员" />
              </div>
              <div></div>
              <div></div>
              <div class="pay-type-row">
                <table>
                  <tr v-for="(item, index) in formData.payList" :key="index">
                    <td>{{ item.name }}</td>
                    <td>
                      <Input
                        v-model="item.value"
                        placeholder=""
                        size="small"
                        style="min-width: 200px"
                      />
                    </td>
                    <td>
                      <Icon
                        class="icon"
                        type="ios-close-circle"
                        @click="delRow(index)"
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div></div>
            </div>
          </div>
          <div class="item-right">
            <Icon
              style="font-size: 24px; color: #f19ec2"
              type="ios-close-circle-outline"
              @click="goBack"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <div class="cell">
          <Checkbox>补单</Checkbox>
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
          <div class="add-bt color">确认收款</div>
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
    />
  </div>
</template>

<script>
  import GiveList from '@/components/cashier/give-list'
  import StaffPerformance from '@/components/cashier/staff-performance'
  export default {
    name: 'Package',
    components: { GiveList, StaffPerformance },
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
        data: { staffList: [{}] },
        formData: {
          payList: [],
        },
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    destroyed() {},
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.width = 1000
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      select(data) {
        this.modal.show = false
        this.formData.payList = data
      },
      delRow(index) {
        this.formData.payList.splice(index, 1)
      },
      addStaff(item) {
        item.staffList.push({})
      },
      delStaff(index, item) {
        item.staffList.splice(index, 1)
      },
      setHeight() {
        let height = window.innerHeight - 414
        this.$refs.content.style.height = height + 'px'
      },
      goBack() {
        this.$emit('go-back')
      },
    },
  }
</script>

<style lang="less" scoped>
  .package {
    position: relative;
    background: white;

    .content {
      padding: 10px;
      display: flex;
      overflow: auto;
      justify-content: space-between;

      .list {
        padding-bottom: 70px;
        width: 100%;

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
            .row {
              padding: 6px;
              text-align: center;
              display: flex;
              justify-content: space-between;
              .staff-row {
              }
              .pay-type-row {
                .icon {
                  font-size: 18px;
                  color: #f19ec2;
                  cursor: pointer;
                }
              }
              .cell {
                flex: 1;
                display: flex;
                align-items: center;
              }

              .row-center {
                justify-content: center;
                .row-cell {
                  display: flex;
                  align-items: center;
                  .left-cell {
                  }
                  .right-cell {
                    padding: 0 10px;
                    .icon {
                      font-size: 20px;
                      color: #1298e6;
                      cursor: pointer;
                    }
                  }
                }
              }

              .row-left {
                text-align: left;
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
    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
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
