/*
 * @Author: your name
 * @Date: 2020-10-20 18:41:08
 * @LastEditTime: 2021-01-09 09:58:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\UserSidebar\scer.js
 */
import i18n from '../../language/index'
export default [
    { // 让默认页先变成sut页面
        icon: 'icon-home',
        name: i18n.t('Lang.module.Sidebr.Search')
    },
    {
        icon: 'icon-richeng',
        name: 'plugin',
        title: i18n.t('Lang.module.Sidebr.Support'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.Admin_All_Requests')
            },
            {
                name: i18n.t('Lang.module.Sidebr.My_Tasks')
            },
            {
                name: i18n.t('Lang.module.Sidebr.Admin_All_Borrowed')
            },
            {
                name: i18n.t('Lang.module.Sidebr.Admin_All_Check_out')
            }
        ]
    },
    {
        icon: 'icon-wenzhang_huaban',
        name: 'Reservation',
        title: i18n.t('Lang.module.Sidebr.Reservation'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.My_Reservation')
            }
        ]
    }, // 判断体验者是 admin还是user JSON.parse(window.localStorage.getItem('id')) === 'haogd1' ?
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
    }
]
