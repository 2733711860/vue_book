/**
 * Created by chenyb on 19/10/18.
 * http配置
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import config from './config'
import '@babel/polyfill'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.Authorization = `${store.state.user.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('handleLogOut').then(() => {
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.fullPath }
            })
          })
      }
    }
    return Promise.reject(error.response)
  })

export default class http {
  async get (params) {
    try {
      let res = await axios.get(params.api, { params: params.param || {} }, config)
      return new Promise((resolve, reject) => {
        if (res.code === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  async post (params) {
    try {
      let res = await axios.post(params.api, params.param, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } }, config)
      return new Promise((resolve, reject) => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
    	console.log(err)
    }
  }
  async postJson (params) {
    try {
      let res = await axios.post(params.api, params.param, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }, config)
      return new Promise((resolve, reject) => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  async postFormData (params) {
    try {
      let res = await axios.post(params.api, params.param, { headers: { 'Content-Type': 'multipart/form-data' } }, config)
      return new Promise((resolve, reject) => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
};
