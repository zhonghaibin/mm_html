import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/',
    method: 'get',
  })
}

export function checkQqLogin(params) {
  return request({
    url: '/',
    method: 'get',
    params,
  })
}

export const logout = (token) => {
  console.log(token)
  return request({
    url: '/',
    method: 'get',
    token: token,
  })
}
