import request from '@/utils/request'

export function addUserOrg(data) {
   return request({
     url: '/api/User_Org',
     method: 'post',
     data
   })
 }

 export function getUserOrg(query) {
  return request({
    url: '/api/User_Org/id',
    method: 'get',
    params: query
  })
}