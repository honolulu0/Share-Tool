import {DELETE, get, post, PUT} from '../axios/http.js'
import GLOBAL from '../common/global.js'
// 实时请求数据
export const GetHit = (data) => post(`${GLOBAL.HOME}/stream/ch/remindmessage`, data)
export const GetHitPage = (data) => post(`${GLOBAL.HOME}/lend/bulk_message/`, data)
// 消息已阅读
export const ReadMesg = (data) => post(`${GLOBAL.HOME}/lend/remindmessage/`, data)
// login 的CMS用户文章
export const GetUserCMS = (params) => get(`${GLOBAL.HOME}/cms/view`, params)
// 小龙的数据交互
// 提交工单页 1.获取localion 2.点击提交工单
export const getlocalion = () => get(`${GLOBAL.HOME}/ticket/apply/`)
export const SubmitWork = (data) => post(`${GLOBAL.HOME}/ticket/apply/`, data)
// 签核页面 1.获取对应的数据 2点的对应的数据查看详情 3.是否签订通过 不通过 通过的 4.获取所在地所有的接单工程师 5. 修改接单的工程师
export const AssginList = (params) => get(`${GLOBAL.HOME}/ticket/check/`, params)

export const DetailLook = (data) => post(`${GLOBAL.HOME}/ticket/check/`, data)

export const Rollback = (data) => post(`${GLOBAL.HOME}/ticket/check/`, data)

export const Passes = (data) => post(`${GLOBAL.HOME}/ticket/check/`, data)

export const getEngineer = (params) => get(`${GLOBAL.HOME}/ticket/user/`, params)

export const ChangeEngineer = (data) => post(`${GLOBAL.HOME}/ticket/check/`, data)
// 完成工单的页面 1.点击查看详情2.获取对应的留言信息3.点击添加一条对应的留言信息
export const OperList = (params) => get(`${GLOBAL.HOME}/ticket/operator/`, params)
export const OperDetials = (data) => post(`${GLOBAL.HOME}/ticket/operator/`, data)
export const getDiscuss = (params) => get(`${GLOBAL.HOME}/ticket/operator/`, params)
export const AddDiscuss = (data) => post(`${GLOBAL.HOME}/ticket/operator/`, data)
export const OperPass = (data) => post(`${GLOBAL.HOME}/ticket/operator/`, data)
// RequestList页的请求 1.工单列表页 2.工单的时间轴 3.工单的详情
export const RequestList = (params) => get(`${GLOBAL.HOME}/ticket/list/`, params)
// 获取 MyGetMyRequest list
export const GetMyRequest = (params) => get(`${GLOBAL.HOME}/ticket/my_list/`, params)
// 交流
export const getDiscussList = (data) => post(`${GLOBAL.HOME}/ticket/my_list/`, data)
export const AddDiscussList = (data) => post(`${GLOBAL.HOME}/ticket/my_list/`, data)
// My request 评分
export const AddNps = (data) => post(`${GLOBAL.HOME}/ticket/nps/`, data)
export const getNps = (params) => get(`${GLOBAL.HOME}/ticket/nps/`, params)

export const RequestTimeLine = (params) => get(`${GLOBAL.HOME}/ticket/list/`, params)
export const RequestDatils = (params) => get(`${GLOBAL.HOME}/ticket/list/`, params)
// MyRequestList 我的工单页面
// 进前的数据交互
// 查询mpo锁定期
export const GetMpolock = () => get(`${GLOBAL.HOME}/lend/changempo/`)
// 批量预定
export const BulkBooking = (data) => post(`${GLOBAL.HOME}/lend/bulkbooking/`, data)
// 预定机器预定列表 修改、删除
export const getReserList = (params) => get(`${GLOBAL.HOME}/p/sutbook`, params)
// 获取commit信息
export const getCommitBook = (data) => post(`${GLOBAL.HOME}/p/commitbooks`, data)
// 添加一条commit 信息
export const AddCommits = (data) => post(`${GLOBAL.HOME}/p/commitbook`, data)
// 修改列表的时间信息
export const ChangeTimeUsage = (data) => post(`${GLOBAL.HOME}/p/sutbook`, data)
// 删除列表信息功能请求
export const DeleteReser = (data) => post(`${GLOBAL.HOME}/p/sutbook`, data)
// create机器页面获取到OS列表个VM列表
export const getOSVM = () => get(`${GLOBAL.HOME}/p/storageos`)
// sut 预定展示界面 sut 日期
export const getShowSut = (params) => get(`${GLOBAL.HOME}/p/suts`, params)
export const SearchSut = (params) => get(`${GLOBAL.HOME}/p/suts`, params)
// add 创建一个服务器机器 修改一台对应的机器 删除一条机器
export const Addrelease = (data) => post(`${GLOBAL.HOME}/p/suts`, data) // 可以是添加一台机器，也可以是修改

