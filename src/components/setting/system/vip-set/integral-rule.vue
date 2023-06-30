<template>
  <div class="IntegralRule">
    <div class="box">
      <div class="row">
        <div class="left">积分规则名称</div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">适用门店</div>
        <div class="right">
          <SelectShop />
        </div>
      </div>
      <div class="row">
        <div class="left">适用会员</div>
        <div class="right">
          <RadioGroup v-model="vip">
            <Radio label="全部会员">
              <span>全部会员</span>
            </Radio>
            <Radio label="指定等级会员">
              <span>指定等级会员</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="row">
        <div class="left">指定类别出产生积分</div>
        <div class="right">
          <div class="bt" @click="showModal('指定类别不产生积分', 'Goods')">
            添加指定类别
          </div>
        </div>
      </div>
      <div class="row">
        <div class="left">规则类型</div>
        <div class="right">
          <Select v-model="ruleType" clearable filterable style="width: 200px">
            <div slot="empty">未找到数据</div>
            <Option
              v-for="item in ruleTypeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">生效条件</div>
        <div class="right">
          单笔订单现金消费满
          <Input placeholder="" style="width: 100px" />
          元才会产生积分
        </div>
      </div>
      <div class="row">
        <div class="left">赠送积分规则</div>
        <div class="right">
          <div class="row-condition">
            每消费
            <Input placeholder="" style="width: 100px" />
            元，赠送
            <Input placeholder="" style="width: 100px" />
            积分
          </div>
          <div class="row-condition">
            <Checkbox />
            生日当天享受：
            <Input placeholder="" style="width: 100px" />
            倍积分
          </div>
          <div class="row-condition">
            <Checkbox />
            指定类别设置独立积分规则
          </div>
          <div class="row-condition">
            <Checkbox />
            仅限顾客首次消费后
            <Input placeholder="" style="width: 100px" />
            <Select v-model="date" clearable filterable style="width: 50px">
              <div slot="empty">未找到数据</div>
              <Option
                v-for="item in dateList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
            有效
          </div>
        </div>
      </div>
      <div class="row">
        <div class="left">规则生效时间</div>
        <div class="right">
          <RadioGroup v-model="vip">
            <Radio label="永久生效">
              <span>永久生效</span>
            </Radio>
            <Radio label="指定日期">
              <span>指定日期</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="row">
        <div class="left"></div>
        <div class="right">
          <span class="notice">规则失效后不会影响客户的已有积分</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <Goods v-if="modalShow('Goods')" />
    </Modal>
  </div>
</template>

<script>
  import Goods from '@/components/setting/system/vip-set/integral-rule/goods'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'IntegralRule',
    components: {
      SelectShop,
      Goods,
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        vip: '',
        ruleTypeList: [
          {
            label: '现金消费产生积分',
            value: '1',
          },
          {
            label: '真实耗卡产生积分',
            value: '2',
          },
        ],
        ruleType: '',
        dateList: [
          {
            label: '年',
            value: '1',
          },
          {
            label: '月',
            value: '2',
          },
          {
            label: '日',
            value: '3',
          },
        ],
        date: '',
      }
    },

    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .IntegralRule {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .left {
          width: 140px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
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

          .row-condition {
            padding: 6px 2px;
          }

          .notice {
            color: #ccc;
            display: block;
            text-align: center;
            width: 100%;
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
