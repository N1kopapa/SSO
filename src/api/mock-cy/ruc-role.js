import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/api/user',
    method: 'get',
    params: query
  })
}

export function fetchOrgsList(query) {
  return request({
    url: '/api/organizationalstructure',
    method: 'get',
    params: query
  })
}

export function fetchUserRoleList(query) {
  return request({
    url: '/api/User_Role/id',
    method: 'get',
    params: query
  })
}

export function addUserRoleList(data) {
  return request({
    url: '/api/User_Role',
    method: 'post',
    params: '',
    data
  })
}

export function delUserRoleList(userid) {
  return request({
    url: '/api/User_Role',
    method: 'delete',
    params: { userid }
  })
}

export function fetchUserOrgList(query) {
  return request({
    url: '/api/DeptUser/id',
    method: 'get',
    params: query
  })
}

export function addUserOrgList(data) {
  return request({
    url: '/api/User_Org/id',
    method: 'post',
    params: '',
    data
  })
}

