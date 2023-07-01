<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator" />
        <span class="title">测试账号</span>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown" />
      <DropdownMenu slot="list">
        <DropdownItem name="homoe">
          消息中心
          <Badge :count="messageUnreadCount" style="margin-left: 10px" />
        </DropdownItem>
        <DropdownItem name="logout" @click="handleClick('logout')">
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import './user.less'
  import { mapActions } from 'vuex'

  export default {
    name: 'User',
    props: {
      userAvator: {
        type: String,
        default: '',
      },
      messageUnreadCount: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      ...mapActions('user', ['handleLogOut']),
      logout() {
        this.handleLogOut().then(() => {
          this.$router.push({
            name: 'login',
          })
        })
      },
      message() {
        this.$router.push({
          name: 'message_page',
        })
      },
      handleClick(name) {
        switch (name) {
          case 'logout':
            this.logout()
            break
          case 'message':
            this.message()
            break
        }
      },
    },
  }
</script>
