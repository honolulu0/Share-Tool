<!--
 * @Author: Guodong Hao
 * @Date: 2020-12-28 14:33:40
 * @LastEditTime: 2021-01-05 11:09:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\views\SetEnginner\location.vue
-->
<template>
    <div style="padding:10px;">
        <div class="lAddBtn">
            <router-link to>
             <el-button type="text" @click="$router.back()" class="el-icon-arrow-left">{{$t('Lang.Views.Cms.Articles.Back')}}</el-button>
            </router-link>
            <el-button type="primary" @click="GetAss">{{$t('Lang.public.Add')}}</el-button>
        </div>
        <div v-show="data.length === 0">
            {{$t('Lang.Views.Manage.Sites.noData')}}
        </div>
        <City v-for="(item, index) in data"
        :key="index"
        :type="'children'"
        :engineer="item.engineer"
        :model="item.allocation"
        :uid="item.id"
        :site="item.site"
        :lab_location="item.lab_location"
        :ServerNumber="item.server_num"
        @Close='Close($event)'
        :level="level">
            <template slot="Location">
                    {{item.lab_location}}
            </template>
        </City>
        <Alert :dialogFormVisible="addType"
        @Close='Close($event)'
        :type="'children'"
        :multi="true"
        :site="site"
        ref='Alert'
        :change='change'></Alert>
    </div>
</template>
<script>
import City from './city';
import Alert from './AddAlert';
import * as Api from '@/api/api'
export default {
    components: {
        City, Alert
    },
    data() {
        return {
            addType: false,
            data: [],
            level: null,
            site: null,
            change: '',
            cid: '',
            engineer: '',
            model: '',
            lab_location: ''
        }
    },
    created() {
       this.$route.query.site !== '' && this.GetLab(this.$route.query.site);
       this.site = this.$route.query.site
       this.level = this.$route.query.level;
    },
    methods: {
        GetLab(site) {
            Api.GetLabData({site}).then((res) => {
                if (res.result === 1) {
                    this.data = res.data_list
                }
            })
        },
        GetAss() {
            this.addType = true
            this.$refs.Alert.GetAssig()
        },
        Close(data) {
            this.addType = data.type;
            this.change = data.change
            this.cid = data.cid;
            this.engineer = data.engineer;
            this.model = data.model;
            this.lab_location = data.lab_location
            if (data.type === true) {
                this.$refs.Alert.GetParent(data.cid, data.engineer, data.model, data.lab_location)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.lAddBtn{
    width: 100%;
    height: 40px;
    >button{
        float: right !important;
    }
    >a{
        >button{
            color: #000 !important;
        }
    }
}
</style>
