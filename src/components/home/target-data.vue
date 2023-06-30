<template>
  <div class="target-data">
    <div class="title">
      <div class="l">门店目标数据</div>
      <div class="r" @click="jumpRouter('statistics.target')">详情></div>
    </div>
    <div class="box1">
      <div class="box2">
        <div class="row1">
          <div class="text1">年度业绩目标(月目标累加)：</div>
          <div class="text2">￥50000,000,00</div>
        </div>
        <div class="row1">
          <div class="text1">年度业绩目标(月目标累加)：</div>
          <div class="text2">￥80000,000,00</div>
          <div class="row2">
            <div class="circle" style="width: 120px; height: 120px">
              <i-circle
                :percent="80"
                stroke-color="#f46b53"
                :stroke-width="10"
                :trail-width="10"
              >
                <span style="font-size: 24px">80%</span>
              </i-circle>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="box3">
        <div class="box4">
          <div class="l">
            <div class="row1">
              <div class="text1">
                <div class="dot"></div>
                年度耗卡目标(月目标累加)：
              </div>
              <div class="text2">￥50000,000,00</div>
            </div>
            <div class="row2">
              <div class="text1">年度累计完成耗卡：</div>
              <div class="text2">￥80000,000,00</div>
            </div>
          </div>
          <div class="r">
            <div class="circle">
              <i-circle
                :percent="80"
                :size="80"
                stroke-color="#f46b53"
                :stroke-width="10"
                :trail-width="10"
              >
                <span style="font-size: 24px">80%</span>
              </i-circle>
            </div>
          </div>
        </div>
        <div class="box4">
          <div class="l">
            <div class="row1">
              <div class="text1">
                <div class="dot"></div>
                年度客流目标(月目标累加)：
              </div>
              <div class="text2">300</div>
            </div>
            <div class="row2">
              <div class="text1">年度累计完成客流：</div>
              <div class="text2">417</div>
            </div>
          </div>
          <div class="r">
            <div class="circle">
              <i-circle
                :percent="80"
                :size="80"
                stroke-color="#f46b53"
                :stroke-width="10"
                :trail-width="10"
              >
                <span style="font-size: 24px">80%</span>
              </i-circle>
            </div>
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="box4">
          <div class="l">
            <div class="row1">
              <div class="text1">
                <div class="dot"></div>
                年度客次目标(月目标累加)：
              </div>
              <div class="text2">￥50000,000,00</div>
            </div>
            <div class="row2">
              <div class="text1">年度累计完成客次：</div>
              <div class="text2">￥80000,000,00</div>
            </div>
          </div>
          <div class="r">
            <div class="circle">
              <i-circle
                :percent="80"
                :size="80"
                stroke-color="#f46b53"
                :stroke-width="10"
                :trail-width="10"
              >
                <span style="font-size: 24px">80%</span>
              </i-circle>
            </div>
          </div>
        </div>
        <div class="box4">
          <div class="l">
            <div class="row1">
              <div class="text1">
                <div class="dot"></div>
                年度客数目标(月目标累加)：
              </div>
              <div class="text2">300</div>
            </div>
            <div class="row2">
              <div class="text1">年度累计完成客数：</div>
              <div class="text2">417</div>
            </div>
          </div>
          <div class="r">
            <div class="circle">
              <i-circle
                :percent="80"
                :size="80"
                stroke-color="#f46b53"
                :stroke-width="10"
                :trail-width="10"
              >
                <span style="font-size: 24px">80%</span>
              </i-circle>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TargetData',
    methods: {
      jumpRouter(name, params = {}) {
        this.$router.push({ name: name, params: params })
      },
    },
  }
</script>

<style lang="less" scoped>
  .target-data {
    flex: 1;
    background: white;
    border-radius: 10px;
    padding: 4px;

    .title {
      height: 30px;
      line-height: 30px;
      padding: 2px;
      margin-right: 10px;
      margin-left: 10px;
      color: #f19ec4;
      font-size: 16px;

      .l {
        float: left;
        color: #f19ec4;
        flex: 1;
      }

      .r {
        float: right;
        color: #1298e6;
        cursor: pointer;
        font-size: 14px;
      }
    }

    .box1 {
      width: 100%;
      display: flex;

      .circle {
        margin: 0 auto;
        width: 75px;
        height: 75px;
      }

      .box2 {
        padding: 10px;
        border-radius: 10px;
        width: 26%;
        float: left;
        border: 1px dashed #ccc;
        height: 320px;
        margin: 10px;

        .row1 {
          margin-bottom: 20px;

          .text1 {
            color: #928c8a;
            height: 30px;
            font-size: 12px;
          }

          .text2 {
            height: 30px;
            font-size: 16px;
            font-weight: bold;
          }

          .row2 {
            margin-top: 10px;
          }
        }
      }

      .box3 {
        border-radius: 10px;

        float: left;
        height: 300px;
        margin: 10px 10px 10px 0;
        flex: 1;

        .box4 {
          display: flex;
          width: 100%;
          padding: 15px 10px;
          border: 1px dashed #ccc;
          border-radius: 10px;
          margin-bottom: 14px;

          .l {
            .row1 {
              .text1 {
                color: #928c8a;
                height: 30px;
                font-size: 12px;
                display: flex;
                align-items: center;

                .dot {
                  float: left;
                  background: #f19ec2;
                  width: 5px;
                  height: 24px;
                  padding: 2px;
                  margin-right: 4px;
                }
              }

              .text2 {
                height: 30px;
                font-size: 16px;
                font-weight: bold;
              }
            }

            .row2 {
              .text1 {
                color: #928c8a;
                height: 30px;
                font-size: 14px;
                display: flex;
                align-items: center;
              }

              .text2 {
                height: 30px;
                font-size: 16px;
                font-weight: bold;
              }
            }
          }

          .r {
            flex: 1;
            padding-top: 10px;
            height: 120px;
          }
        }
      }
    }
  }
</style>
