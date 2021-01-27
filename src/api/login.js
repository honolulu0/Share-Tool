import {post, get} from '../axios/http.js'
import GLOBAL from '../common/global.js'

export const getUserInfo = (data) => post(`${GLOBAL.HOME}/p/auth/login`, data)
export const Logout = () => get(`${GLOBAL.HOME}/p/auth/logout`)
// 前台拦截
export const GetUser = () => get(`${GLOBAL.HOME}/p/user`)

// export const getUserInfo = (data) => post(`http://172.1.1.0/getUserInfo`, data) // 测试
