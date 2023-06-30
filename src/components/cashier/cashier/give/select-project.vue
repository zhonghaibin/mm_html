<template>
  <div class="SelectProject">
    <div class="list">
      <div class="cell">
        <div v-for="(item, index) in typeList" :key="index" class="row">
          <Checkbox>{{ item.label }}</Checkbox>
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
    name: 'SelectProject',
    data: function () {
      return {
        typeList: [
          {
            label: '所有商品',
            value: '1',
          },
          {
            label: '所有项目',
            value: '2',
          },
          {
            label: '所有套餐次卡',
            value: '3',
          },
          {
            label: '所有可赠送的储值卡',
            value: '4',
          },
          {
            label: '所有可赠送的优惠券',
            value: '5',
          },
        ],
      }
    },
    methods: {
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .SelectProject {
    .list {
      display: flex;

      .cell {
        .row {
          padding: 10px;
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
