<template>
  <a
    :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"
    type="text"
    @click="handleChange"
  >
    <Icon :size="size" :type="icon" />
  </a>
</template>
<script>
  export default {
    name: 'SiderTrigger',
    props: {
      collapsed: Boolean,
      icon: {
        type: String,
        default: 'navicon-round',
      },
      size: {
        type: Number,
        default: 26,
      },
    },
    methods: {
      handleChange() {
        this.$emit('on-change', !this.collapsed)
      },
    },
  }
</script>
<style lang="less">
  @import './sider-trigger.less';
</style>
