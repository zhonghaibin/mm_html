/**
 * @description 导出通用配置
 */
module.exports = {
  // 标题
  title: '产后管理系统',
  // 标题分隔符
  titleSeparator: ' - ',
  // 标题是否反转
  // 如果为false: "page - title"
  // 如果为ture : "title - page"
  titleReverse: false,
  // 简写
  abbreviation: '',
  copyright: '',
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token名称
  tokenName: 'ticket',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'app-ticket',
  // companyId在localStorage、sessionStorage、cookie存储的key的名称
  companyIdTableName: 'app-companyId',
  // phone在localStorage、sessionStorage、cookie存储的key的名称
  phoneTableName: 'app-phone',
  // userModel在localStorage、sessionStorage、cookie存储的key的名称
  userModelTableName: 'app-user-model',
  // shopId在localStorage、sessionStorage、cookie存储的key的名称
  shopIdTableName: 'app-shopId',
  // uid在localStorage、sessionStorage、cookie存储的key的名称
  uidTableName: 'app-uid',
  // conversationToken在localStorage、sessionStorage、cookie存储的key的名称
  conversationTokenName: 'app-conversation-token',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
  recordRoute: true,
  // 是否开启logo，不显示时设置false，请填写src/icon路径下的图标名称
  // 如需使用内置RemixIcon图标，请自行去logo组件切换注释代码(内置svg雪碧图较大，对性能有一定影响)
  logo: 'vuejs-fill',
  // 语言类型zh、en
  i18n: 'zh',
  // 消息框消失时间
  messageDuration: 3000,
  // 在哪些环境下显示高亮错误 ['development', 'production']
  errorLog: 'development',
  // 需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  loginDomain: process.env.VUE_APP_LOGIN_URL,

  homeName: 'home',
}
