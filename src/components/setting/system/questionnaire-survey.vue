<template>
  <div class="QuestionnaireSurvey">
    <div class="box">
      <div class="row">
        <div class="cell">
          <div class="left">问卷标题</div>
          <div class="center">
            <Input placeholder="请输入问卷标题" style="width: 400px" />
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index" class="row">
        <div class="cell">
          <div class="left">
            问题{{ index + 1 }}
            <Icon
              v-if="index > 0"
              class="icon"
              type="md-remove-circle"
              @click="delRow(index)"
            />
          </div>
          <div class="center">
            <Input
              v-model="item.value"
              placeholder="请输入问题"
              style="width: 300px"
            />
          </div>
          <div class="right">
            问题类型
            <Select v-model="item.type" style="width: 100px">
              <Option
                v-for="val in typeList"
                :key="val.value"
                :value="val.value"
              >
                {{ val.label }}
              </Option>
            </Select>
          </div>
          <div class="right">
            <Icon class="icon" type="md-add-circle" @click="addRow" />
          </div>
        </div>
        <div v-if="item.type !== '1'" class="cell">
          <div class="left"></div>
          <div class="center">
            <div v-for="(val, key) in item.data" :key="key" class="center-box">
              选项{{ key + 1 }}
              <Icon
                v-if="key > 0"
                class="icon"
                type="md-remove-circle"
                @click="del(key)"
              />
              <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Input
                v-model="val.value"
                placeholder="请输入内容"
                style="width: 100px"
              />
              <Icon class="icon" type="md-add-circle" @click="add(item)" />
            </div>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionnaireSurvey',
    components: {},
    data: function () {
      return {
        switch1: false,
        formData: {
          ddd: 1,
        },
        typeList: [
          {
            label: '问答题',
            value: '1',
          },
          {
            label: '单选题',
            value: '2',
          },
          {
            label: '多选题',
            value: '3',
          },
        ],
        list: [
          {
            value: '',
            type: '1',
            data: [
              {
                value: '',
              },
            ],
          },
        ],
      }
    },
    activated() {},
    created() {},
    methods: {
      save() {
        console.log(this.list, 'list')
      },

      delRow(index) {
        this.list.splice(index, 1)
      },
      addRow() {
        this.list.push({
          value: '',
          type: '1',
          data: [
            {
              value: '',
            },
          ],
        })
      },
      add(item) {
        item.data.push({
          value: '',
        })
      },
      del(index) {
        item.data.splice(index, 1)
      },
    },
  }
</script>

<style lang="less" scoped>
  .QuestionnaireSurvey {
    .icon {
      font-size: 18px;
      cursor: pointer;
      color: #f19ec2;
    }

    .box {
      .row {
        padding: 4px 2px;

        .cell {
          display: flex;
          font-size: 12px;

          align-items: center;

          .left {
            width: 100px;
            text-align: right;
          }

          .center {
            margin: 0 8px;
            display: flex;
            flex-flow: wrap;

            .center-box {
              padding: 6px 0;
              width: 200px;
            }
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
