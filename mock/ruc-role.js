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
    url: '/api/role',
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
    url: '/api/role',
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
    url: '/api/role',
    type: 'post',
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
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

