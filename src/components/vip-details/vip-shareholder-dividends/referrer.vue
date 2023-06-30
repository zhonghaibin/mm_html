<template>
  <div class="Referrer">
    <div class="content">
      <div class="row">
        <div class="left">当前消费型股东</div>
        <div class="right">
          <div class="name">22</div>
          <div class="phone">11</div>
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index" class="row">
        <div class="left">
          <span v-if="index == 0">选择会员：</span>
        </div>
        <div class="right">
          <Input
            v-model="item.info"
            placeholder="输入内容"
            style="width: 200px"
          />
        </div>
        <div v-if="index == 0" style="font-size: 20px; color: #f19ec2">
          <Icon type="md-add" @click="add" />
        </div>
        <div v-if="index > 0" style="font-size: 20px; color: #f19ec2">
          <Icon type="ios-trash" @click="delRow(index)" />
        </div>
      </div>
      <div class="bt-row">
        <div class="bt" @click="add">
          <Icon type="md-add" />
          继续添加会员
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
    name: 'Referrer',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vid: '',
          data: [],
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
  .Referrer {
    .content {
      margin: 0 auto;

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

      .bt-row {
        display: flex;
        justify-content: center;

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
