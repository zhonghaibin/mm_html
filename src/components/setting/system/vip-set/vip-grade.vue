<template>
  <div class="VipGrade">
    <div class="box">
      <div class="row">
        <div class="left">会员级别名称</div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">升级条件</div>
        <div class="right">
          <div class="item">
            <Select
              v-model="vipGrade"
              clearable
              filterable
              style="width: 200px"
            >
              <div slot="empty">未找到数据</div>
              <Option
                v-for="item in vipGradeList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
            <Input placeholder="输入金额，最小为0" style="width: 200px" />
          </div>
          <div class="item">
            <Select
              v-model="vipGrade"
              clearable
              filterable
              style="width: 200px"
            >
              <div slot="empty">未找到数据</div>
              <Option
                v-for="item in vipGradeList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
            <Input placeholder="输入金额，最小为0" style="width: 200px" />
          </div>
          <div class="item">
            <Select
              v-model="vipGrade"
              clearable
              filterable
              style="width: 200px"
            >
              <div slot="empty">未找到数据</div>
              <Option
                v-for="item in vipGradeList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
            <Input placeholder="输入金额，最小为0" style="width: 200px" />
          </div>
          <div class="bt">
            <Icon type="md-add" />
            继续添加一项
          </div>
        </div>
      </div>
      <div class="row">
        <div class="left">选择生效时段</div>
        <div class="right">
          <Input placeholder="输入生效时间" style="width: 200px" />
          <Select v-model="date" clearable filterable style="width: 200px">
            <div slot="empty">未找到数据</div>
            <Option
              v-for="item in dateList"
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
    name: 'VipGrade',
    data: function () {
      return {
        vipGradeList: [
          {
            label: '一次性消费满',
            value: '1',
          },
          {
            label: '月累计消费满',
            value: '2',
          },
          {
            label: '月到店次数',
            value: '3',
          },
        ],
        vipGrade: '',
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
    methods: {},
  }
</script>

<style lang="less" scoped>
  .VipGrade {
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
          .item {
            padding: 4px 0;
          }

          .bt {
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
