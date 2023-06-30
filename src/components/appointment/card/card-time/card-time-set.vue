<template>
  <div class="CardTimeSet">
    <div class="content">
      <div class="row">
        <div class="left">选择门店：</div>
        <div class="right">
          <SelectShop v-model="formData.shop_id" />
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index" class="row">
        <div class="left"></div>
        <div class="right">
          <TimePicker
            format="HH:mm"
            placeholder="设置时间"
            style="width: 200px"
            transfer
            type="time"
          />
          <div v-if="index == 0" style="font-size: 20px; color: #f19ec2">
            <Icon type="md-add" @click="add" />
          </div>
          <div v-if="index > 0" style="font-size: 20px; color: #f19ec2">
            <Icon type="ios-trash" @click="delRow(index)" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="bt" @click="add">
          <Icon type="md-add" />
          继续添加一项
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'CardTimeSet',
    components: {
      SelectShop,
    },

    data: function () {
      return {
        formData: {
          vid: '',
          shop_id: '',
        },
        list: [
          {
            type: 1,
            name: '',
            info: '',
            id: '',
          },
        ],
      }
    },
    created() {},
    methods: {
      delRow(index) {
        this.list.splice(index, 1)
      },
      add() {
        this.list.push({
          type: 1,
          name: '',
          info: '',
          id: '',
        })
      },
      save() {
        this.formData.data = this.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .CardTimeSet {
    .content {
      margin: 0 auto;

      .row {
        display: flex;
        justify-content: center;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;
          width: 80px;
        }

        .right {
          display: flex;
          flex: 1;
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
