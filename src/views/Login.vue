<template>
    <div class="conts">
        <div>
            <div class="logo">
                <img src="../assets/img/LenovoLogo-sized-vertical.png" alt="">
            </div>
            <h1 class="slogan" v-html="$t('Lang.Views.Login.slogan')"></h1>
            <div class="link">
                <div class="online">
                    <ul>
                        <h3>{{$t('Lang.Views.Login.linkone')}}</h3>
                        <li class="item" v-for="(i,index) in onlineListCMS" :key='index'>
                            <i class="iconfont" :class="onlineList[index].icon"></i>
                            <a href="javascript:;" class="onlineLink" @click="open(index)">{{i.cms_title}}</a>
                        </li>
                    </ul>
                </div>
                <div class="Users">
                     <ul>
                         <h3>{{$t('Lang.Views.Login.linktwo')}}</h3>
                        <li class="item" v-for="(i,index) in UserList" :key='index'>
                            <i class="iconfont" :class="i.icon"></i>
                            <a :href="`${i.link}`" class="onlineLink" target="_blank">{{i.text}}</a>
                        </li>
                     </ul>
                </div>
            </div>
        </div>
        <div class="login_back">
            <div class="logon_lang language">
              <el-select v-model="lang"
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
            <h2 class="logintitle" v-html="$t('Lang.Views.Login.shareTool')">
                <!-- <span style="color:red;">S</span><span>hare</span>&nbsp;<span>Tool</span>
                <p class="small">Version 0.0.1</p> -->
            </h2>
                <div class="ms-login">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                        <el-form-item prop="username">
                            <input type="text" v-model="ruleForm.username" :placeholder="$t('Lang.Views.Login.ITcode')"  class="itcode"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <input :type="showorhidden === false ? 'password' : 'input'"
                            v-model="ruleForm.password"
                            :placeholder="$t('Lang.Views.Login.Password')"
                            @keyup.enter="submitForm('ruleForm')"
                            class="password"/>
                            <i class="iconfont showorhidden" :class="showorhidden === true ? 'icon-zhengyan' : 'icon-biyan'" @click="showorhidden = !showorhidden"></i>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" :loading="loginType" @click="submitForm('ruleForm')">{{$t('Lang.Views.Login.login')}}</el-button>
                        </div>
                </el-form>
            </div>
        </div>
        <!-- over -->
        <!-- 文章 -->
        <el-dialog
          :visible.sync="dialogVisible"
          width="30%"
          top='0px'
          class="CMSdialog"
          :fullscreen='true'
          :before-close="handleClose">
          <div v-if="Index !== ''">
            <h1 v-if="onlineListCMS[Index].cms_title !== ''" v-html="onlineListCMS[Index].cms_title" class="titleCms">{{onlineListCMS[Index].cms_title}}</h1>
            <div class="author">
              <span>{{$t('Lang.Views.Login.Publisher')}}</span>
              <span v-if="onlineListCMS[Index].author !== ''">{{onlineListCMS[Index].author}}</span>
              <el-divider direction="vertical"></el-divider>
              <span v-if="onlineListCMS[Index].create_time !== ''">
                  {{onlineListCMS[Index].create_time.slice(0, 16)}}
                </span>
            </div>
            <div class="CMSfirstimg" v-if="onlineListCMS[Index].image !== ''">
              <img :src="onlineListCMS[Index].image" alt="">
            </div>
            <div v-if="onlineListCMS[Index].comments !== ''" v-html="onlineListCMS[Index].comments">
              {{onlineListCMS[Index].comments}}
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import {GetUser} from '../api/login'
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import store from '../store/store'
export default {
    data() {
        return {
            onlineList: [{icon: 'icon-favorite'},
            {icon: 'icon-ai-code'},
            {icon: 'icon-shipin'},
            {icon: 'icon-renqun'},
            {icon: 'icon-weibiaoti-'}],
            onlineListCMS: [],
            UserList: [ {icon: 'icon-IDCjifang', text: '6F-SC3@BJ', link: ' https://yun.kujiale.com/design/3FO4CI9XQXYD/show?kpm=qkWL.b0e18829d7deb8aa.732555f.1603639436997'},
            {icon: 'icon-IDCjifang', text: '2F-SC1@BJ', link: ' https://yun.kujiale.com/design/3FO4CIX1GR43/show?kpm=qkWL.7a314f99a2b1a61b.732555f.1603639485677'},
            {icon: 'icon-IDCjifang', text: '2F-SC2@BJ', link: 'https://yun.kujiale.com/design/3FO4CHSDUAH7/show?kpm=qkWL.e00d4a436358e35b.732555f.1603639373376'}],
            ruleForm: {
              username: '',
              password: ''
            },
            rules: {
              username: [
                {required: true, message: this.$t('Lang.Views.Login.p_itcode'), trigger: 'blur'}
              ],
              password: [
                {required: true, message: this.$t('Lang.Views.Login.p_pass'), trigger: 'blur'}
              ]
            },
            loginType: false,
            dialogVisible: false,
            Index: '',
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
            showorhidden: false
        }
    },
    created() {
      // 直接访问的登陆页要执行logout相关操作
      this.type = this.$i18n.locale
      this.$store.dispatch('Logout')
      this.getUserCms()
    },
    computed: {
      ...mapGetters([
        'Language'
      ])
    },
    methods: {
      changelang() { // 语言切换
        localStorage.setItem('Language', JSON.stringify(JSON.parse(this.lang).value))
        store.commit('SET_LANGUAGE', JSON.parse(this.lang).value)
        this.$i18n.locale = JSON.parse(this.lang).value
      },
      getUserCms() {
          Api.GetUserCMS().then((res) => {
              this.onlineListCMS = res.data_list.reverse()
          })
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loginType = true
                  this.$store.dispatch('GetUserInfo', this.ruleForm).then((res) => {
                    this.loginType = false
                    this.$message.closeAll();
                      GetUser().then((res) => {
                        let str = res.username
                        let val = '';
                          for (let i = 0; i < str.length; i++) {
                              if (val === '') {
                                val = str.charCodeAt(i).toString(16);
                              } else {
                                val += ',' + str.charCodeAt(i).toString(16);
                              }
                          }
                        localStorage.setItem('usn', JSON.stringify(val));
                        localStorage.setItem('TypeID', JSON.stringify(res.requester_roleid));
                        store.commit('SET_USERNAME', res.username)
                        sessionStorage.setItem('Loading', true)
                        this.$router.replace('/')
                          setTimeout(() => {
                              location.reload()
                          }, 100)
                      })
                  }).catch((msg) => {
                      switch (msg) {
                          case -1:
                            this.$message({
                              showClose: true,
                              type: 'error',
                              message: this.$t('Lang.Views.login.logerror1')
                            });
                            break;
                          case -2:
                            this.$message({
                              showClose: true,
                              type: 'error',
                              message: this.$t('Lang.Views.login.logerror2')
                            });
                            break;
                          case -3:
                            this.$message({
                              showClose: true,
                              type: 'error',
                              message: this.$t('Lang.Views.login.logerror3')
                            });
                          break;
                        }
                    this.loginType = false
                  });
              };
          });
      },
      open(i) {
        this.dialogVisible = true
        this.Index = i
      }
  }
}
</script>
<style lang="scss">
.conts{
    width: 100vw;
    height: 100vh;
    display: flex;
    >div:nth-of-type(1){
        width: 60%;
        height: 100vh;
        border-radius: none;
        background: #333f4b;
        position: relative;
        .logo{
          text-indent: -.3em;
          height: 160px;
            img{
              transform: translateY(-30px) scale(.7);
            }
        }
    }
    >.login_back{
        width: 40%;
        height: 100%;
        background-image: url('../assets/img/shareTool_bj.png');
        background-size: 100% 100%;
        position: relative;
    }
}
.slogan{
    width: 600px;
    font-size: 40px;
    color: #fff;
    margin: auto;
    margin-bottom: 30px;
}
.link{
    width: 600px;
    height: 300px;
    display: flex;
    margin: auto;
}
.online,.Users{
    flex: 1;
    h3{
        color: #fff;
        font-size: 24px;
        margin-bottom: 5px;
    }
    i{
        color: #fff;
        font-size: 18px;
        margin-right: 5px;
    }
    li{
        margin-bottom: 5px;
    }
}
.onlineLink{
    font-size: 20px;
    color: #fff;
    text-decoration: none;
}

