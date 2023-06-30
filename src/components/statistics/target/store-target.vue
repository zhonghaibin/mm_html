<template>
  <div class="StoreTarget">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>门店：</div>
        </div>
        <div class="right">分店1</div>
      </div>
      <div class="row">
        <div class="left">
          <div>2021年1月业绩目标：</div>
        </div>
        <div class="right">
          <Input style="width: 200px"><span slot="append">元</span></Input>
        </div>
      </div>
      <div class="box">
        <div class="header">目标分解</div>
        <div v-for="(item, index) in list" :key="index" class="cell">
          <div class="row">
            <div class="left">
              <div>阶段{{ index + 1 }},周期：</div>
            </div>
            <div class="right">
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
            <div class="right">
              <Icon v-if="index === 0" class="dot" type="md-add" @click="add" />
              <Icon
                v-else
                class="dot"
                type="ios-trash"
                @click="delRow(index)"
              />
            </div>
          </div>
          <div class="row">
            <div class="left">
              <div>阶段{{ index + 1 }},目标：</div>
            </div>
            <div class="right">
              <Input style="width: 200px"><span slot="append">%</span></Input>
            </div>
            <div class="right">
              <span class="color">目标：5000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StoreTarget',

    data: function () {
      return {
        list: [{}],
        cityList: [
          {
            value: 'New York',
            label: 'New York',
          },
        ],
        model1: '',
        formData: {
          vid: '',
        },
        searchData: { start: '', end: '' },
        loading: false,
      }
    },
    created() {},
    methods: {
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
      },
      delRow(index) {
        this.list.splice(index, 1)
      },
      add() {
        this.list.push({})
      },
      save() {
        this.formData.data = this.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .StoreTarget {
    .content {
      margin: 0 auto;
      padding: 0 10px;

      .row {
        display: flex;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;

          text-align: right;
        }

        .right {
        }

        .bt {
          width: 300px;
          margin-top: 4px;
          background: #f19ec2;
          color: white;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
        }
      }

      .box {
        .header {
          padding: 6px;
          font-size: 14px;
          font-weight: bold;
          border-bottom: 1px solid #eeeeee;
        }

        .color {
          color: #f19ec2;
        }

        .cell {
          .row {
            .left {
              width: 100px;
            }

            .right {
              .dot {
                color: #f19ec2;
                font-size: 16px;
              }
            }
          }
        }
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
  }
</style>
