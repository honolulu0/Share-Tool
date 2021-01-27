/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:49:15
 * @LastEditTime: 2021-01-22 11:30:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\store\modules\user.js
 */
import {getUserInfo} from '@/api/login'
// import store from '../store'
// import {setTheme, defaultTheme} from '@/assets/theme/setTheme.js'
// import {post} from '../../axios/http.js'
// import GLOBAL from '../../common/global'
const user = {
  state: {
    info: '',
    itcode: '',
    TypeID: '',
    Language: '',
    userName: ''
    // checked4: ''
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_itcode: (state, itcode) => {
      state.itcode = itcode
    },
    SET_TYPEID: (state, TypeID) => {
      state.TypeID = TypeID
    },
    SET_LANGUAGE: (state, Language) => {
      state.Language = Language
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
          getUserInfo({
            ...loginForm
          }).then(res => {
            if (res.result === 1) {
              // 将用户信息存入store
              commit('SET_INFO', {type: res.result})
              commit('SET_itcode', {type: loginForm.username})
              // 将用户信息存到本地缓存
              localStorage.setItem('userType', JSON.stringify(res));
              localStorage.setItem('id', JSON.stringify(loginForm.username));
              localStorage.setItem('Language', localStorage.Language !== undefined ? JSON.stringify(JSON.parse(localStorage.Language)) : JSON.stringify('en'));
              resolve()
            } else {
              reject(res.result)
            }
          }).catch(error => {
            reject(error)
          })
      });
    },
    // 登出
    Logout({commit, state}) {
      commit('SET_INFO', '')
      localStorage.removeItem('userType')
      localStorage.removeItem('id')
      localStorage.removeItem('TypeID')
      localStorage.removeItem('usn')
      sessionStorage.removeItem('curencryption')
    }
    // 改变用户主题
    // ChangeTheme({commit, state}, theme) {
    //   commit('SET_THEME', theme)
    //   setTheme(theme);
    //   // 将用户改变的主题数据，存到缓存的userData里
    //   // let userData = JSON.parse(sessionStorage.getItem('userData'));
    //   // sessionStorage.setItem('userData', JSON.stringify({...userData, theme: theme}));
    //   // 存到数据库（不方便mock所以省略）
    // }
  }
}

export default user
