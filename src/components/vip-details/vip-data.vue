<template>
  <div class="VipData">
    <div class="search">
      <div class="left">
        <div class="box">
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
          <div class="add-bt">导出</div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="list">
      <div class="card">
        <div class="header">
          <div class="ico">
            <Icon color="#dfbe67" type="logo-usd" />
          </div>
          <div class="title">客户资产</div>
        </div>
        <div class="content">
          <div class="row">
            <div class="left">会员余额</div>
            <div class="right">{{ statistical.money }}</div>
          </div>
          <div class="row">
            <div class="left">积分</div>
            <div class="right">{{ statistical.integral }}</div>
          </div>
          <div class="row">
            <div class="left">欠款金额</div>
            <div class="right">{{ statistical.arrears }}</div>
          </div>
          <div class="little-row">
            <div class="left">&nbsp;</div>
            <div class="right">
              <spin class="bt">还款</spin>
            </div>
          </div>
          <div class="row">
            <div class="left">名下有效卡</div>
            <div class="right">{{ statistical.card_num }}</div>
          </div>
          <div class="row">
            <div class="left">剩余项目数</div>
            <div class="right">0</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <div class="ico">
            <Icon color="#8456a6" type="ios-people" />
          </div>
          <div class="title">客户贡献</div>
        </div>
        <div class="content">
          <div class="row">
            <div class="left">累计消费总额</div>
            <div class="right">{{ statistical.moeny_count }}</div>
          </div>
          <div class="row">
            <div class="left">累计耗卡总额</div>
            <div class="right">{{ statistical.haoka_count }}</div>
          </div>
          <div class="row">
            <div class="left">累计项目消耗数</div>
            <div class="right">0</div>
          </div>
          <div class="row">
            <div class="left">新赠项目数</div>
            <div class="right">0</div>
          </div>
          <div class="row">
            <div class="left">转介绍人数</div>
            <div class="right">{{ statistical.rnum }}</div>
          </div>
          <div class="row">
            <div class="left">消费排名</div>
            <div class="right">NO:{{ statistical.count_rank }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <div class="ico">
            <Icon color="#0fc8e8" type="md-pie" />
          </div>
          <div class="title">客户粘性</div>
        </div>
        <div class="content">
          <div class="row">
            <div class="left">总到店次数</div>
            <div class="right">{{ statistical.arrival_count }}</div>
          </div>
          <div class="row">
            <div class="left">
              平均到店频率
              <Poptip placement="right-start" transfer trigger="hover">
                <Icon
                  style="font-size: 18px; color: #ff0088; cursor: pointer"
                  type="ios-help-circle-outline"
                />
                <div slot="content">
                  <div class="fields-remark">
                    <p class="text">该数据标识会员平均多少天来店里一次</p>
                  </div>
                </div>
              </Poptip>
            </div>
            <div class="right">{{ statistical.arrival_day }}</div>
          </div>
          <div class="row">
            <div class="left">生命周期归类</div>
            <div class="right">{{ statistical.customers }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <div class="ico">
            <Icon color="#f128d6" type="ios-photos" />
          </div>
          <div class="title">推荐收益</div>
        </div>
        <div class="content">
          <div class="row">
            <div class="left">可提现/使用分红/积分</div>
            <div class="right">{{ statistical.commission_balance }}</div>
          </div>
          <div class="row">
            <div class="left">累计分红/积分</div>
            <div class="right">{{ statistical.commission }}</div>
          </div>
          <div class="row">
            <div class="left">分享体验卡领取次数</div>
            <div class="right">{{ statistical.swiping_count }}</div>
          </div>
          <div class="row">
            <div class="left">转化数</div>
            <div class="right">{{ statistical.swiping_use }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipData',
    components: {},
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        statistical: {
          integral: 0,
          arrears: 0,
          reg_time: 0,
          moeny_count: 0,
          haoka_count: 0,
          rnum: 0,
          count_rank: 0,
          year_rank: 0,
          arrival_count: 0,
          arrival_day: 0,
          customers: 0,
          swiping_use: 0,
          commission: 0,
          commission_balance: 0,
          card_num: 0,
          money: 0,
          swiping_count: 0,
        },
        searchData: { start: '', end: '' },
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
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
        this.search()
      },
      search() {},
      async getInfo() {
        const { data, status, msg } = { data: [], status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.statistical = data
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipData {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          margin-right: 20px;

          .text {
            font-weight: bold;
            margin: 0 5px;
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
    .list {
      display: flex;
      padding-bottom: 10px;
      margin-top: 10px;
      .card {
        flex: 1;
        margin: 0 3%;
        border-radius: 20px;
        border: 1px solid #dcdee2;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

        height: 400px;
        cursor: pointer;

        .header {
          height: 45px;
          line-height: 45px;
          display: flex;
          align-items: center;

          .ico {
            width: 45px;
            height: 45px;
            text-align: center;
            font-size: 24px;
            margin-left: 16px;
          }

          .title {
            font-size: 16px;
            font-weight: bold;
          }

          .title:hover {
            color: #cc749a;
          }
        }

        .content {
          border-top: 1px dashed #cccc;
          margin: 0 20px;
          padding-top: 20px;

          .row {
            display: flex;
            height: 50px;
            line-height: 50px;
            font-size: 14px;

            .left {
              flex: 1;
            }

            .right {
              font-weight: bold;
            }
          }

          .row:hover {
            color: #cc749a;
          }

          .little-row {
            display: flex;
            height: 10px;

            .left {
              flex: 1;
            }

            .right {
              .bt {
                cursor: pointer;
                color: #1298e6;
              }
            }
          }
        }
      }

      .card:hover {
        border: 1px solid #fcbad7;
      }
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
