<template>
  <div class="VipRemind">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">
          <div class="name">曾文明</div>
          <div class="phone">13823232512</div>
        </div>
      </div>
      <div class="row">
        <div class="left">提醒时间</div>
        <div class="right">
          <DatePicker
            placeholder="Select date"
            style="width: 200px"
            type="date"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">提醒人员</div>
        <div class="right">
          <Select v-model="person" clearable style="width: 200px">
            <Option
              v-for="item in person_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">提醒内容</div>
        <div class="right">
          <Input
            placeholder="请输入提醒内容"
            rows="5"
            style="width: 200px"
            type="textarea"
          />
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
    name: 'VipRemind',
    data: function () {
      return {
        person_list: [],
        person: '',
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .VipRemind {
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
          .name {
          }

          .phone {
          }
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
