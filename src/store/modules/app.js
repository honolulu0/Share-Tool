/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:38:49
 * @LastEditTime: 2021-01-22 11:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\store\modules\app.js
 */
const app = {
  state: {
    keepAlive: [],
    Loading: false,
    Loading2: false,
    excelType: false,
    crumbLists: null,
    tableBar: [],
    barTitle: ''
  },
  mutations: {
    SET_KEEP_ALIVE: (state, data) => {
      state.keepAlive = data
    },
    SET_LOADING: (state, Loading) => {
      state.Loading = Loading
    },
    SET_LOADING2: (state, Loading2) => {
      state.Loading2 = Loading2
    },
    SET_EXCELTYPE: (state, excelType) => {
      state.excelType = excelType
    },
    SET_TABLE_BAR: (state, data) => {
      state.tableBar = data
    },
    SET_BAR_TITLE: (state, data) => {
      state.barTitle = data
    }
  },
  actions: {
    changeKeepAlive: ({
      commit,
      state
    }, name) => {
      // 由于vue的文件名首字母大写，导致默认生成的vue文件的name为大写，但是router中的name为小写
      // keepAlive中的name要与vue文件中name一致，所以此处做下转换
      name = name.replace(name[0], name[0].toUpperCase());
      let keepAlive = [...state.keepAlive]
      // console.log('name', name, JSON.stringify(state.keepAlive))
      if (name && !keepAlive.includes(name)) {
        keepAlive.push(name)
      }
      // console.log('keepAlive', JSON.stringify(keepAlive))
      commit('SET_KEEP_ALIVE', keepAlive)
    },
    clearKeepAlive: ({
      commit,
      state
    }) => {
      commit('SET_KEEP_ALIVE', [])
    }
  }
}
export default app
