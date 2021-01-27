<template>
  <div id="app" class="wh" v-loading="Loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    ...mapGetters([
        'Loading', 'itcode'
      ])
  },
  created() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
  @import './assets/styles/main';
  *{
    // user-select: none;
    font-family: 'Segoe UI Light' !important;
    // font-size: 14px;
  }
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color: #000 !important;
}
</style>
