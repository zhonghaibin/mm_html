<template>
  <div class="Brand">
    <div class="box">
      <div class="row">
        <div class="left">品牌名称</div>
        <div class="right">
          <Input placeholder="请输入品牌名称" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">序号</div>
        <div class="right">
          <Input
            placeholder="请输入数字，数字越小排名越靠前"
            style="width: 200px"
          />
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
    name: 'Brand',
    data: function () {
      return {}
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .Brand {
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
