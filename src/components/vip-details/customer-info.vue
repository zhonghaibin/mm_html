<template>
  <div class="CustomerInfo">
    <div class="header">
      <div class="right">
        <div
          class="add-bt"
          @click="showModal('添加自定义客情记录', 'Customer')"
        >
          添加客情
        </div>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <div v-for="(item, index) in list" :key="item.index" class="row">
          <div class="l">{{ item.name }}</div>
          <div class="r">
            <Select
              v-if="checkIsSelect(item)"
              v-model="item.info"
              style="width: 200px"
              transfer
            >
              <Option
                v-for="val in getSelectOptionList(item.name)"
                :key="val.label"
                :value="val.label"
              >
                {{ val.label }}
              </Option>
            </Select>
            <Input
              v-else
              v-model="item.info"
              placeholder=""
              style="width: 200px"
            >
              <div slot="append" v-if="getUnit(item.name)">
                {{ getUnit(item.name) }}
              </div>

              <Icon
                v-if="item.type === 1"
                style="font-size: 16px; cursor: pointer"
                type="ios-close"
                slot="append"
                @click.native="delRow(index, item)"
              />
            </Input>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt" @click="save">保存</div>
    </div>
    <Modal v-model="modal.show" :footer-hide="true" :title="modal.title">
      <Customer
        v-if="modalShow('Customer')"
        :member-info="memberInfo"
        @change="change"
      />
    </Modal>
  </div>
</template>

