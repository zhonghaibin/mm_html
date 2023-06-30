<template>
  <div class="StoreTargetList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">时间</span>
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
            style="width: 200px"
            transfer
            type="datetimerange"
            value-format="yyyy-MM-dd"
            @on-change="changeDatePicker"
            @on-clear="clearDate"
            @on-open-change="changeDatePicker"
          />
        </div>
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
      </div>
      <div class="right">
        <div class="add-bt">批量清空</div>
        <div class="add-bt">导出</div>
      </div>
    </div>
    <div ref="content" class="content">
      <div class="left">
        <div class="cell">
          <div class="title">年度目标(月目标累加):</div>
          <div class="money">￥43000000.00</div>
        </div>
        <div class="cell">
          <div class="title">年度累计完成业绩:</div>
          <div class="money">￥43000000.00</div>
          <div class="circle">
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
      <div class="right">
        <div class="list">
          <div class="cell">
            <div class="title">
              <div class="l">2021/01</div>
              <div class="r">
                <Checkbox />
              </div>
            </div>
            <div class="box">
              <div class="row">
                <div class="l color">本月门店业绩目标</div>
                <div class="r"></div>
              </div>
              <div class="data" style="display: block">
                <div class="row">
                  <div class="l">¥100,000.00</div>
                  <div class="r"></div>
                </div>
                <div class="row">
                  <Progress
                    :percent="25"
                    stroke-color="#bb2465"
                    :stroke-width="6"
                  />
                </div>
                <div class="row">
                  <div class="l color">已完成:</div>
                  <div class="r color1">¥60,000.00</div>
                </div>
                <div class="row">
                  <div class="l color">完成率:</div>
                  <div class="r color1">60%</div>
                </div>
                <div class="row">
                  <div class="l color">应完成:</div>
                  <div class="r color1">100%</div>
                </div>
                <div class="row">
                  <div class="l" style="flex: 1"></div>
                  <div
                    class="r"
                    style="color: #1298e6; cursor: pointer"
                    @click="showModal('目标详情', 'StoreTargetDetails')"
                  >
                    详情>
                  </div>
                </div>
              </div>

              <div class="set" style="display: none">
                <div class="row">
                  <div class="l color1">未设置目标</div>
                  <div class="r"></div>
                </div>
                <div class="foot">
                  <div
                    class="add-bt"
                    style="margin: 0 auto"
                    @click="showModal('设置目标', 'StoreTarget')"
                  >
                    设置
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="title">
              <div class="l">2021/01</div>
              <div class="r">
                <Checkbox />
              </div>
            </div>
            <div class="box">
              <div class="row">
                <div class="l color">本月门店业绩目标</div>
                <div class="r"></div>
              </div>
              <div class="data" style="display: none">
                <div class="row">
                  <div class="l">¥100,000.00</div>
                  <div class="r"></div>
                </div>
                <div class="row">
                  <Progress
                    :percent="25"
                    stroke-color="#bb2465"
                    :stroke-width="6"
                  />
                </div>
                <div class="row">
                  <div class="l color">已完成:</div>
                  <div class="r color1">¥60,000.00</div>
                </div>
                <div class="row">
                  <div class="l color">完成率:</div>
                  <div class="r color1">60%</div>
                </div>
                <div class="row">
                  <div class="l color">应完成:</div>
                  <div class="r color1">100%</div>
                </div>
                <div class="row">
                  <div class="l" style="flex: 1"></div>
                  <div
                    class="r"
                    style="color: #1298e6; cursor: pointer"
                    @click="showModal('目标详情', 'StoreTargetDetails')"
                  >
                    详情>
                  </div>
                </div>
              </div>

              <div class="set" style="display: block">
                <div class="row">
                  <div class="l color1">未设置目标</div>
                  <div class="r"></div>
                </div>
                <div class="foot">
                  <div
                    class="add-bt"
                    style="margin: 0 auto"
                    @click="showModal('设置目标', 'StoreTarget')"
                  >
                    设置
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <StoreTarget v-if="modalShow('StoreTarget')" />
      <StoreTargetDetails v-if="modalShow('StoreTargetDetails')" />
    </Modal>
  </div>
</template>

<script>
  import StoreTarget from '@/components/statistics/target/store-target'
  import StoreTargetDetails from '@/components/statistics/target/store-target-details'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'StoreTargetList',
    components: { SelectShop, StoreTarget, StoreTargetDetails },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        searchData: { sid: '', start: '', end: '' },
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        let divHeight = window.innerHeight - 220
        this.$refs.content.style.minHeight = divHeight + 'px'
      },
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
        this.search()
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      search() {},
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .StoreTargetList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          display: flex;
          margin-right: 20px;
          align-items: center;

          .text {
            font-weight: bold;
            margin: 0 5px;
            display: block;
            padding: 0 2px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          border: 1px solid #c1c1c1;
          color: #000;
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1.5;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 5px 15px 6px;
          font-size: 12px;
          border-radius: 4px;
          transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear, box-shadow 0.2s linear;
        }
      }
    }

    .content {
      display: flex;
      background: white;
      padding: 20px;
      border-radius: 8px;

      .left {
        border: 1px solid #d7d7d7;
        width: 240px;
        border-radius: 8px;
        padding: 0 10px;
        height: 350px;

        .cell {
          padding: 10px 0;

          .title {
            padding: 10px;
            color: #9d9d9d;
          }

          .money {
            font-weight: 500;
            font-size: 20px;
            color: black;
          }

          .circle {
            width: 120px;
            line-height: 120px;
            margin: 20px auto 0 auto;
          }
        }
      }

      .right {
        flex: 1;

        .list {
          display: flex;
          flex-flow: wrap;

          .color {
            color: #a8a4a4;
          }

          .color1 {
            color: #bb2465;
          }

          .cell {
            margin: 0 20px 20px 20px;
            border: 1px solid #d7d7d7;
            border-radius: 8px;
            width: 300px;
            height: 280px;

            .title {
              padding: 10px;
              display: flex;

              .l {
                font-size: 14px;
                flex: 1;
              }

              .r {
              }
            }

            .box {
              text-align: center;
              padding: 10px;

              .row {
                padding: 6px;
                display: flex;

                .l {
                }

                .r {
                  padding-left: 4px;
                }
              }

              .data {
              }

              .set {
                height: 100%;
                text-align: center;
                position: relative;
                bottom: 0;
              }

              .foot {
                margin-top: 120px;

                .add-bt {
                  margin-right: 10px;
                  color: white;
                  cursor: pointer;
                  background: #f19ec2;
                  padding: 2px 12px;
                  border-radius: 4px;
                  margin-bottom: 1px;
                  width: 60px;
                }
              }
            }
          }

          .page {
            height: 40px;
            padding: 8px 0;
            text-align: center;
            background: white;
          }
        }
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .add-bt {
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 0 14px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
</style>
