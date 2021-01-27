<template>
    <div class="container">
        <router-link to>
            <el-button type="text" @click="$router.back()" class="el-icon-arrow-left">{{$t('Lang.Views.Cms.Articles.Back')}}</el-button>
        </router-link>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item :label="$t('Lang.public.Reservation_label.Select_Dates')" prop="Select_Dates">
                <el-date-picker
                    v-if="this.$route.query.type === 'Borrowed'"
                    v-model="Select_Dates"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                    :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')"
                    :picker-options="pickerOptions"
                    >
                </el-date-picker>
                <el-date-picker
                v-else
                v-model="time"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="Select_Dates[0]">
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('Lang.public.Reservation_label.Usage')" prop="leadreason">
                <el-input class="commits " type="textarea" v-model="ruleForm.leadreason" rows='7' :placeholder="$t('Lang.Views.Sut.CreateReservation.please_usage')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Submit('ruleForm')" ref="SubBtn">{{$t('Lang.public.SubBtn')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            obj: this.$route.query,
            Select_Dates: [new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()),
            new Date(new Date().setDate(parseInt(new Date().getDate()) + 7)).toLocaleDateString().split('/')[0] + '-' + new Date(new Date().setDate(parseInt(new Date().getDate()) + 7)).toLocaleDateString().split('/')[1] + '-' + (new Date(new Date().setDate(parseInt(new Date().getDate()) + 7)).toLocaleDateString().split('/')[2] < 10 ? '0' + new Date(new Date().setDate(parseInt(new Date().getDate()) + 7)).toLocaleDateString().split('/')[2] : new Date(new Date().setDate(parseInt(new Date().getDate()) + 7)).toLocaleDateString().split('/')[2])],
            time: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()),
            ruleForm: {
                leadreason: '',
                ID: '',
                leadtime: '',
                reverttime: '',
                sutName: '',
                location: ''
            },
            CheckOut: {
                ID: '',
                sutName: '',
                leadtime: '',
                leadreason: '',
                location: ''
            },
            MessAge: {},
            rules: {
                leadreason: [
                    { required: true, message: this.$route.query.type === 'Borrowed' ? this.$t('Lang.Views.Support.Creat_bor_che.borText') : this.$t('Lang.Views.Support.Creat_bor_che.checkText'), trigger: 'blur' }
                ]
            },
            pickerOptions: {
                disabledDate: (time) => {
                    if (this.MessAge.book_list.length !== 0 || this.MessAge.leadmachine_list.length !== 0) {
                        var date = [...this.MessAge.book_list, ...this.MessAge.leadmachine_list];
                        var str = '';
                        var end = '';
                        var inrange = false;
                        for (let i = 0; i < date.length; i++) {
                            end = new Date(date[i].enddatetimeStr).toLocaleDateString();
                            str = new Date(date[i].startdatetimeStr).toLocaleDateString();
                            inrange = time.getTime() >= new Date(str).getTime() && time.getTime() <= new Date(end).getTime();
                            if (inrange) {
                                return inrange
                            }
                        }
                        return inrange
                    }
                }
            }
        }
    },
    created() {
        this.getSutData(this.$route.query.id)
    },
    methods: {
        getSutData(ID) {
            Api.Changerelease({ID}).then((res) => { this.MessAge = res.sut_data })
        },
        Createborrwed() {
            this.ruleForm = {
                ID: this.MessAge.ID,
                leadtime: this.Select_Dates[0],
                reverttime: this.Select_Dates[1],
                sutName: this.MessAge.sutName,
                location: this.MessAge.lablocation,
                leadreason: this.ruleForm.leadreason
            }
            Api.CreateBorrwed({...this.ruleForm, action: 'add'}).then((res) => {
                if (res.success === true) {
                    this.$message({
                        message: this.$t('Lang.Views.Support.Creat_bor_che.borsuccess'),
                        type: 'success',
                        offset: 350
                    })
                    this.$router.push('/MyBorrowed')
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        offset: 350
                    })
                    this.ruleForm.leadreason = ''
                }
            })
        },
        CreateCheck() {
            this.CheckOut = {
                ID: this.MessAge.ID,
                leadtime: this.time,
                sutName: this.MessAge.sutName,
                leadreason: this.ruleForm.leadreason,
                location: this.MessAge.lablocation
            }
            Api.CreateCheckOut({...this.CheckOut, action: 'add'}).then((res) => {
                if (res.success === true) {
                    this.$message({
                        message: this.$t('Lang.Views.Support.Creat_bor_che.checksuccess'),
                        type: 'success',
                        offset: 350
                    })
                    this.$router.push('/MyCheckout')
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        offset: 350
                    })
                    this.ruleForm.leadreason = ''
                }
            })
        },
        Submit(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.$route.query.type === 'Borrowed') {
                    this.Createborrwed()
                } else {
                    this.CreateCheck()
                }
            } else {
                    return false;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.container{
    >a{
        color: #333;
        >button{
            color: #333;
        }
    }
}
</style>