export const Changerelease = (params) => get(`${GLOBAL.HOME}/p/sut`, params) // 获取对应信息的接口在sut页面用到，在创建我的预定也用到了

// 创建我的预定信息
export const CreateRelease = (data) => post(`${GLOBAL.HOME}/p/sutbook`, data)
// log 下载
export const DownLog = (data) => post(`${GLOBAL.HOME}/machinelog/apply/`, data)

// OS VM 添加
export const AddOS = (data) => post(`${GLOBAL.HOME}/p/statisticos`, data)

// 后台管理埋点信息
export const getBaseAll = (params) => get(`${GLOBAL.HOME}/p/searchlist`, params)
// sut页面 搜索埋点
export const PostSearch = (data) => post(`${GLOBAL.HOME}/p/searchlist`, data)

// CMS 文章管理信息
export const CreateCms = (data) => post(`${GLOBAL.HOME}/cms/commit/`, data)
// 获取对应id的 和所有的
export const getItemCms = (params) => get(`${GLOBAL.HOME}/cms/commit/`, params)
// 获取dashboard数据
export const getCommitDash = (params) => get(`${GLOBAL.HOME}/dashboard/commit/`, params)
// 添加dashboard部门信息
export const addCommitDash = (data) => post(`${GLOBAL.HOME}/dashboard/commit/`, data)
// Edit 文章信息
export const EditCms = (data) => post(`${GLOBAL.HOME}/cms/update/`, data)
// 机台配置信息
export const getConfiguration = (params) => get(`${GLOBAL.HOME}/p/fw/node`, params)
// 点击更新机台配置信息
export const updateConfig = (data) => post(`${GLOBAL.HOME}/p/fw/node`, data)
// 配置页面点击添加机台
export const addConfig = (data) => post(`${GLOBAL.HOME}/p/fw/nodeManage`, data)
// Share Everything 的滚动信息
export const getEveryList = () => get(`${GLOBAL.HOME}/share/commit/`)

// Share Everything 的发送请求
export const PostEvery = (data) => post(`${GLOBAL.HOME}/share/add/`, data)
// 获取所有的Share Everything列表
export const GetEveryList = (params) => get(`${GLOBAL.HOME}/share/add`, params)

// MylogFile 的所有数据
export const GetLogFile = (params) => get(`${GLOBAL.HOME}/machinelog/check_log/`, params)
// 获取All Hardware页面勾选框传参
export const getCheckHidden = (params) => get(`${GLOBAL.HOME}/machinelog/hidden/`, params)
// All Hardware点击隐藏状态发送给后台
export const checkHidden = (data) => post(`${GLOBAL.HOME}/machinelog/hidden/`, data)
// Details配置详情页编辑发送后台
export const editDetails = (data) => post(`${GLOBAL.HOME}/p/fw/hwManageNode`, data)
// site/lab/rack联级选项框
export const getSelected = (params) => get(`${GLOBAL.HOME}/p/fw/site`, params)
// mpo/owner联级选项框
export const getMpoSel = (params) => get(`${GLOBAL.HOME}/lend/pmo/`, params)
// 获取mainPollingOwner页面
export const getMPOList = (params) => get(`${GLOBAL.HOME}/lend/pmomessage/`, params)
// 详情页面的锁定
export const checkLock = (data) => post(`${GLOBAL.HOME}/lend/pmomessage/`, data)
// 详情页面点击更新sutName
export const updateSn = (params) => get(`${GLOBAL.HOME}/p/fw/spliceSutName`, params)
// 添加机台进LXCA
export const addForce = (data) => post(`${GLOBAL.HOME}/p/fw/nodeManage`, data)
// 查询LXCA添加进程
export const checkForce = (params) => get(`${GLOBAL.HOME}/p/fw/nodeManage`, params)
// 释放LXCA机台
export const delForce = (data) => DELETE(`${GLOBAL.HOME}/p/fw/nodeManage`, data)
// AllHardware更新所有当前Online机台配置信息
export const updateOnline = (params) => get(`${GLOBAL.HOME}/p/fw/updateAllSutInfo`, params)
// 管理员获取权限列表
export const getRole = (params) => get(`${GLOBAL.HOME}/p/admin/update/`, params)
// 管理员编辑修改权限列表
export const editRole = (data) => post(`${GLOBAL.HOME}/p/admin/update/`, data)
// 管理员add新增权限列表
export const addRole = (data) => post(`${GLOBAL.HOME}/p/admin/add/`, data)
// 创建借出的接口 // 通过和不通过
export const CreateBorrwed = (data) => post(`${GLOBAL.HOME}/lend/apply/`, data)
// 获取我的借出的列表
export const GetBorrwedList = (params) => get(`${GLOBAL.HOME}/lend/apply/`, params)
// 获取借出的历史记录
export const GetBorrTime = (params) => get(`${GLOBAL.HOME}/lend/machineflow/`, params)

