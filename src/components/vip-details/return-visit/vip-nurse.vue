<template>
  <div class="VipNurse">
    <div class="box">
      <div class="row">
        <div class="left">会员信息</div>
        <div class="right">
          <div class="name">曾文明</div>
          <div class="phone">13823232512</div>
        </div>
      </div>
      <div class="row">
        <div class="left">护理时间</div>
        <div class="right">
          <DatePicker placeholder="选择时间" style="width: 200px" type="date" />
        </div>
      </div>
      <div class="row">
        <div class="left">护理项目</div>
        <div class="right">
          <SelectNurse />
        </div>
      </div>
      <div class="row">
        <div class="left">护理人员</div>
        <div class="right">
          <SelectStaff v-model="formData.staff_id" />
        </div>
      </div>
      <div class="row">
        <div class="left">下次护理时间</div>
        <div class="right">
          <DatePicker placeholder="选择时间" style="width: 200px" type="date" />
        </div>
      </div>
      <div class="row">
        <div class="left">护理详情</div>
        <div class="right">
          <Input
            placeholder="请输入寄存的数量"
            rows="4"
            style="width: 250px"
            type="textarea"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">附件上传</div>
        <div class="right">
          <UploadImage
            :default-list="defaultList"
            @remove="removeFile"
            @uploadFile="uploadFile"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">店长批阅</div>
        <div class="right">
          <Input
            placeholder="只能店长操作"
            rows="4"
            style="width: 250px"
            type="textarea"
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
  import SelectStaff from '@/components/form/select-staff'
  import SelectNurse from '@/components/form/select-nurse'
  import UploadImage from '@/components/upload-image'
  export default {
    name: 'VipNurse',
    components: { UploadImage, SelectNurse, SelectStaff },
    data: function () {
      return {
        defaultList: [],
        formData: {
          staff_id: '',
          img_id: '',
        },
      }
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
    },
  }
</script>

<style lang="less" scoped>
  .VipNurse {
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
          .name {
          }

          .phone {
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
