/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:38:49
 * @LastEditTime: 2021-01-22 10:55:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\store\store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    app
  },
  getters: {
    name: state => state.user.info.name,
    userId: state => state.user.info.id,
    itcode: state => state.user.itcode,
    TypeID: state => state.user.TypeID,
    Language: state => state.user.Language,
    userName: state => state.user.userName,
    Loading: state => state.app.Loading,
    Loading2: state => state.app.Loading2,
    excelType: state => state.app.excelType,
    tableBar: state => state.app.tableBar,
    barTitle: state => state.app.barTitle
  }
})
