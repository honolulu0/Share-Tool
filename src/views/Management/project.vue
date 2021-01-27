<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-card class="box-card allCard">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <!-- <el-table-column align='center' label="ID" prop="id">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.id}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.id}}</div>
                </template>
            </el-table-column> -->
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.codename')" prop="code_name">
                <!--input-->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.code_name}}</div>
                    <el-input v-model="addCommit.code_name" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.platform')" prop="platform">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.platform}}</div>
                    <el-input v-model="addCommit.platform" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.wave')" prop="wave">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.wave}}</div>
                    <el-input v-model="addCommit.wave" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.TPM')" prop="tpm">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.tpm}}</div>
                    <el-input v-model="addCommit.platform" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.SL')" prop="sl">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.sl}}</div>
                    <el-input v-model="addCommit.sl" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.project.LTE')" prop="lte">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.lte}}</div>
                    <el-input v-model="addCommit.lte" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column width='200px' align='center' header-align='center'>
                <!-- 搜索 -->
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
                    <div style="display: flex">
                        <el-button size="mini" @click="lookView(scope.row.id)">{{$t('Lang.Views.Manage.project.Details')}}</el-button>
                        <!-- 添加项目配置信息按钮 -->
                        <!-- <el-button size="mini" @click="AddConfig(scope.$index,scope.row,scope.row.id)" icon='el-icon-circle-plus-outline'>Config</el-button> -->
                        <!-- 添加项目节点 -->
                        <!-- <el-button size="mini" @click="AddTime(scope.$index,scope.row,scope.row.id)" icon='el-icon-circle-plus-outline'>Milestone</el-button> -->
                        <el-button size="mini" v-if="scope.row.editAdd" @click="handleEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                        <!-- 编辑保存按钮 -->
                        <el-button size="mini" v-if="scope.row.idAdd" type="danger" @click="handleSave(scope.row.id)">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button>
                        <!-- 删除 -->
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('Lang.public.DeBtn')}}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--添加按钮-->
        <el-button type="primary" style="margin-top:40px" @click="AddForm()">{{$t('Lang.Views.Manage.project.add')}}</el-button>
        <!-- 点击+Add-添加出现弹窗 -->
        <el-dialog title="Add" :visible.sync="dialogFormVisible">
        <el-form :model="addBase" :rules= "rules" label-position="right" label-width="105px">
          <el-form-item :label="$t('Lang.Views.Manage.project.codename')" prop= "code_name" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.code_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.platform')" prop= "platform" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.platform" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.wave')" prop= "wave" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.wave" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.TPM')" prop= "tpm" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.tpm" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.SL')" prop= "sl" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.sl" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.project.LTE')" prop= "lte" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="addBase.lte" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="addBtn">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
      <!-- 点击添加配置-出现弹窗 -->
        <!-- <el-dialog title="Add" :visible.sync="configFormVisible">
        <el-form :model="configForm" :rules= "rules">
          <el-form-item class="clearfix" label="CPU" prop= "cpu_number" :label-width="formLabelWidth">
            <el-input v-model="configForm.cpu_number"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="GPU" prop= "gpu_number" :label-width="formLabelWidth">
            <el-input v-model="configForm.gpu_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="MemoryType" prop= "memory_type" :label-width="formLabelWidth">
            <el-input v-model="configForm.memory_type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="Memory" prop= "memory_number" :label-width="formLabelWidth">
            <el-input v-model="configForm.memory_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="M.2" prop= "m2_number" :label-width="formLabelWidth">
            <el-input v-model="configForm.m2_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="SATA" prop= "sata_number" :label-width="formLabelWidth">
            <el-input v-model="configForm.sata_number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="configFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="configBtn">OK</el-button>
        </div>
      </el-dialog> -->
      <!-- 点击添加时间节点-出现弹窗 -->
        <!-- <el-dialog title="Add" :visible.sync="timeFormVisible">
        <el-form :model="timeForm" :rules= "rules">
          <el-form-item class="clearfix" label="Phase" prop= "node_name" :label-width="formLabelWidth">
            <el-col :span="11">
                <el-input v-model="timeForm.node_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="StartTime">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.start_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="EndTime">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="timeForm.end_time" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="timeFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="timeBtn">OK</el-button>
        </div>
      </el-dialog> -->
        <!--分页-->
    </el-card>
    <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
    </el-pagination>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            configid: '',
            arrid: [], // 以数组形式传id
            dialogFormVisible: false,
            configFormVisible: false,
            timeFormVisible: false,
            ischange: 0,
            isChangeAdd: false,
            tableData: [],
            type: false,
            Index: '',
            scoop: '',
            PageIndex: 1, // 当前下标
            Allpage: '',
            search: '',
            prop: '',
            addCommit: { // 编辑基本信息
                platform: '',
                code_name: '',
                wave: '',
                tpm: '',
                sl: '',
                lte: ''
            },
            addBase: { // 添加基本信息
                platform: '',
                code_name: '',
                wave: '',
                tpm: '',
                sl: '',
                lte: ''
            },
            configForm: { // 添加配置
                release_id: '',
                cpu_number: '',
                gpu_number: '',
                memory_type: '',
                memory_number: '',
                m2_number: '',
                sata_number: ''
            },
            timeForm: {// 添加时间节点
                node_name: '',
                start_time: '',
                end_time: ''
            }
        }
    },
    created() {
        this.getProject()
    },
    methods: {
        getProject(page, prop, search) {
            Api.getPro({page, prop, search}).then((res) => {
                this.Allpage = res.all_page
                this.tableData = res.data.map((val) => {
                    val.idAdd = false;
                    val.editAdd = true;
                    return val
                })
            })
        },
        // 搜索
        Search() {
            this.getProject(this.PageIndex, this.order, this.search, 'search')
        },
        // 分页
        currentPages(val) {
            this.PageIndex = val
            this.getProject(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        prev_click(val) {
            this.PageIndex = val
            this.getProject(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        next_click(val) {
            this.PageIndex = val
            this.getProject(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        // 编辑
        handleEdit(index, row, id) {
            this.ischange = 1
            this.$set(this.tableData[index], 'idAdd', true)
            this.$set(this.tableData[index], 'editAdd', false)
            // this.addCommit.id = row.id;
            this.addCommit.platform = row.platform;
            this.addCommit.code_name = row.code_name;
            this.addCommit.wave = row.wave;
            this.addCommit.sl = row.sl;
            this.addCommit.lte = row.lte;
            this.addCommit.tpm = row.tpm
        },
        // 编辑保存
        handleSave(id) {
            Api.editBase({...this.addCommit, id, type: 'baseInfo'}).then((res) => {
                this.getProject()
            })
        },
        // +Add添加项目base
        AddForm() {
            this.type = false;
            this.dialogFormVisible = true
        },
        // +Add保存base
        addBtn() {
                Api.addBase({...this.addBase, type: 'baseInfo'}).then((res) => {
                    this.dialogFormVisible = false
                    this.getProject()
            })
        },
        // Add添加配置
        // AddConfig(index, row, id) {
        //     this.type = false;
        //     this.configFormVisible = true
        //     this.configid = id
        // },
        // // 配置保存
        // configBtn() {
        //         Api.addBase({...this.configForm, release_id: this.configid, type: 'configuration'}).then((res) => {
        //             this.getProject()
        //             this.configFormVisible = false
        //     })
        // },
        // Add添加time时间节点
        // AddTime(index, row, id) {
        //     this.type = false;
        //     this.timeFormVisible = true
        //     this.configid = id
        // },
        // // time时间节点保存
        // timeBtn() {
        //         Api.addBase({...this.timeForm, release_id: this.configid, type: 'timeline'}).then((res) => {
        //             // this.getProject()
        //             this.timeFormVisible = false
        //     })
        // },
        // 删除
        handleDelete(id) {
            // id传数组
            this.arrid.push(id)
            this.$confirm('Whether to delete this list?', 'Hint', {
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            })
            .then(() => {
            Api.deleteBase({ id: this.arrid }).then((res) => {
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
        // 点击详情跳转页面
        lookView(id) {
            this.$router.push({path: '/Milestone', query: { id }})
        },
        rowClass({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) return 'Tasksaction';
            this.Index = rowIndex;
        }
    }
};
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .pagination {
        margin-right: auto;
        margin-top: 30px;
    }
</style>
