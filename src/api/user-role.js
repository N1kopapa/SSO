import request from '@/utils/request'

export function addUserRole(data) {
  return request({
    url: '/api/User_Role',
    method: 'post',
    data  
 })
}
export function getUserRole(query) {
    return request({
        url: '/api/User_Role/id',
        method: 'get',
        params: query  
     })
    
}
