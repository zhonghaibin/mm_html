<template>
  <div class="coupon">
    <div class="list">
      <div
        v-for="(item, index) in datalist"
        :key="index"
        :class="['cell', active(item.name) ? 'isActive' : 'option']"
        @click="select(item)"
      >
        <Icon
          v-if="active(item.name)"
          class="icon"
          type="md-checkmark-circle"
        />
        <div class="title">{{ item.name }}</div>
        <div class="content">
          {{ item.label }} :
          <span style="color: red">{{ item.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Coupon',
    components: {},
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data: function () {
      return {
        datalist: [
          {
            name: '1000附属卡',
            label: '余额',
            number: '200',
          },
        ],
      }
    },
    computed: {
      active() {
        return (name) => {
          let len = this.list.length
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              if (this.list[i].name === name) {
                return true
              }
            }
          } else {
            return false
          }
        }
      },
    },
    methods: {
      select(row) {
        if (this.active(row.name)) {
          this.$emit('on-clear', row)
        } else {
          this.$emit('on-select', row)
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  .coupon {
    .isActive {
      border: 1px solid #f19ec2;
    }
    .list {
      .cell {
        width: 130px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #eeeeee;
        margin: 10px;
        padding: 4px;
        position: relative;
        border-radius: 8px;
        .title {
        }
        .content {
        }
        .icon {
          color: #f19ec2;
          font-size: 18px;
          position: absolute;
          top: -3px;
          left: 112px;
        }
      }
    }
  }
</style>
