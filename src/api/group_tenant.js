import request from '@/utils/request'

export function addTenantToGroup(data) {
    return request({
      url: '/api/group_tenant',
      method: 'post',
      data
    })
  }