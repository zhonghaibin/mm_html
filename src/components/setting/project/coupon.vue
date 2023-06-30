<template>
  <div class="coupon">
    <div class="box">
      <div class="left">
        <div class="header">
          <span class="red">*</span>
          <span style="font-weight: bold">基础信息</span>
          <span class="notice">带*为必填项</span>
        </div>
        <div class="form">
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              请选择券类型
            </div>
            <div class="r">
              <RadioGroup>
                <Radio label="1">
                  <span>现金券</span>
                </Radio>
                <Radio label="2">
                  <span>折扣券</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              券名称
            </div>
            <div class="r">
              <Input placeholder="请输入券名称" style="width: 200px" />
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
              券面额
            </div>
            <div class="r">
              <Input placeholder="请输入券面额" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              券分类
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
              券规则
            </div>
            <div class="r">
              <div class="bt">设置本张券的使用规则</div>
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              开始时间
            </div>
            <div class="r">
              <RadioGroup>
                <Radio label="1">
                  <span>购买时间</span>
                </Radio>
                <Radio label="2">
                  <span>首次使用时间</span>
                </Radio>
                <Radio label="3">
                  <span>指定日期</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              结束时间
            </div>
            <div class="r">
              <RadioGroup>
                <Radio label="1">
                  <span>不限时长</span>
                </Radio>
                <Radio label="2">
                  <span>固定时长</span>
                </Radio>
                <Radio label="3">
                  <span>指定日期</span>
                </Radio>
              </RadioGroup>
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
                  <span style="font-weight: bold">券类型:</span>
                  现金券是指现金抵扣券,折扣券是指享受折扣的券。
                </p>
                <p class="text">
                  <span style="font-weight: bold">券名称:</span>
                  券名称不要超过50个字。
                </p>
                <p class="text">
                  <span style="font-weight: bold">适用门店:</span>
                  设置哪些门店可以经营该券。
                </p>
                <p class="text">
                  <span style="font-weight: bold">统一售价:：</span>
                  若存在不同门店不同的定价,请展开按门店设置价格。
                </p>
                <p class="text">
                  <span style="font-weight: bold">券面额:</span>
                  指当前券可用金额。
                </p>
                <p class="text">
                  <span style="font-weight: bold">券分类：</span>
                  (推荐完善)方便收银和设置卡的时候快速筛选。
                </p>
                <p class="text">
                  <span style="font-weight: bold">使用范围:</span>
                  设置该券适用的各品项内容,收银时选择对应品项内容可使用对应的券支付。
                </p>
                <p class="text">
                  <span style="font-weight: bold">开始时间:</span>
                  指该券生效日期,如果需要规定生效时间,请选择指定日期,可输入日期哦。
                </p>
                <p class="text">
                  <span style="font-weight: bold">结束时间:</span>
                  指该券失效日期,如果需要规定失效时间,请选择指定日期,可输入日期哦。
                </p>
                <p class="text">
                  <span style="font-weight: bold">券状态:</span>
                  上架:可以在系统中售卖该券下架:不可在系统中售卖该券
                </p>
                <p class="text">
                  <span style="font-weight: bold">售卖:</span>
                  指可售卖。
                </p>
                <p class="text">
                  <span style="font-weight: bold">赠送:</span>
                  指该券可赠送,不选时该券不会在赠送列表出现。
                </p>
              </div>
            </div>
          </Poptip>
        </div>
        <div class="form">
          <div class="row">
            <div class="l">券状态</div>
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
            <div class="l">订单使用限制</div>
            <div class="r">
              <RadioGroup>
                <Radio label="是">
                  <span>1次</span>
                </Radio>
                <Radio label="否">
                  <span>不限制</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="row">
            <div class="l">相互赠送</div>
            <div class="r">
              <RadioGroup>
                <Radio label="是">
                  <span>允许</span>
                </Radio>
                <Radio label="否">
                  <span>不允许</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="row">
            <div class="l">券须知</div>
            <div class="r">
              <Input placeholder="券须知" type="textarea" />
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
  import SelectProductType from '@/components/form/select-product-type'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'Coupon',
    components: {
      SelectShop,
      SelectProductType,
    },
    data: function () {
      return {
        defaultList: [],
        editor: null,
        editorData: '',
        formData: {
          brand: '',
          unit: '',
          goods_type_id: '',
          img_id: '',
        },
        dropdown: {
          show: false,
          title: '展开',
        },
      }
    },
    mounted() {},
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
      brand() {},
      unit() {},
      productType() {},
    },
  }
</script>

<style lang="less" scoped>
  .coupon {
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
              flex: 1;
              z-index: 1;

              align-items: center;
              display: flex;
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
