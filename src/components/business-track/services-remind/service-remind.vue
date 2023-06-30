<template>
  <div class="ServiceRemind">
    <div class="box">
      <div class="row">
        <div class="left">
          <span style="color: red">*</span>
          选择项目
        </div>
        <div class="right">
          <SelectObject v-model="formData.data_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">服务周期</div>
        <div class="right">
          <Input
            v-model="formData.day"
            placeholder="服务周期"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">停止提醒次数</div>
        <div class="right">
          <Input
            v-model="formData.num"
            placeholder="停止提醒次数"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">发短信天数</div>
        <div class="right">
          <Input
            v-model="formData.msg_day"
            placeholder="停止提醒次数"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">发短信内容</div>
        <div class="right">
          <Input
            v-model="formData.msg_info"
            placeholder="停止提醒次数"
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
  import SelectObject from '@/components/form/select-object'

  export default {
    name: 'ServiceRemind',
    components: {
      SelectObject,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          remind_id: '',
          day: '',
          num: '',
          data_id: '',
          msg_day: '',
          msg_info: '',
        },
      }
    },
    created() {
      if (this.data && Object.keys(this.data).length > 0) {
        this.formData.remind_id = this.data.id
        this.formData.day = this.data.day
        this.formData.num = this.data.num
        this.formData.data_id = this.data.data_id
        this.formData.msg_day = this.data.msg_day
        this.formData.msg_info = this.data.msg_info
      }
    },
    methods: {
      async save() {
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
  .ServiceRemind {
    .box {
      padding: 10px 40px;

      .row {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        margin: 10px auto;

        .left {
          width: 145px;
          padding: 0 10px;
          text-align: right;
        }

        .right {
        }
      }
    }

    .bt {
      border: 1px solid #ccc;
      height: 30px;
      line-height: 30px;
      width: 200px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      margin: 0 auto;
    }

    .footer {
      padding: 10px 40px;

      .bt {
        border: 1px solid #f19ec2;
        background: #f19ec2;
        color: white;
      }
    }
  }
</style>
