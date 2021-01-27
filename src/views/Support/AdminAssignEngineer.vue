<template>
    <div style="padding:10px;">
         <el-card class="box-card">
            <el-table
              :data="AssignData"
              style="width: 100%"
              header-row-class-name='headerSize'
              @sort-change="changeTableSort"
              highlight='true'>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Ticket_Title')"
                width="150"
                prop='ticket_title'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.ticket_title" placement="top-start">
                      <div class="Assig_ticket_title">{{scope.row.ticket_title}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.ID')"
                align='center'
                header-align='center'
                prop='ticket_id'
                >
              </el-table-column>
              <el-table-column
                :label="$t('Lang.public.Reservation_label.Name')"
                prop='sut_name'
                header-align='center'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.sut_name" placement="top-start">
                      <div class="My_Assign_Name">{{scope.row.sut_name}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Location')"
                align='center'
                header-align='center'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.sut_location" placement="top-start">
                      <div class="My_Assign_Name">{{scope.row.sut_location}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.applicant')"
                prop="applicant"
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                          <div slot="content">
                           <span>{{$t('Lang.public.Message.top')}}</span><br/>
                              <a :href="`sips:<${scope.row.applicant}@lenovo.com>`" class="link_Skip">
                                {{scope.row.applicant}}
                              </a>
                          </div>
                          <div>{{scope.row.applicant}}</div>
                      </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Operator')"
                prop="operator"
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                  <el-tooltip placement="top" v-if="scope.row.operator">
                        <div slot="content">
                          <span>{{$t('Lang.public.Message.top')}}</span><br/>
                            <a v-for="(item, index) in scope.row.operator.split(',')" :key="index" :href="`sips:<${item}@lenovo.com>`" class="link_Skip">
                              {{item}}
                            </a>
                        </div>
                        <div>{{scope.row.operator}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Status')"
                align='center'
                header-align='center'
                prop='status'
                >
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Create_Time')"
                align='center'
                header-align='center'
                prop='create_time'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                  <template template slot-scope="scope">
                      <div v-if="scope.row.create_time">{{ scope.row.create_time.substring(0,scope.row.create_time.length - 3) }}</div>
                  </template>
              </el-table-column>
              <!-- 通过，删除，修改签核的人，参数时location -->
              <el-table-column min-width="250px" width="250" align='center' header-align='center'>
                <template slot="header" slot-scope="scope">
                  <el-input
                    :placeholder="$t('Lang.public.search')"
                    prefix-icon="el-icon-search"
                    v-model="search"
                    @change="Search"
                    clearable>
                  </el-input>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="info"
                    @click="handleEdit(scope.$index, scope.row)">{{$t('Lang.public.DetailBtn')}}</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    @click="Changeengineer(scope.$index, scope.row)">{{$t('Lang.Views.Support.MyReq_allReq.Engineer')}}</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="approved(scope.$index, scope.row)">{{$t('Lang.public.RejBtn')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
                <!-- 分页组件 -->
                <el-pagination
                background
                @current-change="currentPages"
                @prev-click="prev_click"
                @next-click="next_click"
                layout="prev, pager, next"
                :total="(Allpage * 10)">
                </el-pagination>
            </el-card>
          <!-- 详情 -->
            <el-dialog
                :title="$t('Lang.Views.Sut.CreateReservation.Details')"
                :visible.sync="dialogVisible"
                width="50%"
                class="Details"
                :before-close="handleClose">
                <div v-for='(item, key, index) in DetailJson' :key='index' class="Detailsitem">
                    <p><span>{{key}}:</span>&nbsp;<span>{{item}}</span></p>
                    <el-divider></el-divider>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
                </span>
            </el-dialog>
            <!-- 是否通过 -->
            <el-dialog
                :title="$t('Lang.Views.Support.AssEnginner.Reject_request')"
                :visible.sync="detailsType"
                width="50%"
                class="roolback"
                :before-close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="Reason:" prop="cause">
                    <el-input type="textarea" v-model="ruleForm.cause" :placeholder="$t('Lang.Views.Support.AssEnginner.Please_reason')"></el-input>
                  </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="submitForm('ruleForm')">{{$t('Lang.public.RejBtn')}}</el-button>
              </span>
          </el-dialog>
          <!-- 修改工程师 -->
          <el-dialog
                :title="$t('Lang.Views.Support.AssEnginner.Assign_engineer')"
                :visible.sync="engineerType"
                width="50%"
                :before-close="handleClose">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item :label="$t('Lang.Views.Support.AssEnginner.Site')">
                    <p>{{formInline.location}}</p>
                  </el-form-item><br/>
                  <el-form-item :label="$t('Lang.Views.Support.AssEnginner.Engineer')">
                    <el-select v-model="formInline.Engineer" placeholder="Engineer" class="select" @change="changeEngineers">
                      <el-option :label="item.itcode" :value="item.itcode" v-for="(item, index) in EngineerList" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Pass">{{$t('Lang.public.PassBtn')}}</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>
import * as Api from '@/api/api'
  export default {
    data() {
      return {
        AssignData: [],
        ruleForm: {
          cause: ''
        },
        rules: {
          cause: [
            { required: true, message: this.$t('Lang.Views.Support.AssEnginner.Input_back'), trigger: 'blur' }
          ]
        },
        formInline: {
          location: '',
          Engineer: ''
        },
        PageIndex: 1, // 当前下标
        Allpage: '',
        Datils: '',
        dialogVisible: false, // 详情弹框
        detailsType: false, // 是否通过弹框
        engineerType: false, // 修改工程师弹框
        DetailJson: {},
        Index: '',
        EngineerList: [], // 对应地方的工程师
        search: '',
        prop: '',
        order: ''
      }
    },
    created() {
      this.getAssignList()
    },
    methods: {
      handleEdit(index, row) { // 详情
        this.dialogVisible = true
          Api.DetailLook({task_id: this.AssignData[index].ticket_id}).then((res) => {
            this.DetailJson = res
          })
      },
      approved(index, row) { // 通过和回退
        this.detailsType = true
        this.Index = index
      },
      Changeengineer(index, row) { // 修改工程师
        Api.getEngineer({my_location: this.AssignData[index].location}).then((res) => {
          this.EngineerList = res
        })
        this.engineerType = true
        this.formInline.location = this.AssignData[index].location
        this.Index = index
        this.formInline.Engineer = this.AssignData[index].operator !== null ? this.AssignData[index].operator : ''
      },
      handleClose() {
        this.detailsType = false
        this.dialogVisible = false
        this.engineerType = false
        this.ruleForm.cause = ''
      },
      getAssignList(page, prop, order, keyword, type) { // 获取到所有带审批的列表
        Api.AssginList({page, prop, order, keyword, type}).then((res) => {
          this.AssignData = res.data_list
          this.Allpage = res.all_page
          if (this.PageIndex > 1 && this.AssignData.length === 0) {
              this.getAssignList(this.PageIndex - 1)
            }
        })
      },
      Search() { // 搜索列表
        this.getAssignList(this.PageIndex, this.prop, this.order, this.search, 'search')
      },
      currentPages(val) {
        this.PageIndex = val
        this.getAssignList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      prev_click(val) {
        this.PageIndex = val
        this.getAssignList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      next_click(val) {
        this.PageIndex = val
        this.getAssignList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      submitForm(formName) { // 回退
          this.$refs[formName].validate((valid) => {
              if (valid) {
                    Api.Rollback({task_id: this.AssignData[this.Index].ticket_id, status: '0', reject_reason: this.ruleForm.cause}).then((res) => {
                          if (res.result === 1) {
                                this.$message({
                                    message: this.$t('Lang.Views.Support.AssEnginner.Input_back'),
                                    type: 'success',
                                    offset: 350
                                });
                            this.getAssignList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
                            this.detailsType = false
                          } else {
                              this.$message({
                                  message: res.errMsg,
                                  type: 'error',
                                  offset: 350
                              });
                          }
                      this.ruleForm.cause = ''
                    })
                }
          });
      },
      changeEngineers() {
        Api.ChangeEngineer({task_id: this.AssignData[this.Index].ticket_id, operator: this.formInline.Engineer}).then((res) => {
            if (res.result === 1) {
              this.getAssignList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
            }
        })
      },
      Pass() {
        Api.Passes({task_id: this.AssignData[this.Index].ticket_id, status: '1'}).then((res) => {
            if (res.result === 1) {
              this.$message({
                message: this.$t('Lang.Views.Support.AssEnginner.Congratulations_signing'),
                type: 'success',
                offset: 350
              });
             this.getAssignList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
            } else {
              this.$message({
                message: res.errMsg,
                type: 'error',
                offset: 350
              });
            }
          })
          this.engineerType = false
      },
      changeTableSort(column) {
        this.prop = column.prop;
        this.order = column.order;
        this.getAssignList(this.PageIndex, column.prop, column.order, this.search, this.search !== '' ? 'search' : '')
      }
    }
  }
</script>
<style lang="scss" scoped>
.body_commit>div>div:nth-of-type(2){
  display: flex;
}
.from_left{
  width: 50%;
}
body .el-date-editor--datetimerange.el-input__inner{
  width: 349px;
}
body .scroll_commit{
  width: 400px;
  height: 355px !important;
  margin-left: 20px;
  overflow-y: scroll;
}
body .add_commit{
  margin-top: 10px;
  float: right;
}
.OsusageType{
  color:red;
  font-size:12px;
  position: absolute;
  top: 190px;
  left: 115px;
}
body .el-button--text{
  display: none;
}
.dialog-footer{
  margin-right: 20px !important;
}
.Assig_ticket_title{
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.My_Assign_Name{
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
