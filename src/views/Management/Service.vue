<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-card class="box-card allCard">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <el-table-column align='center' label="ID" prop="id">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.id}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.id}}</div>
                    <!-- <el-input v-model="addCommit.department" placeholder='Please enter content' v-if="scope.row.idAdd"> -->
                    <!-- </el-input> -->
                </template>
            </el-table-column>
            <el-table-column align='center' label="Location" prop="location">
                <!--input-->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.location}}</div>
                    <!-- <el-input v-model="addCommit.location" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input> -->
                    <el-select v-model="addCommit.location" v-if="scope.row.idAdd">
                        <el-option
                        v-for="item in locations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" style="text-align:center">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column align='center' label="Itcode" prop="itcode">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.itcode}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.itcode}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="email" label="Email">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.email}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.email}}</div>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="roleid" label="Roleid">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.roleid}}</div>
                    <!-- <el-input v-model="addCommit.roleid" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input> -->
                    <el-select v-model="addCommit.roleid" v-if="scope.row.idAdd">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" style="text-align:center">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="display_name" label="DisplayName">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.display_name}}</div>
                    <div v-if="scope.row.idAdd">{{scope.row.display_name}}</div>
                </template>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column width="250px" align='center' header-align='center'>
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
                    <el-button size="mini" v-if="scope.row.editAdd" @click="handleEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                    <!-- 编辑保存按钮 -->
                    <el-button size="mini" v-if="scope.row.idAdd" type="danger" @click="handleSave(scope.row.id)">{{$t('Lang.Views.Manage.AddPage.Save')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加按钮-->
        <!-- <el-button type="primary" style="margin-top:40px" @click="AddForm">+Add</el-button> -->
        <!-- 点击添加出现弹窗 -->
        <el-dialog title="Add" :visible.sync="dialogFormVisible">
        <el-form :model="addRole" :rules= "rules">
          <el-form-item class="clearfix" label="itcode" prop= "itcode" :label-width="formLabelWidth">
            <el-input v-model="addRole.itcode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="email" prop= "email" :label-width="formLabelWidth">
            <el-input v-model="addRole.email"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="location" prop= "location" :label-width="formLabelWidth">
            <el-input v-model="addRole.location" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="roleid" prop= "roleid" :label-width="formLabelWidth">
            <el-input v-model="addRole.roleid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="firstName" prop= "first_name" :label-width="formLabelWidth">
            <el-input v-model="addRole.first_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="lastName" prop= "last_name" :label-width="formLabelWidth">
            <el-input v-model="addRole.last_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="clearfix" label="displayName" prop= "display_name" :label-width="formLabelWidth">
            <el-input v-model="addRole.display_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addBtn">OK</el-button>
        </div>
      </el-dialog>
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
            dialogFormVisible: false,
            editId: '',
            ischange: 0,
            isChangeAdd: false,
            tableData: [],
            value: '',
            input: '',
            type: false,
            Index: '',
            scoop: '',
            PageIndex: 1, // 当前下标
            Allpage: '',
            search: '',
            prop: '',
            order: '',
            rules: {
                itcode: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                location: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                display_name: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                email: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                roleid: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                first_name: [{required: true, message: 'Please enter content', trigger: 'blur'}],
                last_name: [{required: true, message: 'Please enter content', trigger: 'blur'}]
            },
            addCommit: {
                id: '',
                location: '',
                itcode: '',
                display_name: '',
                email: '',
                roleid: ''
            },
            addRole: {
                location: '',
                display_name: '',
                email: '',
                itcode: '',
                roleid: '',
                first_name: '',
                last_name: ''
            },
            options: [{
                value: '1',
                label: '1 (admin)'
                }, {
                value: '2',
                label: '2 (user)'
                }, {
                value: '3',
                label: '3 (subadmin)'
                }, {
                value: '4',
                label: '4 (engineer)'
                }],
            locations: [{
                value: 'Beijing',
                label: 'Beijing'
                }, {
                value: 'ShenZhen',
                label: 'ShenZhen'
                }, {
                value: 'Taipei',
                label: 'Taipei'
                }, {
                value: 'Morrisvile',
                label: 'Morrisvile'
                }, {
                value: 'MTY',
                label: 'MTY'
                }, {
                value: 'HGY',
                label: 'HGY'
                }]
        }
    },
    created() {
        this.getAdminRole()
    },
    methods: {
        getAdminRole(page, prop, order, keyword, type) {
            Api.getRole({page, prop, order, keyword, type}).then((res) => {
                this.Allpage = res.all_page
                this.tableData = res.data_list.map((val) => {
                    val.idAdd = false;
                    val.editAdd = true;
                    return val
                })
            })
        },
        // 搜索
        Search() {
            this.getAdminRole(this.PageIndex, this.prop, this.order, this.search, 'search')
        },
        // 分页
        currentPages(val) {
            this.PageIndex = val
            this.getAdminRole(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        },
        prev_click(val) {
            this.PageIndex = val
            this.getAdminRole(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        },
        next_click(val) {
            this.PageIndex = val
            this.getAdminRole(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        },
        // 编辑
        handleEdit(index, row, id) {
            this.ischange = 1
            this.editId = id
            this.$set(this.tableData[index], 'idAdd', true)
            this.$set(this.tableData[index], 'editAdd', false)
            this.addCommit.id = row.id;
            this.addCommit.location = row.location;
            this.addCommit.itcode = row.itcode;
            this.addCommit.display_name = row.display_name;
            this.addCommit.email = row.email;
            this.addCommit.roleid = row.roleid;
        },
        // 编辑保存
        handleSave(id) {
            Api.editRole({data: {...this.addCommit, id: this.editId}}).then((res) => {
                this.getAdminRole(this.PageIndex)
            })
        },
        // 添加
        AddForm() {
            this.type = false;
            this.dialogFormVisible = true
        },
        // 添加保存
        addBtn() {
                Api.addRole({data: {...this.addRole}}).then((res) => {
                    this.getAdminRole()
                    this.dialogFormVisible = false
            })
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
