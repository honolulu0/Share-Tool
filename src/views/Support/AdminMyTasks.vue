<template>
    <div style="padding:10px;">
         <el-card class="box-card">
            <el-table
              :data="OperData"
              @sort-change="changeTableSort"
              style="width: 100%"
              header-row-class-name='headerSize'
              :cell-class-name="rowClass"
              highlight='true'>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Ticket_Title')"
                width="160"
                prop='ticket_title'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.ticket_title" placement="top-start">
                      <div class="Tasks_ticket_title">{{scope.row.ticket_title}}</div>
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
                      <div class="My_ticket_Name">{{scope.row.sut_name}}</div>
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
                      <div class="My_ticket_Name">{{scope.row.sut_location}}</div>
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
                :label="$t('Lang.Views.Support.MyReq_allReq.Create_Time')"
                align='center'
                header-align='center'
                prop='create_title'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.create_time">{{ scope.row.create_time.substring(0,scope.row.create_time.length - 3) }}</div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Status')"
                align='center'
                header-align='center'
                prop='status'
                >
              </el-table-column>
              <!-- 详情 -->
              <el-table-column width="270px" align='center' header-align='center'>
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
                    iconfont='el-icon-tickets'
                    @click="openDetails(scope.$index, scope.row)">{{$t('Lang.public.DetailBtn')}}</el-button>
                    <el-tooltip class="item" effect="dark" :content="$t('Lang.Views.Support.MyReq_allReq.Chat_with_engineer')" placement="top-start">
                        <el-button
                        size="mini"
                        icon='el-icon-chat-dot-round'
                        @click="openDiscuss(scope.$index, scope.row)"></el-button>
                    </el-tooltip>
                  <el-button
                    size="mini"
                    type="success"
                    @click="scope.row.status === 'Review' ? AssEnginner(scope.$index, scope.row) : operpass(scope.$index, scope.row)">
                    {{
                      scope.row.status === 'Review' ? $t('Lang.Views.Support.MyReq_allReq.Engineer') : $t('Lang.public.ComBtn')
                    }}
                    </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    :disabled="scope.row.status === 'Assigned'"
                    @click="approved(scope.$index, scope.row)">{{$t('Lang.public.RejBtn')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
              <!-- 分页组件 -->
            <el-pagination  background @current-change="currentPages" @prev-click="currentPages" @next-click="currentPages" layout="prev, pager, next" :total="(Allpage * 10)">
            </el-pagination>
            </el-card>
            <!-- 详情 -->
            <el-dialog
                :title="$t('Lang.Views.Sut.CreateReservation.Details')"
                :visible.sync="detailsType"
                width="50%"
                class="details"
                :before-close="handleClose">
                <div v-for='(item, key, index) in Datils' :key='index' class="item">
                    <p><span>{{key}}:</span>&nbsp;<span>{{item}}</span></p>
                    <el-divider></el-divider>
                </div>
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="detailsType = false">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
            </span>
          </el-dialog>
          <!-- 交流 -->
          <el-dialog
              :title="$t('Lang.Views.Support.MyReq_allReq.Discuss')"
              :visible.sync="discussType"
              width="50%"
              class="Discuss"
              >
                <el-card class="chat">
                  <span v-if='message_commitList.length === 0' style="color:#000;text-align:center;width:100%;display:block;">{{$t('Lang.public.No_data')}}</span>
                  <div v-for='(i, index) in message_commitList' :key='index'>
                      <div :style="{'textAlign':'left'}">
                        <p><span>{{i.author}}:&nbsp;</span><span>{{i.comments}}</span></p>
                        <span>{{$t('Lang.Views.Support.MyReq_allReq.Time')}}&nbsp;</span><span>{{i.create_time}}</span>
                        <el-divider></el-divider>
                      </div>
                  </div>
              </el-card>
              <el-form :label-position="labelPosition" :model="discuss" label-width="100px" class="Chat_left">
                  <el-input type="textarea" v-model="discuss.text" :rows="5" :placeholder="$t('Lang.public.Reservation_label.Please_enter_content')"></el-input>
                  <el-button type="primary" @click="Adddiscuss()" class="add_commit">{{$t('Lang.public.Add')}}</el-button>
              </el-form>
            </el-dialog>
            <!-- 点击完成 -->
          <el-dialog
            :title="$t('Lang.Views.Support.Task.Close_this_request')"
            :visible.sync="dialogVisible"
            width="50%">
            <p style="textAlgin:center">{{$t('Lang.Views.Support.Task.confriomText')}}</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">{{$t('Lang.public.CancelBtn')}}</el-button>
              <el-button type="primary" @click="operPass">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
            </span>
          </el-dialog>
          <!-- 点击回退 -->
          <el-dialog
                :title="$t('Lang.Views.Support.AssEnginner.Reject_request')"
                :visible.sync="rejectType"
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
    </div>
</template>

<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
export default {
    data() {
      return {
        dialogVisible: false, // 这个是完成的弹框按钮
        detailsType: false, // 这个是详情的弹框按钮
        discussType: false, // 这个是对话的弹框按钮
        rejectType: false,
        OperData: [],
        PageIndex: 1, // 当前下标
        Allpage: '',
        Index: '',
        Datils: {},
        message_commitList: [],
        discuss: {
          text: ''
        },
        search: '',
        prop: '',
        order: '',
        ruleForm: {
          cause: ''
        },
        rules: {
          cause: [
            { required: true, message: this.$t('Lang.Views.Support.AssEnginner.Input_back'), trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
          'itcode'
        ])
    },
    created() {
      this.getOperList()
    },
    methods: {
      getOperList(page, prop, order, keyword, type) {
          Api.OperList({page, prop, order, keyword, type}).then((res) => {
            this.OperData = res.data_list
            this.Allpage = res.all_page
              if (this.PageIndex > 1 && this.OperData.length === 0) {
                  this.getAssignList(this.PageIndex - 1)
                }
          })
      },
      Search() {
        this.getOperList(this.PageIndex, this.prop, this.order, this.search, 'search')
      },
      openDetails(index, row) { // 打开详情
        this.detailsType = true
          Api.OperDetials({task_id: this.OperData[index].ticket_id}).then((res) => {
            this.Datils = res
          })
      },
      operpass(index, row) { // 点击弹出是否完成工单
        this.Index = index
        this.dialogVisible = true
      },
      openDiscuss(index, row) { // 点击获取留言信息
        Api.getDiscuss({task_id: this.OperData[index].ticket_id, type: 'discuss'}).then((res) => {
          this.message_commitList = res.dis_list
        })
        this.Index = index
        this.discussType = true
      },
      Adddiscuss(formName) { // 添加一条留言
        if (this.discuss.text !== '') {
            Api.AddDiscussList({task_id: this.OperData[this.Index].ticket_id, author: this.itcode.type, type: 'discuss', comments: this.discuss.text}).then((res) => {
              this.openDiscuss(this.Index)
              this.discuss.text = ''
            })
          } else {
              this.$message({
                message: this.$t('Lang.public.Message.commit'),
                type: 'error',
                offset: 350
              })
            this.discuss.text = ''
          }
      },
      operPass() {
        Api.OperPass({task_id: this.OperData[this.Index].ticket_id, type: 'complete'}).then((res) => {
            if (res.result === 1) {
                this.$message({
                  showClose: true,
                  message: this.$t('Lang.Views.Support.Task.repair_success'),
                  type: 'success',
                  offset: 350
                });
              this.getOperList(this.PageIndex)
            } else {
                this.$message({
                  showClose: true,
                  message: res.errMsg,
                  type: 'error',
                  offset: 350
                });
            }
        })
        this.dialogVisible = false;
      },
      handleClose() { // 点击关闭;
        this.dialogVisible = false;
        this.detailsType = false;
        this.rejectType = false;
      },
      currentPages(val) {
        this.PageIndex = val
        this.getOperList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      rowClass({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 6) return 'Tasksaction'
      },
      changeTableSort(column) {
        this.prop = column.prop;
        this.order = column.order;
        this.getOperList(this.PageIndex, column.prop, column.order, this.search, this.search !== '' ? 'search' : '')
      },
      AssEnginner(index, row) {
        console.log(this.itcode.type, row);
        Api.ChangeEngineer({task_id: row.ticket_id, operator: this.itcode.type, status: '1'}).then((res) => {
            res.result === 1 && this.getOperList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
            this.$message({
              message: res.result === 1 ? this.$t('Lang.Views.Support.AssEnginner.Congratulations_signing') : res.errMsg,
              type: res.result === 1 ? 'success' : 'error',
              offset: 350
            });
        })
      },
      approved(index, row) { // 通过和回退
        this.rejectType = true
        this.Index = index
      },
      submitForm(formName) { // 回退
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  Api.Rollback({task_id: this.OperData[this.Index].ticket_id, status: '0', reject_reason: this.ruleForm.cause}).then((res) => {
                      if (res.result === 1) {
                          this.$message({
                            message: this.$t('Lang.Views.Support.AssEnginner.Input_back'),
                            type: 'success',
                            offset: 350
                          });
                        this.getOperList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
                        this.rejectType = false
                      } else {
                        this.$message({
                          message: res.errMsg,
                          type: 'error',
                          offset: 350
                        });
                      }
                    this.ruleForm.cause = '';
                    this.rejectType = false;
                  })
              }
          });
      }
    }
  }
</script>
<style lang="scss" scoped>
.body_commit>div>div:nth-of-type(2){
  display: flex;
}
.discuss .el-dialog__body{
  display: flex !important;
}
.discuss .el-dialog__body>form{
  width: 445px !important;
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
.details .el-dialog__body .item>p>span:nth-of-type(1){
  font-weight: 600 !important;
}
.Tasksaction{
  >div{
    display: flex !important;
  }
}
.Tasks_ticket_title{
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
