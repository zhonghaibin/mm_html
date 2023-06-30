<template>
  <div class="Tag">
    <div class="box">
      <div class="row">
        <div class="left">标签类型</div>
        <div class="right">
          <Select v-model="tag_type" style="width: 200px" transfer>
            <Option
              v-for="item in tag_type_list"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
          <span
            style="color: #cc749a; padding: 4px; cursor: pointer"
            @click="showModal('类别管理', 'TagTypeList')"
          >
            类别管理
          </span>
        </div>
      </div>
      <div class="row">
        <div class="left">标签名称</div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">标签颜色</div>
        <div class="right">
          <ColorPicker v-model="color" />
        </div>
      </div>
    </div>
    <div class="notice">
      温馨提示：标签名称修改后，会员档案中的已设的该标签内容的颜色也会相应改变
    </div>

    <div class="footer">
      <div class="bt">保存</div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <TagTypeList v-if="modalShow('TagTypeList')" />
    </Modal>
  </div>
</template>

<script>
  import TagTypeList from '@/components/setting/system/tag-type-list'

  export default {
    name: 'Tag',
    components: {
      TagTypeList,
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 700,
        },
        tag_type_list: [],
        tag_type: '',
        color: '',
      }
    },

    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .Tag {
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
        }
      }
    }

    .notice {
      text-align: center;
      font-size: 14px;
      color: #a5a5a5;
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
