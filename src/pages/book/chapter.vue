<template>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
export default {
	async mounted () {
		let param = {
			bookId: '43843'
		}
		let { data } = await http.postJson({
      api: apis.getBookChapter,
      param
    }) || ''
	}
}
</script>

<style>
</style>