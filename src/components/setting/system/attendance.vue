<template>
  <div class="Attendance">
    <div class="box">
      <div class="row">
        <div class="left">维度 LNT</div>
        <div class="center">
          <Input placeholder="请输入维度" style="width: 200px" />
          <span>·例如坐标《23.053840,114.415816)对应的Int=114.415816</span>
        </div>
        <div class="right">
          <div class="bt">
            <a
              href="https://lbs.qq.com/getPoint/"
              style="color: white"
              target="_blank"
            >
              点击门店坐标获取
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="left">经度 LAT</div>
        <div class="center">
          <Input placeholder="请输入经度" style="width: 200px" />
          <span>·例如坐标《23.053840,114.415816)对应的lat=23.053840</span>
        </div>
        <div class="right"></div>
      </div>
      <div class="row">
        <div class="left">门店范围</div>
        <div class="center">
          <Input placeholder="请输入经度" style="width: 200px" />
          <span>单位米,在坐标半径范围内属于店内;反之是外出</span>
        </div>
        <div class="right"></div>
      </div>
      <div class="row">
        <div class="left">弹性时间</div>
        <div class="center">
          <div class="center-box">
            <Checkbox v-model="formData.ddd" false-value="1" true-value="0">
              允许迟到早退
            </Checkbox>
          </div>
          <div v-if="formData.ddd === '0'" class="center-box">
            上班允许迟到
            <Input placeholder="请输入数字" style="width: 100px" />
            分钟 下班允许早退
            <Input placeholder="请输入数字" style="width: 100px" />
            分钟
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="row" style="border: 0">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right">
          <div class="bt">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Attendance',
    components: {},
    data: function () {
      return {
        switch1: false,
        formData: {
          ddd: 1,
        },
      }
    },
    activated() {},
    created() {},
    methods: {
      change(status) {
        this.$Message.info('开关状态：' + status)
      },
    },
  }
</script>

<style lang="less" scoped>
  .Attendance {
    background: white;
    padding: 10px;

    .bt {
      color: white;
      margin-right: 20px;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }

    .box {
      .row {
        padding: 4px 2px;
        display: flex;
        font-size: 12px;
        border-bottom: 1px solid #ececec;
        align-items: center;

        .left {
          width: 100px;
          text-align: right;
        }

        .center {
          margin: 0 8px;
          flex: 1;

          .center-box {
            padding: 6px 0;
          }
        }

        .right {
        }
      }
    }
  }
</style>
