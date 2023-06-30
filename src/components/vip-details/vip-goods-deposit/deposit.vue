<template>
  <div class="Deposit">
    <div class="box">
      <div class="row">
        <div class="left">当前会员</div>
        <div class="right">
          <div class="name">{{ memberInfo.name }}</div>
          <div class="phone">{{ memberInfo.tel }}</div>
        </div>
      </div>
      <div class="row">
        <div class="left">寄存商品</div>
        <div class="right">
          <SelectGoods v-model="formData.gid" />
        </div>
      </div>
      <div class="row">
        <div class="left">寄存数量</div>
        <div class="right">
          <Input
            v-model="formData.use_num"
            placeholder="请输入寄存的数量"
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
  import SelectGoods from '@/components/form/select-goods'

  export default {
    name: 'Deposit',
    components: {
      SelectGoods,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          gid: '',
          vid: this.memberInfo.id,
          use_num: '',
        },
      }
    },
    created() {},
    methods: {
      save() {
        this.setDeposit()
      },
      async setDeposit() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('changeDeposit')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .Deposit {
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
          .name {
          }

          .phone {
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
