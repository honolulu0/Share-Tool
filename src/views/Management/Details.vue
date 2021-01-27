<template>
    <div>
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane>
          <!-- left icon -->
          <span slot="label" style="font-size:14px"><i class="el-icon-tickets" style="font-size:14px;margin-right:10px"></i>Summary</span>
          <el-card>
              <h4 style="width:85%;text-align:center;font-size:16px;margin-botttom:15px">Summary</h4>
              <!-- 借出按钮 -->
                <template slot="content">
                  <div style="float:right;margin-right:5px;">
                    <el-button type="warning" @click="GOLoaned('Borrowed')">{{$t('Lang.Views.Manage.Detalis.Borrow')}}</el-button>
                    <el-button type="primary" @click="GOCheck('Check')">{{$t('Lang.Views.Manage.Detalis.Check_out')}}</el-button>
                  </div>
                </template>
              <!-- sutname独占一行 -->
                <div style="display:flex;width:92%;margin:0 auto;margin-bottom:10px;margin-top:30px">
                  <span class="you" v-if="!isEdit" style="width:100px;line-height:30px;font-weight:600">{{$t('Lang.Views.Manage.AddPage.SutName')}}</span>&nbsp;&nbsp;<span class="word sutword" v-if="!isEdit">{{MessAge.sutName}}<el-button size="mini" style="width:59px;height:31px;font-size:11px;margin-left:5px" type="info" @click="nameUpdate(MessAge.ID)">{{$t('Lang.Views.Manage.Detalis.Update')}}</el-button></span>
                  <span v-if="isEdit" class="you" style="line-height:30px;margin-left:-5px;margin-right:5px">{{$t('Lang.Views.Manage.AddPage.SutName')}}</span><el-input class="zuo sutzuo" type="text" v-model="changeAge.sutName" v-if="isEdit"/>
                </div>
              <div class="topbox">
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.Release')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.release}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.release" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                    <span class="you">BMC:</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.xcc_signed}}</span>
                    <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.xcc_signed" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.Code_Name')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.codename}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.codename" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                    <span class="you">UEFI:</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.uefi_signed}}</span>
                    <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.uefi_signed" v-if="isEdit"/>
                </div>
                <!-- select联级选项框 -->
                <div class="lonbox">
                  <span v-if="!isEdit" class="you">Site/Lab/Rack:</span><span class="word" v-if="!isEdit">{{MessAge.lablocation}}/{{MessAge.lab}}/{{MessAge.rack}}</span>
                  <div class="block" style="display:flex">
                    <span v-if="isEdit" class="you" style="line-height:40px;margin-left:-7px">Site/Lab/Rack:</span>
                    <el-cascader
                     class="zuo littlezuo"
                    placeholder="please select"
                      v-model="changeAge.options"
                      :options="options"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                      v-if="isEdit">
                    </el-cascader>
                  </div>
              </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.Slot')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.slot}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.slot" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                  <span class="you">Armory:</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.armory}}</span>
                  <el-select
                   class="zuo"
                    clearable
                    v-if="isEdit"
                    v-model="changeAge.armory"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter the keywords"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in yuanoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.SUT_IP')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.ip}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.ip" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.XCC_USER')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.user}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.user" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.XCC_PW')}}</span>&nbsp;<span class="word" v-if="!isEdit" v-show="isDis">{{MessAge.pw}}</span><span style="color:blue" v-if="!isEdit" v-show="!isDis" @click="isDis=true">Show</span>
                  <el-input class="zuo" style="width:190px" type="text" show-password v-model="changeAge.pw" v-if="isEdit"/>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.AddPage.Main_Polling_Owner')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.owner}}</span>
                  <el-select
                   class="zuo"
                    clearable
                    v-if="isEdit"
                    v-model="changeAge.owner"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter the keywords"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="item in yuanoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <div class="lonbox">
                  <span class="you">{{$t('Lang.Views.Manage.project.phase')}}</span>&nbsp;<span class="word" v-if="!isEdit">{{MessAge.backgroud_type}}</span>
                  <el-input class="zuo" style="width:190px" type="text" v-model="changeAge.backgroud_type" v-if="isEdit"/>
                </div>
            </div>
                <div style="float: right;margin-top: 8px;margin-bottom:15px;margin-right: 5px;">
                  <!-- 编辑 -->
                  <el-button type="info" style="width:85px" @click="handleEdit" v-if="TypeID.type!== 2 && !isEdit">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
                  <!-- 保存 -->
                  <el-button type="info" style="width:85px" @click="handleSave" v-if="TypeID.type!== 2 && isEdit">{{$t('Lang.Views.Manage.Admin_sut.Save')}}</el-button>
              </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Inventory">
          <span slot="label" style="font-size:14px"><i style="font-size:14px;margin-right:10px" class="el-icon-notebook-2"></i>Inventory</span>
          <!-- 更新 -->
          <div style="width:99%;margin-top:20px"><el-button style="float:right;margin-bottom:20px" type="info" @click="handleUpdate" v-if="TypeID.type!== 2">{{$t('Lang.Views.Manage.Detalis.Update')}}</el-button></div>
            <div class="mianban">
          <!-- FW表格 -->
          <el-table
            :border="false"
            v-loading="loading"
            :data="fwData"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="Firmware">
              <el-table-column align='center' label="Type" prop="Name">
                  <template slot-scope="scope">
                      <div>{{scope.row.Name}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Version" prop="Version">
                  <template slot-scope="scope">
                      <div>{{scope.row.Version}}</div>
                  </template>
              </el-table-column>
                <el-table-column align='center' label="Build" prop="Build">
                  <template slot-scope="scope">
                      <div>{{scope.row.Build}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Software Id" prop="SoftwareId">
                  <template slot-scope="scope">
                      <div>{{scope.row.SoftwareId}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Description" prop="Description">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.Description" placement="top-start">
                      <div style="width:205px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.Description}}</div>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="fwEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- CPU表格 -->
          <el-table
            v-loading="loading"
            :data="cpuData"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="margin-top:20px">
                <el-table-column align='center' label="CPU">
                <el-table-column align='center' label="Model" prop="Name">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.Name" placement="top-start">
                      <div style="width:160px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.Name}}</div>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="MaxSpeed" prop="MaxSpeedMHz">
                  <template slot-scope="scope">
                      <div>{{scope.row.MaxSpeedMHz}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Architecture" prop="ProcessorArchitecture">
                  <template slot-scope="scope">
                      <div>{{scope.row.ProcessorArchitecture}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="FRU Name" prop="Socket">
                  <template slot-scope="scope">
                      <div>{{scope.row.Socket}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Max Threads" prop="TotalThreads">
                  <template slot-scope="scope">
                      <div>{{scope.row.TotalThreads}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Max Cores" prop="TotalCores">
                  <template slot-scope="scope">
                      <div>{{scope.row.TotalCores}}</div>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="cpuEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- MAC表格 -->
          <el-table
            :data="macData"
            v-loading="loading"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="MAC">
                <el-table-column align='center' label="Id" prop="Id">
                  <template slot-scope="scope">
                      <div>{{scope.row.Id}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Name" prop="Name">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.Name" placement="top-start">
                      <div style="width:145px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.Name}}</div>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="FQDN" prop="FQDN">
                  <template slot-scope="scope">
                      <div class="hide">{{scope.row.FQDN}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="MAC Address" prop="MACAddress">
                  <template slot-scope="scope">
                      <div>{{scope.row.MACAddress}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Permanent Address" prop="PermanentMACAddress">
                  <template slot-scope="scope">
                      <div>{{scope.row.PermanentMACAddress}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="AutoNeg" prop="AutoNeg">
                  <template slot-scope="scope">
                      <div>{{scope.row.AutoNeg}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Interface" prop="InterfaceEnabled">
                  <template slot-scope="scope">
                      <div>{{scope.row.InterfaceEnabled}}</div>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="macEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- memory表格 -->
          <el-table
            :data="memoryData"
            v-loading="loading"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="Memory">
              <el-table-column align='center' label="Slot" prop="DeviceID">
                  <template slot-scope="scope">
                      <div>{{scope.row.DeviceID}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Type" prop="MemoryDeviceType">
                  <template slot-scope="scope">
                      <div>{{scope.row.MemoryDeviceType}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Capacity" prop="Size">
                  <template slot-scope="scope">
                      <div>{{scope.row.Size}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Max Speed" prop="Speed">
                  <template slot-scope="scope">
                      <div>{{scope.row.Speed}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="SerialNumber" prop="SerialNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.SerialNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="PartNumber" prop="PartNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.PartNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Manufacturer" prop="Manufacturer">
                  <template slot-scope="scope">
                      <div>{{scope.row.Manufacturer}}</div>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="memoryEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- PCI表格 -->
          <el-table
            :data="pciData"
            v-loading="loading"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="PCI">
                <el-table-column align='center' label="Slot" prop="Id">
                  <template slot-scope="scope">
                      <div>{{scope.row.Id}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Manufacturer" prop="Manufacturer">
                  <template slot-scope="scope">
                      <div>{{scope.row.Manufacturer}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Model" prop="Model">
                  <template slot-scope="scope">
                      <div>{{scope.row.Model}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Device Name" prop="Name">
                  <template slot-scope="scope">
                      <div>{{scope.row.Name}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Part Number" prop="PartNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.PartNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="SKU" prop="SKU">
                  <template slot-scope="scope">
                      <div>{{scope.row.SKU}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Serial Number" prop="SerialNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.SerialNumber}}</div>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="pciEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- PSU表格 -->
          <el-table
            :data="psuData"
            v-loading="loading"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="PSU">
                <el-table-column align='center' label="Slot" prop="Name">
                  <template slot-scope="scope">
                      <div>{{scope.row.Name}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Model" prop="Model">
                  <template slot-scope="scope">
                      <div>{{scope.row.Model}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Manufacturer" prop="Manufacturer">
                  <template slot-scope="scope">
                      <div>{{scope.row.Manufacturer}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Version" prop="FirmwareVersion">
                  <template slot-scope="scope">
                      <div>{{scope.row.FirmwareVersion}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="LineInputVoltage" prop="LineInputVoltage">
                  <template slot-scope="scope">
                      <div>{{scope.row.LineInputVoltage}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="PartNumber" prop="PartNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.PartNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="SerialNumber" prop="SerialNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.SerialNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="psuEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- Storage表格 -->
          <el-table
            :data="storageData"
            v-loading="loading"
            :cell-class-name="rowClass"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            style="width:100%;margin-top:20px">
                <el-table-column align='center' label="Storage">
                <el-table-column align='center' label="Id" prop="Id">
                  <template slot-scope="scope">
                      <div>{{scope.row.Id}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Name" prop="Name">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.Name" placement="top-start">
                      <div style="width:210px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.Name}}</div>
                    </el-tooltip>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Part Number" prop="PartNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.PartNumber}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="SKU" prop="SKU">
                  <template slot-scope="scope">
                      <div>{{scope.row.SKU}}</div>
                  </template>
              </el-table-column>
              <el-table-column align='center' label="Serial Number" prop="SerialNumber">
                  <template slot-scope="scope">
                      <div>{{scope.row.SerialNumber}}</div>
                  </template>
              </el-table-column>
              <!-- edit delete按钮 -->
              <el-table-column align='center' label="Operation" header-align='center' width='100px'>
                  <template slot-scope="scope">
                          <el-button style="margin-top:2px;margin-bottom:2px" icon='el-icon-edit' size="mini" @click="storageEdit(scope.$index,scope.row,scope.row.id)"></el-button>
                  </template>
              </el-table-column>
              </el-table-column>
          </el-table>
          <!-- 点击fwedit-弹窗 -->
          <el-dialog title="Edit" :visible.sync="fwFormVisible">
              <el-form :model="changeFw" :rules= "rules" label-position="right" label-width="108px">
                <el-form-item label="Type" prop= "Name" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeFw.Name"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Version" prop= "Version" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeFw.Version" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Build" prop= "Build" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeFw.Build" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Software Id" prop= "SoftwareId" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeFw.SoftwareId" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Description" prop= "Description" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeFw.Description" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="fwFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                <el-button type="primary" @click="fwSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
              </div>
          </el-dialog>
          <!-- 点击cpuedit-弹窗 -->
          <el-dialog title="Edit" :visible.sync="cpuFormVisible">
              <el-form :model="changeCpu" :rules= "rules" label-position="right" label-width="108px">
                  <el-form-item label="Model" prop= "Name" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.Name"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Max Speed" prop= "MaxSpeedMHz" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.MaxSpeedMHz"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Architecture" prop= "ProcessorArchitecture" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.ProcessorArchitecture" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="FRU Name" prop= "Socket" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.Socket" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Max Threads" prop= "TotalThreads" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.TotalThreads" autocomplete="TotalThreads"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Max Cores" prop= "TotalCores" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeCpu.TotalCores" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cpuFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                <el-button type="primary" @click="cpuSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
              </div>
          </el-dialog>
          <!-- 点击mac-edit-弹窗 -->
          <el-dialog title="Edit" :visible.sync="macFormVisible">
              <el-form :model="changeMac" :rules= "rules" label-position="right" label-width="108px">
                  <el-form-item label="Id" prop= "Id" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.Id"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Name" prop= "Name" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.Name"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="FQDN" prop= "FQDN" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.FQDN" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="MAC Address" prop= "MACAddress" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.MACAddress" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Address" prop= "PermanentMACAddress" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.PermanentMACAddress" autocomplete="TotalThreads"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="AutoNeg" prop= "AutoNeg" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.AutoNeg" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Interface" prop= "InterfaceEnabled" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMac.InterfaceEnabled" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="macFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                <el-button type="primary" @click="macSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
              </div>
          </el-dialog>
          <!-- 点击memory-edit-弹窗 -->
          <el-dialog el-dialog title="Edit" :visible.sync="memoryFormVisible">
              <el-form :model="changeMemory" :rules= "rules" label-position="right" label-width="108px">
                  <el-form-item label="Slot" prop= "DeviceID" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.DeviceID"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Capacity" prop= "Size" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.Size"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Max Speed" prop= "Speed" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.Speed" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Type" prop= "MemoryDeviceType" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.MemoryDeviceType" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="SerialNumber" prop= "SerialNumber" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.SerialNumber" autocomplete="TotalThreads"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="PartNumber" prop= "PartNumber" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.PartNumber" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Manufacturer" prop= "Manufacturer" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-input v-model="changeMemory.Manufacturer" autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="memoryFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                <el-button type="primary" @click="memorySave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
              </div>
          </el-dialog>
          <!-- 点击pci-edit-弹窗 -->
            <el-dialog title="Edit" :visible.sync="pciFormVisible">
                <el-form :model="changePci" :rules= "rules" label-position="right" label-width="108px">
                    <el-form-item label="Id" prop= "Id" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.Id"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Manufacturer" prop= "Manufacturer" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.Manufacturer"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Model" prop= "Model" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.Model" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Device Name" prop= "Name" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.Name" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Part Number" prop= "PartNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.PartNumber" autocomplete="TotalThreads"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="SKU" prop= "SKU" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.SKU" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Serial Number" prop= "SerialNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePci.SerialNumber" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="pciFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                  <el-button type="primary" @click="pciSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
                </div>
            </el-dialog>
          <!-- 点击psu-edit-弹窗 -->
            <el-dialog title="Edit" :visible.sync="psuFormVisible">
                <el-form :model="changePsu" :rules= "rules" label-position="right" label-width="108px">
                    <el-form-item label="Name" prop= "Name" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.Name"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Model" prop= "Model" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.Model"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Manufacturer" prop= "Manufacturer" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.Manufacturer"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="FirmwareVersion" prop= "FirmwareVersion" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.FirmwareVersion" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="LineInputVoltage" prop= "LineInputVoltage" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.LineInputVoltage" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="PartNumber" prop= "PartNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.PartNumber" autocomplete="TotalThreads"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="SerialNumber" prop= "SerialNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changePsu.SerialNumber" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="psuFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                  <el-button type="primary" @click="psuSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
                </div>
            </el-dialog>
            <!-- 点击storage-edit-弹窗 -->
            <el-dialog title="Edit" :visible.sync="storageFormVisible">
                <el-form :model="changeStorage" :rules= "rules" label-position="right" label-width="108px">
                    <el-form-item label="Id" prop= "Id" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changeStorage.Id"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Name" prop= "Name" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changeStorage.Name"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Part Number" prop= "PartNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changeStorage.PartNumber"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="SKU" prop= "SKU" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changeStorage.SKU" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="Serial Number" prop= "SerialNumber" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="changeStorage.SerialNumber" autocomplete="off"></el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="storageFormVisible = false">{{$t('Lang.Views.Manage.project.cancel')}}</el-button>
                  <el-button type="primary" @click="storageSave">{{$t('Lang.Views.Manage.project.OK')}}</el-button>
                </div>
            </el-dialog>
        </div>
        </el-tab-pane>
        <el-tab-pane label="Permission">
          <span slot="label" style="font-size:14px"><i style="font-size:14px;margin-right:10px" class="el-icon-lock"></i>Permission</span>
          <el-card style="height:400px">
            <h4 style="width:95%;text-align:center;font-size:16px;margin-botttom:15px">Permission</h4>
            <div class="lockbox" style="margin-top:40px;margin-left:40px">
              <!-- <div><span style="font-size:20px;margin-left:5px;color:#606266">{{$t('Lang.Views.Support.MainPollingOwner.borrow')}}</span><p :class="borrowedlock ? 'el-icon-unlock' : 'el-icon-lock'" @click="borLock(sutid, borrowedlock)" style="font-size: 22px"></p></div> -->
              <!-- <div style="margin-top:20px"><span style="font-size:20px;margin-right:15px;color:#606266">{{$t('Lang.Views.Support.MainPollingOwner.checkoutlock')}}</span><p :class="checkoutlock ? 'el-icon-unlock' : 'el-icon-lock'" @click="cheLock(sutid, checkoutlock)" style="font-size: 22px"></p></div> -->
              <!-- Reservation锁定预定 -->
              <div style="margin-top:20px">
                <span style="font-size:14px;margin-right:30px;font-weight:600">{{$t('Lang.Views.Support.MainPollingOwner.Reservation')}}</span>
                <span style="font-size: 14px">{{reservationlock?'Unlocked':'Locked'}}</span>
                <el-dropdown trigger="click" v-if="isLock" @command="(value)=>handleCommand(value, sutid)">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="unreservationlock">Lock</el-dropdown-item>
                    <el-dropdown-item command="reservationlock">Unlock</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <!-- changepassword改密码锁定 -->
              <div style="margin-top:20px">
                <span style="font-size:14px;margin-right:30px;font-weight:600">{{$t('Lang.Views.Support.MainPollingOwner.modifypasswd')}}</span>
                <span style="font-size: 14px">{{modifypasswd?'Unlocked':'Locked'}}</span>
                <!-- <p :class="modifypasswd ? 'el-icon-unlock' : 'el-icon-lock'" @click="modifyLock(sutid, modifypasswd)" style="font-size: 22px"></p> -->
                <!-- <span @click="modifyLock(sutid, modifypasswd)" style="font-size: 16px">{{modifypasswd?'Unlocked':'Locked'}}</span> -->
                <el-dropdown trigger="click" v-if="isLock" @command="(value)=>handleChangePW(value, sutid)">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="unmodifypasswd">Lock</el-dropdown-item>
                    <el-dropdown-item command="modifypasswd">Unlock</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
              </div>
            </div>
              <!-- 点击编辑 -->
              <el-button type="info" style="width:85px;margin-top:15%;margin-left:93%" @click="lockEdit">{{$t('Lang.Views.Cms.Articles.Edit')}}</el-button>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <!-- tab -->
    </div>
</template>
<script>
import * as Api from '@/api/api'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
          isDis: false, // 页面密码隐藏
          goLock: '',
          tabPosition: 'left',
          value: [],
          loading: false,
          states: [],
          list: [],
          yuanoptions: [], // 远程搜索
          options: [],
          isEdit: false,
          isLock: false,
          MessAge: {},
          changeAge: {
            backgroud_type: '',
            xcc_signed: '',
            uefi_signed: '',
            release: '',
            codename: '',
            sutName: '',
            lablocation: '',
            lab: '',
            rack: '',
            slot: '',
            armory: '',
            ip: '',
            user: '',
            pw: '',
            owner: '',
            options: []
          },
          ChangeData: {
          },
          // 表格
          fwData: [],
          cpuData: [],
          macData: [],
          memoryData: [],
          pciData: [],
          psuData: [],
          storageData: [],
          formLabelWidth: '120px',
          Index: '',
          borrowedlock: null,
          checkoutlock: null,
          reservationlock: null,
          modifypasswd: null,
          sutid: '',
          tableData: {},
          idx: '',
          // 编辑的弹框
          fwFormVisible: false,
          cpuFormVisible: false,
          macFormVisible: false,
          memoryFormVisible: false,
          pciFormVisible: false,
          psuFormVisible: false,
          storageFormVisible: false,
          // 编辑传参
          changeFw: {
              Build: '',
              Description: '',
              Name: '',
              SoftwareId: '',
              Version: ''
          },
          changeCpu: {
              Name: '',
              MaxSpeedMHz: '',
              ProcessorArchitecture: '',
              Socket: '',
              TotalCores: '',
              TotalThreads: ''
          },
          changeMac: {
              Id: '',
              Name: '',
              FQDN: '',
              MACAddress: '',
              PermanentMACAddress: '',
              AutoNeg: '',
              InterfaceEnabled: ''
          },
          changeMemory: {
              DeviceID: '',
              Manufacturer: '',
              MemoryDeviceType: '',
              PartNumber: '',
              SerialNumber: '',
              Size: '',
              Speed: ''
          },
          changePci: {
              Id: '',
              Manufacturer: '',
              Model: '',
              Name: '',
              PartNumber: '',
              SKU: '',
              SerialNumber: ''
          },
          changePsu: {
              Manufacturer: '',
              FirmwareVersion: '',
              Model: '',
              Name: '',
              PartNumber: '',
              LineInputVoltage: '',
              SerialNumber: ''
          },
          changeStorage: {
              Id: '',
              Name: '',
              PartNumber: '',
              SKU: '',
              SerialNumber: ''
          }
        }
    },
    created() {
      this.getrelease(this.$route.query.id)
      this.sutid = this.$route.query.id
      this.handleChange()
    },
    // 远程搜索
        mounted() {
        this.list = this.states.map(item => {
            return { value: `value:${item}`, label: `label:${item}` };
        });
        },
    computed: {
        ...mapGetters([
            'TypeID'
          ])
    },
    methods: {
        getrelease(ID) { // 252
            Api.Changerelease({ID: ID, uuid: this.$route.query.uuid}).then((res) => {
                // 四个锁定的状态
                // this.borrowedlock = res.sut_data.borrowedlock
                // this.checkoutlock = res.sut_data.checkoutlock
                this.reservationlock = res.sut_data.reservationlock
                this.modifypasswd = res.sut_data.modifypasswd
                this.MessAge = res.sut_data
                // this.changeAge = res.sut_data
                this.tableData = JSON.parse(JSON.stringify(res.sut_data))
                // ------
                this.fwData = res.sut_data.data.FW
                this.cpuData = res.sut_data.data.data[0].CPU
                this.macData = res.sut_data.data.data[0].MAC
                this.memoryData = res.sut_data.data.data[0].Memory
                this.pciData = res.sut_data.data.data[0].PCI
                this.psuData = res.sut_data.data.data[0].PSU
                this.storageData = res.sut_data.data.data[0].Storage
            })
        },
      //  borrowedlock借出锁定
      borLock(sutid, type) {
        Api.checkLock({
            sutid,
            action: 'add',
            borrowedlock: this.borrowedlock ? 'unborrowedlock' : 'borrowedlock'
          }).then((res) => {
            if (res.success === true) {
                this.borrowedlock = res.data.borrowedlock
                console.log(this.borrowedlock)
            }
        })
      },
      // reservationlock
      // resLock(sutid, type) {
      //   Api.checkLock({
      //       sutid,
      //       action: 'add',
      //       reservationlock: this.reservationlock ? 'unreservationlock' : 'reservationlock'
      //     }).then((res) => {
      //       if (res.success === true) {
      //         this.reservationlock = res.data.reservationlock
      //       }
      //   })
      // },
      // reservationlock预定锁定（下拉）
      handleCommand(reservationlock, sutid) {
        Api.checkLock({
            sutid,
            action: 'add',
            reservationlock
          }).then((res) => {
            if (res.success === true) {
              this.reservationlock = res.data.reservationlock
              this.isLock = false
            }
        })
      },
      // checkoutlock
      cheLock(sutid, type) {
        Api.checkLock({
            sutid,
            action: 'add',
            checkoutlock: this.checkoutlock ? 'uncheckoutlock' : 'checkoutlock'
          }).then((res) => {
            if (res.success === true) {
              this.checkoutlock = res.data.checkoutlock
            }
        })
      },
      // modifypasswd
      modifyLock(sutid, type) {
        Api.checkLock({
            sutid,
            action: 'add',
            modifypasswd: this.modifypasswd ? 'unmodifypasswd' : 'modifypasswd'
          }).then((res) => {
            if (res.success === true) {
              this.modifypasswd = res.data.modifypasswd
              console.log(this.modifypasswd)
            }
        })
      },
      // 锁定修改密码（下拉）
      handleChangePW(modifypasswd, sutid) {
        Api.checkLock({
            sutid,
            action: 'add',
            modifypasswd
          }).then((res) => {
            if (res.success === true) {
              this.modifypasswd = res.data.modifypasswd
              this.isLock = false
            }
        })
      },
        // 远程搜索
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                Api.getMpoInput({name: query}).then((res) => {
                    this.list = res
                    this.loading = false;
                    this.yuanoptions = this.list.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 190);
                } else {
                this.yuanoptions = [];
            }
        },
          // sutName的update按钮
          nameUpdate(sutID) {
            Api.updateSn({sutID}).then((res) => {
              if (res.success === true) {
                      this.$message({
                          message: 'Update successful',
                          type: 'success',
                          offset: 350
                      });
                      this.MessAge.sutName = res.data
                 } else {
                      this.$message({
                          message: res.message,
                          type: 'error',
                          offset: 350
                      });
                  }
            })
          },
          // 锁定页面的编辑按钮
        lockEdit() {
          this.isLock = true
        },
        // 顶部卡片信息编辑
        handleEdit() {
          this.isEdit = true
          this.changeAge = this.MessAge
          this.changeAge.lablocation = this.MessAge.options[0]
          this.changeAge.lab = this.MessAge.options[1]
          this.changeAge.rack = this.MessAge.options[2]
          // this.changeAge.sutip = this.MessAge.ip
          // this.changeAge.codename = this.MessAge.codename
        },
        // 保存
        handleSave() {
          this.MessAge = this.changeAge
          Api.Addrelease({...this.MessAge, action: 'update'}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                }
          })
          this.isEdit = false
        },
        // fw表格编辑
        fwEdit(index, row, id) {
            this.idx = index
            this.fwFormVisible = true
            this.changeFw.Build = this.fwData[index].Build
            this.changeFw.Description = this.fwData[index].Description
            this.changeFw.Name = this.fwData[index].Name
            this.changeFw.SoftwareId = this.fwData[index].SoftwareId
            this.changeFw.Version = this.fwData[index].Version
        },
        // fw保存
        fwSave() {
            this.$set(this.tableData.data.FW, this.idx, this.changeFw)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.fwFormVisible = false
                }
          })
        },
        // cpu表格编辑
        cpuEdit(index, row, id) {
            this.idx = index
            this.cpuFormVisible = true
            this.changeCpu.Name = this.cpuData[index].Name
            this.changeCpu.MaxSpeedMHz = this.cpuData[index].MaxSpeedMHz
            this.changeCpu.ProcessorArchitecture = this.cpuData[index].ProcessorArchitecture
            this.changeCpu.Socket = this.cpuData[index].Socket
            this.changeCpu.TotalCores = this.cpuData[index].TotalCores
            this.changeCpu.TotalThreads = this.cpuData[index].TotalThreads
        },
        // cpu保存
        cpuSave() {
            this.$set(this.tableData.data.data[0].CPU, this.idx, this.changeCpu)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.cpuFormVisible = false
                }
          })
        },
        // mac表格编辑
        macEdit(index, row, id) {
            this.idx = index
            this.macFormVisible = true
            this.changeMac.AutoNeg = this.macData[index].AutoNeg
            this.changeMac.FQDN = this.macData[index].FQDN
            this.changeMac.Id = this.macData[index].Id
            this.changeMac.InterfaceEnabled = this.macData[index].InterfaceEnabled
            this.changeMac.MACAddress = this.macData[index].MACAddress
            this.changeMac.Name = this.macData[index].Name
            this.changeMac.PermanentMACAddress = this.macData[index].PermanentMACAddress
        },
        // mac保存
        macSave() {
            this.$set(this.tableData.data.data[0].MAC, this.idx, this.changeMac)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.macFormVisible = false
                }
          })
        },
        // memory表格编辑
        memoryEdit(index, row, id) {
            this.idx = index
            this.memoryFormVisible = true
            this.changeMemory.DeviceID = this.memoryData[index].DeviceID
            this.changeMemory.Manufacturer = this.memoryData[index].Manufacturer
            this.changeMemory.MemoryDeviceType = this.memoryData[index].MemoryDeviceType
            this.changeMemory.PartNumber = this.memoryData[index].PartNumber
            this.changeMemory.SerialNumber = this.memoryData[index].SerialNumber
            this.changeMemory.Size = this.memoryData[index].Size
            this.changeMemory.Speed = this.memoryData[index].Speed
        },
        // memory保存
        memorySave() {
            this.$set(this.tableData.data.data[0].Memory, this.idx, this.changeMemory)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.memoryFormVisible = false
                }
          })
        },
        // pci表格编辑
        pciEdit(index, row, id) {
            this.idx = index
            this.pciFormVisible = true
            this.changePci.Id = this.pciData[index].Id
            this.changePci.Manufacturer = this.pciData[index].Manufacturer
            this.changePci.Model = this.pciData[index].Model
            this.changePci.Name = this.pciData[index].Name
            this.changePci.PartNumber = this.pciData[index].PartNumber
            this.changePci.SKU = this.pciData[index].SKU
            this.changePci.SerialNumber = this.pciData[index].SerialNumber
        },
        // pci保存
        pciSave() {
            this.$set(this.tableData.data.data[0].PCI, this.idx, this.changePci)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.pciFormVisible = false
                }
          })
        },
        // psu表格编辑
        psuEdit(index, row, id) {
            this.idx = index
            this.psuFormVisible = true
            this.changePsu.Name = this.psuData[index].Name
            this.changePsu.Model = this.psuData[index].Model
            this.changePsu.Manufacturer = this.psuData[index].Manufacturer
            this.changePsu.FirmwareVersion = this.psuData[index].FirmwareVersion
            this.changePsu.LineInputVoltage = this.psuData[index].LineInputVoltage
            this.changePsu.PartNumber = this.psuData[index].PartNumber
            this.changePsu.SerialNumber = this.psuData[index].SerialNumber
        },
        // psu保存
        psuSave() {
            this.$set(this.tableData.data.data[0].PSU, this.idx, this.changePsu)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.psuFormVisible = false
                }
          })
        },
        // storage表格编辑
        storageEdit(index, row, id) {
            this.idx = index
            this.storageFormVisible = true
            this.changeStorage.Id = this.storageData[index].Id
            this.changeStorage.Name = this.storageData[index].Name
            this.changeStorage.PartNumber = this.storageData[index].PartNumber
            this.changeStorage.SKU = this.storageData[index].SKU
            this.changeStorage.SerialNumber = this.storageData[index].SerialNumber
        },
        // storage保存
        storageSave() {
            this.$set(this.tableData.data.data[0].Storage, this.idx, this.changeStorage)
            Api.editDetails({data: {...this.tableData.data}, id: parseInt(this.$route.query.id)}).then((res) => {
                if (res.success === true) {
                  this.getrelease(this.$route.query.id)
                  this.storageFormVisible = false
                }
          })
        },
        // over
        goBack() {
          this.$router.go(-1)
        },
        GOLoaned(type) {
          this.$router.push({path: '/CreateBorrowed', query: {id: this.$route.query.id, type}})
        },
        GOCheck(type) {
          this.$router.push({path: '/CreateCheckout', query: {id: this.$route.query.id, type}})
        },
      // 点击update页面数据更新
      handleUpdate() {
        // 点击按钮等待时出现页面加载效果
        this.loading = true
        Api.redfishDetail({id: parseInt(this.$route.query.id)}).then((res) => {
          if (res.success === 1) {
                  this.loading = false
                  this.$message({
                      message: 'Update successful',
                      type: 'success',
                      offset: 350
                  });
                  this.fwData = res.data.FW
                  this.cpuData = res.data.data[0].CPU
                  this.macData = res.data.data[0].MAC
                  this.memoryData = res.data.data[0].Memory
                  this.pciData = res.data.data[0].PCI
                  this.psuData = res.data.data[0].PSU
                  this.storageData = res.data.data[0].Storage
                  this.getrelease(this.$route.query.id)
              } else {
                  this.$message({
                      message: res.message,
                      type: 'error',
                      offset: 350
                  });
              }
        })
      },
      handleChange() {
            Api.getSelected().then((res) => {
                if (res.success === true) {
                    this.options = res.data
                }
            })
        }
    }
}
</script>
<style>
  .mianban .el-collapse-item__header{
    height: 33px!important;
    font-size: 16px!important;
    margin-top: 6px!important;
  }
  .el-page-header__content{
    width: 100%!important;
  }
  .el-tabs__nav {
    width: 130px!important;
    height: 120px!important;
    background-color: #ffffff!important;
    box-shadow: 0px 1px 2px 2px #eee!important;
    text-align: left!important
  }
  .el-tabs__item{
    text-align: left!important
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .lonbox .el-input__clear{
    margin-top: 10px!important
  }
</style>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        user-select: text!important;
    }
    .DetailsBack .el-page-header__left{
      display: block !important;
      line-height: 40px !important;
    }
    /* .mianban .el-collapse-item__header{
      height: 35px!important;
    } */
    .topbox {
      width: 92%;
      margin: auto;
      // color: #909399;
      display: flex;
      flex-flow:row wrap;
    }
    // .topbox .el-input__inner{
    //   margin-top: 4px
    // }
    // body .el-tabs--left .el-tabs__item.is-left {
    //   width: 130px!important;
    //   height: 300px!important;
    //   background-color: #ffffff!important;
    //   box-shadow: 0px 1px 2px 2px #eee!important;
    //   text-align: left
    // }
    .lonbox {
      margin-top: 6px
    }
    .topbox>div {
      width:50%;
      height: 40px;
    }
    .block {
      margin-left: 8px
    }
    .you {
      width: 100px;
      font-weight: 600;
      display: inline-block;
      // text-align: right
    }
    .zuo {
      height: 20px;
      text-align: left;
      display: inline-block;
      // margin-left: 20px;
    }
    .sutzuo {
      margin-bottom:10px;
      // margin-left: 20px;
      width: 69%
    }
    .sutword {
      width: 97%
    }
    .littlezuo {
      margin-left: 4px
    }
    .hide {
      width:145px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .word {
      font-size: normal
    }
</style>
