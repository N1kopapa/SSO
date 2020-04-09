import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/api/user',
    method: 'get',
    params: query
  })
}

// 管理员账号，和用户账号都是用这个
export function addUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    params: '',
    data
  })
}

// 管理员账号，和用户账号都是用这个
export function updateUser(id,data) {
  return request({
    url: '/api/user',
    params: { id },
    method: 'put',
    data
})
}

export function getUserInfo(id){
  return request({
    url:'/api/user/id',
    method:'get',
    params: {id}
  })
}