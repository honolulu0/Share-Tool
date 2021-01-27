/*
 * @Author: Guodong Hao
 * @Date: 2020-10-23 18:03:12
 * @LastEditTime: 2021-01-22 11:09:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import ElementUI from 'element-ui';
import i18n from './language' // 页面的多语言切换
import 'lib-flexible' // 适配
// 引入字体图标库
import 'element-ui/lib/theme-chalk/icon.css';
import './assets/iconfont/iconfont.css'
import bus from 'vue-bus'
import GLOBAL from './common/global.js'
import axios from 'axios'
Vue.use(ElementUI, {i18n: (key, value) => i18n.t(key, value)})
Vue.use(bus)
// 挂载到Vue实例上面
Vue.prototype.GLOBAL = GLOBAL
Vue.prototype.$axios = axios

// 页面刷新时，重新赋值
if (window.localStorage.getItem('userType')) {
  let data = JSON.parse(window.localStorage.getItem('userType'));
  let ID = JSON.parse(window.localStorage.getItem('id'));
  let TypeID = JSON.parse(window.localStorage.getItem('TypeID'));
  let Language = JSON.parse(window.localStorage.getItem('Language'));
  let usn = JSON.parse(window.localStorage.getItem('usn'));
  i18n.locale = JSON.parse(window.localStorage.getItem('Language'))
  let Loading = window.sessionStorage.getItem('Loading')

  store.commit('SET_INFO', {type: data.result})
  store.commit('SET_itcode', {type: ID})
  store.commit('SET_TYPEID', {type: TypeID})
  store.commit('SET_LANGUAGE', Language)
  store.commit('SET_USERNAME', usn.split(',').map((item) => { return String.fromCharCode(parseInt(item, 16)) }).join(''))
  store.commit('SET_LOADING', Loading)
  store.commit('SET_LOADING2', true)
  setTimeout(() => {
    store.commit('SET_LOADING2', false)
  }, 1000)
}
// 路由拦截导航
router.beforeEach(({meta, path}, from, next) => {
  var {auth = true} = meta
  // true用户已登录， false用户未登录
  var isLogin = Boolean(store.state.user.info)
  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'})
  }
  next()
})
// 当user离开该网站是就开启定时器，准备让他推出登录
// let UserLogout = null
// document.addEventListener('visibilitychange', () => {
//   if (document.visibilityState === 'visible') {
//     clearTimeout(UserLogout)
//   } else {
//     UserLogout = setTimeout(() => {
//       vm.$store.dispatch('Logout');
//       Logout().then((res) => { vm.$router.push('/login'); })
//     }, 10000)
//   }
// })
Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: {App},
  template: '<App/>'
})

Vue.use({
  vm
})
