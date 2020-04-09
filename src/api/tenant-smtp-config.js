import request from '@/utils/request'

export function addSMTPConfig(data) {
  return request({
    url: '/api/tenantsmtpconfig',
    method: 'post',
    data
  })
}

export function updateSMTPConfig(id,data) {
    return request({
      url: '/api/tenantsmtpconfig',
      params: { id },
      method: 'put',
      data
    })
  }

  export function getSMTPConfig(id) {
    return request({
      url: '/api/tenantsmtpconfig/id',
      params: { id },
      method: 'get'
    })
  }
