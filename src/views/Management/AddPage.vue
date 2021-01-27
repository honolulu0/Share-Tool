<template>
    <div>
         <!-- 添加一台机器 -->
      <el-card title="Add SUT">
        <router-link class="back"  to="/Hardware"><i class="el-icon-arrow-left"></i>Back</router-link>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="rowO">
                <el-form-item :label="$t('Lang.Views.Manage.AddPage.SutName')" prop="sutName">
                    <el-input v-model="ruleForm.sutName" placeholder="please input" class="nameInput"></el-input>
                </el-form-item>
            </div>
          <div class="rowOne">
          <el-form-item :label="$t('Lang.Views.Manage.AddPage.Release')" prop="release" class="clearfix">
                <el-select v-model="ruleForm.release" placeholder="please select">
                    <el-option
                    v-for='(item, index) in releaseList'
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.SUT_IP')" prop="sutip" class="clearfix">
                <el-input v-model="ruleForm.sutip" placeholder="please input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.SN')" prop="sutSN" class="clearfix">
                <el-input v-model="ruleForm.sn" placeholder="please input"></el-input>
            </el-form-item>
            <!-- <el-form-item label="Sut Name:" prop="sutName" class="clearfix">
                <el-input v-model="ruleForm.sutName" placeholder="please input" class="nameInput"></el-input>
            </el-form-item> -->
          </div>
          <div class="rowThree">
            <!-- select联级选项框 -->
            <div class="clearfix" style="display: flex;">
                <p class="demonstration" style="width:100px;font-size: 17px;height:40px;line-height:40px;">{{$t('Lang.Views.Manage.AddPage.SiteLabRack')}}</p>
                    <el-cascader
                    placeholder="please select"
                    v-model="ruleForm.options"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange">
                    </el-cascader>
            </div>
          <!-- selectover -->
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.Slot')" prop="slot">
                <el-input v-model="ruleForm.slot" placeholder="please input"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('Lang.Views.Manage.AddPage.Armory')" prop="armory" class="clearfix">
                <el-input v-model="ruleForm.armory" placeholder="please input"></el-input>
            </el-form-item> -->
            <el-form-item prop="armory" :label="$t('Lang.Views.Manage.AddPage.Armory')">
                <el-select
                    prop="armory"
                    v-model="ruleForm.armory"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter the keywords"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in yuanoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
          </div>
          <div class="rowFive">
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.Code_Name')" prop="codeName" class="clearfix">
                <el-select
                    v-model="ruleForm.codeName"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="please select">
                    <el-option
                    v-for='(item, index) in codeNameList'
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.XCC_USER')" prop="user" class="clearfix">
                <el-input v-model="ruleForm.user" placeholder="please input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Lang.Views.Manage.AddPage.XCC_PW')" prop="pw" class="clearfix">
                <el-input v-model="ruleForm.pw" placeholder="please input"></el-input>
            </el-form-item>
          </div>
          <div class="rowSix">
              <!-- mpo联级 -->
            <!-- <el-form-item class="main"  style="width: 33%;" prop="owner" :label="$t('Lang.Views.Manage.AddPage.Main_Polling_Owner')">
              <el-cascader
                placeholder="please select"
                v-model="ruleForm.mpo"
                :options="mpooptions"
                :props="{ expandTrigger: 'hover' }"
                @change="mpoChange"></el-cascader>
          </el-form-item> -->
          <!-- <el-form-item :label="$t('Lang.Views.Manage.AddPage.Main_Polling_Owner')" prop="pw" class="clearfix">
                <el-input v-model="ruleForm.mpo" placeholder="please input"></el-input>
            </el-form-item> -->
            <el-form-item class="main"  style="width: 33%;" prop="owner" :label="$t('Lang.Views.Manage.AddPage.Main_Polling_Owner')">
                <el-select
                    prop="owner"
                    v-model="ruleForm.owner"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter the keywords"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in yuanoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="main" prop="backgroud_type" :label="$t('Lang.Views.Manage.project.phase')">
            <el-select v-model="ruleForm.backgroud_type" placeholder="please select">
                <el-option
                v-for="item in phaseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value" style="text-align:center">
                </el-option>
            </el-select>
        </el-form-item>
          <el-form-item style="width: 33%;">
                <el-checkbox v-model="ruleForm.lockBox" style="font-size:17px">Lock</el-checkbox>
        </el-form-item>
          <!-- <el-form-item  style="width: 33%;">
              <el-tooltip class="item" effect="dark" content="勾选需填写正确的IP、XCC user、XCC Password" placement="bottom">
                <el-checkbox v-model="ruleForm.checked" style="font-size:17px">{{$t('Lang.Views.Manage.AddPage.AddedtotheLXCA')}}</el-checkbox>
              </el-tooltip>
        </el-form-item> -->
          </div>
            <el-form-item>
                <el-button type="primary" @click="AddSub('ruleForm')">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>
