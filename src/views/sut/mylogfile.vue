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
                  :label="$t('Lang.Views.Sut.Mylog_allLog.label.Task_Name')"
                  prop='order_name'
                  :sortable="'custom'"
                  :sort-orders="['ascending', 'descending']"
                  >
                  <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.order_name" placement="top-start">
                        <div class="sutName">{{scope.row.order_name}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Name_of_System')"
                align='center'
                prop='sutname'
                header-align='center'
                >
                </el-table-column>
                <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Type')"
                align='center'
                header-align='center'
                prop='testitems'
                >
                </el-table-column>
                 <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Create_Time')"
                align='center'
                header-align='center'
                prop='starttime'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                <template slot-scope="scope">
                    <div>{{new Date(scope.row.starttime).toLocaleDateString().split('/').join('-')+' '+scope.row.starttime.split(' ')[4]}}</div>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Status')"
                prop="check_status"
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
                 <template slot-scope="scope">
                    <div
                    :style="{
                        color: scope.row.check_status === '0' ? '#67c23a' : scope.row.check_status === '1' ? '#67c23a' :
                            scope.row.check_status === '5' ? '#f56c6c' : scope.row.check_status === '7' ? '#f56c6c' :
                            scope.row.check_status === '2' ? '#f56c6c' : scope.row.check_status === '8' ? '#f56c6c' :
                            scope.row.check_status === '8' ? '#f56c6c' : scope.row.check_status === '3' ? '#67c23a'
                            : scope.row.check_status === '4' ? '#E6A23C' : ''
                    }"
                    >
                        {{
                            scope.row.check_status === '0' ? $t('Lang.Views.Sut.Mylog_allLog.Finish') : scope.row.check_status === '1' ? $t('Lang.Views.Sut.Mylog_allLog.Finish') :
                            scope.row.check_status === '5' ? $t('Lang.Views.Sut.Mylog_allLog.Fail') : scope.row.check_status === '7' ? $t('Lang.Views.Sut.Mylog_allLog.Fail') :
                            scope.row.check_status === '2' ? $t('Lang.Views.Sut.Mylog_allLog.Fail') : scope.row.check_status === '8' ? $t('Lang.Views.Sut.Mylog_allLog.Fail') :
                            scope.row.check_status === '8' ? $t('Lang.Views.Sut.Mylog_allLog.Fail') : scope.row.check_status === '3' ? $t('Lang.Views.Sut.Mylog_allLog.Finish')
                            : scope.row.check_status === '4' ? $t('Lang.Views.Sut.Mylog_allLog.In_Progress') : ''
                        }}
                    </div>
                </template>
                </el-table-column>
                <el-table-column
                  :label="$t('Lang.Views.Sut.Mylog_allLog.label.Log_Info')"
                  prop='log_info'>
                  <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="scope.row.log_info" placement="top-start">
                        <div class="sutName">{{scope.row.log_info}}</div>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  align='center'
                  header-align='center'
                  class="Raction"
                  width='210px'>
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
                      <a :href="`${GLOBAL.HOME+scope.row.filelogfath}`" v-if="scope.row.filelogfath !== ''">
                        <el-button type="primary" icon="el-icon-download" plain></el-button>
                      </a>
                  </template>
                </el-table-column>
          </el-table>
           <!-- 分页组件 -->
            <el-pagination
            background
            @current-change="currentPages"
            @prev-click="currentPages"
            @next-click="currentPages"
            layout="prev, pager, next"
            :total="(Allpage * 10)">
            </el-pagination>
        </el-card>
  </div>
</template>
<script>
import * as Api from '@/api/api'
import GLOBAL from '../../common/global'
export default {
    data() {
        return {
            tableData: [],
            PageIndex: 1, // 当前下标
            Allpage: '',
            Index: '', // 对应的bookId值
            search: '',
            prop: '',
            order: '',
            GLOBAL
        }
    },
    created() {
        this.getLogfile()
    },
    methods: {
        getLogfile(page, prop, order, keyword, type) {
            Api.GetLogFile({page, prop, order, keyword, user_page: 'user_page', type}).then((res) => {
                if (res.success === true) {
                    this.tableData = res.machinelog_data
                    this.Allpage = res.all_page
                }
            })
        },
        Search() {
            this.getLogfile(this.PageIndex, this.prop, this.order, this.search, 'search')
        },
        currentPages(val) {
            this.PageIndex = val
            this.getLogfile(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        },
        // prev_click(val) {
        //     this.PageIndex = val
        //     this.getLogfile(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        // },
        // next_click(val) {
        //     this.PageIndex = val
        //     this.getLogfile(val, this.prop, this.order, this.search, this.search !== '' ? 'search' : '')
        // },
        changeTableSort(column) {
            this.prop = column.prop;
            this.order = column.order;
            this.getLogfile(this.PageIndex, column.prop, column.order, this.search, this.search !== '' ? 'search' : '')
      }
    }
}
</script>
<style lang="scss" scoped>
.sutName{
  width: 123px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
