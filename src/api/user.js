import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/AccessToken/11387560-E90D-484B-9747-E40619424F27',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/AccessToken/11387560-E90D-484B-9747-E40619424F27',
    method: 'delete'
  })
}
