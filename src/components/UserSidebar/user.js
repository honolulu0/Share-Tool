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
                name: i18n.t('Lang.module.Sidebr.My_Parts')
            },
            {
                name: i18n.t('Lang.module.Sidebr.MainPollingOwner')
            }
        ]
    }
]
