/*
 * @Author: Guodong Hao
 * @Date: 2020-12-02 14:44:55
 * @LastEditTime: 2021-01-20 17:16:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Share Tool\src\components\publicJS\Sut.js
 */
import * as Api from '@/api/api'
const pastDate = (date, year, month) => {
    let NotDate = []
     date.forEach((item, index) => {
         let tmp = []
         let borr = []
         let Check = {}
         if (item.book_list) {
             item.book_list.forEach((Bitem, bIndex) => {
                 if (Bitem.enddatetimeStr !== '') {
                     let startDate = new Date(Bitem.startdatetimeStr)
                     let endDate = new Date(Bitem.enddatetimeStr)
                     let during = parseInt((endDate - startDate) / 3600000 / 24)
                     let current = startDate
                     let dateList = []
                     for (let i = 0; i <= during; i++) {
                         if (Number(year) === Number(current.getMonth() + 1) && Number(month) === Number(current.getFullYear())) {
                             dateList.push(Number(current.getDate()), Bitem.itcode, Bitem.display_name)
                         }
                         current.setDate(startDate.getDate() + 1)
                     }
                     dateList.forEach((item, index) => {
                         tmp.push(item)
                     })
                 }
             })
         }
         if (item.leadmachine_list) {
             item.leadmachine_list.forEach((Bitem, bIndex) => {
                 if (Bitem.enddatetimeStr !== '') {
                     let startDate = new Date(Bitem.leadtime)
                     if (startDate <= new Date()) {
                         let nowDate = new Date()
                         startDate.setDate(nowDate.getDate())
                     }
                     let endDate = new Date(Bitem.reverttime)
                     let during = parseInt((endDate - startDate) / 3600000 / 24)
                     let current = startDate
                     let dateList = []
                     for (let i = 0; i <= during; i++) {
                         if (Number(year) === Number(current.getMonth() + 1) && Number(month) === Number(current.getFullYear())) {
                             dateList.push(Number(current.getDate()), Bitem.leadname, Bitem.display_name)
                         }
                         current.setDate(startDate.getDate() + 1)
                     }
                     dateList.forEach((item, index) => {
                         borr.push(item)
                     })
                 }
             })
         }
         item.check_out_list.length !== 0 ? Check = item.check_out_list[0] : Check = {leadname: '', leadtime: '', display_name: ''}
         NotDate.push({ID: item.ID, reserveList: tmp, borrList: borr, CheckList: Check})
     })
     return NotDate
 }
const getLastDay = (year, month) => {
    // let NewYear = year;// 取当前的年份
    // let NewMonth = month++;// 取下一个月的第一天，方便计算（最后一天不固定）
    // if (month > 12) {
    //     NewMonth -= 12;// 月份减
    //     NewYear++;// 年份增
    // }
    // let NewDate = new Date(NewYear, NewMonth, 1);// 取当年当月中的第一天
    // return (new Date(NewDate.getTime() - 1000 * 60 * 60 * 24)).getDate();// 获取当月最后一天日期
    // console.log(new Date(year, month, 0).toLocaleDateString().substr(-2));
    var timearr = new Date(year, month, 0).toLocaleDateString().split('/')
    // console.log(timearr[2].length === 2 ? timearr[2] : timearr[1]);
    return Number(timearr[2].length === 2 ? timearr[2] : timearr[1])
}

const SearchAPI = async (page, search, user, itcode, than) => {
    let text = '';
    let SutData = [];
    let Allpage = '';
   await Api.SearchSut({page, search, user_page: user, itcode}).then((res) => {
        if (res.sut_data.length !== 0) {
            text = ''
            SutData = res.sut_data
            Allpage = res.all_page
        } else if (res.sut_data.length === 0) {
            text = ''
            SutData = res.fuzzy_sut_data
            Allpage = res.all_page
            text = than.$t('Lang.Views.Sut.Suts.SearchLike')
            if (res.sut_data.length === 0 && res.fuzzy_sut_data.length === 0) {
                text = ''
                SutData = []
                Allpage = res.all_page
                text = than.$t('Lang.Views.Sut.Suts.SearchNodata')
            }
        }
    })
    if (search !== '') {
        let time = new Date().toISOString()
        Api.PostSearch({searchresult: search, createtime: time, itcode, action: 'add'}).then((res) => {})
    }
    return {text: text, SutData: SutData, Allpage: Allpage}
}
export {pastDate, getLastDay, SearchAPI}
