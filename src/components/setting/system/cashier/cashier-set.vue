<template>
  <div class="CashierSet">
    <div class="box">
      <div class="row">
        <div class="left">储值卡余额不足时，剩余支付部分分享受卡内折扣</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          积分允许抵现，
          <Input placeholder="积分抵用1元" style="width: 200px" />
        </div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">开单时显示其他门店员工</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">开单自动推荐支付方式</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">赠送项目计算耗卡</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">赠送的卡计算耗卡</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">退款是否降会员等级</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CashierSet',
    components: {},
    data: function () {
      return {
        switch1: false,
      }
    },
    activated() {},
    created() {},
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status)
      },
    },
  }
</script>

<style lang="less" scoped>
  .CashierSet {
    background: white;
    padding: 20px;

    .box {
      border-top: 1px solid #eeeeee;
      border-left: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;

      .row {
        height: 50px;
        display: flex;
        font-size: 12px;
        border-bottom: 1px solid #f3f3f3;
        align-items: center;

        .left {
          padding: 10px;
          flex: 1;
        }

        .right {
        }
      }
    }
  }
</style>
