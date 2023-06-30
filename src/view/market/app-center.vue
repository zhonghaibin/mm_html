<template>
  <div class="box">
    <div class="row">
      <div class="title">常用功能：店内日常营销必备</div>
      <div class="content">
        <div class="cell" @click="showModal('短信营销', 'SmsMarket')">
          <div class="l">
            <img class="ui" :src="smsUrl" />
          </div>
          <div class="r">
            <div class="title">短信营销</div>
            <div class="describe">精准营销更有效</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">引流拓客:私域流量的裂变拓客神器</div>
      <div class="content">
        <div class="cell" @click="showModal('裂变系统', 'FissionSystem')">
          <div class="l">
            <img class="ui" :src="heartUrl" />
          </div>
          <div class="r">
            <div class="title">裂变系统</div>
            <div class="describe">一个可持续的人带人体系</div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <FissionSystem v-if="modalShow('FissionSystem')" />
      <SmsMarket v-if="modalShow('SmsMarket')" />
    </Modal>
  </div>
</template>

<script>
  import FissionSystem from '@/components/market/fission-system'
  import SmsMarket from '@/components/market/sms-market'

  export default {
    name: 'AppCenter',
    components: { SmsMarket, FissionSystem },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 90,
        },
        smsUrl: require('../../assets/market/sms.png'),
        heartUrl: require('../../assets/market/heart.png'),
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .row {
      .title {
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 16px;
      }

      .content {
        display: flex;
        flex-flow: wrap;

        .cell {
          padding: 10px 0;
          margin: 10px;
          display: flex;
          width: 250px;
          border-radius: 12px;
          background: white;
          align-items: center;
          cursor: pointer;

          .l {
            padding: 0 10px;
          }

          .r {
            .title {
              font-size: 14px;
              font-weight: bold;
            }

            .describe {
            }
          }
        }
      }
    }
  }
</style>
