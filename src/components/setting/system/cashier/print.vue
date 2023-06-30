<template>
  <div class="Print">
    <div class="box">
      <div class="left">
        <div class="printer">
          <div class="header">
            <div class="title">分店1</div>
            <div class="address">地址:XXXXXXXXXX</div>
            <div class="tel">电话: XXXXXX</div>
            <div class="welcome">*****感谢光临*****</div>
          </div>
          <div class="top">
            <div class="row">
              <div class="row-left">单据号</div>
              <div class="row-right">2022052300001</div>
            </div>
            <div class="row">
              <div class="row-left">顾客姓名</div>
              <div class="row-right">张三</div>
            </div>
            <div class="row">
              <div class="row-left">手机号</div>
              <div class="row-right">138********11</div>
            </div>
            <div class="row">
              <div class="row-left">收银员</div>
              <div class="row-right">李四</div>
            </div>
            <div class="row">
              <div class="row-left">消费日期</div>
              <div class="row-right">2020-12-12 08:08:01</div>
            </div>
            <div class="row">
              <div class="row-left">订单备注</div>
              <div class="row-right">老板朋友</div>
            </div>
          </div>
          <div class="content">
            <div class="head">
              <div class="head-left">消费内容</div>
              <div class="head-right">金额</div>
            </div>
            <div class="center">
              <div class="center-row">
                <div class="center-left">
                  <div class="center-left-title">盆骨修复(划次)</div>
                  <div class="center-left-person">服务：王五</div>
                </div>
                <div class="center-num">X1</div>
                <div class="center-money">5.00</div>
              </div>
              <div class="center-row">
                <div class="center-left">
                  <div class="center-left-title">茶树精油(商品)</div>
                  <div class="center-left-person">服务：赵四</div>
                </div>
                <div class="center-num">X1</div>
                <div class="center-money">5.00</div>
              </div>
              <div class="center-row">
                <div class="center-left">
                  <div class="center-left-title">腹直肌修复套餐(买套餐)</div>
                  <div class="center-left-person">服务：张三</div>
                </div>
                <div class="center-num">X1</div>
                <div class="center-money">5.00</div>
              </div>
            </div>
            <div class="foot">
              <div class="foot-left">合计</div>
              <div class="foot-right">15.00</div>
            </div>
          </div>
          <div class="content">
            <div class="head">
              <div class="head-left">赠送内容</div>
              <div class="head-right">数量</div>
            </div>
            <div class="center">
              <div class="center-row">
                <div class="center-left">200元代金券</div>
                <div class="center-money">5</div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="head">
              <div class="head-left">已付</div>
              <div class="head-right">实收</div>
            </div>
            <div class="center">
              <div class="center-row">
                <div class="center-left">套餐名称</div>
                <div class="center-num">余次*8</div>
                <div class="center-money">5.00</div>
              </div>
              <div class="center-row">
                <div class="center-left">八折卡</div>
                <div class="center-num">八折</div>
                <div class="center-money">385.00</div>
              </div>
              <div class="center-row">
                <div class="center-left">5000送2000</div>
                <div class="center-num">余额7000</div>
                <div class="center-money">1005.00</div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="head">会员账户</div>
            <div class="center">
              <div class="center-row">
                <div class="center-left">余额 13323</div>
              </div>
              <div class="center-row">
                <div class="center-left">积分 13323</div>
              </div>
            </div>
          </div>
          <div class="signature">顾客签字：</div>
        </div>
      </div>
      <div class="right">
        <div class="set-print">
          <div class="header">头部打印设置</div>
          <div class="on-off">
            <div class="col">
              <Checkbox v-model="single">店铺名称</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">门店地址</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">门店电话</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">单据号</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">订单备注</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">收银员</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">消费日期</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">加密顾客手机号</Checkbox>
            </div>
          </div>
        </div>
        <div class="set-print">
          <div class="header">消费内容设置</div>
          <div class="on-off">
            <div class="col">
              <Checkbox v-model="single">服务人员</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">金额</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">合计</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">显示消费类型标记</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">显示赠送内容</Checkbox>
            </div>
          </div>
        </div>
        <div class="set-print">
          <div class="header">已付设置</div>
          <div class="on-off">
            <div class="col">
              <Checkbox v-model="single">划次自动显示套餐次卡名称</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">储值卡支付显示储值卡名称</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">显示折扣</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">套餐次卡显示余次</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">储值卡显示余额</Checkbox>
            </div>
          </div>
        </div>
        <div class="set-print">
          <div class="header">会员账户设置</div>
          <div class="on-off">
            <div class="col">
              <Checkbox v-model="single">显示余额</Checkbox>
            </div>
            <div class="col">
              <Checkbox v-model="single">显示积分</Checkbox>
            </div>
          </div>
        </div>
        <div class="foot">
          <div class="foot-row">
            打印设置份数
            <Input placeholder="设置份数" style="width: 250px" />
            份
          </div>
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
    name: 'Print',
    components: {},
    data: function () {
      return {
        printData: {},
        single: false,
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
  .Print {
    .box {
      padding-top: 10px;
      display: flex;
      background: white;

      .left {
        width: 280px;

        .printer {
          padding: 4px 10px;
          border: 1px solid #eaeaea;
          margin: 10px;
          .header {
            margin-top: 10px;
            text-align: center;

            .title {
              font-weight: bold;
              font-size: 16px;
            }

            .address {
              font-weight: bold;
            }

            .tel {
              font-weight: bold;
            }

            .welcome {
              color: #989898;
            }
          }
        }

        .top {
          border-bottom: 1px dashed #eaeaea;

          .row {
            display: flex;
            margin: 4px 0;

            .row-left {
              margin-right: 4px;
            }

            .row-right {
            }
          }
        }

        .content {
          padding-bottom: 4px;
          border-bottom: 1px dashed #eaeaea;
          margin: 8px 0;

          .head {
            display: flex;
            font-weight: bold;

            .head-left {
              flex: 1;
            }

            .head-right {
            }
          }

          .center {
            .center-row {
              padding: 4px 0;
              display: flex;

              .center-left {
                flex: 1;
              }

              .center-num {
                flex: 1;
                text-align: left;
              }

              .center-money {
              }
            }
          }

          .foot {
            display: flex;

            .foot-left {
              flex: 1;
            }

            .foot-right {
            }
          }
        }
      }

      .right {
        flex: 1;
        padding: 10px 20px;

        .set-print {
          .header {
            font-weight: bold;
            height: 40px;
            line-height: 40px;
          }

          .on-off {
            display: flex;
            flex-flow: wrap;
            align-items: center;

            .col {
              width: 250px;
              padding: 10px;
            }
          }
        }

        .foot {
          margin-top: 20px;

          .foot-row {
            font-weight: bold;
          }
        }
      }
    }

    .footer {
      position: absolute;
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      bottom: 0;
      width: 100%;
      padding: 10px;
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
