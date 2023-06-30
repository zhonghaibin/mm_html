<template>
  <div class="OtherRevenue">
    <div class="content">
      <div class="row">
        <div class="left">
          <div>支出门店：</div>
        </div>
        <div class="right">
          <Select v-model="model1" style="width: 200px" transfer>
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>支出类型：</div>
        </div>
        <div class="right">
          <Select v-model="model1" style="width: 200px" transfer>
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>支出内容：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 400px" type="textarea" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>支付方式：</div>
        </div>
        <div class="right">
          <Select v-model="model1" style="width: 200px" transfer>
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>支出金额：</div>
        </div>
        <div class="right">
          <Input placeholder="" style="width: 200px" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>支出时间：</div>
        </div>
        <div class="right">
          <DatePicker
            placeholder="请选择日期"
            style="width: 200px"
            transfer
            type="date"
          />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div>附件：</div>
        </div>
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
    name: 'OtherRevenue',
    components: { UploadImage },

    data: function () {
      return {
        defaultList: [],
        cityList: [
          {
            value: 'New York',
            label: 'New York',
          },
        ],
        model1: '',
        formData: {
          vid: '',
          name: '',
          file: '',
          file_id: '',
        },
        loading: false,
      }
    },
    created() {},
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
        this.formData.data = this.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .OtherRevenue {
    .content {
      margin: 0 auto;
      padding: 0 10px;

      .row {
        display: flex;
        padding: 10px 0;
        align-items: center;

        .left {
          margin-right: 2px;
          width: 120px;
          text-align: right;
        }

        .right {
        }

        .bt {
          width: 300px;
          margin-top: 4px;
          background: #f19ec2;
          color: white;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          cursor: pointer;
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
