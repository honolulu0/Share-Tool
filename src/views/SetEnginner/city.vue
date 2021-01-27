<!--
 * @Author: Duodong Hao
 * @Date: 2020-12-28 14:47:42
 * @LastEditTime: 2021-01-14 11:21:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\views\SetEnginner\city.vue
 * @component public
-->
<template>
    <div class="City">
        <span>
            <slot name="Location"></slot>
        </span>
        <div class="City_content" :style="{background: level === 1 ? '#e7505a' : level === 2 ? '#3598dc' : '#32c5d2'}">
            <span class="changeicon">
                <i :class="'el-icon-edit'" @click="Maskbj"></i>
            </span>
            <div class="C_cont">
                <img class="icon_bj" src="../../assets/img/servers1.png" v-if="type === 'children' && level === 1"/>
                <img class="icon_bj" src="../../assets/img/servers2.png" v-if="type === 'children' && level === 2"/>
                <img class="icon_bj" src="../../assets/img/servers3.png" v-if="type === 'children' && level === 3"/>
                <p class="icon_text" v-show="type === 'parent'">L{{level}}</p>
                <p class="Servers_number" :style="{width: type === 'children' ? '113px' : '125px'}">
                    <span class="ServerNumber">{{ServerNumber | serNum}}</span>
                    <span class="Sertext">Servers</span>
                </p>
            </div>
            <div class="bj_nav">
                <div class="tab_admin">
                    <div class="showAdmin" v-show="type === 'parent'">
                        {{sub_admin}}
                    </div>
                    <div class="showAdmin" v-show="engineer !== undefined && type === 'children'">
                        {{engineer !== undefined ? engineer.join(' | '):''}}
                    </div>
                    <div class="showAdmin" v-show="type === 'parent'">
                        {{ruleForm.level}}
                    </div>
                    <div class="showAdmin" v-show="type === 'children'">
                        {{ruleForm2.allocation}}
                    </div>
                </div>
                <span><i class="iconfont icon-youjiantou" @click="Gochilrden"></i></span>
            </div>
            <transition name="el-zoom-in-top">
                <div class="Mask_bj" v-show="MaskBJ">
                    <i class="el-icon-close" @click="MaskBJ = false"></i>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <span style="margin-bottom:5px;">{{$t('Lang.Views.Manage.Sites.level')}}</span><br/>
                            <el-select v-model="ruleForm.level" :placeholder="$t('Lang.Views.Manage.Sites.levelPlease')">
                                <el-option :label="$t('Lang.Views.Manage.Sites.level1')" value="1"></el-option>
                                <el-option :label="$t('Lang.Views.Manage.Sites.level2')" value="2"></el-option>
                                <el-option :label="$t('Lang.Views.Manage.Sites.level3')" value="3"></el-option>
                            </el-select>
                            <br/><span style="margin-bottom:5px;">{{$t('Lang.Views.Manage.Sites.Admin')}}</span><br/>
                            <el-select
                                v-model="sub_admin"
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
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('Lang.public.ConfirmBtn')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    name: 'City',
    props: {
        ServerNumber: {
            type: Number,
            default: 0
        },
        sub_admin: {
            type: String
        },
        level: {
            type: Number
        },
        uid: {
            type: Number
        },
        site: {
            type: String
        },
        type: {
            type: String
        },
        engineer: {
            type: Array
        },
        model: {
            type: String
        },
        lab_location: {
            type: String
        }
    },
    data() {
        return {
            loading: false,
            AppList: [],
            changeName: false,
            MaskBJ: false,
            ruleForm: {
                site: '',
                level: ''
            },
            ruleForm2: {
                allocation: ''
            }
        }
    },
    filters: {
        'serNum': (val) => {
            val = val.toFixed(2);
            val = parseFloat(val)
            val = val.toLocaleString();
            return val
        }
    },
    watch: {
        level(newVal, oldVal) { this.level = parseInt(newVal); this.ruleForm.level = parseInt(newVal) === 1 ? this.$t('Lang.Views.Manage.Sites.level1') : parseInt(newVal) === 2 ? this.$t('Lang.Views.Manage.Sites.level2') : this.$t('Lang.Views.Manage.Sites.level3') },
        model(newVal, oldVal) { this.model = newVal; this.ruleForm2.allocation = newVal === 'A' ? this.$t('Lang.Views.Manage.Sites.model1') : newVal === 'B' ? this.$t('Lang.Views.Manage.Sites.model2') : this.$t('Lang.Views.Manage.Sites.model3') }
    },
    created () {
        this.level = parseInt(this.level)
        this.ruleForm.level = this.level === 1 ? this.$t('Lang.Views.Manage.Sites.level1') : this.level === 2 ? this.$t('Lang.Views.Manage.Sites.level2') : this.$t('Lang.Views.Manage.Sites.level3');
        this.ruleForm2.allocation = this.model === 'A' ? this.$t('Lang.Views.Manage.Sites.model1') : this.model === 'B' ? this.$t('Lang.Views.Manage.Sites.model2') : this.$t('Lang.Views.Manage.Sites.model3')
    },
    methods: {
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
        change() {
            console.log(this.sub_admin);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.MaskBJ = false
                    Api.AddSite({...this.ruleForm, id: this.uid, sub_admin: this.sub_admin, type: 'update'}).then((res) => {
                        res.result === 1 && this.$message({
                            type: 'success',
                            message: this.$t('Lang.Views.Manage.Sites.Change'),
                            offset: 350
                        })
                        this.ruleForm.level = this.level === 1 ? this.$t('Lang.Views.Manage.Sites.level1') : this.level === 2 ? this.$t('Lang.Views.Manage.Sites.level2') : this.$t('Lang.Views.Manage.Sites.level3');
                        this.ruleForm2.allocation = this.model === 'A' ? this.$t('Lang.Views.Manage.Sites.model1') : this.model === 'B' ? this.$t('Lang.Views.Manage.Sites.model2') : this.$t('Lang.Views.Manage.Sites.model3')
                        this.$parent.getData();
                    })
                }
            });
        },
        Gochilrden() {
            if (this.type === 'parent') {
                this.$router.push({path: '/City', query: {site: this.site, level: this.level}})
            } else {
            }
        },
        Maskbj() {
            if (this.type === 'parent') {
                this.MaskBJ = true
            } else {
                this.$emit('Close', {type: true, change: 'change', cid: this.uid, engineer: this.engineer, model: this.model, lab_location: this.lab_location})
            }
        }
    }
}
</script>
<style lang="scss">
.City{
    width: 287px;
    height: 185px;
    float: left;
    margin: 5px 14px;
    position: relative;
    >span{
        width: 100%;
        height: 40px;
        line-height: 35px;
        text-indent: 1em;
        font-size: 23px;
        display: inline-block;
    }
    .City_content{
        width: 100%;
        height: 145px;
        background: red;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        .changeicon{
            position: absolute;
            width: 120px;
            height: 120px;
            right: -60px;
            top: -60px;
            transform: scale(0);
            border-radius: 50%;
            background: rgba(0,0,0, .1);
            transition: .5s;
            line-height: 175px;
            text-indent: 1em;
            >i{
                font-size: 20px;
                color: #ecf0f1;
                cursor: pointer;
            }
        }
        .C_cont{
            .icon_bj{
                display: inline-block;
                transform: scale(.7);
                transition: .5s;
            }
            .icon_text{
                margin: 20px 0 0 20px;
                display: inline-block;
                font-size: 60px;
                font-weight: 600;
                color: rgba(0,0,0, .1);
                transition: .5s;
            }
            .Servers_number{
                width: 125px;
                height: 100px;
                display: inline-block;
                float: right;
                padding-top: 20px;
                >span:nth-of-type(1){
                    font-size: 40px;
                    display: block;
                    text-align: center;
                    color: #fff;
                    font-weight: 600;
                }
                >span:nth-of-type(2){
                    font-size: 20px;
                    font-weight: 600;
                    color: #ecf0f1;
                }
            }
            &:hover .icon_bj{
                transform: scale(1);
            }
            &:hover .icon_text{
                transform: scale(1.3);
            }
        }
        .bj_nav{
            width: 100%;
            height: 30px;
            background: rgba(0,0,0, .05);
            position: absolute;
            bottom: 0px;
            transition: .5s;
            >span{
                float: right;
                margin: 1px 5px 0 0;
                &:hover{
                    cursor: pointer;
                }
                >i{
                    color: #f2f5f5;
                    font-size: 25px;
                }
            }
            .tab_admin{
                display: inline-block;
                .showAdmin{
                    height: 30px;
                    color: #f2f5f5;
                    float: left;
                    margin-left: 10px;
                    line-height: 30px;
                    margin-right: 10px;
                }
                >div{
                    float: left;
                    margin-left: 10px;
                    >div{
                        >input{
                            background: transparent !important;
                            border: none !important;
                            height: 30px !important;
                            padding: 0 !important;
                            color: #f2f5f5 !important;
                            &::-webkit-input-placeholder{
                                color: #f2f5f5 !important;
                            }
                        }
                    }
                }
                >i{
                    font-size: 16px;
                    color: #f2f5f5;
                    margin-top: 7px;
                }
            }
            &:hover{
                background: rgba(0,0,0, .1);
            }
        }
        .Mask_bj{
            width: 100%;
            height: 100%;
            float: left;
            border-radius: 5px;
            background: #f5f7fa;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 000;
            border: 1px solid #ccc;
            box-sizing: border-box;
            padding-left: 10px;
            >i{
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 18px;
                cursor: pointer;
            }
            >form>div:nth-of-type(2), >form>div:nth-of-type(1) {
                margin-top: 5px !important;
            }
            >form>div:nth-of-type(3){
                text-align: right !important;
                >div{
                    top: -40px !important;
                    right: 5px !important;
                    >button{
                        padding: 12px 10px !important;
                    }
                }
            }
        }
        &:hover .changeicon{
            transform: scale(1);
        }
    }
}
@media screen and (min-width: 1920px) {
    .City{
        width: 287px;
        height: 185px;
        float: left;
        margin: 0 20px;
        position: relative;
    }
}
@media only screen and (max-width: 1536px) {
   .City{
        width: 287px;
        height: 185px;
        float: left;
        margin: 0 14px;
        position: relative;
    }
}
</style>
