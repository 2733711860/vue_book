import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { setTitle } from '@/libs/util'
// import config from '@/config'
// const { homeName } = config
Vue.use(Router)
const router = new Router({
  routes
})
router.afterEach(to => {
  setTitle(to, router.app)
  window.scrollTo(0, 0)
})
export default router
