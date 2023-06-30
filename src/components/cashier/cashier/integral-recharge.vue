<template>
  <div class="IntegralRecharge">
    <div ref="content" class="content">
      <div class="list">
        <div class="header">
          <div class="cell title">现有积分</div>
          <div class="cell title">充值积分</div>
          <div class="cell title">支付方式</div>
        </div>
        <div class="item">
          <div class="item-left">
            <div class="row">
              <div class="cell row-center"><h3>骨盆修复</h3></div>
              <div class="cell row-center">
                <Input size="small" style="width: 200px; margin: 0 auto">
                  <span slot="append">积分</span>
                </Input>
              </div>
              <div class="cell row-center">应收款： ￥324234</div>
            </div>
            <div class="row">
              <div class="staff-row">
                <StaffPerformance title="充值人员" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="footer" class="footer">
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
  import StaffPerformance from '@/components/cashier/staff-performance'
  export default {
    name: 'IntegralRecharge',
    components: { StaffPerformance },
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
        formData: {},
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
      setHeight() {
        let height = window.innerHeight - this.$refs.footer.offsetHeight - 330
        this.$refs.content.style.height = height + 'px'
      },
    },
  }
</script>

<style lang="less" scoped>
  .IntegralRecharge {
    position: relative;
    background: white;
    padding: 10px;

    .content {
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
              .row-center {
                flex: 1;
                justify-content: center;
              }
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
