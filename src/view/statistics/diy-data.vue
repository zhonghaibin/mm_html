<template>
  <div class="box">
    <div class="column">自定义数据</div>
    <div class="list-top">
      <span class="red">*温警提示:以下设置仅对数据模块生效</span>
      <span class="gray">(如果以下没有您要的定义,可联系客服,提交您的建议)</span>
    </div>

    <div class="list">
      <table class="table">
        <tr>
          <td style="width: 400px">客次/容数定义</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>当天有任何订单都算</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>
                  当天只办理套餐次卡/购买充值卡/购买优惠券,但未做其他项目不算
                </span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="width: 400px">办卡相关定</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>只有赠送的卡不算办卡</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>有任何卡都算办卡</span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="width: 400px">项目数定义</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>赠送的项目不算项目数</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>所有项目都算项目数</span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="add-bt">保存</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DiyData',
    data: function () {
      return {
        model1: '',
        switch1: false,
      }
    },
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status)
      },
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .list-top {
      background: white;
      padding: 10px 10px 0 2px;

      font-size: 12px;

      .gray {
        color: #a29f9f;
        font-weight: bold;
      }

      .red {
        color: #cb2f19;
        font-weight: bold;
        margin-left: 20px;
      }
    }

    .list {
      padding: 8px;
      border-radius: 8px;
      background: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;

      tr {
        td {
          border: 1px solid #eeee;
          padding: 20px;

          .add-bt {
            width: 100px;
            color: white;
            margin-right: 20px;
            cursor: pointer;
            background: #f19ec2;
            padding: 6px 14px;
            border-radius: 4px;
            margin-bottom: 1px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
