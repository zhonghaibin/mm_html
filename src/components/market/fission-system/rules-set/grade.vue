<template>
  <div class="Grade">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>等级名称：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>投入金额：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>分红百分比：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>开启店主店员：</div>
        </div>
        <div class="right">
          <RadioGroup>
            <Radio label="1">
              <span>关闭</span>
            </Radio>
            <Radio label="2">
              <span>开启</span>
            </Radio>
          </RadioGroup>
          <span style="color: red">*该等级一旦开启不可关闭</span>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>毛利计算方式：</div>
        </div>
        <div class="right">
          <RadioGroup>
            <Radio label="1">
              <span>售价-成本</span>
            </Radio>
            <Radio label="2">
              <span>毛利X毛利占比</span>
            </Radio>
          </RadioGroup>
          <span style="color: red">*该等级一旦选择不可修改</span>
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
    name: 'Grade',
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
  .Grade {
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
