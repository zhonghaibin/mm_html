<template>
  <div class="Take">
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
        <div class="right">{{ deposit.goods_name }}</div>
      </div>
      <div class="row">
        <div class="left">寄存数量</div>
        <div class="right">{{ deposit.use_num }}</div>
      </div>
      <div class="row">
        <div class="left">存取类型</div>
        <div class="right">
          <RadioGroup v-model="formData.type">
            <Radio
              v-for="item in typeList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="row">
        <div class="left">
          本次
          <span v-if="formData.type === '1'">取走</span>
          <span v-else>存入</span>
          数量
        </div>
        <div class="right">
          <Input v-model="formData.use_num" placeholder="请输入取走数" />
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
    name: 'Take',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
      deposit: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          deposit_id: this.deposit.id,
          use_num: '',
          type: '',
        },
        typeList: [
          {
            label: '存入',
            value: '0',
          },
          {
            label: '取出',
            value: '1',
          },
        ],
      }
    },
    methods: {
      save() {
        this.setDepositAct()
      },
      async setDepositAct() {
        if (!this.formData.type) {
          this.$Message.error('请选择存取类型')
          return
        }
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
  .Take {
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
