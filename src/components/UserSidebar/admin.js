import i18n from '../../language/index'
export default [
    { // 让默认页先变成sut页面
        icon: 'icon-tubiaolunkuo-',
        name: i18n.t('Lang.module.Sidebr.Search')
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
            },
            {
                name: i18n.t('Lang.module.Sidebr.MainPollingOwner')
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
                name: 'Data',
                title: i18n.t('Lang.module.Sidebr.Data'),
                subs: [
                    {
                        name: i18n.t('Lang.module.Sidebr.Lab')
                    },
                    {
                        name: i18n.t('Lang.module.Sidebr.All_Hardware')
                    },
                    {
                        name: i18n.t('Lang.module.Sidebr.Soft_Ware')
                    },
                    {
                        name: i18n.t('Lang.module.Sidebr.Service')
                    },
                    {
                        name: i18n.t('Lang.module.Sidebr.ShareRatio')
                    }
                ]
            },
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
                name: i18n.t('Lang.module.Sidebr.Data_Analysis')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Log_File')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Project')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.AllParts')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Admin_All_Share_Everything')
            },
            {
                icon: 'icon-jingzi',
                name: i18n.t('Lang.module.Sidebr.Admin_Sites')
            }
        ]
    },
    {
        icon: 'icon-tongji',
        name: 'Dashboard',
        title: i18n.t('Lang.module.Sidebr.Dashboard'),
        subs: [
            {
                name: i18n.t('Lang.module.Sidebr.dashboard')
            }
        ]
    }
]
