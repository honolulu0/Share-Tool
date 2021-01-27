<!--
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:38:49
 * @LastEditTime: 2021-01-15 15:53:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\views\Management\DataAnalysis.vue
-->
<template>
  <div class="container">
    <!-- <el-button class="ExportSearchBtn" type="primary">{{$t('Lang.module.Home.export')}}</el-button> -->
    <div v-for="(val, key) in DataList" :key='key'>
      <div class="SearchBase">
        <p><span>searchlistid:</span>&nbsp;<span>{{val.searchlistid}}</span></p>
        <p><span>IT Code:</span>&nbsp;<span>{{val.itcode}}</span></p>
        <p><span>searchresult:</span>&nbsp;<span>{{val.searchresult}}</span></p>
        <p><span>createtime:</span>&nbsp;<span>{{new Date(val.createtime).toLocaleDateString().split('/').join('-')+' '+new Date(val.createtime).toTimeString().split(' ')[0].split(':').join('-')}}</span></p>
      </div>
      <el-divider></el-divider>
    </div>
    <!-- 分页组件 -->
      <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
      </el-pagination>
      <Export2Excel :type="'SearcePoint'"></Export2Excel>
  </div>
</template>

<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import Export2Excel from '../../components/support/export2Excel.vue'
  export default {
    data() {
      return {
        DataList: [], // 后台给数据前台经行渲染
        PageIndex: 1, // 当前下标
        Allpage: ''
      }
    },
    components: {Export2Excel},
    computed: {
      ...mapGetters([
          'itcode'
        ])
    },
    created() {
      this.themeV = this.theme;
      this.GetBase()
    },
    watch: {
      themeV(d) {
        this.changeTheme(d)
      }
    },
    mounted() {
    },
    methods: {
      changeTheme(d) {
        this.$store.dispatch('ChangeTheme', d)
      },
      GetBase(page) {
        Api.getBaseAll({page}).then((res) => {
            if (res.success) {
              this.DataList = res.data
              this.Allpage = res.all_page
            }
        })
      },
      currentPages(val) {
          this.PageIndex = val
          this.GetBase(val)
        },
        prev_click(val) {
          this.PageIndex = val
          this.GetBase(val)
        },
        next_click(val) {
          this.PageIndex = val
          this.GetBase(val)
        }
    }
  }
</script>
<style lang="scss">
.SearchBase{
  display: flex;
  p{
    flex: 1;
  }
}
// .DataAray{
//   padding: 15px;
//   margin: 15px;
//   position: relative;
//   .ExportSearchBtn{
//     position: absolute;
//     top: 0;
//     left: 0;
//   }
// }
</style>
