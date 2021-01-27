<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-card class="box-card allCard">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.PartName')" prop="product_name" width='135px'>
                <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.product_name" placement="top-start">
                        <div v-if="scope.row.editAdd" class="partname">{{scope.row.product_name}}</div>
                    </el-tooltip>
                    <el-input v-model="addCommit.product_name" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' label="Armory" prop="product_owner">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.product_owner}}</div>
                    <el-input v-model="addCommit.owner" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.site')" prop="lablocation">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.lablocation}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.lablocation}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.lab')" prop="sutLab">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.sutLab}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.sutLab}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.rack')" prop="sutRack" width='80px'>
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.sutRack}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.sutRack}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.PN')" prop="device_pn" width='155px'>
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.device_pn}}</div>
                    <el-input v-model="addCommit.device_pn" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.ProductType')" prop="product_type">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.product_type}}</div>
                    <el-input v-model="addCommit.product_type" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.Serial')" prop="serial_number">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.serial_number}}</div>
                    <el-input v-model="addCommit.serial_number" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.Comments')" prop="product_command">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.product_command}}</div>
                    <el-input v-model="addCommit.command" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column align="center" width='190px'>
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
                        <el-button size="mini" @click="lookView(scope.row.product_id)">{{$t('Lang.Views.Manage.All_Parts.history')}}</el-button>
                        <el-button size="mini" v-if="scope.row.editAdd" @click="handleEdit(scope.$index,scope.row,scope.row.product_id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                        <!-- 编辑保存按钮 -->
                        <el-button size="mini" v-if="scope.row.idAdd" type="danger" @click="handleSave(scope.row.product_id)">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.product_id)">{{$t('Lang.public.DeBtn')}}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 点击+Add-添加出现弹窗 -->
        <el-dialog title="Add" :visible.sync="dialogFormVisible">
        <el-form :model="addParts" :rules= "rules" label-position="right" label-width="105px">
            <el-form-item :label="$t('Lang.Views.Manage.All_Parts.ProductType')" prop= "product_type" :label-width="formLabelWidth">
            <el-col :span="11">
            <!-- <el-input v-model="addParts.product_type"></el-input> -->
            <el-select v-model="addParts.product_type">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" style="text-align:center">
                </el-option>
              </el-select>
          </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.All_Parts.PartName')" prop= "product_name" :label-width="formLabelWidth">
            <el-col :span="11">
            <el-input v-model="addParts.product_name" autocomplete="off"></el-input>
          </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.All_Parts.Serial')" prop= "serial_number" :label-width="formLabelWidth">
            <el-col :span="11">
            <el-input v-model="addParts.serial_number" autocomplete="off"></el-input>
          </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.All_Parts.PN')" prop= "device_pn" :label-width="formLabelWidth">
            <el-col :span="11">
            <el-input v-model="addParts.device_pn" autocomplete="off"></el-input>
          </el-col>
          </el-form-item>
          <el-form-item label="Owner" prop= "product_owner" :label-width="formLabelWidth">
            <el-col :span="11">
            <el-input v-model="addParts.owner" autocomplete="off"></el-input>
          </el-col>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Manage.All_Parts.Comments')" prop= "product_command" :label-width="formLabelWidth">
            <el-col :span="11">
            <el-input v-model="addParts.command" autocomplete="off"></el-input>
          </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
          <el-button type="primary" @click="addBtn">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
        </div>
      </el-dialog>
      </el-card>
        <!--添加按钮-->
        <el-button type="primary" style="margin-top:40px" @click="AddForm">{{$t('Lang.Views.Manage.project.add')}}</el-button>
        <!--分页-->
        <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)">
    </el-pagination>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            dialogFormVisible: false,
            ischange: 0,
            isChangeAdd: false,
            tableData: [],
            value: '',
            Index: '',
            PageIndex: 1, // 当前下标
            Allpage: '',
            search: '',
            prop: '',
            addCommit: {
                product_name: '',
                product_type: '',
                serial_number: '',
                device_pn: '',
                owner: '',
                command: ''
            },
            addParts: {
                product_name: '',
                product_type: '',
                serial_number: '',
                device_pn: '',
                owner: '',
                command: ''
            },
            options: [{
                value: 'Accessory',
                label: 'Accessory'
            }, {
                value: 'Adapter',
                label: 'Adapter'
            }, {
                value: 'Adapters or Cards',
                label: 'Adapters or Cards'
            }, {
                value: 'Backplane',
                label: 'Backplane'
            }, {
                value: 'Barebone',
                label: 'Barebone'
            }, {
                value: 'Build Part',
                label: 'Build Part'
            }, {
                value: 'Cable',
                label: 'Cable'
            }, {
                value: 'Cards',
                label: 'Cards'
            }, {
                value: 'Chassis',
                label: 'Chassis'
            }, {
                value: 'Complete Machine',
                label: 'Complete Machine'
            }, {
                value: 'CPU',
                label: 'CPU'
            }, {
                value: 'Diagnostic Equipment',
                label: 'Diagnostic Equipment'
            }, {
                value: 'Fan Assemblies',
                label: 'Fan Assemblies'
            }, {
                value: 'Flash Device',
                label: 'Flash Device'
            }, {
                value: 'HDD Drive',
                label: 'HDD Drive'
            }, {
                value: 'IO Module',
                label: 'IO Module'
            }, {
                value: 'Memory',
                label: 'Memory'
            }, {
                value: 'Motherboard',
                label: 'Motherboard'
            }, {
                value: 'Network Device',
                label: 'Network Device'
            }, {
                value: 'Other Adapter or Cards',
                label: 'Other Adapter or Cards'
            }, {
                value: 'Power Supply',
                label: 'Power Supply'
            }, {
                value: 'Rack and Power',
                label: 'Rack and Power'
            }, {
                value: 'RAID',
                label: 'RAID'
            }, {
                value: 'Server',
                label: 'Server'
            }, {
                value: 'SSD Drive',
                label: 'SSD Drive'
            }, {
                value: 'Storage Units',
                label: 'Storage Units'
            }, {
                value: 'ThinkSystem',
                label: 'ThinkSystem'
            }]
        }
    },
    created() {
        this.getAllParts()
    },
    methods: {
        // 向后台获取的内容
        getAllParts(page, prop, search) {
            Api.getParts({page, search}).then((res) => {
                this.Allpage = res.all_page
                this.tableData = res.data.map((val) => {
                    val.idAdd = false;
                    val.editAdd = true;
                    return val
                })
            })
        },
        // 编辑
        handleEdit(index, row, productId) {
            this.ischange = 1
            this.$set(this.tableData[index], 'idAdd', true)
            this.$set(this.tableData[index], 'editAdd', false)
            this.addCommit.product_name = row.product_name;
            this.addCommit.product_type = row.product_type;
            this.addCommit.serial_number = row.serial_number;
            this.addCommit.device_pn = row.device_pn;
            this.addCommit.owner = row.product_owner;
            this.addCommit.command = row.product_command;
        },
        // 编辑保存
        handleSave(productId) {
            Api.editParts({...this.addCommit, id: productId}).then((res) => {
                this.getAllParts(this.PageIndex)
            })
        },
        // +Add添加项目base
        AddForm() {
            this.dialogFormVisible = true
        },
        // +Add保存base
        addBtn() {
                Api.addParts({...this.addParts}).then((res) => {
                    this.getAllParts()
                    this.dialogFormVisible = false
            })
        },
        // 删除
        handleDelete(productId) {
            this.$confirm('Whether to delete this list?', 'Hint', {
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
            })
            .then(() => {
            Api.deleteParts({ id: productId }).then((res) => {
                if (res.success === true) {
                this.$message({
                type: 'success',
                message: 'successfully delete!',
                offset: 350
              })
            }
            this.getAllParts(this.PageIndex)
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
        // 搜索
        Search() {
            this.getAllParts(this.PageIndex, this.order, this.search, 'search')
        },
        // 分页
        currentPages(val) {
            this.PageIndex = val
            this.getAllParts(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        prev_click(val) {
            this.PageIndex = val
            this.getAllParts(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        next_click(val) {
            this.PageIndex = val
            this.getAllParts(val, this.prop, this.search, this.search !== '' ? 'search' : '')
        },
        // 点击详情跳转页面
        lookView(id) {
            this.$router.push({path: '/partsDetail', query: { id }})
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
    .partname {
        width: 135px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
