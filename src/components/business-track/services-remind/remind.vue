<template>
  <div class="Remind">
    <div class="box">
      <div class="header">
        <div class="cell">
          <div class="userInfo">
            <div class="left">
              <Avatar class="img" :src="avatar(info.vip_img)" />
            </div>
            <div class="right">
              <div class="name">{{ info.vip_name }}</div>
              <div class="phone">{{ info.vip_tel }}</div>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="td">
            <div class="row">
              <div class="left">
                <span>服务项目：</span>
              </div>
              <div class="right">
                <span>{{ info.service_name }}</span>
              </div>
            </div>
            <div class="row">
              <div class="left">
                <span>最近一次服务时间：</span>
              </div>
              <div class="right">
                <span>{{ info.service_end }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="td">
            <div class="row">
              <div class="left">
                <span>首次服务时间：</span>
              </div>
              <div class="right">
                <span>{{ info.service_start }}</span>
              </div>
            </div>
            <div class="row">
              <div class="left">
                <span>据下一次服务时间：</span>
              </div>
              <div class="right">
                <span>{{ info.task_day }}天</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="td">
            <div class="row">
              <div class="left">
                <span>已服务次数：</span>
              </div>
              <div class="right">
                <span>{{ info.service_num }} 次</span>
              </div>
            </div>
            <div class="row">
              <div class="left">
                <span>&nbsp;</span>
              </div>
              <div class="right">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="row1">
          <RadioGroup v-model="formData.type">
            <Radio
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.value"
            >
              {{ item.label }}
            </Radio>
          </RadioGroup>
        </div>
        <div class="row2">
          <Input
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder=" 你于(最近一次服务时间)消费了（服务项目），距离下次服务时间还有（**）天，请您抽出宝贵的时间，预约再次到店哦~"
            type="textarea"
            :value="info.info"
          />
        </div>
        <div class="row3">
          *（）里面的文字是系统自带参数，不可修改，但可删除
        </div>
        <div class="row4">
          <div class="bt" @click="send">
            <Icon type="ios-send" />
            发送短信
          </div>
        </div>
      </div>
      <div class="footer">
        <span class="text">短信剩余条数：{{ info.msg_num }}条</span>
      </div>
    </div>
  </div>
</template>

<script>
  import default_avatar from '@/assets/default_avatar.png'

  export default {
    name: 'Remind',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        typeList: [
          {
            value: '1',
            label: '短信提醒',
          },
          {
            value: '2',
            label: '电话提醒会员',
          },
          {
            value: '3',
            label: '微信提醒会员',
          },
        ],
        searchData: {
          task_id: this.data.id,
        },
        formData: {
          vid: this.data.vid,
          task_id: this.data.id,
          content: '',
          type: '1',
        },
        default_avatar: default_avatar,
        info: {},
      }
    },
    computed: {
      avatar() {
        return (img) => {
          return img === '' || img === null ? this.default_avatar : img
        }
      },
    },
    activated() {
      this.getData()
    },
    created() {
      this.getData()
    },
    methods: {
      send() {
        this.formData.content = this.info.info
        this.$Modal.confirm({
          title: '警告？',
          content: '确定要发送吗？',
          onOk: () => {
            this.sendData()
          },
          onCancel: () => {},
        })
      },
      async getData() {
        console.log(this.data, 'data', this.searchData)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.info = {}
        }
      },
      async sendData() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change', '')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .Remind {
    .box {
      margin: 10px 20px 0 20px;

      .header {
        border-radius: 10px;
        display: flex;
        border: 1px solid #d1d1d1;
        align-items: center;

        .cell {
          margin: 6px 12px;
          display: flex;

          .userInfo {
            display: flex;

            .left {
              .img {
              }
            }

            .right {
              padding-left: 5px;

              .name {
              }

              .phone {
              }
            }
          }

          .td {
            .row {
              display: flex;

              .left {
                height: 20px;
                line-height: 20px;
              }

              .right {
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
      }

      .content {
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid #d1d1d1;
        align-items: center;
        height: 300px;

        .row1 {
          display: flex;
          height: 40px;
          line-height: 40px;
          margin: 0 40px;
        }

        .row2 {
          border: 1px solid #d1d1d1;
          margin: 20px 40px 4px 40px;
          padding: 6px;
          border-radius: 10px;
        }

        .row3 {
          margin-left: 40px;
          color: red;
        }

        .row4 {
          display: flex;
          justify-content: flex-end;

          .bt {
            width: 100px;
            height: 30px;
            line-height: 30px;
            background: #f19ec2;
            color: white;
            margin-right: 20px;
            text-align: center;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }

      .footer {
        .text {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
      }
    }
  }
</style>
