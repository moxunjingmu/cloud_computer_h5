import base_request from "../utils/http.js"
import store from '../store'

const request = (option) => {
  option.url = `${store.getters['platform/serverInfo']}/api/tunny${option.url}`
  return base_request(option)
}


export function getSettings(base_ip_addr) {

  if(base_ip_addr){
    return base_request({
      url: `${base_ip_addr}/api/tunny/settings/`,
      method: 'get'
    })
  }

  return request({
    url: '/settings/',
    method: 'get'
  })
}


// 获取token登陆
export function apiLogin(data) {
  return request({
    url: '/token/get',
    method: 'post',
    data,
  })
}


// 周期性间隔刷新token
export function apiRefreshToken(token) {
  return request({
    url: '/token/refresh',
    method: 'post',
    data: {
      'token': token
    }
  })
}

// 查看本token用户详情
export function apiGetSelfUser() {
  return request({
    url: '/users/self',
    method: 'get'
  })
}

// 登出
export function apiLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}

// 调用发送短信验证码的接口
export function apiSendSmsCode(data) {
  return request({
    url: '/sms_codes/send',
    method: 'post',
    data,
  })
}
