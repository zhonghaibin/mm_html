<template>
  <div class="PackageCard">
    <div v-if="activity" ref="body" class="body">
      <div class="body-left">
        <div class="title">分类筛选</div>
        <div class="row">全部</div>
        <div class="row">全部</div>
        <div class="row">全部</div>
      </div>
      <div class="body-right">
        <div class="search">
          <div class="box">
            <Input
              enter-button
              placeholder="输入次卡名称"
              search
              style="width: 220px"
            />
          </div>
        </div>
        <div class="list">
          <div class="card">
            <div class="header">骨盆修复套餐</div>
            <div class="content">
              <div class="row">
                <div class="left">售价：</div>
                <div class="right">
                  <div class="text">￥2342.33</div>
                </div>
              </div>
              <div class="row">
                <div class="left">时限：</div>
                <div class="right">
                  <div class="text">永久有效</div>
                </div>
              </div>
              <div class="more">
                <div class="details" @click="buy">购买</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Package v-else @go-back="goBack" />
  </div>
</template>

<script>
  import Package from '@/components/cashier/pay-list/package'
  export default {
    name: 'PackageCard',
    components: { Package },
    data: function () {
      return {
        activity: true,
      }
    },
    computed: {},
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      buy() {
        this.activity = false
      },
      setHeight() {
        let height = window.innerHeight - 414
        this.$refs.body.style.minHeight = height + 'px'
      },
      goBack() {
        this.activity = true
      },
    },
  }
</script>

<style lang="less" scoped>
  .PackageCard {
    background: white;

    .body {
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .body-left {
        border: 1px solid #eeeeee;
        width: 200px;
        text-align: center;

        .title {
          height: 40px;
          background: #fdf1f6;
          padding: 10px;
          font-size: 14px;
        }

        .row {
          height: 40px;
          padding: 10px;
          cursor: pointer;
        }
      }

      .body-right {
        margin-left: 20px;
        flex: 1;

        .search {
          display: flex;
          background: white;

          .box {
            display: flex;
            align-items: center;
            margin-right: 20px;

            .money {
              height: 32px;
              line-height: 32px;
              font-weight: bold;
              padding-right: 20px;
              color: #c75181;
            }

            .text {
              font-weight: bold;
              margin: 0 5px;
            }
          }
        }

        .list {
          display: flex;
          flex-flow: wrap;

          .card {
            border-radius: 12px;
            border: 1px solid #dcdee2;
            cursor: pointer;
            background: white;
            margin: 10px 10px 10px 0;
            width: 200px;

            .header {
              margin-top: 10px;
              padding: 2px 10px;
              font-size: 14px;
              text-align: center;
              font-weight: bold;
            }

            .content {
              padding: 0 8px 4px 6px;

              .row {
                display: flex;
                padding: 2px 0;
                align-items: center;

                .left {
                }

                .right {
                  display: flex;
                  justify-content: flex-end;
                }
              }

              .more {
                display: flex;
                justify-content: flex-end;

                .details {
                  color: #1298e6;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
