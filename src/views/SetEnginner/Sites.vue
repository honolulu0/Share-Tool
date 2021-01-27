<!--
 * @Author: Guodong Hao
 * @Date: 2020-12-25 15:11:20
 * @LastEditTime: 2021-01-14 09:39:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\views\SetEnginner\Sites.vue
-->
<template>
    <div style="padding:10px;">
        <div class="AddBtn">
            <el-button type="primary" @click="addType = true">{{$t('Lang.public.Add')}}</el-button>
        </div>
        <div class="level1 clearfix" v-show="data.length !== 0">
            <City v-for="(item, index) in data"
            :ServerNumber="item.server_num"
            :key='index'
            v-show="item.level === 1"
            :level='item.level'
            :sub_admin="item.sub_admin"
            :site="item.site"
            :type="'parent'"
            :uid='item.id'>
                <template slot="Location">
                    {{item.site}}
                </template>
            </City>
        </div>
        <div class="level2 clearfix" v-show="data.length !== 0">
            <City v-for="(item, index) in data"
            :ServerNumber="item.server_num"
            :key='index'
            v-show="item.level === 2"
            :level='item.level'
            :site="item.site"
            :type="'parent'"
            :sub_admin="item.sub_admin"
            :uid='item.id'>
                <template slot="Location">
                    {{item.site}}
                </template>
            </City>
        </div>
        <div class="level3 clearfix" v-show="data.length !== 0">
            <City v-for="(item, index) in data"
            :ServerNumber="item.server_num"
            :key='index'
            v-show="item.level === 3"
            :sub_admin="item.sub_admin"
            :type="'parent'"
            :site="item.site"
            :level='item.level'
            :uid='item.id'>
                <template slot="Location">
                    {{item.site}}
                </template>
            </City>
        </div>
        <Alert :dialogFormVisible="addType" @Close='Close($event)' :type="'parent'" :multi="false"></Alert>
        <Export2Excel :type="'Site'"></Export2Excel>
    </div>
</template>
<script>
import City from './city';
import Alert from './AddAlert';
import * as Api from '@/api/api'
import Export2Excel from '../../components/support/export2Excel'
export default {
    components: {
        City, Alert, Export2Excel
    },
    data() {
        return {
            addType: false,
            data: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            Api.GetData().then((res) => {
                if (res.result === 1) {
                    this.data = res.data_list
                } else {
                    this.data = []
                }
            })
        },
        Close(data) {
            this.addType = data.type
        }
    }
}
</script>
<style lang="scss" scoped>
.AddBtn{
    width: 100%;
    height: 40px;
    text-align: right;
}
.level1,.level2,.level3{
    width: 100%;
    height: auto;
}
</style>
