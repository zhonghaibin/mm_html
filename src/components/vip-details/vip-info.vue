<template>
  <div class="VipInfo">
    <div class="left">
      <div class="header">
        <div class="l">
          <div class="text">基础信息</div>
        </div>
        <div class="r">
          <div class="bt" @click="showModal('编辑会员资料', 'VipInfoDetails')">
            编辑资料
          </div>
        </div>
      </div>
      <div class="content">
        <div class="row">
          <div class="l">会员姓名：</div>
          <div class="r">{{ info.name }}</div>
        </div>
        <div class="row">
          <div class="l">会员等级：</div>
          <div class="r">{{ info.tname }}</div>
        </div>
        <div class="row">
          <div class="l">手机号：</div>
          <div class="r">{{ info.tel }}</div>
        </div>
        <div class="row">
          <div class="l">会员有效期：</div>
          <div class="r">{{ info.end_time }}</div>
        </div>
        <div class="row">
          <div class="l">实体卡号：</div>
          <div class="r">{{ info.vip_id }}</div>
        </div>
        <div class="row">
          <div class="l">会员状态：</div>
          <div class="r">{{ info.status === '1' ? '禁用' : '正常' }}</div>
        </div>
        <div class="row">
          <div class="l">会员性别：</div>
          <div class="r">{{ info.sex === '1' ? '女性' : '男性' }}</div>
        </div>
        <div class="row">
          <div class="l">会员密码：</div>
          <div class="r">{{ info.pwd }}</div>
        </div>
        <div class="row">
          <div class="l">会员生日：</div>
          <div class="r">{{ info.birthday_type_name }} {{ info.birthday }}</div>
        </div>
        <div class="row">
          <div class="l">当前积分：</div>
          <div class="r">{{ info.integral }}</div>
        </div>
        <div class="row">
          <div class="l">所属门店：</div>
          <div class="r">{{ info.shop_name }}</div>
        </div>
        <div class="row">
          <div class="l">会员类型：</div>
          <div class="r">{{ info.type_name }}</div>
        </div>
        <div class="row">
          <div class="l">推荐人：</div>
          <div class="r">{{ info.rname }}</div>
        </div>
        <div class="row">
          <div class="l">顾问：</div>
          <div class="r">{{ info.adviser_name }}</div>
        </div>
        <div class="row">
          <div class="l">身份证号码：</div>
          <div class="r">{{ info.id_card_no }}</div>
        </div>
        <div class="row">
          <div class="l">孕期：</div>
          <div class="r">{{ info.baby_birthday }}</div>
        </div>
        <div class="row">
          <div class="l">来源：</div>
          <div class="r">{{ info.source_name }}</div>
        </div>
        <div class="row">
          <div class="l">当前胎数：</div>
          <div class="r">{{ info.tai_num }}</div>
        </div>
        <div class="row">
          <div class="l">会员地址：</div>
          <div class="r">{{ info.address }}</div>
        </div>
        <div class="row">
          <div class="l">预产期：</div>
          <div class="r">{{ info.expected_date }}</div>
        </div>
        <div class="row">
          <div class="l">专属产康师：</div>
          <div class="r">{{ info.dispose_staff_name }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="row1">
        <div class="header">
          <div class="label">过敏禁忌</div>
          <div v-for="item in labelsList" :key="item.id" class="lab">
            {{ item.name }}
          </div>
          <div class="lab_bt" @click="showModal('会员禁忌标签', 'TabooLabel')">
            <Icon type="ios-add ico" />
            添加禁忌
          </div>
        </div>
      </div>
      <div class="row2">
        <div class="header">
          <div class="left-row2">
            <span class="label">重要日期</span>
          </div>

          <div class="center-row2">
            <div v-if="loading" class="loading">
              <Spin />
            </div>
            <div
              v-for="(item, index) in ImportantDates.list"
              :key="item.id"
              class="info"
            >
              <div class="title">{{ item.name }}</div>
              <div class="date">
                {{ item.info }}
              </div>
              <div class="del" @click="delRow(index, item)">
                <Icon :size="18" type="ios-trash" />
              </div>
            </div>
            <div style="text-align: center">
              <Page
                v-if="ImportantDates.list.length > 0"
                :current="searchData.p"
                :page-size="searchData.page"
                size="small"
                :total="searchData.count"
                transfer
                @on-change="currentPage"
                @on-page-size-change="pageSizeChange"
              />
            </div>
          </div>
          <div class="right-row2">
            <div class="lab_bt" @click="showModal('添加重要日期', 'AddDate')">
              <Icon type="ios-add ico" />
              添加日期
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
      <VipInfoDetails
        v-if="modalShow('VipInfoDetails')"
        :member-info="memberInfo"
        @refreshMemberInfo="refreshMemberInfo"
      />
      <AddDate
        v-if="modalShow('AddDate')"
        :member-info="memberInfo"
        @change="change"
      />
      <TabooLabel
        v-if="modalShow('TabooLabel')"
        :member-info="memberInfo"
        @changeLabels="changeLabels"
      />
    </Modal>
  </div>
</template>

<script>
  import VipInfoDetails from '@/components/vip-details/vip-info/vip-info-details'
  import AddDate from '@/components/vip-details/vip-info/add-date'
  import TabooLabel from '@/components/vip-details/vip-info/taboo-label'
  import cookie from 'js-cookie'

  export default {
    name: 'VipInfo',
    components: {
      VipInfoDetails,
      AddDate,
      TabooLabel,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
        },
        info: [],
        labelsList: [],
        ImportantDates: {
          list: [],
        },
        searchData: {
          p: 1,
          pageSize: 10,
          count: 0,
        },
        loading: false,
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {
      this.getMemberInfo()
    },
    created() {
      this.getMemberInfo()
      this.getTags()
      this.getList(2)
    },
    methods: {
      refreshMemberInfo() {
        this.modal.show = false
        this.getMemberInfo()

        this.$emit('refreshMemberInfo')
      },
      delRow(index, row) {
        this.$Modal.confirm({
          title: '警告？',
          content: '确定要删除吗？',
          onOk: () => {
            this.delVipRecord(row.id)
            this.ImportantDates.list.splice(index, 1)
          },
          onCancel: () => {},
        })
      },
      change() {
        this.modal.show = false
        this.getVipRecord(2)
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList(2)
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search(2)
      },
      search() {
        this.searchData.p = 1
        this.getList(2)
      },
      async getMemberInfo() {
        console.log(cookie.get('vid'))
        const { data } = { data: {} }
        this.info = data
        console.log('memberInfo', data)
      },
      changeLabels() {
        this.modal.show = false
        this.getTags()
      },
      async getTags() {
        this.labelsList = []
      },
      async getList(type) {
        console.log(type)
        this.loading = true
        this.loading = false
        this.ImportantDates.list = []
        this.searchData.count = Number(0)
        this.searchData.p = Number(1)
      },
      async delVipRecord(id) {
        console.log(id)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .loading {
    display: flex;
    justify-content: center;
  }

  .VipInfo {
    padding: 20px;
    display: flex;

    .left {
      width: 52%;
      padding: 0 10px;

      .header {
        display: flex;

        .l {
          flex: 1;

          .text {
            font-weight: bold;
            font-size: 16px;
          }
        }

        .r {
          display: flex;
          justify-content: flex-end;

          .bt {
            width: 80px;
            min-width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #fceef4;
            color: #cc749a;
            margin: 1px 20px;
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }

      .content {
        display: flex;
        flex-flow: wrap;
        align-items: center;
        font-size: 14px;
        padding: 0 5px;

        .row {
          width: 50%;
          display: flex;
          height: 37px;

          .l {
            font-size: 14px;
            height: 37px;
            line-height: 37px;
          }

          .r {
            height: 37px;
            line-height: 37px;
          }
        }
      }
    }

    .right {
      border-left: 1px solid #efefef;
      flex: 1;
      padding: 0 20px;

      .row1 {
        border: 1px dashed #dcdcdc;
        height: 210px;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 6px;

        .header {
          padding: 20px;
          display: flex;
          align-items: center;
          flex-flow: wrap;

          .label {
            font-weight: bold;
            font-size: 14px;
            padding: 2px;
          }

          .lab {
            height: 20px;
            line-height: 20px;
            background: #f5f5f5;
            color: #d07b9f;
            width: 80px;
            text-align: center;
            margin: 2px 6px;
          }

          .lab_bt {
            margin: 2px;
            display: flex;
            align-items: center;
            width: 80px;
            border-radius: 4px;
            border: 1px dashed #dcdcdc;
            height: 26px;
            line-height: 26px;
            cursor: pointer;

            .ico {
              margin-left: 6px;
            }
          }
        }
      }

      .row2 {
        border: 1px dashed #dcdcdc;
        height: 250px;
        width: 100%;
        border-radius: 6px;

        .header {
          .left-row2 {
            .label {
              font-weight: bold;
              font-size: 14px;
              padding: 2px;
              height: 30px;
              line-height: 30px;
            }
          }

          .center-row2 {
            flex: 1;

            .info {
              height: 30px;
              line-height: 30px;
              display: flex;
              width: 100%;
              padding: 0 10px;

              .title {
                flex: 1;
              }

              .date {
              }

              .del {
                padding: 0 4px;
                cursor: pointer;
                color: red;
              }
            }
          }

          .right-row2 {
            .lab_bt {
              margin: 2px;
              display: flex;
              align-items: center;
              width: 80px;
              border-radius: 4px;
              border: 1px dashed #dcdcdc;
              height: 26px;
              line-height: 26px;
              cursor: pointer;

              .ico {
                margin-left: 6px;
              }
            }
          }

          padding: 20px;
          display: flex;
          flex-flow: wrap;
        }
      }
    }
  }
</style>
