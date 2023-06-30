<template>
  <div class="ValueCardList">
    <div class="search">
      <div class="box">
        <div class="money">总余额：￥12312312</div>
      </div>
      <div class="box">
        <Input enter-button placeholder="输入储值卡名称" search />
      </div>
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
        <span class="text">赠金</span>
        <div>
          <Input enter-button name="" placeholder="" style="width: 100px" />
        </div>
        <span class="text">天到期</span>
      </div>
      <div class="box">
        <Button icon="ios-search" type="primary">搜索</Button>
      </div>
    </div>
    <div class="list">
      <div class="card">
        <div class="header">骨盆修复套餐</div>
        <div class="content">
          <div class="row">
            <div class="left">购卡日期</div>
            <div class="right">
              <div class="text">2020/02/10 15:12</div>
            </div>
          </div>
          <div class="row">
            <div class="left">卡有效期</div>
            <div class="right">
              <div class="text">永久有效</div>
            </div>
          </div>
          <div class="row">
            <div class="left">剩余次数</div>
            <div class="right">
              <div class="text">8次</div>
            </div>
          </div>
          <div class="more">
            <div class="details" @click="showModal('卡详情', 'VipCardInfo2')">
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
        <VipCardInfo2 v-if="modalShow('VipCardInfo2')" />
      </Modal>
    </div>
  </div>
</template>

<script>
  import VipCardInfo2 from '@/components/vip-details/vip-account/value-card'

  export default {
    name: 'ValueCardList',
    components: {
      VipCardInfo2,
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
  .ValueCardList {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .box {
        display: flex;
        align-items: center;

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
          background: #ccf0d3;
          font-weight: bold;
          padding: 0 10px;
          font-size: 14px;
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
        border: 1px solid #fcbad7;
      }
    }
  }
</style>
