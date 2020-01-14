import Vue from 'vue'
import Router from 'vue-router'
import book from './book'
import { setTitle } from '@/libs/util'
Vue.use(Router)
const router = new Router({
  routes: [
    ...book
  ]
})
router.afterEach(to => {
  setTitle(to, router.app)
  window.scrollTo(0, 0)
})
export default router
