<template>
  <div class="VipRemind">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">
          <div class="name">{{ name }}</div>
          <div class="phone">{{ tel }}</div>
        </div>
      </div>
      <div class="row">
        <div class="left">提醒时间</div>
        <div class="right">
          <DatePicker
            v-model="formData.time"
            format="yyyy-MM-dd"
            placeholder="请选择时间"
            style="width: 200px"
            transfer
            type="date"
            :value="formData.time"
            value-format="yyyy-MM-dd"
            @on-change="formData.time = $event"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">提醒人员</div>
        <div class="right">
          <SelectStaff v-model="formData.staff_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">提醒内容</div>
        <div class="right">
          <Input
            v-model="formData.info"
            placeholder="请输入提醒内容"
            style="width: 200px"
            type="textarea"
          />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt" @click="setWarningAct">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectStaff from '@/components/form/select-staff'

  export default {
    name: 'VipRemind',
    components: { SelectStaff },
    props: {
      vid: {
        type: [String, Number],
        default: () => '',
      },
      name: {
        type: [String, Number],
        default: () => '',
      },
      tel: {
        type: [String, Number],
        default: () => '',
      },
      data: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        staffList: [],
        formData: {
          vid: this.vid,
          info: '',
          staff_id: '',
          time: '',
        },
      }
    },
    created() {
      if (this.data && Object.keys(this.data).length > 0) {
        this.formData.time = this.data.time
        this.formData.info = this.data.info
        this.formData.staff_id = this.data.staff_id
      }
    },
    methods: {
      save() {
        this.setWarningAct()
      },
      async setWarningAct() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipRemind {
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
