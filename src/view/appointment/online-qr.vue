<template>
  <div class="box">
    <div class="column">线上预约二维码</div>
    <div class="top">
      <div class="header">
        <div class="left">
          门店：
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="right">
          <div>
            下列二维码是您店铺的专用二维码,打印后贴干店内,方便干会员预约、查询记录、接受微信推送消息!
            (无须自己申话公众号,也能使用!点击图片鼠标右键,将门店对应的码另存为到电脑,即可打印)
          </div>
          <div style="color: red">
            若有不懂,请联系右上角,在线客服人员,我们有专员一对一培训,指导使用!
          </div>
        </div>
      </div>
    </div>

    <div ref="content" class="content">
      <div v-for="(item, index) in list" :key="index" class="box">
        <img class="img" :src="item.src" />
        <div class="text">▲{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import SelectShop from '@/components/form/select-shop'
  export default {
    name: 'OnlineQr',
    components: { SelectShop },
    data: function () {
      return {
        list: [
          {
            src: require('../../assets/shop_qr.png'),
            label: '分店1专属二维码',
          },
          {
            src: require('../../assets/shop_qr.png'),
            label: '分店1专属二维码',
          },
          {
            src: require('../../assets/shop_qr.png'),
            label: '分店1专属二维码',
          },
          {
            src: require('../../assets/shop_qr.png'),
            label: '分店1专属二维码',
          },
        ],
        searchData: { sid: '' },
      }
    },
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        let divHeight = window.innerHeight - 230
        this.$refs.content.style.minHeight = divHeight + 'px'
      },
      search() {},
    },
  }
</script>
<style lang="less" scoped>
  .box {
    .top {
      background: white;
      padding: 4px 16px 20px 16px;

      .header {
        padding: 10px;
        display: flex;

        .left {
          display: flex;
          width: 160px;
          align-items: center;
        }

        .right {
          margin-left: 10px;
        }
      }
    }

    .content {
      display: flex;
      flex-flow: wrap;
      background: white;
      margin-top: 10px;

      .box {
        padding: 20px;
        text-align: center;
        width: 33%;
        .img {
          width: 300px;
        }

        .text {
          text-align: center;
        }
      }
    }
  }
</style>
