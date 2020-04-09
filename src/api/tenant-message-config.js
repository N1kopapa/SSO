import request from '@/utils/request'

export function addMessageConfig(data) {
  return request({
    url: '/api/tenantmessageconfig',
    method: 'post',
    data
  })
}

export function updateMessageConfig(id,data) {
    return request({
      url: '/api/tenantmessageconfig',
      params: { id },
      method: 'put',
      data
    })
  }

  export function getMessageConfig(id) {
    return request({
      url: '/api/tenantmessageconfig/id',
      params: { id },
      method: 'get'
    })
  }