module.exports = {
    Lang: {
        public: { // 公用的
            SubBtn: '送 出',
            No_data: '暫無資料',
            Add: '新增',
            search: '請輸入搜尋內容',
            ConfirmBtn: '確認',
            CancelBtn: '取消',
            DetailBtn: '詳細',
            CloseBtn: '關閉',
            RejBtn: '退回',
            PassBtn: '通過',
            ComBtn: '完成',
            ReturnBtn: '返回',
            TenReturn: '歸還',
            ApreBtn: '准許',
            DeBtn: '刪除',
            Agben: '我同意', // 新增
            Impbtn: '導入',
            DownBtn: '下載',
            Message: { // 公用的message 提示信息 只做到了成功的有国际化，没成功的应为是后台返回的我没法做处理
                delete: '刪除成功',
                commit: '內容不可空白',
                edit: '修改成功',
                copy: '複製完成',
                top: '請手動選擇您想要交流的工具',
                dowSuc: '下載成功',
                chaeckError: '必須選一項'
            },
            Reservation_label: { // 我的预定和管理员的所有预定的Label
                Name: '名稱',
                IP: '位址',
                User: '使用者名稱',
                PW: '密碼',
                Start: '開始',
                End: '結束',
                Usage: '用途',
                Applicant: '申請者',
                Select_Dates: '選擇日期',
                start_placeholder: '開始日期',
                end_placeholder: '結束日期',
                Comments: '備註',
                Please_enter_content: '請輸入內容',
                Chat: '聊天',
                click_copy: '點擊可複製',
                Click_open: '點擊可開啟'
            },
            Log: { // 我的预定的下载log和管理员的log
                Title: '標題',
                Please_title: '請輸入標題',
                OS_IP_address: '作業系統IP位址:',
                Please_address: '請輸入IP位址',
                OS_Username: '作業系統使用者名稱:',
                Please_username: '請輸入使用者名稱',
                OS_password: '作業系統密碼',
                Please_password: '請輸入密碼',
                File_Type: '檔案類型',
                OS: '作業系統',
                LXPM: 'LXPM(LEPT)',
                RAID_HBA: 'RAID/HBA',
                UEFI_IMM: 'UEFI/IMM(SEL)',
                FFDC: 'FFDC',
                INVENTORY: 'INVENTORY',
                ONECLI: 'ONECLI',
                Please_onecli: 'onecli 路徑，例如Windows底下的c:/onecli，或是Linux底下的/onecli',
                propmt: '使用log文件抓取功能，您需要先準備log抓取環境，請聯係',
                contact: '小龍',
                propmt2: '謝謝！',
                LXEM: {
                    lebal: 'LXEM',
                    pl1: 'BMC/XCC IP位址',
                    pl2: '使用者名稱',
                    pl3: '密碼'
                },
                PSCAN: 'PSCAN',
                Please_pscan: 'pscan的路徑，例如Windows底下的c:/pscan，或是Linux底下的/pscan',
                rules: { // 一些必填log的规则提示
                    r_name: '請填入使用者名稱',
                    r_t_s: '長度不可大於5個字串',
                    r_Pass: '請填入密碼',
                    r_ip: '請填入IP位址',
                    r_title: '請填入標題'
                }
            },
            Nps: { // 评分的共用
                title: '在使用過Share center的服務後，您會推薦同事來使用Share Center的服務嗎?',
                bad: '我們非常重視您的想法與建議，且絕不會洩漏任何內容，請您放心，若能詳細描述將對我們的改進有很大幫助!非常感謝!-- Donald Wang',
                Notbad: '非常感謝您的使用，我們會持續改進',
                nice: '能否耽誤您一分鐘，來寫下對於我們的想法與鼓勵呢? 謝謝!',
                upimg: '請選擇上傳文章的封面圖片<br>拖曳檔案到此 或者<em>點擊上傳</em>',
                Ping_input_comments: '請輸入評語',
                Hint_title: '<span>完全不喜歡</span><span>非常喜歡</span>',
                comments: '意見:',
                No_up: '上傳的檔案格式錯誤，請重新上傳',
                up_size: '上傳的檔案大小請勿超過500KB!',
                Reta_succ: '評分成功'
            },
            SSEHit: {
                request: 'Request',
                borrowed: 'Borrowed',
                checkout: 'Check out',
                reservation: 'Reservation',
                logfile: 'Logfile',
                browRejone: '抱歉，您的借用申請:',
                browRejtwo: '被退回，原因是:',
                browSucone: '您的借用申請 ', // 新增借出成功
                browSuctwo: ' 已完成，您可以在我的借出中找到该记录。感谢您的使用!', // 新增借出成功
                checkRejone: ' 抱歉，您的出庫申請:', // 新增出库被拒
                checkRejtwo: ' 被 ',
                checkRejthr: ' 拒绝了, 原因是:',
                checkSucone: '您的出庫申請 ', // 新增出库成功
                checkSuctwo: ' 已完成，您可以在我的出庫中找到此訂單，感謝您的使用!', // 新增出库成功
                requChenone: '您的申請 ', // 新增工单派发给工程师
                requUsbadmone: ' 創建了一個工單: ',
                requUsbadmintwo: '請儘快處理該信息 ',
                requChentwo: ' 已被受理。SC工程师 ',
                requChenthr: ' 将尽快联系您。',
                requSUccone: ' 您的需求 ', // 新增工单已完成
                requSUcctwo: ' 已完成, 在此耽誤您寶貴的幾秒鐘，為本次服務評分! 謝謝!',
                requRejone: '抱歉，您新增的訂單 ', // 新增工单被拒 -------------------------------------
                requRejtwo: ' 在 ',
                requRejthr: '  已被退回, 原因是',
                resChanthr: ' 到 ',
                Adminbroone: ' 正提出此機台的借用需求 ', // 管理员的借出
                Adminbrotwo: ' , 請前往查看是否准許該訂單，謝謝!',
                AdminbroRet: '借出物料', // 借出物料
                BroRetSuc: ' 已成功歸還!',
                AdminChek: ' 正提出此機台的出庫需求 ', // 管理元出库
                AdminChektwo: ', 請前往查看該訂單 ',
                reserRemoveone: '抱歉的通知您', // 取消预定
                canceled: ' 取消对您该:',
                reserChanone: ' 修改了您的訂單 ',
                reserChantwo: ', 原預定時間為:  ',
                reserChanthr: ';新預定時間為: ',
                reserChanfur: ', 原因是: ',
                mpoone: `You're assigned as the MPO (Main Polling Owner) for`, // mpo
                mpotwo: ', we temporarily reserved 1 week for you: ',
                mpothr: ', you can modify the period in my reservation. After that action, it will be shown to other users. Thanks!',
                mpoNoon: ' Share Tool is not locked on the shelf please book as soon as possible',
                mpowarone: ' modified you reservation ',
                mpowartwo: ', the reason is: ',
                mpowarthr: ' usage. Original one is from ',
                mpowarfur: '. New one is from ',
                mpouserone: ', the MPO is requesting you to return this server ',
                before: ' before ',
                mpousertwo: '. Please backup your data and return this server before ',
                mpouserthr: '. Share Tool will automatically release the server for MPO by then. Thanks! ',
                mporeserone: '抱歉的通知您: 因为您未按照MPO的要求, 于 ',
                mporesertwo: ' 前取消对本 ',
                mporeserthr: '的预定，所以我们不得不取消您的预定。',
                mporesercancelone: 'Since you didn’t return this server ',
                mporesercanceltwo: 'So I canceled your reservation',
                mpousercancelone: 'Since you didn’t return this server',
                mpousercanceltwo: 'So I canceled your brrwoed',
                mposuccessone: 'You have to ',
                mposuccesstwo: ' the booking was successful, so the machine has been unlocked.'
            }
        },
        module: { // 项目的动态路由模块
            Sidebr: { // 项目的侧边栏导航
                Search: '搜尋',
                Reservation: '預訂',
                My_Reservation: '我的預訂',
                My_Logfile: '我的紀錄',
                Support: '支援',
                New_Request: '新增需求',
                My_Requests: '我的需求清單',
                My_Borrowed: '我的借用清單',
                My_Check_out: '我的出庫清單',
                My_Tasks: '我的任務清單',
                CMS: 'CMS',
                Create_News: '新增新聞',
                All_News: '所有新聞',
                Management: '系統管理',
                Data: '相關資料',
                Lab: '實驗室',
                Configuration: '配置',
                All_Hardware: '所有硬體',
                Soft_Ware: '軟體',
                Service: '服務',
                ShareRatio: '共享比例',
                Admin_All_Requests: '所有需求清單',
                Admin_All_Borrowed: '所有借用清單',
                Admin_All_Check_out: '所有出庫清單',
                Admin_Assign_Engineer: '指派工程師',
                Admin_Search: '管理者搜尋',
                Admin_All_Reservations: '所有預定清單',
                MainPollingOwner: '提供共享者',
                Data_Analysis: '資料分析',
                Log_File: '紀錄檔',
                Admin_All_Share_Everything: '所有的共享清單',
                Dashboard: '儀表板',
                dashboard: '儀表板',
                CreateBorrowed: '新增建用',
                CreateCheckout: '新增出庫',
                Article: '內文', // 文章详情页
                AmendNew: '編輯文章', // 修改文章页
                CreateReservation: '新增預定', // 创建预定页
                Details: '詳細資訊', // 机器详情页
                AddPage: '新增頁面', // 添加一台机器
                ShareEverything: 'ShareEverything', // 帮助
                Admin_Sites: '地點',
                Admin_City: '城市',
                Milestone: '里程碑',
                partsDetail: '物料詳情',
                AllParts: '所有部件',
                Project: '項目維護'
            },
            Header: { // 项目的头部
                ShareTool: 'Share Tool',
                MyReservation: '我的預定清單',
                MyRequests: '我的需求清單',
                MyLogfile: '我的紀錄檔案',
                Logout: '登出',
                MyBorrowed: '我的借出',
                MyCheckout: '我的出庫'
            },
            Home: { // home容器页
                CreateRequest: '新增需求',
                CreateBorrow: '新增借用',
                CreateCheckout: '新增出庫',
                export: '篩選導出',
                exportUser: '導出用戶'
            }
        },
        Views: { // 页面
            Nopage: { // 404页面
                error_desc: '哎呀~您瀏覽的頁面並不存在',
                GoHome: '回到首頁',
                GoBack: '回到上一頁'
            },
            Login: { // 登陆页面
                slogan: `Share Center能幫您<br/>專注在核心工作上!`,
                linkone: '線上資源',
                linktwo: '虛擬機房導覽',
                shareTool: '<span style="color:red;">S</span><span>hare</span>&nbsp;<span>Tool</span><p class="small">Version 0.0.1</p>',
                ITcode: 'IT帳號',
                Password: '密碼',
                login: '登 入',
                Publisher: '發佈者:',
                p_itcode: '請輸入IT帳號', // 新增
                p_pass: '請輸入密碼', // 新增
                logerror1: '用戶名或密碼錯誤！',
                logerror2: '認證服務器連接失敗。',
                logerror3: '抱歉目前系統在運行階段，只支持部分内測用戶。'
            },
            ShareEverything: { // 捐赠页面
                TitleText: '如果您有任何想要跟DCG同事分享的東西，無論是實驗室，分享器，硬體設備，技術，新資訊…等等，歡迎在此告知我們，我們將盡快與您聯絡。',
                Title: '標題:',
                Commits: '內容:',
                PlaceholderTitle: '請輸入標題',
                Placeholdercommits: '請輸入內容',
                rules_Title: '請輸入標題',
                Addsuccess: '您好，非常感謝您的分享，Share Center在此代表全體的使用者獻上由衷地感謝',
                CloseConfirm: '確認關閉'
            },
            Sut: {
                Suts: { // 首页search页面
                    Select_month: '選擇月份',
                    vacant: '閒置',
                    Reserved: '已預訂',
                    Check_Out: '已出庫',
                    Borrowed: '已借用',
                    Passed_Date: '已逾期',
                    SearchLike: '您所搜尋的資料尚無法使用，建議重新尋找',
                    SearchNodata: '沒有符合搜尋條件的結果',
                    Vacant_title: '機台與物料閒置中，可立即預定來進行遠端開發測試',
                    Check_out_title: '機台與物料即將被運送到聯想以外的單位且無法再使用，在運送之前您都可以正常預定與使用.',
                    Borrowedtitle: '機台與物料因特殊原因而借出Share Center，如緊急Debug、Rework等等，完成後將會歸還並開放預定',
                    Passed_Date_title: '我們無法改變過去，所以我們也無法預定過去的日期',
                    num: '數量',
                    SelectAll: '全選',
                    Bulk_booking: '批量預定',
                    Bulk_success: '批量預定成功',
                    Bulk_result: '批量預定結果',
                    Bulk_resver_success: '您預定成功的機器有:',
                    Bulk_resver_error: '您預定失敗的機器有:',
                    resver_error_why: '原因是這些或這個機器已經被預定了。',
                    Mpo_error_why: '原因是這些或這個機器已經被mpo上鎖了，暫時不可預定。',
                    Check_error_why: '原因是這些或這個機器已經被出庫了',
                    brrowed_error_why: '原因是這些或這個機器已經被借出了'
                },
                MyReservation: { // 我的预定页面
                    edit_time: '請填寫需要修改的時間與內容',
                    log_dw: '紀錄檔案已成功下載',
                    edit_text: '修改預訂',
                    Cancel: '取消預訂',
                    delete_title: '確定要取消預訂?',
                    Log_cont: '取得紀錄檔',
                    request_title: '提出支援需求',
                    Canceled: '已取消',
                    GOSaat: 'SaaT tool'
                },
                Mylog_allLog: { // 我的log下载和所有的log页面
                    label: {
                        Task_Name: '任務名稱',
                        Name_of_System: '機台名稱',
                        Type: '類型',
                        Create_Time: '新增時間',
                        Status: '狀態',
                        Log_Info: '紀錄資訊',
                        explain: '違規'
                    },
                    Finish: '已完成',
                    Fail: '預訂失敗',
                    In_Progress: '進行中'
                },
                CreateReservation: { // 创建预定页面
                    please_usage: '請填入您的用途',
                    Add_Request: '其它需求',
                    Details: '內容:',
                    Please_request: '請提供詳細的需求內容',
                    Prompt: '訂單確認', // 修改了
                    Dear: '親愛的', // 新增
                    title_text: '您正在預定此機台 --', // 新增
                    Time_title: '預定的期間為 (年/月/日):', // 新增
                    MPO_title: '請確認您是否同意遵守以下規定:', // 新增
                    one_text: '身為 MPO (Main Polling Owner – 即最初擁有此機台然後提供分享的同事),', // 新增
                    two_text: '  有最高優先權來使用這台機台。即使您預訂了此機台且正在使用中，一旦MPO請求您歸還，您必須在MPO設定的期限', // 新增
                    Day: '日內歸還。', // 新增
                    text: '您的預定是基於真實需求，且將會在使用完畢或是期限到後盡速歸還機台。', // 新增
                    Configuration: '配置',
                    S_m_R: '預訂成功',
                    O_c_S: '訂單新增成功',
                    err_r_r: '訂單新增失敗，預定尚未完成',
                    ReleaseData: {
                        SystemID: '系統編號:',
                        SystemName: '系統名稱:',
                        CodeName: '代號:',
                        SN: '序號:',
                        Location: '位置:',
                        Release: '發行版本:',
                        Armory: 'Armory:'
                    },
                    collapse: { // 公用的折叠面板
                        P_d: 'Processors:Installed', // 折叠面板一，以此类推
                        Bn: '插槽序',
                        Processor_Speed: '處理器速度',
                        Number_of_Cores: '處理器核心數量',
                        Product_Name: '產品名稱',
                        Product_Family: '產品系列',
                        Manufacturer: '製造商',
                        M_d: '記憶體：已安裝', // ----------------------------
                        Size: '容量大小',
                        Speed: '速度',
                        Type: '類型',
                        Model: '型號',
                        Serial_number: '序號(SN)',
                        Part_number: '料號(PN)',
                        D_d: '硬碟:已安裝', // -------------------------------
                        RAID: 'RAID',
                        Capacity: '容量大小',
                        Drive_Type: '硬碟類型',
                        RAID_State: 'RAID狀態',
                        Storage_Pool: '儲存池',
                        Part_Number: '料號(PN)',
                        SSD_Remaining_Life: 'SSD剩餘壽命',
                        F_m: '快閃記憶體', // ---------------------------
                        Slot_Number: '插槽序',
                        P_s: '電源供應器', // -------------------------
                        Name: '名稱',
                        Total_output_power: '總輸出功率(瓦)',
                        R_n: 'RAID 配置', // -------------------
                        E_s: '擴充卡', // -----------------------
                        FRU: 'FRU',
                        Version: '版本 (Version)',
                        Release_Date: '發布日期',
                        F_e: '韌體', // --------------------------------
                        Build: '版號 (Build)'
                    }
                }
            },
            Support: { // 工单类
                request: { // 创建工单页
                    Location: '請選擇 Share Center',
                    bj: '北京',
                    B_t_r_s: '連結到已預定的系統',
                    P_s_r: '請選擇已預訂的系統',
                    create_request_title: '標題不能空白',
                    Prompt: '預定確認',
                    title_text: '您已經成功創建了這條工單 --',
                    IDtext: '這個工單的工單號為',
                    Category: '類別',
                    Select_cate: '請選擇類別',
                    CategoryNone: '請至少選擇一種類別',
                    CheckTitle: {
                        '更換配置': ['主板', '内存', 'CPU', '網卡', 'RAID卡', '電源', 'PCIE轉接卡', '網綫', '模塊'],
                        '查看狀態': ['IP', '光驅', 'LED燈色'],
                        '插外接設備': ['插網綫', '插U盤'],
                        '安裝操作系統': ['安裝 OS'],
                        '刷新': ['刷新'],
                        '機器上/下架': ['上架', '下架'],
                        '組裝機器': ['組裝機器'],
                        '故障排查': ['故障排查']
                    },
                    Others: '其他:',
                    Enter_the_lab: '進入實驗室:',
                    enterplac: '進入實驗室',
                    Project: '項目',
                    UseRequestTitle: '是否取消上一個工單',
                    Yes: '是',
                    No: '否',
                    RequestViolations: '上一次工單違規記錄',
                    ViolationsCont: '請填寫上一次違規原因'
                },
                MyReq_allReq: { // 我的工单也和所有工单页
                    Ticket_Title: '訂單標題',
                    Location: '地點',
                    Operator: '操作人員',
                    Create_Time: '新增時間',
                    Rating: '評分',
                    Flow_Chart: '處理流程',
                    applicant: '申請人',
                    Chat_with_engineer: '與工程師聊聊',
                    The_flow_chart: '處理流程',
                    OK: '好',
                    Discuss: '討論',
                    Engineer: '工程師',
                    Time: '時間:',
                    ID: '工單號',
                    filename: '數據報表',
                    time_line: {
                        Review: '新增需求.',
                        Assigned: '准許需求,',
                        Assigned2: '正在處理中.',
                        Modify_engineer: '正在指派工程師為',
                        Complete: '處理完成',
                        Reject: '退回了這個需求，因為'
                    }
                },
                AssEnginner: { // 工程师页
                    Reject_request: '退回這需求?',
                    Please_reason: '請提供退回的原因',
                    Assign_engineer: '指派工程師',
                    Site: '地點:',
                    Input_back: '該工單已拒絕',
                    Congratulations_signing: '恭喜，已成功指派工程師!'
                },
                Task: {
                    Close_this_request: '關閉這個需求',
                    confriomText: '是否確定完成此訂單?',
                    repair_success: '成功修復訂單'
                },
                Mycheck: { // 我的出库页
                    Approver: '審核者',
                    Check_Date: '出庫日期',
                    create_check: '新增出庫需求',
                    complete_check: '完成出庫操作',
                    reject_text: '退回出庫申請，因為 '
                },
                Myborrowed: { // 我的借出页
                    returnText: '您確定要歸還這個系統?',
                    returnOk: '同意歸還',
                    create_borrow: '新增借用需求',
                    approved_borrow: '同意此借用',
                    return_borrow: '已提早歸還機台系統',
                    complete_borrow: '完成借用',
                    reject_borrow: '退回此借用申請，因為',
                    return_succes: '您已提前歸還所借用的機台，非常感謝您的合作'
                },
                Creat_bor_che: { // 创建出库和借出页， 共用
                    borText: '請提供借用原由.',
                    checkText: '請提供出庫原由',
                    borsuccess: '成功建立借用需求',
                    checksuccess: '成功建立出庫需求'
                }
            },
            MainPollingOwner: {
                LockTime: '鎖定期',
                ReturnDue: '歸還時限',
                UnlockDate: '發布時間',
                RequestReturn: '強制歸還',
                returnMesg: '請確認是否強制使用者在所選擇的日期前歸還?',
                returnYes: '強制歸還設定成功!',
                returnNo: '取消',
                borrow: '借出鎖定',
                Reservation: '預定鎖定',
                checkoutlock: '出庫鎖定',
                modifypasswd: '改密碼鎖定'
            },
            Cms: { // 文章管理
                CreateNews: { // 创建文章页
                    Poster: '封面:',
                    up_size: '請選取所要上傳的封面圖片，解析度必須為1920*1080<br>把檔案拖曳到這裡 或是<em>點擊虛線區域來上傳</em>',
                    Edit_Article: '編輯文章:',
                    up_succ: '上傳成功',
                    up_del: '刪除失敗，因為',
                    up_err: '上傳失敗',
                    Article_created_successfully: '新增文章成功',
                    warning: '上傳的圖片不符合規定，圖片標準是寬1920px，高1080px。目前所上傳的圖片寬高為：',
                    format: '上傳的圖片格式不符，請重新上傳',
                    and: '和'
                },
                Articles: { // 文章详情页
                    Back: '返回',
                    Edit: '編輯',
                    publisher: '發佈者:',
                    Year: '年',
                    Month: '月',
                    Day: '日'
                }
            },
            Manage: { // 管理人员
                Admin_shareEverying: {
                    Author: '作者'
                },
                Admin_borrowed: { // 管理员 借出页面
                    re_reueset: '您是否要退回這個借用申請?',
                    ap_succ: '機台借出成功',
                    rj_succ: '您已成功退回該申請'
                },
                Admin_check: { // 管理员 出库页面
                    ap_succ: '確定要准許此機台出庫？',
                    ar_succ: '確定要退回此機台出庫申請?',
                    ap_mrs: '您已成功准許此出庫申請',
                    er_mrs: '您已成功退回此出庫申請'
                },
                Admin_sut: { // 管理员的 search页面
                    Add_SUT: '新增SUT',
                    Release: '項目',
                    Code_Name: '代號',
                    Sut_Name: 'Sut名稱',
                    Jurisdiction: '權限',
                    Sit: '位置',
                    Lab: '實驗室',
                    plinput: '請輸入',
                    Rack: '機架(Rack)',
                    Slot: '機位(Slot)',
                    SN: '序號',
                    Armory: 'Armory',
                    SUT_IP: 'SUT IP',
                    XCC_USER: 'XCC 使用者',
                    XCC_PW: 'XCC 密碼',
                    Configuration: '配置',
                    Save: '儲存',
                    Edit_SUT: '編輯SUT',
                    Pl_select: '請選擇',
                    rules: {
                        P_codeName: '請選取代號',
                        Min_length: '長度最少三個字元',
                        P_SutName: '請輸入Sut名稱',
                        P_release: '請選取項目',
                        P_location: '請選取位置',
                        P_lab: '請輸入實驗室',
                        P_Rack: '請輸入機架(RacK)',
                        P_solt: '請輸入機位(Slot)',
                        please_Configuration: '請填寫配置'
                    },
                    like_recommended: '您所搜尋的資料尚無法使用，建議重新尋找',
                    No_search: '沒有符合搜尋條件的結果',
                    Add_succ: '新增伺服器成功',
                    chan_succ: '修改伺服器成功',
                    delete_sut: '確定要永久刪除這清單?',
                    Undeleted: '未刪除'
                },
                All_Hardware: {
                    Hide: '隱藏',
                    SutName: '機台名稱',
                    Release: '項目',
                    Site: '地點',
                    Lab: '實驗室',
                    Rack: '機架(Rack)',
                    Slot: '機位(Slot)',
                    Armory: 'Armory',
                    MPO: '初始共享者',
                    IP: 'IP位址',
                    LXCA_Status: 'LXCA狀態',
                    Action: '動作',
                    Operation: '操作',
                    Remove: '移除',
                    removelxca: '是否要從LXCA中移除機台？',
                    sysimport: '批量錄入', // 机器批量导入
                    upFile: '請選擇用于批量錄入的Excel文件<br/> 將文件拖到這裏 或 <em>點擊上傳</em>',
                    upSize: '只能上傳xlsx/xls文件，不超過500KB',
                    Type2: '導入數據庫成功，添加到lxca失敗，聯係管理員處理',
                    Task_query: '任務查詢',
                    Type3: '導入數據庫成功，添加到lxca的任務添加成功，返回job_id',
                    Type4: '檢查lxca文件格式出現問題任務創建失敗',
                    Type5: '檢查導入lxca文件有錯誤，返回錯誤行和錯誤信息',
                    Type6: '導入文件模板不對',
                    Type7: '上傳文件有錯誤，沒有文件',
                    Type8: '導入數據有未填寫的非空字段',
                    TaskTitle: '導入lxca信息',
                    errorText: '錯誤信息'
                },
                ShareRatio: {
                    Department_Name: '部門名稱',
                    Line_Manager: '直屬主管',
                    Totality: '總計',
                    Shareable: '可共享',
                    Unshareable: '不可共享',
                    OK: 'OK',
                    Cancel: '取消',
                    Operation: '操作'
                },
                AddPage: {
                    SutName: '機台名稱:',
                    Release: '項目:',
                    SUT_IP: 'SUT IP',
                    SN: '序號:',
                    Slot: '機位:',
                    Armory: 'Armory:',
                    Code_Name: '代號:',
                    XCC_USER: 'BMC使用者:',
                    XCC_PW: 'BMC密碼:',
                    SiteLabRack: '地點/實驗室/機架：',
                    Main_Polling_Owner: '提供共享者：',
                    AddedtotheLXCA: '新增到LXCA',
                    Save: '儲存'
                },
                Detalis: { // 机台详情页
                    Borrow: '借用',
                    Check_out: '出庫',
                    Update: '更新'
                },
                Sites: {
                    sitename: '请填写城市名称',
                    cityname: '请填写实验室名称',
                    AddCity: '添加城市',
                    AddLab: '添加實驗室',
                    ChangeBal: '修改實驗室',
                    SiteName: '城市名字',
                    level: '級別',
                    Admin: '管理員',
                    levelPlease: '請選擇級別',
                    level1: '級別1',
                    level2: '級別2',
                    level3: '級別3',
                    created: '創建成功',
                    Change: '修改成功',
                    laboratory: '實驗室名稱',
                    allocation: '分配模式',
                    patternPl: '請選擇工單分配模式',
                    engineers: '工程師',
                    engineer: '請選擇一個或多個工程師',
                    model1: '輪流分配',
                    model2: '手工指定',
                    model3: '全員分配',
                    noData: '該地區暫無數據'
                },
                project: {
                    codename: '代號',
                    Codename: '代號:',
                    platform: '平臺',
                    Platform: '平臺：',
                    wave: 'Wave',
                    TPM: '項目經理',
                    SL: 'SL',
                    LTE: 'LTE',
                    Details: '詳情',
                    config: '配置',
                    configuration: '配置信息',
                    cancel: '取消',
                    OK: '提交',
                    add: '新增',
                    Milestone: '時間節點',
                    Phase: '階段',
                    phase: '階段：',
                    Entry: '開始時間',
                    Exit: '結束時間'
                },
                All_Parts: {
                    PartName: '零件名',
                    site: '地點',
                    lab: '實驗室',
                    rack: '機架',
                    PN: '型號',
                    ProductName: '產品名',
                    ProductType: '產品類型',
                    Serial: '序列號',
                    Comments: '備註',
                    ProductID: '產品ID',
                    Installer: '裝機者',
                    Remover: '拆除者',
                    StartTime: '開始時間',
                    EndTime: '結束時間',
                    history: '歷史'
                }
            }
        }
    }
}
