<template>
  <div class="Give">
    <div ref="content" class="content">
      <div class="list-top">
        <div>
          <span class="black">已选内容</span>
          <span class="grey">（0）</span>
        </div>
        <div class="bt-left"></div>
        <div class="bt-right">
          <div
            class="add-bt color"
            @click="showModal('添加赠送内容', 'SelectProject')"
          >
            添加赠送内容
          </div>
        </div>
      </div>

      <div class="list">
        <vxe-table
          ref="xTable"
          :cell-style="{ textAlign: 'center' }"
          :column-config="{ resizable: true }"
          :data="tableData"
          header-align="center"
          :height="tableHeight"
          :loading="loading"
          :row-config="{ isHover: true }"
          size="small"
        >
          <vxe-column title="序号" type="seq" width="60" />
          <vxe-column field="content" title="内容" />
          <vxe-column field="price" title="价格" />
          <vxe-column field="number" title="赠送数量" />
          <vxe-column field="long" title="赠送时长">
            <template>
              <template>
                <CheckboxGroup>
                  <Checkbox label="不限时" />
                  <Checkbox label="固定时长" />
                </CheckboxGroup>
                <div>
                  <Input size="small" style="width: 60px" />
                  <SelectDateType />
                </div>
              </template>
            </template>
          </vxe-column>
          <vxe-column title="操作" width="230">
            <div class="bt">删除</div>
          </vxe-column>
        </vxe-table>
      </div>
    </div>
    <div ref="footer" class="footer">
      <div class="footer-left">
        <div class="cell">
          <div class="text">备注</div>
          <div class="input">
            <Input placeholder="" />
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div class="cell">
          <div class="add-bt color">保存</div>
        </div>
        <div class="cell">
          <div class="add-bt color1">取消</div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <SelectProject v-if="modalShow('SelectProject')" />
    </Modal>
  </div>
</template>

<script>
  import SelectProject from '@/components/cashier/cashier/give/select-project'
  import SelectDateType from '@/components/form/select-date-type'

  export default {
    name: 'Give',
    components: { SelectDateType, SelectProject },
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            content: '测试测试',
            price: '20',
            number: '1',
            long: '11',
          },
        ],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
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
    activated() {},
    created() {},
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      showModal(title, type, data = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.data = data
        console.log('data', this.data)
      },
      setHeight() {
        let height = window.innerHeight - this.$refs.footer.offsetHeight - 330
        this.$refs.content.style.height = height + 'px'
      },
    },
  }
</script>

<style lang="less" scoped>
  .Give {
    position: relative;
    background: white;
    padding: 10px;

    .content {
      overflow: auto;

      .list-top {
        padding: 10px;
        font-size: 12px;
        display: flex;
        align-items: center;

        .black {
          color: black;
          font-weight: bold;
        }

        .grey {
          color: #d2cfcf;
          font-weight: bold;
        }

        .bt-left {
          flex: 1;

          .bt {
            margin-left: 16px;
          }
        }

        .bt-right {
          .bt {
            margin-left: auto;
          }
        }
      }

      .list {
        padding-bottom: 70px;
        width: 100%;
      }
    }

    .footer {
      z-index: 1000;
      display: flex;
      clear: both;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #dedede;
      left: 0;
      right: 0;
      padding: 10px 0;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
      background: white;

      .footer-left {
        width: 70%;
        display: flex;
        align-items: center;

        .cell {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 10px;

          .text {
            padding: 0 10px;
            font-weight: bold;
          }

          .input {
            flex: 1;
          }
        }
      }

      .footer-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;

        .cell {
        }
      }
    }

    .color {
      border: 1px solid #f19ec2;
      background: #f19ec2;
      color: white;
    }

    .color1 {
      background: white;
      color: #2c2c2c;
      border: 1px solid #2c2c2c;
    }

    .bt {
      padding: 5px;
      color: #1298e6;
      cursor: pointer;
    }

    .add-bt {
      margin-right: 20px;
      cursor: pointer;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
