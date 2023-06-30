<template>
  <div class="VipCard">
    <div class="search">
      <div class="box">
        <Select v-model="status" style="width: 200px" transfer>
          <Option
            v-for="item in statusList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
      <div class="box">
        <Input
          enter-button
          placeholder="输入套餐次卡名称"
          search
          style="width: 220px"
        />
      </div>
    </div>
    <div class="list">
      <div class="card">
        <div class="header">骨盆修复套餐1</div>
        <div class="content">
          <div class="row">
            <div class="left">售价：</div>
            <div class="right">
              <div class="text">￥2342.33</div>
            </div>
          </div>
          <div class="row">
            <div class="left">余次：</div>
            <div class="right">
              <div class="text">8次</div>
            </div>
          </div>
          <div class="row">
            <div class="left">时限：</div>
            <div class="right">
              <div class="text">永久有效</div>
            </div>
          </div>
          <div class="more">
            <div class="details">续充</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipCard',
    components: {},
    data: function () {
      return {
        statusList: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '使用中',
          },
          {
            value: '2',
            label: '未使用',
          },
          {
            value: '3',
            label: '已过期',
          },
          {
            value: '4',
            label: '已用完',
          },
        ],
        status: '0',
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .VipCard {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .box {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .money {
          height: 32px;
          line-height: 32px;
          font-weight: bold;
          padding-right: 20px;
          color: #c75181;
        }

        .text {
          font-weight: bold;
          margin: 0 5px;
        }
      }
    }

    .list {
      display: flex;
      flex-flow: wrap;

      .card {
        border-radius: 12px;
        border: 1px solid #dcdee2;
        cursor: pointer;
        background: white;
        margin: 10px 10px 10px 0;
        width: 200px;

        .header {
          margin-top: 10px;
          padding: 2px 10px;
          font-size: 14px;
          text-align: center;
          font-weight: bold;
        }

        .content {
          padding: 0 8px 4px 6px;

          .row {
            display: flex;
            padding: 2px 0;
            align-items: center;

            .left {
            }

            .right {
              display: flex;
              justify-content: flex-end;
            }
          }

          .more {
            display: flex;
            justify-content: flex-end;

            .details {
              color: #1298e6;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
