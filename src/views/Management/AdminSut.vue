<template>
    <div class="container">
        <div class="Admin_sut_header">
            <div class="action">
                <el-button type="primary" @click="AddSut">{{$t('Lang.public.Add')}}</el-button>
                <el-button type="primary" :disabled='EditType' @click="EditChange">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                <el-button type="primary" :disabled='DeleteType' @click="Delete">{{$t('Lang.public.DeBtn')}}</el-button>
            </div>
            <div class="dateSearch">
                <el-date-picker
                    v-model="month"
                    type="month"
                    class="picker"
                    value-format="yyyy-MM"
                    @change="changeMonth"
                    :clearable='false'
                    :placeholder="$t('Lang.Views.Sut.Suts.Select_month')">
                </el-date-picker>
                <el-input
                :placeholder="placType"
                v-model="search"
                class="input-with-select search"
                clearable
                @focus="placType = ''"
                @blur="placType = 'eg.SR670 128GB 48TB'"
                @change="Search(PageIndex, search, 'admin_page', itcode.type)">
                </el-input>
                 <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="Search(PageIndex, search, 'admin_page', itcode.type)"></el-button>
            </div>
        </div>
        <!-- color -->
        <ColorType></ColorType>
        <transition name="el-fade-in">
            <div v-show="text!==''" class="noData">{{text}}</div>
        </transition>
        <Sut
        :months="month"
        :sutDatas="SutData"
        :notDates="NotDate"
        :sumdates="sumdate"
        :indexTypes="indexType"
        :editTypes="EditType"
        :deleteTypes="DeleteType"
        :Type="'admin'"
        @Type="Types($event)"
        ></Sut>
         <!-- 分页组件 -->
        <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
        </el-pagination>
        <!-- 添加一台机器 -->
        <el-dialog :title="$t('Lang.Views.Manage.Admin_sut.Add_SUT')" :visible.sync="dialogFormVisible" width='50%'>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Release')" prop="release" class="release">
                        <el-select v-model="ruleForm.release" :placeholder="$t('Lang.Views.Manage.Admin_sut.Pl_select')">
                            <el-option
                            v-for='(item, index) in releaseList'
                            :key="index"
                            :label="item"
                            :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Code_Name')" prop="codeName" class="codeName">
                        <el-select
                            v-model="ruleForm.codeName"
                            filterable
                            allow-create
                            default-first-option
                            :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')">
                            <el-option
                            v-for='(item, index) in codeNameList'
                            :key="index"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Sut_Name')" prop="sutName" class="sutNameItem clearfix" label-width="100px">
                        <el-input v-model="ruleForm.sutName" placeholder="Please input"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Jurisdiction')" prop="Jurisdiction">
                        <el-checkbox v-model="ruleForm.sutType">{{$t('Lang.Views.Manage.Admin_sut.Jurisdiction')}}</el-checkbox>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Sit')" prop="lablocation" class="locations">
                        <el-select v-model="ruleForm.lablocation" filterable :placeholder="$t('Lang.Views.Manage.Admin_sut.Pl_select')">
                            <el-option
                            v-for='(item, index) in locationList'
                            :key="index"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                        <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Lab')" prop="Lab">
                            <el-input v-model="ruleForm.Lab" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Rack')" prop="Rack">
                            <el-input v-model="ruleForm.Rack" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Slot')" prop="slot">
                            <el-input v-model="ruleForm.slot" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.SN')" prop="sutSN" class="SN clearfix">
                        <el-input v-model="ruleForm.sn" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Armory')" prop="armory" class="armory clearfix">
                        <el-input v-model="ruleForm.armory" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.SUT_IP')" prop="sutip" class="SutIP clearfix">
                        <el-input v-model="ruleForm.sutip" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.XCC_USER')" prop="user" class="XCCuser clearfix">
                        <el-input v-model="ruleForm.user" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.XCC_PW')" prop="pw" class="XCCPw clearfix">
                        <el-input v-model="ruleForm.pw" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Configuration')" prop="configuration" class="textarea clearfix">
                        <el-input type="textarea" v-model="ruleForm.configuration" rows='5' :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="AddSub('ruleForm')">{{$t('Lang.Views.Manage.Admin_sut.Save')}}</el-button>
                        <el-button @click="resetForm('ruleForm')">{{$t('Lang.public.CloseBtn')}}</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
        <!-- 修改对应的机器 -->
        <el-dialog :title="$t('Lang.Views.Manage.Admin_sut.Edit_SUT')" :visible.sync="changeFormVisible" width='50%'>
                <el-form  :model="ChangeruleForm" :rules="rules" ref="ChangeruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Release')" prop="release" class="release clearfix">
                    <el-select v-model="ChangeruleForm.release" :placeholder="$t('Lang.Views.Manage.Admin_sut.Pl_select')">
                        <el-option
                        v-for='(item, index) in releaseList'
                        :key="index"
                        :label="item"
                        :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Code_Name')" prop="codeName" class="codeName clearfix">
                    <el-select
                        v-model="ChangeruleForm.codeName"
                        filterable
                        allow-create
                        default-first-option
                        :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')">
                        <el-option
                        v-for='(item, index) in codeNameList'
                        :key="index"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                </el-form-item>
                 <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Sut_Name')"
                        allow-create prop="sutName" class="sutNameItem clearfix" label-width="100px">
                    <el-input v-model="ChangeruleForm.sutName" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Jurisdiction')" allow-create prop="Jurisdiction">
                    <el-checkbox v-model="ChangeruleForm.sutType">Jurisdiction</el-checkbox>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Sit')" allow-create prop="lablocation" class="locations">
                    <el-select v-model="ChangeruleForm.lablocation" filterable :placeholder="$t('Lang.Views.Manage.Admin_sut.Pl_select')">
                        <el-option
                        v-for='(item, index) in locationList'
                        :key="index"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Lab')" prop="Lab">
                            <el-input v-model="ChangeruleForm.Lab" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Rack')" prop="Rack">
                        <el-input v-model="ChangeruleForm.Rack" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Slot')" prop="slot">
                        <el-input v-model="ChangeruleForm.slot" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.SN')" prop="sutSN" class="SN clearfix">
                    <el-input v-model="ChangeruleForm.sn" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Armory')" prop="armory" class="armory clearfix">
                    <el-input v-model="ChangeruleForm.armory" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.SUT_IP')" prop="sutip" class="SutIP clearfix">
                    <el-input v-model="ChangeruleForm.sutip" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.XCC_USER')" prop="user" class="XCCuser clearfix">
                    <el-input v-model="ChangeruleForm.user" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.XCC_PW')" prop="pw" class="XCCPw clearfix">
                    <el-input v-model="ChangeruleForm.pw" :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Admin_sut.Configuration')" prop="configuration" class="textarea clearfix">
                    <el-input type="textarea" v-model="ChangeruleForm.configuration" rows='5' :placeholder="$t('Lang.Views.Manage.Admin_sut.plinput')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeFrom('ChangeruleForm')">{{$t('Lang.Views.Manage.Admin_sut.Save')}}</el-button>
                    <el-button @click="resetchangeForm('ChangeruleForm')">{{$t('Lang.public.CloseBtn')}}</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import {pastDate, getLastDay, SearchAPI} from '../../components/publicJS/Sut'
