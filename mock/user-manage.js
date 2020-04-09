import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "isDisabled": true,
    "userName": "string",
    "userPwd": "string",
    "nickName": "string",
    "headPortrait": "http://b-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg",
    "userType": "00000000-0000-0000-0000-000000000000",
    "actualName": "string",
    "sex": true,
    "idCard": "string",
    "birthDay": "2020-02-26T11:32:21.552Z",
    "qq": "string",
    "weiXin": "string",
    "email": "string",
    "fixPhone": "string",
    "mobilePhone": "string",
    "short": 0,
    "addressId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "registerTime": "2020-02-26T11:32:21.552Z",
    "lastLoginTime": "2020-02-26T11:32:21.552Z",
    "status": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "remark": "string",
    "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdAt": "2020-02-26T11:32:21.552Z",
    "modifiedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "modifiedAt": "2020-02-26T11:32:21.552Z",
    "validate": true
  }))
}

export default [
  {
    url: '/api/user',
    type: 'get',
    response: config => {

      return {
        code: 20000,
        data: {
          total: List.length,
          list: List
        }
      }
    }
  },

  {
    url: '/api/user',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data:{
          result:"goodpost"
        }
      }
    }
  },

  {
    url: '/api/user',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        data:{
          result:"goodput"
        }
      }
    }
  }

]

