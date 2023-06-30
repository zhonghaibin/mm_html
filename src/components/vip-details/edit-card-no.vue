<template>
  <div class="EditCardNo">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">{{ memberInfo.name }} {{ memberInfo.tel }}</div>
      </div>
      <div class="row">
        <div class="left">当前所属门店</div>
        <div class="right">
          {{ memberInfo.shop_name }}
        </div>
      </div>
      <div class="row">
        <div class="left">当前卡号</div>
        <div class="right">
          {{ memberInfo.vip_id }}
        </div>
      </div>
      <div class="row">
        <div class="left">输入新卡号</div>
        <div class="right">
          <Input
            v-model="formData.new_vip_id"
            placeholder="数字或英文"
            style="width: 200px"
          />
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
    name: 'EditCardNo',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vip_id: this.memberInfo.vip_id,
          new_vip_id: '',
        },
      }
    },
    methods: {
      save() {
        this.updateVipId()
      },
      async updateVipId() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change')
          this.$emit('refreshMemberInfo')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .EditCardNo {
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