import Sut from '../../components/sut/SutDate'
import ColorType from '../../components/sut/ColorType'
import store from '../../store/store'
export default {
    components: {
        Sut, ColorType
    },
    data() {
        return {
            month: new Date().getFullYear() + '-' + (new Date().getMonth() + 1), // 时间框的绑定值
            yearMonth: [], // 传入年份和月份
            sumdate: '', // 每个月最后一天
            SutData: [], // 展示所有的机器
            search: '',
            EditType: true,
            DeleteType: true,
            indexType: '',
            PageIndex: 1, // 当前下标
            Allpage: '',
            dialogFormVisible: false,
            changeFormVisible: false,
            rules: {
            codeName: [
                { required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_codeName'), trigger: 'change' },
                { min: 3, max: 999, message: this.$t('Lang.Views.Manage.Admin_sut.rules.Min_length'), trigger: 'blur' }
            ],
            sutName: [
                {required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_SutName'), trigger: 'blur'}
            ],
            release: [
                { required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_release'), trigger: 'change' }
            ],
            lablocation: [
                { required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_location'), trigger: 'change' }
            ],
            Lab: [
                {required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_lab'), trigger: 'blur'}
            ],
            Rack: [
                {required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_Rack'), trigger: 'blur'}
            ],
            slot: [
                {required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.P_solt'), trigger: 'blur'}
            ],
            configuration: [
                { required: true, message: this.$t('Lang.Views.Manage.Admin_sut.rules.please_Configuration'), trigger: 'blur' }
            ]
            },
            ruleForm: {
                codeName: '',
                sutName: '',
                release: '',
                lablocation: '',
                Rack: '',
                slot: '',
                configuration: '',
                sn: '',
                armory: '',
                sutip: '',
                user: '',
                pw: '',
                Lab: '',
                sutType: false
            },
            ChangeruleForm: {
                codeName: '',
                sutName: '',
                release: '',
                lablocation: '',
                Rack: '',
                slot: '',
                configuration: '',
                sn: '',
                armory: '',
                sutip: '',
                user: '',
                pw: '',
                ID: '',
                Lab: '',
                sutType: false
            },
            releaseList: [],
            locationList: [],
            codeNameList: [],
            placType: 'eg.SR670 128GB 48TB',
            NotDate: [],
            sutTypeJude: true,
            text: ''
        }
    },
    created() {
        store.commit('SET_LOADING2', true)
        this.changeMonth()
        this.getshowsut()
    },
    computed: {
        ...mapGetters([
            'itcode'
          ])
    },
    methods: {
        changeMonth() {
            this.$set(this, 'month', this.month)
            this.yearMonth = this.month.split('-')
            this.sumdate = getLastDay(this.yearMonth[0], this.yearMonth[1])
            this.NotDate = pastDate(this.SutData, this.yearMonth[1], this.yearMonth[0])
        },
        getshowsut(page) {
            Api.getShowSut({page, user_page: 'admin_page'}).then((res) => {
                if (res.success === true) {
                    this.SutData = res.sut_data
                    this.Allpage = res.all_page
                    this.releaseList = res.deviceRelease
                    this.locationList = res.site_list
                    this.codeNameList = res.CodeName
                    this.NotDate = pastDate(res.sut_data, this.yearMonth[1], this.yearMonth[0])
                    store.commit('SET_LOADING2', false)
                }
            })
        },
        Types(data) {
            this.indexType = data.indexType
            this.EditType = data.EditType
            this.DeleteType = data.DeleteType
        },
        Search(page, search, user, itcode) {
            let than = this;
            SearchAPI(page, search, user, itcode, than).then(res => {
                this.$set(this, 'text', res.text)
                this.SutData = res.SutData;
                this.Allpage = res.Allpage
            })
        },
        AddSut() { // 添加一个机器的信息
            this.dialogFormVisible = true
        },
        currentPages(val) {
            this.PageIndex = val
            this.search === '' ? this.getshowsut(val) : this.Search(val, this.search, 'admin_page', this.itcode.type);
        },
        prev_click(val) {
            this.PageIndex = val
            this.search === '' ? this.getshowsut(val) : this.Search(val, this.search, 'admin_page', this.itcode.type);
        },
        next_click(val) {
            this.PageIndex = val
            this.search === '' ? this.getshowsut(val) : this.Search(val, this.search, 'admin_page', this.itcode.type);
        },
        AddSub(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.ruleForm.sutType = this.ruleForm.sutType === true ? 'dedicatehide' : ''
                Api.Addrelease({...this.ruleForm, action: 'add'}).then((res) => {
                    if (res.success === true) {
                        this.$message({
                            message: this.$t('Lang.Views.Manage.Admin_sut.Add_succ'),
                            type: 'success',
                            offset: 350
                        });
                        this.getshowsut(this.PageIndex);
                    } else {
                        this.$message({
                            message: res.Msg,
                            type: 'error',
                            offset: 350
                        });
                    }
                })
                this.dialogFormVisible = false
            }
        });
    },
    resetForm(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
    },
    resetchangeForm(ChangeruleForm) {
        this.changeFormVisible = false
    },
    EditChange() {
        this.changeFormVisible = true
        Api.Changerelease({ID: this.SutData[this.indexType].ID}).then((res) => {
            this.ChangeruleForm = {
                codeName: res.sut_data.codename,
                sutName: res.sut_data.sutName,
                release: res.sut_data.release,
                lablocation: res.sut_data.lablocation,
                Rack: res.sut_data.rack,
                slot: res.sut_data.slot,
                configuration: res.sut_data.config,
                sn: res.sut_data.sn,
                armory: res.sut_data.armory,
                sutip: res.sut_data.ip,
                user: res.sut_data.user,
                pw: res.sut_data.pw,
                ID: res.sut_data.ID,
                Lab: res.sut_data.lab,
                sutType: res.sut_data.sutType === 'dedicatehide' ? this.sutTypeJude : false
            }
        })
    },
    changeFrom(ChangeruleForm) {
        this.$refs[ChangeruleForm].validate((valid) => {
        if (valid) {
            this.ChangeruleForm.sutType = this.ChangeruleForm.sutType === true ? 'dedicatehide' : ''
            Api.Addrelease({...this.ChangeruleForm, action: 'update'}).then((res) => {
                if (res.success === true) {
                    this.$message({
                        message: this.$t('Lang.Views.Manage.Admin_sut.chan_succ'),
                        type: 'success',
                        offset: 350
                    });
                    this.getshowsut(this.PageIndex);
                } else {
                    this.$message({
                        message: res.Msg,
                        type: 'error',
                        offset: 350
                    });
                }
            })
                this.changeFormVisible = false
            }
        });
    },
    Delete() {
        this.$confirm(this.$t('Lang.Views.Manage.Admin_sut.delete_sut'), 'Hint', {
                confirmButtonText: this.$t('Lang.Views.Support.MyReq_allReq.OK'),
                cancelButtonText: this.$t('Lang.public.CancelBtn'),
                type: 'warning',
                center: true
            }).then(() => {
                Api.Addrelease({ID: this.SutData[this.indexType].ID, action: 'delete'}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: this.$t('Lang.public.Message.delete'),
                        offset: 350
                    });
                    this.getshowsut(this.PageIndex);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('Lang.Views.Manage.Admin_sut.Undeleted'),
                    offset: 350
                });
            });
        }
    }
}
</script>
<style lang="scss">
// .clearfix::after,.clearfix::before{
//     content: '';
//     clear: both;
//     display: block;
// }
// .clearfix{
//     zoom: 1;
// }
// .Admin_sut_header{
//     width: 100%;
//     height: 60px;
//     margin-bottom: 20px;
//     >div:nth-of-type(1){
//         float: right;
//         >button{
//             width: 80px !important;
//             height: 50px !important;
//             >span{
//                 font-size: 17px !important;
//             }
//         }
//     }
//     >div:nth-of-type(2){
//         width: 800px !important;
//         height: 100% !important;
//         display: flex;
//         margin: auto;
//         >div:nth-of-type(1){
//             input{
//                 height: 100% !important;
//                 border-radius: 0px !important;
//                 border-top-left-radius: 5px !important;
//                 border-bottom-left-radius: 5px !important;
//                 text-align: center;
//             }
//             .el-input__icon{
//                 font-size: 20px !important;
//                 line-height: 60px !important;
//             }
//         }
//         .searchBtn{
//             width: 70px !important;
//             height: 100% !important;
//             border-top-left-radius: 0 !important;
//             border-bottom-left-radius: 0 !important;
//             >i{
//                 font-size: 20px !important;
//             }
//         }
//         >div:nth-of-type(2){
//             input:nth-of-type(1){
//                 height: 100% !important;
//                 border-radius: 0px !important;
//             }
//             .el-input__icon{
//                 font-size: 20px !important;
//                 line-height: 60px !important;
//             }
//         }
//     }
// }
// .search>input::-webkit-input-placeholder{
//     color: #333 !important;
// }
// .top {
//     text-align: center;
// }
// .locations{
//     margin-bottom: 32px !important;
// }
// .locations>div{
//     display: flex !important;
// }
// .locations>div>div{
//     float: left !important;
// }
// .locations .el-form-item{
//     width: 35% !important;
//     float: left !important;
// }
// .locations .el-form-item__label{
//     width: 70px !important;
// }
// .locations .el-form-item__content{
//     margin-left: 70px !important;
// }
// // .locations>label{
// //     width: 100px !important;
// // }
// // .locations>.el-form-item__label{
// //     width: 100px !important;
// // }
// // .locations>.el-form-item__content{
// //     margin-left: 100px !important;
// // }
// .locations .el-select{
//     width: 30% !important;
// }
// .SN,.armory,.SutIP,.XCCuser{
//     width: 50% !important;
//     float: left !important;
//     height: 40px !important;
// }
// .XCCPw {
//     width: 100% !important;
// }
// .textarea>label{
//     width: 124px !important;
// }
// .textarea>div{
//     margin-left: 124px !important;
// }
// .textarea{
//     width: 100% !important;
// }
// .release,.codeName{
//     width: 49% !important;
//     display: inline-block !important;
// }
// .codeName>label{
//     width: 105px !important;
// }
// .sutName{
//     width: 100%;
// }
// .link_Skip{
//     color: #fff;
// }
// .el-date-picker__header-label{
//     color: #606266 !important;
// }
// .sutNameItem{
//     width: 100% !important;
// }
</style>
