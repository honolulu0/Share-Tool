<!--
 * @Author: Guodong Hao
 * @Date: 2020-12-23 16:37:43
 * @LastEditTime: 2021-01-15 16:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\support\export2Excel.vue
-->
<template>
    <el-dialog
        :title="$t('Lang.module.Home.export')"
        :visible.sync="excelType"
        width="50%"
        :before-close="handleClose">
        <div class="FilterDefinition" v-if="type === ''">
            <div class="celcetOne">
                <div class="AppSelect">
                    <span>{{$t('Lang.Views.Support.MyReq_allReq.applicant')}}: </span><br/>
                    <el-select
                        v-model="AppName"
                        multiple
                        filterable
                        remote
                        :reserve-keyword="false"
                        default-first-option
                        :placeholder="$t('Lang.Views.Login.p_itcode')"
                        :remote-method="AppMethod"
                        :loading="loading">
                        <el-option
                        v-for="item in AppList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="OpeSelect">
                    <span>{{$t('Lang.Views.Support.MyReq_allReq.Operator')}}: </span><br/>
                    <el-select
                        v-model="OpeName"
                        multiple
                        filterable
                        remote
                        :reserve-keyword="false"
                        default-first-option
                        :placeholder="$t('Lang.Views.Login.p_itcode')"
                        :remote-method="OpeMethod"
                        :loading="loading2">
                        <el-option
                        v-for="item in OpeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="FileterTime">
                <div class="timeSelect">
                    <span>{{$t('Lang.public.Reservation_label.Select_Dates')}}: </span><br/>
                    <el-date-picker
                        v-model="Select_Dates"
                        type="daterange"
                        value-format="yyyy-M-dd"
                        class="Reserpicker"
                        range-separator="-"
                        :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                        :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')">
                    </el-date-picker>
                </div>
                <div class="LocaSelest">
                    <span>{{$t('Lang.Views.Support.request.Location')}}: </span><br/>
                    <el-cascader
                    class="locaCascader"
                    v-model="location"
                    :options="options"
                    :props="props"
                    popper-class="clearcheckbox"
                    clearable></el-cascader>
                </div>
            </div>
        </div>
        <div v-if="type === 'Site'" class="sitedwo">
            <el-checkbox-group
                @change="ChangeCheck"
                v-model="checkedCities">
                <el-checkbox v-for="item in filterDwonList" :label="item" :key="item" border>{{item}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div v-if="type === 'SearcePoint'" class="SearchImport">
            <span>{{$t('Lang.public.Reservation_label.Select_Dates')}}: </span><br/>
            <el-date-picker
                v-model="SearceList"
                type="daterange"
                value-format="yyyy-M-dd"
                range-separator="-"
                :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')">
            </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Downexcel">{{$t('Lang.public.DownBtn')}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import GLOBAL from '../../common/global'
export default {
    name: 'Export2Excel',
    data() {
        return {
            props: { multiple: true, expandTrigger: 'hover' },
            AppList: [],
            OpeList: [],
            OpeName: [],
            AppName: [],
            loading: false,
            loading2: false,
            Select_Dates: [new Date().toLocaleDateString().replaceAll('/', '-'), new Date().toLocaleDateString().replaceAll('/', '-')],
            options: [],
            location: [],
            filterDwonList: ['User', 'MPO', 'Armory owner'],
            checkedCities: [],
            checkobj: {
                User: 0,
                MPO: 0,
                Armory_owner: 0
            },
            filertList1: ['ticket_title', 'ticket_id', 'sut_name', 'sut_location', 'applicant', 'operator', 'create_time', 'status', 'comments', 'location', 'manager'], // 表头
            filertList2: ['', '', '', '', '', '', '', '', '', '', ''], // 标题
            siteList1: ['User', 'MPO', 'Armory_owner'],
            siteList2: ['', '', ''],
            siteList3: ['user', 'mpo', 'armory'],
            SearceList: [new Date(new Date().getTime()).toLocaleDateString().split('/')[0] + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[1] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[1] : new Date(new Date().getTime()).toLocaleDateString().split('/')[1]) + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[2] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[2] : new Date(new Date().getTime()).toLocaleDateString().split('/')[2]),
            new Date(new Date().getTime()).toLocaleDateString().split('/')[0] + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[1] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[1] : new Date(new Date().getTime()).toLocaleDateString().split('/')[1]) + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[2] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[2] : new Date(new Date().getTime()).toLocaleDateString().split('/')[2])]
        }
    },
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
      ...mapGetters([
          'excelType'
        ])
    },
    created() {
        this.getLocation()
    },
    methods: {
        getLocation() {
            Api.getSelected({locationInfo: '1'}).then((res) => {
                if (res.success === true) {
                    this.options = res.data
                }
            })
        },
        AppMethod(query) {
            if (query !== '') {
                this.loading = true;
                Api.getMpoInput({name: query}).then((res) => {
                    this.loading = false;
                    this.AppList = res.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                })
            } else {
                this.AppList = []
            }
        },
        OpeMethod(query) {
            if (query !== '') {
                this.loading2 = true;
                Api.getMpoInput({name: query}).then((res) => {
                    this.loading2 = false;
                    this.OpeList = res.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                })
            } else {
                this.OpeList = []
            }
        },
        handleClose() {
            this.$store.commit('SET_EXCELTYPE', false)
            this.AppList = [];
            this.OpeList = [];
            this.OpeName = [];
            this.AppName = [];
        },
        Downexcel() {
            if (this.type === '') {
                Api.Assg2excel({data: {applicant: this.AppName, operator: this.OpeName, create_time: this.Select_Dates, sut_location: this.location}}).then((res) => {
                    if (res.result === 1) {
                        this.Export2Excel(res.data_list)
                        this.$message({
                            type: 'success',
                            message: this.$t('Lang.public.Message.dowSuc'),
                            offset: 350
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.errMsg,
                            offset: 350
                        })
                    }
                })
                this.AppName = []
                this.OpeName = []
                this.Select_Dates = [new Date().toLocaleDateString().replaceAll('/', '-'), new Date().toLocaleDateString().replaceAll('/', '-')]
                this.location = []
                this.AppList = [];
                this.OpeList = [];
            } else if (this.type === 'Site') {
                if (this.checkedCities.length === 0) {
                    this.$message({
                        type: 'error',
                        message: this.$t('Lang.public.Message.chaeckError'),
                        offset: 350
                    })
                } else {
                    Api.export2User({...this.checkobj}).then((res) => {
                        if (res.result === 1) {
                            this.Export2Excel(res.data_list);
                            this.checkedCities = []
                            this.$message({
                                type: 'success',
                                message: this.$t('Lang.public.Message.dowSuc'),
                                offset: 350
                            })
                        }
                    })
                }
            } else if (this.type === 'SearcePoint') {
                Api.GetSearchImport({start: this.SearceList[0], end: this.SearceList[1]}).then((res) => {
                    location.href = `${GLOBAL.HOME}/sut_api/exportSearchData?start=${this.SearceList[0]}&end=${this.SearceList[1]}`
                })
            }
        },
        ChangeCheck() {
            this.checkobj.User = this.checkedCities.includes('User') ? 1 : 0
            this.checkobj.MPO = this.checkedCities.includes('MPO') ? 1 : 0
            this.checkobj.Armory_owner = this.checkedCities.includes('Armory owner') ? 1 : 0
        },
        Export2Excel(dataList) {
            import('../../excel/Export2Excel2').then(excel => {
            const tHeader = this.type === '' ? this.filertList1 : this.siteList1;
            const title = this.type === '' ? this.filertList2 : this.siteList2;
            // 表头对应字段
            const filterVal = this.type === '' ? this.filertList1 : this.siteList3;
            const list = dataList
            const data = this.formatJson(filterVal, list)
            data.map(item => {
                // console.log(item)
                item.map((i, index) => {
                if (!i) {
                    item[index] = ''
                }
                })
            })
            // const merges = ['A1:I1'] //合并单元格
            excel.export_json_to_excel({
                title: title,
                header: tHeader,
                data,
                // merges,
                filename: this.$t('Lang.Views.Support.MyReq_allReq.filename'),
                autoWidth: true,
                bookType: 'xlsx'
            })
        })
        },
        formatJson(filterVal, jsonData) { // 数据转换
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
<style lang="scss">
.FilterDefinition{
    width: 100%;
    .celcetOne{
        margin-bottom: 10px;
        display: flex;
        >div{
            flex: 1;
            >div{
                width: 90%;
                margin-top: 5px;

            }
        }
    }
    .FileterTime{
        margin-top: 10px;
        display: flex;
        >div{
            flex: 1;
            >div{
                width: 90% !important;
                margin-top: 5px;
            }
        }
    }
}
.SearchImport{
    >span{
        display: inline-block;
        margin-bottom: 10px;
    }
}
</style>
