<template>
    <div style="padding:10px;">
         <el-card class="box-card allCard">
            <el-table
              :data="tableData"
              style="width: 100%"
              @sort-change="changeTableSort"
              :cell-class-name="rowClass"
              header-row-class-name='headerSize'
              highlight='true'>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Ticket_Title')"
                width="160"
                prop='ticket_title'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.ticket_title" placement="top-start">
                      <div class="All_ticket_title">{{scope.row.ticket_title}}</div>
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
                      <div class="Admin_My_ticket_Name">{{scope.row.sut_name}}</div>
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
                      <div class="Admin_My_ticket_Name">{{scope.row.sut_location}}</div>
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
                width="130"
                align='center'
                header-align='center'
                prop='create_time'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                    <div div v-if="scope.row.create_time">{{ scope.row.create_time.substring(0,scope.row.create_time.length - 3) }}</div>
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
                :label="$t('Lang.Views.Support.MyReq_allReq.Rating')"
                align='center'
                header-align='center'
                >
                <template slot-scope="scope">
                    <el-button
                    type="warning"
                    icon="el-icon-star-off"
                    size="mini"
                    style="margin:auto;"
                    @click="OpenNps(scope.$index, scope.row)"
                    :disabled="scope.row.status === 'Complete' && itcode.type === scope.row.applicant ? false : true"
                    v-if="!scope.row.score"
                    ></el-button>
                    <div v-else style="margin:auto;">{{scope.row.score}}</div>
                </template>
              </el-table-column>
              <!-- over -->
              <el-table-column width="200" align='center' header-align='center'>
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
                      iconfont='el-icon-notebook-2'
                      @click="openDetails(scope.$index, scope.row)">{{$t('Lang.public.DetailBtn')}}</el-button>
                    <el-button
                      size="mini"
                      type="success"
                      @click="openTimeLine(scope.$index, scope.row)">{{$t('Lang.Views.Support.MyReq_allReq.Flow_Chart')}}</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <!-- over -->
            <!-- 分页组件 -->
            <!-- over -->
            <el-pagination
            background
            @current-change="currentPages"
            @prev-click="prev_click"
            @next-click="next_click"
            layout="prev, pager, next"
            :total="(Allpage * 10)">
            </el-pagination>
            </el-card>
            <!-- 时间轴 -->
            <!-- over -->
            <el-dialog
              :title="$t('Lang.Views.Support.MyReq_allReq.The_flow_chart')"
              :visible.sync="dialogVisible"
              width="50%"
              class="chart">
              <el-timeline>
                  <el-timeline-item v-show="activities !== []"
                    v-for="(activity, index) in activities"
                    :key="index">
                    <p v-if="activity.task_status === 'Review'">{{activity.create_time}}&nbsp;{{ activity.applicant }} {{$t('Lang.Views.Support.MyReq_allReq.time_line.Review')}}</p>
                    <p v-if="activity.task_status === 'Assigned'">{{activity.create_time}}&nbsp;{{ activity.checker }} {{$t('Lang.Views.Support.MyReq_allReq.time_line.Assigned')}} {{activity.operator}} {{$t('Lang.Views.Support.MyReq_allReq.time_line.Assigned2')}}</p>
                    <p v-if="activity.task_status === 'Modify engineer'">{{activity.create_time}}&nbsp;{{$t('Lang.Views.Support.MyReq_allReq.time_line.Modify_engineer')}} {{activity.operator}}</p>
                    <p v-if="activity.task_status === 'Complete'">{{activity.create_time}}&nbsp;{{ activity.operator }} {{$t('Lang.Views.Support.MyReq_allReq.time_line.Complete')}}</p>
                    <p v-if="activity.task_status === 'Reject'">{{activity.create_time}}&nbsp;{{ activity.checker }} {{$t('Lang.Views.Support.MyReq_allReq.time_line.Reject')}} {{activity.comments}}</p>
                  </el-timeline-item>
              </el-timeline>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
              </span>
            </el-dialog>
            <!-- 详情 -->
            <!-- over -->
            <el-dialog
                :title="$t('Lang.Views.Sut.CreateReservation.Details')"
                :visible.sync="detailsType"
                width="50%"
                class="details">
                <div v-for='(item, key, index) in Datils' :key='index' class="item">
                    <p><span>{{key}}:</span>&nbsp;<span>{{item}}</span></p>
                    <el-divider></el-divider>
                </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detailsType = false">{{$t('Lang.Views.Support.MyReq_allReq.OK')}}</el-button>
            </span>
          </el-dialog>
          <!-- over -->
          <!-- 评分 -->
            <el-dialog  :title="$t('Lang.public.Nps.title')" :visible.sync="outerVisible" class="Rate">
              <el-dialog
                width="50%"
                :title="nps.score >= 1 && nps.score <= 6 ? nps.bad : nps.score >= 7 &&  nps.score <= 8 ? nps.Notbad : nps.nice"
                :visible.sync="innerVisible"
                class="bad"
                :before-close="RateClose"
                append-to-body>
                <el-upload
                  v-show="nps.score >= 1 && nps.score <= 6 || nps.score > 8 &&  nps.score <= 10"
                  class="upload-demo"
                  drag
                  ref="upload"
                  :action="GLOBAL.HOME + '/cms/upload/'"
                  :data={bizType:10}
                  :limit='1'
                  multiple
                  :on-remove="removeFile"
                  :on-success="uploadOK"
                  :before-upload="beforeUpload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <div v-html="$t('Lang.public.Nps.upimg')"></div>
                  </div>
                </el-upload>
                <transition name="el-zoom-in-top">
                    <div v-show="nps.image" class="Poster transition-box">
                      <el-image :src="nps.image" alt="">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                  </div>
                </transition>
                <el-input
                    v-show="nps.score >= 1 && nps.score <= 6 || nps.score > 8 &&  nps.score <= 10"
                    type="textarea"
                    :rows="2"
                    :placeholder="$t('Lang.public.Nps.Ping_input_comments')"
                    v-model="nps.comments">
                </el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="AddNps">{{$t('Lang.public.SubBtn')}}</el-button>
                </div>
              </el-dialog>
                <el-rate
                  v-model="nps.score"
                  :max='10'
                  :low-threshold='5'
                  :high-threshold='8'
                  @change='Rate'
                  :colors="colors">
                </el-rate>
                <div class="hint_title" v-html="$t('Lang.public.Nps.Hint_title')"></div>
                <div class="comments" v-show="nps.score">
                 <span>{{$t('Lang.public.Nps.comments')}}</span> {{nps.comments}}
                </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">{{$t('Lang.public.CloseBtn')}}</el-button>
              </div>
        </el-dialog>
        <Export2Excel></Export2Excel>
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import GLOBAL from '../../common/global'
import Export2Excel from '../../components/support/export2Excel.vue'
  export default {
    components: {
      Export2Excel
    },
    data() {
      return {
        dialogVisible: false, // 这个是时间轴的弹框按钮
        detailsType: false, // 这个是详情的弹框按钮
        discussType: false, // 消息按钮
        typeall: false,
        tableData: [],
        checkOptions: [],
        conditions: {
          abnormal: '',
          text: '',
          time: ''
        },
        activities: [], // 时间轴的数组
        Datils: '', // comments 数据的详情
        PageIndex: 1, // 当前下标
        Allpage: '',
        Index: '',
        outerVisible: false,
        innerVisible: false,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 评分
        nps: {
          score: '',
          comments: '',
           bad: this.$t('Lang.public.Nps.bad'),
          Notbad: this.$t('Lang.public.Nps.Notbad'),
          nice: this.$t('Lang.public.Nps.nice'),
          image: '',
          adType: null
        },
        search: '',
        prop: '',
        order: ''
      }
    },
    created() {
      this.getList();
    },
    computed: {
      ...mapGetters([
          'itcode'
        ])
    },
    methods: {
      handleClose() { // 点击关闭
        this.discussType = false
      },
      getList(page, prop, order, keyword, type) {
        Api.RequestList({page, prop, order, keyword, type, user_page: 'admin_page'}).then((res) => {
            this.tableData = res.data_list
            this.Allpage = res.all_page
            // this.ApplicantList = [...new Set(res.data_list.map((item, index) => { return item.applicant }))].map((item, index) => { return { text: item, value: item } })
        })
      },
      Search() {
        this.getList(this.PageIndex, this.prop, this.order, this.search, 'search')
      },
      formatter(row, column) {
        return row.address;
      },
      openTimeLine(index, row) {
        this.dialogVisible = true
        Api.RequestTimeLine({task_id: this.tableData[index].ticket_id}).then((res) => {
            this.activities = res
        })
      },
      openDetails(index, row) {
        this.detailsType = true
        Api.RequestDatils({task_id: this.tableData[index].ticket_id, type: 'info'}).then((res) => {
            this.Datils = res
        })
      },
      currentPages(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      prev_click(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      next_click(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      OpenNps(index, row) {
        this.Index = index
        this.outerVisible = true
        Api.getNps({task_id: this.tableData[index].ticket_id}).then((res) => {
            this.nps.score = res.nps_list.length !== 0 ? res.nps_list[0].score : this.score = ''
            this.nps.comments = res.nps_list.length !== 0 ? res.nps_list[0].comments : ''
        })
      },
      Rate() {
          this.innerVisible = true
      },
      RateClose() {
        this.innerVisible = false
        this.nps.score = ''
        this.nps.image = ''
        this.$refs.upload.clearFiles()
      },
      uploadOK(file) { // 评分上传图片
        this.nps.image = `${GLOBAL.HOME + file.data}`
      },
      removeFile(file) {
        this.nps.image = ''
      },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        const fileTypeName = (file.name).substring(file.name.lastIndexOf('.') + 1); // 获取后缀名
        // （0图片，1视频，2文字,3声音
        let supportFormat = ['jpeg', 'mp3', 'mkv', 'wav', 'ogg', '3gp', 'mp4', 'm4a', 'aac', 'ts', 'flac', '3gp', 'mp4', 'mkv', 'txt', 'jpg', 'png', 'gif', 'JPEG'];
        this.nps.adType = ['jpg', 'png', 'jpeg'].includes(fileTypeName) ? 0 : -1
        let index = supportFormat.indexOf(fileTypeName);
        if (index === -1) { // 说明核实不符合
          this.$message({
            message: this.$t('Lang.public.Nps.No_up'),
            type: 'warning',
            offset: 350
          });
          return false;
        } else {
          // 图片文件大小限制，限制在500kb
            const isLt500kb = file.size / 1024 / 1024 < 0.5;
            if (!isLt500kb) {
              this.$message.error(this.$t('Lang.public.Nps.up_size'));
            }
            return isLt500kb;
        }
      },
      AddNps() {
          Api.AddNps({task_id: this.tableData[this.Index].ticket_id, score: this.nps.score, comments: this.nps.comments}).then((res) => {
              if (res.result === 1) {
                this.$message({
                    type: 'success',
                    message: this.$t('Lang.public.Nps.Reta_succ'),
                    offset: 350
                });
                this.innerVisible = false
                this.outerVisible = false
                this.getList(this.PageIndex);
              } else {
                this.$message({
                    type: 'error',
                    message: res.Msg,
                    offset: 350
                });
              }
            this.nps.score = ''
            this.nps.comments = ''
            this.nps.image = ''
            this.$refs.upload.clearFiles()
          })
      },
      rowClass({ row, column, rowIndex, columnIndex }) {
         if (columnIndex === 6) return 'allaction'
      },
      changeTableSort(column) {
        this.prop = column.prop;
        this.order = column.order;
        Api.RequestList({page: this.PageIndex, prop: column.prop, order: column.order}).then((res) => {
            this.tableData = res.data_list
            this.Allpage = res.all_page
        })
      }
    }
  }
  // 日志1 分页组件二次封装完成 可以正常使用
</script>
<style lang="scss" scoped>
.Discuss .el-dialog__body{
  display: flex !important;
}
.Discuss .el-dialog__body>form{
  width: 445px !important;
}
body .scroll_commit{
  width: 400px;
  height: 355px !important;
  margin-left: 20px;
  overflow-y: scroll;
}
body .scroll_commit{
  width: 400px;
  height: 355px !important;
  margin-left: 20px;
  overflow-y: scroll;
}
.details .el-dialog__body .item>p>span:nth-of-type(1){
  font-weight: 600 !important;
}
.allaction{
  >div{
    display: flex !important;
  }
}
.All_ticket_title{
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chart>div>div:nth-of-type(2){
  height: 300px !important;
}
.hint_title{
  width: 75%;
  display: flex;
  padding: 30px 0 0 0;
  >span{
    flex: 1;
    text-align: left;
    text-indent: 1em;
    &:nth-of-type(2){
      text-align: right;
    }
  }
}
.Admin_My_ticket_Name{
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto;
}
</style>
