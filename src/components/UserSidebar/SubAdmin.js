/*
 * @Author: Guodong Hao
 * @Date: 2020-10-20 18:41:12
 * @LastEditTime: 2021-01-11 11:03:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\UserSidebar\SubAdmin.js
 */
import i18n from '../../language/index'
export default [
    { // 让默认页先变成sut页面
        icon: 'icon-home',
        name: i18n.t('Lang.module.Sidebr.Search')
    },
    {
        icon: 'icon-kefu',
        name: 'plugin',
        title: i18n.t('Lang.module.Sidebr.Support'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.New_Request')
            },
            {
                name: i18n.t('Lang.module.Sidebr.My_Requests')
            },
            {
                name: i18n.t('Lang.module.Sidebr.My_Borrowed')
            },
            {
                name: i18n.t('Lang.module.Sidebr.My_Check_out')
            }
        ]
    },
    {
        icon: 'icon-richeng',
        title: i18n.t('Lang.module.Sidebr.Reservation'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.My_Reservation')
            },
            {
                name: i18n.t('Lang.module.Sidebr.My_Logfile')
            }
        ]
    },
    {
        icon: 'icon-wenzhang_huaban',
        name: 'news',
        title: i18n.t('Lang.module.Sidebr.CMS'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.Create_News')
            },
            {
                name: i18n.t('Lang.module.Sidebr.All_News')
            }
        ]
    },
    {
        icon: 'icon-cengji',
        name: 'Management',
        title: i18n.t('Lang.module.Sidebr.Management'),
        subs: [
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Admin_All_Requests')
            },
            {
                name: i18n.t('Lang.module.Sidebr.Admin_All_Borrowed')
            },
            {
                name: i18n.t('Lang.module.Sidebr.Admin_All_Check_out')
            },
            {
                name: i18n.t('Lang.module.Sidebr.Admin_Assign_Engineer')
            },
            // {
            //     icon: 'icon-jingzi',
            //     name: i18n.t('Lang.module.Sidebr.Admin_Search')
            // },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Admin_All_Reservations')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Admin_Sites')
            }
        ]
    }
]
