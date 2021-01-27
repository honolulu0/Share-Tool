import store from '../store/store'
import user from './UserSidebar/user'
import admin from './UserSidebar/admin'
import SubAdmin from './UserSidebar/SubAdmin'
import scer from './UserSidebar/scer'
// import UserMar from './UserSidebar/UserMar'
export default {
  items: store.state.user.TypeID.type === 1 ? admin : store.state.user.TypeID.type === 2 ? user : store.state.user.TypeID
    .type === 3 ? SubAdmin : store.state.user.TypeID.type === 4 ? scer : user
}
