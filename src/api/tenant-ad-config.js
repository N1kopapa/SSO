import request from '@/utils/request'

export function addAdConfig(data) {
  return request({
    url: '/api/tenantadconfig',
    method: 'post',
    data
  })
}

export function updateAdConfig(id,data) {
    return request({
      url: '/api/tenantadconfig',
      params: { id },
      method: 'put',
      data
    })
  }

  export function getAdConfig(id) {
    return request({
      url: '/api/tenantadconfig/id',
      params: { id },
      method: 'get'
    })
  }
