<template>
  <div class="index">
    <VipSearch @change="change" @search="searchValues" />
    <div class="list-top">
      <span class="black">共{{ vip_total }}个会员</span>
      <span class="black">（所有会员总余额：￥{{ money }}元</span>
      <span class="red">所有会员总欠款：{{ arrears }}元</span>
      <span class="black">）</span>
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
        :row-config="{ isHover: true, height: 120 }"
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
        >
          <template #default="{ row }" v-if="item.title === '会员信息'">
            <div class="vip-info">
              <div class="avatar-info">
                <Avatar class="avatar" :src="avatar(row.pic_url)" />
              </div>
              <div>
                <div class="name">
                  {{ row.name }}
                </div>
                <div class="tel">
                  {{ row.tel }}
                </div>
                <div
                  style="
                    color: rgb(128, 128, 140);
                    text-align: left;
                    overflow: hidden;
                    width: 120px;
                    text-overflow: ellipsis;

                    white-space: nowrap;
                  "
                  :title="row.vip_id"
                >
                  {{ row.vip_id }}
                </div>
                <div
                  style="
                    text-align: center;
                    border: 1px solid rgb(34, 141, 87);
                    border-radius: 32px;
                    background: rgb(34, 141, 87);
                    height: 18px;
                    line-height: 18px;
                    color: rgb(255, 255, 255);
                    margin-top: 4px;
                    margin-bottom: 10px;
                    width: 80px;
                  "
                >
                  {{ row.tname }}
                </div>
              </div>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '会员账户'">
            <div>
              <span style="display: block; color: rgb(128, 128, 140)">
                持卡：{{ row.card_num }}张
              </span>
              <span style="display: block; color: rgb(128, 128, 140)">
                余额：{{ row.money }}
              </span>
              <span style="display: block; color: rgb(128, 128, 140)">
                积分：{{ row.integral }}
              </span>
              <span>
                <span style="color: rgb(128, 128, 140)">欠款：</span>
                <span style="color: rgb(246, 39, 39)">{{ row.arrears }}</span>
              </span>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '总消费'">
            <div>
              <span>
                <span style="color: rgb(128, 128, 140)">消费总计：</span>
                <span>{{ row.order_total }}</span>
              </span>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '到店次数'">
            <div>
              <div>
                <span style="color: rgb(128, 128, 140)">到店次数：</span>
                <span>{{ row.arrival_count }}</span>
              </div>
              <div>
                <span style="color: rgb(128, 128, 140)">本月到店：</span>
                <span>{{ row.arrival_month }}</span>
              </div>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '上次消费'">
            <div style="text-align: left">
              <span>
                <div style="color: rgb(128, 128, 140)">
                  {{ row.arrival_new_time }}
                </div>
              </span>
              <div>
                <span style="color: rgb(128, 128, 140)">服务人员：</span>
                <span>{{ row.arrival_new_staff }}</span>
              </div>
              <div>
                <span style="color: rgb(128, 128, 140)">消费：</span>
                <span>{{ row.arrival_new_money }}</span>
              </div>
            </div>
          </template>
          <template #default="{ row }" v-else-if="item.title === '生日'">
            <div>
              <div>
                <span style="color: rgb(128, 128, 140)">
                  {{ row.birthday_type === '1' ? '阳历' : '阴历' }}
                </span>
              </div>
              <div>
                <span style="color: rgb(128, 128, 140)">
                  {{ row.birthday }}
                </span>
              </div>
              <div>
                <span style="color: rgb(128, 128, 140)">距生日</span>
                <span>{{ row.birthday_num }}天</span>
              </div>
            </div>
          </template>
          <template v-else-if="item.title === '绑定状态'">
            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div style="display: flex">
                <span style="color: rgb(128, 128, 140)">已绑定</span>
                <img
                  alt="微信"
                  :src="WeChatImgUrl"
                  style="
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    overflow: hidden;
                  "
                />
              </div>
              <div style="display: flex">
                <span style="color: rgb(128, 128, 140)">已绑定</span>
                <img
                  alt="企业微信"
                  :src="WeComImgUrl"
                  style="
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    overflow: hidden;
                  "
                />
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column fixed="right" title="操作" width="120">
          <template #default="{ row }">
            <span class="bt" @click="showModal('客户详情', 'VipDetails', row)">
              详情
            </span>
            <Poptip placement="right">
              <div slot="content">
                <div style="cursor: pointer">
                  <p
                    v-for="(item, index) in moreList"
                    :key="index"
                    @click="choose(item, row)"
                  >
                    {{ item.label }}
                  </p>
                </div>
              </div>
              <span class="bt">更多</span>
            </Poptip>
          </template>
        </vxe-column>
      </vxe-table>

      <div class="page">
        <Page
          :current="searchData.p"
          :page-size="searchData.page"
          show-elevator
          show-sizer
          size="small"
          :total="searchData.count"
          transfer
          @on-change="currentPage"
          @on-page-size-change="pageSizeChange"
        />
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
      <VipDetails v-if="modalShow('VipDetails')" @close-modal="closeModal" />
      <VipInfoDetails
        v-if="modalShow('VipInfoDetails')"
        :member-info="memberInfo"
        @refreshMemberInfo="refreshMemberInfo"
      />
    </Modal>
  </div>
