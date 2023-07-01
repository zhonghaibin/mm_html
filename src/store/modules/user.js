/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import Vue from 'vue'
import { getToken, setToken } from '@/utils/token'
import { getUid, setUid } from '@/utils/uid'
import { login, logout } from '@/api/user'

const getters = {
  token: (state) => state.token,
  username: (state) => state.username,
  phone: (state) => state.phone,
  avatar: (state) => state.avatar,
}
const state = () => ({
  token: getToken(),
  uid: getUid(),
  username: '游客',
  isOnLine: 0,
  avatar: '',
  unreadCount: 0,
})
const mutations = {
  /**
   * @description 设置token
   * @param {*} state
   * @param {*} token
   */
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  /**
   * @description 设置uid
   * @param {*} state
   * @param {*} uid
   */
  setUid(state, uid) {
    state.uid = uid
    setUid(uid)
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置在线状态
   * @param {*} state
   * @param {*} isOnLine
   */
  setIsOnLine(state, isOnLine) {
    state.isOnLine = isOnLine
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}
const actions = {
  /**
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const { token } = await login(userInfo)
    if (token) {
      commit('setToken', token)
    } else {
      throw `登录接口异常，未正确返回...`
    }
  },

  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('setToken', '')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const {
      data: { uid, name },
    } = await getUserInfo()
    /**
     * 检验返回数据是否正常，无对应参数，将使用默认用户名,头像,Roles和Permissions
     * username {String}
     * avatar {String}
     * roles {List}
     * ability {List}
     */
    if ((uid && !isString(uid)) || (name && !isString(name))) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    } else {
      if (uid) commit('setUid', uid)
      if (name) commit('setUsername', name)
      // 如不使用permissions权限控制,可删除以下代码
      if (permissions)
        dispatch('acl/setPermission', permissions, { root: true })
      if (isOnLine !== null && isOnLine !== undefined) {
        commit('setIsOnLine', isOnLine)
      }

      if (authUserList) {
        let userModelArr = []
        for (let item of authUserList) {
          userModelArr.push(item.appModelId)
        }
        commit('setUserModel', userModelArr)
      }
    }
  },

  /**
   * @description 设置token
   * @param {*} { commit }
   * @param {*} token
   */
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setAvatar({ commit }, avatar) {
    commit('setAvatar', avatar)
  },
  /**
   * @description 设置姓名
   * @param {*} { commit }
   * @param {*} userName
   */
  setUsername({ commit }, userName) {
    commit('setUsername', userName)
  },
  /**
   * @description 设置在线状态
   * @param {*} { commit }
   * @param {*} isOnLine
   */
  setIsOnLine({ commit }, isOnLine) {
    commit('setIsOnLine', isOnLine)
  },
}
export default { state, getters, mutations, actions }
