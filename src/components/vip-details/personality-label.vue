<template>
  <div class="PersonalityLabel">
    <div class="content">
      <div class="box">
        <div class="row">
          <div class="left">标签名称</div>
          <div class="right">
            <div class="labs">
              <Tag
                v-for="item in list"
                :key="item.name"
                closable
                @on-close="handleClose(item.name)"
              >
                {{ item.name }}
              </Tag>
            </div>
            <div class="input">
              <Input
                v-model="labelsTitle"
                placeholder="请输入标签名称后按回车"
                style="width: 180px"
                @keyup.enter.native="keyupClick"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="history">
        <div class="title">已添加标签</div>
        <div class="content">
          <Tag
            v-for="item in labelsList"
            :key="item.name"
            closable
            color="default"
            @on-close="handleDel(item.name)"
          >
            {{ item.name }}
          </Tag>
        </div>
      </div>
      <div class="tab-list">
        <div v-for="item in tagsTypeList" :key="item.id" class="tab-list-row">
          <div class="left">{{ item.name }}</div>
          <div class="right">
            <Tag
              v-for="val in item.childlist"
              :key="val.id"
              :color="val.color ? val.color : `default`"
              @click.native="selectTag(val)"
            >
              {{ val.name }}
            </Tag>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left"></div>
      <div class="right">
        <div class="bt" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PersonalityLabel',
    components: {},
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        labelsList: [],
        labelsTitle: '',
        list: [],
        formData: {
          vid: '',
          mold: '',
          tags: [],
        },
        searchData: { vid: '', mold: 1, search: '', page: 10000 },
        tagsTypeList: [],
      }
    },
    created() {
      this.getTags()
      this.getTagsTypeList()
    },
    activated() {
      this.getTags()
    },

    methods: {
      check(name) {
        let list = []
        list = JSON.parse(JSON.stringify(this.labelsList))
        for (let i in this.list) {
          list.push(this.list[i])
        }
        let flag = true
        for (let i in list) {
          if (list[i].name === name) {
            flag = false
            break
          }
        }

        return flag
      },
      selectTag(row) {
        if (this.check(row.name)) {
          this.list.push({
            tags_id: row.id,
            name: row.name,
          })
        }
      },

      save() {
        this.formData.vid = this.memberInfo.id
        this.formData.mold = 1
        this.formData.tags = this.labelsList
        for (let i in this.list) {
          this.formData.tags.push(this.list[i])
        }
        this.setTags()
        this.list = []
      },
      handleDel(val) {
        for (let i in this.labelsList) {
          if (this.labelsList[i].name === val) {
            this.labelsList.splice(i, 1)
            return false
          }
        }
      },
      handleClose(val) {
        for (let i in this.list) {
          if (this.list[i].name === val) {
            this.list.splice(i, 1)
            return false
          }
        }
      },
      keyupClick() {
        if (this.check(this.labelsTitle)) {
          this.list.push({
            tags_id: 0,
            name: this.labelsTitle,
          })
        }

        this.labelsTitle = ''
      },
      async getTags() {
        this.searchData.vid = this.memberInfo.id
        this.searchData.mold = 1
        const { data } = { data: { list: [{ name: 11 }] } }
        if (data.list && data.list.length > 0) {
          this.labelsList = data.list
        }
      },
      async setTags() {
        const { msg, status } = [0, '']
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.$emit('changeLabels')
        }
      },
      async getTagsTypeList() {
        this.tagsTypeList = []
      },
    },
  }
</script>

<style lang="less" scoped>
  .PersonalityLabel {
    .content {
      .box {
        border-bottom: 1px solid #ccc;
        padding: 10px 0;

        .row {
          align-items: center;
          display: flex;

          .left {
            font-weight: bold;
            padding: 0 4px;
          }

          .right {
            display: flex;
            border: 1px solid #bdbdbd;
            border-radius: 4px;
            align-items: center;
          }
        }
      }

      .history {
        .title {
          padding: 10px 0;
        }

        .content {
        }
      }

      .tab-list {
        border-top: 1px solid #ccc;
        margin-top: 10px;

        .tab-list-row {
          display: flex;
          padding: 4px 2px;
          align-items: center;
          border-bottom: 1px solid #f3f3f3;
          margin: 1px;

          .left {
            min-width: 80px;
            padding: 2px 4px;
            font-weight: bold;
          }

          .right {
          }
        }
      }
    }

    .footer {
      .left {
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
