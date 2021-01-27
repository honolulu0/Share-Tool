// import store from '../store/store'
import user from './UserRouter/user'
import admin from './UserRouter/admin'
import SubAdmin from './UserRouter/SubAdmin'
import scer from './UserRouter/scer'
export default {
    routes: localStorage.TypeID !== '' && parseInt(localStorage.TypeID) === 1 ? admin : parseInt(localStorage.TypeID) === 2 ? user : parseInt(localStorage.TypeID) === 3 ? SubAdmin : parseInt(localStorage.TypeID) === 4 ? scer : user
}
