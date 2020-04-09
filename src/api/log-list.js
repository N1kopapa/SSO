import request from '@/utils/request'

export function fetchExceptionList(query) {
  return request({
    url: '/api/exceptionlog',
    method: 'get',
    params: query
  })
}

export function fetchAccessList(query) {
  return request({
    url: '/api/AccessLogs',
    method: 'get',
    params: query
  })
}