// 创建出库的接口 // 通过和不通过
export const CreateCheckOut = (data) => post(`${GLOBAL.HOME}/lend/check_out/`, data)
// 获取我出库的列表
export const GetCheckList = (params) => get(`${GLOBAL.HOME}/lend/check_out/`, params)
 // 获取出库的的历史记录
export const GetCheckTime = (params) => get(`${GLOBAL.HOME}/lend/warehouseflow/`, params)
// MPO
export const getMpoInput = (params) => get(`${GLOBAL.HOME}/p/fw/searchName`, params)
// 获取Admin维护项目信息
export const getPro = (params) => get(`${GLOBAL.HOME}/p/release/info`, params)
// Admin添加项目信息
export const addBase = (data) => post(`${GLOBAL.HOME}/p/release/info`, data)

// 查询批量添加到lxca机器的状态
export const Requery = (params) => get(`${GLOBAL.HOME}/p/fw/updateImportStatus`, params)
// Admin编辑项目信息
export const editBase = (data) => PUT(`${GLOBAL.HOME}/p/release/info`, data)
// Admin删除项目信息
export const deleteBase = (data) => DELETE(`${GLOBAL.HOME}/p/release/info`, data)
// 删除项目配置或时间节点
export const deleteLine = (data) => DELETE(`${GLOBAL.HOME}/p/release/delRelevantInfo`, data)

// 分配工程师导出excel表格
export const Assg2excel = (data) => post(`${GLOBAL.HOME}/ticket/export/`, data)

// 创建Site
export const AddSite = (data) => post(`${GLOBAL.HOME}/ticket/site/`, data)
// 获取所有的数据
export const GetData = () => get(`${GLOBAL.HOME}/ticket/site/`)
// 创建Lab
export const AddLab = (data) => post(`${GLOBAL.HOME}/ticket/lab/`, data)
// 获取所有实验室
export const GetLabData = (params) => get(`${GLOBAL.HOME}/ticket/lab/`, params)
// 获取allparts所有配件
export const getParts = (params) => get(`${GLOBAL.HOME}/p/parts/productRecord`, params)
// allparts编辑保存信息
export const editParts = (data) => PUT(`${GLOBAL.HOME}/p/parts/productRecord`, data)
// allparts添加一条信息
export const addParts = (data) => post(`${GLOBAL.HOME}/p/parts/productRecord`, data)
// 删除allparts基本信息
export const deleteParts = (data) => DELETE(`${GLOBAL.HOME}/p/parts/productRecord`, data)
// 获取parts详情信息
export const partsDetail = (params) => get(`${GLOBAL.HOME}/p/parts/partsDetail`, params)
// site页面导出
export const export2User = (data) => post(`${GLOBAL.HOME}/user/export/`, data)
// redfish抓取机台配置信息
export const redfishDetail = (data) => post(`${GLOBAL.HOME}/p/inventory/detail`, data)
// dashboard
export const getDaysData = (params) => get(`${GLOBAL.HOME}/sut_api/daysData`, params)
// 搜索埋点导出
export const GetSearchImport = (params) => get(`${GLOBAL.HOME}/sut_api/exportSearchData`, params)
// 绑定ip流程接口
export const manageIP = (data) => post(`${GLOBAL.HOME}/p/manage_ip/manageIP`, data)
