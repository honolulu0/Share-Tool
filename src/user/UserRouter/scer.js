/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:49:55
 * @LastEditTime: 2021-01-09 09:57:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\user\UserRouter\scer.js
 */
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
                    path: '/AllReuests',
                    name: i18n.t('Lang.module.Sidebr.Admin_All_Requests'),
                    component: resolve => require(['../../views/Support/AdminAllRequests.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.Admin_All_Requests')}
                },
                {
                    path: '/MyTasks',
                    name: i18n.t('Lang.module.Sidebr.My_Tasks'),
                    component: resolve => require(['../../views/Support/AdminMyTasks.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.My_Tasks')}
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
                    path: '/ShareEverything',
                    name: i18n.t('Lang.module.Sidebr.ShareEverything'),
                    component: resolve => require(['../../views/Share Everything.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.ShareEverything')}
                },
                { // data下Details机台详情
                    path: '/Details',
                    name: i18n.t('Lang.module.Sidebr.Details'),
                    component: resolve => require(['../../views/Management/Details.vue'], resolve),
                    meta: {title: i18n.t('Lang.module.Sidebr.Details')}
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
