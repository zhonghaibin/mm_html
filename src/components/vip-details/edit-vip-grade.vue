<template>
  <div class="EditVipGrade">
    <div class="box">
      <div class="row">
        <div class="left">当前等级</div>
        <div class="right">{{ memberInfo.tname }}</div>
      </div>
      <div class="row">
        <div class="left">变更等级</div>
        <div class="right">
          <SelectVipGrade
            v-model="formData.new_tid"
            :shop-id="memberInfo.sid"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  import SelectVipGrade from '@/components/form/select-vip-grade'

  export default {
    name: 'EditVipGrade',
    components: { SelectVipGrade },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          new_tid: '',
          vid: this.memberInfo.id,
        },
      }
    },
    methods: {
      save() {
        this.setData()
      },
      async setData() {},
    },
  }
</script>

<style lang="less" scoped>
  .EditVipGrade {
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
