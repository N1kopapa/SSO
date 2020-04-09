import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getBasicUserInfo } from '@/api/basic-user-info'
import { getUserInfo } from '@/api/user-manage'
import { getTenant } from '@/api/tenant'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  tenanted:'',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TENANTID: (state,tenanted) => {
    state.tenanted = tenanted
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password,authType } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password,authType:parseInt(authType) }).then(response => {
        const { data } = response

        if (response.status == 0) {

          if (username == "aib"){
            localStorage.setItem("userName","admin");  
          }
          else{
            localStorage.setItem("userName",username);
          }
          // 登录成功才往下走，否则不要往下走。。
          getBasicUserInfo().then(response => {
            localStorage.setItem("tenantId", response.data.tenantId);
            localStorage.setItem("userId",response.data.userId);
            getUserInfo(response.data.userId).then(response =>{
              if (response.data.userType=="00000000-0000-0000-0000-000000000000"){
                localStorage.setItem("role","tenant-admin")
              }
              else{
                localStorage.setItem("role","tenant-user")
              }
              if (response.data.tenantId && response.data.tenantId != "")
                getTenant(response.data.tenantId).then(response=>{
                  localStorage.setItem("tenantName",response.data.tenantName);
                })
            })
          })   
        }
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      }).finally(function(){
      });    
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      // getInfo(state.token).then(response => {
      getBasicUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { userId, userName, displayName, tenantId } = data

        // roles must be a non-empty array
        if (!tenantId || tenantId.length <= 0) {
          reject('getInfo: tenantId must be a non-null String!')
        }
        commit('SET_ROLES',["admin"])
        commit('SET_TENANTID', tenantId)
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { userName } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', userName, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
