<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <el-table-column :label="$t('Lang.Views.Manage.ShareRatio.Department_Name')" prop="department" sortable>
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.department}}</div>
                    <el-input v-model="addCommit.department" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Lang.Views.Manage.ShareRatio.Line_Manager')" prop="director" sortable>
                <!--input-->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.director}}</div>
                    <el-input v-model="addCommit.director" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!--机台总数-->
            <el-table-column :label="$t('Lang.Views.Manage.ShareRatio.Totality')" prop="sut_total" sortable width="180">
                <!-- 机台总数input -->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.sut_total}}</div>
                    <el-input v-model="addCommit.sut_total" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!--可share数量-->
            <el-table-column prop="sut_share" :label="$t('Lang.Views.Manage.ShareRatio.Shareable')" sortable width="180">
                <!-- 可share数量input -->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.sut_share}}</div>
                    <el-input v-model="addCommit.sut_share" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!--总数-可share数量-->
            <el-table-column prop="not_share" :label="$t('Lang.Views.Manage.ShareRatio.Unshareable')" sortable width="180">
                <!-- 不可share数量input -->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.not_share}}</div>
                    <el-input v-model="addCommit.not_share" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!-- edit delete按钮 -->
            <el-table-column :label="Operation" align="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                    <!-- 删除 -->
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('Lang.public.DeBtn')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加按钮-->
        <el-button type="primary" style="margin-top:40px" @click="AddForm">+Add OS</el-button>
        <el-button type="primary" style="margin-top:40px;margin-left:440px" @click="Yes">{{$t('Lang.Views.Manage.ShareRatio.OK')}}</el-button>
        <el-button type="danger" style="margin-top:40px" @click="handleCancel">{{$t('Lang.Views.Manage.ShareRatio.Cancel')}}
        </el-button>
        <!--分页-->
        <el-pagination class="pagination" background layout="prev,pager,next" :total="1"></el-pagination>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            editId: '',
            ischange: 0,
            isChangeAdd: false,
            tableData: [],
            value: '',
            input: '',
            type: false,
            Index: '',
            scoop: '',
            addCommit: {
                department: '',
                director: '',
                sut_total: '',
                sut_share: '',
                not_share: ''
            }
        }
    },
    created() {
        this.getCommitDash()
    },
    methods: {
        // 向后台获取的内容
        getCommitDash() {
            Api.getCommitDash().then((res) => {
                this.tableData = res.data_list.map((val) => {
                    val.idAdd = false;
                    val.editAdd = true;
                    return val
                })
            })
        },
        // 编辑
        handleEdit(index, row, id) {
            this.ischange = 1
            this.editId = id
            this.$set(this.tableData[index], 'idAdd', true)
            this.$set(this.tableData[index], 'editAdd', false)
            this.addCommit.department = row.department;
            this.addCommit.director = row.director;
            this.addCommit.sut_total = row.sut_total;
            this.addCommit.sut_share = row.sut_share;
            this.addCommit.not_share = row.not_share;
        },
        // 取消
        handleCancel() {
            this.getCommitDash()
        },
        // 删除
        handleDelete(id) {
            Api.addCommitDash({ id: id, type: 'delete' }).then((res) => {
                if (res.result === 1) {
                        // 初始化页面
                    this.getCommitDash()
                }
            })
        },
        // add添加
        AddForm() {
            this.type = false;
            this.tableData.push({
                label: '',
                input: '',
                totality: '',
                share: '',
                noshare: '',
                department: '',
                director: '',
                sut_share: '',
                sut_total: '',
                not_share: '',
                id: '',
                idAdd: true, // input框true
                editAdd: false // 表格内容false
            })
        },
        // ok保存
        Yes() {
            if (this.ischange === 1) {
                Api.addCommitDash({...this.addCommit, type: 'update', id: this.editId}).then((res) => {
                    this.getCommitDash()
            })
            } else {
                Api.addCommitDash({ ...this.addCommit, type: 'commit' }).then((res) => {
                    this.getCommitDash()
                })
                this.tableData.forEach(item => {
                    item.idAdd = false;// input框false
                    item.editAdd = true;// 表格内容true
                })
            }
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
