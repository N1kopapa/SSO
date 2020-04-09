import request from '@/utils/request'

export function getIndexInfo(query) {
  return request({
    url: '/api/index/id', // 假地址 自行替换
    method: 'get',
    params: query
  })
}

export function postIndexInfo(query) {
  return request({
    url: '/api/index',
    method: 'post',
    params: query
  })
}
