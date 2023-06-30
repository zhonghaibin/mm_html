<template>
  <div class="SmsRecharge">
    <div class="box">
      <div class="row">
        <div class="sms">
          <div class="t">
            <div class="l">
              <img :src="smsUrl" />
            </div>
            <div class="r">
              <div class="title">当前剩余短信条数</div>
              <div class="number">42343</div>
            </div>
          </div>
          <div class="b">
            <Icon
              style="font-size: 20px; color: #3c7a89"
              type="md-information-circle"
            />
            请用支付宝/微信扫码,选择合适的套餐进行购买,支持在线支付
          </div>
        </div>
      </div>
      <div class="row">
        <div class="list">
          <div class="cell">
            <div class="content">
              <div class="title">1000条短信包</div>
              <div class="pay">￥60</div>
            </div>
            <div class="bottom">立即支付</div>
          </div>
          <div class="cell">
            <div class="content">
              <div class="title">1000条短信包</div>
              <div class="pay">￥60</div>
            </div>
            <div class="bottom">立即支付</div>
          </div>
          <div class="cell">
            <div class="content">
              <div class="title">1000条短信包</div>
              <div class="pay">￥60</div>
            </div>
            <div class="bottom">立即支付</div>
          </div>
          <div class="cell">
            <div class="content">
              <div class="title">1000条短信包</div>
              <div class="pay">￥60</div>
            </div>
            <div class="bottom">立即支付</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div
        class="add-bt"
        @click="showModal('短信充值记录', 'SmsRechargeRecord')"
      >
        查看短信充值记录
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <SmsRechargeRecord v-if="modalShow('SmsRechargeRecord')" />
    </Modal>
  </div>
</template>

<script>
  import SmsRechargeRecord from '@/components/market/sms-market/sms-recharge/sms-recharge-record'
  export default {
    name: 'SmsRecharge',
    components: { SmsRechargeRecord },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        smsUrl: require('../../../assets/market/sms-red.png'),
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .SmsRecharge {
    .box {
      .row {
        margin-top: 20px;

        .sms {
          width: 480px;
          margin: 0 auto;

          .t {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;

            .l {
              display: flex;
              justify-content: center;
              padding: 0 10px;
            }

            .r {
              .title {
                font-size: 16px;
              }

              .number {
                color: #931062;
                font-size: 18px;
              }
            }
          }

          .b {
            padding: 6px;
            background: #eef3f4;
            text-align: center;
            font-size: 12px;
          }
        }

        .list {
          display: flex;
          justify-content: space-between;
          margin: 0 auto;

          .cell {
            width: 240px;
            background: #eef3f4;

            .content {
              height: 380px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .title {
                padding: 4px;
                font-size: 18px;
              }

              .pay {
                padding: 4px;
                color: #931062;
                font-size: 16px;
              }
            }

            .bottom {
              line-height: 40px;
              height: 40px;
              background: #3c7a89;
              color: white;
              text-align: center;
              cursor: pointer;
              font-size: 14px;
            }
          }
        }
      }
    }

    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;

      .add-bt {
        text-align: center;
        color: white;
        margin-right: 20px;
        cursor: pointer;
        background: #f19ec2;
        padding: 6px 14px;
        border-radius: 4px;
      }
    }
  }
</style>
