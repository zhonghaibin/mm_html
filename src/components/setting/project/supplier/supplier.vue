<template>
  <div class="Supplier">
    <div class="box">
      <div class="row">
        <div class="left">供应商名称</div>
        <div class="right"><Input placeholder="请输入供应商名称" /></div>
      </div>
      <div class="row">
        <div class="left">联系人</div>
        <div class="right"><Input placeholder="请输入联系人" /></div>
      </div>
      <div class="row">
        <div class="left">联系方式</div>
        <div class="right"><Input placeholder="请输入联系方式" /></div>
      </div>
      <div class="row">
        <div class="left">地址信息</div>
        <div class="right"><Input placeholder="请输入地址信息" /></div>
      </div>
      <div class="row">
        <div class="left">结算方式</div>
        <div class="right"><Input placeholder="请输入结算方式" /></div>
      </div>
      <div class="row">
        <div class="left">结算天数</div>
        <div class="right"><Input placeholder="请输入结算天数" /></div>
      </div>
      <div class="row">
        <div class="left">开户银行</div>
        <div class="right"><Input placeholder="请输入开户银行" /></div>
      </div>
      <div class="row">
        <div class="left">银行卡号</div>
        <div class="right"><Input placeholder="请输入银行卡号" /></div>
      </div>
      <div class="row">
        <div class="left">序号</div>
        <div class="right">
          <Input placeholder="请输入数字，数字越小越靠前" />
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
    name: 'Supplier',
    methods: {},
  }
</script>

<style lang="less" scoped>
  .Supplier {
    background: white;
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 10px 0;
        padding-right: 10px;

        .left {
          width: 80px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
          flex: 1;

          .name {
          }

          .phone {
          }
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
