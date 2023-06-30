<template>
  <div class="BatchEdit">
    <div class="list">
      <div class="box">
        <div class="row">
          <div class="left">批量设置</div>
          <div class="right">
            <Select v-model="select1" slot="append" style="width: 200px">
              <Option value="%">%</Option>
              <Option value="￥">￥</Option>
            </Select>
          </div>
        </div>
        <div class="row">
          <div class="left">业绩提成</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div class="row">
          <div class="left">耗卡提成</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div class="row">
          <div class="left">手工费</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div class="row">
          <div class="left">成本</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="row">
          <div class="left">赠送项目</div>
          <div class="right">
            <Checkbox v-model="gift.show" />
          </div>
        </div>
        <div v-if="gift.show === true" class="row">
          <div class="left">业绩提成</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div v-if="gift.show === true" class="row">
          <div class="left">耗卡提成</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div v-if="gift.show === true" class="row">
          <div class="left">手工费</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
        </div>
        <div v-if="gift.show === true" class="row">
          <div class="left">成本</div>
          <div class="right">
            <Input v-model="value1" style="width: 200px">
              <Select v-model="select1" slot="append" style="width: 60px">
                <Option value="%">%</Option>
                <Option value="￥">￥</Option>
              </Select>
            </Input>
          </div>
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
    name: 'BatchEdit',
    data: function () {
      return {
        value1: '',
        select1: '%',
        gift: {
          show: false,
        },
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .BatchEdit {
    .list {
      display: flex;

      .box {
        flex: 1;
        padding: 20px;
        border-right: 1px solid #eeeeee;

        .row {
          display: flex;
          align-items: center;
          margin: 30px 0;

          .left {
            width: 120px;
            text-align: right;
            margin-right: 10px;
          }

          .right {
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
