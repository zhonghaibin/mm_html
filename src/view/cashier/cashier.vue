<template>
  <div ref="box1" class="box">
    <div class="column">开单收银</div>
    <div class="top">
      <div class="vin-info">
        <div class="header">
          <div class="left">
            <SearchVipList @on-row-click="onGroupRowClick" />
          </div>
          <div class="right">
            <div class="bt" @click="showModal('新增会员', 'memberInfoDetails')">
              新增会员
            </div>
          </div>
        </div>
        <div class="content">
          <div class="head">
            <Avatar class="img" :src="avatar(memberInfo.pic_url)" />
          </div>
          <div class="info">
            <div class="row">
              <div class="l">
                <div class="row">
                  {{ memberInfo.name }} 卡号 ：{{ memberInfo.vip_id }}
                </div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">{{ memberInfo.tel }}</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">所属门店：{{ memberInfo.shop_name }}</div>
              </div>
              <div class="r">
                <span
                  class="text"
                  @click="showModal('会员详情', 'VipDetails', memberInfo)"
                >
                  会员详情>
                </span>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="row">
              <div class="l">
                <div class="row">&nbsp;</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">持有效卡：{{ memberInfo.card_num }}</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">会员等级：{{ memberInfo.tname }}</div>
              </div>
              <div class="r">
                <span
                  class="text"
                  @click="showModal('变更等级', 'EditVipGrade', memberInfo)"
                >
                  变更等级>
                </span>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="row">
              <div class="l">
                <div class="row">余额：￥{{ memberInfo.money }}</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">积分：{{ memberInfo.integral }}</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">欠款：￥{{ memberInfo.arrears }}</div>
              </div>
              <div class="r">
                <span
                  class="text"
                  @click="
                    jumpRouter('cashier.order', { tab_index: '欠款订单' })
                  "
                >
                  去还款>
                </span>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="row">
              <div class="l">
                <div class="row">
                  总计到店：{{ memberInfo.arrival_count }}次
                </div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">
                  上次消费：{{ memberInfo.arrival_new_time }}
                </div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">消费内容：骨盆修复</div>
              </div>
              <div class="r"></div>
            </div>
          </div>
          <div class="info" style="border-right: none">
            <div class="row">
              <div class="l">
                <div class="row">推荐人：张三</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">累计推荐：0人</div>
              </div>
              <div class="r"></div>
            </div>
            <div class="row">
              <div class="l">
                <div class="row">可用分红/积分：￥234</div>
              </div>
              <div class="r">
                <span
                  class="text"
                  @click="
                    showModal(
                      '消费型股东信息',
                      'VipShareholderDividends',
                      memberInfo
                    )
                  "
                >
                  消费型股东信息>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="row">
            <div class="left">备注信息：</div>
            <div class="remark">{{ memberInfo.info }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Tabs
        v-model="tab_index"
        name="parent"
        type="card"
        @on-click="handleTabClick"
      >
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
          tab="parent"
        >
          <StampCard v-if="current(item, '划卡/项目/商品')" />
          <Buy v-if="current(item, '购卡')" />
          <Renewal v-if="current(item, '卡续充')" />
          <ChangeCard v-if="current(item, '换卡/升卡')" />
          <IntegralRecharge v-if="current(item, '积分充值')" />
          <Give v-if="current(item, '赠送')" />
        </TabPane>
      </Tabs>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <memberInfoDetails v-if="modalShow('memberInfoDetails')" />
      <VipDetails v-if="modalShow('VipDetails')" />
      <EditVipGrade
        v-if="modalShow('EditVipGrade')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <VipShareholderDividends
        v-if="modalShow('VipShareholderDividends')"
        :member-info="memberInfo"
      />
    </Modal>
  </div>
</template>
<script>
  import StampCard from '@/components/cashier/cashier/stamp-card'
  import Buy from '@/components/cashier/cashier/buy'
  import Renewal from '@/components/cashier/cashier/renewal'
  import IntegralRecharge from '@/components/cashier/cashier/integral-recharge'
  import memberInfoDetails from '@/components/vip-details/vip-info/vip-info-details'
  import ChangeCard from '@/components/cashier/cashier/change-card'
  import Give from '@/components/cashier/cashier/give'
  import SearchVipList from '@/components/form/search-vip-list'
  import default_avatar from '../../assets/default_avatar.png'
  import VipDetails from '@/components/vip-details/vip-details'
  import cookie from 'js-cookie'
  import EditVipGrade from '@/components/vip-details/edit-vip-grade'
  import VipShareholderDividends from '@/components/vip-details/vip-shareholder-dividends'

  export default {
    name: 'Cashier',
    components: {
      VipShareholderDividends,
      EditVipGrade,
      VipDetails,
      Give,
      ChangeCard,
      IntegralRecharge,
      StampCard,
      Buy,
      Renewal,
      memberInfoDetails,
      SearchVipList,
    },
    data: function () {
      return {
        default_avatar: default_avatar,
        memberInfo: {
          pic_url: '',
          name: '-',
          vip_id: '-',
          shop_name: '-',
          tel: '-',
          card_num: '-',
          type_name: '-',
          money: '0',
          integral: '0',
          arrears: '0',
          arrival_count: '-',
          arrival_new_time: '-',
          adviser_name: '-',
          info: '',
          tname: '-',
        },
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
          scrollable: true,
          styles: { top: '50px' },
        },
        tab_index: '划卡/项目/商品',
        tab_list: [
          { name: '划卡/项目/商品', id: 1 },
          { name: '购卡', id: 2 },
          { name: '卡续充', id: 3 },
          { name: '换卡/升卡', id: 4 },
          { name: '积分充值', id: 5 },
          { name: '赠送', id: 6 },
        ],
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
      current() {
        return (item, name) => {
          return name === item.name && this.tab_index === name
        }
      },
      avatar() {
        return (img) => {
          return img === '' || img === null ? this.default_avatar : img
        }
      },
    },

    mounted() {
      this.$nextTick(() => {})
    },
    methods: {
      change() {
        this.modal.show = false
      },
      onGroupRowClick(row) {
        this.memberInfo = row
      },
      handleTabClick() {},
      showModal(title, type, data = {}) {
        switch (title) {
          case '新增会员':
            this.modal.width = 600
            break
          case '会员详情':
            // if (!data.id) {
            //   this.$Message.error('请先选择会员')
            //   return false
            // }
            // cookie.set('vid', data.id)
            this.modal.width = window.innerWidth - 200
            break
          case '变更等级':
            // if (!data.id) {
            //   this.$Message.error('请先选择会员')
            //   return false
            // }
            cookie.set('vid', data.id)
            this.modal.width = 600
            break
          case '消费型股东信息':
            // if (!data.id) {
            //   this.$Message.error('请先选择会员')
            //   return false
            // }
            this.modal.width = window.innerWidth - 200
            break
        }

        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      jumpRouter(name, params = {}) {
        this.$router.push({ name: name, params: params })
      },
      async getMemberInfo() {
        const { data } = { data: { tname: 'ddd' } }
        this.memberInfo.tname = data.tname
      },
    },
  }
</script>
<style lang="less" scoped>
  .box {
    .top {
      background: white;
      padding: 10px 16px 14px 16px;
      border-radius: 8px;
      margin-bottom: 10px;

      .vin-info {
        .header {
          display: flex;
          align-items: center;

          .left {
            flex: 1;
          }

          .right {
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

        .content {
          padding: 10px;
          display: flex;

          .head {
            .img {
              height: 60px;
              width: 60px;
            }
          }

          .info {
            width: 300px;
            border-right: 1px solid #dcdcdc;
            font-size: 12px;
            .row {
              display: flex;

              .l {
                flex: 1;
                padding: 2px 12px;
              }

              .r {
                padding: 0 10px;

                .text {
                  color: #1298e6;
                  cursor: pointer;
                }
              }
            }
          }
        }

        .footer {
          .row {
            display: flex;
            align-content: center;

            .left {
              width: 80px;
              height: 40px;
              line-height: 40px;
            }

            .remark {
              width: 100%;
              height: 40px;
              border: 1px dashed #505050;
              border-radius: 10px;
              padding: 2px 4px;
            }
          }
        }
      }
    }
  }
</style>
