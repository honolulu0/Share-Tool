<template>
    <div class="cont">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border size="medium" style="transform:translate(-23px);">{{$t('Lang.Views.Sut.Suts.SelectAll')}}</el-checkbox>
        <transition name="el-fade-in-linear">
            <span v-show="allLength !== 0">{{allLength}}&nbsp;/&nbsp;{{$t('Lang.Views.Sut.Suts.num')}}</span>
        </transition>
        <transition name="el-fade-in-linear">
            <el-button size="medium" type="primary" v-show="allLength !== 0" @click="Bulk">{{$t('Lang.Views.Sut.Suts.Bulk_booking')}}</el-button>
        </transition>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <div class="sut clearfix"
                ref="row"
                v-for="(item, Nameindex) in SutData"
                :key="Nameindex"
                :style="{'background': indexType === Nameindex && EditType === false ? '#409EFF' : ''}">
                <!-- 多选框 -->
                <el-checkbox v-show="SutData.length !== 0" :label="item.ID" :key="item.ID" class="checkbox_item"></el-checkbox>
                <el-tooltip class="hintText" effect="dark" place ment="top-start">
                    <div slot="content">
                        <span v-show="item.backgroud_type !== ''" :style="{color: item.backgroud_type === 'MP' ? '#ff531a' : item.backgroud_type === 'SVT' ? '#9a57cd' : item.backgroud_type === 'SIT' ? '#0070c0' : item.backgroud_type === 'SDV' ? '#92d050' : item.backgroud_type === '' ? 'f5f7fa' : '#fff',
                            fontWeight: '600',
                            fontSize: '16px'
                        }">{{item.backgroud_type}}</span>
                        <span>{{item.sutName}}</span>
                        <span v-show="item.uefi_signed !==''" :style="{color: item.uefi_signed === 'signed' ? '#90cd4f' : '#f20303', fontWeight: '600'}">_{{item.uefi_signed === 'signed' ? 'UEFI-signed' : 'UEFI-unsigned'}}_</span>
                        <span v-show="item.xcc_signed !==''" :style="{color: item.xcc_signed === 'signed' ? '#90cd4f' : '#f20303', fontWeight: '600'}">{{item.xcc_signed === 'signed' ? 'XCC-signed' : 'XCC-unsigned'}}</span>
                    </div>
                    <div class="SutName" @click='pitch(Nameindex, item)' :style="{background: item.backgroud_type == 'MP' ? '#ff531a' : item.backgroud_type == 'SVT' ? '#9a57cd' : item.backgroud_type == 'SIT' ? '#0070c0' : item.backgroud_type == 'SDV' ? '#92d050' : item.backgroud_type == '' ? 'f5f7fa' : '#fff',
                    color: item.backgroud_type === 'MP' ? '#fff' : item.backgroud_type === 'SVT' ? '#fff' : item.backgroud_type === 'SIT' ? '#fff' : item.backgroud_type === 'SDV' ? '#fff' : item.backgroud_type ? '#000' : '#000',
                    borderColor: item.backgroud_type === 'MP' ? '#ff531a' : item.backgroud_type === 'SVT' ? '#9a57cd' : item.backgroud_type === 'SIT' ? '#0070c0' : item.backgroud_type === 'SDV' ? '#92d050' : item.backgroud_type === '' ? '#e0e3e9' : '#e0e3e9'
                    }">
                    {{item.sutName}}</div>
                </el-tooltip>
                <div class="sut_date">
                    <div v-for="i in sumdate"
                        @click.stop="NotDate[Nameindex].borrList &&
                        NotDate[Nameindex].reserveList &&
                        new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                        !NotDate[Nameindex].reserveList.includes(i) &&
                        !NotDate[Nameindex].borrList.includes(i) &&
                        DataDay(item, Nameindex, i)"
                        :key="i"
                        :style="{
                            'background':NotDate[Nameindex].borrList &&
                            NotDate[Nameindex].reserveList &&
                            NotDate[Nameindex].CheckList &&
                            new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ? '#dedede' :
                            new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) || new Date(month + '-' + i).getTime() > new Date(NotDate[Nameindex].CheckList.leadtime).getTime() - (24*60*60*1000) ? '#b3d2e6' :
                            NotDate[Nameindex].reserveList.indexOf(i) > -1 ? '#FC7E7E' : NotDate[Nameindex].borrList.indexOf(i) > -1 ? '#fda000' : '',
                            'cursor':new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ? 'not-allowed':
                            new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                            new Date(month + '-' + i).getTime() > new Date(NotDate[Nameindex].CheckList.leadtime).getTime() - (24*60*60*1000) ? 'not-allowed':
                            NotDate[Nameindex].borrList && NotDate[Nameindex].reserveList && NotDate[Nameindex].reserveList.indexOf(i) > -1?
                            'not-allowed' : NotDate[Nameindex].borrList.indexOf(i) > -1 ? 'not-allowed' : ''
                            }"
                        @mouseleave="new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                        new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                        new Date(month + '-' + i).getTime() > new Date(NotDate[Nameindex].CheckList.leadtime).getTime() - (24*60*60*1000) ||
                        not && Removeclass(i, Nameindex)"
                        @mouseenter="new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                        new Date(month + '-' + i).getTime() < (new Date().getTime() - (24*60*60*1000)) ||
                        new Date(month + '-' + i).getTime() > new Date(NotDate[Nameindex].CheckList.leadtime).getTime() - (24*60*60*1000) ||
                        not && Addclass(i, Nameindex)"
                        ref="col"
                        >
                        <el-tooltip placement="top"
                            :disabled="new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                            NotDate[Nameindex].reserveList &&
                            NotDate[Nameindex].borrList &&
                            NotDate[Nameindex].CheckList &&
                            NotDate[Nameindex].reserveList.indexOf(i) > -1 ? disabled:
                            new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                            NotDate[Nameindex].borrList.indexOf(i) > -1 ? disabled :
                            new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                            new Date(month + '-' + i).getTime() > new Date(NotDate[Nameindex].CheckList.leadtime).getTime() - (24*60*60*1000) ? disabled : ''">
                                <div slot="content">
                                    <span>{{$t('Lang.public.Message.top')}}</span><br/>
                                    <a :href="`sips:<${
                                            new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                                            NotDate[Nameindex].reserveList.indexOf(i) > -1 ?
                                            NotDate[Nameindex].reserveList[NotDate[Nameindex].reserveList.indexOf(i) + 1]:
                                            NotDate[Nameindex].borrList.indexOf(i) > -1 ?
                                            new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) && NotDate[Nameindex].borrList[NotDate[Nameindex].borrList.indexOf(i) + 1] :
                                            NotDate[Nameindex].CheckList.leadname !== '' ? NotDate[Nameindex].CheckList.leadname : ''
                                        }@lenovo.com>`" class="link_Skip">
                                        {{
                                            new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                                            NotDate[Nameindex].reserveList.indexOf(i) > -1 ?
                                            NotDate[Nameindex].reserveList[NotDate[Nameindex].reserveList.indexOf(i) + 1]:
                                            NotDate[Nameindex].borrList.indexOf(i) > -1 ?
                                            NotDate[Nameindex].borrList[NotDate[Nameindex].borrList.indexOf(i) + 1] :
                                            NotDate[Nameindex].CheckList.leadname !== '' ? NotDate[Nameindex].CheckList.leadname : ''
                                        }}
                                        <span>
                                           ( {{
                                                    new Date(month + '-' + i).getTime() > (new Date().getTime() - (24*60*60*1000)) &&
                                                    NotDate[Nameindex].reserveList.indexOf(i) > -1 ?
                                                    NotDate[Nameindex].reserveList[NotDate[Nameindex].reserveList.indexOf(i) + 2]:
                                                    NotDate[Nameindex].borrList.indexOf(i) > -1 ?
                                                    NotDate[Nameindex].borrList[NotDate[Nameindex].borrList.indexOf(i) + 2] :
                                                    NotDate[Nameindex].CheckList.leadname !== '' ? NotDate[Nameindex].CheckList.display_name : ''
                                            }} )
                                        </span>
                                    </a>
                                </div>
                            <div>{{i}}</div>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
        <!-- 批量预定的表单 -->
        <el-dialog :title="$t('Lang.Views.Sut.Suts.Bulk_booking')" :visible.sync="BulkType" :before-close="handleClose">
            <el-form :model="BulkData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('Lang.public.Reservation_label.Select_Dates')">
                    <el-date-picker
                        v-model="Select_Dates"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                        :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('Lang.public.Reservation_label.Usage')" prop="usage">
                    <el-input type="textarea" v-model="BulkData.usage" rows='4' :placeholder="$t('Lang.Views.Sut.CreateReservation.please_usage')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="SubBulkType">{{$t('Lang.public.SubBtn')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 批量预定的返回提示框 -->
        <el-dialog :title="$t('Lang.Views.Sut.Suts.Bulk_result')" :visible.sync="Bult_resultType" :before-close="Bulk_Ret_val">
            <div >
                <div v-for="(value, key, index) in Bult_resultObj" :key="index">
                    <div v-show="value.length !== 0 && key !== 'success'" style="margin:10px 0;border-bottom:1px solid #dadada">
                        <span v-show="key !== 'success'">
                            {{
                                key === 'reservation_success_data' ? $t('Lang.Views.Sut.Suts.Bulk_resver_success') : key === 'reservation_booked_list' ? $t('Lang.Views.Sut.Suts.Bulk_resver_error') : $t('Lang.Views.Sut.Suts.Bulk_resver_error')
                            }}
                        </span>
                        <span v-for="(item, index) in value" :key="index" :style="{'color': key === 'reservation_success_data' ? '#67c23a' : '#fc7e7e', margin: '0 5px'}">{{item}}</span>
                        <span v-show="key !== 'reservation_success_data'">
                            {{
                                key === 'reservation_booked_list' ? $t('Lang.Views.Sut.Suts.resver_error_why') : key === 'mpo_list' ? $t('Lang.Views.Sut.Suts.Mpo_error_why')
                                : key === 'checkout_list' ? $t('Lang.Views.Sut.Suts.Check_error_why') : key === 'borrowed_list' ? $t('Lang.Views.Sut.Suts.borrowed_error_why'): ''
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
export default {
    name: 'Sut',
    props: {
        months: {
            type: String,
            default: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
        },
        sutDatas: {
            type: Array,
            default: () => []
        },
        notDates: {
            type: Array,
            default: () => []
        },
        sumdates: {
            type: Number
        },
        indexTypes: {
            type: Number
        },
        editTypes: {
            type: Boolean,
            default: true
        },
        deleteTypes: {
            type: Boolean,
            default: true
        },
        Type: {
            type: String,
            default: ''
        },
        backgroundType: {
            type: String,
            default: ''
        },
        page: {
            type: Number,
            default: 1
        },
        search: {
            type: String
        }
    },
    data() {
        return {
            Select_Dates: [new Date(new Date().getTime()).toLocaleDateString().split('/')[0] + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[1] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[1] : new Date(new Date().getTime()).toLocaleDateString().split('/')[1]) + '-' + (new Date(new Date().getTime()).toLocaleDateString().split('/')[2] < 10 ? '0' + new Date(new Date().getTime()).toLocaleDateString().split('/')[2] : new Date(new Date().getTime()).toLocaleDateString().split('/')[2]),
            new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[0] + '-' + (new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1] < 10 ? '0' + new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1] : new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1]) + '-' + ((new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2] < 10 ? '0' + new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2] : new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2]))
            ],
            month: this.months,
            SutData: this.sutDatas,
            NotDate: this.notDates,
            sumdate: this.sumdates,
            indexType: this.indexTypes,
            EditType: this.editTypes,
            DeleteType: this.deleteTypes,
            Types: this.Type,
            not: true, // 解决鼠标在移入移出是用户点的跳转报错的问题
            checkedCities: [],
            isIndeterminate: false,
            AllData: new Map(),
            allLength: 0,
            checkAll: false,
            BulkType: false,
            SubBulkType: false,
            BulkData: {
                startdatetimeStr: '',
                enddatetimeStr: '',
                usage: '',
                sutid: []
            },
            rules: {
                usage: [
                    { required: true, message: this.$t('Lang.Views.Sut.CreateReservation.please_usage'), trigger: 'blur' }
                ]
            },
            Bult_resultObj: {},
            Bult_resultType: false
        }
    },
    watch: {
        sutDatas(newVal, oldVal) { if (newVal) this.SutData = this.sutDatas; },
        months(newVal, oldVal) { if (newVal) this.month = this.months },
        notDates(newVal, oldVal) { if (newVal) this.NotDate = this.notDates },
        sumdates(newVal, oldVal) { if (newVal) this.sumdate = this.sumdates },
        indexTypes(newVal, oldVal) { if (newVal) this.indexType = this.indexTypes },
        editTypes(newVal, oldVal) { if (newVal) this.EditType = this.editTypes },
        deleteTypes(newVal, oldVal) { if (newVal) this.DeleteType = this.deleteTypes },
        page(newVal, oldVal) {
            this.page = newVal
            this.AllData.has(newVal) ? this.checkedCities = this.AllData.get(newVal) : this.checkedCities = []
            this.AllData.has(newVal) ? this.checkAll = true : this.checkAll = false
        }
    },
    computed: {
        ...mapGetters([
            'itcode'
          ])
    },
    created() {
        this.not = true
    },
    methods: {
        pitch(index, item) {
            if (this.Types === 'admin') {
                this.indexType = index
                this.EditType = false
                this.DeleteType = false
                this.$emit('Type', {
                    indexType: this.indexType,
                    EditType: this.EditType,
                    DeleteType: this.DeleteType
                })
            } else {
                this.$router.push({path: '/Details', query: {id: item.ID}})
            }
        },
        DataDay(item, BigIndex, day) {
            this.yearMonth = this.month.split('-')
            sessionStorage.ID = this.SutData[BigIndex].ID
            if (new Date(this.month + '-' + day).getTime() > new Date(this.NotDate[BigIndex].CheckList.leadtime).getTime() - (24 * 60 * 60 * 1000)) {
                this.not = true
            } else {
                this.not = false
                this.$router.push({path: '/CreateReservation', params: {crumb: 'sub'}, query: {currentDay: day, currentYear: this.yearMonth[0], currentMout: this.yearMonth[1]}})
            }
        },
        Addclass(i, Nameindex) {
            this.$refs.row[Nameindex].children[2].children[i - 1].style.background = this.NotDate[Nameindex].reserveList && this.NotDate[Nameindex].reserveList.indexOf(i) > -1 ? '#FC7E7E' : this.NotDate[Nameindex].borrList && this.NotDate[Nameindex].borrList.indexOf(i) > -1 ? '#fda000' : '#3b91ff'
        },
        Removeclass(i, Nameindex) {
            this.$refs.row[Nameindex].children[2].children[i - 1].style.background = this.NotDate[Nameindex].reserveList && this.NotDate[Nameindex].reserveList.indexOf(i) > -1 ? '#FC7E7E' : this.NotDate[Nameindex].borrList && this.NotDate[Nameindex].borrList.indexOf(i) > -1 ? '#fda000' : ''
        },
        handleCheckAllChange(val) {
            this.allLength = 0
            this.checkedCities = val ? this.SutData.map(item => item.ID) : [];
            this.isIndeterminate = false;
            val === true ? this.AllData.set(this.page, this.checkedCities) : this.AllData.delete(this.page)
            this.AllData.forEach((item) => { this.allLength += item.length })
        },
        handleCheckedCitiesChange(value) {
            this.allLength = 0
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.SutData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.SutData.length;
            this.AllData.set(this.page, this.checkedCities)
            this.AllData.forEach((item) => { this.allLength += item.length })
        },
        Bulk() {
            this.BulkType = true;
            this.AllData.forEach(item => { this.BulkData.sutid.push(...item) })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                this.BulkData.startdatetimeStr = this.Select_Dates[0];
                this.BulkData.enddatetimeStr = this.Select_Dates[1];
                if (valid) {
                    this.SubBulkType = true
                    this.AllData = new Map();
                    Api.BulkBooking({...this.BulkData}).then((res) => {
                        if (res.success === true) {
                            this.$message({
                                type: 'success',
                                message: this.$t('Lang.Views.Sut.Suts.Bulk_success'),
                                offset: 350
                            })
                            this.Bult_resultType = true;
                            this.Bult_resultObj = res;
                            this.search !== '' ? this.$parent.Search(this.page, this.search, 'user_page', this.itcode.type) : this.$parent.getshowsut(this.page);
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg,
                                offset: 350
                            })
                        }
                        this.BulkType = false;
                        this.BulkData.usage = '';
                        this.allLength = 0
                        this.BulkData.sutid = []
                        this.AllData = new Map();
                        this.checkedCities = []
                        this.SubBulkType = false;
                        this.isIndeterminate = false;
                        this.checkAll = false;
                    })
                }
            });
        },
        handleClose(done) {
            this.BulkType = false;
            this.BulkData.usage = '';
            this.BulkData.sutid = [];
        },
        Bulk_Ret_val() {
            this.Bult_resultType = false;
            this.Bult_resultObj = {}
        }
    },
    destroyed() {
        this.not = false
    }
}
</script>
<style lang="scss">
.el-tooltip__popper{
    max-width: 80% !important;
}
.sut>.checkbox_item>.el-checkbox__label{
    display: none !important;
}
</style>
<style lang="scss" scoped>
.cont{
    padding: 10px 0 30px 30px;
    >span{
        margin: 0 10px;
    }
}
.sut{
    width: 100%;
    position: relative;
    display: flex;
    font-size: 14px;
    .checkbox_item{
        position: absolute;
        top: 5px;
        left: -23px;
        .el-checkbox__label{
            display: none !important;
        }
    }
}
.hintText{
    float: left;
}
.sut_date{
    width: 91.8%;
    height: 30px;
    display: flex;
    float: left;
    user-select: none;
    >div{
        flex: 1;
        text-align: center;
        line-height: 30px;
        border: 1px solid #e0e3e9;
        transition: .2s all;
    }
}
.SutName{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #e0e3e9;
    box-sizing: border-box;
}
.noData{
    width: 100%;
    height: 50px;
    background: #ebebeb;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>
