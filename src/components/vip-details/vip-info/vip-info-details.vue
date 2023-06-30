<template>
  <div class="VipInfoDetails">
    <div class="details">
      <div class="box">
        <div class="header">必填信息</div>
        <div class="content">
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员姓名
            </div>
            <div class="center">
              <Input
                v-model="formData.name"
                placeholder="请输入会员姓名"
                style="width: 200px"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员性别
            </div>
            <div class="center">
              <RadioGroup v-model="formData.sex">
                <Radio
                  v-for="item in sexList"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </Radio>
              </RadioGroup>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              手机号
            </div>
            <div class="center">
              <Input
                v-model="formData.tel"
                placeholder="请输入正确手机号"
                style="width: 200px"
                @on-blur="tel"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员类型
            </div>
            <div class="center">
              <RadioGroup v-model="formData.type">
                <Radio
                  v-for="item in vipTypeList"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </Radio>
              </RadioGroup>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              来源渠道
            </div>
            <div class="center">
              <Select
                v-model="formData.source_id"
                clearable
                filterable
                :loading="loading"
                style="width: 200px"
              >
                <div slot="empty">未找到数据</div>
                <Option
                  v-for="item in sourceList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              所属门店
            </div>
            <div class="center">
              <Select
                v-model="formData.sid"
                clearable
                :disabled="type"
                filterable
                :loading="loading"
                style="width: 200px"
                @on-select="selectShop"
              >
                <div slot="empty">未找到数据</div>
                <Option
                  v-for="item in shopList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
          <div v-if="formData.type !== '0'" class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员等级
            </div>
            <div class="center">
              <Select
                v-model="formData.tid"
                clearable
                filterable
                :loading="loading"
                style="width: 200px"
              >
                <div slot="empty">未找到数据</div>
                <Option
                  v-for="item in gradeList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员有效期
            </div>
            <div class="center">
              <DatePicker
                v-model="formData.end_time"
                format="yyyy-MM-dd"
                placeholder="请选择时间"
                style="width: 200px"
                transfer
                type="date"
                :value="formData.end_time"
                value-format="yyyy-MM-dd"
                @on-change="formData.end_time = $event"
              />
            </div>
            <div class="right">
              <Checkbox
                v-model="formData.choose"
                :false-value="1"
                :true-value="0"
              >
                <span>永久有效</span>
              </Checkbox>
            </div>
          </div>
          <div class="row">
            <div class="left">
              <span style="color: red">*</span>
              会员状态
            </div>
            <div class="center">
              <Select v-model="formData.status" style="width: 200px">
                <Option
                  v-for="item in statusList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">选填信息</div>
        <div class="content">
          <div class="row">
            <div class="left">会员生日</div>
            <div class="center">
              <DatePicker
                v-model="formData.birthday"
                format="yyyy-MM-dd"
                placeholder="请选择时间"
                style="width: 200px"
                transfer
                type="date"
                :value="formData.birthday"
                value-format="yyyy-MM-dd"
                @on-change="formData.birthday = $event"
              />
            </div>
            <div class="right"></div>
          </div>

          <div class="row">
            <div class="left">专属顾问</div>
            <div class="center">
              <Select
                v-model="formData.dispose_staff"
                clearable
                filterable
                :loading="loading"
                style="width: 200px"
              >
                <div slot="empty">未找到数据</div>
                <Option
                  v-for="item in staffList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">专属产康师</div>
            <div class="center">
              <Select
                v-model="formData.adviser"
                clearable
                filterable
                :loading="loading"
                style="width: 200px"
              >
                <div slot="empty">未找到数据</div>
                <Option
                  v-for="item in staffList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">会员地址</div>
            <div class="center">
              <Input
                v-model="formData.address"
                placeholder="请输入会员地址"
                style="width: 200px"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">身份证</div>
            <div class="center">
              <Input
                v-model="formData.id_card_no"
                placeholder="请输入会员身份证"
                style="width: 200px"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">孕期</div>
            <div class="center">
              <Input
                v-model="formData.baby_birthday"
                placeholder="请输入孕期"
                style="width: 200px"
              />
            </div>
            <div class="right">周</div>
          </div>
          <div class="row">
            <div class="left">预产期</div>
            <div class="center">
              <DatePicker
                v-model="formData.expected_date"
                format="yyyy-MM-dd"
                placeholder="请选择时间"
                style="width: 200px"
                transfer
                type="date"
                :value="formData.expected_date"
                value-format="yyyy-MM-dd"
                @on-change="formData.expected_date = $event"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">当前胎数</div>
            <div class="center">
              <Input
                v-model="formData.tai_num"
                placeholder="请输入胎数"
                style="width: 200px"
              />
            </div>
            <div class="right"></div>
          </div>
          <div class="row">
            <div class="left">会员密码</div>
            <div class="center">
              <Input
                v-model="formData.pwd"
                placeholder="请输入会员密码"
                style="width: 200px"
              />
            </div>
            <div class="right"></div>
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
    name: 'VipInfoDetails',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        loading: false,
        sexList: [
          {
            label: '女',
            value: '1',
          },
          {
            label: '男',
            value: '0',
          },
        ],
        vipTypeList: [
          {
            label: '会员',
            value: '1',
          },
          {
            label: '散客',
            value: '0',
          },
        ],
        sourceList: [],
        shopList: [],
        storeList: [],
        gradeList: [],
        statusList: [
          {
            value: '0',
            label: '正常使用',
          },
          {
            value: '1',
            label: '挂失锁定',
          },
        ],
        staffList: [],
        formData: {
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
        formCheckTel: {
          tel: '',
          vip_id: '',
          outside_memberid: '',
        },
        type: false,
      }
    },
    created() {
      this.getMemberSourceList()
      this.getShopList()
      this.getStaffList()
      this.type = false
      if (this.memberInfo && Object.keys(this.memberInfo).length > 0) {
        this.type = true
        this.selectShop(this.memberInfo.sid)
        this.formData = this.memberInfo
        this.formData.vip_id = this.memberInfo.vip_id
        this.formCheckTel.outside_memberid = this.memberInfo.outside_memberid
        this.formCheckTel.vip_id = this.memberInfo.vip_id
      }
    },
    methods: {
      save() {
        console.log('save', this.formData)
        if (this.type) {
          this.vipEdit()
        } else {
          this.setVip()
        }
      },

      tel() {
        this.formCheckTel.tel = this.formData.tel
        this.checkTel()
      },
      async getMemberSourceList() {
        this.loading = true
        const { data } = { data: { list: [] } }
        this.loading = false
        this.sourceList = data.list
      },
      async getShopList() {
        this.loading = true
        const { data } = { data: { list: [] } }
        this.loading = false
        this.shopList = data.list
      },
      selectShop(sid) {
        this.getMemberGradeList(sid)
      },
      async getMemberGradeList(sid) {
        console.log(sid)
        this.loading = true
        const { data } = { data: { list: [{ name: 11 }] } }
        this.loading = false
        this.gradeList = data.list
      },
      async getStaffList() {
        this.loading = true
        const { data } = { data: { list: [] } }
        this.loading = false
        this.staffList = data.list
      },

      async checkTel() {
        const { data, status, msg } = { data: [], status: 0, msg: '请求失败' }
        if (status === 0) {
          this.formData.tel = ''
          this.$Message.error(msg)
          return false
        }
        let info = data
        if (info.outside_memberid) {
          this.formData.outside_memberid = info.outside_memberid
        }
        if (info.address) {
          this.formData.address = info.address
        }
        if (info.name) {
          this.formData.name = info.name
        }
        if (info.vip_id) {
          this.formData.vip_id = info.vip_id
        }
        if (info.birthday_type) {
          this.formData.birthday_type = info.birthday_type
        }
        if (info.birthday) {
          this.formData.birthday = info.birthday
        }
      },
      async setVip() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change')
        }
      },
      async vipEdit() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('refreshMemberInfo')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipInfoDetails {
    .details {
      overflow: auto;
      height: 500px;

      .box {
        padding: 0 50px;

        .header {
          font-size: 14px;
          font-weight: bold;
          flex: 1;
          margin: 10px 0;
        }

        .content {
          .row {
            display: flex;
            height: 30px;
            align-items: center;
            margin: 4px auto;

            .left {
              width: 100px;
              text-align: right;
              padding: 2px 4px;
            }

            .right {
              padding-left: 10px;
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
