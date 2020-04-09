import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'


for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        isDisabled: true,
        tenantName: "string",
        loginAccount: "string",
        tenantType: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        startDate: "2020-02-28T07:07:51.538Z",
        endDate: "2020-02-28T07:07:51.538Z",
        area: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        legalPerson: "string",
        contactPerson: "string",
        contactPhone: "string",
        addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: "string",
        usageStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currentStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        logo: "string",
        remark: "string",
        createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2020-02-28T07:07:51.538Z",
        modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        modifiedAt: "2020-02-28T07:07:51.538Z"
      }))
  }
  
  export default [  
    {
      url: '/api/tenant/12345',
      type: 'get',
      response: config =>{
        return {
          code: 20000,
          data: {
            tenantId: "12345",
            isDisabled: true,
            tenantName: "string",
            loginAccount: "string",
            tenantType: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            startDate: "2020-02-29T01:28:06.813Z",
            endDate: "2020-02-29T01:28:06.813Z",
            area: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            legalPerson: "string",
            contactPerson: "string",
            contactPhone: "string",
            addressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            email: "string",
            usageStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            currentStatus: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            logo: "string",
            remark: "string",
            createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            createdAt: "2020-02-29T01:28:06.813Z",
            modifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            modifiedAt: "2020-02-29T01:28:06.813Z"                    
          }
        }
      }
    },

    {
      url: '/api/tenant',
      type: 'get',
      response: config =>{
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
      url: '/api/tenant',
      type: 'put',
      response: config => {
        return {
          code: 20000,
          data: {
            result:"put very good"
          }
        }
      }
    },

    {
      url: '/api/tenant',
      type: 'post',
      response: config => {
        return {
          code: 20000,
          data: {
            result:"post very good"
          }
        }
      }
    },
  ]
