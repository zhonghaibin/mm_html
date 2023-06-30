<template>
  <div class="Ladder">
    <div class="box">
      <div class="l">
        <div class="title">基础设置</div>
        <div class="row">
          <div class="left">
            <span class="dot">*</span>
            提成方案名称
          </div>
          <div class="right">
            <Input placeholder="请输入品牌名称" style="width: 200px" />
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="dot">*</span>
            提成类型
          </div>
          <div class="right">
            <div class="bt">业绩提成</div>
            <div class="bt">耗卡提成</div>
            <div class="bt">增品耗卡提成</div>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="dot">*</span>
            计算方式
          </div>
          <div class="right">
            <div class="bt">阶梯式计算</div>
            <div class="bt">阶段式计算</div>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="dot">*</span>
            适用职位
          </div>
          <div class="right">
            <Input placeholder="请选择适用职位" style="width: 200px" />
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="dot">*</span>
            适用门店
          </div>
          <div class="right">
            <Input placeholder="请选择适用门店" style="width: 200px" />
          </div>
        </div>
      </div>
      <div class="r">
        <div class="title">选择业绩品项</div>
      </div>
    </div>
    <div class="box">
      <div class="l">
        <div class="title">提成规则设置</div>
      </div>
      <div class="r"></div>
    </div>
    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Ladder',
    data: function () {
      return {
        commissionList: [
          {
            label: '业绩提成',
            value: '1',
          },
          {
            label: '耗卡提成',
            value: '2',
          },
          {
            label: '增品耗卡提成',
            value: '3',
          },
        ],
        commission: '',
        calculationList: [
          {
            label: '阶梯式计算',
            value: '1',
          },
          {
            label: '阶段性计算',
            value: '2',
          },
        ],
        calculation: '',
        dateList: [
          {
            label: '年',
            value: '1',
          },
          {
            label: '月',
            value: '2',
          },
          {
            label: '日',
            value: '3',
          },
        ],
        date: '',
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .Ladder {
    .box {
      display: flex;
      margin-bottom: 10px;

      .title {
        padding: 6px;
        border-left: 4px solid #f19ec2;
      }

      .l {
        margin-right: 10px;
        padding: 10px;
        width: 40%;
        border: 1px solid #eeeeee;

        .row {
          display: flex;
          align-items: center;
          margin: 30px 0;

          .left {
            width: 100px;
            text-align: right;
            margin-right: 10px;
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;

            .bt {
              padding: 6px 8px;
              border: 1px solid #eeeeee;
              border-radius: 4px;
              margin: 0 4px;
              cursor: pointer;
            }
          }
        }
      }

      .r {
        padding: 10px;
        flex: 1;
        border: 1px solid #eeeeee;
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

    .dot {
      color: red;
      font-size: 14px;
    }
  }
</style>
