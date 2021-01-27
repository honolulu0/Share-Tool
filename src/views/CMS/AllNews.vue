<template>
    <div class="cms clearfix" ref="scrollTop">
        <el-col :span="8" v-for="(i, $index) in CMSList" :key='$index' class="newCard">
            <el-card shadow="hover" :body-style="{padding:'20px',margin:'0px'}">
                <div @click="cmsgo(i.id)">
                    <div class="img" >
                        <el-image  :src="i.image" lazy>
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                    </div>
                <p class="text">{{i.cms_title}}</p>
                </div>
            </el-card>
        </el-col>
        <el-pagination class="page"  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
        </el-pagination>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
   data() {
       return {
         CMSList: [],
         PageIndex: 1, // 当前下标
         Allpage: ''
       }
   },
   created() {
     this.getAllCMS()
   },
   methods: {
      cmsgo(i) {
        sessionStorage.cmsId = i
        this.$router.push({path: '/Articles', params: {'uid': i, crumb: 'sub'}})
      },
      getAllCMS(page) {
        Api.getItemCms({page}).then((res) => {
            this.CMSList = res.data_list
            this.Allpage = res.all_page
        })
      },
      currentPages(val) {
        this.PageIndex = val
        this.getAllCMS(val);
      },
      prev_click(val) {
        this.PageIndex = val
        this.getAllCMS(val);
      },
      next_click(val) {
        this.PageIndex = val
        this.getAllCMS(val);
      }
   }
}
</script>
<style lang="scss" scoped>
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
.clearfix{
  zoom: 1;
}
@import url('../../assets/styles/index.sCss');
.cms{
  width: 100%;
  height: auto;
  padding-top: 20px;
  box-sizing: border-box;
  padding-bottom: 40px;
}
.el-card__body{
width: 100%;
>p{
    height: 40%;
}
}
.img{
  width: 100%;
  height: 60%;
>div{
  width: 100%;
  height: 210px;
  display: block;
  text-align: center;
  i{
    margin: 25%;
    font-size: 50px;
    color: #ccc;
  }
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
}
.el-col-8{
  cursor: pointer;
  box-sizing: border-box;
}
.el-card{
  width: 95%;
  margin-bottom: 10px;
}
.el-card:nth-child(odd){
  margin-left: 10px;
}
.text{
  text-indent: 1em;
  font-size: 20px;
}
.el-breadcrumb__inner .is-link{
  color: #000 !important;
}
.pagination{
  float: right !important;
}
.newCard>div{
  width: auto !important;
}
.newCard{
  height: 283px !important;
  margin-bottom: 10px !important;
}
.page{
  width: 100% !important;
  text-align: right !important;
}
</style>
