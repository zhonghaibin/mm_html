/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import Vue from 'vue'
import { getToken, removeToken, setToken } from '@/utils/token'
import { getCompanyId, setCompanyId } from '@/utils/companyId'
import { getPhone, setPhone } from '@/utils/phone'
import { getShopId, setShopId } from '@/utils/shopId'
import { setUid, getUid } from '@/utils/uid'
import Cookies from 'js-cookie'
import { logout } from '@/api/user'

const getters = {
  token: (state) => state.token,
  companyId: (state) => state.companyId,
  shopId: (state) => state.shopId,
  uid: (state) => state.uid,
  username: (state) => state.username,
  phone: (state) => state.phone,
  avatar: (state) => state.avatar,
}
const state = () => ({
  token: getToken(),
  companyId: getCompanyId(),
  shopId: getShopId(),
  uid: getUid(),
  username: '游客',
  phone: getPhone(),
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
   * @description 设置companyId
   * @param {*} state
   * @param {*} companyId
   */
  setCompanyId(state, companyId) {
    state.companyId = companyId
    setCompanyId(companyId)
  },
  /**
   * @description 设置phone
   * @param {*} state
   * @param {*} phone
   */
  setPhone(state, phone) {
    state.phone = phone
    setPhone(phone)
  },
  /**
   * @description 设置userModel
   * @param {*} state
   * @param {*} userModel
   */
  setUserModel(state, userModel) {
    state.userModel = userModel
    setUserModel(userModel)
  },
  /**
   * @description 设置shopId
   * @param {*} state
   * @param {*} companyId
   */
  setShopId(state, shopId) {
    state.shopId = shopId
    setShopId(shopId)
  },
  /**
   * @description 设置uid
   * @param {*} state
   * @param {*} username
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
  /**
   * @description 设置私信Token
   * @param {*} state
   * @param {*} conversationToken
   */
  setConversationToken(state, conversationToken) {
    state.conversationToken = conversationToken
    setConversationToken(conversationToken)
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
    const {
      data: { [tokenName]: token },
    } = await login(userInfo)
    if (token) {
      commit('setToken', token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      const err = `登录接口异常，未正确返回${tokenName}...`
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    }
  },
  /**
   * @description 第三方登录
   * @param {*} {}
   * @param {*} tokenData
   */
  async socialLogin({ commit }, tokenData) {
    const {
      data: { [tokenName]: token },
    } = await socialLogin(tokenData)
    if (token) {
      commit('setToken', token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      const err = `login核心接口异常，请检查返回JSON格式是否正确，是否正确返回${tokenName}...`
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    }
  },
  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      // commit('setToken', '')
      // commit('setAccess', [])
      // resolve()
    })
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const {
      data: {
        uid,
        name,
        phone,
        portrait,
        roles,
        permissions,
        isOnLine,
        docVersion,
        docTitle,
        docBody,
        docPath,
        authUserList,
      },
    } = await getUserInfo()
    /**
     * 检验返回数据是否正常，无对应参数，将使用默认用户名,头像,Roles和Permissions
     * username {String}
     * avatar {String}
     * roles {List}
     * ability {List}
     */
    if (
      (uid && !isString(uid)) ||
      (name && !isString(name)) ||
      (portrait && !isString(portrait)) ||
      (roles && !isArray(roles)) ||
      (permissions && !isArray(permissions))
    ) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    } else {
      if (uid) commit('setUid', uid)
      if (name) commit('setUsername', name)
      if (phone) commit('setPhone', phone)
      if (portrait) commit('setAvatar', portrait)
      if (roles) dispatch('acl/setRole', roles, { root: true })
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

    //版本更新提醒
    if (localStorage.getItem('docVersion') != docVersion) {
      Vue.prototype.$baseNotify(
        docBody,
        docTitle,
        'success',
        'bottom-right',
        30000,
        docPath
      )
    }

    localStorage.setItem('docVersion', docVersion)
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout()
    await dispatch('resetAll')
    toLoginRoute()
  },
  /**
   * @description 重置token、roles、permission、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ commit, dispatch }) {
    let rootDomain = '27yn.cn'
    if (process.env.VUE_APP_ENV == 'production') {
      rootDomain = 'lyfz.net'
    }

    let keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie =
          keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
        if (keys[i] == 'ticket' || keys[i] == 'version') {
          document.cookie =
            keys[i] +
            `=0;path=/;domain=${rootDomain};expires=` +
            new Date(0).toUTCString()
        }
      }
    }

    commit('setUsername', '游客')
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('routes/setRoutes', [], { root: true })
    await dispatch('setToken', '')
    await dispatch('setUid', '')
    await dispatch('setCompanyId', '')
    await dispatch('setUserModel', {})
    await dispatch('setShopId', '')
    await dispatch('setPhone', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setPermission', [], { root: true })
    await dispatch('tabs/delAllVisitedRoutes', null, { root: true })
    await resetRouter()
    removeToken()
  },
  /**
   * @description 设置token
   * @param {*} { commit }
   * @param {*} token
   */
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  /**
   * @description 设置companyId
   * @param {*} { commit }
   * @param {*} companyId
   */
  setCompanyId({ commit, dispatch }, companyId) {
    Cookies.set('ccId', companyId, { path: '/' })
    Cookies.set('ccId', companyId, { path: '/', domain: '27yn.cn' })
    Cookies.set('ccId', companyId, { path: '/', domain: 'lyfz.net' })

    commit('setCompanyId', companyId)
    dispatch('getUserInfo')
  },
  /**
   * @description 设置uid
   * @param {*} { commit }
   * @param {*} uid
   */
  setUid({ commit }, uid) {
    commit('setUid', uid)
  },
  /**
   * @description 设置shopId
   * @param {*} { commit }
   * @param {*} shopId
   */
  setShopId({ commit }, shopId) {
    commit('setShopId', shopId)
  },
  /**
   * @description 设置头像
   * @param {*} { commit }
   * @param {*} avatar
   */
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
  /**
   * @description 设置私信Token
   * @param {*} { commit }
   * @param {*} conversationToken
   */
  setConversationToken({ commit }, conversationToken) {
    commit('setConversationToken', conversationToken)
  },
}
export default { state, getters, mutations, actions }
