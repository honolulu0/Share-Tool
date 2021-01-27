/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:38:49
 * @LastEditTime: 2021-01-15 14:14:33
 * @LastEditors: Guodong Hao
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from '../user/index'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [...routes.routes]
})
