<template>
  <div class="SmsTemplate">
    <div class="box">
      <div class="row">
        <div class="left">短信模板分类：</div>
        <div class="right">
          <Select style="width: 200px" transfer>
            <Option v-for="item in list" :key="item.value" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <span
            style="padding: 4px; color: #cc749a; cursor: pointer"
            @click="showModal('创建分类', 'SmsTemplateType')"
          >
            创建分类
          </span>
        </div>
      </div>
      <div class="row">
        <div class="left">编辑模板内容</div>
        <div class="right">
          <Input
            placeholder=""
            :rows="6"
            style="width: 400px"
            type="textarea"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt">保存</div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <SmsTemplateType v-if="modalShow('SmsTemplateType')" />
    </Modal>
  </div>
</template>

<script>
  import SmsTemplateType from '@/components/market/sms-market/sms-template-list/sms-template-type'
  export default {
    name: 'SmsTemplate',
    components: {
      SmsTemplateType,
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 700,
        },
        list: [],
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    methods: {
      showModal(title, type, data) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .SmsTemplate {
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
