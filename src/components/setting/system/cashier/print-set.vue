<template>
  <div class="PrintSet">
    <div class="header">飞蛾打印机设置</div>
    <div class="box">
      <div class="row">
        <div class="left">打印机编号</div>
        <div class="center">
          <Input placeholder="请输入打印机编号" style="width: 280px" />
        </div>
        <div class="right">打印机编号可在打印机底部获取</div>
      </div>
      <div class="row">
        <div class="left">打印机key</div>
        <div class="center">
          <Input placeholder="请输入打印机key" style="width: 280px" />
        </div>
        <div class="right">打印机密钥可在打印机底部获取</div>
      </div>
      <div class="row">
        <div class="left">是否开启</div>
        <div class="center">
          <i-switch
            v-model="switch1"
            style="margin-right: 10px"
            @on-change="change"
          />
        </div>
        <div class="right">此设置开启后,收银设置里的普通打印机将自动关闭</div>
      </div>
      <div class="row">
        <div class="left"></div>
        <div class="center">
          <div class="bt">保存</div>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrintSet',
    components: {},
    data: function () {
      return { switch1: false }
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
  .PrintSet {
    background: white;

    .header {
      font-size: 14px;
      font-weight: bold;
      text-indent: 1em;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .box {
      margin: 100px auto;
      width: 700px;

      .row {
        display: flex;
        height: 40px;
        align-items: center;
        font-size: 14px;
        margin: 20px 0;

        .left {
          width: 80px;
          text-align: center;
        }

        .center {
          width: 280px;

          .bt {
            margin: 0 auto;
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

        .right {
          padding-left: 10px;
          flex: 1;
          color: #adadad;
        }
      }
    }
  }
</style>
