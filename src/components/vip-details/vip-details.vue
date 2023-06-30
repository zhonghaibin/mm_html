<template>
  <div class="VipDetails">
    <div class="box">
      <div class="header">
        <div class="left">
          <Avatar class="img" :src="avatar(memberInfo.pic_url)" />
          <div class="content">
            <div class="row1">
              <div class="name">{{ memberInfo.name }}</div>
              <div class="tel">{{ memberInfo.tel }}</div>
              <div class="level">
                <div class="bt" @click="showModal('变更等级', 'EditVipGrade')">
                  {{ memberInfo.tname }}
                </div>
              </div>
            </div>
            <div class="row2">
              <div
                class="member_no"
                @click="showModal('更换会员卡号', 'EditCardNo')"
              >
                卡号{{ memberInfo.vip_id }}
                <Icon type="md-create" />
              </div>
              <div class="bind">
                <div class="box">
                  <div class="img">
                    <img :src="WeComImgUrl" />
                  </div>
                  <div class="title">绑定</div>
                </div>
                <div class="box">
                  <div class="img">
                    <img :src="WeChatImgUrl" />
                  </div>
                  <div class="title">绑定</div>
                </div>
              </div>
            </div>
            <div class="row3">
              <div class="title">
                专属顾问：{{ memberInfo.dispose_staff_name }}
              </div>
              <div class="title">专属产康师：{{ memberInfo.adviser_name }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="row1">
            <div class="bt" @click="jump('预约记录')">预约</div>
            <div class="bt" @click="cashier()">收银</div>
            <div class="bt">赠送</div>
            <div class="bt" @click="showModal('添加提醒', 'VipRemind')">
              提醒
            </div>
            <div class="bt" @click="showModal('添加回访', 'VipReturnVisit')">
              回访
            </div>
            <div class="bt" @click="showModal('添加寄存商品', 'Deposit')">
              寄存
            </div>
            <div class="bt" @click="showModal('会员转店', 'GoShop')">转店</div>
            <div class="bt" @click="showModal('积分兑换', 'Exchange')">
              积分兑换
            </div>
            <div class="bt" @click="showModal('积分修改', 'EditIntegral')">
              积分修改
            </div>
          </div>
          <div class="row2">
            <div class="label">
              <span class="title">个性标签：</span>

              <Tag
                v-for="item in memberInfo.portrait_tags"
                :key="item.name"
                :name="item.name"
              >
                {{ item.name }}
              </Tag>
              <Button
                icon="ios-add"
                size="small"
                type="dashed"
                @click="showModal('个性标签', 'PersonalityLabel')"
              >
                添加标签
              </Button>
            </div>
            <div class="node">
              <span class="title">备注信息：</span>
              <div class="info">{{ memberInfo.info }}</div>
            </div>
          </div>
        </div>
      </div>
      <div ref="tab" class="tab">
        <Tabs
          v-model="tab_index"
          name="name"
          type="card"
          @on-click="handleTabClick"
        >
          <TabPane
            v-for="item in tab_list"
            :key="item.id"
            :label="item.name"
            :name="item.name"
            tab="name"
          >
            <VipAccount
              v-if="currentTabPane(item, '会员账户')"
              :member-info="memberInfo"
            />
            <VipInfo
              v-if="currentTabPane(item, '会员资料')"
              :member-info="memberInfo"
              @refreshMemberInfo="getMemberInfo"
            />
            <VipData
              v-if="currentTabPane(item, '会员数据')"
              :member-info="memberInfo"
            />
            <ReturnVisit
              v-if="currentTabPane(item, '回访记录')"
              :member-info="memberInfo"
            />
            <VipAppointment
              v-if="currentTabPane(item, '预约记录')"
              :member-info="memberInfo"
            />
            <VipAssetsRecord
              v-if="currentTabPane(item, '资产记录')"
              :member-info="memberInfo"
            />
            <CustomerInfo
              v-if="currentTabPane(item, '客情管理')"
              :member-info="memberInfo"
            />
            <VipShareholderDividends
              v-if="currentTabPane(item, '推荐奖励')"
              :member-info="memberInfo"
            />
            <Attachment
              v-if="currentTabPane(item, '附件管理')"
              :member-info="memberInfo"
            />
            <VipGoodsDeposit
              v-if="currentTabPane(item, '商品寄存')"
              :member-info="memberInfo"
            />
            <QuestionnaireSurvey
              v-if="currentTabPane(item, '问卷调查')"
              :member-info="memberInfo"
            />
          </TabPane>
        </Tabs>
      </div>
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="true"
      :title="modal.title"
      :width="modal.width"
    >
      <EditVipGrade
        v-if="modalShow('EditVipGrade')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <EditCardNo
        v-if="modalShow('EditCardNo')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <PersonalityLabel
        v-if="modalShow('PersonalityLabel')"
        :member-info="memberInfo"
        @changeLabels="changeLabels"
      />
      <Exchange
        v-if="modalShow('Exchange')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <EditIntegral
        v-if="modalShow('EditIntegral')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <GoShop
        v-if="modalShow('GoShop')"
        :member-info="memberInfo"
        @change="change"
        @refreshMemberInfo="getMemberInfo"
      />
      <Deposit
        v-if="modalShow('Deposit')"
        :member-info="memberInfo"
        @changeDeposit="change"
      />
      <VipReturnVisit
        v-if="modalShow('VipReturnVisit')"
        :member-info="memberInfo"
        @change="change"
      />
      <VipRemind
        v-if="modalShow('VipRemind')"
        :member-info="memberInfo"
        @change="change"
      />
    </Modal>
  </div>
</template>

<script>
  import VipAccount from '@/components/vip-details/vip-account'
  import VipInfo from '@/components/vip-details/vip-info'
  import VipData from '@/components/vip-details/vip-data'
  import VipAppointment from '@/components/vip-details/vip-appointment'
  import VipAssetsRecord from '@/components/vip-details/vip-assets-record'
  import VipShareholderDividends from '@/components/vip-details/vip-shareholder-dividends'
  import VipGoodsDeposit from '@/components/vip-details/vip-goods-deposit'
  import Attachment from '@/components/vip-details/attachment'
  import CustomerInfo from '@/components/vip-details/customer-info'
  import PersonalityLabel from '@/components/vip-details/personality-label'
  import Exchange from '@/components/vip-details/integral/exchange'
  import EditIntegral from '@/components/vip-details/integral/edit-Integral'
  import GoShop from '@/components/vip-details/go-shop'
  import Deposit from '@/components/vip-details/vip-goods-deposit/deposit'
  import ReturnVisit from '@/components/vip-details/return-visit'
  import VipReturnVisit from '@/components/vip-details/return-visit/vip-return-visit'
  import VipRemind from '@/components/vip-details/return-visit/vip-remind'
  import EditCardNo from '@/components/vip-details/edit-card-no'
  import default_avatar from '@/assets/default_avatar.png'
  import cookie from 'js-cookie'
  import QuestionnaireSurvey from '@/components/vip-details/questionnaire-survey'
  import EditVipGrade from '@/components/vip-details/edit-vip-grade'

  export default {
    name: 'VipDetails',
    components: {
      EditVipGrade,
      QuestionnaireSurvey,
      VipAccount,
      VipInfo,
      VipData,
      VipAppointment,
      VipAssetsRecord,
      VipReturnVisit,
      VipShareholderDividends,
      VipGoodsDeposit,
      Attachment,
      CustomerInfo,
      PersonalityLabel,
      Exchange,
      EditIntegral,
      GoShop,
      Deposit,
      ReturnVisit,
      VipRemind,
      EditCardNo,
    },
    data: function () {
      return {
        default_avatar: default_avatar,
        modal: {
          show: false,
          title: '',
          type: false,
          width: '600',
        },
        tab_index: '会员账户',
        WeComImgUrl: require('../../assets/企业微信.png'),
        WeChatImgUrl: require('../../assets/微信.png'),
        tab_list: [
          {
            id: 1,
            name: '会员账户',
          },
          {
            id: 2,
            name: '会员资料',
          },
          {
            id: 3,
            name: '会员数据',
          },
          {
            id: 4,
            name: '回访记录',
          },
          {
            id: 5,
            name: '预约记录',
          },
          {
            id: 6,
            name: '资产记录',
          },
          {
            id: 7,
            name: '客情管理',
          },
          {
            id: 8,
            name: '推荐奖励',
          },
          {
            id: 9,
            name: '附件管理',
          },
          {
            id: 10,
            name: '商品寄存',
          },
          {
            id: 11,
            name: '问卷调查',
          },
        ],
        memberInfo: {},
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
      avatar() {
        return (img) => {
          return img === '' || img === null ? this.default_avatar : img
        }
      },
      currentTabPane() {
        return (item, title) => {
          return (
            this.tab_index === title &&
            item.name === title &&
            Object.keys(this.memberInfo).length !== 0
          )
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.tabHeight()
      })
    },
    activated() {
      this.getMemberInfo()
    },
    deactivated() {},
    created() {
      this.getMemberInfo()
    },
    methods: {
      cashier() {
        this.$emit('close-modal')
        this.jumpRouter('cashier.index')
      },
      jumpRouter(name, params = {}) {
        this.$router.push({ name: name, params: params })
      },
      change() {
        this.modal.show = false
      },
      tabHeight() {
        // let orgTreeHeight = window.innerHeight
        // let divHeight = orgTreeHeight - 400
        // this.$refs.tab.style.minHeight = divHeight + 'px'
        // console.log(orgTreeHeight, divHeight)
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      jump(string) {
        this.tab_index = string
      },
      handleTabClick(index) {
        this.tabHeight()
        this.tab_index = index
      },
      changeLabels() {
        //刷新接口
        this.getMemberInfo()
      },

      async getMemberInfo() {
        console.log('getMemberInfo')
        console.log(cookie.get('vid'))
        const { data } = {
          data: {
            id: 1,
            expected_date: '',
            name: '',
            tid: '',
            tel: '',
            choose: 1,
            end_time: '',
            vip_id: '',
            discount: '',
            sex: '',
            status: '0',
            birthday: '',
            birthday_type: '1',
            pwd: '',
            car: '',
            info: '',
            pic_url: '',
            rid: '',
            type: '',
            dispose_staff: '',
            adviser: '',
            id_card_no: '',
            baby_birthday: '',
            source_id: '0',
            address: '',
            tai_num: '',
            baby_data: [],
            intention_id: '',
            blevel_id: '0',
            blevel_bank: '',
            choose1: '0',
            blevel_time: '',
            outside_memberid: '',
            sid: '',
          },
        }
        this.memberInfo = data
        console.log('memberInfo', data)
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipDetails {
    .box {
      height: 100%;

      .header {
        display: flex;
        margin-bottom: 10px;

        .left {
          width: 390px;
          height: 100px;
          background: #cc749a;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          display: flex;
          align-items: center;

          .img {
            margin-left: 20px;
            height: 60px;
            width: 60px;
          }

          .content {
            flex: 1;
            display: flex;
            color: white;
            font-size: 14px;
            flex-direction: column;
            padding-left: 10px;
            padding-right: 10px;

            .row1 {
              font-weight: bold;
              display: flex;
              flex-wrap: wrap;
              display: -webkit-flex; /* Safari */

              .name {
                padding: 4px;
              }

              .tel {
                padding: 6px;
                text-align: center;
              }

              .level {
                flex: 1;
                justify-content: flex-end;
                display: flex;

                .bt {
                  cursor: pointer;
                  border-radius: 30px;
                  border: 1px solid #56a688;
                  background: #56a688;
                  height: 20px;
                  line-height: 20px;
                  padding-left: 8px;
                  padding-right: 8px;
                  margin-top: 5px;
                  text-align: center;
                  font-size: 12px;
                  width: 80px;
                }
              }
            }

            .row2 {
              display: flex;
              flex-flow: wrap;

              .member_no {
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
              }

              .bind {
                flex: 1;
                justify-content: flex-end;
                margin: auto;
                padding-left: 4px;
                padding-right: 4px;
                display: flex;
                align-items: center;

                .box {
                  display: flex;

                  .img {
                    height: 20px;
                    line-height: 20px;
                    width: auto;
                    img {
                      padding: 2px;
                      width: 25px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }

            .row3 {
              display: flex;
              font-weight: bold;
              padding: 10px 0;
              justify-content: space-between;

              .title {
                padding: 0 6px;
              }
            }
          }
        }

        .right {
          flex: 1;

          .row1 {
            display: flex;
            align-items: center;
            flex-flow: wrap;
            min-height: 50px;
            background: white;
            margin-bottom: 6px;

            .bt {
              width: 80px;
              min-width: 60px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              color: white;
              background: #cc749a;
              margin: 1px 20px;
              border-radius: 3px;
              cursor: pointer;
            }
          }

          .row2 {
            display: flex;
            padding: 10px;
            background: white;
            flex-flow: wrap;

            .label {
              overflow: hidden;
              flex: 1;

              .title {
                font-weight: bold;
              }

              .ivu-tag {
                height: 28px;
                line-height: 28px;
                border: 1px solid #b79dcb;
                background: #ede6f2;
                color: #b79dcb;
              }
            }

            .node {
              display: flex;
              justify-content: flex-end;

              .title {
                font-weight: bold;
              }

              .info {
                width: 300px;
                min-height: 46px;
                border: 1px dashed #505050;
                border-radius: 6px;
                margin-left: 10px;
                padding: 2px 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
