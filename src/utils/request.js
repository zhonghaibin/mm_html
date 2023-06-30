import Vue from 'vue'
import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import {
  baseURL,
  contentType,
  messageName,
  requestTimeout,
  statusName,
  successCode,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import { isArray } from '@/utils/validate'

let loadingInstance

// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]]

const CODE_MESSAGE = {
  0: '未可知错误，可能是因为后端不支持跨域CORS、接口地址不存在等问题引起',
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  6001: '登录失效，请重新登录',
}

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
  const token = store.getters['user/token']
  console.log('token', token)
  // const companyId = store.getters['user/companyId']
  // const shopId = store.getters['user/shopId']

  // 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
  // if (token) config.headers[tokenName] = token

  // config.headers['companyId'] = companyId
  // config.headers['shopId'] = shopId

  // 规范写法 不可随意自定义
  // if (token) config.headers['ticket'] =

  config.headers['token'] = token

  if (
    config.data &&
    config.headers['Content-Type'] ===
      'application/x-www-form-urlencoded;charset=UTF-8'
  )
    config.data = qs.stringify(config.data)
  return config
}

/**
 * axios响应拦截器
 * @param data response数据
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async ({ data, status = 0, statusText }) => {
  if (loadingInstance) loadingInstance.close()
  // 若data.code存在，覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status
  // 若code属于操作正常code，则code修正为200
  if (codeVerificationArray.indexOf(code) + 1) code = 200
  switch (code) {
    case 200:
      // 业务层级错误处理，以下是假定restful有一套统一输出格式(指不管成功与否都有相应的数据格式)情况下进行处理
      // 例如响应内容：
      // 错误内容：{ code: 1, msg: '非法参数' }
      // 正确内容：{ code: 200, data: {  }, msg: '操作正常' }
      // return data
      return data
    case 401:
      break
    case 403:
      break
    case 6001:
      return
  }
  // 异常处理
  // 若data.msg存在，覆盖默认提醒消息
  const errMsg = `${
    data && data[messageName]
      ? data[messageName]
      : CODE_MESSAGE[code]
      ? CODE_MESSAGE[code]
      : statusText
  }`
  Vue.prototype.$baseMessage(errMsg, 'error', 'vab-hey-message-error')
  // 是否添加错误日志(与errorHandler钩子触发逻辑一致)
  return Promise.reject(data)
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
  }),
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error)
})

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response = {} } = error
    return handleData(response)
  }
)

export default instance
