<template>
  <div class="layout" style="height: 100%">
    <Layout style="height: 100%">
      <Sider
        v-model="collapsed"
        class="left-sider"
        :collapsed-width="64"
        collapsible
        hide-trigger
        :style="{ overflow: 'hidden' }"
        :width="200"
      >
        <side-menu
          ref="sideMenu"
          accordion
          :active-name="$route.name"
          :collapsed="collapsed"
          :menu-list="menuList"
          theme="light"
          @on-select="turnToPage"
        >
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con">
            <div v-show="!collapsed" class="logo-info">
              <div class="logo">
                <img key="max-logo" :src="maxLogo" />
              </div>
              <div class="name">产后管理系统</div>
            </div>
            <div v-show="collapsed">
              <img key="min-logo" :src="minLogo" />
            </div>
          </div>
        </side-menu>
      </Sider>
      <Layout>
        <Header class="header-con">
          <header-bar
            :collapsed="collapsed"
            @on-coll-change="handleCollapsedChange"
          >
            <user
              :message-unread-count="unreadCount"
              :user-avator="userAvator"
            />
            <Button />
          </header-bar>
        </Header>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <tags-nav
                :list="tagNavList"
                :value="$route"
                @input="handleClick"
                @on-close="handleCloseTag"
              />
            </div>
            <Content class="content-wrapper">
              <keep-alive>
                <router-view />
              </keep-alive>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import SideMenu from './components/side-menu'
  import TagsNav from '@/components/main/components/tags-nav'
  import headerBar from '@/components/main/components/header-bar'
  import User from '@/components/main/components/user'
  import Button from '@/components/main/components/button'
  import { mapMutations, mapGetters } from 'vuex'
  import { getNewTagList, routeEqual } from '@/libs/util'
  import routers from '@/router/routers'
  import minLogo from '@/assets/minLogo.png'
  import maxLogo from '@/assets/maxLogo.png'

  export default {
    name: 'Main',
    components: {
      TagsNav,
      SideMenu,
      headerBar,
      User,
      Button,
    },
    data() {
      return {
        minLogo,
        maxLogo,
        collapsed: false,
      }
    },
    computed: {
      ...mapGetters({
        errorCount: 'app/errorCount',
        menuList: 'app/menuList',
      }),
      tagNavList() {
        return this.$store.state.app.tagNavList
      },
      userAvator() {
        return this.$store.state.user.avatar
      },
      // menuList() {
      //   return this.$store.getters.menuList
      // },
      unreadCount() {
        return this.$store.state.user.unreadCount
      },
    },
    watch: {
      $route(newRoute) {
        const { name, query, params, meta } = newRoute
        this.addTag({
          route: { name, query, params, meta },
          type: 'push',
        })
        this.setBreadCrumb(newRoute)
        this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        this.$refs.sideMenu.updateOpenName(newRoute.name)
      },
    },
    mounted() {
      /**
       * @description 初始化设置面包屑导航和标签导航
       */
      this.setTagNavList()
      this.setHomeRoute(routers)
      const { name, params, query, meta } = this.$route
      this.addTag({
        route: { name, params, query, meta },
      })
      this.setBreadCrumb(this.$route)
      // 如果当前打开页面不在标签栏中，跳到homeName页
      if (!this.tagNavList.find((item) => item.name === this.$route.name)) {
        this.$router.push({
          name: this.$config.homeName,
        })
      }
    },
    methods: {
      ...mapMutations({
        setBreadCrumb: 'app/setBreadCrumb',
        setTagNavList: 'app/setTagNavList',
        addTag: 'app/addTag',
        setLocal: 'app/setLocal',
        setHomeRoute: 'app/setHomeRoute',
        closeTag: 'app/closeTag',
      }),

      turnToPage(route) {
        let { name, params, query } = {}
        if (typeof route === 'string') name = route
        else {
          name = route.name
          params = route.params
          query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
        }
        this.$router.push({
          name,
          params,
          query,
        })
      },
      handleCollapsedChange(state) {
        this.collapsed = state
      },
      handleCloseTag(res, type, route) {
        if (type !== 'others') {
          if (type === 'all') {
            this.turnToPage(this.$config.homeName)
          } else {
            if (routeEqual(this.$route, route)) {
              this.closeTag(route)
            }
          }
        }
        this.setTagNavList(res)
      },
      handleClick(item) {
        this.turnToPage(item)
      },
    },
  }
</script>

<style lang="less">
  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }
  .box {
    .column {
      font-weight: bold;
      font-size: 14px;
      padding: 0 0 4px;
      height: 100%;
    }
  }
</style>
<style lang="less" scoped>
  .layout {
    .spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }

    .logo-con {
      padding: 5px;

      .logo-info {
        display: flex;
        align-items: center;

        .logo {
          padding-left: 10px;

          img {
            height: 50px;
            width: auto;
            display: block;
            margin: 0 auto;
          }
        }

        .name {
          flex: 1;
          padding-left: 10px;
          font-size: 14px;
          color: white;
        }
      }

      img {
        height: 40px;
        width: auto;
        display: block;
        margin: 0 auto;
      }
    }

    .header-con {
      width: 100%;
    }

    .main-layout-con {
      height: 100%;
    }

    .main-content-con {
      height: ~'calc(100% - 60px)';
      overflow: hidden;
    }

    .tag-nav-wrapper {
      padding: 0;
      height: 40px;
      background: #f0f0f0;
    }

    .content-wrapper {
      padding: 6px 18px 0 16px;
      height: ~'calc(100% - 80px)';
      overflow: auto;
    }
  }
</style>
