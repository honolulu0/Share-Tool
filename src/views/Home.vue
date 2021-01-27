<template>
  <div class="container">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="(i) in imglist" :key="i">
          <img :src="i" alt="">
        </el-carousel-item>
    </el-carousel>
    <div class="cms clearfix">
      <el-col :span="8" v-for="(i,$index) in [1,2,3,4,5,6]" :key='i' >
          <el-card shadow="hover" :body-style="{padding:'20px',margin:'0px'}">
            <div @click="cmsgo($index+1)">
                <div class="img" >
                  <img src="../assets/img/1.jpeg" alt="">
                </div>
              <p class="text">Click the combination of text and text to go to the article details page</p>
            </div>
          </el-card>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imglist: [require('../assets/img/1.jpeg'), require('../assets/img/2.jpeg'), require('../assets/img/3.jpeg')],
        currentDate: new Date()
    }
  },
  methods: {
    cmsgo(i) {
      this.$router.push({name: 'Articles', params: {'uid': i, crumb: 'sub'}})
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
@import url('../assets/styles/index.sCss');
      .el-carousel__item{
        >img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .cms{
        height: auto;
        padding-top: 20px;
        box-sizing: border-box;
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
      }
      .el-breadcrumb__inner .is-link{
        color: #000 !important;
      }
</style>
