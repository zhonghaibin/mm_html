<template>
  <div>
    <li>
      <div>
        <Checkbox
          v-model="item.checked"
          :disabled="item.disabled"
          :false-value="0"
          :true-value="1"
          @on-change="check(item)"
        />
        <span class="name" :class="{ bold: isFolder }" @click="toggle(item)">
          {{ item.name }}
        </span>
      </div>
      <ul v-if="isFolder" v-show="isOpen">
        <tree-item
          v-for="(child, index) in item.children"
          :key="index"
          class="item"
          :data="child"
        />
      </ul>
    </li>
  </div>
</template>
<script>
  export default {
    name: 'TreeItem',
    inject: ['myTree'],
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    data() {
      return {
        isOpen: false,
        tree: null,
        isTree: false,
        parent: Object,
        item: {},
      }
    },
    computed: {
      isFolder: function () {
        return this.item.children && this.item.children.length
      },
      isExist() {
        return (current, item) => {
          return current.type === item.type && current.id === item.id
        }
      },
    },
    beforeDestroy() {
      this.myTree.$off('check')
    },
    created() {
      this.item = this.data
      // console.log('this.data11', this.item)
      this.myTree.$on('check', (data) => {
        if (this.isExist(this.item, data)) {
          this.item.checked = data.checked
          this.item.disabled = data.disabled
          this.item.name = this.item.name + ' '
          this.item.name = this.Trim(this.item.name)
          this.check(this.item)
        }
      })

      const parent = this.$parent
      this.parent = parent
      if (parent.isTree) {
        this.tree = parent
      } else {
        this.tree = parent.tree
      }
    },
    methods: {
      endCheck(item) {
        //最后一级
        if (!item.children || item.children.length === 0) {
          this.tree.endCheck(item)
        } else {
          this.tree.clear()
        }
      },

      toggle(item) {
        if (this.isFolder) {
          this.isOpen = !this.isOpen
        }
        this.endCheck(item)
      },
      check(item) {
        switch (item.checked) {
          case 1:
            this.handleDisabled(item, true)
            break
          case 0:
            this.handleDisabled(item, false)
            break
        }
        this.upChecked(this.parent, item)
        this.tree.handChange(item)
        this.endCheck(item)
      },

      upChecked(parent, current) {
        if (!parent.isTree) {
          if (current.checked === 1 || current.disabled) {
            //差一个上级就打满，需要锁住最后一个下级
            this.upSetDisabledTrue(parent)
          } else {
            //取消锁定
            this.upSetDisabledFalse(parent)
          }
        }
      },

      upSetDisabledTrue(parent) {
        if (parent.item) {
          parent.item.name = parent.item.name + ' '
          parent.item.disabled = true
          this.upSetDisabledTrue(parent.$parent)
          parent.item.name = this.Trim(parent.item.name)
        }
      },

      upSetDisabledFalse(parent) {
        if (parent.item) {
          let count = 0
          let flag = true
          parent.item.children.forEach((item) => {
            if (item.checked === 1 || item.disabled === true) {
              flag = false
            }
            if (item.checked === 1 || item.disabled === false) {
              count++
            }
          })
          if (flag) {
            if (parent.item.children.length - count === 0) {
              parent.item.name = parent.item.name + ' '
              parent.item.disabled = false
              parent.item.name = this.Trim(parent.item.name)
              this.upSetDisabledFalse(parent.$parent)
            } else {
              if (parent.item.children.length - count > 1) {
                parent.item.name = parent.item.name + ' '
                parent.item.disabled = false
                parent.item.name = this.Trim(parent.item.name)
                this.upSetDisabledFalse(parent.$parent)
              }
            }
          }
        }
      },
      handleDisabled(row, disabled) {
        row.children.forEach((item) => {
          item.name = item.name + ' '
          item.disabled = disabled
          this.handleDisabled(item, disabled)
          item.name = this.Trim(item.name)
        })
      },
      Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      },
    },
  }
</script>
<style scoped>
  body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }

  .item {
    cursor: pointer;
  }

  .bold {
    font-weight: bold;
  }

  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

  li {
    list-style: none;
  }
</style>
