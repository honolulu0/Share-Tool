<template>
    <el-dialog
        :title="$t('Lang.Views.Sut.MyReservation.Log_cont')"
        :visible.sync="LogType"
        :close-on-click-modal='false'
        width="50%"
        :before-close="HandLog">
        <p style="color:#f56c6c;" class="propmt">
          <span>{{$t('Lang.public.Log.propmt')}}</span>
          <span>{{$t('Lang.public.Log.contact')}}</span>
          <a href="sips:<lixl44@lenovo.com>" >( lixl44@lenovo.com )</a>
          <span>{{$t('Lang.public.Log.propmt2')}}</span>
        </p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='top'>
              <el-form-item :label="$t('Lang.public.Log.Title')" prop="titleName">
                <el-input :placeholder="$t('Lang.public.Log.Please_title')" v-model="ruleForm.titleName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Lang.public.Log.OS_IP_address')" prop="ipaddress" class="OSIp">
                <el-input :placeholder="$t('Lang.public.Log.Please_address')" v-model="ruleForm.ipaddress"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Lang.public.Log.OS_Username')" prop="username" class="OSUsername">
                <el-input v-model="ruleForm.username" :placeholder="$t('Lang.public.Log.Please_username')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Lang.public.Log.OS_password')" prop="password" class="OSPassword">
                <el-input :placeholder="$t('Lang.public.Log.Please_password')" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Lang.public.Log.File_Type')" class="OSConfig">
                <el-checkbox-group v-model="requestedLog" @change='FilleTypes'>
                  <div>
                    <el-checkbox :label="$t('Lang.public.Log.OS')"></el-checkbox>
                    <el-checkbox :label="$t('Lang.public.Log.LXPM')"></el-checkbox>
                    <el-checkbox :label="$t('Lang.public.Log.RAID_HBA')"></el-checkbox>
                    <el-checkbox :label="$t('Lang.public.Log.UEFI_IMM')"></el-checkbox>
                    <el-checkbox :label="$t('Lang.public.Log.FFDC')"></el-checkbox>
                    <el-checkbox :label="$t('Lang.public.Log.INVENTORY')"></el-checkbox>
                  </div>
                  <div class="LXPM">
                    <el-checkbox :label="$t('Lang.public.Log.ONECLI')"></el-checkbox>
                    <div>
                        <transition name="el-zoom-in-top">
                          <div v-show="FileShow1" class="transition-box">
                              <el-input v-model="params1.int" :placeholder="$t('Lang.public.Log.Please_onecli')"></el-input>
                          </div>
                      </transition>
                    </div>
                  </div>
                  <div class="ONECLI">
                    <el-checkbox :label="$t('Lang.public.Log.LXEM.lebal')"></el-checkbox>
                    <div>
                      <transition name="el-zoom-in-top">
                        <div v-show="FileShow2" class="transition-box">
                            <el-input v-model="params2[0].int1" :placeholder="$t('Lang.public.Log.LXEM.pl1')"></el-input>
                            <el-input v-model="params2[1].int2" :placeholder="$t('Lang.public.Log.LXEM.pl2')"></el-input>
                            <el-input v-model="params2[2].int3" :placeholder="$t('Lang.public.Log.LXEM.pl3')"></el-input>
                        </div>
                      </transition>
                    </div>
                  </div>
                  <div class="UEFI">
                    <el-checkbox :label="$t('Lang.public.Log.PSCAN')"></el-checkbox>
                    <div>
                      <transition name="el-zoom-in-top">
                        <div v-show="FileShow3" class="transition-box">
                            <el-input v-model="params3.int4" :placeholder="$t('Lang.public.Log.Please_pscan')"></el-input>
                        </div>
                      </transition>
                    </div>
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="float:right;" @click="SubLog('ruleForm')"
                >{{$t('Lang.public.SubBtn')}}</el-button>
              </el-form-item>
              <el-form-item>
                <div class="sloganImage">
                  <img src="../../assets/img/Automated by saat.jpg" alt="">
                </div>
              </el-form-item>
            </el-form>
      </el-dialog>
