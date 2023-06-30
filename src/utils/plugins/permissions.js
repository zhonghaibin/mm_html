/**
 * @description 路由守卫
 */
import router from '@/router'
import store from '@/store'

const URI = require('urijs')
import cookie from 'js-cookie'

router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters['user/token']

  if (!hasToken) {
    let urlObj = URI(window.location.href).query(true)
    if (
      Object.keys(urlObj).length != 0 &&
      urlObj.ticket != undefined &&
      urlObj.ticket != ''
    ) {
      hasToken = urlObj.ticket
    } else if (
      cookie.get('ticket') != undefined &&
      cookie.get('ticket') != '' &&
      cookie.get('ticket') != 'undefined'
    ) {
      hasToken = cookie.get('ticket')
    }

    if (hasToken != undefined && hasToken != '' && hasToken != 'undefined') {
      store.commit('user/setToken', hasToken)
    }
  }

  next()
})
