<template>
  <div class="UploadFile">
    <div class="box">
      <div class="row">
        <div class="left">附件标题</div>
        <div class="right">
          <Input
            v-model="formData.name"
            :maxlength="15"
            placeholder="最多15字"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">上传图片</div>
        <div class="right">
          <UploadImage
            :default-list="defaultList"
            @remove="removeFile"
            @uploadFile="uploadFile"
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
  import UploadImage from '@/components/upload-image'

  export default {
    name: 'UploadFile',
    components: { UploadImage },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
      data: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vid: this.memberInfo.id,
          name: '',
          file: '',
          file_id: '',
        },
        defaultList: [],
      }
    },
    activated() {},
    created() {
      this.defaultList = []
      if (this.data && Object.keys(this.data).length > 0) {
        this.formData.file_id = this.data.id
        this.formData.name = this.data.name
        this.formData.file = this.data.file
        if (this.data.file) {
          this.defaultList.push({
            name: this.data.name,
            url: this.data.file,
          })
        }
      }
    },
    methods: {
      removeFile(res) {
        console.log(res, 'removeFile')
        this.formData.file = ''
      },
      uploadFile(res) {
        this.formData.file = res.img
        console.log(res, 'uploadFile')
      },
      save() {
        this.setFilesAct()
      },
      async setFilesAct() {
        const { status, msg } = { status: 0, msg: '请求失败' }
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
  .UploadFile {
    .box {
      .row {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .left {
          padding: 0 20px;
        }

        .right {
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
