<template>
  <div class="UploadImage">
    <div v-for="(item, index) in uploadList" :key="index" class="upload-list">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)" />
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)" />
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          hide-info
          :percent="item.percentage"
        />
      </template>
    </div>
    <Upload
      ref="upload"
      :action="url"
      :before-upload="handleBeforeUpload"
      :default-file-list="defaultList"
      :format="['jpg', 'jpeg', 'png']"
      :headers="{ token: token }"
      :max-size="20480"
      name="img"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-success="handleSuccess"
      :show-upload-list="false"
      style="display: inline-block; width: 58px"
      type="drag"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon size="20" type="ios-camera" />
      </div>
    </Upload>
    <Modal v-model="visible" title="查看图片">
      <img v-if="visible" :src="file" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'UploadImage',
    props: {
      defaultList: {
        type: Array,
        default: () => [],
      },
    },
    data: function () {
      return {
        imgName: '',
        visible: false,
        uploadList: [],
        file: '',
        url: process.env.VUE_APP_BASE_URL + '/Newuser/main/img_upload',
      }
    },
    computed: {
      ...mapGetters({
        token: 'user/token',
      }),
    },
    created() {},
    mounted() {
      this.uploadList = this.$refs.upload.fileList
    },
    methods: {
      handleView(data) {
        this.file = data.url
        this.imgName = data.name
        this.visible = true
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        this.$emit('removeFile', file)
      },
      handleSuccess(res, file) {
        file.url = res.img
        this.$emit('uploadFile', res)
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: '文件' + file.name + ' 格式不正确 , 请选择jpg或png.',
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + file.name + ' 太大, 不超过20M。',
        })
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 1
        if (!check) {
          this.$Notice.warning({
            title: '最多可上传1张图片。',
          })
        }
        return check
      },
    },
  }
</script>

<style lang="less" scoped>
  .UploadImage {
    .upload-list {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      margin-right: 4px;
    }

    .upload-list img {
      width: 100%;
      height: 100%;
    }

    .upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }

    .upload-list:hover .upload-list-cover {
      display: block;
    }

    .upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
</style>
