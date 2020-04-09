import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        groupId: '@increment',
        groupName: "彪哥",
        createAt: "2020-02-28T06:15:46.425Z",
        createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        updateAt: "2020-02-28T06:15:46.425Z",
        updateBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }))
  }
  

export default [
    {
      url: '/api/group',
      type: 'get',
      response: config => {
        return {
          code: 20000,
          data: {
            total: List.length,
            items: List
            }
        }
      }
    },
  
    {
      url: '/api/tenantadconfig',
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
      url: '/api/tenantadconfig/12345',
      type: 'get',
      response: config => {
  
        return {
          code: 20000,
          data:{
            result:"good"
          }
        }
      }
    },
  ]
  
  
  