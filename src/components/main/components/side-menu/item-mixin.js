export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {},
    },
    theme: String,
    iconSize: Number,
  },
  computed: {
    parentName() {
      return this.parentItem.name
    },
    children() {
      return this.parentItem.children
    },
    textColor() {
      return this.theme === 'dark' ? '#495060' : '#fff'
    },
  },
}
