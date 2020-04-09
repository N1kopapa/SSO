import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = asyncRoutes || []

      let userName = localStorage.getItem("userName")

      // admin--表示超管,超管看不到具体的情况.超管的控制代码都放在这里。
      // 5-就是认证的索引
      if (userName == "admin"){
        console.log("我是 admin,我是超管")
        accessedRoutes = []
        constantRoutes[5].children[1].hidden = true 
        constantRoutes[5].children[2].hidden = true 
        // constantRoutes[4].children[0].hidden = true 
      }
      else {
        console.log("我是 ---,我是普通用户")
        constantRoutes[5].children[1].hidden = false 
        constantRoutes[5].children[2].hidden = false
        // constantRoutes[4].children[0].hidden = false

      }
      // 暂时打开。。所有人一样的权限-彪哥。
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // 暂时打开。。所有人一样的权限-彪哥。
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
