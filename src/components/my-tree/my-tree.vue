<template>
  <div v-if="flag">
    <tree-item
      v-for="(item, index) in list"
      :key="index"
      class="item"
      :data="item"
      @change="handChange"
    />
  </div>
</template>
<script>
  import TreeItem from '@/components/my-tree/tree-item'
  export default {
    name: 'MyTree',
    components: { TreeItem },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data() {
      return {
        isTree: true,
        list: [],
        flag: false,
      }
    },
    created() {
      this.isTree = true
      this.list = this.data
      this.flag = false
      this.initData(this.list)
      this.flag = true
      console.log('list', this.list)
    },
    methods: {
      initData(list) {
        list.forEach((item) => {
          if (!item.disabled) {
            item.disabled = false
          }
          item.menu = true
          item.checked = Number(item.checked)
          this.initData(item.children)
        })
      },
      handChange(item) {
        this.$emit('change', item)
      },
      endCheck(item) {
        this.$emit('end-check', item)
      },
      clear() {
        this.$emit('clear', [])
      },
    },
  }
</script>
<style scoped></style>
