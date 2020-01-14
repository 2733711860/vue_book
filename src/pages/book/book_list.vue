<template>
	<div style="height: 100%;display: flex;flex-flow: column;justify-content: space-between;">
		<div>
			<van-nav-bar title="标题" left-text="返回" left-arrow>
			  <van-icon name="search" slot="right" />
			</van-nav-bar>
		</div>
		<div style="flex: 1;overflow-y: auto;">
			<van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" style="height: 100%;overflow-y: auto;">
				<van-list
					style="height: 100%;"
				  v-model="isUpLoading"
				  :finished="allFinished"
				  :immediate-check="false"
				  finished-text="我是有底线的"
				  @load="onLoadList"
				  :offset="10"
				>
				  <van-cell
				    v-for="item in bookList"
				    :key="item.bookId"
				    :title="item.bookName"
				    @click="goBook(item)"
				  />
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
export default {
  data() {
    return {
      bookList: [],
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      allFinished: false, // 数据全部加载完毕
      pageSize: 15,
      pageIndex: 1
    };
  },

  async mounted() {
  	this.init()
  },

  methods: {
  	async init() {
			let param = {
				page: this.pageIndex,
				num: this.pageSize,
				factor: {
//					type: '玄幻'
				}
			}
			let { data } = await http.postJson({
        api: apis.searchPageBook,
        param
      }) || ''
      let rows = data.bookList
      if (rows == null || rows.length === 0) {
        this.allFinished = true // 数据全部加载结束
        return
      }
      if (rows.length < this.pageSize) { // 最后一页不足10条的情况
        this.allFinished = true
      }
      if (this.pageIndex === 1) {
        this.bookList = rows
      } else {
        this.bookList = this.bookList.concat(rows)
      }
      this.isUpLoading = false
      this.isDownLoading = false
  	},

    onLoadList() { // 上拉加载，滚动条与底部距离小于 offset 时触发
    	this.pageIndex++
    	this.init()
    },

    onDownRefresh() { // 下拉刷新
  		this.allFinished = this.bookList.length < this.pageSize ? true : false
      this.pageIndex = 1
      this.init() // 加载数据
    },

    goBook(itemBook) {
    	this.$router.push({
    		path: '/book_content',
    		query: {
    			bookId: itemBook.bookId
    		}
    	})
    }
  }
}
</script>

<style>
</style>