<template>
  <div class="BusinessDetailsList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <DatePicker
            placeholder="开始时间-结束时间"
            style="width: 160px"
            type="datetimerange"
          />
        </div>
        <div class="box">
          <Input
            enter-button
            placeholder="姓名/电话/卡号 "
            search
            style="width: 220px"
          />
        </div>
        <div class="box">
          <span class="text">支付方式</span>
          <Select v-model="relation" style="width: 100px" transfer>
            <Option
              v-for="item in relation_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <span class="text">消费类型</span>
          <Select v-model="relation" style="width: 100px" transfer>
            <Option
              v-for="item in relation_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <span class="text">审核</span>
          <Select v-model="relation" style="width: 80px" transfer>
            <Option
              v-for="item in relation_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="box">
          <span class="text">过滤0元</span>
          <Select v-model="relation" style="width: 60px" transfer>
            <Option
              v-for="item in relation_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="exportDataEvent">导出</div>
      </div>
    </div>
    <div v-if="flag" class="base-info">
      <Carousel v-model="value1" dots="none">
        <CarouselItem>
          <div class="card-box">
            <div class="box color1">
              <div class="header"><span class="text">营业总数据</span></div>
              <div class="content">
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">总收入</div>
                    <div class="r">￥23442</div>
                  </div>

                  <div class="cell-row">
                    <div class="l">耗卡额</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">补款金额</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">储值卡消费</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">营业收入</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">未耗卡总额</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">总欠款金额</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">储值卡总余额</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box color2">
              <div class="header"><span class="text">收入金额明细</span></div>
              <div class="content">
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">减免</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">积分抵扣</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">优惠券抵扣</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">储值卡抵扣</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">分红收益抵扣</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">现金</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">支付部</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">微信</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box color3">
              <div class="header"><span class="text">收入来源统计</span></div>
              <div class="content">
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">项目收入</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">商品收入</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">套餐次卡收入</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">储值卡收入</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">优惠券收入</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">积分充值收入</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box color4">
              <div class="header"><span class="text">客数客次统计</span></div>
              <div class="content">
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">进店客流</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">服务客次</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">服务客数</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">新客数量</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">项目数量</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">老客续单</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">新客成单</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">新客业绩</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">老客业绩</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">手工费</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="card-box">
            <div class="box color1">
              <div class="header"><span class="text">人均分析</span></div>
              <div class="content">
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">会员单次进店项目数</div>
                    <div class="r">1</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">老客成交客单价</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">会员单次项目耗卡额</div>
                    <div class="r">￥23442</div>
                  </div>
                </div>
                <div class="cell">
                  <div class="cell-row">
                    <div class="l">新客成交率</div>
                    <div class="r">3%</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">新客成交客单价</div>
                    <div class="r">￥23442</div>
                  </div>
                  <div class="cell-row">
                    <div class="l">老客复购率</div>
                    <div class="r">3%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <div class="list">
      <vxe-table
        ref="xTable"
        :cell-style="{ textAlign: 'center' }"
        :column-config="{ resizable: true }"
        :data="tableData"
        header-align="center"
        :height="tableHeight"
        :loading="loading"
        :row-config="{ isHover: true }"
        size="small"
      >
        <vxe-column
          v-for="(item, index) in tableColumns"
          :key="index + item.key"
          :field="item.key"
          :fixed="item.fixed"
          :min-width="item.width"
          show-overflow="title"
          :title="item.title"
        />
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt" @click="showModal('详情', 'BusinessDetails')">
              详情
            </span>
            <span class="bt">更多</span>
          </template>
        </vxe-column>
      </vxe-table>
      <div class="page">
        <Page show-elevator show-sizer size="small" :total="40" transfer />
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="true"
      :title="modal.title"
      :width="modal.width"
    >
      <BusinessDetails v-if="modalShow('BusinessDetails')" />
    </Modal>
  </div>
</template>

<script>
  import BusinessDetails from '@/components/business-track/business-details-list/business-details'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'BusinessDetailsList',
    components: { SelectShop, BusinessDetails },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '会员信息',
            key: '0',
          },
          {
            title: '所属门店',
            key: '1',
          },
          {
            title: '消费门店',
            key: '2',
          },
          {
            title: '消费类型',
            key: '3',
          },
          {
            title: '消费内容',
            key: '4',
          },
          {
            title: '实收金额',
            key: '5',
          },
          {
            title: '耗卡金额',
            key: '6',
          },
          {
            title: '服务人员',
            key: '7',
          },
          {
            title: '手工费',
            key: '8',
          },
          {
            title: '审核状态',
            key: '9',
          },
          {
            title: '时间',
            key: '10',
          },
        ],
        dateList: [
          {
            label: '今天',
            value: '1',
          },
          {
            label: '昨天',
            value: '2',
          },
          {
            label: '上周',
            value: '3',
          },
          {
            label: '上月',
            value: '4',
          },
        ],
        date: '',
        relation_list: [
          {
            value: '0',
            label: '全部股东关系',
          },
          {
            value: '1',
            label: '直接关系',
          },
          {
            value: '2',
            label: '间接关系',
          },
        ],
        flag: false,
        value1: 0,
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
        },
        relation: '0',
        searchData: {
          sid: '',
        },
      }
    },

    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    created() {
      setTimeout(() => {
        this.flag = true
      }, 200)
    },
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 436
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      search() {},
      exportDataEvent() {
        setTimeout(() => {
          const list = []
          this.$refs.xTable.exportData({
            filename: '',
            type: 'csv',
            isHeader: true,
            isFooter: true,
            data: list,
          })
        }, 100)
      },
    },
  }
</script>

<style lang="less" scoped>
  .BusinessDetailsList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          margin-right: 8px;

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
    .base-info {
      .card-box {
        display: flex;
        min-height: 170px;
        .box {
          padding: 6px;
          flex: 1;
          border-radius: 12px;
          cursor: pointer;
          margin: 6px;
          .header {
            height: 30px;
            line-height: 30px;
            .text {
              margin-left: 10px;
              font-weight: bold;
              font-size: 14px;
            }
          }

          .content {
            margin-top: 2px;
            display: flex;

            .cell {
              flex: 1;
              .cell-row {
                display: flex;
                .l {
                  padding: 0 6px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .r {
                  flex: 1;
                  margin-right: 2px;
                  color: red;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
        .color1 {
          background: #e0efef;
        }

        .color2 {
          background: #e6e7fb;
        }

        .color3 {
          background: #efe9e0;
        }

        .color4 {
          background: #fceae8;
        }
      }
    }
    .list {
      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
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
