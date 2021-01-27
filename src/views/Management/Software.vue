<template>
    <div class="box" style="width: 95%;margin: auto;margin-top: 10px;">
        <el-table :data="tableData" :cell-class-name="rowClass" style="width:100%">
            <el-table-column label='OS Type' prop="date" sortable>
                <!--select选项框-->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.date}}</div>
                    <el-select v-model="scope.row.date" placeholder='Please select' v-if="scope.row.idAdd">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="Version" prop="name" sortable>
            <!--input-->
                <template slot-scope="scope">
                    <div v-if="scope.row.editAdd">{{scope.row.name}}</div>
                    <el-input v-model="scope.row.name" placeholder='Please enter content' v-if="scope.row.idAdd" >
                    </el-input>
                </template>
            </el-table-column>
                <!-- edit delete按钮 -->
            <el-table-column label="Operation" align="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" >Edit</el-button >
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index,tableData)" >Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加按钮-->
        <el-button type="primary" style="margin-top:40px" @click="AddForm">+Add OS</el-button>
        <el-button type="primary" style="margin-top:40px;margin-left:440px" @click="Yes">OK</el-button>
        <el-button type="danger" style="margin-top:40px">Cancel</el-button>
        <!--分页-->
        <el-pagination class="pagination" background layout="prev,pager,next" :total="1" >
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
        tableData: [
            {
                date: 'select',
                name: 'input',
                idAdd: false,
                editAdd: true
            }
        ],
        options: [
            {
                value: 'select1',
                label: 'Windows Server'
            },
            {
                value: 'select2',
                label: 'CentOS'
            },
            {
                value: 'select3',
                label: 'Ubuntu'
            },
            {
                value: 'select4',
                label: 'Debian'
            },
            {
                value: 'select5',
                label: 'SUSE Linux'
            },
            {
                value: 'select6',
                label: 'OpenSUSE'
            },
            {
                value: 'select7',
                label: 'CoreOS'
            },
            {
                value: 'select8',
                label: 'FreeBSD'
            }],
            value: '',
            input: '',
            type: false,
            Index: ''
        };
    },
    methods: {
        handleEdit(index, row) {
        console.log(index, row);
        row.idAdd = true;
        row.editAdd = false;
        },
        handleDelete(index, row) {
            row.splice(index, 1);
        },
        AddForm() {
            this.type = false;
            this.tableData.push({ label: '', input: '', idAdd: true, editAdd: false })
        },
        Yes() {
            this.tableData.forEach(item => {
                item.idAdd = false;
                item.editAdd = true;
            })
        },
        rowClass({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 0) return 'Tasksaction';
                    this.Index = rowIndex;
            }
        }
};
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .pagination{
        margin-right: auto;
        margin-top: 30px;
    }
    /* .el-table_1_column_3 .cell{
        text-align: right;
    }     */
</style>
