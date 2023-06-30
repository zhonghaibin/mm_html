<template>
  <div class="Package">
    <div class="box">
      <div class="left">
        <div class="header">
          <span class="red">*</span>
          <span class="title">基础信息</span>
          <span class="notice">带*为必填项</span>
        </div>
        <div class="form">
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              套餐名称
            </div>
            <div class="r">
              <Input placeholder="请输入套餐名称" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              适用门店
            </div>
            <div class="r">
              <SelectShop />
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              统一售价
            </div>
            <div class="r">
              <Input
                placeholder="请输入金额"
                style="width: 200px; padding: 0 2px"
              />
              <span
                style="color: #f19ec2; cursor: pointer"
                @click="show($event)"
              >
                {{ dropdown.title }}
                <Icon :size="16" type="md-arrow-dropright" />
              </span>
              <div v-if="dropdown.show" class="dropdown">
                <div class="row">
                  <div class="dropdown-l">总店</div>
                  <div class="dropdown-r">
                    <Input placeholder="请输入金额" style="width: 200px">
                      <span slot="append">￥</span>
                    </Input>
                  </div>
                </div>
                <div class="row">
                  <div class="dropdown-l">分店1</div>
                  <div class="dropdown-r">
                    <Input placeholder="请输入金额" style="width: 200px">
                      <span slot="append">￥</span>
                    </Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              套餐分类
            </div>
            <div class="r">
              <SelectProductType
                v-model="formData.goods_type_id"
                @on-select="productType"
              />
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              套餐内容
            </div>
            <div class="r">
              <div class="bt">设置套餐包含内容</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <span class="title">其他信息</span>
          <Poptip placement="left-start" transfer trigger="hover">
            <div class="explain">?字段说明</div>
            <div slot="content">
              <div class="fields-remark">
                <p class="text">
                  <span style="font-weight: bold">套餐名称：</span>
                  套餐名称不要翻过50个字。
                </p>
                <p class="text">
                  <span style="font-weight: bold">适用门店：</span>
                  设置哪些门店可以经营该套餐。
                </p>
                <p class="text">
                  <span style="font-weight: bold">统一售价：</span>
                  若存在不同门店不同的定价,请展开按门店设置价格。
                </p>
                <p class="text">
                  <span style="font-weight: bold">套餐分类：</span>
                  (推荐完善)方便收银和设置卡的时候快速筛选。
                </p>
                <p class="text">
                  <span style="font-weight: bold">套餐内容：</span>
                  选择当前套餐涵盖哪些项目/商品。
                </p>
                <p class="text">
                  <span style="font-weight: bold">购卡账送：</span>
                  可以选择设置购买该套餐次卡系统自动票送的内容,可以是另一张或储值卡,或项目/商品
                </p>
                <p class="text">
                  <span style="font-weight: bold">套餐状态：</span>
                  <br />
                  上架：可以在系统中售卖该套餐
                  <br />
                  下架：不可在系统中售卖该套餐
                </p>
                <p class="text">
                  <span style="font-weight: bold">套餐配图：</span>
                  针对线上商城首图
                </p>
                <p class="text">
                  <span style="font-weight: bold">套餐详情：</span>
                  针对该套餐的详情介绍,可文字、图片,主要在的城展示
                </p>
              </div>
            </div>
          </Poptip>
        </div>
        <div class="form">
          <div class="row">
            <div class="l">购卡赠送</div>
            <div class="r">
              <div class="bt">添加</div>
            </div>
          </div>
          <div class="row">
            <div class="l">套餐状态</div>
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
            <div class="l">套餐配图</div>
            <div class="r">
              <UploadImage
                :default-list="defaultList"
                @remove="removeFile"
                @uploadFile="uploadFile"
              />
              建议尺寸图片750*750
            </div>
          </div>
          <div class="row">
            <div class="l">套餐详情</div>
            <div class="r">
              <div id="editor"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt" @click="getEditorData">保存</div>
    </div>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'
  import SelectProductType from '@/components/form/select-product-type'
  import SelectShop from '@/components/form/select-shop'
  import UploadImage from '@/components/upload-image'

  export default {
    name: 'Package',
    components: { UploadImage, SelectShop, SelectProductType },
    data: function () {
      return {
        defaultList: [],
        editor: null,
        editorData: '',
        formData: {
          goods_type_id: '',
          img_id: '',
        },
        dropdown: {
          show: false,
          title: '展开',
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
      show(obj) {
        if (
          obj.currentTarget.children[0].className ===
          'ivu-icon ivu-icon-md-arrow-dropright'
        ) {
          obj.currentTarget.children[0].className =
            'ivu-icon ivu-icon-md-arrow-dropdown'
          this.dropdown.title = '收起'
          this.dropdown.show = true
        } else {
          obj.currentTarget.children[0].className =
            'ivu-icon ivu-icon-md-arrow-dropright'
          this.dropdown.title = '展开'
          this.dropdown.show = false
        }
      },
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
      productType() {},
    },
  }
</script>

<style lang="less" scoped>
  .Package {
    .box {
      display: flex;

      .left {
        flex: 1;
        background: white;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: 1px solid #efefef;
        margin-right: 4px;

        .header {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;

          .red {
            color: red;
            font-size: 16px;
          }

          .title {
            font-size: 14px;
            font-weight: bold;
          }

          .notice {
            padding-left: 10px;
            color: #8c8c8c;
          }
        }

        .form {
          padding: 2px 40px 20px 2px;

          .row {
            display: flex;
            margin-bottom: 10px;

            .l {
              padding: 2px 10px;
              width: 120px;
              font-size: 14px;
              text-align: right;

              .red {
                color: red;
              }
            }

            .r {
              flex: 1;

              .bt {
                width: 180px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #f19ec2;
                border-radius: 4px;
                color: white;
                cursor: pointer;
              }

              .dropdown {
                .row {
                  margin-top: 10px;
                  display: flex;
                  height: 40px;
                  align-items: center;

                  .dropdown-l {
                    margin-right: 6px;
                  }

                  .dropdown-r {
                  }
                }
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

        .header {
          padding-left: 10px;
          display: flex;
          align-items: center;

          .title {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: bold;
            flex: 1;
          }

          .explain {
            border: 1px solid #e1e1e1;
            padding: 2px 4px;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
          }
        }

        .form {
          padding: 2px 40px 20px 2px;

          .row {
            display: flex;
            margin-bottom: 10px;

            .l {
              padding: 2px 10px;
              width: 120px;
              font-size: 14px;
              text-align: right;
            }

            .r {
              flex: 1;
              z-index: 1;
              align-items: center;
              display: flex;

              .bt {
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #f19ec2;
                border-radius: 4px;
                color: white;
                cursor: pointer;
              }
            }
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
