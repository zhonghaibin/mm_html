<template>
  <div class="StoreTargetDetails">
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
        <div class="right">10000元</div>
      </div>
      <div class="box">
        <div class="header">目标分解</div>
        <div v-for="(item, index) in list" :key="index" class="cell">
          <div class="row">
            <div class="left">
              <div>阶段{{ index + 1 }},周期：</div>
            </div>
            <div class="right">2022-5-1-2022-5-15</div>
          </div>
          <div class="row">
            <div class="left">
              <div>阶段{{ index + 1 }},目标：</div>
            </div>
            <div class="right">
              50%
              <span class="color">目标：50000.00</span>
            </div>
          </div>
          <div class="row">
            <div class="left">
              <div>已完成：</div>
            </div>
            <div class="right">50%</div>
          </div>
          <div class="row">
            <div class="left">
              <div>完成率：</div>
            </div>
            <div class="right">50%</div>
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
    name: 'StoreTargetDetails',

    data: function () {
      return {
        list: [{}, {}],
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
      save() {
        this.formData.data = this.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .StoreTargetDetails {
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
        }

        .color {
          color: #f19ec2;
        }

        .cell {
          margin-top: 4px;
          border: 1px solid #eeeeee;

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
