<template>
  <div class="Schedule">
    <div class="box">
      <div class="row">
        <div class="left">适用门店</div>
        <div class="right">
          <SelectShop v-model="formData.shop_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">班次名称</div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">上班时间</div>
        <div class="right">
          <TimePicker
            format="HH:mm"
            placeholder="上班时间"
            style="width: 200px"
            transfer
            type="time"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">下班时间</div>
        <div class="right">
          <TimePicker
            format="HH:mm"
            placeholder="下班时间"
            style="width: 200px"
            transfer
            type="time"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">班次颜色</div>
        <div class="right">
          <ColorPicker v-model="color1" />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'Schedule',
    components: {
      SelectShop,
    },
    data: function () {
      return {
        loading: false,
        formData: {
          vid: '',
          shop_id: '',
        },
        color1: '#19be6b',
        shopList: [],
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="less" scoped>
  .Schedule {
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
