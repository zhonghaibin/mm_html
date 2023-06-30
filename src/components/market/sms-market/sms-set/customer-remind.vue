<template>
  <div class="CustomerRemind">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>当前模版：</div>
        </div>
        <div class="right">会员预约成功</div>
      </div>
      <div class="row">
        <div class="left">
          <div>编辑模版内容：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 400px" type="textarea" />
        </div>
      </div>
    </div>
    <div class="var">
      <div class="title">变量代码,对应内容复制</div>
      <div class="content">
        <span>${XXXX}</span>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomerRemind',
    components: {},
    props: {},
    data: function () {
      return {
        formData: {},
        loading: false,
      }
    },
    created() {},
    methods: {
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .CustomerRemind {
    .content {
      margin: 0 auto;
      padding: 0 10px;

      .row {
        display: flex;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;
          width: 100px;
          text-align: right;
        }

        .right {
        }

        .bt {
          width: 300px;
          margin-top: 4px;
          background: #f19ec2;
          color: white;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
    .var {
      .title {
        padding: 10px;
      }
      .content {
        background: #eeeeee;
        min-height: 100px;
        padding: 10px;
        display: flex;
        flex-flow: wrap;
        span {
          height: 24px;
          margin: 2px;
          background: #cccccc;
          padding: 4px;
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
