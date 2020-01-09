export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '登陆',
    title: '登陆',
    component: resolve => {
      require(['@/pages/index.vue'], resolve)
    },
    meta: {
      title: '登陆'
    }
  }
]
