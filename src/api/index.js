/**
 * Created by chenyb on 22/10/18.
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import config from '@/config'
let baseUrl
switch (process.env.NODE_ENV) {
  // 生产环境
  case 'production':
    baseUrl = config.baseUrl.pro
    break
  // 测试环境
  case 'testing':
    baseUrl = config.baseUrl.tes
    break
  default:
    // 开发环境
    baseUrl = config.baseUrl.dev
    break
}
export { baseUrl }
export default {
  // **系统管理**开始
  searchBook: baseUrl + '/searchBook',
  getBookContent: baseUrl + '/getBookContent',
  searchPageBook: baseUrl + '/searchPageBook',
  getBookChapter: baseUrl + '/getBookChapter',
}
