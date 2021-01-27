<template>
  <div>
    <div class="topbox" style="width: 97%;margin:0 auto;margin-top: 10px;display: flex;justify-content: space-between;">
      <!-- 搜索 -->
      <div class="dateSearch" style="display: flex;width:50%;height: 40px;margin-top: 5px;">
        <!-- 联级筛选框 -->
        <!-- <div class="block" style="width:53%;margin-right: -2px;border-right: none;">
          <el-cascader
            v-model="optionItem"
            :options="optionList"
            :props="{ checkStrictly: true }"
            @visible-change="searchSel($event, optionItem)"
            @change="Search()"
            clearable></el-cascader>
        </div> -->
        <!-- 搜索input框 -->
        <el-input
        :placeholder="placType"
        v-model="search"
        clearable
        @focus="placType = ''"
        @change="Search()">
        </el-input>
        <el-button type="primary" icon="el-icon-search" class="searchBtn" style="height: 100%;" @click="Search()"></el-button>
      </div>
  </div>
    <!-- ---- -->
    <!-- 机台详情信息 -->
    <div
      class="box"
      style="width: 98%;margin: auto;margin-top: 10px;"
    >
      <el-table
        :data="SutData"
        highlight="true"
        header-row-class-name="headerSize"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.SutName')"
          prop="sutName"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.sutName"
              placement="top-start"
            >
              <div
                class="sutName"
                @click="sutNameClick(scope.row.ID, scope.row.uuid)"
              >{{ scope.row.sutName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Site')"
          align="center"
          prop="lablocation"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Lab')"
          align="center"
          prop="lab"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Rack')"
          align="center"
          prop="rack"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Slot')"
          align="center"
          prop="slot"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Armory')"
          align="center"
          prop="armory"
          header-align="center"
        >
        </el-table-column>
        <!-- 借出人使用者 -->
        <el-table-column
          :label="$t('Lang.public.Reservation_label.User')"
          align="center"
          prop="user"
          header-align="center"
        >
        </el-table-column>
        <!-- 锁定期 -->
        <el-table-column
          :label="$t('Lang.Views.Support.MainPollingOwner.LockTime')"
          align="center"
          prop="locktime"
          header-align="center"
        >
        </el-table-column>
        <!-- 发布 -->
        <el-table-column
          :label="$t('Lang.Views.Support.MainPollingOwner.UnlockDate')"
          align="center"
          header-align="center"
        >
        <template slot-scope='scope'>
            <span>{{scope.row.locktime.split(' / ')[1]}}</span>
        </template>
        </el-table-column>
        <!-- 归还时限 -->
        <el-table-column :label="$t('Lang.Views.Support.MainPollingOwner.ReturnDue')" prop="return" align="center" header-align="center" >
          <template slot-scope="scope">
            <div style="width:70%;margin-left:auto;display:flex;justify-content: space-around">
              <div style="margin-right：3px" v-if="scope.row.getReturn">{{scope.row.return}}</div>
               <el-button v-if="scope.row.getReturn" class="Pulcla" size="mini" icon='el-icon-arrow-down' @click="handleEdit(scope.$index,scope.row,scope.row.ID)"></el-button>
            </div>
            <div style="width:100%;display:flex;justify-content: space-around">
              <el-select v-model="editCommit.return" v-if="scope.row.editReturn">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" style="text-align:center">
                </el-option>
              </el-select>
               <el-button v-if="scope.row.editReturn" class="Pulcla" size="mini" icon='el-icon-check' @click="handleSave(scope.$index,scope.row,scope.row.ID)"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Operation')"
          align="right"
        >
          <template slot-scope="scope">
            <div style="display: flex">
            <!-- mpo快速预定 -->
              <el-button class="Pulcla" @click="handleDing(scope.$index, scope.row.ID)" plain icon='el-icon-edit'></el-button>
            <!-- 强制归还 -->
              <el-button size="mini" type="danger" @click="forceReturn(scope.row.ID, scope.$index)">{{$t('Lang.Views.Support.MainPollingOwner.RequestReturn')}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 创建预定弹窗 -->
      <el-dialog title="Add" :visible.sync="dialogVisible" class="body_commit">
            <el-form :model="timeForm" :rules="rules">
                    <!-- <el-form-item label="StartTime">
                      <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.startdatetimeStr"timeForm.startdatetimeStr" style="width: 100%;"></el-date-picker>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="EndTime">
                      <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.enddatetimeStr" style="width: 100%;"></el-date-picker>
                      </el-col>
                  </el-form-item> -->
                  <div class="block">
                  <!-- <span class="demonstration">默认</span> -->
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="dateChange">
                  </el-date-picker>
                </div>
                  <el-form-item  prop="usage" :label="$t('Lang.public.Reservation_label.Comments')">
                    <el-input v-model="timeForm.usage" :placeholder="$t('Lang.public.Reservation_label.Please_enter_content')" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="timeBtn(ID)">OK</el-button>
            </div>
        </el-dialog>
      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="(Allpage * 10)"
        @current-change="currentPages"
        @prev-click="prev_click"
        @next-click="next_click"
      />
    </div>
    <!-- 机台详情信息over -->
  </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      sut_location: '',
      pw: '',
      lablocation: '',
      ip: '',
      user: '',
      sutName: '',
      dialogVisible: false,
      resLock: '',
      optionItem: [],
      optionList: [], // 后台获取联级options
      formLabelWidth: '120px',
      PageIndex: 1, // 当前下标
      Allpage: '',
      SutData: [],
      value1: [],
      sutid: '',
      placType: 'Please enter content',
      search: '',
      endtimeArr: [],
      editCommit: {
        return: ''
      },
      options: [{
          value: '1',
          label: '1'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '7',
          label: '7'
        }],
      value: '',
      timeForm: {
        startdatetimeStr: '',
        enddatetimeStr: '',
        usage: ''
      },
      rules: {
        usage: [
          { required: true, message: 'Please enter content', trigger: 'blur' }
          ]
      }
    }
  },
  created() {
    // this.job = this.$route.query.job_id
    this.getshowsut()
  },
  computed: {
        ...mapGetters([
            'itcode'
          ])
    },
  methods: {
    dateChange(val) {
      if (val) {
        this.timeForm.startdatetimeStr = val[0]
        this.timeForm.enddatetimeStr = val[1]
      } else {
         this.timeForm.startdatetimeStr = ''
        this.timeForm.enddatetimeStr = ''
      }
    },
    getshowsut(search, page, prop, order, keyword, type) {
      Api.getMPOList({ search, page, prop, order, keyword, type, admin_page: 'admin_page' }).then(res => {
        if (res.success === true) {
          // this.SutData = res.sut_data
          this.Allpage = res.all_page
          this.SutData = res.sut_data.map((val) => {
                    val.editReturn = false;
                    val.getReturn = true;
                    return val
                })
        }
      });
      Api.getSelected().then((res) => { if (res.success) this.optionList = res.data })
    },
    handleEdit(index, row, ID) {
            this.$set(this.SutData[index], 'editReturn', true)
            this.$set(this.SutData[index], 'getReturn', false)
            this.editCommit.return = row.return;
    },
    // 编辑保存
    handleSave(index, row, ID) {
          Api.checkLock({ ...this.editCommit, sutid: ID, action: 'add' }).then((res) => {
              this.getshowsut()
          })
    },
    // 搜索
    Search() {
      if (this.search !== '') {
            this.getshowsut(this.search, this.PageIndex)
          }
      },
      // 联级筛选
      // searchSel(evt, optionItem) {
      //   evt === false && Api.SearchSut({location: optionItem}).then((res) => {
      //         if (res.sut_data.length !== 0) {
      //             this.SutData = res.sut_data
      //             this.Allpage = res.all_page
      //         }
      //     })
      // },
    // 强制归还
    forceReturn(ID, index) {
      this.$confirm(this.$t('Lang.Views.Support.MainPollingOwner.returnMesg'), 'Hint', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
        .then(() => {
          Api.checkLock({ sutid: ID, action: 'update' }).then(res => {
            if (res.success === true) {
              this.$message({
                type: 'success',
                message: this.$t('Lang.Views.Support.MainPollingOwner.returnYes'),
                offset: 350
              })
            }
            this.getshowsut(this.PageIndex)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('Lang.Views.Support.MainPollingOwner.returnNo'),
            offset: 350
          })
        })
    },
    // mpo快速预定按钮
    handleDing(index, ID) {
      this.dialogVisible = true
      this.sutid = this.SutData[index].ID
      this.pw = this.SutData[index].pw
      this.lablocation = this.SutData[index].lablocation
      this.ip = this.SutData[index].ip
      this.user = this.SutData.user
      this.sutName = this.SutData[index].sutName
      this.sut_location = this.SutData[index].sut_location
    },
    // 预定ok按钮
    timeBtn(ID) {
      Api.CreateRelease({sutbook:
      {...this.timeForm,
      sutLoginPassword: this.pw,
      sutid: this.sutid,
      sutIP: this.ip,
      sutLoginUser: this.user,
      sutName: this.sutName,
      lablocation: this.lablocation,
      sut_location: this.sut_location,
      itcode: this.itcode.type},
      action: 'add'}).then((res) => {
        if (res.success === true) {
        this.$message({
            type: 'success',
            message: this.$t('Lang.Views.Sut.CreateReservation.S_m_R'),
            offset: 350
        })
        this.dialogVisible = false
        } else {
          this.$message({
              type: 'error',
              message: res.msg,
              offset: 350
        })
      }
      })
    },
    currentPages(val) {
      this.PageIndex = val
      this.getshowsut(
        val,
        this.prop,
        this.order,
        this.search,
        this.search !== '' ? 'search' : ''
      )
    },
    prev_click(val) {
      this.PageIndex = val
      this.getshowsut(
        val,
        this.prop,
        this.order,
        this.search,
        this.search !== '' ? 'search' : ''
      )
    },
    next_click(val) {
      this.PageIndex = val
      this.getshowsut(
        val,
        this.prop,
        this.order,
        this.search,
        this.search !== '' ? 'search' : ''
      )
    },
    // 点击sutName跳转页面
    sutNameClick(id, uuid) {
      this.$router.push({path: '/Details', query: { id, uuid }})
    }
  }
}
</script>
<style>
.pagination {
  margin-right: auto;
  margin-top: 30px;
}

.checkbox .el-checkbox__label {
  font-size: 17px !important;
  font-weight: 600 !important;
}

.checkbox .el-checkbox__inner {
  width: 17px;
  height: 17px;
}
.Pulcla{
    margin-left: 0px!important;
    padding: 6px 6px!important;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.addbtn {
  margin-top: 10px;
  /* margin-left: 20px; */
  margin-bottom: 20px;
}

.checkbox {
  margin-left: 30px;
}
</style>
