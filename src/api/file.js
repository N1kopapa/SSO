import request from '@/utils/request'

export function postFile(data) {
  return request({
    url: '/api/File',
    method: 'post',
    // params: query
    headers: {'Content-Type': ''},
    data:data
  })
}