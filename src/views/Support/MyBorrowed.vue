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
                :label="$t('Lang.Views.Support.Mycheck.Approver')"
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
                <!-- <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.usage" placement="top-start">
                        <div class="Usage">{{ scope.row.status }}</div>
                  </el-tooltip>
                </template> -->
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
                        :title="$t('Lang.Views.Support.Myborrowed.returnText')"
                        @onConfirm="handleEdit(scope.$index, scope.row, 'update', 'Returning')"
                      >
                        <el-button
                        size="mini"
                        slot="reference"
                        :disabled="scope.row.check_status !== 'Borrowed'"
                        type="info"
                        >{{$t('Lang.public.TenReturn')}}</el-button>
                      </el-popconfirm>
                        <el-button
                        size="mini"
                        type="success"
                        @click="openTimeLine(scope.$index, scope.row)"
                        >{{$t('Lang.Views.Support.MyReq_allReq.Flow_Chart')}}</el-button>
                  </template>
                </el-table-column>
          </el-table>
           <!-- 分页组件 -->
          <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
          </el-pagination>
        </el-card>
          <!-- 时间轴 -->
        <el-dialog
          :title="$t('Lang.Views.Support.MyReq_allReq.The_flow_chart')"
          :visible.sync="TimeVisible"
          width="50%"
          class="chart"
          >
          <el-timeline>
              <el-timeline-item v-show="activities !== []"
                v-for="(activity, index) in activities"
                :key="index"
                >
                <p v-if="activity.check_status === 'Review'">{{
                  new Date(activity.create_time).toLocaleDateString().split('/').join('-') +' '+ activity.create_time.split(' ')[4]
                  }}&nbsp;{{ activity.leadname }} {{$t('Lang.Views.Support.Myborrowed.create_borrow')}}</p>

                <p v-if="activity.check_status === 'Borrowed'">{{
                  new Date(activity.create_time).toLocaleDateString().split('/').join('-') +' '+ activity.create_time.split(' ')[4]
                  }}&nbsp;{{ activity.engineer }} {{$t('Lang.Views.Support.Myborrowed.approved_borrow')}}</p>

                <p v-if="activity.check_status === 'Returning'">{{
                  new Date(activity.create_time).toLocaleDateString().split('/').join('-') +' '+ activity.create_time.split(' ')[4]
                  }}&nbsp;{{activity.leadname}}  {{$t('Lang.Views.Support.Myborrowed.return_borrow')}}</p>

                <p v-if="activity.check_status === 'Complete'">{{
                  new Date(activity.create_time).toLocaleDateString().split('/').join('-') +' '+ activity.create_time.split(' ')[4]
                  }}&nbsp;{{ activity.engineer }} {{$t('Lang.Views.Support.Myborrowed.complete_borrow')}}</p>

                <p v-if="activity.check_status === 'Reject'">{{
                  new Date(activity.create_time).toLocaleDateString().split('/').join('-') +' '+ activity.create_time.split(' ')[4]
                  }}&nbsp;{{ activity.engineer }} {{$t('Lang.Views.Support.Myborrowed.reject_borrow')}} {{activity.comments}}</p>
              </el-timeline-item>
          </el-timeline>
          <span span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="TimeVisible = false">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
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
        tableData: [],
        dialogVisible: false,
        TimeVisible: false,
        labelPosition: 'left',
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
        Index2: '',
        Index3: undefined,
        activities: []
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
        Api.GetBorrwedList({page, prop, order, keyword, user_page: 'user_page', type}).then((res) => {
          this.tableData = res.data
          this.Allpage = res.all_page
        })
      },
      Search() {
        this.getBorrwedList(this.PageIndex, this.prop, this.order, this.search, 'search')
      },
      handleEdit(index, row, action, status) { // 点击查看当前的message信息
        this.Index = index
        var timeArr = new Date().toLocaleDateString().split('/');
        var realtime = timeArr[0] + '-' + timeArr[1] + '-' + (timeArr[2] < 10 ? '0' + timeArr[2] : timeArr[2])
        Api.CreateBorrwed({leadmachineid: row.leadmachineid, action, status, realtime}).then((res) => {
            if (res.success === true) {
              this.$message({
                message: this.$t('Lang.Views.Support.Myborrowed.return_succes'),
                type: 'success',
                offset: 350
              })
              this.getBorrwedList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
            }
          })
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
      sutName(id) {
        // this.$router.push({name: 'Details', query: {id}})
      },
      openTimeLine(index, row) {
        this.TimeVisible = true
        Api.GetBorrTime({machineid: this.tableData[index].leadmachineid}).then((res) => {
            this.activities = res.data
        })
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
