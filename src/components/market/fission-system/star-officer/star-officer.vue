<template>
  <div class="StarOfficer">
    <div class="box">
      <div class="row">
        <div class="left">姓名</div>
        <div class="right">
          <Input placeholder="请输入姓名" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">手机号</div>
        <div class="right">
          <Input placeholder="请输入手机号" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">等级</div>
        <div class="right">
          <Input placeholder="请输入等级" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">投入金额</div>
        <div class="right">
          <Input placeholder="请输入金额" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">分红百分比</div>
        <div class="right">
          <Input placeholder="请输入分红百分比" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">银行卡号</div>
        <div class="right">
          <Input placeholder="请输入银行卡号" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">店员百分比</div>
        <div class="right">
          <Input placeholder="请输入百分比" style="width: 200px" />
          <p style="color: red">
            填写总分红百分比里面的百分 比如:
            <br />
            总分红10%,店员百分比70%,店员产生的分红1000元,给店员700元
          </p>
        </div>
      </div>
      <div class="row">
        <div class="left">身份证到期时间</div>
        <div class="right">
          <Input placeholder="请输入百分比" style="width: 200px" />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StarOfficer',
    components: {},
    data: function () {
      return {
        tag_type_list: [],
        tag_type: '',
        color: '',
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .StarOfficer {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 20px 0;
        flex: 1;

        .left {
          width: 120px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
          flex: 1;
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