</template>

<script>
  import VipSearch from '@/components/vip/vip-list/vip-search'
  import default_avatar from '../../assets/default_avatar.png'
  import cookie from 'js-cookie'
  import VipDetails from '@/components/vip-details/vip-details'
  import VipInfoDetails from '@/components/vip-details/vip-info/vip-info-details'

  export default {
    name: 'VipList1',
    components: {
      VipSearch,
      VipDetails,
      VipInfoDetails,
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableColumns: [
          {
            title: '会员信息',
            key: 'name',
            width: 140,
          },
          {
            title: '会员账户',
            key: 'username',
            width: 120,
          },
          {
            title: '总消费',
            key: 'money',
            width: 120,
          },
          {
            title: '到店次数',
            key: 'count',
            width: 120,
          },
          {
            title: '上次消费',
            key: 'money1',
            width: 120,
          },
          {
            title: '来源',
            key: 'source_name',
            width: 120,
          },
          {
            title: '生日',
            key: 'birthday',
            width: 120,
          },
          {
            title: '顾问',
            key: 'adviser_name',
            width: 120,
          },
          {
            title: '绑定状态',
            key: 'status',
            width: 120,
          },
        ],
        moreList: [
          { label: '编辑', value: '1' },
          { label: '开单', value: '2' },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
        default_avatar: default_avatar,
        vip_total: 0,
        arrears: 0,
        money: 0,
        memberInfo: {},
        WeComImgUrl: require('../../assets/企业微信.png'),
        WeChatImgUrl: require('../../assets/微信.png'),
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
      avatar() {
        return (img) => {
          return img === '' || img === null ? this.default_avatar : img
        }
      },
    },
    created() {
      this.getTotal()
      this.getList()
    },
    methods: {
      searchValues(params) {
        this.searchData = params
        this.search()
      },
      change() {
        this.getTotal()
        this.getList()
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {
        this.searchData.p = 1
        this.getList()
      },
      async getList() {
        this.loading = true
        const { data } = { data: { list: [{ name: 11 }] } }
        this.loading = false
        this.tableData = data.list
        this.searchData.count = Number(0)
        this.searchData.p = Number(1)
      },
      async getTotal() {
        this.money = 0
        this.vip_total = 0
        this.arrears = 0
      },
      closeModal() {
        this.modal.show = false
      },
      showModal(title, type, data) {
        cookie.set('vid', data.id)
        console.log(data.id)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        switch (type) {
          case 'VipInfoDetails':
            this.modal.width = 600
            break
          default:
            this.modal.width = window.innerWidth - 200
        }
      },

      choose(item, row) {
        this.memberInfo = row
        switch (item.label) {
          case '编辑':
            this.showModal('编辑会员资料', 'VipInfoDetails', row)
            break
          case '开单':
            this.jumpRouter('cashier.index')
            break
        }
        console.log(item)
      },
      jumpRouter(name, params = {}) {
        this.$router.push({ name: name, params: params })
      },
      refreshMemberInfo() {
        this.modal.show = false
      },
    },
  }
</script>

<style lang="less" scoped>
  .index {
    .list-top {
      background: white;
      padding: 0 10px;
      margin-top: 10px;
      height: 36px;
      line-height: 36px;
      font-size: 12px;

      .black {
        color: black;
        font-weight: bold;
      }

      .red {
        color: #e14a4a;
        font-weight: bold;
        margin-left: 20px;
      }
    }

    .list {
      .vip-info {
        display: flex;
        align-items: center;
        padding: 0 8px;
        .avatar-info {
          width: 40px;
          height: 40px;
          position: relative;
          border-radius: 100%;
          top: -12px;
          left: -8px;
          .avatar {
            width: 40px;
            height: 40px;
          }
        }
        .name {
          color: rgb(128, 128, 140);
          padding-top: 10px;
          text-align: left;
        }

        .tel {
          color: rgb(128, 128, 140);
          text-align: left;
        }
      }
      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
      }
      .bt {
        color: #1298e6;
        cursor: pointer;
        padding: 10px;
      }
    }
  }
</style>
