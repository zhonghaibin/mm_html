<template>
  <div class="toolbar">
    <div class="tools-operate">
      <div class="custom-wrapper">
        <Button icon="md-apps" type="primary" @click="show(!is_show)" />
        <div v-show="is_show" class="custom-option-wrapper">
          <ul class="custom-header">
            <li class="custom-option">
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >
                全选/取消
              </Checkbox>
            </li>
          </ul>
          <div class="custom-body">
            <Draggable :list="checkAllGroup">
              <template #default="{ item }">
                <div class="fieldOne">
                  <Checkbox
                    v-model="item.status"
                    :false-value="0"
                    :true-value="1"
                    @on-change="checkChange"
                  >
                    {{ item.title }}
                  </Checkbox>
                  <Icon class="arrow" type="ios-swap" />
                </div>
              </template>
            </Draggable>
          </div>
          <div class="custom-footer">
            <Button @click="save">确定</Button>
            <Button @click="show(false)">关闭</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from '@/components/draggable'

  export default {
    name: 'Toolbar',
    components: { Draggable },
    props: {
      totalColumns: {
        type: Array,
        default: () => {
          return []
        },
      },
      tableColumns: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data: () => {
      return {
        single: 1,
        is_show: false,
        is_all: false,
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
        fixedColumn: [],
      }
    },
    computed: {
      checkTotal() {
        let total = 0
        this.checkAllGroup.forEach((item) => {
          if (item.status === 1) {
            total++
          }
        })
        return total
      },
    },
    created() {
      this.init()
      this.checkChange()
    },
    methods: {
      init() {
        let checkAllGroup = []
        let i_count = this.totalColumns.length
        let j_count = this.tableColumns.length
        for (let i = 0; i < i_count; i++) {
          let obj = JSON.parse(JSON.stringify(this.totalColumns[i]))
          if (
            !Object.prototype.hasOwnProperty.call(this.totalColumns[i], 'width')
          ) {
            obj.width = 120
          }
          if (
            Object.prototype.hasOwnProperty.call(this.totalColumns[i], 'fixed')
          ) {
            obj.fixed = this.totalColumns[i].fixed
            this.fixedColumn.push(obj)
          } else {
            for (let j = 0; j < j_count; j++) {
              if (this.totalColumns[i].title === this.tableColumns[j].title) {
                obj.status = 1
                break
              }
            }
            checkAllGroup.push(obj)
          }
        }
        this.checkAllGroup = checkAllGroup
      },
      newTableColumns() {
        let tableColumns = []
        this.checkAllGroup.forEach((item) => {
          if (item.status === 1) {
            tableColumns.push(item)
          }
        })
        this.fixedColumn.forEach((item) => {
          if (item.fixed === 'left') {
            tableColumns.unshift(item)
          }
          if (item.fixed === 'right') {
            tableColumns.push(item)
          }
        })
        console.log('tableColumns', tableColumns)
        return tableColumns
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false
        } else {
          this.checkAll = !this.checkAll
        }
        this.indeterminate = false
        if (this.checkAll) {
          this.checkAllGroup.forEach((item) => {
            item.status = 1
          })
        } else {
          this.checkAllGroup.forEach((item) => {
            item.status = 0
          })
        }
      },
      checkChange() {
        if (this.checkTotal === this.checkAllGroup.length) {
          this.indeterminate = false
          this.checkAll = true
        } else if (this.checkTotal > 0) {
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = false
        }
      },
      save() {
        this.show(false)
        let tableColumns = this.newTableColumns()
        this.$emit('on-change', tableColumns)
      },
      show(status) {
        this.is_show = status
      },
    },
  }
</script>

<style lang="less" scoped>
  .toolbar {
    margin-left: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #606266;
    background-color: #fff;

    .custom-option-wrapper {
      position: absolute;
      right: 0;
      text-align: left;
      background-color: #fff;
      z-index: 19;
      border: 1px solid #e8eaec;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

      .custom-header {
        padding: 0.28em 0;
        font-weight: 700;
        border-bottom: 1px solid #dadce0;
        list-style-type: none;
        overflow-x: hidden;
        overflow-y: auto;
        margin: 0;
        user-select: none;

        li {
          max-width: 18em;
          min-width: 12.5em;
          padding: 0.2em 1em 0.2em 0.3em;
        }
      }

      .custom-body {
        max-height: 300px;
        overflow: auto;

        .fieldOne {
          padding: 5px;
          margin: 5px 0;
          border-radius: 3px;
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: move;
        }
      }

      .custom-footer {
        border-top: 1px solid #dadce0;
        text-align: right;

        button {
          width: 50%;
          height: 2.5em;
          border: 0;
          color: #606266;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
</style>
