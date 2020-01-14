export default [
  {
    path: '/',
    redirect: '/book_list'
  },
  {
    path: '/book_list',
    name: '书籍列表',
    title: '书籍列表',
    component: resolve => {
      require(['@/pages/book/book_list.vue'], resolve)
    },
    meta: {
      title: '书籍列表'
    }
  },
  {
    path: '/book_content',
    name: '正文',
    title: '正文',
    component: resolve => {
      require(['@/pages/book/book_content.vue'], resolve)
    },
    meta: {
      title: '正文'
    }
  },
  {
    path: '/chapter',
    name: '目录',
    title: '目录',
    component: resolve => {
      require(['@/pages/book/chapter.vue'], resolve)
    },
    meta: {
      title: '目录'
    }
  }
]
