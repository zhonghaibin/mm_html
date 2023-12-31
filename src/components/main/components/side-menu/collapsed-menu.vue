<template>
  <Dropdown
    ref="dropdown"
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :placement="placement"
    :transfer="hideTitle"
    @on-click="handleClick"
  >
    <a
      class="drop-menu-a"
      :style="{ textAlign: !hideTitle ? 'left' : '' }"
      type="text"
      @mouseover="handleMousemove($event, children)"
    >
      <Icon :color="textColor" :size="rootIconSize" :type="parentItem.icon" />
      <span v-if="!hideTitle" class="menu-title">
        {{ showTitle(parentItem) }}
      </span>
      <Icon
        v-if="!hideTitle"
        :size="16"
        style="float: right"
        type="ios-arrow-forward"
      />
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu
          v-if="showChildren(child)"
          :key="`drop-${child.name}`"
          :icon-size="iconSize"
          :parent-item="child"
        />
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <Icon :size="iconSize" :type="child.icon" />
          <span class="menu-title">{{ showTitle(child) }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  import mixin from './mixin'
  import itemMixin from './item-mixin'
  import { findNodeUpperByClasses } from '@/libs/util'

  export default {
    name: 'CollapsedMenu',
    mixins: [mixin, itemMixin],
    props: {
      hideTitle: {
        type: Boolean,
        default: false,
      },
      rootIconSize: {
        type: Number,
        default: 16,
      },
    },
    data() {
      return {
        placement: 'right-end',
      }
    },
    mounted() {
      let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, [
        'ivu-select-dropdown',
        'ivu-dropdown-transfer',
      ])
      if (dropdown) dropdown.style.overflow = 'visible'
    },
    methods: {
      handleClick(name) {
        this.$emit('on-click', name)
      },
      handleMousemove(event, children) {
        const { pageY } = event
        const height = children.length * 38
        const isOverflow = pageY + height < window.innerHeight
        this.placement = isOverflow ? 'right-start' : 'right-end'
      },
    },
  }
</script>
