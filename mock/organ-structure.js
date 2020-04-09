import Mock from 'mockjs'

export default [
  {
    // 名字太长了。mock 无法模拟，所以缩短。
    url: '/api/organizationalstructure',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 13,
          list: [
            { id:1, pid:0, name:"随意勾选 1", open:true},
            { id:11, pid:1, name:"随意勾选 1-1", open:true},
            { id:111, pid:11, name:"随意勾选 1-1-1"},
            { id:112, pid:11, name:"随意勾选 1-1-2"},
            { id:12, pid:1, name:"随意勾选 1-2", open:true},
            { id:121, pid:12, name:"随意勾选 1-2-1"},
            { id:122, pid:12, name:"随意勾选 1-2-2"},
            { id:2, pid:0, name:"随意勾选 2", checked:true, open:true},
            { id:21, pid:2, name:"随意勾选 2-1"},
            { id:22, pid:2, name:"随意勾选 2-2", open:true},
            { id:221, pid:22, name:"随意勾选 2-2-1", checked:true},
            { id:222, pid:22, name:"随意勾选 2-2-2"},
            { id:23, pid:2, name:"随意勾选 2-3"}
          ]
        }
      }
    }
  },

  // put organizational structure
  {
    url: '/api​/organiza',
    type: 'put',
    response: config => {
      
      return {
        code: 20000,
        data: "Good"
      }
    }
  }
]
