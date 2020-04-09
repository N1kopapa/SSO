
 import request from '@/utils/request'

 export function fetchTenantList(query) {
    return request({
      url: '/api/tenant',
      method: 'get',
      params: query
    })
  }


  export function getTenant(id) {
    return request({
      url: '/api/tenant/id',
      params: { id },
      method: 'get'
    })
  }

  export function updateTenant(id,data) {
    return request({
      url: '/api/tenant',
      params: { id },
      method: 'put',
      data
    })
  }

  export function addTenant(data) {
    return request({
      url: '/api/tenant',
      method: 'post',
      data
    })
  }

  export function delTenant(data) {
    return request({
      url: '/api/tenant',
      method: 'delete',
      data
    })
  }