<template>
    <keep-alive>
        <div ref="Suction" class="scroll">
            <div class="HomeSerce">
                <div :class="scrollKg && 'SuctionTop'" class="transition">
                    <div class="sut_header">
                        <div class="dateSearch">
                            <el-date-picker
                                v-model="month"
                                type="month"
                                class="picker"
                                value-format="yyyy-MM"
                                :clearable='false'
                                @change="changeMonth"
                                :placeholder="$t('Lang.Views.Sut.Suts.Select_month')">
                            </el-date-picker>
                            <el-input
                                :placeholder= placType
                                v-model="search"
                                class="input-with-select search"
                                clearable
                                @focus="placType = ''"
                                @blur="placType = 'eg.SR670 128GB 48TB'"
                                @change="Search(PageIndex, search, 'user_page', itcode.type)">
                            </el-input>
                            <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="Search(PageIndex, search, 'user_page', itcode.type)"></el-button>
                        </div>
                    </div>
                    <!-- color -->
                    <ColorType></ColorType>
                    <!-- 分页组件 -->
                    <el-pagination
                    background
                    @current-change="currentPages"
                    @prev-click="currentPages"
                    @next-click="currentPages"
                    layout="prev, pager, next"
                    :total="(Allpage * 10)">
                    </el-pagination>
                </div>
                <!-- 这个是让吸顶条有一个占位标签 -->
                <transition name="el-fade-in">
                    <div v-show="text!==''" class="noData">{{text}}</div>
                </transition>
                <Sut
                :months="month"
                :sutDatas="SutData"
                :notDates="NotDate"
                :sumdates="sumdate"
                :Type="'user'"
                :page="PageIndex"
                :search="search"
                @Type="Types($event)"
                ></Sut>
            </div>
        </div>
    </keep-alive>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
