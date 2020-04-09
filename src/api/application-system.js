import request from '@/utils/request'

export function fetchApplicationSystem(query){
    return request({
        url: '/api/applicationsystem', 
        method: 'get',
        params: query
      })
}

export function updateApplicationSystem(id,data){
    return request({
        url: '/api/applicationsystem', 
        method: 'put',
        params: { id },
        data
      })    
}

export function addApplicationSystem(data){
  return request({
      url: '/api/applicationsystem', 
      method: 'post',
      data
    })    
}
export function fetchApplicationSystemItem(id){
  return request({
      url: '/api/applicationsystem', 
      method: 'get',
      params: { id },
    })    
}