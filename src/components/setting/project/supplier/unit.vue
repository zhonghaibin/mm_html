<template>
  <div class="Unit">
    <div class="box">
      <div class="row">
        <div class="left">商品单位名称</div>
        <div class="right"><Input placeholder="请输入商品单位名称" /></div>
      </div>
      <div class="row">
        <div class="left">序号</div>
        <div class="right">
          <Input placeholder="请输入数字，数字越小越靠前" />
        </div>
      </div>
      <div class="bt">
        <Icon type="md-add" />
        继续添加
      </div>
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Unit',
    methods: {},
  }
</script>

<style lang="less" scoped>
  .Unit {
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

      .bt {
        height: 30px;
        line-height: 30px;

        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 auto;
        background: #fdf1f6;
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
