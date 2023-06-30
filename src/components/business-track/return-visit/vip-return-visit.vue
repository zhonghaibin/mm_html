<template>
  <div class="VipReturnVisit">
    <div class="box">
      <div class="row">
        <div class="left">回访人员</div>
        <div class="right">
          <Input placeholder="" search style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">回访内容</div>
        <div class="right">
          <Input placeholder="" style="width: 200px" type="textarea" />
        </div>
      </div>
      <div class="row">
        <div class="left">附件</div>
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
      <div class="bt">保存</div>
    </div>
  </div>
</template>

<script>
  import UploadImage from '@/components/upload-image'
  export default {
    name: 'VipReturnVisit',
    components: { UploadImage },
    data: function () {
      return {
        defaultList: [],
        formData: {
          img_id: '',
        },
      }
    },
    mounted() {},
    methods: {
      removeFile(res) {
        console.log(res, 'removeFile')
        this.formData.img_id = ''
      },
      uploadFile(res) {
        this.formData.img_id = res.id
        console.log(res, 'uploadFile')
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipReturnVisit {
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
