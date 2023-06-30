/**
 * @description 导出网络配置
 **/
module.exports = {
  // 默认的接口地址，开发环境和生产环境都会走/vab-mock-server
  // 正式项目可以选择自己配置成需要的接口地址，如"https://api.xxx.com"
  // 问号后边代表开发环境，冒号后边代表生产环境
  baseURL: process.env.VUE_APP_BASE_URL,
  messageSocketUrl: process.env.VUE_APP_MESSAGE_SOCKET_URL,
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 最长请求时间
  requestTimeout: 20000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [
    1000,
    200,
    0,
    '200',
    '0',
    3001,
    3002,
    3003,
    3004,
    3005,
    3006,
    3007,
    3008,
    3009,
    3010,
    3011,
    3012,
    3013,
    3014,
    3015,
    3016,
    3017,
    3018,
    3019,
    3020,
    6003,
  ],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'msg',
}
