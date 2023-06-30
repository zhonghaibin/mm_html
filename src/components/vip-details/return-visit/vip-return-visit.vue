<template>
  <div class="VipReturnVisit">
    <div class="box">
      <div class="row">
        <div class="left">回访人员</div>
        <div class="right">
          <SelectStaff v-model="formData.staff_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">回访标题</div>
        <div class="right">
          <Input v-model="formData.name" placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">回访内容</div>
        <div class="right">
          <Input
            v-model="formData.info"
            placeholder=""
            style="width: 200px"
            type="textarea"
          />
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
      <div class="bt" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
  import UploadImage from '@/components/upload-image'
  import SelectStaff from '@/components/form/select-staff'

  export default {
    name: 'VipReturnVisit',
    components: { SelectStaff, UploadImage },
    props: {
      vid: {
        type: [String, Number],
        default: () => '',
      },
      data: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        formData: {
          vid: this.vid,
          name: '',
          staff_id: '',
          img_id: '',
          info: '',
          visit_id: '',
        },
        defaultList: [],
      }
    },
    activated() {},
    created() {
      this.defaultList = []
      if (this.data && Object.keys(this.data).length > 0) {
        this.formData.img_id = this.data.img_id
        this.formData.name = this.data.name
        this.formData.info = this.data.info
        this.formData.staff_id = this.data.staff_id
        if (this.data.img_id > 0) {
          this.defaultList.push({
            name: this.data.img_id,
            url: this.data.img,
          })
        }
      }

      console.log(this.defaultList, 'this.defaultList')
    },
    methods: {
      removeFile(res) {
        console.log(res, 'removeFile')
        this.formData.img_id = ''
      },
      uploadFile(res) {
        this.formData.img_id = res.id
        console.log(res, 'uploadFile')
      },
      save() {
        this.setVisitAct()
      },
      async setVisitAct() {
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
