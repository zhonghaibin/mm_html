<template>
  <div class="CouponInfo">
    <div class="header">
      <div class="left">
        <div class="card">
          <div class="card-l">
            <div class="box">
              <div class="row">
                <div class="dot">现金券</div>
              </div>
              <div class="row"><span class="text">200元现金券</span></div>
            </div>
          </div>
          <div class="card-r">
            <div class="row">
              <div class="row-l">有效期：</div>
              <div class="row-r">2020-20-12 12:10:11</div>
            </div>
            <div class="row">
              <div class="row-l">面额：</div>
              <div class="row-r">￥200.00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="bt">删除券</div>
        <div class="bt">券延期</div>
        <div class="bt">立即使用</div>
      </div>
    </div>
    <div class="content">
      <div class="row">
        <div class="l">券来源：</div>
        <div class="r">随卡赠送</div>
      </div>
      <div class="row">
        <div class="l">适用门店：</div>
        <div class="r">所有门店</div>
      </div>
      <div class="row">
        <div class="l">获得时间：</div>
        <div class="r">2022-05-12 12:10:10</div>
      </div>
      <div class="row">
        <div class="l">使用范围：</div>
        <div class="r">所有项目</div>
      </div>
      <div class="row">
        <div class="l">券说明：</div>
        <div class="r">暂无说明</div>
      </div>
      <div class="row">
        <div class="l">订单使用限制：</div>
        <div class="r">1次</div>
      </div>
      <div class="row">
        <div class="l">备注：</div>
        <div class="r">暂无备注</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CouponInfo',
    components: {},
    data: function () {
      return {}
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .CouponInfo {
    .header {
      display: flex;
      margin-left: 10px;

      .left {
        .card {
          border: 1px solid #fceef4;
          width: 420px;
          background: #fceef4;
          border-radius: 10px;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
          margin: 4px 2px;
          display: flex;

          .card-l {
            width: 180px;
            padding: 10px 0 20px 20px;

            .box {
              height: 80px;
              border-right: 2px dashed #bf5181;
              padding-top: 14px;

              .row {
                padding: 2px;

                .dot {
                  width: 60px;
                  background: #bf5181;
                  height: 24px;
                  line-height: 10px;

                  padding: 8px 8px;
                  border-radius: 4px;
                  color: white;
                  font-size: 12px;
                  text-align: center;
                }

                .text {
                  font-weight: bold;
                  font-size: 14px;
                }
              }
            }
          }

          .card-r {
            padding: 30px 10px 30px 40px;

            .row {
              display: flex;
              color: #bf5181;

              .row-l {
              }

              .row-r {
                flex: 1;
              }
            }
          }
        }
      }

      .right {
        display: flex;
        flex-flow: wrap;
        padding: 2px 30px;

        .bt {
          width: 40%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 10px 8px;
          background: #c75181;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }

    .content {
      border-top: 1px solid #e8e8e8;
      margin-top: 10px;
      padding-top: 10px;

      .row {
        font-weight: bold;
        display: flex;
        padding: 12px 8px;

        .l {
          padding-right: 4px;
        }

        .r {
        }
      }
    }
  }
</style>
