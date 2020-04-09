import request from '@/utils/request'

export function fetchGroup(query){
    return request({
        url: '/api/group', // 假地址 自行替换
        method: 'get',
        params: query
      })    
}

export function updateGroup(id,data){
  return request({
      url: '/api/group', // 假地址 自行替换
      method: 'put',
      params: {id},
      data
    })    
}

export function addGroup(data) {
  return request({
    url: '/api/group',
    method: 'post',
    data
  })
}

export function delGroup(data) {
  return request({
    url: '/api/group',
    method: 'delete',
    data
  })
}