import {pastDate, getLastDay, SearchAPI} from '../../components/publicJS/Sut'
import Sut from '../../components/sut/SutDate'
import ColorType from '../../components/sut/ColorType'
import store from '../../store/store'
export default {
    components: {
        Sut, ColorType
    },
    data() {
        return {
            month: new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)), // 时间框的绑定值
            yearMonth: [], // 传入年份和月份
            sumdate: '', // 每个月最后一天
            SutData: [], // 展示所有的机器
            search: '',
            indexType: '',
            PageIndex: 1, // 当前下标
            Allpage: '',
            NotDate: [],
            not: true, // 解决鼠标在移入移出是用户点的跳转报错的问题
            placType: 'eg.SR670 128GB 48TB',
            text: '',
            scrollKg: false
        }
    },
    created() {
        this.changeMonth()
        this.getshowsut()
        if (sessionStorage.getItem('Loading') === null) {
            store.commit('SET_LOADING2', true)
        }
        Api.GetMpolock()
        this.$parent.setCrumb(this.$route);
    },
    computed: {
        ...mapGetters([
            'itcode'
          ])
    },
    mounted() {
        this.$refs.Suction.onscroll = () => {
            parseInt(this.$refs.Suction.scrollTop) >= 30 ? this.scrollKg = true : this.scrollKg = false
        }
    },
    methods: {
        changeMonth() {
            this.$set(this, 'month', this.month)
            this.yearMonth = this.month.split('-')
            this.sumdate = getLastDay(this.yearMonth[0], this.yearMonth[1])
            this.NotDate = pastDate(this.SutData, this.yearMonth[1], this.yearMonth[0])
        },
        getshowsut(page) {
            Api.getShowSut({page, user_page: 'user_page'}).then((res) => {
                if (res.success === true) {
                    this.SutData = res.sut_data
                    this.Allpage = res.all_page
                    this.NotDate = pastDate(res.sut_data, this.yearMonth[1], this.yearMonth[0])
                    if (sessionStorage.getItem('Loading') !== '') {
                        sessionStorage.removeItem('Loading')
                        store.commit('SET_LOADING', false)
                    } else {
                        store.commit('SET_LOADING2', false)
                    }
                    store.commit('SET_LOADING2', false)
                }
            })
        },
        Search(page, search, user, itcode) {
            let than = this;
            SearchAPI(page, search, user, itcode, than).then(res => {
                this.$set(this, 'text', res.text)
                this.SutData = res.SutData;
                this.Allpage = res.Allpage
                this.NotDate = pastDate(res.SutData, this.yearMonth[1], this.yearMonth[0])
            })
        },
        currentPages(val) {
            this.PageIndex = val
            this.search === '' ? this.getshowsut(val) : this.Search(val, this.search, 'user_page', this.itcode.type);
        }
    }
}
</script>
<style lang="scss">
.clearfix::after,.clearfix::before{
    content: '';
    clear: both;
    display: block;
}
.clearfix{
    zoom: 1;
}
.HomeSerce{
    padding-top: 30px;
}
.scroll{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
}
.transition{
    transition: all .3s;
    background: #f5f7fa;
    height: 125px;
}
@media screen and (min-width: 1920px) {
    .SuctionTop{
        position: sticky;
        top: -1px;
        box-shadow: 0px 3px 10px #bdbdbd;
        border-radius: 0 0 5px 5px;
        z-index: 999;
    }
}
@media only screen and (max-width: 1536px) {
   .SuctionTop{
        position: sticky;
        top: -1px;
        box-shadow: 0px 3px 10px #bdbdbd;
        border-radius: 0 0 5px 5px;
        z-index: 999;
    }
}
.sut_header{
    width: 75%;
    margin: auto;
    margin-bottom: 20px;
    >.dateSearch{
        width: 100%;
        height: 60px;
        text-align: center;
        display: flex;
        justify-content: center;
        position: relative;
        >div:nth-of-type(1){
            flex: .25;
            input{
                height: 100% !important;
                border-radius: 0px !important;
                border-right: none !important;
                border-top-left-radius: 5px !important;
                border-bottom-left-radius: 5px !important;
                text-align: center !important;
                font-size: 17px !important;
            }
            .el-input__icon{
                font-size: 20px !important;
                line-height: 60px !important;
            }
        }
        >div:nth-of-type(2){
            flex: 1;
            input{
                height: 100% !important;
                border-radius: 0 !important;
                font-size: 17px !important;
            }
            >input::-webkit-input-placeholder{
                color: rgb(158, 158, 158) !important;
            }
            .el-input__icon{
                font-size: 20px !important;
                line-height: 60px !important;
            }
        }
        .searchBtn{
            width: 70px !important;
            height: 100% !important;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            >i{
                font-size: 20px !important;
            }
        }
    }
}
.top {
    text-align: center;
}
.locations>div>div{
    float: left !important;
}
.locations .el-form-item{
    width: 35% !important;
    float: left !important;
}
.locations .el-form-item__label{
    width: 70px !important;
}
.locations .el-form-item__content{
    margin-left: 70px !important;
}
.locations>label{
    width: 100px !important;
}
.locations>.el-form-item__label{
    width: 100px !important;
}
.locations>.el-form-item__content{
    margin-left: 100px !important;
}
.locations .el-select{
    width: 30% !important;
}
.SN,.armory,.SutIP,.XCCuser{
    width: 50% !important;
    float: left !important;
    height: 40px !important;
}
.XCCPw {
    width: 100% !important;
}
.textarea>label{
    width: 105px !important;
}
.textarea>div{
    margin-left: 105px !important;
}
.textarea{
    width: 100% !important;
}
.release,.codeName{
    width: 50% !important;
    float: left !important;
}
.sutName{
    width: 100%;
    padding: 0 10px;
}

.link_Skip{
    color: #fff;
    display: block;
    text-align: center;
}
.el-date-picker__header-label{
    color: #606266 !important;
}
.noData{
    height: 70px;
    line-height: 70px;
    font-size: 35px;
    font-weight: 600;
    background: #d8d8d8;
    text-align: center;
}
</style>
