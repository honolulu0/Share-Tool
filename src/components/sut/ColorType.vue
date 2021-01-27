<!--
 * @Author: Guodong Hao
 * @Date: 2020-12-08 14:57:15
 * @LastEditTime: 2021-01-20 15:53:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\sut\ColorType.vue
-->
<template>
    <div class="select_color">
        <el-tooltip class="hintText" effect="dark" :content="$t('Lang.Views.Sut.Suts.Vacant_title')" placement="top-start">
            <div><div style="background:#fff"></div>{{$t('Lang.Views.Sut.Suts.vacant')}}</div>
        </el-tooltip>
        <div><div style="background:#fe7575"></div>{{$t('Lang.Views.Sut.Suts.Reserved')}}</div>
        <el-tooltip class="hintText" effect="dark" :content="$t('Lang.Views.Sut.Suts.Check_out_title')" placement="top-start">
            <div><div style="background:#b3d2e6"></div>{{$t('Lang.Views.Sut.Suts.Check_Out')}}</div>
        </el-tooltip>
        <el-tooltip class="hintText" effect="dark" :content="$t('Lang.Views.Sut.Suts.Borrowedtitle')" placement="top-start">
            <div><div style="background:#fda000"></div>{{$t('Lang.Views.Sut.Suts.Borrowed')}}</div>
        </el-tooltip>
        <el-tooltip class="hintText" effect="dark" :content="$t('Lang.Views.Sut.Suts.Passed_Date_title')" placement="top-start">
            <div><div style="background:#dedede"></div>{{$t('Lang.Views.Sut.Suts.Passed_Date')}}</div>
        </el-tooltip>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.select_color{
    width: 55%;
    display: flex;
    float: left;
    >div{
        line-height: 30px;
        margin: 10px 0 0 8px;
        display: inline-block;
        >div{
            width: 20px;
            height: 20px;
            float: left;
            margin: 5px 5px 0 0;
            border: 1px solid #ebebeb;
            box-sizing: border-box;
        }
    }
}
@media screen and (max-width: 1280px) {
   .select_color{
        display: inline-block;
        width: 55%;
        >div{
            line-height: 30px;
            margin: 10px 0 0 30px;
            display: inline-block;
        }
    }
}
.hintText{
    float: left;
}
</style>
