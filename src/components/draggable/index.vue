<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="item.fieldsId"
      draggable
      @dragend="onDragend"
      @dragenter="onDragenter(index)"
      @dragstart="onDragstart($event, index)"
    >
      <slot :item="item" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Draggable',
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        dragIndex: null,
        dropIndex: null,
      }
    },
    methods: {
      onDragstart(e, i) {
        this.dragIndex = i
      },
      onDragenter(i) {
        this.dropIndex = i
      },
      onDragend() {
        if (this.dragIndex !== this.dropIndex) {
          let list = this.list
          const dragIndex = this.dragIndex
          const dropIndex = this.dropIndex
          const drapItem = list[dragIndex]
          list.splice(dragIndex, 1)
          list.splice(dropIndex, 0, drapItem)
        }
      },
    },
  }
</script>
