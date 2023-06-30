<template>
  <div class="client">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>预约时间：</div>
        </div>
        <div class="right">
          <DatePicker
            placeholder="请选择日期"
            style="width: 200px"
            transfer
            type="date"
          />
          <TimePicker
            placeholder="请选择时间"
            style="width: 200px"
            transfer
            type="time"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>产康师：</div>
        </div>
        <div class="right">
          <Select v-model="model1" style="width: 200px" transfer>
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>备注信息：</div>
        </div>
        <div class="right">
          <Input placeholder="备注信息" style="width: 400px" type="textarea" />
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
    name: 'Client',

    data: function () {
      return {
        cityList: [
          {
            value: 'New York',
            label: 'New York',
          },
        ],
        model1: '',
        formData: {
          vid: '',
        },
        loading: false,
      }
    },
    created() {},
    methods: {
      save() {
        this.formData.data = this.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .client {
    .content {
      margin: 0 auto;
      padding: 0 10px;

      .row {
        display: flex;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;
          width: 120px;
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
