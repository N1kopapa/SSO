import request from '@/utils/request'

export function getBasicUserInfo(){
    return request({
        url: '/api/BasicUserInfo/11387560-E90D-484B-9747-E40619424F27', // 假地址 自行替换
        method: 'get'
      })    
}