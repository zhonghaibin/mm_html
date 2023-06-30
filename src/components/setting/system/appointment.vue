<template>
  <div class="Appointment">
    <div class="box">
      <div class="row">
        <div class="left">微信预约（开启后，会员可在微信公众号进行预约）</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">开启专属产康师（开启后，可设置会员专属产康师）</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          开启会员限制（开启后，需同时开启专属产康师功能，员工只能管理自己的会员）
        </div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          开启预约限制（开启后，会员可同一时间预约多个服务人员）
        </div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          开启部门限制（开启后，预约项目时，只显示该项目优先部门员工）
        </div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">会员是否能取消微信预约</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
      <div class="row">
        <div class="left">预约免审设置</div>
        <div class="right">
          <i-switch v-model="switch1" @on-change="change" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Appointment',
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
  .Appointment {
    background: white;
    padding: 20px;

    .box {
      border-top: 1px solid #eeeeee;
      border-left: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;

      .row {
        height: 40px;
        padding: 4px 10px;
        display: flex;
        font-size: 12px;
        border-bottom: 1px solid #ececec;
        align-items: center;

        .left {
          flex: 1;
        }

        .right {
        }
      }
    }
  }
</style>
