import request from '@/utils/request'

export function fetchRoleList(query) {
  return request({
    url: '/api/role',
    method: 'get',
    params: query
  })
}


export function editRucRole(id,data) {
  return request({
    url: '/api/role',
    method: 'put',
    params: { id },
    data
  })
}

export function addRucRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data
  })
}

export function delRucRole(data) {
  return request({
    url: '/api/role',
    method: 'delete',
    data
  })
}