<script>
    import * as Api from '@/api/api'
    export default {
        data() {
            return {
                yuanoptions: [],
                value: [],
                list: [],
                loading: false,
                states: [],
                job_id: '',
                options: [],
                // mpooptions: [],
                phaseOptions: [{
                value: 'BBFV',
                label: 'BBFV'
                }, {
                value: 'SDV',
                label: 'SDV'
                }, {
                value: 'SIT',
                label: 'SIT'
                }, {
                value: 'SVT',
                label: 'SVT'
                }, {
                value: 'MP',
                label: 'MP'
                }],
                formLabelWidth: '120px',
                ruleForm: { // 添加内容
                    // mpo: '',
                    // options: [],
                    codeName: '',
                    sutName: '',
                    release: '',
                    lablocation: '',
                    site: '',
                    sn: '',
                    armory: '',
                    owner: '',
                    sutip: '',
                    user: '',
                    pw: '',
                    backgroud_type: '',
                    // checked: false,
                    lockBox: true, // 默认为勾选状态
                    sutID: ''
                },
            releaseList: [],
            siteList: [],
            labList: [],
            // locationList: [],
            codeNameList: [],
            rules: {
            codename: [
                { required: true, message: 'Please select the codeName', trigger: 'change' }
                // { min: 3, max: 999, message: 'Minimum three characters in length', trigger: 'blur' }
            ],
            sutName: [
                {required: true, message: 'Please enter the SutName', trigger: 'blur'}
            ],
            release: [
                { required: true, message: 'Please select the release', trigger: 'change' }
            ],
            slot: [
                {required: true, message: 'Please enter the solt', trigger: 'blur'}
            ],
            backgroud_type: [
                {required: true, message: 'Please select the Phase', trigger: 'change'}
            ],
            owner: [
                {required: true, message: 'Please enter the MPO', trigger: 'blur'}
            ]
            }
        }
        },
        created() {
            this.getshowsut()
            this.handleChange()
        },
        // 远程搜索
        mounted() {
        this.list = this.states.map(item => {
            return { value: `value:${item}`, label: `label:${item}` };
        });
        },
        methods: {
            getshowsut() {
                Api.getShowSut().then((res) => {
                    if (res.success === true) {
                        this.releaseList = res.deviceRelease
                        this.siteList = res.site_list
                        this.labList = res.lab_list
                        this.codeNameList = res.CodeName
                    }
                })
            },
            // 远程搜索
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    Api.getMpoInput({name: query}).then((res) => {
                        this.list = res
                        this.loading = false;
                        this.yuanoptions = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                    } else {
                    this.yuanoptions = [];
                }
            },
            // mpoInput() {
            // Api.getMpoInput().then((res) => {
            //     this.states = res
            //     console.log(this.states)
            // })
            // },
            // save保存按钮触发
            // 选择把机台添加进LXCA路由跳转传job_id
            // goHardware(id) {
            //     this.$router.push({path: '/Hardware', query: {job_id: id}})
            // },
            AddSub(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    Api.Addrelease({...this.ruleForm, action: 'add'}).then((res) => {
                        if (res.success === true) {
                            this.sutID = res.ID
                            this.$message({
                                message: 'Add server successfully',
                                type: 'success',
                                offset: 350
                            });
                            // if (this.ruleForm.checked === false) {
                                this.$router.push({path: '/Hardware'})
                            // } else {
                            //     this.addForce(this.ruleForm.checked)
                            // }
                        } else {
                            this.$message({
                                message: res.Msg,
                                type: 'error',
                                offset: 350
                            });
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // site/lab/rack联级选项框
        handleChange() {
            Api.getSelected().then((res) => {
                if (res.success === true) {
                    this.options = res.data
                }
            })
        }
        // 机台添加进LXCA
        // addForce(force) {
        //     Api.addForce({pw: this.ruleForm.pw, ip: this.ruleForm.sutip, user: this.ruleForm.user, force: force, sutID: this.sutID}).then((res) => {
        //         if (res.success === true) {
        //             this.goHardware(res.data.job_id)
        //         }
        //     })
        // }
    }
}
</script>
<style>
    .rowOne{
      width: 85%!important;
      margin: 0 auto;
      display: flex!important;
      justify-content: space-between!important;
    }
    /* .rowTwo{
      width: 90%!important;
      display: flex!important;
      justify-content: space-around!important;
      margin: 0 auto;
    } */
    .rowThree{
      width: 85%!important;
      display: flex!important;
      justify-content: space-between!important;
      margin: 0 auto;
    }
    .rowFore{
      width: 85%!important;
      display: flex!important;
      justify-content: space-between!important;
      margin: 0 auto;
    }
    .rowFive{
      width: 85%!important;
      display: flex!important;
      justify-content: space-between!important;
      margin: 0 auto;
    }
    .rowSix{
      width: 85%!important;
      display: flex!important;
      justify-content: space-between!important;
      margin: 0 auto;
      font-size:17px!important;
    }
    .rowO{
        width: 85%!important;
        margin: auto;
    }
    .el-checkbox__label{
        font-size: 17px
    }
    .back{
        font-size: 20px;
    }
</style>
