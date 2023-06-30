<template>
  <div class="ExperienceCard">
    <div class="box">
      <div class="left">
        <div class="form">
          <div class="row">
            <div class="l">卡名称</div>
            <div class="r">
              <Input placeholder="请输入卡名称" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">领卡费</div>
            <div class="r">
              <Input placeholder="请输入领卡费" style="width: 200px" />
              <p style="color: #f19ec2; cursor: pointer">
                不填或为0时,则为免费领取
              </p>
            </div>
          </div>
          <div class="row">
            <div class="l">体验后奖励</div>
            <div class="r">
              <Input placeholder="请输入金额" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">分享图</div>
            <div class="r">
              <UploadImage
                :default-list="defaultList"
                @remove="removeFile"
                @uploadFile="uploadFile"
              />
              <p style="color: #f19ec2; cursor: pointer">建议正方形</p>
            </div>
          </div>
          <div class="row">
            <div class="l">适用门店</div>
            <div class="r">
              <SelectShop v-model="formData.sid" @on-select="shop" />
            </div>
          </div>
          <div class="row">
            <div class="l">适用等级</div>
            <div class="r">
              <SelectVipGrade v-model="formData.sid" @on-select="grade" />
            </div>
          </div>
          <div class="row">
            <div class="l">可赠送数</div>
            <div class="r">
              <Input placeholder="请输入数量" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">朋友可赠送数</div>
            <div class="r">
              <Input placeholder="请输入数量" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">有效期</div>
            <div class="r">
              <Input placeholder="请输入数量" style="width: 200px" />
              天
            </div>
          </div>
          <div class="row">
            <div class="l">状态</div>
            <div class="r">
              <RadioGroup>
                <Radio label="是">
                  <span>上架</span>
                </Radio>
                <Radio label="否">
                  <span>下架</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="row">
            <div class="l">分享描述</div>
            <div class="r">
              <Input placeholder="请输入内容" style="width: 200px" />
              天
            </div>
          </div>
          <div class="row">
            <div class="l">卡项内容</div>
            <div class="r">
              <div class="add-bt">添加卡项内容</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>

    <div class="footer">
      <div class="bt" @click="getEditorData">保存</div>
    </div>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'
  import SelectShop from '@/components/form/select-shop'
  import SelectVipGrade from '@/components/form/select-vip-grade'
  import UploadImage from '@/components/upload-image'

  export default {
    name: 'ExperienceCard',
    components: { UploadImage, SelectVipGrade, SelectShop },
    data: function () {
      return {
        defaultList: [],
        editor: null,
        editorData: '',
        formData: {
          sid: '',
          img_id: '',
        },
      }
    },
    mounted() {
      const editor = new wangEditor(`#editor`)

      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml
        this.$emit('editorContent', newHtml)
      }
      // 创建编辑器
      editor.create()
      this.editor = editor
    },
    methods: {
      getEditorData() {
        // 通过代码获取编辑器内容
        let data = this.editor.txt.html()
        alert(data)
      },
      beforeDestroy() {
        // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
      },
      removeFile(res) {
        console.log(res, 'removeFile')
        this.formData.img_id = ''
      },
      uploadFile(res) {
        this.formData.img_id = res.id
        console.log(res, 'uploadFile')
      },
      shop() {},
      grade() {},
    },
  }
</script>

<style lang="less" scoped>
  .ExperienceCard {
    .box {
      display: flex;

      .left {
        width: 500px;
        background: white;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: 1px solid #efefef;
        margin-right: 4px;

        .form {
          padding: 2px 40px 20px 2px;

          .row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            .l {
              padding: 2px 10px;
              width: 140px;
              font-size: 14px;
              text-align: right;
              .red {
                color: red;
              }
            }

            .r {
              flex: 1;

              .add-bt {
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
      }
      .right {
        flex: 1;
        background: white;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid #efefef;
        margin-left: 4px;
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
