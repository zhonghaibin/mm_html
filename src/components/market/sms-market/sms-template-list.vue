<template>
  <div class="SmsTemplateList">
    <div ref="content" class="content">
      <div class="left">
        <table>
          <tbody>
            <tr
              v-for="(item, index) in list"
              :key="index"
              :class="['', active(index) ? 'isActive' : '']"
              @click="select(index)"
            >
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right">
        <table>
          <tr>
            <td></td>
            <td style="width: 200px">
              <div
                class="add-bt"
                @click="showModal('添加自定义模板', 'SmsTemplate')"
              >
                添加自定义模板
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              …)祝您本月生日快乐。为祝就您的生日并感制你一直以来的支持,特此送你价值x的护運或产品,来店灣出示本短信,使用有效期至…,享受x为您提供的尊表服务,让您的生活更加美好。
            </td>
            <td>
              <div class="action">
                <div class="bt">编辑</div>
                <div class="bt">删除</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <SmsTemplate v-if="modalShow('SmsTemplate')" />
    </Modal>
  </div>
</template>

<script>
  import SmsTemplate from '@/components/market/sms-market/sms-template-list/sms-template'
  export default {
    name: 'SmsTemplateList',
    components: { SmsTemplate },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 700,
        },
        isActive: 0,
        list: [
          {
            name: '会员生日短信模板',
          },
          {
            name: '消费间隔短信模板',
          },
        ],
      }
    },

    computed: {
      active() {
        return (index) => {
          return this.isActive === index
        }
      },
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
      select(index) {
        this.isActive = index
      },
    },
  }
</script>

<style lang="less" scoped>
  .SmsTemplateList {
    position: relative;
    background: white;
    padding: 10px;
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      text-align: center;
      background: white;

      tr {
        height: 30px;
        cursor: pointer;

        td {
          border: 1px solid #eeeeee;
          height: 40px;
        }

        .text {
          color: #1298e6;
          cursor: pointer;
        }
      }
    }
    .content {
      display: flex;
      overflow: auto;
      justify-content: space-between;
      .left {
        width: 260px;
      }

      .right {
        margin-left: 10px;
        flex: 1;
      }
    }
    .isActive {
      background: #fdeff5;
    }
    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      .bt {
        padding: 5px;
        color: #1298e6;
        cursor: pointer;
      }
    }

    .add-bt {
      width: 160px;
      margin: 0 auto;
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
    }
  }
</style>
