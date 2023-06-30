<template>
  <div class="AddDate">
    <div class="details">
      <div class="box">
        <div class="content">
          <div v-for="(item, index) in list" :key="index" class="row">
            <div class="left">
              <Input v-model="item.name" placeholder="输入自定义名称" />
            </div>
            <div class="center">
              <DatePicker
                v-model="item.info"
                placeholder="选择日期"
                style="width: 200px"
                type="date"
                :value="formData.info"
                value-format="yyyy-MM-dd"
                @on-change="formData.info = $event"
              />
            </div>
            <div class="right">
              <Icon type="ios-trash" @click="delRow(index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="bt" @click="add">
          <Icon type="md-add" />
          添加自定义
        </div>
      </div>
      <div class="right">
        <div class="bt" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddDate',
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vid: this.memberInfo.id,
          data: [],
        },
        list: [
          {
            type: 2,
            name: '',
            info: '',
            id: '',
          },
        ],
      }
    },
    methods: {
      delRow(index) {
        this.list.splice(index, 1)
      },

      add() {
        this.list.push({
          type: 2,
          name: '',
          info: '',
          id: '',
        })
      },
      save() {
        this.formData.data = this.list
        this.setVipRecordAdd()
      },
      async setVipRecordAdd() {
        const { status, msg } = [0, 1]
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('change')
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .AddDate {
    .details {
      overflow: auto;
      height: 500px;

      .box {
        .content {
          .row {
            display: flex;
            height: 30px;
            align-items: center;
            margin: 4px auto;

            .left {
              width: 150px;
              text-align: right;
              padding: 2px 4px;
            }

            .right {
              padding-left: 10px;
              font-size: 18px;
              color: #cc749a;
              cursor: pointer;
            }
          }
        }
      }
    }

    .footer {
      .left {
        float: left;

        .bt {
          margin-right: 10px;
          width: 120px;
          text-align: center;
          border: 1px solid #afafaf;
          border-radius: 4px;
          padding: 2px;
          color: #000000;
          height: 30px;
          line-height: 26px;
          cursor: pointer;
        }
      }

      .right {
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
  }
</style>
