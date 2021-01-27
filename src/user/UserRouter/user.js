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
                path: '/Articles',
                name: i18n.t('Lang.module.Sidebr.Articles'),
                component: resolve => require(['../../views/CMS/Articles.vue'], resolve),
                meta: {title: i18n.t('Lang.module.Sidebr.Articles')}
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
              {
                path: '/ShareEverything',
                name: i18n.t('Lang.module.Sidebr.ShareEverything'),
                component: resolve => require(['../../views/Share Everything.vue'], resolve),
                meta: {title: i18n.t('Lang.module.Sidebr.ShareEverything')}
              },
              {
                path: '/MyParts',
                name: i18n.t('Lang.module.Sidebr.My_Parts'),
                component: resolve => require(['../../views/Support/MyParts.vue'], resolve),
                meta: {title: i18n.t('Lang.module.Sidebr.My_Parts')}
              },
              {
                path: '/partsDetail',
                name: i18n.t('Lang.module.Sidebr.partsDetail'),
                component: resolve => require(['../../views/Management/partsDetail.vue'], resolve),
                meta: {title: i18n.t('Lang.module.Sidebr.partsDetail')}
            },
              {
                path: '/Details',
                name: i18n.t('Lang.module.Sidebr.Details'),
                component: resolve => require(['../../views/Management/Details.vue'], resolve),
                meta: {title: i18n.t('Lang.module.Sidebr.Details')}
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
