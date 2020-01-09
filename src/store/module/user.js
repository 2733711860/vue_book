import http from '@/api/http'
import apis from '@/api'
import { setCookies, getCookies } from '@/libs/util'
export default {
  state: {
    userName: getCookies('username'),
    token: getCookies('token'),
    access: '',
    messageUnreadList: []
  },
  mutations: {
    setUserName (state, username) {
      state.userName = username
      setCookies('username', username)
    },
    setToken (state, token) {
      state.token = token
      // setToken(token)
      setCookies('token', token)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        try {
          http.post({
            api: apis.login,
            param: {
              userCode: data.userCode,
              password: data.password
            }
          }).then(res => {
            if (res.code === 200) {
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        http.get({
          api: apis.logout,
          param: {
            userCode: state.userCode
          }
        }).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          http.post({
            api: apis.getUserInfo + '?token=' + getCookies('token')
          }).then(res => {
            if (res.code === 200) {
            } else if (res.code === 12000 || res.code === 500) {
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取菜单列表
    getMenusList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          http.get({
            api: apis.getAuthorMenu,
            param: {
              userCode: state.userCode
            }
          }).then(res => {
            if (res.code === 200) {

            }
            resolve(res.code)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
