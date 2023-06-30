<template>
  <div class="ValueCard">
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
              储值卡名称
            </div>
            <div class="r">
              <Input placeholder="请输入储值卡名称" style="width: 200px" />
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
              储值卡面额
            </div>
            <div class="r">
              <Input placeholder="请输入储值卡面额" style="width: 200px" />
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              储值卡分类
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
              储值卡规则
            </div>
            <div class="r">
              <div
                v-if="formData.ruleList.length === 0"
                class="bt"
                @click="showRuleProducts"
              >
                设置本张储值卡的使用规则
              </div>
              <table v-else style="width: 100%">
                <tr>
                  <td colspan="3">
                    <Button
                      size="small"
                      style="margin: 4px 2px"
                      type="primary"
                      @click="delRuleList"
                    >
                      全部删除
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      @click="showRuleProducts"
                    >
                      编辑
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>内容</td>
                  <td>折扣金额</td>
                </tr>
                <tr v-for="(item, index) in formData.ruleList" :key="index">
                  <td>{{ item.name }}</td>
                  <td>
                    <div v-for="(val, key) in item.shopList" :key="key">
                      {{ val.name }} : {{ val.discount }}折
                    </div>
                  </td>
                </tr>
              </table>
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
                  <span style="font-weight: bold">储值卡名称:</span>
                  套餐名称不要超过50个字。
                </p>
                <p class="text">
                  <span style="font-weight: bold">适用门店:</span>
                  设置哪些门店可以经营该储值卡。
                </p>
                <p class="text">
                  <span style="font-weight: bold">统一售价:</span>
                  若存在不同门店不同的定价,请展开按门店设置价格。
                </p>
                <p class="text">
                  <span style="font-weight: bold">储值卡面额:</span>
                  指当前储值卡可用金额。
                </p>
                <p class="text">
                  <span style="font-weight: bold">储值卡分类:</span>
                  (推荐完善)方便收银和设置卡的时候快速筛选。
                </p>
                <p class="text">
                  <span style="font-weight: bold">储值卡规则:</span>
                  设置该卡适用的各品项内容,收银时选择对应品项内容可使用对应的储值卡支付。
                </p>
                <p class="text">
                  <span style="font-weight: bold">开始时间:</span>
                  指储值卡生效日期,如果需要规定生效时间,请选择指定日期,可输入日期哦。
                </p>
                <p class="text">
                  <span style="font-weight: bold">结束时间:</span>
                  指储值卡失效日期,如果需要规定失效时间,请选择指定日期,可输入日期峨。
                </p>
                <p class="text">
                  <span style="font-weight: bold">购卡赠送:</span>
                  可以选择购买该卡后系统自动赠送的品项内容。
                </p>
                <p class="text">
                  <span style="font-weight: bold">续充赠送:</span>
                  可以选该卡续充后系统自动赠送的品项内容。
                </p>
                <p class="text">
                  <span style="font-weight: bold">储值卡状态:</span>
                  上架:可以在系统中售卖该套餐下架:不可在系统中售卖该套餐
                </p>
                <p class="text">
                  <span style="font-weight: bold">售卖:</span>
                  指可售卖。
                </p>
                <p class="text">
                  <span style="font-weight: bold">赠送:</span>
                  指该卡可赠送,不选时该卡不会在赠送列表出现。
                </p>
                <p class="text">
                  <span style="font-weight: bold">限购:</span>
                  指每个会员限购次数,超过后不可购买。
                </p>
              </div>
            </div>
          </Poptip>
        </div>
        <div class="form">
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              购卡赠送
            </div>
            <div class="r">
              <div
                v-if="formData.buyGiftList.length === 0"
                class="bt"
                @click="showModal('添加', 'BuyGive')"
              >
                添加
              </div>
              <table v-else style="width: 100%">
                <tr>
                  <td colspan="3">
                    <Button
                      size="small"
                      style="margin: 4px 2px"
                      type="primary"
                      @click="delBuyGiftList"
                    >
                      全部删除
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      @click="showModal('编辑', 'BuyGive')"
                    >
                      编辑
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>内容</td>
                  <td>数量</td>
                  <td>赠送时长</td>
                </tr>
                <tr v-for="(item, index) in formData.buyGiftList" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.num }}</td>
                  <td>{{ item.longTime.limit === 1 ? '无限制' : '有限制' }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="l">
              <span class="red">*</span>
              续充赠送
            </div>
            <div class="r">
              <div
                v-if="formData.renewGiftList.length === 0"
                class="bt"
                @click="showModal('添加', 'RenewGive')"
              >
                添加
              </div>
              <table v-else style="width: 100%">
                <tr>
                  <td colspan="3">
                    <Button
                      size="small"
                      style="margin: 4px 2px"
                      type="primary"
                      @click="delRenewGiveList"
                    >
                      全部删除
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      @click="showModal('编辑', 'RenewGive')"
                    >
                      编辑
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>内容</td>
                  <td>数量</td>
                  <td>赠送时长</td>
                </tr>
                <tr
                  v-for="(item, index) in formData.renewGiftList"
                  :key="index"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.num }}</td>
                  <td>{{ item.longTime.limit === 1 ? '无限制' : '有限制' }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="l">储值卡状态</div>
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
            <div class="l">储值卡须知</div>
            <div class="r">
              <div id="editor"></div>
            </div>
          </div>
          <div class="row">
            <div class="l">限购</div>
            <div class="r">
              <RadioGroup>
                <Radio label="是">
                  <span>不限</span>
                </Radio>
                <Radio label="否">
                  <span>限购</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="bt" @click="getEditorData">保存</div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <RuleProducts
        v-if="modalShow('RuleProducts')"
        :data="formData.ruleList"
        :shop-list="shopPriceList"
        @data="setRuleList"
      />
      <GiveProducts
        v-if="modalShow('BuyGive')"
        :data="formData.buyGiftList"
        @data="setBuyGiftList"
      />
      <GiveProducts
        v-if="modalShow('RenewGive')"
        :data="formData.renewGiftList"
        @data="setRenewGiftList"
      />
    </Modal>
  </div>
</template>

<script>
  import SelectProductType from '@/components/form/select-product-type'
  import SelectShop from '@/components/form/select-shop'
  import RuleProducts from '@/components/setting/project/value-card/rule-products'
  import GiveProducts from '@/components/setting/project/value-card/give-products'
  import wangEditor from 'wangeditor'

  export default {
    name: 'ValueCard',
    components: {
      GiveProducts,
      RuleProducts,
      SelectShop,
      SelectProductType,
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
          styles: { top: '50px' },
        },
        defaultList: [],
        editor: null,
        editorData: '',
        shopList: [
          {
            id: '1',
            name: '分店1',
          },
          {
            id: '2',
            name: '分店21',
          },
          {
            id: '3',
            name: '分店22',
          },
          {
            id: '4',
            name: '分店23',
          },
          {
            id: '5',
            name: '分店24',
          },
        ],
        shopPriceList: [
          {
            id: '1',
            name: '分店1',
          },
          {
            id: '2',
            name: '分店21',
          },
        ],
        valueTypeList: [],
        formData: {
          name: '',
          sids: [],
          prices: {
            total: '',
            shopList: [],
          },
          money: '',
          valueTypeId: '',
          ruleList: [],
          buyGiftList: [],
          renewGiftList: [],
          sort: '',
          info: '',
          status: '',
          limit: '',
        },
        dropdown: {
          show: false,
          title: '展开',
        },
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
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
      showModal(title, type, data = {}) {
        console.log(data)
        switch (type) {
          case 'RuleProducts':
            this.modal.width = window.innerWidth - 200
            break
          default:
            this.modal.width = 80
        }
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
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
      delRuleList() {
        this.formData.ruleList = []
      },
      setRuleList(data) {
        this.formData.ruleList = data
        this.modal.show = false
      },
      delBuyGiftList() {
        this.formData.buyGiftList = []
      },
      setBuyGiftList(data) {
        this.formData.buyGiftList = data
        this.modal.show = false
      },
      delRenewGiveList() {
        this.formData.renewGiftList = []
      },
      setRenewGiftList(data) {
        this.formData.renewGiftList = data
        this.modal.show = false
      },
      showRuleProducts() {
        if (this.shopPriceList.length <= 0) {
          this.$Message.error('请选择设用门店')
          return false
        }
        this.showModal('设置本张储值卡金额', 'RuleProducts')
      },
    },
  }
</script>

<style lang="less" scoped>
  .ValueCard {
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

    table {
      border-spacing: 0;
      border-collapse: collapse;
      tr {
        td {
          border: 1px solid #eeeeee;
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
