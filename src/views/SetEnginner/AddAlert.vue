<!--
 * @Author: Guodong Hao
 * @Date: 2020-12-29 09:46:09
 * @LastEditTime: 2021-01-18 11:21:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\views\SetEnginner\AddAlert.vue
-->
<template>
    <div class="AddAlert">
        <el-dialog :title="type === 'parent' ? $t('Lang.Views.Manage.Sites.AddCity') : type === 'children' && change === '' ? $t('Lang.Views.Manage.Sites.AddLab') : $t('Lang.Views.Manage.Sites.ChangeBal')" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'parent'" :label-position="'top'">
                <el-form-item :label="$t('Lang.Views.Manage.Sites.SiteName')" prop="site">
                    <el-input v-model="ruleForm.site" :placeholder="$t('Lang.Views.Manage.Sites.sitename')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Sites.level')" prop="level">
                    <el-select v-model="ruleForm.level" :placeholder="$t('Lang.Views.Manage.Sites.levelPlease')">
                    <el-option :label="$t('Lang.Views.Manage.Sites.level1')" value="1"></el-option>
                    <el-option :label="$t('Lang.Views.Manage.Sites.level2')" value="2"></el-option>
                    <el-option :label="$t('Lang.Views.Manage.Sites.level3')" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Sites.Admin')" prop="sub_admin">
                    <el-select
                        v-model="ruleForm.sub_admin"
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
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('Lang.public.ConfirmBtn')}}</el-button>
                </el-form-item>
            </el-form>
            <!-- ------------------------------------------------------------------------------------------------------- -->
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="type === 'children'" :label-position="'top'">
                <el-form-item :label="$t('Lang.Views.Manage.Sites.laboratory')" prop="lab_location" v-if="change === ''">
                    <el-input v-model="ruleForm2.lab_location" :placeholder="$t('Lang.Views.Manage.Sites.cityname')"></el-input>
                </el-form-item>
                <el-form-item  v-else></el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Sites.allocation')" prop="allocation">
                    <el-select v-model="ruleForm2.allocation" :placeholder="$t('Lang.Views.Manage.Sites.patternPl')">
                        <el-option :label="$t('Lang.Views.Manage.Sites.model1')" value="A"></el-option>
                        <el-option :label="$t('Lang.Views.Manage.Sites.model2')" value="B"></el-option>
                        <el-option :label="$t('Lang.Views.Manage.Sites.model3')" value="C"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Lang.Views.Manage.Sites.engineers')" prop="engineer">
                    <el-select v-model="ruleForm2.engineer" multiple :placeholder="$t('Lang.Views.Manage.Sites.engineer')">
                        <el-option
                        v-for="item in options"
                        :key="item.itcode"
                        :label="item.itcode"
                        :value="item.itcode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2('ruleForm2')">{{$t('Lang.public.ConfirmBtn')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    name: 'Alert',
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String
        },
        multi: {
            type: Boolean
        },
        site: {
            type: String
        },
        change: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
             ruleForm: {
                site: '',
                level: '',
                sub_admin: ''
            },
            ruleForm2: {
                lab_location: '',
                allocation: '',
                engineer: [],
                site: ''
            },
            rules: {
                site: [
                    { required: true, message: this.$t('Lang.Views.Manage.Sites.sitename'), trigger: 'blur' }
                ],
                level: [
                    { required: true, message: this.$t('Lang.Views.Manage.Sites.level'), trigger: 'change' }
                ],
                sub_admin: [
                    { required: true, message: this.$t('Lang.Views.Login.p_itcode'), trigger: 'change' }
                ]
            },
            rules2: {
                lab_location: [
                    { required: true, message: this.$t('Lang.Views.Manage.Sites.cityname'), trigger: 'blur' }
                ],
                allocation: [
                    { required: true, message: this.$t('Lang.Views.Manage.Sites.allocation'), trigger: 'change' }
                ],
                engineer: [
                    { required: true, message: this.$t('Lang.Views.Manage.Sites.engineer'), trigger: 'change' }
                ]
            },
            loading: false,
            AppList: [],
            options: []
        }
    },
    created() {
        this.ruleForm2.site = this.site;
        this.type === 'children' && this.GetAssig();
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
                this.AppList = [];
            }
        },
        handleClose() {
            this.$emit('Close', {type: false})
            this.ruleForm2.lab_location = '';
            this.ruleForm2.allocation = '';
            this.ruleForm2.engineer = [];
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('Close', {type: false})
                    Api.AddSite({...this.ruleForm, type: 'add'}).then((res) => {
                        this.$message({
                            type: res.result === 1 ? 'success' : 'error',
                            message: res.result === 1 ? this.$t('Lang.Views.Manage.Sites.created') : res.errMsg,
                            offset: 350
                        })
                        this.$parent.getData();
                        this.ruleForm = {site: '', level: '', sub_admin: ''}
                    })
                }
            });
        },
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm2.allocation);
                    this.ruleForm2.allocation = ['Allocation', '轮流分配', '輪流分配', 'A'].includes(this.ruleForm2.allocation) === true ? 'A' : ['Manually specified', '手工指定', '手工指定', 'B'].includes(this.ruleForm2.allocation) === true ? 'B' : 'C'
                    // this.ruleForm2.allocation = this.ruleForm2.allocation === this.$t('Lang.Views.Manage.Sites.model1') ? 'A' : this.ruleForm2.allocation === this.$t('Lang.Views.Manage.Sites.model2') ? 'B' : 'C'
                    this.$emit('Close', {type: false})
                    Api.AddLab({...this.ruleForm2, type: this.change === '' ? 'add' : 'update'}).then((res) => {
                        res.result === 1 && this.$message({
                            type: 'success',
                            message: this.change === '' ? this.$t('Lang.Views.Manage.Sites.Change') : this.$t('Lang.Views.Manage.Sites.created '),
                            offset: 350
                        })
                        this.$parent.GetLab(this.site);
                        console.log(this.options);
                        this.ruleForm2.lab_location = '';
                        this.ruleForm2.allocation = '';
                        this.ruleForm2.engineer = [];
                        this.GetAssig()
                    })
                }
            });
        },
        GetParent(cid, engineer, model, location) {
            this.ruleForm2.lab_location = location
            this.ruleForm2.allocation = model === 'A' ? this.$t('Lang.Views.Manage.Sites.model1') : model === 'B' ? this.$t('Lang.Views.Manage.Sites.model2') : this.$t('Lang.Views.Manage.Sites.model3')
            this.ruleForm2.engineer = engineer
            this.ruleForm2.id = cid
        },
        GetAssig() {
            Api.getEngineer({my_location: this.ruleForm2.site}).then((res) => {
                this.options = res
            })
        }
    }
}
</script>
<style lang="scss">
.AddAlert>div>div>div:nth-of-type(2)>form>div:nth-of-type(3)>div>div{
    width: 330px !important;
}
.AddAlert>div>div>div:nth-of-type(2)>form>div:nth-of-type(2)>div>div{
    width: 330px !important;
}
</style>
