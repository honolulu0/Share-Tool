<template>
    <div style="padding:10px;">
         <el-card class="box-card allCard">
            <el-table
                :data="tableData"
                highlight='true'
                @sort-change="changeTableSort"
                header-row-class-name='headerSize'
                style="width: 100%">
                <el-table-column
                  :label="$t('Lang.public.Reservation_label.Name')"
                  prop='sutName'
                  >
                  <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.sutName" placement="top-start">
                        <div @click='sutName(scope.row.sutid)' class="sutName">{{scope.row.sutName}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.Applicant')"
                align='center'
                header-align='center'
                prop='leadname'
                >
                  <template slot-scope="scope">
                    <el-tooltip placement="top">
                          <div slot="content">
                            <span>{{$t('Lang.public.Message.top')}}</span><br/>
                              <a :href="`sips:<${scope.row.leadname}@lenovo.com>`" class="link_Skip">
                                {{scope.row.leadname}}
                              </a>
                          </div>
                          <div>{{scope.row.leadname}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Operator')"
                align='center'
                header-align='center'
                prop='engineer'
                >
                  <template slot-scope="scope">
                    <el-tooltip placement="top">
                          <div slot="content">
                            <span>{{$t('Lang.public.Message.top')}}</span><br/>
                              <a :href="`sips:<${scope.row.engineer}@lenovo.com>`" class="link_Skip">
                                {{scope.row.engineer}}
                              </a>
                          </div>
                          <div>{{scope.row.engineer}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.start_placeholder')"
                prop='startdatetimeStr'
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.leadtime).toLocaleDateString().split('/').join('-')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.end_placeholder')"
                align='center'
                prop='enddatetimeStr'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.reverttime).toLocaleDateString().split('/').join('-')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Status')"
                align='center'
                header-align='center'
                prop="check_status"
                >
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.Usage')"
                align='center'
                header-align='center'
                >
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.leadreason" placement="top-start">
                        <div class="Usage" style="text-algin: center;">{{ scope.row.leadreason }}</div>
                  </el-tooltip>
                </template>
                </el-table-column>
                <el-table-column
                  align='center'
                  header-align='center'
                  class="Raction"
                  width='200px'>
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
                    <el-popconfirm
                        :confirmButtonText="$t('Lang.public.ConfirmBtn')"
                        :cancelButtonText="$t('Lang.public.CancelBtn')"
                        :title="scope.row.check_status === 'Review' ? $t('Lang.Views.Support.Myborrowed.approved_borrow') : $t('Lang.Views.Support.Myborrowed.returnOk')"
                        @onConfirm="PassBorrowed(scope.$index, scope.row, 'update',scope.row.check_status === 'Review' ? 'Borrowed' : 'Complete')"
                      >
                        <el-button
                        size="mini"
                        slot="reference"
                        type="success"
                        :disabled="scope.row.check_status === 'Reject' || scope.row.check_status === 'Complete' || scope.row.check_status === 'Borrowed'"
                        >{{$t('Lang.public.ApreBtn')}}</el-button>
                      </el-popconfirm>
                        <el-button
                        size="mini"
                        slot="reference"
                        :disabled="scope.row.check_status !== 'Review'"
                        type="danger"
                        @click="RejectShow(scope.$index)"
                        >{{$t('Lang.public.RejBtn')}}</el-button>
                  </template>
                </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)"></el-pagination>
          <!-- Reject 原因 -->
            <el-dialog
                :title="$t('Lang.Views.Manage.Admin_borrowed.re_reueset')"
                :visible.sync="detailsType"
                width="50%"
                class="roolback"
                :before-close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item :label="$t('Lang.Views.Manage.Admin_borrowed.Reason')" prop="cause">
                    <el-input type="textarea" v-model="ruleForm.cause" :placeholder="$t('Lang.Views.Support.AssEnginner.Please_reason')"></el-input>
                  </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="PassBorrowed(Index, tableData[Index], 'update', 'Reject')">{{$t('Lang.public.RejBtn')}}</el-button>
              </span>
          </el-dialog>
      </el-card>
  </div>
</template>
<script>
import * as Api from '@/api/api'
 import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      detailsType: false,
      tableData: [],
      Select_Dates: [],
      formLabelAlign: {
        createtime: '',
        committext: '',
        bookid: ''
      },
      PageIndex: 1, // 当前下标
      Allpage: '',
      Index: '', // 对应的bookId值
      search: '',
      prop: '',
      order: '',
      rules: {
        cause: [
          { required: true, message: this.$t('Lang.Views.Support.AssEnginner.Input_back'), trigger: 'blur' }
        ]
      },
      ruleForm: {
          cause: ''
      }
    }
  },
  created() {
    this.getBorrwedList(this.oldPages, this.newPages)
  },
  computed: {
    ...mapGetters([
        'userType'
      ])
  },
  methods: {
    getBorrwedList(page, prop, order, keyword, type) { // 获取所有的列表
      Api.GetBorrwedList({page, prop, order, keyword, user_page: 'admin_page', type}).then((res) => {
        this.tableData = res.data
        this.Allpage = res.all_page
      })
    },
    Search() {
      this.getBorrwedList(this.PageIndex, this.prop, this.order, this.search, 'search')
    },
    handleEdit(index, row) { // 点击查看当前的message信息
    },
    RejectShow(index) {
      this.Index = index
      this.detailsType = true
    },
    PassBorrowed(index, row, action, status) {
        if (this.ruleForm.cause === '' && status === 'Reject') {
            this.$message({
              message: this.$t('Lang.Views.Support.AssEnginner.Input_back'),
              type: 'error',
              offset: 350
            })
        } else {
          Api.CreateBorrwed({leadmachineid: row.leadmachineid, action, status, reject_reason: this.ruleForm.cause}).then((res) => {
              if (res.success === true) {
                this.$message({
                  message: status === 'Borrowed' ? this.$t('Lang.Views.Manage.Admin_borrowed.ap_succ') : status === 'Complete' ? this.$t('Lang.Views.Manage.Admin_borrowed.rt_succ') : this.$t('Lang.Views.Manage.Admin_borrowed.rj_succ'),
                  type: status === 'Reject' ? 'error' : 'success',
                  offset: 350
                })
                this.getBorrwedList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  offset: 350
                })
              }
              this.detailsType = false;
              this.ruleForm.cause = ''
          })
        }
    },
    currentPages(val) {
      this.PageIndex = val
      this.getBorrwedList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
    },
    prev_click(val) {
      this.PageIndex = val
      this.getBorrwedList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
    },
    next_click(val) {
      this.PageIndex = val
      this.getBorrwedList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
    },
    Copy(index, text) {
      let oInput = document.createElement('input')
      oInput.value = text
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      this.$message({
        message: this.$t('Lang.public.Message.copy'),
        type: 'success',
        offset: 350
      })
    },
    sutName(id) {
      // this.$router.push({name: 'Details', query: {id}})
    },
    changeTableSort(column) {
      this.prop = column.prop;
      this.order = column.order;
      this.getBorrwedList(this.PageIndex, column.prop, column.order, this.search, this.search !== '' ? 'search' : '')
    }
  }
}
</script>
<style lang="scss">
body .el-pagination {
    padding: 10px 0 10px 0;
    float: right;
}
body .el-dialog{
    top: 60px;
}
.sutName{
  width: 123px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Usage{
  width: 114px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Raction{
  >button{
    margin-left: 0px !important;
    padding: 7px 12px !important;
  }
}
</style>
