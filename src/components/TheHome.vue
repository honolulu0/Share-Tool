<!--
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:38:49
 * @LastEditTime: 2021-01-26 14:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\TheHome.vue
-->
<template>
  <div class="wrapper">
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}" v-loading="Loading2" element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) of crumbList" :key="index" :to="{ path:item[1] }" :id="path === item[1] ? 'CrumbColor1' : 'CrumbColor2'"
            class="fontSize" @click.native=getIndex(index)>
            {{item[0] === 'New Request' ? $t('Lang.module.Home.CreateRequest') : item.path === '/CreateBorrowed' ? $t('Lang.module.Home.CreateBorrow') : item[1] === '/CreateCheckout' ? $t('Lang.module.Home.CreateCheckout') : item[0]}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="ExportBtn" type="primary" v-if="['/AdminAllRequests', '/AllReuests', '/Sites', '/DataAnalysis'].includes(path)"
          @click="Export">{{['/Sites'].includes(path) ? $t('Lang.module.Home.exportUser'):$t('Lang.module.Home.export')}}</el-button>
      </div>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="keepAlive">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import TheHeader from './TheHeader.vue';
  import TheSidebar from './TheSidebar.vue';
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        collapse: false,
        crumbList: new Map(),
        keepAlive: [],
        path: '',
        excludPathList: []
      }
    },
    components: {
      TheHeader,
      TheSidebar
    },
    created() {
      this.path = this.$route.path;
      var that = this
      setTimeout(() => {
        that.excludPathList = JSON.stringify(that.$store.getters.tableBar)
      }, 2000)

      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      });
      if (window.localStorage.getItem('userType')) {
        console.log(sessionStorage.getItem('curencryption'))
        if(sessionStorage.getItem('curencryption')!==null){
             this.crumbList = new Map(JSON.parse(sessionStorage.getItem('curencryption'))) 
        }



      }
    },
    watch: {
      // 监听路由的跳转
      '$route'(to, from) {
        // 缓存页面（theSidebar里写了每次切换菜单时会把缓存清掉,由于存在vuex里，所以刷新页面也会清空）
        this.$store.dispatch('changeKeepAlive', to.name);
        this.keepAlive = this.$store.state.app.keepAlive
        this.setCrumb(to)
      }
    },
    computed: {
      ...mapGetters([
        'itcode', 'Loading2'
      ])
    },
    methods: {
      getIndex(index) {
        console.log('点击了' + index)
        if (index == 0 || ((index + 1) == this.crumbList.size)) {
          return
        }

        let newList = JSON.parse(JSON.stringify(this.crumbList))
        console.log(JSON.stringify(this.crumbList))
        let a = newList.splice(index + 1, newList.length - index - 1)
        this.crumbList = new Map(newList)
        window.sessionStorage.setItem('curencryption',JSON.stringify( this.crumbList))
      },
      setCrumb(to) {

        let title = to.meta.title;
        console.log(title)
        if (this.excludPathList.indexOf(title) > -1) {
          this.crumbList.clear()
          this.$store.commit("SET_BAR_TITLE", title)
        }

        this.path = to.path;
        if (this.crumbList.size < 9) {
          this.crumbList.set(title, to.path)

          window.sessionStorage.setItem('curencryption',JSON.stringify( this.crumbList))
        }
      },
      Export() {
        this.$store.commit('SET_EXCELTYPE', true)
      }
    }
  }
</script>
<style lang="scss">
  @media screen and (min-width: 1920px) {
    .crumbs {
      >div {
        width: 89%;
      }
    }
  }

  @media only screen and (max-width: 1536px) {
    .crumbs {
      >div {
        width: 89%;
      }
    }
  }

  @media screen and (max-width: 1280px) {
    .crumbs {
      >div {
        width: 85%;
      }
    }
  }

  .ExportBtn {
    position: absolute;
    right: 10px;
  }

  #CrumbColor1 {
    >span {
      color: #489ad1 !important;
      cursor: text !important;
    }
  }

  #CrumbColor2 {
    >span {
      color: #333 !important;
      cursor: pointer !important;
    }
  }

  .fontSize {
    >span {
      font-size: 14px !important;
      line-height: 2;
    }

    &:last-child {
      >.el-breadcrumb__inner {
        color: #333 !important;
      }
    }
  }
</style>
