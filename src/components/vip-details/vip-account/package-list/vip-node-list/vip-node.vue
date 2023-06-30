<template>
  <div class="VipNode">
    <div class="box">
      <div class="row">
        <div class="left">备注信息</div>
        <div class="right">
          <Input
            v-model="formData.info"
            placeholder="请输入备注信息"
            style="width: 250px"
            type="textarea"
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
    name: 'VipNode',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
      cardVid: {
        type: Number,
        default: () => 0,
      },
      remarks: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vip_id: '',
          card_vid: '',
          info: '',
          remarks_id: '',
        },
      }
    },
    created() {
      if (this.remarks) {
        this.formData.info = this.remarks.info
        this.formData.remarks_id = this.remarks.id
      }
    },
    methods: {
      save() {
        console.log('remarks', this.remarks)
        this.formData.card_vid = this.cardVid
        this.formData.vip_id = this.memberInfo.vip_id

        this.setData()
      },
      async setData() {
        this.loading = true
        const { status, msg } = { status: 0, msg: '请求失败' }
        this.loading = false
        if (status === 1) {
          this.$Message.success('操作成功')
          this.$emit('saveModal', false)
        } else {
          this.$Message.error(msg)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipNode {
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
