import Mock from 'mockjs'

const List = []
const items = []
const count = 80
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        exceptionLogId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        accessBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        happenAt: "2020-02-27 T 02:55:51.388 Z",
        name: "异常名称",
        description: "异常描述",
        requestUri: "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3"

    }))
}

export default [
    {
        url: '/vue-element-admin/mock-log/exceptionlog',
        type: 'get',
        response: config => {
            const { importance, type, title, page = 1, limit = 20, sort } = config.query
            // // 校验
            let mockList = List.filter(item => {
                if (importance && item.importance !== +importance) return false
                if (type && item.type !== type) return false
                if (title && item.title.indexOf(title) < 0) return false
                return true
            })
            //倒序
            if (sort === '-id') {
                mockList = mockList.reverse()
            }
            //分页
            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
            // 返回list
            console.log(pageList)
            return {
                code: 20000,
                data: {
                    items: pageList,
                    total: mockList.length,
                }
            }
        }
    }
]