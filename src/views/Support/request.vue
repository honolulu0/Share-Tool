<template>
  <div class="container">
      <!-- 工单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position='top'>
        <el-form-item :label="$t('Lang.public.Log.Title')" prop="ticket_title" class="titles">
          <el-input v-model="ruleForm.ticket_title" :placeholder="$t('Lang.public.Log.Please_title')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Lang.Views.Support.request.Location')" :prop="Message === {} ? 'my_location' : ''" >
          <el-select v-model="ruleForm.my_location"
          :placeholder="Message !== {} && ruleForm.sut_id !== ''? Message.lablocation : $t('Lang.Views.Support.request.bj')" class="select" width='00px'
          :disabled="Object.keys(Message).length !== 0 && ruleForm.sut_id !== ''">
            <el-option
            v-for='(item,index) in localionList'
            :key="index"
            :label="item"
            :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 单选 -->
        <!-- <el-form-item :label="$t('Lang.Views.Support.request.Project')" prop="Project">
          <el-radio-group v-model="ruleForm.projectType.radioType" @change="RadioChanges">
            <el-radio :label="item" border size="medium" v-for="(item, index) in radioList" :key="index" :disabled="ruleForm.projectType.radioType === key || ruleForm.projectType.Others !== '' ? true: false">{{item}}</el-radio>
          </el-radio-group>
           <div class="checkBox" style="position:relative;margin-top:10px;">
              <span>{{$t('Lang.Views.Support.request.Others')}}</span>
              <el-input v-model="ruleForm.projectType.Others" :placeholder="$t('Lang.public.Reservation_label.Please_enter_content')" :maxlength='20' @change="Changes" :disabled="ruleForm.projectType.radioType !== ''"></el-input>
              <span>{{ruleForm.projectType.Others.length}}/20</span>
            </div>
            <transition name="el-zoom-in-top">
              <span style="color:#f56c6c;font-size: 12px;padding-top: 4px;" v-show="radioType">{{$t('Lang.Views.Support.request.CategoryNone')}}</span>
            </transition>
        </el-form-item> -->
        <!-- 多选必选 -->
        <el-form-item :label="$t('Lang.Views.Support.request.Category')" prop="checkboxType">
          <!-- <el-cascader
            :placeholder="$t('Lang.Views.Support.request.Select_cate')"
            :options="options"
            v-model="CategoryList"
            :props="{ multiple: true, expandTrigger: 'hover' }"
            clearable
            filterable></el-cascader> -->
            <el-checkbox-group v-model="ruleForm.checkboxType.Assemble_system" @change='Changes'>
                <el-popover
                  placement="top-start"
                  :title="key"
                  width="200"
                  trigger="hover"
                  v-for="(val, key, index) in $t('Lang.Views.Support.request.CheckTitle')" :key="index"
                  :content="val.join('/')">
                    <el-checkbox slot="reference" :label="key" name="type"  border size="medium" style="margin-left:10px;margin-right:10px;">{{key}}</el-checkbox>
                </el-popover>
            </el-checkbox-group>
            <div class="checkBox" style="position:relative;margin-top:10px;">
              <span>{{$t('Lang.Views.Support.request.Others')}}</span>
              <el-input v-model="ruleForm.checkboxType.Others" :placeholder="$t('Lang.Views.Support.request.Others')" :maxlength='20' @change="Changes"></el-input>
              <span>{{ruleForm.checkboxType.Others.length}}/20</span>
            </div>
            <transition name="el-zoom-in-top">
              <span style="color:#f56c6c;font-size: 12px;padding-top: 4px;" v-show="checkboxerrorType">{{$t('Lang.Views.Support.request.CategoryNone')}}</span>
            </transition>
        </el-form-item>
        <el-form-item :label="$t('Lang.Views.Support.request.B_t_r_s')" prop="sut_id">
          <el-select v-model="ReservationsObj" class="selectReservations" width='400px' @change='select' clearable
          :placeholder="Object.keys(Message).length !== 0 && ruleForm.sut_id !== '' ? 'Name:'+' '+Message.sutName+' '+'Start Time:'+' '+Message.startdatetimeStr+' '+'End Time:'+' '+Message.enddatetimeStr: $t('Lang.Views.Support.request.P_s_r')">
            <el-option
            v-for='(item,index) in ReservationsList'
            :key="index"
            :label="'Name:'+' '+item.sutName+' '+'Start Time:'+' '+item.startdatetimeStr+' '+'End Time:'+' '+item.enddatetimeStr"
            :value="JSON.stringify(item)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Lang.module.Sidebr.Details')" prop="comments" label-width="105px">
          <el-input type="textarea" :rows="7" v-model="ruleForm.comments" :placeholder="$t('Lang.Views.Sut.CreateReservation.Please_request')" class="commits"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('Lang.public.SubBtn')}}</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        :title="$t('Lang.Views.Support.request.Prompt')"
        :visible.sync="requestType"
        width="50%"
        class="confirm"
        :close-on-click-modal="false"
        :before-close="resetForm">
        <div class="title_text">
            <span>{{$t('Lang.Views.Sut.CreateReservation.Dear')}} </span><span>{{userName}},</span><br/>
            <span>{{$t('Lang.Views.Support.request.title_text')}}</span>
        </div>
        <p class="sutnameStyle">{{ruleForm.ticket_title}}</p>
        <div>
            <p>{{$t('Lang.Views.Support.request.IDtext')}}</p>
            <p class="timeStype" v-show="requestID !== '' ">{{requestID}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="disabld" @click="GoMyrequest">{{$t('Lang.public.Agben')}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        ruleForm: {
          ticket_title: '',
          my_location: 'Beijing',
          comments: '',
          book_id: '',
          sut_id: '',
          sutName: '',
          sut_location: '',
          checkboxType: {
            Assemble_system: [],
            Others: ''
            // enLab: ''
          },
          projectType: {
            radioType: '',
            Others: ''
          }
        },
        checkboxerrorType: false,
        radioType: false,
        radioList: ['Whitley', 'QUR 21A', 'QUR 21B'],
        ReservationsObj: '',
        rules: {
          ticket_title: [
            {required: true, message: this.$t('Lang.Views.Support.request.create_request_title'), trigger: 'blur'},
            {min: 5, max: 999999999999, message: this.$t('Lang.public.Log.rules.r_t_s'), trigger: 'blur'}
          ],
          sut_id: [
            { required: true, message: this.$t('Lang.Views.Support.request.B_t_r_s'), trigger: 'change' }
          ],
           checkboxType: [
            { type: 'object', required: true, message: this.$t('Lang.Views.Support.request.CategoryNone'), trigger: 'change' }
          ]
          // Project: [
          // ]
        },
        localionList: [],
        ReservationsList: [],
        Message: {},
        requestType: false,
        requestID: '',
        disabld: false,
        options: [
          {
            value: 'Re-config',
            label: 'Re-config',
            children: [
              {
                value: '主板',
                label: '主板'
              },
              {
                value: '内存',
                label: '内存'
              },
              {
                value: 'CPU',
                label: 'CPU'
              },
              {
                value: '网卡',
                label: '网卡'
              },
              {
                value: 'RAID卡',
                label: 'RAID卡'
              },
              {
                value: '电源',
                label: '电源'
              },
              {
                value: 'PCIE转接卡',
                label: 'PCIE转接卡'
              },
              {
                value: '网线',
                label: '网线'
              },
              {
                value: '模块',
                label: '模块'
              }
            ]
          },
          {
            value: 'Check status',
            label: 'Check status',
            children: [
              {
                value: 'IP',
                label: 'IP'
              },
              {
                value: '光驱',
                label: '光驱'
              },
              {
                value: 'LED灯色',
                label: 'LED灯色'
              }
            ]
          },
          {
            value: 'Plug external device',
            label: 'Plug external device',
            children: [
              {
                value: '插网线',
                label: '插网线'
              },
              {
                value: '插U盘',
                label: '插U盘'
              }
            ]
          },
          {
            value: 'Install OS',
            label: 'Install OS'
          },
          {
            value: 'FW Update FW',
            label: 'FW Update FW'
          },
          {
            value: 'Put server on/off rack',
            label: 'Put server on/off rack'
          },
          {
            value: 'Assemble system',
            label: 'Assemble system'
          },
          {
            value: 'Debug',
            label: 'Debug'
          }
        ],
        CategoryList: []
      }
    },
    components: {},
    computed: {
      ...mapGetters([
            'userName'
        ])
    },
    created() {
      Api.getlocalion().then((res) => { // localion 地址请求
          this.localionList = res.lab_location
          this.ReservationsList = res.data_list
          if (this.$route.query.sutid) {
            this.Message = JSON.parse(sessionStorage.splist)
            this.ruleForm.book_id = JSON.parse(sessionStorage.splist).bookid
            this.ruleForm.sut_id = JSON.parse(sessionStorage.splist).sutid
            this.ruleForm.sutName = JSON.parse(sessionStorage.splist).sutName
            this.ruleForm.my_location = JSON.parse(sessionStorage.splist).lablocation
            this.Message.lablocation = JSON.parse(sessionStorage.splist).lablocation
            this.ruleForm.sut_location = JSON.parse(sessionStorage.splist).sut_location
            this.ReservationsObj = JSON.parse(sessionStorage.splist)
          }
        })
    },
    mounted() {
    },
    methods: {
      Changes(value) {
        this.checkboxerrorType = false;
      },
      RadioChanges(value) {
        this.radioType = false;
      },
      select() {
        if (this.$route.query.sutid !== undefined) {
          this.ruleForm.sut_id = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sutid : ''
          this.ruleForm.book_id = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).id : ''
          this.ruleForm.sutName = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sutName : ''
          this.ruleForm.my_location = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).lablocation : ''
          this.Message.lablocation = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).lablocation : ''
          this.ruleForm.sut_location = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sut_location : ''
        } else {
          this.ruleForm.sut_id = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sutid : ''
          this.ruleForm.book_id = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).id : ''
          this.ruleForm.sutName = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sutName : ''
          this.ruleForm.my_location = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).lablocation : ''
          this.Message.lablocation = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).lablocation : ''
          this.ruleForm.sut_location = this.ReservationsObj !== '' ? JSON.parse(this.ReservationsObj).sut_location : ''
        }
      },
      submitForm(formName) {
        console.log(this.CategoryList);
          this.$refs[formName].validate((valid) => { // 工单提交系统
          //  && (this.ruleForm.checkboxType.Assemble_system.length !== 0 || this.ruleForm.checkboxType.Others !== '' || this.ruleForm.checkboxType.enLab !== '') && (this.ruleForm.projectType.radioType !== '' || this.ruleForm.projectType.Others !== '')
              if (valid && (this.ruleForm.checkboxType.Assemble_system.length !== 0 || this.ruleForm.checkboxType.Others !== '')) {
                  this.disabld = true
                  this.checkboxerrorType = false;
                  this.radioType = false;
                  Api.SubmitWork({data: JSON.stringify(this.ruleForm), type: 'commit', withCredentials: true}).then((res) => {
                    if (res.result === 1) {
                      this.requestID = res.id;
                      this.requestType = true;
                    } else {
                      this.$message({
                        message: res.errMsg,
                        type: 'error',
                        offset: 350
                      });
                    }
                    this.disabld = false
                  })
              } else {
                  this.checkboxerrorType = true;
                  this.radioType = true
              }
          });
      },
      resetForm(formName) {
        this.requestType = false;
        this.disabld = false
        if (this.$route.query.sutid !== undefined) {
          this.ruleForm.ticket_title = ''
          this.ruleForm.comments = ''
        } else {
          this.ruleForm.ticket_title = ''
          this.ruleForm.comments = ''
        }
      },
      GoMyrequest() {
        this.requestType = false;
        this.disabld = false
        if (this.$route.query.sutid !== undefined) {
          this.ruleForm.ticket_title = ''
          this.ruleForm.comments = ''
        } else {
          this.ruleForm.ticket_title = ''
          this.ruleForm.comments = ''
        }
        this.$router.push('/MyRequests')
      }
    }
  }
</script>
<style lang="scss">
.el-input__inner::-webkit-input-placeholder{
  color: #4e4e68 !important;
}
.titles{
  width: 730px !important;
}
.titles,.select{
  width: 300px;
}
.commits{
  width: 60% !important;
}
.selectReservations{
  width: 100% !important;
  >div{
    width: 100% !important;
  }
}
.checkBox{
  display:flex;
  &:nth-of-type(1) {
    >span{
      margin-right: 20px;
      width: 50px;
      text-indent: .8em;
    }
  }
  &:nth-of-type(2), &:nth-of-type(3) {
    >span:nth-of-type(1){
      margin-right: 20px;
      width:50px;
      text-indent: .8em;
    }
    >span:nth-of-type(2){
      position: absolute;
      right: 20px;
    }
  }
}
.el-cascader__search-input::-webkit-input-placeholder{
  color: #333 !important;
}
</style>
