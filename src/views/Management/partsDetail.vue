<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <el-table-column align='center' prop="productID" :label="$t('Lang.Views.Manage.All_Parts.ProductID')" width="180">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.productID}}</div>
                    <el-input v-model="addCommit.productID" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.Installer')" prop="installer">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.installer}}</div>
                    <el-input v-model="addCommit.installer" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.Remover')" prop="remover" width="180">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.remover}}</div>
                    <el-input v-model="addCommit.remover" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="start_time" :label="$t('Lang.Views.Manage.All_Parts.StartTime')" width="180">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.start_time}}</div>
                    <el-input v-model="addCommit.start_time" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="end_time" :label="$t('Lang.Views.Manage.All_Parts.EndTime')" width="180">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.end_time}}</div>
                    <el-input v-model="addCommit.end_time" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column align='center' :label="$t('Lang.Views.Manage.All_Parts.Comments')" prop="Command">
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.command}}</div>
                    <el-input v-model="addCommit.command" placeholder='Please enter content' v-if="scope.row.idAdd">
                    </el-input>
                </template>
            </el-table-column>
            <!-- edit delete按钮 -->
            <!-- <el-table-column label="Operation" align="right"> -->
                <!-- <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row,scope.row.id)">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('Lang.public.DeBtn')}}</el-button>
                </template> -->
            <!-- </el-table-column> -->
        </el-table>
        <!--添加按钮-->
        <!-- <el-button type="primary" style="margin-top:40px" @click="AddForm">Add</el-button> -->
        <!-- <el-button type="primary" style="margin-top:40px;margin-left:440px" @click="Yes">{{$t('Lang.Views.Manage.ShareRatio.OK')}}</el-button> -->
        <!-- <el-button type="danger" style="margin-top:40px" @click="handleCancel">{{$t('Lang.Views.Manage.ShareRatio.Cancel')}} -->
        <!-- </el-button> -->
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
                product_name: '',
                product_type: '',
                serial_number: '',
                device_pn: '',
                owner: '',
                command: ''
            }
        }
    },
    created() {
        this.getPartsDetail()
    },
    methods: {
        // 向后台获取的内容
        getPartsDetail() {
            Api.partsDetail({id: this.$route.query.id}).then((res) => {
                this.tableData = res.data.detail.map((val) => {
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
            this.getAllParts()
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
