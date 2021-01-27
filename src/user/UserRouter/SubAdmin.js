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
                    name: i18n.t('Lang.module.Sidebr.Articles'),
                    component: resolve => require(['../../views/CMS/Articles.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.Articles')}
                },
                {
                    path: '/AllNews',
                    name: i18n.t('Lang.module.Sidebr.All_News'),
                    component: resolve => require(['../../views/CMS/AllNews.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.All_News')}
                },
                {
                    path: '/SupportRequest',
                    name: i18n.t('Lang.module.Sidebr.New_Request'),
                    component: resolve => require(['../../views/Support/request.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.New_Request')}
                },
                {
                    path: '/MyRequests',
                    name: i18n.t('Lang.module.Sidebr.My_Requests'),
                    component: resolve => require(['../../views/Support/MyRequests.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.My_Requests')}
                },
                {
                    path: '/AssignEngineer',
                    name: i18n.t('Lang.module.Sidebr.Admin_Assign_Engineer'),
                    component: resolve => require(['../../views/Support/AdminAssignEngineer.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.Admin_Assign_Engineer')}
                },
                {
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
                    path: '/CreateReservation',
                    name: i18n.t('Lang.module.Sidebr.CreateReservation'),
                    component: resolve => require(['../../views/sut/CreateReservation.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.CreateReservation')}
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
                { // data下Details机台详情
                    path: '/Details',
                    name: i18n.t('Lang.module.Sidebr.Details'),
                    component: resolve => require(['../../views/Management/Details.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.Details')}
                },
                {
                    path: '/Mylogfile',
                    name: i18n.t('Lang.module.Sidebr.My_Logfile'),
                    component: resolve => require(['../../views/sut/mylogfile.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.My_Logfile')}
                },
                {
                    path: '/CreateBorrowed',
                    alias: '/CreateCheckout',
                    name: i18n.t('Lang.module.Sidebr.CreateBorrowed'),
                    component: resolve => require(['../../views/Support/CreateLoanedAndCheck.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.CreateBorrowed')}
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
