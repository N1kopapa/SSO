import request from '@/utils/request'

export function fetchOrganizationalStructure(query){
    return request({
      // 很有可能是因为这个接口太长了，mock没有模拟到。不管了。
        url: '/api/organizationalstructure',
        method: 'get',
        params: query
      })
}

export function updateOrganizationalStructure(id, data) {
  return request({
    url: '/api/organizationalstructure',
    method: 'put',
    params: { id },
    data
  })
}

