<template>
    <div style="padding:10px;">
         <el-card class="box-card allCard">
            <el-table
              :data="tableData"
              style="width: 100%"
              @sort-change="changeTableSort"
              :cell-class-name="rowClass"
              header-row-class-name='headerSize'
              highlight='true'>
              <el-table-column
                :label="$t('Lang.Views.Support.MyReq_allReq.Ticket_Title')"
                width="230"
                prop='title'
                >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top-start">
                      <div class="All_ticket_title">{{scope.row.title}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Manage.Admin_shareEverying.Author')"
                prop="author"
                align='center'
                header-align='center'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
              </el-table-column>
              <el-table-column
                :label="$t('Lang.public.DetailBtn')"
                prop="details"
                align='center'
                header-align='center'
                >
              </el-table-column>
              <el-table-column
                :label="$t('Lang.Views.Sut.Mylog_allLog.label.Create_Time')"
                align='center'
                header-align='center'
                prop='create_time'
                :sortable="'custom'"
                :sort-orders="['ascending', 'descending']"
                >
              </el-table-column>
              <!-- over -->
              <el-table-column width="210" align='center' header-align='center'>
                <template slot="header" slot-scope="scope">
                      <el-input
                        :placeholder="$t('Lang.public.search')"
                        prefix-icon="el-icon-search"
                        v-model="search"
                        @change="Search"
                        clearable>
                      </el-input>
                  </template>
              </el-table-column>
            </el-table>
            <!-- over -->
            <!-- 分页组件 -->
            <!-- over -->
            <el-pagination  background @current-change="currentPages" @prev-click="prev_click" @next-click="next_click" layout="prev, pager, next" :total="(Allpage * 10)"></el-pagination>
        </el-card>
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        tableData: [],
        Index: '',
        PageIndex: '',
        Allpage: '',
        search: '',
        prop: '',
        order: ''
      }
    },
    created() {
      this.getList();
    },
    computed: {
      ...mapGetters([
          'itcode'
        ])
    },
    methods: {
      getList(page, prop, order) {
        Api.GetEveryList({page, prop, order}).then((res) => {
            this.tableData = res.data_list
            this.Allpage = res.all_page
        })
      },
      Search() {
        Api.GetEveryList({page: this.PageIndex, keyword: this.search, type: 'search'}).then((res) => {
            this.tableData = res.data_list
            this.Allpage = res.all_page
        })
      },
      currentPages(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order);
      },
      prev_click(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order);
      },
      next_click(val) {
        this.PageIndex = val
        this.getList(val, this.prop, this.order);
      },
      rowClass({ row, column, rowIndex, columnIndex }) {
         if (columnIndex === 6) return 'allaction'
      },
      changeTableSort(column) {
        this.prop = column.prop;
        this.order = column.order;
        this.getList(this.PageIndex, column.prop, column.order);
      }
    }
  }
  // 日志1 分页组件二次封装完成 可以正常使用
</script>
<style lang="scss" scoped>
.Discuss .el-dialog__body{
  display: flex !important;
}
.Discuss .el-dialog__body>form{
  width: 445px !important;
}
body .scroll_commit{
  width: 400px;
  height: 355px !important;
  margin-left: 20px;
  overflow-y: scroll;
}
body .scroll_commit{
  width: 400px;
  height: 355px !important;
  margin-left: 20px;
  overflow-y: scroll;
}
.details .el-dialog__body .item>p>span:nth-of-type(1){
  font-weight: 600 !important;
}
.allaction{
  >div{
    display: flex !important;
  }
}
.All_ticket_title{
  width: 226px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chart>div>div:nth-of-type(2){
  height: 300px !important;
}
.hint_title{
  width: 75%;
  display: flex;
  padding: 30px 0 0 0;
  >span{
    flex: 1;
    text-align: left;
    text-indent: 1em;
    &:nth-of-type(2){
      text-align: right;
    }
  }
}
</style>
