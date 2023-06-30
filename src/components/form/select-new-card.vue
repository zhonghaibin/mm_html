<template>
  <content>
    <div class="input"><Input placeholder="" /></div>

    <div class="card">
      <div class="title">
        <div class="l">骨盆修复套餐</div>
        <div class="r">永久有效</div>
      </div>
      <div class="content">
        <div class="left">
          <div class="row">卡售价：￥322423</div>
        </div>
        <div class="right">
          <div class="row">总次数</div>
          <div class="row">10次</div>
        </div>
      </div>
      <div class="bottom">
        <div class="add-bt">修改</div>
      </div>
    </div>
  </content>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number, Array],
        default: '',
      },
      search: {
        type: Object,
        default: () => {
          return {
            p: 1,
            page: 1000,
            search: '',
          }
        },
      },
      width: {
        type: Number,
        default: 200,
      },
    },
    data: function () {
      return {
        loading: false,
        list: [],
        valueData: '',
        searchData: {},
      }
    },
    watch: {},
    created() {
      this.valueData = this.value
      this.getList()
    },
    methods: {
      selectValue(item) {
        this.$emit('input', item.value)
        this.$emit('on-select', item.value)
      },
      clearValue() {
        this.$emit('input', '')
        this.$emit('on-select', '')
      },
      async getList() {},
    },
  }
</script>

<style lang="less" scoped>
  .card {
    background: #fdf1f6;
    border: none;
    height: 160px;
    border-radius: 6px;
    margin-top: 10px;

    .title {
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;

      .l {
        padding: 10px;
        flex: 1;
        font-weight: bold;
      }

      .r {
        padding: 10px;
      }
    }

    .content {
      display: flex;
      height: 78px;

      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .row {
          display: flex;
          padding: 10px;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .bottom {
      text-align: center;

      .add-bt {
        width: 60px;
        color: white;
        margin: 10px auto;
        cursor: pointer;
        background: #f19ec2;
        padding: 4px 10px;
        border-radius: 4px;
      }
    }
  }
</style>
