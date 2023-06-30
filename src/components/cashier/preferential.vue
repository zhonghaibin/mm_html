<template>
  <div class="Preferential">
    <div class="header">
      <div class="left">结算品相名称：</div>
      <div class="right">
        <div class="cell">骨盆修复1，</div>
        <div class="cell">骨盆修复2</div>
        <div class="cell">支付金额：￥324324</div>
      </div>
    </div>
    <div class="content">
      <Tabs
        v-model="tab_index"
        class="tab"
        size="small"
        @on-click="handleTabClick"
      >
        <TabPane
          v-for="item in tab_list"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <ValueCard
            v-if="current(item, '他的储值卡')"
            :list="list"
            @on-clear="clear"
            @on-select="select"
          />
          <Coupon
            v-if="current(item, '他的优惠券')"
            :list="list"
            @on-clear="clear"
            @on-select="select"
          />
        </TabPane>
      </Tabs>
    </div>
    <div class="list">
      <table>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.name }}</td>
          <td>
            <Input
              v-model="item.value"
              placeholder=""
              size="small"
              style="min-width: 200px"
            />
          </td>
          <td>
            <Icon class="icon" type="ios-close-circle" @click="delRow(index)" />
          </td>
        </tr>
      </table>
    </div>
    <div class="footer">
      <div class="cell">
        还需支付：
        <span style="color: red">￥：23232</span>
      </div>
      <div class="bt" @click="save">确认支付方式</div>
    </div>
  </div>
</template>
<script>
  import ValueCard from '@/components/cashier/preferential/value-card'
  import Coupon from '@/components/cashier/preferential/coupon'

  export default {
    name: 'Preferential',
    components: { Coupon, ValueCard },
    data: function () {
      return {
        tab_index: '他的储值卡',
        tab_list: [
          { name: '他的储值卡', id: 1 },
          { name: '他的优惠券', id: 2 },
        ],
        list: [],
      }
    },
    computed: {
      current() {
        return (item, name) => {
          return name === item.name && this.tab_index === name
        }
      },
    },
    methods: {
      select(data) {
        this.list.push(data)
      },
      clear(data) {
        let len = this.list.length
        for (let i = 0; i < len; i++) {
          if (this.list[i].name === data.name) {
            this.list.splice(i, 1)
            return true
          }
        }
        this.list.push(data)
      },
      delRow(index) {
        this.list.splice(index, 1)
      },
      handleTabClick(index) {
        this.tab_index = index
      },
      save() {
        this.$emit('on-select', this.list)
      },
    },
  }
</script>
<style lang="less" scoped>
  .Preferential {
    .header {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 10px;
      color: #f24445;

      .left {
      }

      .right {
        display: flex;
        align-items: center;

        .cell {
          padding: 0 2px;
        }
      }
    }
    .list {
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      td {
        padding: 2px;
      }
      .icon {
        font-size: 18px;
        color: #f19ec2;
        cursor: pointer;
      }
    }

    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .cell {
        padding: 0 20px;
      }

      .bt {
        margin-right: 10px;
        width: 100px;
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