<script>
  import Customer from '@/components/vip-details/customer-info/customer'

  export default {
    name: 'CustomerInfo',
    components: { Customer },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
        },
        unitList: {
          体重: '公斤',
          身高: 'CM',
        },
        selectList: {
          血型: [
            {
              value: '1',
              label: 'A型',
            },
            {
              value: '2',
              label: 'B型',
            },
            {
              value: '3',
              label: 'AB型',
            },
            {
              value: '4',
              label: 'O型',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          性格: [
            {
              value: '1',
              label: '内向',
            },
            {
              value: '2',
              label: '外向',
            },
            {
              value: '3',
              label: '内外兼修',
            },
          ],
          婚姻状况: [
            {
              value: '1',
              label: '已婚',
            },
            {
              value: '2',
              label: '未婚',
            },
            {
              value: '3',
              label: '离异',
            },
            {
              value: '4',
              label: '再婚',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          宗教信仰: [
            {
              value: '1',
              label: '佛教',
            },
            {
              value: '2',
              label: '道教',
            },
            {
              value: '3',
              label: '伊斯兰教',
            },
            {
              value: '4',
              label: '天主教',
            },
            {
              value: '5',
              label: '无宗教信仰',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          意识观念: [
            {
              value: '1',
              label: '健康意识',
            },
            {
              value: '2',
              label: '预防意识',
            },
            {
              value: '3',
              label: '美丽意识',
            },
            {
              value: '0',
              label: '无意识',
            },
          ],
          饮食偏重: [
            {
              value: '1',
              label: '早餐',
            },
            {
              value: '2',
              label: '午餐',
            },
            {
              value: '3',
              label: '宵夜',
            },
            {
              value: '4',
              label: '肉食',
            },
            {
              value: '5',
              label: '素食',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          喜好: [
            {
              value: '1',
              label: '糕点',
            },
            {
              value: '2',
              label: '咖啡',
            },
            {
              value: '3',
              label: '饮料',
            },
            {
              value: '4',
              label: '水果',
            },
            {
              value: '5',
              label: '素菜',
            },
            {
              value: '6',
              label: '辛辣',
            },
            {
              value: '7',
              label: '清淡',
            },
            {
              value: '8',
              label: '咸味',
            },
            {
              value: '9',
              label: '甜食',
            },
            {
              value: '10',
              label: '煎炸',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          生活: [
            {
              value: '1',
              label: '购物',
            },
            {
              value: '2',
              label: '服装',
            },
            {
              value: '3',
              label: '珠宝',
            },
            {
              value: '4',
              label: '名车',
            },
            {
              value: '5',
              label: '名表',
            },
            {
              value: '6',
              label: '健身房',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          休闲: [
            {
              value: '1',
              label: '美容',
            },
            {
              value: '2',
              label: '旅游',
            },
            {
              value: '3',
              label: '音乐',
            },
            {
              value: '4',
              label: '唱歌',
            },
            {
              value: '5',
              label: '舞蹈',
            },
            {
              value: '6',
              label: '慈善',
            },
            {
              value: '7',
              label: '打麻将',
            },
            {
              value: '8',
              label: '看书',
            },
            {
              value: '9',
              label: '养花',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          消费: [
            {
              value: '1',
              label: '理性',
            },
            {
              value: '2',
              label: '冲动',
            },
            {
              value: '3',
              label: '贪小便宜',
            },
          ],
          睡眠质量: [
            {
              value: '1',
              label: '很好',
            },
            {
              value: '2',
              label: '一般',
            },
            {
              value: '3',
              label: '失眠',
            },
            {
              value: '4',
              label: '多梦',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          睡眠时间: [
            {
              value: '1',
              label: '23点前',
            },
            {
              value: '2',
              label: '23点后',
            },
            {
              value: '3',
              label: '凌晨1点后',
            },
            {
              value: '4',
              label: '不定时',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          睡前习惯: [
            {
              value: '1',
              label: '睡前喝水',
            },
            {
              value: '2',
              label: '睡前吃点东西',
            },
            {
              value: '3',
              label: '早晨起床后喝水',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          工作性质: [
            {
              value: '1',
              label: '室内办公',
            },
            {
              value: '2',
              label: '市区流动',
            },
            {
              value: '3',
              label: '常外地出差',
            },
            {
              value: '4',
              label: '本地做生意',
            },
            {
              value: '5',
              label: '压力大',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          资产状况: [
            {
              value: '1',
              label: '工薪（10-100万）',
            },
            {
              value: '2',
              label: '中产（100-500万）',
            },
            {
              value: '3',
              label: '富人（500以上）',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          社会背景: [
            {
              value: '1',
              label: '有',
            },
            {
              value: '2',
              label: '无',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          社会地位: [
            {
              value: '1',
              label: '有',
            },
            {
              value: '2',
              label: '无',
            },
            {
              value: '0',
              label: '未告知',
            },
          ],
          信任度: [
            {
              value: '1',
              label: '认可企业',
            },
            {
              value: '2',
              label: '认可效果',
            },
            {
              value: '3',
              label: '认可服务',
            },
          ],
          服务要求: [
            {
              value: '1',
              label: '注重细节',
            },
            {
              value: '2',
              label: '不受力',
            },
            {
              value: '3',
              label: '有洁癖',
            },
            {
              value: '4',
              label: '要求固定理疗师',
            },
            {
              value: '5',
              label: '注重产品品质',
            },
          ],
        },
        list: [],
        defaultList: [
          {
            type: 3,
            name: '体重',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '身高',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '血型',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '性格',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '婚姻状况',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '宗教信仰',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '意识观念',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '饮食偏重',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '喜好',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '生活',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '休闲',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '消费',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '睡眠质量',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '睡眠时间',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '睡前习惯',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '工作性质',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '资产状况',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '社会背景',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '社会地位',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '信任度',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '服务要求',
            info: '',
            id: '',
          },
          {
            type: 3,
            name: '单次消费',
            info: '',
            id: '',
          },
        ],
        formData: {
          vid: this.memberInfo.id,
          data: [],
        },
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
      checkIsSelect() {
        return (row) => {
          if (row.type === 3) {
            // eslint-disable-next-line no-prototype-builtins
            return this.selectList.hasOwnProperty(row.name)
          } else {
            return false
          }
        }
      },
      getSelectOptionList() {
        return (name) => {
          return this.selectList[name]
        }
      },
      getUnit() {
        return (name) => {
          // eslint-disable-next-line no-prototype-builtins
          if (this.unitList.hasOwnProperty(name)) {
            return this.unitList[name]
          }
          return ''
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      delRow(index, row) {
        this.$Modal.confirm({
          title: '警告？',
          content: '确定要删除吗？',
          onOk: () => {
            this.delVipRecord(row.id)
            this.list.splice(index, 1)
          },
          onCancel: () => {},
        })
      },
      change() {
        this.modal.show = false
        this.getList()
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },

      save() {
        this.formData.data = this.list
        this.setVipRecordAdd()
      },
      getList() {
        this.list = []
        this.getVipRecord(3).then((res) => {
          if (res.list.length > 0) {
            this.list = res.list
          } else {
            this.list = this.defaultList
          }
          this.getVipRecord(1).then((res) => {
            if (res.list.length > 0) {
              for (let i in res.list) {
                this.list.push(res.list[i])
              }
            }

            console.log(this.list, '_list')
          })
        })

        console.log(this.list, 'list')
      },

      async setVipRecordAdd() {
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
        }
      },
      async getVipRecord(type) {
        console.log(type)
        const { data } = { data: { list: [] } }
        return data
      },
      async delVipRecord(id) {
        console.log(id)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .CustomerInfo {
    padding: 10px;

    .header {
      display: flex;
      justify-content: flex-end;

      .right {
        width: 100px;
        margin-right: 10px;
        flex-flow: wrap;

        .add-bt {
          width: 100px;
          text-align: center;
          color: white;
          margin-right: 20px;
          cursor: pointer;
          background: #f19ec2;
          padding: 6px 14px;
          border-radius: 4px;
          margin-bottom: 1px;
        }
      }
    }

    .content {
      margin: 6px 0 18px 0;
      display: flex;

      .box {
        flex-flow: wrap;
        align-items: center;
        font-size: 14px;
        padding: 0 5px;

        display: flex;
        //justify-content: center;
        .row {
          margin: 0 10px;
          .l {
            padding: 2px 6px;
            font-size: 13px;
          }

          .r {
            padding: 4px 0;
          }
        }
      }
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      .bt {
        width: 100px;
        text-align: center;
        color: white;
        cursor: pointer;
        background: #f19ec2;
        padding: 6px 14px;
        border-radius: 4px;
        margin-bottom: 1px;
        margin-right: 10px;
      }
    }
  }
</style>
