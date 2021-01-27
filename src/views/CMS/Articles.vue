<template>
  <div class="container">
    <div class="article">
      <router-link to="/AllNews"><i class="el-icon-arrow-left"></i>{{$t('Lang.Views.Cms.Articles.Back')}}</router-link>
      <el-button type="primary" icon="el-icon-edit" size='mini' class="changeNews" @click="GoAmend">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
      <h1 v-if="cont.cms_title !== ''" v-html="cont.cms_title" class="title">{{cont.cms_title}}</h1>
      <div class="author">
        <span>{{$t('Lang.Views.Cms.Articles.publisher')}}</span>
        <span v-if="cont.author !== ''">{{cont.author}}</span>
        <el-divider direction="vertical"></el-divider>
        <span v-if="cont.create_time !== ''">{{new Date(cont.create_time).getFullYear() + $t('Lang.Views.Cms.Articles.Year') + (new Date(cont.create_time).getMonth() + 1) + $t('Lang.Views.Cms.Articles.Month') + new Date(cont.create_time).getDate() + $t('Lang.Views.Cms.Articles.Day') +' '+ new Date(cont.create_time).getHours() +':'+ new Date(cont.create_time).getMinutes()}}</span>
      </div>
      <div v-if="cont.comments !== ''" v-html="cont.comments">
        {{cont.comments}}
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/api'
export default {
  name: 'NormStructure',
  data() {
    return {
      uid: this.$route.params.uid || sessionStorage.cmsId,
      cont: {}
    }
  },
  created() {
    this.GetItemCms()
  },
  methods: {
    GetItemCms() {
      Api.getItemCms({cms_id: this.uid, type: 'info'}).then((res) => {
        this.cont = {...res.data_list[0]}
      })
    },
    GoAmend() {
      this.$router.push({path: 'AmendNews', params: {'uid': sessionStorage.cmsId, crumb: 'sub'}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .folder {
    font-weight: bold;
    font-size: 15px;
  }

  .lh35 {
    line-height: 35px;
  }

  .hljs, .cnblogs-post-body .hljs {
    font-family: "Courier New", sans-serif !important;
    font-size: 15px !important;
    line-height: 24px;
    padding: 5px;
  }

  .hljs, .cnblogs-post-body .hljs {
    display: block;
    overflow-x: auto;
    padding: .5em;
    background: #fff;
    color: #000;
  }

  pre code, .cnblogs-post-body pre code {
    display: block;
    margin: auto;
    vertical-align: auto;
    height: auto;
    line-height: 1.5;
    padding: 5px !important;
  }

  code, .cnblogs-post-body code {
    font-family: "Courier New", sans-serif !important;
    font-size: 12px !important;
    line-height: 20px;
    background-color: #f5f5f5 !important;
    border: 1px solid #ccc !important;
    padding: 0 5px !important;
    border-radius: 3px !important;
    line-height: 1.8;
    margin: 1px 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title{
    font-size: 3em;
    font-weight: 600;
    margin: 0 0 20px 0;
  }
  .article{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 0 3px 3px rgba($color: #000000, $alpha: 0.1);
    >a{
        text-decoration: none !important;
        color: #333 !important;
    }
  }
  .author{
    margin: 10px 0;
    color: #999;
  }
  .changeNews{
    float: right !important;
  }
</style>
