<template>
  <div class="pay">
    <div class="box">
      <div class="row">
        <div class="left">变量匹配</div>
        <div class="right">
          <span class="tag">{DATA_order_price}对应办卡金额/储值金额；</span>
          <span class="tag">{DATA_order_time}对应订单时间；</span>
          <span class="tag">{DATA_vip_tel}会员手机号码；</span>
          <span class="tag">{DATA_card_name}对应套餐名称；</span>
          <span class="tag">{DATA_vip_name}对应会员姓名；</span>
          <span class="tag">{DATA_vip_birth}对应会员生日；</span>
          <span class="tag">{DATA_vip_id}对应会员卡号；</span>
          <span class="tag">{DATA_staff_name}对应员工名称/服务员工；</span>
          <span class="tag">{DATA_service}对应预约项目/划次详情；</span>
          <span class="tag">{DATA_service_time}对应会员服务时间；</span>
          <span class="tag">{DATA_make_time}对应预约时间；</span>
          <span class="tag">{DATA_visit_time}对应回访时间；</span>
          <span class="tag">{DATA_visit_name}对应回访主题；</span>
          <span class="tag">{DATA_content}对应回访內容/提醒内容；</span>
          <span class="tag">{DATA_shop_name}对应门店名称；</span>
        </div>
      </div>
      <div class="row">
        <div class="left">模板类型</div>
        <div class="right">
          <Input placeholder="" style="width: 500px" />
        </div>
      </div>
      <div class="row">
        <div class="left">模板类型</div>
        <div class="right">
          <Select v-model="status" style="width: 200px" transfer>
            <Option
              v-for="item in status_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">机器人webhook地址</div>
        <div class="right">
          <Input placeholder="" style="width: 500px" />
        </div>
      </div>
      <div class="row">
        <div class="left">模板内容</div>
        <div class="right">
          <Input
            placeholder=""
            :rows="6"
            style="width: 500px"
            type="textarea"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">状态</div>
        <div class="right">
          <Select v-model="template_type" style="width: 200px" transfer>
            <Option
              v-for="item in template_type_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
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
    name: 'Pay',
    data: function () {
      return {
        template_type: '',
        template_type_list: [
          {
            label: '预约提醒',
            value: '1',
          },
        ],
        status: '',
        status_list: [
          {
            label: '启用',
            value: '1',
          },
          {
            label: '禁用',
            value: '2',
          },
        ],
      }
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .pay {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .left {
          width: 180px;
          text-align: right;
          margin-right: 10px;
        }

        .right {
          width: 100%;

          .tag {
            display: block;
            float: left;
            border: 1px solid #ccc;
            margin: 2px;
            padding: 2px;
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
