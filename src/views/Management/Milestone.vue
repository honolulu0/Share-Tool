<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <div @click="$router.go(-1)" style="font-size:27px;margin-botton:4px; color: rgb(96, 98, 102);">＜{{$t('Lang.public.ReturnBtn')}}</div>
                <!-- <el-button type="danger" plain style="width:70px;margin-left:50px" v-if="!isEdit" @click="handleEdit">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                <el-button type="primary" plain style="width:70px" v-if="isEdit" @click="handleSave">{{$t('Lang.Views.Manage.Admin_sut.Save')}}</el-button> -->
            </div>
            <div class="releaseData">
              <div>
                <span>{{$t('Lang.Views.Manage.project.Codename')}}</span>&nbsp;<span v-if="!isEdit">{{MessAge.code_name}}</span>
                <el-input type="text" v-model="changeAge.code_name" v-if="isEdit"></el-input>
              </div>
              <div>
                  <span>{{$t('Lang.Views.Manage.project.Platform')}}</span>&nbsp;<span v-if="!isEdit">{{MessAge.platform}}</span>
                  <el-input type="text" v-model="changeAge.platform" v-if="isEdit"></el-input>
                </div>
                <div>
                  <span>LTE:</span>&nbsp;<span v-if="!isEdit">{{MessAge.lte}}</span>
                  <el-input type="text" v-model="changeAge.lte" v-if="isEdit"></el-input>
                </div>
                <div>
                  <span>SL(system lead):</span>&nbsp;<span v-if="!isEdit">{{MessAge.sl}}</span>
                  <el-input type="text" v-model="changeAge.sl" v-if="isEdit"></el-input>
                </div>
                <div>
                  <span>TPM:</span>&nbsp;<span v-if="!isEdit">{{MessAge.tpm}}</span>
                  <el-input type="text" v-model="changeAge.tpm" v-if="isEdit"></el-input>
                </div>
                <div>
                  <span>Wave:</span>&nbsp;<span v-if="!isEdit">{{MessAge.wave}}</span>
                  <el-input type="text" v-model="changeAge.wave" v-if="isEdit"></el-input>
                </div>
            </div>
        </el-card>
        <el-table
        :data="tableData"
        :cell-class-name="rowClass"
        :row-style="{height: '0'}"
        :cell-style="{padding: '0'}"
        style="width:100%">
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.configuration')">
            <el-table-column align='center' label="CPU" prop="cpu_number">
                <template slot-scope="scope">
                    <div>{{scope.row.cpu_number}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' label="GPU" prop="gpu_number">
                <template slot-scope="scope">
                    <div>{{scope.row.gpu_number}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' label="M.2" prop="m2_number">
                <!--input-->
                <template slot-scope="scope">
                    <div>{{scope.row.m2_number}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' label="Memory" prop="memory_number">
                <template slot-scope="scope">
                    <div>{{scope.row.memory_number}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column  align='center' label="MemoryType" prop="memory_type">
                <template slot-scope="scope">
                    <div>{{scope.row.memory_type}}</div>
                </template>
            </el-table-column> -->
            <el-table-column align='center' label="SATA" prop="sata_number">
                <template slot-scope="scope">
                    <div>{{scope.row.sata_number}}</div>
                </template>
            </el-table-column>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column align='center' label="Operation" width='200px' header-align='center'>
                <template slot="header">
                  <el-button size="mini" @click="AddConfig" icon='el-icon-circle-plus-outline'>{{$t('Lang.Views.Manage.project.config')}}</el-button>
                </template>
                <template slot-scope="scope">
                        <el-button style="margin-top:5px;margin-bottom:5px" size="mini" @click="configEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                        <!-- 编辑保存按钮 -->
                        <!-- <el-button size="mini" type="danger" @click="configSave(scope.row.id)">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button> -->
                        <!-- 删除 -->
                        <el-button style="margin-top:5px;margin-bottom:5px" size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('Lang.public.DeBtn')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 时间 -->
        <el-table
        :data="timeData"
        :cell-class-name="rowClass"
        :row-style="{height: '0'}"
        :cell-style="{padding: '0'}"
        style="width:100%;margin-top:20px;margin-bottom:30px">
            <!-- <el-table-column align='center' label="ID" prop="id">
                <template slot-scope="scope">
                    <div>{{scope.row.id}}</div>
                </template>
            </el-table-column> -->
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.Milestone')">
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.Phase')" prop="node_name">
                <!-- <template slot-scope="scope">
                    <div>{{scope.row.node_name}}</div>
                </template> -->
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.Entry')" prop="start_time">
                <template slot-scope="scope">
                    <div>{{scope.row.start_time}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.Exit')" prop="end_time">
                <template slot-scope="scope">
                    <div>{{scope.row.end_time}}</div>
                </template>
            </el-table-column>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column width='200px' align='center' header-align='center'>
              <template slot="header">
              <!-- 添加项目时间节点button -->
              <el-button size="mini" @click="AddTime" icon='el-icon-circle-plus-outline'>{{$t('Lang.Views.Manage.project.Milestone')}}</el-button>
              </template>
                <template slot-scope="scope">
                        <el-button style="margin-top:5px;margin-bottom:5px" size="mini" @click="timeEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                        <!-- 编辑保存按钮 -->
                        <!-- <el-button size="mini" type="danger" @click="timeSave(scope.row.id)">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button> -->
                        <!-- 删除 -->
                        <el-button style="margin-top:5px;margin-bottom:5px" size="mini" type="danger" @click="timeDelete(scope.row.id)">{{$t('Lang.public.DeBtn')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 点击编辑配置-出现弹窗 -->
        <el-dialog title="Edit" :visible.sync="configFormVisible">
        <el-form :model="changeConfig" :rules= "rules" label-position="right" label-width="108px">
          <el-form-item label="CPU" prop= "cpu_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.cpu_number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="GPU" prop= "gpu_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.gpu_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="MemoryType" prop= "memory_type" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.memory_type" autocomplete="off"></el-input>
            </el-col>
          </el-form-item> -->
          <el-form-item label="Memory" prop= "memory_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.memory_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="M.2" prop= "m2_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.m2_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="SATA" prop= "sata_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeConfig.sata_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="configFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="configSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
      <!-- 点击添加配置-出现弹窗 -->
        <el-dialog title="Add" :visible.sync="addConfigVisible">
        <el-form :model="configForm" :rules= "rules" label-position="right" label-width="108px">
          <el-form-item label="CPU" prop= "cpu_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.cpu_number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="GPU" prop= "gpu_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.gpu_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="MemoryType" prop= "memory_type" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.memory_type" autocomplete="off"></el-input>
            </el-col>
          </el-form-item> -->
          <el-form-item label="Memory" prop= "memory_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.memory_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="M.2" prop= "m2_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.m2_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="SATA" prop= "sata_number" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="configForm.sata_number" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addConfigVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="configBtn">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
      <!-- 点击添加时间节点-出现弹窗 -->
        <el-dialog title="Add" :visible.sync="editTimeVisible">
        <el-form :model="timeForm" :rules= "rules" label-position="right" label-width="60px">
          <el-form-item :label="$t('Lang.Views.Manage.project.Phase')" prop= "node_name" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="timeForm.node_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.Entry')">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.start_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item :label="$t('Lang.Views.Manage.project.Exit')">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.end_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editTimeVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="timeBtn">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
      <!-- 点击编辑时间节点time-出现弹窗 -->
        <el-dialog title="Edit" :visible.sync="timeFormVisible">
        <el-form :model="changeTime" :rules= "rules" label-position="right" label-width="60px">
          <el-form-item :label="$t('Lang.Views.Manage.project.Phase')" prop= "node_name" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="changeTime.node_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.Entry')">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="changeTime.start_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item :label="$t('Lang.Views.Manage.project.Exit')">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="changeTime.end_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="timeFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="timeSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            arrConid: [],
            arrTimeid: [],
            configid: '',
            configFormVisible: false,
            addConfigVisible: false,
            timeFormVisible: false,
            editTimeVisible: false,
            tableData: [],
            timeData: [],
            isEdit: false,
            isEditCon: false,
            MessAge: {},
            getConfig: {},
            changeAge: {
                platform: '',
                code_name: '',
                wave: '',
                tpm: '',
                sl: '',
                lte: ''
            },
            changeConfig: {
                cpu_number: '',
                gpu_number: '',
                memory_type: '',
                memory_number: '',
                m2_number: '',
                sata_number: '',
                release_id: ''
            },
            changeTime: {
                node_name: '',
                start_time: '',
                end_time: ''
            },
            timeForm: {
              node_name: '',
              start_time: '',
              end_time: ''
            },
            configForm: { // 添加配置
                release_id: '',
                cpu_number: '',
                gpu_number: '',
                memory_type: '',
                memory_number: '',
                m2_number: '',
                sata_number: ''
            }
        }
    },
    created() {
        this.getProject()
    },
    methods: {
        getProject() {
            Api.getPro({id: this.$route.query.id}).then((res) => {
                this.MessAge = res.data
                this.changeAge = res.data
                this.tableData = res.data.configuration
                this.timeData = res.data.timeline
            })
        },
        // 顶部编辑
        // handleEdit() {
        //   this.isEdit = true
        //   this.changeAge.platform = this.MessAge.platform
        //   this.changeAge.code_name = this.MessAge.code_name
        //   this.changeAge.wave = this.MessAge.wave
        //   this.changeAge.tpm = this.MessAge.tpm
        //   this.changeAge.lte = this.MessAge.lte
        // },
        // handleSave() {
        //   Api.editBase({...this.MessAge, id: this.$route.query.id, type: 'baseInfo'}).then((res) => {
        //         if (res.success === true) {
        //           this.getProject()
        //         }
        //   })
        //   this.isEdit = false
        // },
        // 编辑config
        configEdit(index, row, id) {
          this.changeConfig.release_id = this.tableData[index].release_id
          this.changeConfig.cpu_number = this.tableData[index].cpu_number
          this.changeConfig.gpu_number = this.tableData[index].gpu_number
          this.changeConfig.memory_type = this.tableData[index].memory_type
          this.changeConfig.memory_number = this.tableData[index].memory_number
          this.changeConfig.m2_number = this.tableData[index].m2_number
          this.changeConfig.sata_number = this.tableData[index].sata_number
          this.configFormVisible = true
          this.configid = id
        },
        configSave(id) {
            this.release_id = this.changeConfig.release_id
            Api.editBase({...this.changeConfig, id: this.configid, release_id: this.changeConfig.release_id, type: 'configuration'}).then((res) => {
                this.getProject()
                this.configFormVisible = false
            })
        },
        // 编辑时间节点time
        timeEdit(index, row, id) {
          this.changeTime.release_id = this.timeData[index].release_id
          this.changeTime.node_name = this.timeData[index].node_name
          this.changeTime.start_time = this.timeData[index].start_time
          this.changeTime.end_time = this.timeData[index].end_time
          this.timeFormVisible = true
          this.configid = id
          console.log(this.timeData[index].start_time)
        },
        timeSave(id) {
            this.release_id = this.changeTime.release_id
            Api.editBase({...this.changeTime, id: this.configid, release_id: this.changeTime.release_id, type: 'timeline'}).then((res) => {
                this.getProject()
                this.timeFormVisible = false
            })
        },
        // 删除单条配置
        handleDelete(id) {
            this.$confirm('Whether to delete this list permanently?', 'Hint', {
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            })
            .then(() => {
            this.arrConid.push(id)
            Api.deleteLine({ config_id: this.arrConid }).then((res) => {
                if (res.success === true) {
                this.$message({
                type: 'success',
                message: 'successfully delete!',
                offset: 350
              })
            }
            this.getProject()
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
        // 删除时间节点
        timeDelete(id) {
            this.$confirm('Whether to delete this list permanently?', 'Hint', {
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            })
            .then(() => {
            this.arrTimeid.push(id)
            Api.deleteLine({ time_id: this.arrTimeid }).then((res) => {
                if (res.success === true) {
                this.$message({
                type: 'success',
                message: 'successfully delete!',
                offset: 350
              })
            }
            this.getProject()
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
        // 添加时间节点
        AddTime() {
            this.editTimeVisible = true
        },
        // time时间节点保存
        timeBtn() {
                Api.addBase({...this.timeForm, release_id: this.$route.query.id, type: 'timeline'}).then((res) => {
                    this.getProject()
                    console.log(this.release_id)
                    this.editTimeVisible = false
            })
        },
        // Add添加配置
        AddConfig() {
            this.addConfigVisible = true
        },
        // 配置保存
        configBtn() {
                Api.addBase({...this.configForm, release_id: this.$route.query.id, type: 'configuration'}).then((res) => {
                    this.getProject()
                    this.addConfigVisible = false
            })
        },
        rowClass({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) return 'Tasksaction';
            this.Index = rowIndex;
        }
    }
}
</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .releaseData{
        width: 90%;
        height: 100px;
        margin: auto;
        color: #909399;
        display: flex;
    }
    .releaseData>div{
        // height: 60px;
        margin: 10px;
        font-size: 26px;
        font-weight: 600;
    }
    .configData{
        width: 70%;
        // height: 400px;
        margin: auto;
        /* padding-left: 125px; */
        color: #909399;
        display: flex;
        flex-flow:row wrap;
    }
    .configData>div{
        // height: 60px;
        margin: 10px;
        font-size: 26px;
        font-weight: 600;
    }
</style>
