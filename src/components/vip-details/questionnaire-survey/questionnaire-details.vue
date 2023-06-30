<template>
  <div class="QuestionnaireDetails">
    <div class="box">
      <div class="form">
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
        <div class="cell">
          <div class="title">1，头部</div>
          <div class="content">视力下降</div>
        </div>
      </div>
      <div class="advice">
        <div class="title">专家建议</div>
        <div class="content">
          <Input placeholder="请输入建议" type="textarea" />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">确认回复</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionnaireDetails',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {}
    },
    created() {},
    methods: {
      save() {},
    },
  }
</script>

<style lang="less" scoped>
  .QuestionnaireDetails {
    .box {
      .form {
        display: flex;
        align-items: center;
        flex-flow: wrap;

        .cell {
          padding: 10px;
          width: 50%;

          .title {
          }

          .content {
            color: #3b86fc;
          }
        }
      }

      .advice {
        .title {
          border-top: 1px solid #eeeeee;
          color: #c61990;
          padding: 10px 0;
        }

        .content {
          color: #3b86fc;
        }

        padding: 10px;
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
