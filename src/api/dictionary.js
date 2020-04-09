import request from '@/utils/request'

export function fetchDicItemList(query) {
  return request({
    url: '/api/dictionaryitem',
    method: 'get',
    params: query
  })
}
export function dicItemDel(data) {
  return request({
    url: '/api/dictionaryitem',
    method: 'delete',
    // params: query
    data
  })
}

export function postNewDic(data) {
  return request({
    url: '/api/dictionary',
    method: 'post',
    params: '',
    data
  })
}

export function editDic(query, data) {
  return request({
    url: '/api/dictionary',
    method: 'put',
    params: query,
    data
  })
}

export function fetchDicList(query) {
  return request({
    url: '/api/dictionary',
    method: 'get',
    params: query
  })
}
