<template>
  <div class="Exchange">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">{{ memberInfo.name }} {{ memberInfo.tel }}</div>
      </div>
      <div class="row">
        <div class="left">当前积分</div>
        <div class="right">
          {{ memberInfo.integral ? memberInfo.integral : 0 }}
        </div>
      </div>
      <div class="row">
        <div class="left">选择礼品</div>
        <div class="right">
          <Select
            v-model="formData.gift_id"
            clearable
            filterable
            :loading="loading"
            style="width: 200px"
          >
            <div slot="empty">未找到数据</div>
            <Option v-for="item in giftList" :key="item.id" :value="item.id">
              {{ item.name }} （{{ item.integral }}积分）
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">备注</div>
        <div class="right">
          <Input v-model="formData.info" placeholder="" style="width: 200px" />
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
    name: 'Exchange',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        giftList: [],
        formData: {
          vip_id: this.memberInfo.vip_id,
          info: '',
          gift_id: '',
        },
        loading: false,
      }
    },
    created() {
      this.getGiftList()
    },
    methods: {
      save() {
        this.integralBuy()
      },
      async integralBuy() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change')
          this.$emit('refreshMemberInfo')
        }
      },
      async getGiftList() {
        this.loading = true
        this.loading = false
        this.giftList = []
      },
    },
  }
</script>

<style lang="less" scoped>
  .Exchange {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .left {
          width: 120px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
          width: 100%;

          .tag {
            display: block;
            float: left;
            border: 1px solid #ccc;
            margin: 2px;
            padding: 2px;
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
