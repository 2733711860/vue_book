import Vue from 'vue'
import App from './App'
import router from './router'
import config from '@/config'
import store from './store' // 引入状态管理文件
import 'lib-flexible/flexible' // 移动端适配插件

// 引入缓存操作文件
import storage from '@/assets/js/storage.js'
window.cache = storage

// 引人公共样式文件
import '@/assets/css/reset.css'

// 引入vant-ui
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
