import http from '@/api/http'
import apis from '@/api'
import { setCookies } from '@/libs/util'
export default {
  state: {
  },
  mutations: {
    setTitle (state, data) {
      state.title = data
      setCookies('title', data)
    },
    setLogo (state, images) {
      state.logo = images
      setCookies('logo', images)
    }
  },
  actions: {
    // 获到系统设置信息
    getSystemInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          http.get({
            api: apis.getSystemInfo
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
