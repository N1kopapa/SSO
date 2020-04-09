import request from '@/utils/request'

export function fetchAccessLogList(query) {
  return request({
    url: '/api/exceptionlog',
    method: 'get',
    params: query
  })
}