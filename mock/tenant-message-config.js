import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "roleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "applicationSystemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "roleName": "string",
    "remark": "string",
    "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdAt": "2020-02-27T03:26:09.067Z",
    "modifiedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "modifiedAt": "2020-02-27T03:26:09.067Z",
    "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "isGlobal": 1
  }))
}

export default [
  {
    url: '/api/tenantmessageconfig',
    type: 'post',
    response: config => {

      return {
        code: 20000,
        data: {
          result: {}
        }
      }
    }
  },

  {
    url: '/api/tenantmessageconfig',
    type: 'put',
    response: config => {

      return {
        code: 20000,
        data:{
          result:"good"
        }
      }
    }
  },

  {
    url: '/api/tenantmessageconfig/12345',
    type: 'get',
    response: config => {

      return {
        code: 20000,
        data:{
          messageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          messageUserName: "string",
          messageKey: "string",
          messageUrl: "string"        
        }
      }
    }
  },
]