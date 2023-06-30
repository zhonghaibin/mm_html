<template>
  <div class="box">
    <div class="list">
      <table class="table">
        <tr>
          <td style="width: 400px">模式选择</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>佣金分红模式</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>积分模式</span>
              </Radio>
            </RadioGroup>

            <p style="color: red">
              *开启对应模式后,用已产生数犯时,请勿随意切换模式,一旦切换模式,原数据将自动清空;如选择积分税式,请到核心设置设置积分玩法
            </p>
          </td>
        </tr>
        <tr>
          <td rowspan="2" style="width: 400px">返佣规则</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>充值给返佣</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>消费给返佣</span>
              </Radio>
              <Radio label="3">
                <span>充值和消费都给返佣</span>
              </Radio>
              <Radio label="4">
                <span>充值和消费都不给返佣</span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>购买套餐次卡给返佣</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>消耗给返佣</span>
              </Radio>
              <Radio label="3">
                <span>购买和消耗都给返佣</span>
              </Radio>
              <Radio label="4">
                <span>购买和消耗都不给返佣</span>
              </Radio>
            </RadioGroup>
          </td>
        </tr>
        <tr>
          <td style="width: 400px">关系设置</td>
          <td>
            <RadioGroup>
              <Radio label="1">
                <span>A推荐B, B也成为消费型股东,B的消费与A继续有关系</span>
              </Radio>
              <br />
              <Radio label="2">
                <span>A推荐B,B也成为消费型股东, B的消费与A没关系</span>
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
    name: 'SetRules',
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
