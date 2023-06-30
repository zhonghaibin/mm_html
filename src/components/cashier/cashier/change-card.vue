<template>
  <div class="ChangeCard">
    <div ref="content" class="content">
      <div class="top">
        <div class="cell">
          <div class="search">
            <div class="left">
              <div class="title">旧卡：</div>
            </div>
            <div class="right">
              <SelectOldCard />
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="search">
            <div class="left">
              <div class="title">新卡：</div>
            </div>
            <div class="right">
              <SelectNewCard />
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="search">
            <div class="left">
              <div class="title">换卡/升卡原因：</div>
            </div>
            <div class="right"></div>
          </div>
          <div>
            <Input placeholder="请输入原因" :rows="4" type="textarea" />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="title">换卡升级赠送</div>
          <GiveList />
        </div>
        <div class="right">
          <div class="title">
            <Checkbox>需补差价</Checkbox>
          </div>

          <div class="list">
            <div class="row">
              补款金额：
              <Input placeholder="" size="small" style="width: 100px" />
            </div>
            <StaffPerformance title="持卡人员" />
          </div>
        </div>
      </div>
    </div>
    <div ref="footer" class="footer">
      <div class="footer-left">
        <div class="cell">
          <Checkbox>补单</Checkbox>
        </div>
        <div class="cell">
          流水单号
          <Input placeholder="没有则不填" size="small" style="width: 200px" />
        </div>
        <div class="cell">
          备注信息
          <Input
            placeholder="填写订单备注信息"
            size="small"
            style="width: 200px"
          />
        </div>
        <div class="cell">
          会员到店
          <Input placeholder="" size="small" style="width: 60px" />
        </div>
        <div class="cell">
          散客到店
          <Input placeholder="" size="small" style="width: 60px" />
        </div>
      </div>
      <div class="footer-right">
        <div class="money">
          还需支付:
          <span class="text">￥3033</span>
        </div>
        <div class="cell">
          <div class="add-bt color">确认收款</div>
        </div>
        <div class="cell">
          <div class="add-bt color1">挂单待结</div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <GiveGoods v-if="modalShow('GiveGoods')" />
    </Modal>
  </div>
</template>

<script>
  import SelectOldCard from '@/components/form/select-old-card'
  import SelectNewCard from '@/components/form/select-new-card'
  import GiveList from '@/components/cashier/give-list'
  import StaffPerformance from '@/components/cashier/staff-performance'

  export default {
    name: 'ChangeCard',
    components: { StaffPerformance, SelectNewCard, SelectOldCard, GiveList },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
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
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    destroyed() {},
    methods: {
      setHeight() {
        let height = window.innerHeight - this.$refs.footer.offsetHeight - 308
        this.$refs.content.style.height = height + 'px'
      },
      showModal(title, type, data = {}) {
        switch (title) {
          case '赠送商品':
            this.modal.width = window.innerWidth - 200
            break
          default:
            this.modal.width = 1000
        }
        console.log(data)

        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .ChangeCard {
    position: relative;
    background: white;
    overflow: auto;

    .content {
      overflow: auto;

      .top {
        display: flex;

        .cell {
          padding: 0 20px;
          flex: 1;

          .search {
            padding: 10px 0;
            display: flex;

            .left {
              .title {
                height: 40px;
                line-height: 40px;
              }
            }

            .right {
              flex: 1;
            }
          }
        }
      }

      .center {
        display: flex;
        padding: 10px 20px;

        .left {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          width: 500px;
          border-top: 1px solid #eeeeee;
          border-left: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;

          .title {
            padding: 10px;
            font-weight: bold;
          }
        }

        .right {
          padding-bottom: 70px;
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
          flex: 1;
          border: 1px solid #eeeeee;

          .title {
            padding: 10px;
            font-weight: bold;
          }

          .list {
            .row {
              padding: 10px;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

    .footer {
      z-index: 1000;
      display: flex;
      clear: both;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #dedede;
      left: 0;
      right: 0;
      padding: 10px 0;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
      background: white;

      .footer-left {
        width: 70%;
        display: flex;
        align-items: center;

        .cell {
          padding: 0 10px;
        }
      }

      .footer-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;

        .money {
          flex: 1;
          font-size: 20px;

          .text {
            font-size: 24px;
            color: #f46b53;
          }
        }

        .cell {
        }
      }
    }

    .color {
      border: 1px solid #f19ec2;
      background: #f19ec2;
      color: white;
    }

    .color1 {
      background: white;
      color: #2c2c2c;
      border: 1px solid #2c2c2c;
    }

    .add-bt {
      margin-right: 20px;
      cursor: pointer;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
