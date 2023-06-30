<template>
  <div class="CouponList">
    <div class="search">
      <div class="box">
        <span class="text">状态</span>
        <Select v-model="status" style="width: 200px" transfer>
          <Option
            v-for="item in status_list"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
      <div class="box">
        <span class="text">来源</span>
        <Select v-model="source" style="width: 200px" transfer>
          <Option
            v-for="item in source_list"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
      <div class="box">
        <span class="text">类型</span>
        <Select v-model="type" style="width: 200px" transfer>
          <Option
            v-for="item in type_list"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
    </div>
    <div class="list">
      <div class="card">
        <div class="header">
          20元现金券
          <div class="use">可用</div>
        </div>
        <div class="content">
          <div class="row">
            <div class="left">券来源</div>
            <div class="right">
              <div class="text">2020/02/10 15:12</div>
            </div>
          </div>
          <div class="row">
            <div class="left">券有效期</div>
            <div class="right">
              <div class="text">永久有效</div>
            </div>
          </div>
          <div class="row">
            <div class="left">类型</div>
            <div class="right">
              <div class="text">8次</div>
            </div>
          </div>
          <div class="more">
            <div
              class="details"
              @click="showModal('优惠券详情', 'VipCardInfo3')"
            >
              详情
            </div>
          </div>
        </div>
      </div>
      <Spin v-if="loading" fix size="large" />
      <div v-if="list.length === 0 && !loading" class="nodata">暂无数据</div>
    </div>
    <div>
      <Modal
        v-model="modal.show"
        :footer-hide="true"
        :title="modal.title"
        :width="modal.width"
      >
        <CouponInfo v-if="modalShow('CouponInfo')" />
      </Modal>
    </div>
  </div>
</template>

<script>
  import CouponInfo from '@/components/vip-details/vip-account/coupon-info'

  export default {
    name: 'CouponList',
    components: {
      CouponInfo,
    },
    data: function () {
      return {
        loading: false,
        status_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '使用中',
          },
          {
            value: '2',
            label: '未使用',
          },
          {
            value: '3',
            label: '已过期',
          },
          {
            value: '4',
            label: '已用完',
          },
        ],
        status: '0',
        source_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '开卡赠送',
          },
          {
            value: '2',
            label: '充值赠送',
          },
          {
            value: '3',
            label: '手动赠送',
          },
          {
            value: '4',
            label: '短信赠送',
          },
          {
            value: '5',
            label: '付费赠送',
          },
        ],
        source: '0',
        type_list: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '现金券',
          },
          {
            value: '2',
            label: '折扣券',
          },
        ],
        type: '0',
        modal: {
          show: false,
          title: '',
          type: false,
          width: 700,
        },
        list: [],
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .CouponList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .box {
        display: flex;
        align-items: center;

        .text {
          font-weight: bold;
          margin: 0 5px;
        }
      }
    }

    .list {
      margin-top: 10px;
      display: flex;
      flex-flow: wrap;

      .card {
        border-radius: 8px;
        border: 1px solid #dcdee2;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        width: 23%;
        margin: 1%;
        .header {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          height: 40px;
          line-height: 40px;
          background: #ddf1f9;
          font-weight: bold;
          padding: 0 10px;
          font-size: 14px;

          .use {
            float: right;
            background: #bf5181;
            height: 20px;
            line-height: 10px;
            margin-top: 10px;
            padding: 5px 8px;
            border-radius: 2px;
            color: white;
            font-size: 12px;
            font-weight: normal;
          }
        }

        .content {
          padding: 12px 12px;

          .row {
            line-height: 30px;
            height: 30px;
            display: flex;

            .left {
              flex: 1;
              margin-left: 12px;
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

      .nodata {
        height: 48px;
        line-height: 48px;
        border: 1px solid #eeeeee;
        color: #515a6e;
        font-size: 12px;
        text-align: center;
        width: 100%;
      }
      .card:hover {
        border: 1px solid #ddf1f9;
      }
    }
  }
</style>
