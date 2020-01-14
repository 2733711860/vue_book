<template>
	<div style="height: 100%;">
		<div class="flipbook-viewport" style="display:none;" @click="showBott()">
			<div class="container">
				<div class="flipbook" id="article">
				</div>
			</div>
		</div>

		<!--底部菜单-->
		<van-action-sheet v-model="showBottom">
			<van-cell @click="showChap()">目录</van-cell>
		</van-action-sheet>

			<!--左边目录-->
			<van-popup
			  v-model="showChapter"
			  position="left"
			  :style="{ width: '50%', height: '100%' }"
			>
				<van-cell>目录</van-cell>
				<van-cell v-for="item in chapterList" @click="getContent(item)">{{item.chapterTitle}}</van-cell>
			</van-popup>
	</div>
</template>

<script>
import { renderPage } from '../../assets/js/renderPage'
import { FontStyleController } from '../../assets/js/FontStyleController'
import turn from '../../assets/js/turn'
import http from '@/api/http'
import apis from '@/api'
export default {
	data () {
		return{
			showBottom: false,
			showChapter: false,
			actions: [
	      { name: '目录' },
	      { name: '风格', subname: '风格信息' }
	    ],
	    chapterList: []
		}
	},
	mounted() {
		this.init('19333473')
		this.getChapter()
	},
	methods: {
		showChap() {
			this.showBottom = false
			this.showChapter = true
		},
		showBott() {
			this.showBottom = true
		},

		async getChapter() { // 获取目录接口
			let param = {
				bookId: '43843'
			}
			let { data } = await http.postJson({
	      api: apis.getBookChapter,
	      param
	    }) || ''
	    this.chapterList = data.list
		},

		async getContent(item) { // 根据章节目录获取数据
			this.showChapter = false
			this.init(item.chapterId)
		},

		async init(chapterId) { // 获取数据
			$('#article').html('')
			let wordStr = await this.getword(chapterId)
      this.getPage(wordStr)
		},

		async getword(chapterId) { // 获取拼接字符串
			return new Promise(async (resolve, reject) => {
				let param = {
					bookId: this.$route.query.bookId,
					chapterId: chapterId
				}
				let { data } = await http.postJson({
	        api: apis.getBookContent,
	        param
	      }) || ''
	      let list = data.chapterMsg
	      var str = ''
	      await list.forEach(item => {
	      	let everyChapter = item.chapterTitle + '\r\n' + item.content
	      	str = str == '' ? everyChapter : str + '\r\n' + everyChapter
	      })
	      str = str.replace(/\r\n/g, "\xa0\r\n\xa0\xa0\xa0\xa0\xa0\xa0")
	      str = str.replace(/<br>/g, "\r\n")
	      resolve(str)
			})
		},

		async getPage(wordStr) { // 渲染页面
			var $article = $('#article');
			var fontStyleController = new FontStyleController();
			fontStyleController.set('normal');
			var htmlStr = await renderPage({
				article: wordStr,
				pageClass: 'article_page',
				fontStyleStatus: fontStyleController.getStatus()
			});
			$article.css(fontStyleController.getStatus().style);
			$article.html(htmlStr);
			this.loadApp()
		},
		loadApp() { // 加载翻页组件
			$('.shade').hide();
			$(".flipbook-viewport").show();
			var w = $('.container').width();
			var h = $('.container').height();
			$('.flipboox').width(w).height(h);
			$(window).resize(function() {
				w = $('.container').width();
				h = $('.container').height();
				$('.flipboox').width(w).height(h);
			});
			$('.flipbook').turn({
				width: w,
				height: h,
				elevation: 50,
				acceleration: true, // 加速模式ture or false。（必须在移动端）
				display: 'single', // 显示模式(只显示一页single,两个页面double)
				gradients: true, // 显示渐变阴影
				autoCenter: true, // 中心翻取决于有多少页面可见 true or false
				duration: 300, // 设置翻页动画持续时间即翻页的快慢，默认600
				page: 1, // 默认哪一页
				when: { // 监听事件
					turning: function(e, page, view) {
					},
					turned: function(e, page, view) {
						var total = $(".flipbook").turn("pages"); //总页数
						var nowPage = $(".flipbook").turn("page"); // 当前页
						$(".number").html(nowPage + '/' + total);
					},
					last: function(e, page, view) {
						console.log('last')
					}
				}
			})
		}
	}
}
</script>

<style>
	.article_page {
		padding: 30px 0;
		background-color: #ffffee;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
	.article_page:nth-child(even) {
		background-color: #ffeeff;
	}
	.article_page p {
		padding: 0 30px;
		white-space: nowrap;
		overflow: hidden;
	}
	.number {
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
	.container {
		height: 100%;
	}
	.flipbook {
		height: 100% !important;
		width: 100% !important;
	}
	.flipbook-viewport {
		overflow: hidden;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column;
	}
	.flipbook-viewport .page {
		width: 100%;
		height: 100%;
		background-color: white;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.page,
	.allword_w {
		white-space: pre-wrap;
		box-sizing: border-box;
	}
	.flipbook .page {
		-webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		-ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		-o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	}
	.flipbook-viewport .page img {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		margin: 0;
	}
	.flipbook-viewport .shadow {
		-webkit-transition: -webkit-box-shadow 0.5s;
		-moz-transition: -moz-box-shadow 0.5s;
		-o-transition: -webkit-box-shadow 0.5s;
		-ms-transition: -ms-box-shadow 0.5s;
		-webkit-box-shadow: 0 0 20px #ccc;
		-moz-box-shadow: 0 0 20px #ccc;
		-o-box-shadow: 0 0 20px #ccc;
		-ms-box-shadow: 0 0 20px #ccc;
		box-shadow: 0 0 20px #ccc;
	}
	@-webkit-keyframes reverseRotataZ {
		0% {
			-webkit-transform: rotateZ(0deg);
		}
		100% {
			-webkit-transform: rotateZ(-360deg);
		}
	}
	@-webkit-keyframes rotataZ {
		0% {
			-webkit-transform: rotateZ(0deg);
		}
		100% {
			-webkit-transform: rotateZ(360deg);
		}
	}
</style>