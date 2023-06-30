<template>
  <div class="Checkout">
    <div class="box">
      <div class="row">
        <div class="left">本单欠款：</div>
        <div class="right">
          <h2><span style="color: #c6193e">￥3242.23</span></h2>
        </div>
      </div>
      <div class="row">
        <div class="left">支付方式：</div>
        <div class="right"></div>
      </div>
      <div class="row">
        <div class="left">积分抵扣：</div>
        <div class="right"></div>
      </div>
      <div class="row">
        <div class="left">优惠金额：</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="footer">
      <div class="row">
        <div class="print">
          <Checkbox size="small">打印小票</Checkbox>
        </div>
        <div class="bt">确认收款</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Checkout',
    components: {},
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
        },
      }
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
  .Checkout {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .left {
          width: 120px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
        }
      }
    }

    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      .row {
        display: flex;
        justify-content: center;
        align-items: center;
        .print {
        }
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
  }
</style>
