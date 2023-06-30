<template>
  <div class="GoShop">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">{{ memberInfo.name }} {{ memberInfo.tel }}</div>
      </div>
      <div class="row">
        <div class="left">当前所属门店</div>
        <div class="right">{{ memberInfo.shop_name }}</div>
      </div>
      <div class="row">
        <div class="left">转移目标门店</div>
        <div class="right">
          <SelectShop v-model="formData.shop_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">会员等级</div>
        <div class="right">
          <SelectVipGrade v-model="formData.tid" :shop-id="formData.shop_id" />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectVipGrade from '@/components/form/select-vip-grade'

  export default {
    name: 'GoShop',
    components: { SelectShop, SelectVipGrade },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vid: this.memberInfo.id,
          shop_id: '',
          tid: '',
        },
      }
    },
    created() {},
    methods: {
      save() {
        this.setTransferShop()
      },
      async setTransferShop() {
        if (!this.formData.shop_id) {
          this.$Message.error('请选择目标门店')
          return
        }
        if (!this.formData.tid) {
          this.$Message.error('请选择会员等级')
          return
        }
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
  .GoShop {
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
