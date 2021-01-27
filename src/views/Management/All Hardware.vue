<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *       批量上传只差对于接口的判断，判断各个response的状态去分批处理数据进行生产Excel
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 -->

<template>
  <div>
    <div class="topbox" style="width: 97%;margin:0 auto;margin-top: 10px;display: flex;justify-content: space-between;">
      <!-- 添加机台add -->
      <el-button class="addbtn" type="primary" @click="AddSut" >{{$t('Lang.public.Add')}}</el-button>
      <!-- 更新所有当前Online机台配置信息 -->
      <!-- <el-button class="addbtn" type="primary" @click="handleUpdate">{{$t('Lang.Views.Manage.Detalis.Update')}}</el-button> -->
      <!-- 导入 -->
      <el-button class="addbtn" type="primary" @click="Addimport">{{$t('Lang.public.Impbtn')}}</el-button>
      <!-- 查看进度 -->
      <el-button class="addbtn" v-show="TaskType || jobId!==null" type="primary" @click="QueryLike">{{$t('Lang.Views.Manage.All_Hardware.Task_query')}}</el-button>
      <!-- 搜索 -->
      <div class="dateSearch" style="display: flex;width:50%;height: 40px;margin-top: 5px;">
        <!-- 联级筛选框 -->
        <div class="block" style="width:53%;margin-right: -2px;border-right: none;">
          <el-cascader
            v-model="optionItem"
            :options="optionList"
            :props="{ checkStrictly: true }"
            @visible-change="searchSel($event, optionItem)"
            @change="Search()"
            clearable></el-cascader>
        </div>
        <!-- 搜索input框 -->
        <el-input
        :placeholder="placType"
        v-model="search"
        clearable
        @focus="placType = ''"
        @blur="placType = 'Please enter search'"
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
        height="630"
        :data="SutData"
        highlight="true"
        header-row-class-name="headerSize"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 隐藏 -->
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Hide')"
          width="55"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-if="changeData.length !== 0"
              v-model="changeData[scope.$index].Type"
              @change="ChangeHidden(changeData[scope.$index].Type, scope.$index, scope.row.ID)"
            />
          </template>
        </el-table-column>
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
                @click="sutName(scope.row.ID, scope.row.uuid)"
              >{{ scope.row.sutName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Release')"
          align="center"
          prop="release"
          header-align="center"
        />
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Site')"
          align="center"
          prop="lablocation"
          header-align="center"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.lablocation }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Lab')"
          align="center"
          prop="lab"
          header-align="center"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.lab }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Rack')"
          align="center"
          prop="rack"
          header-align="center"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.rack }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Slot')"
          align="center"
          prop="slot"
          header-align="center"
        >
          <template slot-scope="scope">{{ scope.row.slot }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Armory')"
          align="center"
          prop="armory"
          header-align="center"
        >
          <template slot-scope="scope">{{ scope.row.armory }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.MPO')"
          align="center"
          prop="owner"
          header-align="center"
        >
          <template slot-scope="scope">{{ scope.row.owner }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.IP')"
          align="center"
          prop="ip"
          header-align="center"
        >
          <template slot-scope="scope">{{ scope.row.ip }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('Lang.Views.Manage.project.Phase')"
          align="center"
          prop="backgroud_type"
          header-align="center"
        >
        </el-table-column>
        <!-- 机台添加进LXCA状态 -->
        <!-- <el-table-column :label="$t('Lang.Views.Manage.All_Hardware.LXCA_Status')" align="center" prop="statusKey" header-align="center" >
          <template slot-scope="scope">
            {{ scope.row.lxca_status }}
          </template>
        </el-table-column> -->
        <!-- LXCA操作按钮 -->
        <!-- <el-table-column
          :label="$t('Lang.Views.Manage.All_Hardware.Action')"
          align="right"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.lxca_status === 'Online'" size="mini"
            type="danger" style="width: 75%;" @click="moveBtn(scope.row.ID, scope.row.ip, scope.row.uuid, scope.$index)" >
              {{$t('Lang.Views.Manage.All_Hardware.Remove')}}
            </el-button>
            <el-button
              v-if="scope.row.lxca_status === 'Offline'" size="mini" type="primary" style="width: 75%;"
              @click="popBtn(scope.row.ID, scope.$index)">{{$t('Lang.public.Add')}}</el-button>
          </template>
        </el-table-column> -->
        <!-- over -->
        <el-table-column :label="$t('Lang.Views.Manage.All_Hardware.Operation')" align="center" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.ID, scope.$index)">{{$t('Lang.public.DeBtn')}}</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleIp(scope.row.ID, scope.$index)">IP</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- Add添加到lxca弹窗 -->
      <!-- <el-dialog title="Add" :visible.sync="dialogFormVisible">
        <el-form :model="lxcaForm">
          <el-form-item class="clearfix" :label="$t('Lang.Views.Manage.All_Hardware.IP')" :label-width="formLabelWidth">
            <el-input v-model="lxcaForm.sutip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" :label="$t('Lang.Views.Manage.Admin_sut.XCC_USER')" :label-width="formLabelWidth">
            <el-input v-model="lxcaForm.user"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" :label="$t('Lang.Views.Manage.Admin_sut.XCC_PW')" :label-width="formLabelWidth">
            <el-input v-model="lxcaForm.pw" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addBtn">OK</el-button>
        </div>
      </el-dialog> -->
      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="(Allpage * 10)"
        @current-change="currentPages"
        @prev-click="prev_click"
        @next-click="next_click"/></div>
    <!-- 机台详情信息over -->
    <!-- 机器批量导入 -->
    <el-dialog
      :title="$t('Lang.Views.Manage.All_Hardware.sysimport')"
      :visible.sync="ErrorType"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :width="MaxWidth >= 1920 ? '21%' : '26%'"
      :before-close="ErrorClose">
      <el-upload
        class="File_upload"
        drag
        ref="upload"
        :limit='1'
        :action="GLOBAL.HOME + '/p/fw/importSut?validationOnly=true'"
        :on-remove="removeFile"
        :on-success="uploadOK"
        :before-upload="beforeUpload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><div v-html="$t('Lang.Views.Manage.All_Hardware.upFile')"></div></div>
        <div class="el-upload__tip" slot="tip">{{$t('Lang.Views.Manage.All_Hardware.upSize')}}</div>
      </el-upload>
      <span slot="footer" class="File_btn">
        <!-- <el-button @click="dialogVisible = false">{{$t('Lang.public.CancelBtn')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$t('Lang.public.ConfirmBtn')}}</el-button> -->
        <transition name="el-fade-in-linear">
          <el-button v-show="dowType" type="primary" @click="DownloadError">{{$t('Lang.public.DownBtn')}}</el-button>
        </transition>
        <transition name="el-fade-in-linear">
          <el-button v-show="TaskType || jobId!==null" type="primary" @click="QueryLike">{{$t('Lang.Views.Manage.All_Hardware.Task_query')}}</el-button>
        </transition>
      </span>
    </el-dialog>
    <!-- 信息表格 -->
    <el-dialog :title="$t('Lang.Views.Manage.All_Hardware.TaskTitle')" :visible.sync="TaskShow">
      <el-table :data="gridData">
        <el-table-column property="sutate" :label="$t('Lang.Views.Sut.Mylog_allLog.label.Status')"></el-table-column>
        <el-table-column property="mesage" :label="$t('Lang.Views.Manage.All_Hardware.errorText')"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import * as Api from '@/api/api'
import GLOBAL from '../../common/global'
export default {
  data() {
    return {
      pageSize: 10,
      optionItem: [],
      optionList: [], // 后台获取联级options
      dialogFormVisible: false,
      job: '',
      checkbox: false,
      formLabelWidth: '120px',
      PageIndex: 1, // 当前下标
      Allpage: '',
      dedicate: '',
      SutData: [],
      multipleSelection: [],
      sutid: '',
      changeData: [],
      statusKey: '',
      placType: 'Please enter content',
      search: '',
      ErrorType: false,
      ErrorList: [],
      GLOBAL,
      MaxWidth: null,
      jobId: null,
      dowType: false,
      TaskType: false,
      TaskShow: false,
      gridData: []
    }
  },
  created() {
    this.job = this.$route.query.job_id
    // this.sutID = this.$route.query.id
    this.getshowsut()
    this.MaxWidth = window.innerWidth
    sessionStorage.jobID !== undefined ? this.jobId = sessionStorage.jobID : this.jobId = null
  },
  mounted() {
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth
      this.MaxWidth = window.screenWidth
    }
  },
  methods: {
    getshowsut(page, prop, order, keyword, type) {
      this.changeData = []
      Api.getShowSut({ page, prop, order, keyword, type, admin_page: 'admin_page' }).then(res => {
        if (res.success === true) {
          this.SutData = res.sut_data
          res.sut_data.map((item, index) =>
            this.changeData.push({ Type: !item.validbook })
          )
          this.Allpage = res.all_page
        }
      });
      Api.getSelected().then((res) => { if (res.success) this.optionList = res.data })
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
    // 搜索&联级筛选后搜索
    Search() {
          if (this.search !== '' && this.optionItem.length !== 0) {
            Api.SearchSut({search: this.search, location: this.optionItem}).then((res) => {
              this.SutData = res.sut_data
            })
          } else if (this.search !== '') {
            Api.SearchSut({search: this.search}).then((res) => {
              this.SutData = res.sut_data
            })
          }
      },
      // 联级筛选
      searchSel(evt, optionItem) {
        evt === false && Api.SearchSut({location: optionItem}).then((res) => {
              if (res.sut_data.length !== 0) {
                  this.SutData = res.sut_data
                  this.Allpage = res.all_page
              }
          })
      },
    // 获取隐藏check的状态
    getCheck(sutid) {
      this.ID = sutid
      Api.getCheckHidden({ id: sutid }).then(res => {
        if (res.success === true) {
        }
      })
    },
    // 设置机台显示隐藏
    ChangeHidden(checkbox, index, sutid) {
      this.ID = sutid
      checkbox = !checkbox
      Api.checkHidden({
        id: sutid,
        dedicate: checkbox === true ? '' : 'dedicate'
      }).then(res => {})
    },
    // 删除
    handleDelete(id, index) {
      this.$confirm('Whether to delete this list permanently?', 'Hint', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
        .then(() => {
          Api.Addrelease({ ID: id, action: 'delete' }).then(res => {
            if (res.success === true) {
              this.$message({
                type: 'success',
                message: 'successfully delete!',
                offset: 350
              })
            }
            this.getshowsut(this.PageIndex)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted',
            offset: 350
          })
        })
    },
    // 添加一个机器信息
    AddSut() {
      this.$router.replace('/AddPage')
    },
    // handleIp() {
    //   this.$router.push({path: '/Binding'})
    // },
    // 从LXCA释放机台
    moveBtn(sutid, ip, uuid, index) {
      this.ID = sutid
      this.ip = ip
      this.uuid = uuid
      this.joint = ip + ';' + uuid + ';' + 'Rack-Tower'
      console.log(this.joint)
      this.$confirm('Whether to remove the sut from the LXCA?', 'Hint', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
      .then(() => {
      Api.delForce({ep: this.joint, force: true, action: 'Remove', sutID: sutid}).then(res => {
        if (res.succcess === true) {
          this.$message({
                type: 'success',
                message: 'successfully remove!',
                offset: 350
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted',
            offset: 350
          })
        })
    },
    // 点击Add弹框添加lxca
    // popBtn(sutid, index) {
    //   this.ID = sutid
    //   this.dialogFormVisible = true
    //   console.log(this.ID)
    // },
    // 点击OK添加机台进lxca
    // addBtn() {
    //         Api.addForce({pw: this.lxcaForm.pw, ip: this.lxcaForm.sutip, user: this.lxcaForm.user, force: true, sutID: this.ID}).then((res) => {
    //             if (res.success === true) {
    //             }
    //         })
    //         this.dialogFormVisible = false
    // },
    // 点击update更新所有机台online信息
    // handleUpdate() {
    //     Api.updateOnline().then((res) => {
    //     })
    //   },
    // 点击sutName跳转页面
    sutName(id, uuid) {
      this.$router.push({path: '/Details', query: { id, uuid }})
    },
    ErrorClose() {
      this.ErrorType = false
    },
    Addimport() {
      this.ErrorType = true
    },
    removeFile(file) {
        console.log(file);
        this.dowType = false
    },
   async uploadOK(file) {
      console.log(file);
      switch (file.success) {
        case 1:
          this.$refs.upload.clearFiles()
          this.$message({
              message: file.data,
              type: 'success',
              offset: 350
          });
          break;
        case 2:
          this.$refs.upload.clearFiles()
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type2'),
              type: 'error',
              offset: 350
          });
          break;
          case 3:
            this.$refs.upload.clearFiles()
            sessionStorage.jobID = +file.data.jobID
            this.jobId = +file.data.jobID
            this.TaskType = true
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type3'),
              type: 'success',
              offset: 350
          });
          break;
          case 4:
          this.$refs.upload.clearFiles()
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type4'),
              type: 'error',
              offset: 350
          });
          break;
          case 5:
          this.dowType = true
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type5'),
              type: 'error',
              offset: 350
          });
          await this.ErrorList.push(file.data)
          break;
          case 6:
          this.$refs.upload.clearFiles()
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type6'),
              type: 'error',
              offset: 350
          });
          break;
          case 7:
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type7'),
              type: 'error',
              offset: 350
          });
          break;
          case 8:
          this.$message({
              message: this.$t('Lang.Views.Manage.All_Hardware.Type8'),
              type: 'error',
              offset: 350
          });
          break;
      }
    },
    beforeUpload(file) {
        const fileTypeName = (file.name).substring(file.name.lastIndexOf('.') + 1); // 获取后缀名
        let index = ['xlsx', 'xls'].indexOf(fileTypeName);
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
    DownloadError() {
      console.log(this.ErrorList);
      this.ErrorList.forEach(item => {
        this.Export2Excel(item)
      })
    },
    QueryLike() {
      Api.Requery({job_id: this.jobId}).then((res) => {
        if (res.data.constructor === Array) {
          this.TaskShow = true
          this.gridData = res.data.map((item) => { return {sutate: item.split(':')[0], mesage: item.split(':')[1]} })
        } else {
          this.$message({
              message: res.data,
              type: 'warning',
              offset: 350
          });
        }
      })
    },
    Export2Excel(dataList) {
        import('../../excel/Export2Excel').then(excel => {
        const tHeader = ['序号', '设备具体型号和主要配置', '错误信息'] // 表头
          const title = ['', '', ''] // 标题
        // 表头对应字段
          const filterVal = ['rowNumber', 'sutName', 'failedValidationMessages']
          const list = dataList
          const data = this.formatJson(filterVal, list)
          data.map(item => {
            // console.log(item)
            item.map((i, index) => {
              if (!i) {
                item[index] = ''
              }
            })
          })
          // const merges = ['A1:I1'] //合并单元格
          excel.export_json_to_excel({
            title: title,
            header: tHeader,
            data,
            // merges,
            filename: '报错的数据',
            autoWidth: true,
            bookType: 'xlsx'
          })
      })
    },
    formatJson(filterVal, jsonData) { // 数据转换
        return jsonData.map(v => filterVal.map(j => v[j]))
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
.File_upload .el-upload-list{
    overflow-y: scroll !important;
    max-height: 150px !important;
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
.File_btn{
  display: block;
  text-align: left;
}
.el-table--scrollable-y ::-webkit-scrollbar {
  display: none;
}
</style>
