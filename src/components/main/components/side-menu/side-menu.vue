<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      v-show="!collapsed"
      ref="menu"
      :accordion="accordion"
      :active-name="activeName"
      :open-names="openedNames"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            v-else
            :key="`menu-${item.children[0].name}`"
            :name="getNameOrHref(item, true)"
          >
            <Icon :type="item.children[0].icon || ''" />
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            v-else
            :key="`menu-${item.name}`"
            :name="getNameOrHref(item)"
          >
            <Icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div v-show="collapsed" class="menu-collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          :key="`drop-menu-${item.name}`"
          hide-title
          :icon-size="iconSize"
          :parent-item="item"
          :root-icon-size="rootIconSize"
          :theme="theme"
          @on-click="handleSelect"
        />
        <Tooltip
          v-else
          :key="`drop-menu-${item.name}`"
          :content="
            showTitle(
              item.children && item.children[0] ? item.children[0] : item
            )
          "
          placement="right"
          transfer
        >
          <a
            class="drop-menu-a"
            :style="{ textAlign: 'center' }"
            @click="handleSelect(getNameOrHref(item, true))"
          >
            <Icon
              :color="textColor"
              :size="rootIconSize"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
  import SideMenuItem from './side-menu-item.vue'
  import CollapsedMenu from './collapsed-menu.vue'
  import { getUnion } from '@/libs/tools'
  import mixin from './mixin'

  export default {
    name: 'SideMenu',
    components: {
      SideMenuItem,
      CollapsedMenu,
    },
    mixins: [mixin],
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        },
      },
      collapsed: {
        type: Boolean,
      },
      theme: {
        type: String,
        default: 'dark',
      },
      rootIconSize: {
        type: Number,
        default: 20,
      },
      iconSize: {
        type: Number,
        default: 16,
      },
      accordion: Boolean,
      activeName: {
        type: String,
        default: '',
      },
      openNames: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        openedNames: [],
      }
    },
    computed: {
      textColor() {
        return this.theme === 'dark' ? '#495060' : '#fff'
      },
    },
    watch: {
      activeName(name) {
        if (this.accordion)
          this.openedNames = this.getOpenedNamesByActiveName(name)
        else
          this.openedNames = getUnion(
            this.openedNames,
            this.getOpenedNamesByActiveName(name)
          )
      },
      openNames(newNames) {
        this.openedNames = newNames
      },
      openedNames() {
        this.$nextTick(() => {
          this.$refs.menu.updateOpened()
        })
      },
    },
    mounted() {
      this.openedNames = getUnion(
        this.openedNames,
        this.getOpenedNamesByActiveName(name)
      )
    },
    methods: {
      handleSelect(name) {
        this.$emit('on-select', name)
      },
      getOpenedNamesByActiveName(name) {
        return this.$route.matched
          .map((item) => item.name)
          .filter((item) => item !== name)
      },
      updateOpenName(name) {
        if (name === this.$config.homeName) this.openedNames = []
        else this.openedNames = this.getOpenedNamesByActiveName(name)
      },
    },
  }
</script>
<style lang="less">
  @import './side-menu.less';
</style>
