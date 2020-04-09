import request from '@/utils/request'

export function fetchDeptUserByDeptId(deptId){
    return request({
        url: '/api/DeptUser/id', // 假地址 自行替换
        method: 'get',
        params: { deptId }
      })    
}
export function fetchDeptUserByName(query){
  return request({
      url: '/api/user', // 假地址 自行替换
      method: 'get',
      params: query
    })    
}