<template>
  <div class="header" >
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">{{$t('Lang.module.Header.ShareTool')}}</div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="language">
          <el-select v-model="lang"
          popper-class='selectStyle'
          :placeholder="type==='en'?'English':type==='zh'?'中文简体':type==='ts'?'中文繁體':'Language'"
          @change="changelang">
              <el-option
                v-for="(item, index) in languageList"
                :key="index"
                :label="item.label"
                :value="JSON.stringify(item)">
              </el-option>
          </el-select>
        </div>
        <div>
          <button class="ShareBtn" @click="goShare"></button>
        </div>
        <!-- 消息 -->
        <el-popover
          placement="bottom"
          width="545"
          trigger="click">
          <div class="mesg_noData" v-show="Object.keys(mesage).length === 0">
            {{$t('Lang.public.No_data')}}
          </div>
          <div class="mesg_cont" v-show="Object.keys(mesage).length !== 0">
            <router-link
            v-for="(item, index) in mesage.data" :key='index'
            @click.native="MesgRead(item.remindmessageid)"
            :to="
              item.typename === 'request' && TypeID.type !== 4 ? '/MyRequests' :
              item.typename === 'borrowed' ? '/MyBorrowed' :
              item.typename === 'checkout' ? '/MyCheckout' :
              item.typename === 'reservation' ? '/MyReservation' :
              item.typename === 'logfile' ? 'Mylogfile' :
              item.typename === 'request' && TypeID.type === 4 ? '/MyTasks':
              item.typename === 'reservation' ? '/MyReservation' : ''
              "
              >
              <el-badge is-dot class="item" :hidden='!item.validbook'>
                <el-card shadow="hover" class="back" :style="{
                  background: item.status === 'complete' ? '#f0f9eb':
                      item.status === 'success' ?  '#f0f9eb':
                      item.status === 'mposuccess' ? '#f0f9eb':
                      item.status === 'Approve' ? '#f0f9eb':
                      item.status === 'resuccess' ? '#f0f9eb':
                      item.status === 'Reject' ? '#fef0f0':
                      item.status === 'error' ? '#fef0f0':
                      item.status === 'remove' ? '#fef0f0':
                      item.status === 'mpouser' ? '#fef0f0':
                      item.status === 'mpousercancel' ? '#fef0f0':
                      item.status === 'mporeser' ? '#fef0f0':
                      item.status === 'mporesercancel' ? '#fef0f0':
                      item.status === 'mponolock' ? '#fef0f0':
                      item.status === 'Returning' ? '#edf2fc':
                      item.status === 'Review' ? '#fdf6ec':
                      item.status === 'change' ? '#fdf6ec':
                      item.status === 'mpo' ? '#fdf6ec' :
                      item.status === 'mpowarning' ? '#fdf6ec':
                      item.status === 'warning' ? '#fdf6ec' : '',
                  borderColor: item.status === 'complete' ? '#67c23a':
                      item.status === 'success' ?  '#67c23a':
                      item.status === 'mposuccess' ? '#67c23a':
                      item.status === 'Approve' ? '#67c23a':
                      item.status === 'resuccess' ? '#67c23a':
                      item.status === 'Reject' ? '#F56C6C':
                      item.status === 'mpouser' ? '#F56C6C':
                      item.status === 'mpousercancel' ? '#F56C6C':
                      item.status === 'mporeser' ? '#F56C6C':
                      item.status === 'mporesercancel' ? '#F56C6C':
                      item.status === 'mponolock' ? '#F56C6C':
                      item.status === 'error' ? '#F56C6C':
                      item.status === 'remove' ? '#F56C6C':
                      item.status === 'Returning' ? '#909399':
                      item.status === 'Review' ? '#E6A23C':
                      item.status === 'change' ? '#E6A23C':
                      item.status === 'mpo' ? '#E6A23C' :
                      item.status === 'mpowarning' ? '#E6A23C':
                      item.status === 'warning' ? '#E6A23C' : ''
                  }">
                  <p class="mesg_icon" :style="{
                      background: item.status === 'complete' ? '#67c23a':
                      item.status === 'success' ?  '#67c23a':
                      item.status === 'mposuccess' ? '#67c23a':
                      item.status === 'Approve' ? '#67c23a':
                      item.status === 'resuccess' ? '#67c23a':
                      item.status === 'Reject' ? '#F56C6C':
                      item.status === 'mpouser' ? '#F56C6C':
                      item.status === 'mpousercancel' ? '#F56C6C':
                      item.status === 'mporeser' ? '#F56C6C':
                      item.status === 'mporesercancel' ? '#F56C6C':
                      item.status === 'mponolock' ? '#F56C6C':
                      item.status === 'error' ? '#F56C6C':
                      item.status === 'remove' ? '#F56C6C':
                      item.status === 'Returning' ? '#909399':
                      item.status === 'Review' ? '#E6A23C':
                      item.status === 'change' ? '#E6A23C':
                      item.status === 'mpo' ? '#E6A23C' :
                      item.status === 'mpowarning' ? '#E6A23C':
                      item.status === 'warning' ? '#E6A23C' : ''
                    }">
                      <i :class="
                      item.status === 'complete' ? 'el-icon-success':
                      item.status === 'success' ?  'el-icon-success':
                      item.status === 'mposuccess' ? 'el-icon-success':
                      item.status === 'Approve' ? 'el-icon-success':
                      item.status === 'resuccess' ? 'el-icon-success':
                      item.status === 'Reject' ? 'el-icon-error':
                      item.status === 'mpouser' ? 'el-icon-error':
                      item.status === 'mpousercancel' ? 'el-icon-error':
                      item.status === 'mporeser' ? 'el-icon-error':
                      item.status === 'error' ? 'el-icon-error':
                      item.status === 'mporesercancel' ? 'el-icon-error':
                      item.status === 'mponolock' ? 'el-icon-error':
                      item.status === 'remove' ? 'el-icon-error':
                      item.status === 'Returning' ? 'el-icon-info':
                      item.status === 'Review' ? 'el-icon-info':
                      item.status === 'change' ? 'el-icon-info':
                      item.status === 'mpo' ? 'el-icon-info' :
                      item.status === 'mpowarning' ? 'el-icon-info':
                      item.status === 'warning' ? 'el-icon-info' : ''
                      "></i>
                    </p>
                  <i class="iconfont" :class="
                    item.typename === 'request' ? 'icon-kefu' :
                    item.typename === 'borrowed' ? $t('Lang.public.SSEHit.borrowed') :
                    item.typename === 'checkout' ? $t('Lang.public.SSEHit.checkout') :
                    item.typename === 'reservation' ? 'icon-richeng' :
                    item.typename === 'logfile' ? 'el-icon-download' : ''"
                    :style="{
                      color: item.status === 'complete' ? '#67c23a':
                      item.status === 'success' ?  '#67c23a':
                      item.status === 'mposuccess' ? '#67c23a':
                      item.status === 'Approve' ? '#67c23a':
                      item.status === 'resuccess' ? '#67c23a':
                      item.status === 'Reject' ? '#F56C6C':
                      item.status === 'mpouser' ? '#F56C6C':
                      item.status === 'mpousercancel' ? '#F56C6C':
                      item.status === 'mporeser' ? '#F56C6C':
                      item.status === 'mporesercancel' ? '#F56C6C':
                      item.status === 'mponolock' ? '#F56C6C':
                      item.status === 'error' ? '#F56C6C':
                      item.status === 'remove' ? '#F56C6C':
                      item.status === 'Returning' ? '#909399':
                      item.status === 'Review' ? '#E6A23C':
                      item.status === 'change' ? '#E6A23C':
                      item.status === 'mpo' ? '#E6A23C':
                      item.status === 'mpowarning' ? '#E6A23C':
                      item.status === 'warning' ? 'E6A23C' : ''
                    }"
                    ></i>
                  <!-- 管理员借出 -->
                  <span v-show="item.typename === 'borrowed' && item.status === 'Review'">
                    {{item.adminuser + $t('Lang.public.SSEHit.Adminbro') + item.sutName + $t('Lang.public.SSEHit.Adminbrotwo')}}
                  </span>
                  <!-- 管理员归还 -->
                  <span v-show="item.typename === 'borrowed' && item.status === 'Returning'">
                    {{item.adminuser + $t('Lang.public.SSEHit.AdminbroRet') + item.sutName}}
                  </span>
                  <!-- 管理员出库 -->
                  <span v-show="item.typename === 'checkout' && item.status === 'Review'">
                    {{item.adminuser + $t('Lang.public.SSEHit.AdminChek') + item.sutName + $t('Lang.public.SSEHit.AdminChektwo')}}
                  </span>
                  <!-- 借出被拒模板 -->
                  <span v-show="item.typename === 'borrowed' && item.status === 'Reject'">
                    {{$t('Lang.public.SSEHit.browRejone') + item.projectname + $t('Lang.public.SSEHit.checkRejtwo') + item.adminuser + $t('Lang.public.SSEHit.checkRejthr') + item.mesage}}
                  </span>
                  <!-- 借出归还成功 -->
                  <span v-show="item.typename === 'borrowed' && item.status === 'resuccess'">
                    {{item.sutName + $t('Lang.public.SSEHit.BroRetSuc')}}
                  </span>
                  <!-- 出库被拒模板 -->
                  <span v-show="item.typename === 'checkout' && item.status === 'Reject'">
                    {{$t('Lang.public.SSEHit.checkRejone') + item.projectname + $t('Lang.public.SSEHit.checkRejtwo') + item.adminuser + $t('Lang.public.SSEHit.checkRejthr') + item.mesage}}
                  </span>
                  <!-- 借出完成模板 -->
                  <span v-show="item.typename === 'borrowed' && item.status === 'Approve'">
                    {{$t('Lang.public.SSEHit.browSucone') + item.projectname + $t('Lang.public.SSEHit.browSuctwo')}}
                  </span>
                  <!-- 出库成功模板 -->
                  <span v-show="item.typename === 'checkout' && item.status === 'Approve'">
                    {{$t('Lang.public.SSEHit.checkSucone') + item.projectname + $t('Lang.public.SSEHit.checkSuctwo')}}
                  </span>
                  <!-- 工单派发给工程师 -->
                  <span v-show="item.typename === 'request' && item.status === 'change' && item.sutName !== 'None' && type === 'en'">
                    {{$t('Lang.public.SSEHit.requChenone') + item.projectname + $t('Lang.public.SSEHit.requRejtwo') + item.sutName + $t('Lang.public.SSEHit.requChentwo') + item.adminuser + $t('Lang.public.SSEHit.requChenthr')}}
                  </span>
                  <span v-show="item.typename === 'request' && item.status === 'change' && item.sutName === 'None' && type === 'en'">
                    {{$t('Lang.public.SSEHit.requChenone') + item.projectname + $t('Lang.public.SSEHit.requChentwo') + item.adminuser + $t('Lang.public.SSEHit.requChenthr')}}
                  </span>
                  <span v-show="item.typename === 'request' && item.status === 'change' && item.sutName !== 'None' && ['zh','ts'].includes(type)">
                    {{$t('Lang.public.SSEHit.requChenone') + $t('Lang.public.SSEHit.requRejtwo') + item.sutName + $t('Lang.public.SSEHit.requRejthr') + item.projectname + $t('Lang.public.SSEHit.requChentwo') + item.adminuser + $t('Lang.public.SSEHit.requChenthr')}}
                  </span>
                   <span v-show="item.typename === 'request' && item.status === 'change' && item.sutName === 'None' && ['zh','ts'].includes(type)">
                    {{$t('Lang.public.SSEHit.requChenone') + item.projectname + $t('Lang.public.SSEHit.requChentwo') + item.adminuser + $t('Lang.public.SSEHit.requChenthr')}}
                  </span>
                  <!-- over -->
                  <!-- 工单完成 -->
                  <span v-show="item.typename === 'request' && item.status === 'complete'">
                    {{$t('Lang.public.SSEHit.requSUccone') + item.projectname + $t('Lang.public.SSEHit.requSUcctwo')}}
                  </span>
                  <!-- 工单发配给工程师 -->
                  <span v-show="item.typename === 'request' && item.status === 'Review'">
                   {{item.adminuser + $t('Lang.public.SSEHit.requUsbadmone') + item.projectname + $t('Lang.public.SSEHit.requUsbadmintwo')}}
                  </span>
                  <!-- 工单被拒 -->
                  <span v-show="item.typename === 'request' && item.status === 'Reject' && item.sutName !== 'None' && type === 'en'">
                    {{
                      $t('Lang.public.SSEHit.requRejone') + item.projectname + $t('Lang.public.SSEHit.requRejtwo') + item.sutName + $t('Lang.public.SSEHit.requRejthr') + item.message
                    }}
                  </span>
                  <!-- 没有sutName -->
                  <span v-show="item.typename === 'request' && item.status === 'Reject' && item.sutName === 'None' && type === 'en'">
                    {{
                      $t('Lang.public.SSEHit.requRejone') + item.projectname + $t('Lang.public.SSEHit.requRejthr') + item.message
                    }}
                  </span>
                  <!-- 有SutName 并且为中文 -->
                  <span v-show="item.typename === 'request' && item.status === 'Reject' && item.sutName !== 'None' && ['zh','ts'].includes(type)">
                    {{
                      $t('Lang.public.SSEHit.requRejone') + $t('Lang.public.SSEHit.requRejtwo') + item.sutName + $t('Lang.public.SSEHit.requRejthr') + item.projectname + $t('Lang.public.SSEHit.requRejfur') + item.message
                    }}
                  </span>
                  <!-- 没有Sutname 并未中文 -->
                  <span v-show="item.typename === 'request' && item.status === 'Reject' && item.sutName === 'None' && ['zh','ts'].includes(type)">
                    {{
                      $t('Lang.public.SSEHit.requRejone') + item.projectname + $t('Lang.public.SSEHit.requRejfur') + item.message
                    }}
                  </span>
                  <!-- 预定删除 -->
                  <span v-show="item.typename === 'reservation' && item.status === 'remove'">
                    {{$t('Lang.public.SSEHit.reserRemoveone') + item.adminuser + $t('Lang.public.SSEHit.canceled') + item.sutName}}
                  </span>
                  <!-- 预定修改 -->
                  <span v-show="item.typename === 'reservation' && item.status === 'change'">
                    {{item.adminuser + $t('Lang.public.SSEHit.reserChanone') + item.sutName + $t('Lang.public.SSEHit.reserChantwo') + item.startdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.enddatetimeStr + $t('Lang.public.SSEHit.reserChanthr') + item.newstartdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.newenddatetimeStr + $t('Lang.public.SSEHit.reserChanfur') + item.message}}
                  </span>
                  <!-- mpo有锁定期 -->
                  <span v-show="item.typename === 'reservation' && item.status === 'mpo'">
                    {{$t('Lang.public.SSEHit.mpoone') + item.sutName + $t('Lang.public.SSEHit.mpotwo') + item.startdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.enddatetimeStr + $t('Lang.public.SSEHit.mpothr')}}
                  </span>
                  <!-- mpo没锁定期 -->
                  <span v-show="item.typename === 'reservation' && item.status === 'mponolock'">
                    {{$t('Lang.public.SSEHit.mpoone') + item.sutName + $t('Lang.public.SSEHit.mpoNoon')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mposuccess'">
                    {{$t('Lang.public.SSEHit.mposuccessone') + item.sutName + $t('Lang.public.SSEHit.mposuccesstwo')}}
                  </span>
                  <!-- 机器改为不锁定 -->
                  <span v-show="item.typename === 'reservation' && item.status === 'mpowarning'">
                    {{item.adminuser + $t('Lang.public.SSEHit.mpowarone') + item.sutName + $t('Lang.public.SSEHit.mpowartwo') + item.message + $t('Lang.public.SSEHit.mpowarthr') + item.startdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.enddatetimeStr + $t('Lang.public.SSEHit.mpowarfur') + item.newstartdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.newenddatetimeStr}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mpouser' && type === 'en'">
                    {{item.adminuser + $t('Lang.public.SSEHit.mpouserone') + item.sutName + $t('Lang.public.SSEHit.before') + item.startdatetimeStr + $t('Lang.public.SSEHit.mpousertwo') + item.enddatetimeStr + $t('Lang.public.SSEHit.mpouserthr')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mpouser' && ['zh','ts'].includes(type)">
                    {{$t('Lang.public.SSEHit.mpouserone') + item.sutName + $t('Lang.public.SSEHit.before') + item.adminuser + $t('Lang.public.SSEHit.mpousertwo') + item.startdatetimeStr + $t('Lang.public.SSEHit.mpouserthr') + item.enddatetimeStr + $t('Lang.public.SSEHit.mpouserfur')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mporeser' && type === 'en'">
                    {{$t('Lang.public.SSEHit.mporeserone') + item.sutName + $t('Lang.public.SSEHit.mporesertwo') + item.startdatetimeStr + $t('Lang.public.SSEHit.mporeserthr')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mporeser' && ['zh','ts'].includes(type)">
                    {{$t('Lang.public.SSEHit.mporeserone') + item.startdatetimeStr + $t('Lang.public.SSEHit.mporesertwo') + item.sutName + $t('Lang.public.SSEHit.mporeserthr')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mporesercancel'">
                    {{$t('Lang.public.SSEHit.mporesercancelone') + item.newstartdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.newenddatetimeStr + $t('Lang.public.SSEHit.mporesercanceltwo')}}
                  </span>
                  <span v-show="item.typename === 'reservation' && item.status === 'mpousercancel'">
                    {{$t('Lang.public.SSEHit.mpousercancelone') + item.newstartdatetimeStr + $t('Lang.public.SSEHit.resChanthr') + item.newenddatetimeStr + $t('Lang.public.SSEHit.mpousercanceltwo')}}
                  </span>
                  <!-- over -->
                  <span class="mesg_time">{{item.create_time.split(' ')[3] + '-' + new Date(item.create_time).toLocaleDateString().split('/')[1] + '-' + item.create_time.split(' ')[1] + ' ' + item.create_time.split(' ')[4].split(':').slice(0,2).join(':')}}</span>
                </el-card>
              </el-badge>
            </router-link>
          </div>
          <el-pagination
            @size-change="SearchPage"
            @current-change="currentPages"
            @prev-click="prev_click"
            @next-click="next_click"
            :current-page.sync="PageIndex"
            background
            layout="prev, pager, next, jumper"
            :total="(Allpage * 10)">
          </el-pagination>
          <div class="Message" slot="reference">
            <el-badge :value="Object.keys(mesage).length != 0 ? allMesg : 0" :max="99" class="item" :class="newspaper && 'trans'" v-show="Object.keys(mesage).length != 0">
              <i class='el-icon-message'></i>
            </el-badge>
          </div>
        </el-popover>
        <!-- 用户头像 -->
         <el-dropdown>
           <div class="Name el-dropdown-link">
                <div class="userName">{{userName}}</div>
            </div>
            <el-dropdown-menu slot="dropdown" class="userselect">
                  <el-dropdown-item v-for="(item, index) in dropdownList" :key="index">
                      <router-link :to="item.path" class="MyReservation">{{item.text}}</router-link>
                  </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="user-logout curp" @click="logout">{{$t('Lang.module.Header.Logout')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import store from '../store/store'
  import * as Api from '@/api/api'
  import {Logout} from '@/api/login'
  import GLOBAL from '../common/global'
  let source = null
  export default {
    inject: ['reload'],
    data() {
      return {
        collapse: false,
        show: false,
        languageList: [{
          value: 'en',
          label: 'English'
        }, {
          value: 'zh',
          label: '中文简体'
        }, {
          value: 'ts',
          label: '中文繁體'
        }],
        lang: '',
        type: '',
        messages: [],
        allMesg: null,
        mesage: {},
        dropdownList: [
          {path: '/MyRequests', text: this.$t('Lang.module.Header.MyRequests')},
          {path: '/MyBorrowed', text: this.$t('Lang.module.Header.MyBorrowed')},
          {path: '/MyCheckout', text: this.$t('Lang.module.Header.MyCheckout')},
          {path: '/MyReservation', text: this.$t('Lang.module.Header.MyReservation')},
          {path: '/Mylogfile', text: this.$t('Lang.module.Header.MyLogfile')}
        ],
        newspaper: false,
        time: null,
        num: 0,
        PageIndex: 1, // 当前下标
        Allpage: ''
      }
    },
    created() {
      this.type = this.$i18n.locale;
      this.SSeData()
      this.stopGetHit()
    },
    computed: {
      ...mapGetters([
        'name', 'userId', 'theme', 'itcode', 'Language', 'userName', 'TypeID'
      ])
    },
    methods: {
      changelang() { // 语言切换
        localStorage.setItem('Language', JSON.stringify(JSON.parse(this.lang).value))
        store.commit('SET_LANGUAGE', JSON.parse(this.lang).value)
        this.$i18n.locale = JSON.parse(this.lang).value
        location.reload();
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        this.$bus.$emit('collapse', this.collapse);
      },
      logout() {
        this.$store.dispatch('Logout');
        Logout().then((res) => {})
        this.$router.push('/login');
      },
      goShare() {
        this.$router.push({path: '/ShareEverything', params: {crumb: 'sub'}})
      },
      MesgRead(machineid) {
        Api.ReadMesg({machineid}).then((res) => {
        })
      },
      SSeData() {
          if ('EventSource' in window) {
          source = new EventSource(`${GLOBAL.HOME}/stream/ch`)
          source.onopen = () => {}
          source.addEventListener(this.itcode.type, (evt) => {
            this.allMesg = JSON.parse(evt.data).allnumber;
            this.Allpage = JSON.parse(evt.data).all_page;
            this.mesage = Object.assign({}, JSON.parse(evt.data))
            if (this.allMesg !== 0) {
                this.newspaper = true
            } else {
              this.time = setTimeout(() => {
                clearInterval(this.time)
                this.newspaper = false
              }, 2000)
            }
          })
          source.onerror = () => {
            source.close();
          }
        }
      },
      SearchPage(val) {
        this.PageIndex = val
        console.log(val);
        Api.GetHitPage({page: val}).then((res) => {})
      },
      currentPages(val) {
          this.PageIndex = val
          console.log(val);
          Api.GetHitPage({page: val}).then((res) => {})
      },
      prev_click(val) {
          this.PageIndex = val
          console.log(val);
          Api.GetHitPage({page: val}).then((res) => {})
      },
      next_click(val) {
          this.PageIndex = val
          Api.GetHitPage({page: val}).then((res) => {})
      },
      stopGetHit() {
        setTimeout(() => { Api.GetHit().then((res) => {}) }, 1000)
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    },
    destroyed() {
       source.close();
    }
  }
</script>
<style lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  display: flex;
}

.collapse-btn {
  float: left;
  width: 63px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  margin-left: 20px;
  line-height: 70px;
  width: 250px;
}
.logo{
  font-size: 30px;
  color: #fff;
  font-weight: 600;
}

.header-right {
  width: 100%;
  position: relative;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
  font-size: 16px;
  float: right;
  position: fixed;
  right: -70px;
}

.user-avator {
  margin-right: 30px;
  display: flex;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
}

.user-logout {
  border: 1px solid #fff;
  border-radius: 18px;
  font-size: 14px;
  width: 70px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.collapse-btn:hover {
  background: rgba(0, 0, 0, 0.15)
}
.color{
  color: #fff !important;
  line-height: 40px !important;
}
.name{
  font-weight: 600;
}
.userselect{
  padding: 20px !important;
  transition: .5s all;
}
.tabsTrans{
  width: 250px !important;
  right: 55px !important;
}
.MyReservation{
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #333;
  display: block;
}
.MyReservation:hover{
  color: #62a7ff;
}
.el-dropdown-menu__item{
  padding: 0 !important;
  width: 130px !important;
  text-align: center !important;
  >div{
    width: 100% !important;
  }
}
.ShareBtn{
  width: 254px;
  height: 54px;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  border: 1px solid #324157;
  outline: none;
  background-image: url('../assets/img/Share_Everything.png');
  background-size: 100% 100%;
  transition: .3s all;
  cursor: pointer;
}
.ShareBtn:hover{
  background-color: none;
  border: 1px solid #409eff;
}
.userName{
  color: #fff;
  cursor: pointer;
}
.language{
  flex: .55;
  .el-input__suffix{
    display: none !important;
  }
  .el-input__inner{
    background: transparent !important;
    color: #fff !important;
    border: none !important;
    &::-webkit-input-placeholder{
      color: #fff !important;
    }
  }
}
.Name{
  padding: 0 20px;
  transform-origin: top center;
 .Messageicon{
    >i{
      font-size: 30px;
    }
  }
  .el-badge{
    .el-badge__content{
      border: 1px solid #324157 !important;
    }
  }
}
.Message{
  padding: 0 0 0 30px;
  >div{
    i{
      font-size: 25px;
      cursor: pointer;
    }
    .el-badge__content{
      line-height: 17px !important;
      border-color: #324157 !important;
    }
  }
}
.selectStyle{
   >div:nth-of-type(1){
     >div:nth-of-type(1){
        margin-bottom: -15px !important;
        margin-right: -26px !important;
        padding-left: 0 !important;
     }
   }
}
.mesg_cont{
  width: 545px;
  max-height: 400px;
  overflow-y: scroll;
  margin-left: 5px;
  padding-bottom: 5px;
  >a{
    width: 98% !important;
    height: 30% !important;
    margin: 10px 0 0 0 !important;
    text-decoration: none !important;
    display: block !important;
    position: relative !important;
    >div{
      width: 100% !important;
      .mesg_icon{
        border-radius: 50%;
        padding: 1px;
        color: #fff;
        display: inline-block;
        line-height: 1;
        i{
          font-size: 15px;
        }
      }
      .mesg_time{
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 12px;
      }
    }
  }
}
.mesg_noData{
  text-align: center;
  font-size: 20px;
}
.trans{
  animation: tran .75s infinite alternate;
}
@keyframes tran{
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.5);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
