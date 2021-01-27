import i18n from '../../language/index'
i18n.locale = localStorage.Language !== undefined ? JSON.parse(localStorage.Language) : 'en'
export default [
    {
        path: '/',
        redirect: 'Search'
    },
    {
        path: '/',
        name: 'news',
        component: resolve => require(['../../components/TheHome.vue'], resolve),
    children: [
        {
            path: '/CreateNews',
            name: i18n.t('Lang.module.Sidebr.Create_News'),
            component: resolve => require(['../../views/CMS/CreateNews.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Create_News')}
        },
        {
            path: '/Articles',
            name: i18n.t('Lang.module.Sidebr.Article'),
            component: resolve => require(['../../views/CMS/Articles.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Article')}
        },
        {
            path: '/AllNews',
            name: i18n.t('Lang.module.Sidebr.All_News'),
            component: resolve => require(['../../views/CMS/AllNews.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.All_News')}
        },
        {
            path: '/AmendNews',
            name: i18n.t('Lang.module.Sidebr.AmendNew'),
            component: resolve => require(['../../views/CMS/AmendNews.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.AmendNew')}
        },
        {
            path: '/SupportRequest',
            name: i18n.t('Lang.module.Sidebr.New_Request'),
            component: resolve => require(['../../views/Support/request.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.New_Request')}
        },
        {
            path: '/CreateBorrowed',
            alias: '/CreateCheckout',
            name: i18n.t('Lang.module.Sidebr.CreateBorrowed'),
            component: resolve => require(['../../views/Support/CreateLoanedAndCheck.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.CreateBorrowed')}
        },
        {
            path: '/MyRequests',
            name: i18n.t('Lang.module.Sidebr.My_Requests'),
            component: resolve => require(['../../views/Support/MyRequests.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.My_Requests')}
        },
        {
            path: '/MyBorrowed',
            name: i18n.t('Lang.module.Sidebr.My_Borrowed'),
            component: resolve => require(['../../views/Support/MyBorrowed.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.My_Borrowed')}
        },
        {
            path: '/MyCheckout',
            name: i18n.t('Lang.module.Sidebr.My_Check_out'),
            component: resolve => require(['../../views/Support/MyCheckout.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.My_Check_out')}
        },
        {
            path: '/MainPollingOwner',
            name: i18n.t('Lang.module.Sidebr.MainPollingOwner'),
            component: resolve => require(['../../views/Support/MainPollingOwner.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.MainPollingOwner')}
        },
        {
            path: '/AdminMyBorrowed',
            name: i18n.t('Lang.module.Sidebr.Admin_All_Borrowed'),
            component: resolve => require(['../../views/Management/AdminBorrowed.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Borrowed')}
        },
        {
            path: '/AdminCheckout',
            name: i18n.t('Lang.module.Sidebr.Admin_All_Check_out'),
            component: resolve => require(['../../views/Management/AdminCheckout.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Check_out')}
        },
        // Admin维护
        {
            path: '/Project',
            name: i18n.t('Lang.module.Sidebr.Project'),
            component: resolve => require(['../../views/Management/Project.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Project')}
        },
        {
            path: '/AllParts',
            name: i18n.t('Lang.module.Sidebr.AllParts'),
            component: resolve => require(['../../views/Management/AllParts.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.AllParts')}
        },
        {
            path: '/AssignEngineer',
            name: i18n.t('Lang.module.Sidebr.Admin_Assign_Engineer'),
            component: resolve => require(['../../views/Support/AdminAssignEngineer.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_Assign_Engineer')}
        },
        {// i18n.locale === 'zh' ? i18n.messages.zh.Lang.module.Sidebr.Search : i18n.locale === 'en' ? i18n.messages.en.Lang.module.Sidebr.Search : i18n.messages.en.Lang.module.Sidebr.Search
            path: '/Search',
            name: i18n.t('Lang.module.Sidebr.Search'),
            component: resolve => require(['../../views/sut/Sut.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Search')}
        },
        {
            path: '/MyReservation',
            name: i18n.t('Lang.module.Sidebr.My_Reservation'),
            component: resolve => require(['../../views/sut/MyReservation.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.My_Reservation')}
        },
        {
            path: '/Mylogfile',
            name: i18n.t('Lang.module.Sidebr.My_Logfile'),
            component: resolve => require(['../../views/sut/mylogfile.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.My_Logfile')}
        },
        {
            path: '/CreateReservation',
            name: i18n.t('Lang.module.Sidebr.CreateReservation'),
            component: resolve => require(['../../views/sut/CreateReservation.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.CreateReservation')}
        },
        { // Management统计版下的shareRatio
            path: '/ShareRatio',
            name: i18n.t('Lang.module.Sidebr.ShareRatio'),
            component: resolve => require(['../../views/Management/ShareRatio.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.ShareRatio')}
        },
        { // dashobard统计版下的dashboard
            path: '/dashboard',
            name: i18n.t('Lang.module.Sidebr.dashboard'),
            component: resolve => require(['../../views/Dashboard/dashboard.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.dashboard')}
        },
        { // data下lab
            path: '/Lab',
            name: i18n.t('Lang.module.Sidebr.Lab'),
            component: resolve => require(['../../views/Management/Lab.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Lab')}
        },
        { // data下hardware
            path: '/Hardware',
            name: i18n.t('Lang.module.Sidebr.All_Hardware'),
            component: resolve => require(['../../views/Management/All Hardware.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.All_Hardware')}
        },
        { // data下Details机台详情
            path: '/Details',
            name: i18n.t('Lang.module.Sidebr.Details'),
            component: resolve => require(['../../views/Management/Details.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Details')}
        },
        { // data下AddPage添加机台新页面
            path: '/AddPage',
            name: i18n.t('Lang.module.Sidebr.AddPage'),
            component: resolve => require(['../../views/Management/AddPage.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.AddPage')}
        },
        // data下绑定ip添加新页面
        // {
        //     path: '/Binding',
        //     name: i18n.t('Lang.module.Sidebr.Binding'),
        //     component: resolve => require(['../../views/Management/Binding.vue'], resolve),
        //     meta: {title: i18n.t('Lang.module.Sidebr.Binding')}
        // },
        { // data下AddPage添加机台新页面
            path: '/Milestone',
            name: i18n.t('Lang.module.Sidebr.Milestone'),
            component: resolve => require(['../../views/Management/Milestone.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Milestone')}
        },
        { // data下AddPage添加机台新页面
            path: '/partsDetail',
            name: i18n.t('Lang.module.Sidebr.partsDetail'),
            component: resolve => require(['../../views/Management/partsDetail.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.partsDetail')}
        },
        { // data下Software
            path: '/Software',
            name: i18n.t('Lang.module.Sidebr.Soft_Ware'),
            component: resolve => require(['../../views/Management/Software.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Soft_Ware')}
        },
        { // data下Service
            path: '/Service',
            name: i18n.t('Lang.module.Sidebr.Service'),
            component: resolve => require(['../../views/Management/Service.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Service')}
        },
        { // 管理员所有工单
            path: '/AdminAllRequests',
            name: i18n.t('Lang.module.Sidebr.Admin_All_Requests'),
            component: resolve => require(['../../views/Support/AdminAllRequests.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Requests')}
        },
        // { // 管理员添加机器，添加预定
        //     path: '/AdminSearch',
        //     name: i18n.t('Lang.module.Sidebr.Admin_Search'),
        //     component: resolve => require(['../../views/Management/AdminSut.vue'], resolve),
        //     meta: {title: i18n.t('Lang.module.Sidebr.Admin_Search')}
        // },
        { // 管理员所有预定
            path: '/AdminAllReservations',
            name: i18n.t('Lang.module.Sidebr.Admin_All_Reservations'),
            component: resolve => require(['../../views/Management/AdminAllReservations.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Reservations')}
        },
        { // 用户埋点信息
            path: '/DataAnalysis',
            name: i18n.t('Lang.module.Sidebr.Data_Analysis'),
            component: resolve => require(['../../views/Management/DataAnalysis.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Data_Analysis')}
        },
        { // logFile 信息
            path: '/LogFile',
            name: i18n.t('Lang.module.Sidebr.Log_File'),
            component: resolve => require(['../../views/Management/LogFile.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Log_File')}
        },
        {
            path: '/ShareEverything',
            name: i18n.t('Lang.module.Sidebr.ShareEverything'),
            component: resolve => require(['../../views/Share Everything.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.ShareEverything')}
        },
        {
            path: '/AdminShareEverything',
            name: i18n.t('Lang.module.Sidebr.Admin_All_Share_Everything'),
            component: resolve => require(['../../views/Management/Admin All ShareEverything.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Share_Everything')}
        },
        {
            path: '/Sites', // 模式切换
            name: i18n.t('Lang.module.Sidebr.Admin_Sites'),
            component: resolve => require(['../../views/SetEnginner/Sites.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_Sites')}
        },
        {
            path: '/City', // 模式切换
            name: i18n.t('Lang.module.Sidebr.Admin_City'),
            component: resolve => require(['../../views/SetEnginner/location.vue'], resolve),
            meta: {title: i18n.t('Lang.module.Sidebr.Admin_City')}
        }
    ]
    },
    {
        path: '*',
        component: resolve => require(['../../views/404.vue'], resolve)
    },
    {
        path: '/login',
        component: resolve => require(['../../views/Login.vue'], resolve)
    }
]
