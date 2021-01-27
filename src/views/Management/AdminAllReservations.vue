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
                  prop='sutName'>
                  <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.sutName" placement="top-start">
                        <div @click="sutName(scope.row.sutid)" class="sutName">{{scope.row.sutName}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Uefi"
                  align='center'
                header-align='center'
                  prop='uefi_signed'>
                </el-table-column>
                <el-table-column
                  label="Xcc"
                  align='center'
                header-align='center'
                  prop='xcc_signed'>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.IP')"
                align='center'
                header-align='center'>
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="$t('Lang.public.Reservation_label.Click_open')" placement="top-start">
                        <a style="cursor: pointer;text-decoration:none;color:#333;" :href="`https://${scope.row.sut_ip}`" target="_blank">{{scope.row.sut_ip}}</a>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.User')"
                align='center'
                header-align='center'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="$t('Lang.public.Reservation_label.click_copy')" placement="top-start">
                    <span style="cursor: pointer;" @click='Copy(scope.$index, scope.row.sut_user)'>{{scope.row.sut_user}}</span>
                  </el-tooltip>
                </template>
                </el-table-column>
                 <el-table-column
                :label="$t('Lang.public.Reservation_label.PW')"
                align='center'
                header-align='center'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="$t('Lang.public.Reservation_label.don_copy') | Reg(scope.row.startdatetimeStr, scope.row.enddatetimeStr, 'tooltip', than)" placement="top-start">
                    <span style="cursor: pointer;" @click='plottableDoubleClick(scope.row.startdatetimeStr, scope.row.enddatetimeStr) && Copy(scope.$index, scope.row.sut_pw)'>{{scope.row.sut_pw | Reg(scope.row.startdatetimeStr, scope.row.enddatetimeStr, 'password')}}</span>
                  </el-tooltip>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.Start')"
                prop='startdatetimeStr'
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.startdatetimeStr).toLocaleDateString().split('/').join('-')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.End')"
                align='center'
                prop='enddatetimeStr'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.enddatetimeStr).toLocaleDateString().split('/').join('-')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.Usage')"
                align='center'
                header-align='center'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.usage" placement="top-start">
                        <div class="Usage">{{ scope.row.usage }}</div>
                  </el-tooltip>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.public.Reservation_label.Applicant')"
                align='center'
                header-align='center'>
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                        <div slot="content">
                          <span>{{$t('Lang.public.Message.top')}}</span><br/>
                            <a :href="`sips:<${scope.row.itcode}@lenovo.com>`" class="link_Skip">
                              {{scope.row.itcode}}
                            </a>
                        </div>
                        <div>{{scope.row.itcode}}</div>
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
                    <!-- 修改 -->
                      <el-tooltip class="item" effect="dark" :content="$t('Lang.Views.Sut.MyReservation.edit_text')" placement="top-start">
                        <el-button
                          class="Pulcla"
                          :disabled="!scope.row.validbook || scope.row.enddatetimeStr | time(scope.row.enddatetimeStr)"
                          @click="handleEdit(scope.$index, scope.row)"
                          icon='el-icon-edit'
                          ></el-button>
                      </el-tooltip>
                      <!-- 删除 -->
                      <el-tooltip class="item" effect="dark" :content="scope.row.validbook ? $t('Lang.Views.Sut.MyReservation.Cancel') : $t('Lang.Views.Sut.MyReservation.Canceled')" placement="top-start">
                      <el-popconfirm
                        :confirmButtonText="$t('Lang.public.ConfirmBtn')"
                        :cancelButtonText="$t('Lang.public.CancelBtn')"
                        :title="$t('Lang.Views.Sut.MyReservation.delete_title')"
                        @onConfirm="Delete(scope.$index, scope.row)">
                          <el-button
                          type="danger"
                          class="Pulcla"
                          slot="reference"
                          :disabled="!scope.row.validbook"
                          icon='el-icon-delete'
                          ></el-button>
                      </el-popconfirm>
                      </el-tooltip>
                      <!-- 下载log -->
                      <el-tooltip class="item" effect="dark" :content="$t('Lang.Views.Sut.MyReservation.Log_cont')" placement="top-start">
                        <el-button
                        type="primary"
                        class="Pulcla"
                        :disabled="!scope.row.validbook || scope.row.enddatetimeStr | time(scope.row.enddatetimeStr)"
                        :loading="Index3 === scope.$index"
                        :icon="Index3 !== scope.$index ? 'el-icon-download' : ''"
                        @click='download(scope.$index, scope.row)'
                        ></el-button>
                      </el-tooltip>
                      <!-- 跳转到工单 -->
                      <el-tooltip class="item" effect="dark" :content="$t('Lang.Views.Sut.MyReservation.request_title')" placement="top-start">
                        <el-button
                        class="Pulcla"
                        :disabled="!scope.row.validbook || scope.row.enddatetimeStr | time(scope.row.enddatetimeStr)"
                        @click="Goback(scope.row, scope.row.bookid, scope.row.sutid)"
                        ><i class="iconfont icon-kefu"></i></el-button>
                      </el-tooltip>
                      <!-- 跳转到saat -->
                      <el-tooltip class="item" effect="dark" :content="$t('Lang.Views.Sut.MyReservation.GOSaat')" placement="top-start">
                        <el-button
                        class="Pulcla btn"
                        @click="GOSaat"
                        :disabled="!scope.row.validbook || scope.row.enddatetimeStr | time(scope.row.enddatetimeStr)">
                          <img src="../../assets/img/saat-blue.png" alt="">
                        </el-button>
                      </el-tooltip>
                  </template>
                </el-table-column>
          </el-table>
           <!-- 分页组件 -->
            <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
            </el-pagination>
        </el-card>
        <!-- 修改 -->
        <el-dialog
            :title="$t('Lang.Views.Sut.MyReservation.edit_text')"
            :visible.sync="dialogVisible"
            width="50%"
            class="body_commit"
            :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="100px"  :model="formLabelAlign" class="from_left">
                <el-form-item :label="$t('Lang.public.Reservation_label.Select_Dates')">
                    <el-date-picker
                      v-model="Select_Dates"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      class="Reserpicker"
                      range-separator="-"
                      :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                      :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')">
                  </el-date-picker>
                </el-form-item>
                  <el-form-item :label="$t('Lang.public.Reservation_label.Comments')">
                    <el-input v-model="OsUsage" :placeholder="$t('Lang.public.Reservation_label.Please_enter_content')" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <!-- 卡片 -->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeTime()">{{$t('Lang.public.SubBtn')}}</el-button>
            </span>
        </el-dialog>
        <!-- over -->
        <!-- 聊天 -->
        <el-dialog
            :title="$t('Lang.public.Reservation_label.Chat')"
            :visible.sync="DiscussType"
            width="50%"
            class="body_commit"
            :before-close="handleClose">
            <!-- 卡片 -->
            <el-card class="chat">
              <span v-if='message_commitList_type === true' style="color:#000;text-align:center;width:100%;display:block;">{{$t('Lang.public.No_data')}}</span>
              <div v-for='(i, index) in message_commitList' :key='index'>
                  <span>{{itcode.type}}&nbsp;</span><span>{{i.committext}}</span>
                  <span>Time:&nbsp;</span><span>{{i.createtime}}</span>
                  <el-divider></el-divider>
              </div>
            </el-card>
            <el-form :label-position="labelPosition" label-width="100px"  :model="formLabelAlign" class="Chat_left">
              <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="$t('Lang.public.Reservation_label.Please_enter_content')"
                  v-model="formLabelAlign.committext">
              </el-input>
              <el-button type="primary" @click="AddCommit()" class="add_commit">{{$t('Lang.public.Add')}}</el-button>
            </el-form>
        </el-dialog>
        <!-- 下载log -->
        <LogFile
        :LogTypes="LogType"
        :bookids="bookid"
        :sutnames="sutname"
        :Index="Index2"
        @OFFDrow="offDrow($event)"
        ></LogFile>
  </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import LogFile from '../../components/reservation/LogFile'