</template>
<script>
import * as Api from '@/api/api'
export default {
    name: 'LogFile',
    props: {
        LogTypes: {
            type: Boolean,
            default: false
        },
        bookids: {
            type: String
        },
        sutnames: {
            type: String
        },
        Index: {
            type: Number
        }
    },
    data() {
        return {
            LogType: this.LogTypes,
            FileShow1: false,
            FileShow2: false,
            FileShow3: false,
            params1: {int: ''},
            params2: [{int1: ''}, {int2: ''}, {int3: ''}],
            params3: {int4: ''},
            Index2: this.Index,
            ruleForm: {
                titleName: '',
                sutname: '',
                bookid: '',
                username: '',
                password: '',
                ipaddress: '',
                requestedLog: []
            },
            requestedLog: [],
            rules: {
            username: [
                    { required: true, message: this.$t('Lang.public.Log.rules.r_name'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('Lang.public.Log.rules.r_Pass'), trigger: 'blur' }
                ],
                ipaddress: [
                    { required: true, message: this.$t('Lang.public.Log.rules.r_ip'), trigger: 'blur' }
                ],
                titleName: [
                    { required: true, message: this.$t('Lang.public.Log.rules.r_title'), trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        LogTypes(newVal, oldVal) { this.LogType = newVal },
        bookids(newVal, oldVal) { this.ruleForm.bookid = newVal; },
        sutnames(newVal, oldVal) { this.ruleForm.sutname = newVal; },
        Index(newVal, oldVal) { this.Index2 = newVal; }
    },
    methods: {
        FilleTypes(value) {
          console.log(value);
            value.includes(this.$t('Lang.public.Log.ONECLI')) ? this.FileShow1 = true : this.FileShow1 = false;
            value.includes(this.$t('Lang.public.Log.LXEM.lebal')) ? this.FileShow2 = true : this.FileShow2 = false;
            value.includes(this.$t('Lang.public.Log.PSCAN')) ? this.FileShow3 = true : this.FileShow3 = false;
        },
        HandLog(done) {
            done();
            this.ruleForm = {sutname: '', bookid: '', username: '', password: '', ipaddress: '', requestedLog: []}
            this.requestedLog = []
            this.FileShow1 = false
            this.FileShow2 = false
            this.FileShow3 = false
            this.params1 = {int: ''}
            this.params2 = [{int1: ''}, {int2: ''}, {int3: ''}]
            this.params3 = {int4: ''}
            this.$emit('OFFDrow', {LogType: false, Index3: ''})
        },
        SubLog(formName) {
            this.requestedLog.forEach((item, index) => {
                if (item === this.$t('Lang.public.Log.ONECLI')) {
                    this.FileShow1 = true
                    this.ruleForm.requestedLog.push({type: item, params: [this.params1.int]})
                } else if (item === this.$t('Lang.public.Log.LXEM.lebal')) {
                    this.FileShow2 = true
                    this.ruleForm.requestedLog.push({type: item, params: [this.params2[0].int1, this.params2[1].int2, this.params2[2].int3]})
                } else if (item === this.$t('Lang.public.Log.PSCAN')) {
                    this.FileShow3 = true
                    this.ruleForm.requestedLog.push({type: item, params: [this.params3.int4]})
                } else {
                    this.ruleForm.requestedLog.push({type: item})
                }
            })
            this.$refs[formName].validate((valid) => {
                    this.$emit('OFFDrow', {LogType: false, Index3: this.Index2})
                    if (valid) {
                        Api.DownLog({data: {...this.ruleForm}, type: 'commit'}).then((res) => {
                            if (res.success === true) {
                                this.ruleForm = {sutname: '', bookid: '', username: '', password: '', ipaddress: '', requestedLog: []}
                                this.requestedLog = []
                                this.FileShow1 = false
                                this.FileShow2 = false
                                this.FileShow3 = false
                                this.params1 = {int: ''}
                                this.params2 = [{int1: ''}, {int2: ''}, {int3: ''}]
                                this.params3 = {int4: ''}
                                this.$message({
                                    message: this.$t('Lang.Views.Sut.MyReservation.log_dw'),
                                    type: 'success',
                                    offset: 350
                                });
                            } else {
                            this.ruleForm = {sutname: '', bookid: '', username: '', password: '', ipaddress: '', requestedLog: []}
                            this.requestedLog = []
                            this.FileShow1 = false
                            this.FileShow2 = false
                            this.FileShow3 = false
                            this.params1 = {int: ''}
                            this.params2 = [{int1: ''}, {int2: ''}, {int3: ''}]
                            this.params3 = {int4: ''}
                            this.$message({
                                message: res.msg,
                                type: 'error',
                                offset: 350
                            });
                        }
                        this.$emit('OFFDrow', {LogType: false, Index3: ''})
                    })
                this.$emit('OFFDrow', {LogType: false, Index3: this.Index2})
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
// .propmt{
//   >a{
//      transition: .3s;
//      &:hover{
//        color: ;
//      }
//   }
// }
</style>
