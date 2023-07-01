import request from '@/utils/request'

export function getUserInfo() {
  console.log('请求了用户信息')
  return {
    uid: 1,
    name: '张三',
  }

  // return request({
  //   url: '/',
  //   method: 'get',
  // })
}

export function login(params) {
  console.log(params)
  return {
    token: '123',
  }
  // return request({
  //   url: '/',
  //   method: 'post',
  //   data: params,
  // })
}

export const logout = (token) => {
  console.log(token)
  return request({
    url: '/',
    method: 'get',
    token: token,
  })
}