export default {
    components: {
      LogFile
    },
    data() {
      return {
        than: this,
        tableData: [],
        dialogVisible: false,
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
        message_commitList: [], // 对应的commit 信息
        message_commitList_type: true,
        OsUsage: '',
        LogType: false, // 下载log的弹框判断
        bookid: '',
        sutname: '',
        search: '',
        prop: '',
        order: '',
        Index2: '',
        Index3: undefined,
        sutid: '',
        DiscussType: false // 聊天的类型
      }
    },
    filters: {
      'Reg': (val, start, end, type, than) => {
          var reg = /([\x21-\x7e]|[^A-Za-z0-9])/igm;
          let curDate = new Date().toLocaleDateString().split('/')[0] + '-' + (new Date().toLocaleDateString().split('/')[1] < 10 ? '0' + new Date().toLocaleDateString().split('/')[1] : new Date().toLocaleDateString().split('/')[1]) + '-' + (new Date().toLocaleDateString().split('/')[2] < 10 ? '0' + new Date().toLocaleDateString().split('/')[2] : new Date().toLocaleDateString().split('/')[2])
          curDate = new Date(curDate).getTime()
          var startDate = new Date(start).getTime()
          var endDate = new Date(end).getTime()
            if ((curDate >= startDate && curDate <= endDate) || (curDate === startDate && curDate === endDate && startDate === endDate)) {
              return type === 'password' ? val : than.$t('Lang.public.Reservation_label.click_copy');
            } else {
              return type === 'password' ? val.replace(reg, (a, b) => '*'.repeat(a.length)) : than.$t('Lang.public.Reservation_label.don_copy');
            }
        },
        'time': (val) => {
          return new Date(val).getTime() < (new Date().getTime() - (24 * 60 * 60 * 1000))
        }
    },
    created() {
      this.getResevaList(this.oldPages, this.newPages)
    },
    computed: {
        ...mapGetters([
            'itcode'
          ])
    },
    methods: {
      plottableDoubleClick(start, end) {
        let curDate = new Date().toLocaleDateString().split('/')[0] + '-' + (new Date().toLocaleDateString().split('/')[1] < 10 ? '0' + new Date().toLocaleDateString().split('/')[1] : new Date().toLocaleDateString().split('/')[1]) + '-' + (new Date().toLocaleDateString().split('/')[2] < 10 ? '0' + new Date().toLocaleDateString().split('/')[2] : new Date().toLocaleDateString().split('/')[2])
        curDate = new Date(curDate).getTime()
        let startDate = new Date(start).getTime()
        let endDate = new Date(end).getTime()
        if ((curDate >= startDate && curDate <= endDate) || (curDate === startDate && curDate === endDate && startDate === endDate)) {
          return true
        } else {
          return false
        }
      },
      offDrow(data) {
        this.LogType = data.LogType
        this.Index3 = data.Index3
      },
      getResevaList(page, prop, order, keyword, type) { // 获取所有的列表
        Api.getReserList({page, prop, order, keyword, type, user_page: 'admin_page'}).then((res) => {
          this.tableData = res.data
          this.Allpage = res.all_page
        })
      },
      Search() {
        this.getResevaList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      handleEdit(index, row) { // 点击查看当前的message信息
          this.Select_Dates = [new Date(this.tableData[index].startdatetimeStr).toLocaleDateString().replace(/\//g, '-'), new Date(this.tableData[index].enddatetimeStr).toLocaleDateString().replace(/\//g, '-')]
          this.Index = this.tableData[index].bookid
          this.sutid = this.tableData[index].sutid
          this.dialogVisible = true
      },
      Delete(index, row) {
        this.Index = index
        Api.DeleteReser({sutbook: {bookid: this.tableData[index].bookid}, action: 'delete'}).then((res) => {
            if (res.success === true) {
              this.$message({
                  type: 'success',
                  message: this.$t('Lang.public.Message.delete'),
                  offset: 350
              });
              this.getResevaList(this.PageIndex)
            } else {
              this.$message({
                  type: 'error',
                  message: res.meg,
                  offset: 350
              });
            }
        })
      },
      currentPages(val) {
        this.PageIndex = val
        this.getResevaList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      prev_click(val) {
        this.PageIndex = val
        this.getResevaList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      next_click(val) {
        this.PageIndex = val
        this.getResevaList(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
      },
      handleClose(done) {
        this.dialogVisible = false
        this.DiscussType = false
        this.comments = ''
        this.formLabelAlign = {
          createtime: '',
          committext: '',
          bookid: ''
        }
      },
      // 点击跳转
      sutName(id) {
        this.$router.push({name: 'Details', query: {id}})
      },
      AddCommit() {
        if (this.formLabelAlign.committext !== '') {
          this.formLabelAlign.createtime = new Date().toLocaleDateString()
          this.formLabelAlign.bookid = this.Index
          Api.AddCommits({commitbook: {...this.formLabelAlign}, action: 'add'}).then((res) => {
                this.message_commitList.push(res.data)
                this.formLabelAlign = {
                  committext: '',
                  createtime: ''
                }
            })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('Lang.public.Message.commit'),
            offser: 350
          });
        }
      },
      changeTime() {
        if (this.OsUsage !== '') {
          Api.ChangeTimeUsage({sutbook: {startdatetimeStr: this.Select_Dates[0], enddatetimeStr: this.Select_Dates[1], usage: this.OsUsage, bookid: this.Index, sutid: this.sutid}, action: 'update'}).then((res) => {
            this.dialogVisible = false
              this.$message({
                message: res.success === true ? this.$t('Lang.public.Message.edit') : res.msg,
                type: res.success === true ? 'success' : 'error',
                offset: 350
              });
              res.success && this.getResevaList(this.PageIndex, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
          })
        } else {
          this.$message({
              message: this.$t('Lang.Views.Sut.MyReservation.edit_time'),
              type: 'error',
              offset: 350
          });
        }
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
      download(index, row) {
        this.bookid = this.tableData[index].bookid
        this.sutname = this.tableData[index].sutName
        this.LogType = true
        this.Index2 = index
      },
      Discuss(index, row) { // 聊天的
        Api.getCommitBook({bookid: this.tableData[index].bookid}).then((res) => {
              if (res.data.length !== 0) {
                this.message_commitList = res.data
                this.message_commitList_type = false
              }
              // 需要修改 起始时间和结束时间Select_Dates。 push方法
            })
          this.Index = this.tableData[index].bookid
          this.sutid = this.tableData[index].sutid
          this.DiscussType = true
      },
      Goback(item, bookid, sutid) {
        sessionStorage.splist = JSON.stringify(item)
        this.$router.push({name: this.$t('Lang.module.Sidebr.New_Request'), params: {crumb: 'sub'}, query: {sutid}})
      },
      changeTableSort(column) {
        this.prop = column.prop;
        this.order = column.order;
        this.getResevaList(this.PageIndex, column.prop, column.order, this.search, this.search !== '' ? 'search' : '')
      },
      GOSaat() {
        window.open('http://10.245.29.143/p/#/suts')
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
.from_left{
  width: 85%;
}
.from_left{
  >div:nth-of-type(1){
    width: 60% !important;
  }
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
  height: 50px;
  margin-top: 66px;
  margin-left: 10px;
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
.Reserpicker{
  width: auto !important;
}
.Raction{
  >button{
    margin-left: 0px !important;
    padding: 7px 12px !important;
  }
}
.OSUsername,.OSPassword,.OSIp{
  width: 32.333% !important;
  display: inline-block !important;
}
.LXPM, .UEFI{
  >div{
    width:62% !important;
    display: inline-block !important;
  }
}
.ONECLI{
  >div{
    width: 80% !important;
    display: inline-block !important;
    >div{
      >div{
        width: 25.366667%;
      }
    }
  }
}
.OSConfig>div>div:nth-of-type(1)>div{
  margin: 5px 0 !important;
}
.Pulcla{
    margin-left: 0px!important;
    padding: 7px 7px!important;
}
.sloganImage{
  width: 100%;
  height: 100%;
  margin: auto;
  >img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
.Chat_left{
  display: flex;
  margin-top: 10px;
}
</style>
