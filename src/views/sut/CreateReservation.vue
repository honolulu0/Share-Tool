<template>
    <div class="container">
        <div class="MyForm">
            <router-link to>
             <el-button type="text" @click="$router.back()" class="el-icon-arrow-left">{{$t('Lang.Views.Cms.Articles.Back')}}</el-button>
            </router-link>
            <el-page-header :content="MessAge.sutName" ></el-page-header>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('Lang.public.Reservation_label.Select_Dates')" prop="date">
                    <el-date-picker
                        v-model="Select_Dates"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        :start-placeholder="$t('Lang.public.Reservation_label.start_placeholder')"
                        :end-placeholder="$t('Lang.public.Reservation_label.end_placeholder')"
                        :picker-options="pickerOptions"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('Lang.public.Reservation_label.Usage')" prop="usage">
                    <el-input type="textarea" v-model="ruleForm.usage" rows='4' :placeholder="$t('Lang.Views.Sut.CreateReservation.please_usage')"></el-input>
                </el-form-item>
                <el-page-header :content="$t('Lang.Views.Sut.CreateReservation.Add_Request')" title=''></el-page-header>
                    <div class="request">
                        <el-form :model="request"  ref="request" label-width="100px" class="demo-ruleForm">
                            <el-form-item :label="$t('Lang.Views.ShareEverything.Title')" prop="title" class="Requesttitle">
                                <el-input v-model="request.ticket_title" :placeholder="$t('Lang.Views.ShareEverything.PlaceholderTitle')"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('Lang.Views.Sut.CreateReservation.Details')" prop="commit">
                                <el-input type="textarea" v-model="request.comments" :placeholder="$t('Lang.Views.Sut.CreateReservation.Please_request')" :rows='5'></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                <el-form-item>
                    <el-button type="primary" @click="reserveType = true" ref="SubBtn">{{$t('Lang.public.SubBtn')}}</el-button>
                </el-form-item>
                <!-- 是否确认预定 -->
                <el-dialog
                    :title="$t('Lang.Views.Sut.CreateReservation.Prompt')"
                    :visible.sync="reserveType"
                    width="50%"
                    class="confirm"
                    :before-close="handleClose">
                    <div class="title_text">
                        <span>{{$t('Lang.Views.Sut.CreateReservation.Dear')}} </span><span>{{userName}},</span><br/>
                        <span>{{$t('Lang.Views.Sut.CreateReservation.title_text')}}</span>
                    </div>
                    <p class="sutnameStyle">{{MessAge.sutName}}</p>
                    <div>
                        <p>{{$t('Lang.Views.Sut.CreateReservation.Time_title')}}</p>
                        <p class="timeStype">{{Select_Dates[0].split('-').join('/')}} &nbsp; - &nbsp; {{Select_Dates[1].split('-').join('/')}}</p>
                    </div>
                    <div class="PleaseText" v-show="MessAge.owner !== itcode">
                        <p>{{$t('Lang.Views.Sut.CreateReservation.MPO_title')}}</p>
                        <p>1. &nbsp;{{$t('Lang.Views.Sut.CreateReservation.one_text')}} <span style="color: #3e8ddd;">{{MessAge.owner}}</span> {{$t('Lang.Views.Sut.CreateReservation.two_text')}} <span style="color: #c00000;">{{MessAge.reverttime}} {{$t('Lang.Views.Sut.CreateReservation.Day')}}</span></p>
                        <p>2. &nbsp;{{$t('Lang.Views.Sut.CreateReservation.text')}}</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="reserveType = false">{{$t('Lang.public.CancelBtn')}}</el-button>
                        <el-button type="primary" @click="disabldType && Submit('ruleForm')">{{$t('Lang.public.Agben')}}</el-button>
                    </span>
                </el-dialog>
                <!-- over -->
                <el-page-header :content="$t('Lang.Views.Sut.CreateReservation.Configuration')" title=''></el-page-header>
                    <div class="releaseData">
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.SystemID')}}</span>&nbsp;<span>{{MessAge.ID}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.SystemName')}}</span>&nbsp;<span style="SystemName">{{MessAge.sutName}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.CodeName')}}</span>&nbsp;<span>{{MessAge.codename}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.SN')}}</span>&nbsp;<span>{{MessAge.sn}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.Location')}}</span>&nbsp;<span>{{MessAge.lablocation+'-'+MessAge.rack+'-'+MessAge.slot}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.Release')}}</span>&nbsp;<span>{{MessAge.release}}</span></div>
                        <div><span>{{$t('Lang.Views.Sut.CreateReservation.ReleaseData.Armory')}}</span>&nbsp;<span>{{MessAge.armory}}</span></div>
                    </div>
                     <!-- 折叠面板 -->
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.P_d')" name="1">
                    <!-- table -->
                    <el-table :data="processorsList" style="width: 100%">
                        <!-- 列 -->
                        <el-table-column prop="Bay_Number" :label="$t('Lang.Views.Sut.CreateReservation.collapse.Bn')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Bay_Number}}</span>
                        </template>
                        </el-table-column>
                        <!-- 列 -->
                        <el-table-column
                        prop="Processor_Speed"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Processor_Speed')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Processor_Speed}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Number_of_Cores"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Number_of_Cores')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Number_of_Cores}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Product_Name"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Product_Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Product_Name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Product_Family"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Product_Family')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Product_Family}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板2 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.M_d')" name="2">
                    <el-table
                    :data="memoryList"
                    style="width: 100%">
                    <el-table-column
                        prop="Bay_Number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Bn')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Bay_Number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Size"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Size')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Size}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Speed"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Speed')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Speed}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Type"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Type')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Model"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Model')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Model}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Serial_number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Serial_number')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Serial_number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Part_number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Part_number')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Part_number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                        <span>{{scope.row.Manufacturer}}</span>
                        </template>
                    </el-table-column>
                    </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板3 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.D_d')" name="3">
                    <el-table
                    :data="drivesList"
                    style="width: 100%">
                    <el-table-column
                    prop="RAID"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.RAID')">
                    <template slot-scope="scope">
                        <span>{{scope.row.RAID}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Bay_Number"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Bn')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Bay_Number}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Speed"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Speed')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Speed}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Capacity"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Capacity')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Capacity}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Drive_Type"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Drive_Type')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Drive_Type}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="RAID_State"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.RAID_State')">
                    <template slot-scope="scope">
                        <span>{{scope.row.RAID_State}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Storage_Pool"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Storage_Pool')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Storage_Pool}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Part_Number"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Part_Number')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Part_Number}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="SSD_Remaining_Life"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.SSD_Remaining_Life')">
                    <template slot-scope="scope">
                        <span>{{scope.row.SSD_Remaining_Life}}</span>
                    </template>
                    </el-table-column>
                </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板4 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.F_m')" name="4">
                    <el-table
                    :data="flashList"
                    style="width: 100%">
                    <el-table-column
                    prop="Slot_Number"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Slot_Number')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Slot_Number}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Capacity"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Capacity')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Capacity}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Manufacturer"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Manufacturer}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Part_Number"
                    :label="$t('Lang.Views.Sut.CreateReservation.collapse.Part_Number')">
                    <template slot-scope="scope">
                        <span>{{scope.row.Part_Number}}</span>
                    </template>
                    </el-table-column>
                </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板5 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.P_s')" name="5">
                    <el-table :data="powerList" style="width: 100%">
                        <el-table-column prop="Name" :label="$t('Lang.Views.Sut.CreateReservation.collapse.Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Total_output_power"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Total_output_power')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Total_output_power}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Part_Number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Part_Number')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Part_Number}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Serial_number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Serial_number')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Serial_number}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板6 未完成-->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.R_n')" name="6">
                    <el-table :data="powerList" style="width: 100%">
                        <el-table-column prop="Name" :label="$t('Lang.Views.Sut.CreateReservation.collapse.Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Slot_Name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Total_output_power"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Total_output_power')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Total_output_power}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Part_Number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Part_Number')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Part_Number}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Serial_number"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Serial_number')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Serial_number}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    </el-collapse-item>
                    <!-- 666over -->
                    <!-- 折叠面板7 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.E_s')" name="7">
                    <el-table :data="expansionList" style="width: 100%">
                        <el-table-column prop="Bay_Number" :label="$t('Lang.Views.Sut.CreateReservation.collapse.Bn')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Bay_Number}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Product_Name"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Product_Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Product_Name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Manufacturer"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Manufacturer')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Manufacturer}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="FRU"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.FRU')">
                        <template slot-scope="scope">
                            <span>{{scope.row.FRU}}</span>
                        </template>
                        </el-table-column>
                        <!-- 包 -->
                        <el-table-column
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.F_e')">
                        <el-table-column
                        prop="Name"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Version"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Version')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Version}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Release_Date"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Release_Date')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Release_Date}}</span>
                        </template>
                        </el-table-column>
                    </el-table-column>
                    </el-table>
                    </el-collapse-item>
                    <!-- 折叠面板8 -->
                    <el-collapse-item :title="$t('Lang.Views.Sut.CreateReservation.collapse.F_e')" name="8">
                    <el-table :data="firmwareList" style="width: 100%">
                        <el-table-column prop="name" :label="$t('Lang.Views.Sut.CreateReservation.collapse.Name')">
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Version"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Version')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Version}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Build"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Build')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Build}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="Release_Date"
                        :label="$t('Lang.Views.Sut.CreateReservation.collapse.Release_Date')">
                        <template slot-scope="scope">
                            <span>{{scope.row.Release_Date}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
        </div>
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            disabldType: true, // 防止用户的电脑卡顿时一直点击创建预定按钮
            Select_Dates: [this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + (this.$route.query.currentDay < 10 ? '0' + this.$route.query.currentDay : this.$route.query.currentDay),
            new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[0] + '-' +
            (new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1] < 10 ? '0' + new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1] : new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[1]) + '-' +
            (parseInt(new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2]) < 10 ? '0' + new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2] : new Date(new Date(this.$route.query.currentYear + '-' + this.$route.query.currentMout + '-' + this.$route.query.currentDay).getTime() + (24 * 60 * 60 * 1000 * 7)).toLocaleDateString().split('/')[2])],
            ruleForm: {
                usage: '',
                itcode: '',
                sutid: '',
                startdatetimeStr: '',
                enddatetimeStr: '',
                sutName: '',
                sutIP: '',
                sutLoginUser: '',
                sutLoginPassword: '',
                lablocation: '',
                sut_location: ''
            },
            rules: {
                date: [
                ],
                usage: [
                    { required: true, message: 'please fill in Comments', trigger: 'blur' }
                ]
            },
            ID: '',
            MessAge: {},
            request: {
                ticket_title: '',
                my_location: '',
                comments: '',
                sut_id: '',
                sut_location: '',
                os: []
            },
            activeNames: ['1'],
            processorsList: [],
            MemoryList: [],
            drivesList: [],
            flashList: [],
            powerList: [],
            expansionList: [],
            firmwareList: [],
            pickerOptions: {
                disabledDate: (time) => {
                    if (this.MessAge.book_list.length !== 0 || this.MessAge.leadmachine_list.length !== 0) {
                        var date = [...this.MessAge.book_list, ...this.MessAge.leadmachine_list];
                        var str = '';
                        var end = '';
                        var inrange = false;
                        for (let i = 0; i < date.length; i++) {
                            end = new Date(date[i].enddatetimeStr).toLocaleDateString();
                            str = new Date(date[i].startdatetimeStr).toLocaleDateString();
                            inrange = time.getTime() >= new Date(str).getTime() && time.getTime() <= new Date(end).getTime();
                            if (inrange) {
                                return inrange
                            }
                        }
                        return inrange
                    }
                }
            },
            reserveType: false
        }
    },
    computed: {
        ...mapGetters([
            'userName', 'itcode'
        ])
    },
    created() {
        this.ID = sessionStorage.ID
        this.getreServer(sessionStorage.ID)
        this.getSutConfig()
        this.disabldType = true;
    },
    methods: {
      getreServer(ID) {
          Api.Changerelease({ID}).then((res) => {
              this.MessAge = res.sut_data
          })
      },
      Submit(formName) {
        this.disabldType = false;
        this.request.sut_id = this.ID
        this.request.my_location = this.MessAge.lablocation
        this.request.sut_location = this.MessAge.lablocation + '-' + this.MessAge.lab + '-' + this.MessAge.rack + '-' + this.MessAge.slot
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm.startdatetimeStr = this.Select_Dates[0]
              this.ruleForm.enddatetimeStr = this.Select_Dates[1]
              this.ruleForm.sutid = this.ID
              this.ruleForm.itcode = this.itcode
              this.ruleForm.sutName = this.MessAge.sutName
              this.ruleForm.sutIP = this.MessAge.ip
              this.ruleForm.sutLoginUser = this.MessAge.user
              this.ruleForm.sutLoginPassword = this.MessAge.pw
              this.ruleForm.lablocation = this.MessAge.lablocation
              this.ruleForm.sut_location = this.MessAge.lablocation + '-' + this.MessAge.lab + '-' + this.MessAge.rack + '-' + this.MessAge.slot
              Api.CreateRelease({sutbook: {...this.ruleForm}, action: 'add'}).then((res) => {
                if (res.success === true) {
                        this.$message({
                            type: 'success',
                            message: this.$t('Lang.Views.Sut.CreateReservation.S_m_R'),
                            offset: 350
                        });
                        this.disabldType = true;
                        if (this.request.ticket_title !== '') {
                            Api.SubmitWork({data: JSON.stringify(this.request), type: 'commit', withCredentials: true}).then((res) => {
                                if (res.result === 1) {
                                    this.$message({
                                        message: this.$t('Lang.Views.Sut.CreateReservation.O_c_S'),
                                        type: 'success',
                                        offset: 350
                                    });
                                    this.disabldType = true;
                                } else {
                                    this.$message({
                                        message: res.errMsg,
                                        type: 'error',
                                        offset: 350
                                    });
                                }
                                this.request = {
                                    ticket_title: '',
                                    my_location: '',
                                    comments: '',
                                    sut_id: ''
                                }
                            })
                        }
                        this.$router.push('/MyReservation')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg,
                        offset: 350
                    });
                    if (this.request.ticket_title !== '') {
                        this.request = {
                            ticket_title: '',
                            my_location: '',
                            comments: '',
                            sut_id: ''
                        }
                        this.$message({
                            message: this.$t('Lang.Views.Sut.CreateReservation.err_r_r'),
                            type: 'error',
                            offset: 390
                        });
                    }
                }
            })
          } else if (this.request.ticket_title !== '') {
              Api.SubmitWork({data: JSON.stringify(this.request), type: 'commit', withCredentials: true}).then((res) => {
                    if (res.result === 1) {
                        this.$message({
                            message: this.$t('Lang.Views.Sut.CreateReservation.O_c_S'),
                            type: 'success',
                            offset: 350
                        });
                        this.disabldType = true;
                    } else {
                        this.$message({
                            message: res.errMsg,
                            type: 'error',
                            offset: 350
                        });
                    }
                    this.request = {
                        ticket_title: '',
                        my_location: '',
                        comments: '',
                        sut_id: ''
                    }
                })
            }
        })
      },
      getSutConfig() {
        Api.getConfiguration({uuid: 'B6D231EDFE6511E681918C63573E9807'}).then((res) => {
              if (res.success === true) {
                this.processorsList = res.data.Processors
                this.memoryList = res.data.Memory
                this.drivesList = res.data.Drives
                this.flashList = res.data.Flash_DIMM
                this.powerList = res.data.Power_Supplies
                this.expansionList = res.data.Expansion_Cards
                this.firmwareList = res.data.Firmware
              }
          })
      },
      handleClose(done) {
        this.reserveType = false
      }
    }
}
</script>
<style lang="scss">
.el-page-header__left{
    cursor:initial !important;
    display: none !important;
}
.MyForm{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 0 3px 3px rgba($color: #000000, $alpha: 0.1);
    >a{
        text-decoration: none !important;
        font-size: 18px;
        >button{
            color: #333 !important;
        }
    }
}
.el-page-header{
    height: 40px !important;
    background: #f5f7fa;
    margin: 30px 0 30px 0;
    .el-page-header__content{
        line-height: 40px !important;
        text-indent: 2em !important;
    }
}
.el-page-header__content{
    font-weight: 600 !important;
    color: #333 !important;
}
.releaseData{
    width: 100%;
    padding: 30px;
    padding-left: 125px;
    height: 200px;
    box-sizing: border-box;
    >div{
        width: 40%;
        float: left;
        margin: 10px;
        >span:nth-of-type(1){
            margin-right: 5px;
        }
    }
}
.el-input__inner::-webkit-input-placeholder{
  color: #4e4e68 !important;
}
.header-icon{
    font-size: 25px !important;
}
.OS{
    padding-left: 100px !important;
    padding-top: 30px !important;
    >div{
        width: 400px !important;
        margin-bottom: 20px !important;
        margin-right: 20px !important;
    }
}
.el-collapse-item__header {
    font-size: 20px !important;
    padding-left: 50px !important;
    color: #333 !important;
  }
.el-picker-panel__icon-btn{
    color: #333 !important;
}
.SystemName{
    width: 300px;
    line-height: 16px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.inOS{
    width: 100% !important;
}
// 折叠面板的
.el-collapse-item__header{
    font-size: 18px!important;
    font-weight: bold!important;
    color: dimgrey!important;
    padding-left: 20px!important;
    background:#f5f7fa;
    margin-top: 5px;
}
.cell{
    font-size: 14px!important;
    padding-left: 12px!important;
}
.locationbox{
    width: 98%;
    margin: 0 auto;
}
.update{
    margin-left: 1090px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
}
.title_text{
    >span:nth-of-type(2){
        color: #3e8ddd;;
    }
}
.sutnameStyle{
    color: #c00000;
    font-size: 25px;
    font-weight: 600;
    line-height: 32px;
    margin: 0 0 20px 0;
}
.timeStype{
    font-size: 25px;
    font-weight: 600;
    color: #c00000;
    margin: 0 0 20px 0;
}
.PleaseText{
    >p{
        margin-bottom: 2px;
    }
}
.confirm{
    >div{
        >div:nth-of-type(2){
            padding: 0 20px 30px 20px !important;
        }
    }
}
</style>
