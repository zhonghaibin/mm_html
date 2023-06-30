<template>
  <div class="YiYe">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>姓名：</div>
        </div>
        <div class="right">
          <Input placeholder="请输入姓名" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>手机号：</div>
        </div>
        <div class="right">
          <Input placeholder="请输入手机号" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>等级：</div>
        </div>
        <div class="right">
          <SelectYiYeGrade />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>投入金额：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>分红百分比：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>银行卡号：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>店员百分比：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
          <span style="color: red">
            <br />
            填写总分红百分比里面的百分比如:总分红10%,
            <br />
            店员百分比70%,店员产生的分红1000元,给店员700元
          </span>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>身份到期时间：</div>
        </div>
        <div class="right">
          <SelectExpirationTime />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectYiYeGrade from '@/components/form/select-yi-ye-grade'
  import SelectExpirationTime from '@/components/form/select-expiration-time'
  export default {
    name: 'YiYe',
    components: { SelectExpirationTime, SelectYiYeGrade },
    props: {},
    data: function () {
      return {
        formData: {},
        loading: false,
      }
    },
    created() {},
    methods: {
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .YiYe {
    .content {
      margin: 0 auto;
      padding: 0 10px;

      .row {
        display: flex;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;
          width: 100px;
          text-align: right;
        }

        .right {
        }

        .bt {
          width: 300px;
          margin-top: 4px;
          background: #f19ec2;
          color: white;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
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
