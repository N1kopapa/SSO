import request from '@/utils/request'

export function authorize(data){
    return request({
        url: '/api/applicationsystem_tenant', // 假地址 自行替换
        method: 'post',
        data
      })
}