.logintitle{
    padding-left: 163px;
    color: #fff;
    >span{font-size: 40px;}
    font-weight: 600;
    padding-top: 160px;
    .small{
        font-size: 14px;
        text-align: left;
        color: #f8f8f8cf;
    }
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    width: 350px;
    border-radius: 5px;
    background: transparent;
    overflow: hidden;
    margin-left: 130px;
}

.ms-content {
    padding: 30px 30px;
}
.login-btn button {
    width: 270px;
    height: 50px;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
    transition: .3s;
    background: #333f4b !important;
    border: 1px solid #333f4b !important;
    &:hover{
      background: #3e4c5b !important;
    }
    &:active{
      background: #333f4b !important;
    }
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.itcode,.password{
    width: 270px;
    height: 50px;
    font-size: 16px;
    border-radius: 4px;
    text-indent: 1em;
    border: 1px solid #000;
    background: #333;
    outline: none;
    color: rgb(194, 194, 194);
}
.itcode::-webkit-input-placeholder,.password::-webkit-input-placeholder{
    color: rgb(194, 194, 194);
}
.showorhidden{
  color:#536579;
  position: absolute;
  top: 6px;
  right: 30px;
  transition: .2s;
  font-size: 20px !important;
}
.CMSdialog{
  >div{
    top: 0 !important;
    >div{
      >button{
        .el-dialog__headerbtn{
          color: #ff0000 !important;
          font-size: 30px !important;
          font-weight: 700 !important;
        }
      }
    }
  }
}
.author{
  margin: 10px 0;
  color: #999;
}
.titleCms{
  font-size: 40px;
}
.CMSfirstimg{
  margin: 10px 0px;
  img{
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 5px;
  }
}
.CMSdialog>div>.el-dialog__header{
  padding: 0 !important;
}
.CMSdialog .dialog__close{
  color: #ff0000 !important;
  font-size: 30px !important;
}
.logon_lang{
  position: absolute;
  left: 400px;
  top: 20px;
}
</style>
