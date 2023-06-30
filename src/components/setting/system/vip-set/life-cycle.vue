<template>
  <div class="LifeCycle">
    <div class="box">
      <div class="row">
        <div class="left">生命周期维度</div>
        <div class="right">
          <RadioGroup v-model="lifeCycle">
            <Radio
              v-for="item in lifeCycleList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="row">
        <div class="left"></div>
        <div class="right">
          <div style="color: red">
            切换维度后,顾客的五生命周期设置都会相应变化。
          </div>
        </div>
      </div>
      <div class="row">
        <div class="left">设置新客户规则</div>
        <div class="right">
          办卡后
          <Input placeholder="" style="width: 200px" />
          天视为新客户
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LifeCycle',
    data: function () {
      return {
        lifeCycleList: [
          {
            label: '按注册时间',
            value: '1',
          },
          {
            label: '按消费次数',
            value: '2',
          },
          {
            label: '按消费金额',
            value: '3',
          },
        ],
        lifeCycle: '',
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .LifeCycle {
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
