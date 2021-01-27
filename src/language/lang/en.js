module.exports = {
    Lang: {
        public: { // 公用的
            SubBtn: 'Submit',
            No_data: 'No data',
            Add: 'Add',
            search: 'Please enter search',
            ConfirmBtn: 'Confirm',
            CancelBtn: 'Cancel',
            DetailBtn: 'Details',
            CloseBtn: 'Close',
            RejBtn: 'Reject',
            PassBtn: 'Pass',
            ComBtn: 'complete',
            ReturnBtn: 'Return',
            TenReturn: 'Return',
            ApreBtn: 'Approve',
            DeBtn: 'Delete',
            Agben: 'I Agree', // 新增
            Impbtn: 'Import',
            DownBtn: 'Download',
            Message: { // 公用的message 提示信息 只做到了成功的有国际化，没成功的应为是后台返回的我没法做处理
                delete: 'successfully delete!',
                commit: 'commit can not be empty',
                edit: 'modify successfully',
                copy: 'Copy Success',
                top: 'Please manually select the tool you want to communicate with',
                dowSuc: 'Download successful',
                chaeckError: 'You have to choose one'
            },
            Reservation_label: { // 我的预定和管理员的所有预定的Label
                Name: 'Name',
                IP: 'IP',
                User: 'User Name',
                PW: 'Password',
                Start: 'Start',
                End: 'End',
                Usage: 'Usage',
                Applicant: 'Applicant',
                Select_Dates: 'Select Dates',
                start_placeholder: 'Start Date',
                end_placeholder: 'End Date',
                Comments: 'Comments',
                Please_enter_content: 'Please enter content',
                Chat: 'Chat',
                click_copy: 'Click to copy',
                Click_open: 'Click the open',
                don_copy: 'Will be visible during your reservation;'
            },
            Log: { // 我的预定的下载log和管理员的log
                Title: 'Title',
                Please_title: 'Please enter the title',
                OS_IP_address: 'OS IP address:',
                Please_address: 'Please enter the ip address',
                OS_Username: 'OS Username:',
                Please_username: 'Please enter the username',
                OS_password: 'OS password:',
                Please_password: 'Please enter your password.',
                File_Type: 'File Type:',
                OS: 'OS',
                LXPM: 'LXPM(LEPT)',
                RAID_HBA: 'RAID/HBA',
                UEFI_IMM: 'UEFI/IMM(SEL)',
                FFDC: 'FFDC',
                INVENTORY: 'INVENTORY',
                ONECLI: 'ONECLI',
                Please_onecli: 'onecli path like c:/onecli on windows or /onecli on linux',
                propmt: 'To capture the log file, you need prepare the environment, please contact',
                contact: 'lixl44@lenovo.com',
                propmt2: 'for support',
                LXEM: {
                    lebal: 'LXEM',
                    pl1: 'BMC/XCC Ip',
                    pl2: 'Username',
                    pl3: 'Password'
                },
                PSCAN: 'PSCAN',
                Please_pscan: 'pscan path like c:/pscan on windows or /pscan on linux',
                rules: { // 一些必填log的规则提示
                    r_name: 'Please fill in the username',
                    r_t_s: 'The length should be no more than 5 strings.',
                    r_Pass: 'Please fill in the password.',
                    r_ip: 'Please enter the address.',
                    r_title: 'Please enter the title.'
                }
            },
            Nps: { // 评分的共用
                title: 'After this service from Share Center, are you going to suggest your collegues to use Share Center service?',
                bad: 'Your comments is super important for our improvement, please share us more details, your feedback will be keep as highly confidential. -- Donald Wang',
                Notbad: "Appreciate for your use, we'll do better",
                nice: ' May I take you 1 minute to write us a short comments to let others know how we work?',
                upimg: 'Please select the first image of the uploaded article<br>Drag the file here or <em>Click on the upload</em>',
                Ping_input_comments: 'Ping input comments',
                Hint_title: '<span>Not at all likely</span><span>Extremely likely</span>',
                comments: 'comments:',
                No_up: 'The format of the uploaded file is not valid. Please re-upload',
                up_size: 'Upload image size should not exceed 500KB!',
                Reta_succ: 'Rate succeed'
            },
            SSEHit: {
                request: 'Request',
                borrowed: 'Borrowed',
                checkout: 'Check out',
                reservation: 'Reservation',
                logfile: 'Logfile',
                browRejone: 'Your borrow request ', // 新增借出被拒
                browRejtwo: ' is rejected, the reason is ', // 新增借出被拒
                browSucone: 'Your borrow request ', // 新增借出成功
                browSuctwo: ' is done! You can find the record in My borrowed. Thanks!', // 新增借出成功
                checkRejone: 'Your check out request ', // 新增出库被拒
                checkRejtwo: ' is rejected by ',
                checkRejthr: ', the reason is',
                checkSucone: 'Your check out request ', // 新增出库成功
                checkSuctwo: ' is done! You can find the record in My Check Out. Thanks!', // 新增出库成功
                requChenone: 'Your request ', // 新增工单派发给工程师 --------------------
                requUsbadmone: ' Create a work order： ',
                requUsbadmintwo: ' Please deal with it as soon as possible',
                requChentwo: ' is well received, SC Engineer ',
                requChenthr: ' will contact you soon.',
                requSUccone: 'Your request ', // 新增工单已完成 ---------------------------------
                requSUcctwo: ' is done! Please take few seconds to rate this service!',
                requRejone: 'Your request ', // 新增工单被拒 -------------------------------------
                requRejtwo: ' on ',
                requRejthr: ' is rejected, reason is ',
                resChanthr: ' to ',
                Adminbroone: ' is requesting to borrow this server ', // 管理员的借出
                Adminbrotwo: ' , please go to check if it can be approved. Thanks!',
                AdminbroRet: ' out of material: ', // 借出提前归还,
                BroRetSuc: ' is successfully returned!',
                AdminChek: ' is requesting to check out this server ', // 管理元出库
                AdminChektwo: ', please check the request.',
                reserRemoveone: 'Sorry to inform you: ', // 取消预定
                canceled: ' cancel your request for the: ',
                reserChanone: ' modified your reservation ',
                reserChantwo: '，original one is from ',
                reserChanthr: '；New one is from ',
                reserChanfur: ', reason is: ',
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
                mporeserone: 'Since you didn’t return this server ',
                mporesertwo: ' based on MPO‘s request before ',
                mporeserthr: ', so we have to cancel your reservation. Sorry for that!',
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
                Search: 'Search',
                Reservation: 'Reservation',
                My_Reservation: 'My Reservation',
                My_Logfile: 'My Logfile',
                Support: 'Support',
                New_Request: 'New Request',
                My_Requests: 'My Requests',
                My_Borrowed: 'My Borrowed',
                My_Check_out: 'My Check-out',
                My_Tasks: 'My Tasks',
                CMS: 'CMS',
                Create_News: 'CreateNews',
                All_News: 'All News',
                Management: 'Management',
                Data: 'Data',
                Lab: 'Lab',
                Configuration: 'Configuration',
                All_Hardware: 'All Hardware',
                Soft_Ware: 'Soft Ware',
                Service: 'Service',
                ShareRatio: 'ShareRatio',
                Admin_All_Requests: 'Admin All Requests',
                Admin_All_Borrowed: 'Admin All Borrowed',
                Admin_All_Check_out: 'Admin All Check-out',
                Admin_Assign_Engineer: 'Admin Assign Engineer',
                Admin_Search: 'Admin Search',
                Admin_All_Reservations: 'Admin All Reservations',
                MainPollingOwner: 'MainPollingOwner',
                Data_Analysis: 'Data Analysis',
                Log_File: 'Log File',
                Admin_All_Share_Everything: 'Admin All Share Everything',
                Dashboard: 'Dashboard',
                dashboard: 'dashboard',
                CreateBorrowed: 'CreateBorrowed',
                CreateCheckout: 'CreateCheckout',
                Article: 'Articles', // 文章详情页
                AmendNew: 'AmendNews', // 修改文章页
                CreateReservation: 'CreateReservation', // 创建预定页
                Details: 'Details', // 机器详情页
                AddPage: 'AddPage', // 添加一台机器
                Project: 'Project',
                Binding: 'Binding',
                ShareEverything: 'ShareEverything', // 帮助
                Admin_Sites: 'Sites',
                Admin_City: 'City',
                Milestone: 'Milestone',
                partsDetail: 'Parts Log File',
                AllParts: 'Admin All Parts',
                My_Parts: 'My Parts'
            },
            Header: { // 项目的头部
                ShareTool: 'Share Tool',
                MyReservation: 'My Reservation',
                MyRequests: 'My Requests',
                MyLogfile: 'My Logfile',
                Logout: 'Log out',
                MyBorrowed: 'My Borrowed',
                MyCheckout: 'My Checkout'
            },
            Home: { // home容器页
                CreateRequest: 'Create a new request',
                CreateBorrow: 'Borrow this system',
                CreateCheckout: 'Create Check Out',
                export: 'Screening of export',
                exportUser: 'Export the user'
            }
        },
        Views: { // 页面
            Nopage: { // 404页面
                error_desc: 'Aah ~ the page you are visiting does not exist',
                GoHome: 'Back to homepage',
                GoBack: 'go back to the last page'
            },
            Login: { // 登陆页面
                slogan: `Share Center helps you focus <br/> on your core mission!`,
                linkone: 'Online Resources',
                linktwo: 'Virtual Lab Tour',
                shareTool: '<span style="color:red;">S</span><span>hare</span>&nbsp;<span>Tool</span><p class="small">Version 0.0.1</p>',
                ITcode: 'ITCODE',
                Password: 'Password',
                login: 'Log in',
                Publisher: 'Publisher:',
                p_itcode: 'Please enter the itcode',
                p_pass: 'Please enter Domain Password',
                logerror1: 'Username or Password is wrong!',
                logerror2: 'LDAP Server Down!',
                logerror3: 'Currently we are in trial run phase, only support beta test users.'

            },
            ShareEverything: { // 捐赠页面
                TitleText: 'If you have anything you want to Share with DCG members, please submit your sharing to us. We’ll contact you soon.Including but not limited: Lab, switch, hardware, feature, technology …',
                Title: 'Title:',
                Commits: 'Comments:',
                PlaceholderTitle: 'Please enter title',
                Placeholdercommits: 'Please enter comments',
                rules_Title: 'Please enter the title',
                Addsuccess: 'Hello, thank you very much for your donation to Share Center. Our entire Share Center team will remember your donation. Thank you again for your donation.',
                CloseConfirm: 'Confirm the shut down'
            },
            Sut: {
                Suts: { // 首页search页面
                    Select_month: 'Select month',
                    vacant: 'Vacant',
                    Reserved: 'Reserved',
                    Check_Out: 'Check Out',
                    Borrowed: 'Borrowed',
                    Passed_Date: 'Passed Date',
                    SearchLike: 'The data you searched is not available yet. I think you have recommended the data you like',
                    SearchNodata: 'There is no data for you to search',
                    Vacant_title: 'Idle system/parts which you can reserve for your remote development/validation works.',
                    Check_out_title: "System/Parts will be send to outside of Lenovo, won't back by then. Before the check out date, you can still reserve it and use it.",
                    Borrowedtitle: 'System/Parts are borrowed from Share Center, user will return it back to Share Center after the emergency debug or rework, etc',
                    Passed_Date_title: "No one can change yesterday, so you can't reserve it in passed dates.",
                    num: 'Number',
                    SelectAll: 'Select All',
                    Bulk_booking: 'Bulk booking',
                    Bulk_success: 'Batch reservation successful',
                    Bulk_result: 'Bulk booking result',
                    Bulk_resver_success: 'Your reservation has been successful:',
                    Bulk_resver_error: 'The machine for which your reservation failed:',
                    resver_error_why: 'The reason is that this or these machines have been booked.',
                    Mpo_error_why: 'The reason is that these or this machine has been locked by Mpo and cannot be booked for the time being.',
                    Check_error_why: 'The reason is that these or this machine has been released from the database.',
                    brrowed_error_why: 'The reason is that these or this machine has been lent out.'
                },
                MyReservation: { // 我的预定页面
                    edit_time: 'Please fill in the time and content to be modified',
                    log_dw: 'The log file is being downloaded',
                    edit_text: 'Modify the reservation',
                    Cancel: 'Cancel this reservation',
                    delete_title: 'Are you sure you want to cancel this reservation?',
                    Log_cont: 'Log Capture',
                    request_title: 'Create a support request',
                    Canceled: 'Canceled.',
                    GOSaat: 'SaaT tool'
                },
                Mylog_allLog: { // 我的log下载和所有的log页面
                    label: {
                        Task_Name: 'Task Name',
                        Name_of_System: 'Name of System',
                        Type: 'Type',
                        Create_Time: 'Create Time',
                        Status: 'Status',
                        Log_Info: 'Log Info',
                        explain: 'Violations'
                    },
                    Finish: 'Finish',
                    Fail: 'Fail',
                    In_Progress: 'In Progress'
                },
                CreateReservation: { // 创建预定页面
                    please_usage: 'please fill in your usage',
                    Add_Request: 'Additional Request',
                    Details: 'Details:',
                    Please_request: 'Please enter detailed request',
                    Prompt: 'Reservation Confirmation', // 修改了
                    Dear: 'Dear', // 新增
                    title_text: 'You’re reserving this server --', // 新增
                    Time_title: 'Reservation period (Year/Month/Day):', // 新增
                    MPO_title: 'Please confirm if you agree with below rules:', // 新增
                    one_text: 'As MPO (Main Polling Owner),', // 新增
                    two_text: ' has the first priority to use this server. If MPO requests you to return this server even you reserved it and it’s in use, but you need to return it to MPO based on the return limit which MPO set - within', // 新增
                    Day: 'days.', // 新增
                    text: 'Your reservation is based on your real requirement and you’ll release the hardware asap after your usage.', // 新增
                    Configuration: 'Configuration',
                    S_m_R: 'successful reservation',
                    O_c_S: 'Order created successfully',
                    err_r_r: 'Your reservation creation failed. The work order creation was unsuccessful',
                    ReleaseData: {
                        SystemID: 'SystemID:',
                        SystemName: 'SystemName:',
                        CodeName: 'CodeName:',
                        SN: 'SN:',
                        Location: 'Location:',
                        Release: 'Release:',
                        Armory: 'Armory:'
                    },
                    collapse: { // 公用的折叠面板
                        P_d: 'Processors:Installed', // 折叠面板一，以此类推
                        Bn: 'Bay Number',
                        Processor_Speed: 'Processor Speed',
                        Number_of_Cores: 'Number of Cores',
                        Product_Name: 'Product Name',
                        Product_Family: 'Product Family',
                        Manufacturer: 'Manufacturer',
                        M_d: 'Memory：Installed', // ----------------------------
                        Size: 'Size',
                        Speed: 'Speed',
                        Type: 'Type',
                        Model: 'Model',
                        Serial_number: 'Serial number',
                        Part_number: 'Part number',
                        D_d: 'Drives:Installed', // -------------------------------
                        RAID: 'RAID',
                        Capacity: 'Capacity',
                        Drive_Type: 'Drive Type',
                        RAID_State: 'RAID State',
                        Storage_Pool: 'Storage Pool',
                        Part_Number: 'Part Number',
                        SSD_Remaining_Life: 'SSD Remaining Life',
                        F_m: 'Flash DIMM', // ---------------------------
                        Slot_Number: 'Slot Number',
                        P_s: 'Power Supplies', // -------------------------
                        Name: 'Name',
                        Total_output_power: 'Total output power(Watts)',
                        R_n: 'RAID Configuration', // -------------------
                        E_s: 'Expansion Cards', // -----------------------
                        FRU: 'FRU',
                        Version: 'Version',
                        Release_Date: 'Release Date',
                        F_e: 'Firmware', // --------------------------------
                        Build: 'Build'
                    }
                }
            },
            Support: { // 工单类
                request: { // 创建工单页
                    Location: 'Select Share Center Location',
                    bj: 'Beijing',
                    B_t_r_s: 'Bind to reserved system',
                    P_s_r: 'Please select reservation',
                    create_request_title: 'The title cannot be empty',
                    Prompt: 'Request Confirmation',
                    title_text: 'You have successfully created this work order --',
                    IDtext: 'The ID of this work order is',
                    Category: 'Category',
                    Select_cate: 'Please select Category',
                    CategoryNone: 'Please select at least one category',
                    CheckTitle: {
                        'Re config': ['Main board', 'memory', 'CPU', 'Network card', 'RAID card', 'Power supply', 'PCIE Adapter card', 'Ethernet cable', 'Module'],
                        'Check status': ['IP', 'Drive', 'LED Light color'],
                        'Plug external device': ['Plug cable', 'Insert U disk'],
                        'Install OS': ['Install OS'],
                        'FW Update FW': ['FW Update FW'],
                        'Put server on/off rack': ['Put server on', 'off rack'],
                        'Assemble system': ['Assemble system'],
                        'Debug': ['Debug']
                    },
                    Others: 'Others:',
                    Enter_the_lab: 'Enter the lab:',
                    enterplac: 'Enter the lab',
                    Project: 'Project',
                    UseRequestTitle: 'Would you like to cancel the last work order',
                    Yes: 'Yes',
                    No: 'No',
                    RequestViolations: 'Record of last work order violation',
                    ViolationsCont: 'Please fill in the reason for last violation'
                },
                MyReq_allReq: { // 我的工单也和所有工单页
                    Ticket_Title: 'Ticket Title',
                    Location: 'Location',
                    Operator: 'Operator',
                    Create_Time: 'Create Time',
                    Rating: 'Rating',
                    Flow_Chart: 'Flow Chart',
                    applicant: 'Applicant',
                    Chat_with_engineer: 'Chat with engineer',
                    The_flow_chart: 'The flow chart',
                    OK: 'OK',
                    Discuss: 'Discuss',
                    Engineer: 'Engineer',
                    Time: 'Time:',
                    ID: 'ID',
                    filename: 'Data_report',
                    time_line: {
                        Review: 'create the request.',
                        Assigned: 'approved this request,',
                        Assigned2: 'is working on it.',
                        Modify_engineer: 'is transfered to',
                        Complete: 'complete your request',
                        Reject: 'reject this request due to'
                    }
                },
                AssEnginner: { // 工程师页
                    Reject_request: 'Reject this request?',
                    Please_reason: 'Please fill in the reject reason',
                    Assign_engineer: 'Assign an engineer',
                    Site: 'Site:',
                    Input_back: 'The order has been rejected',
                    Congratulations_signing: 'Congratulations on the successful signing.',
                    Engineer: 'Engineer'
                },
                Task: {
                    Close_this_request: 'Close this request',
                    confriomText: 'Are you sure to complete the work order',
                    repair_success: 'The repair order success'
                },
                Mycheck: { // 我的出库页
                    Approver: 'Approver',
                    Check_Date: 'Check-out Date',
                    create_check: 'create the check.',
                    complete_check: 'complete your check',
                    reject_text: 'reject this check due to '
                },
                Myborrowed: { // 我的借出页
                    returnText: 'Are you sure you want to return this system?',
                    returnOk: 'Agree to return',
                    create_borrow: 'create the borrow.',
                    approved_borrow: 'approved this borrow.',
                    return_borrow: 'has returned the borrowed machine ahead of schedule',
                    complete_borrow: 'complete your borrow',
                    reject_borrow: 'reject this borrow due to',
                    return_succes: 'The machine you borrowed has been returned in advance. Thank you for your cooperation'
                },
                Creat_bor_che: { // 创建出库和借出页， 共用
                    borText: 'Please fill in the reasons for your borrowing.',
                    checkText: 'Please fill in your reasons for leaving the warehouse',
                    borsuccess: 'Borrowed creation success',
                    checksuccess: 'Check Out creation success'
                },
                MainPollingOwner: {
                    LockTime: 'Lock Time',
                    ReturnDue: 'Return Due',
                    UnlockDate: 'Unlock Date',
                    RequestReturn: 'CallBack',
                    returnMesg: 'Are you sure you want the user to force return before the selected date',
                    returnYes: 'Forced restitution was set successfully!',
                    returnNo: 'Cancel',
                    borrow: 'Borrow',
                    Reservation: 'Reservation',
                    checkoutlock: 'Checkoutlock',
                    modifypasswd: 'Change Password'
                }
            },
            Cms: { // 文章管理
                CreateNews: { // 创建文章页
                    Poster: 'Poster:',
                    up_size: 'Please select the first image to upload and the pixel is 1920*1080<br>Drag the file here or <em>Click on the upload</em>',
                    Edit_Article: 'Edit Article:',
                    up_succ: 'Upload successfully',
                    up_del: 'The deletion failed, because',
                    up_err: 'Upload error',
                    Article_created_successfully: 'Article created successfully',
                    warning: 'The image size of the uploaded file is not standard. The width should be 1920px and the height should be 1080px. The width and height of the currently uploaded images are respectively：',
                    format: `The format of the uploaded file is not valid Please re-upload`,
                    and: 'and'
                },
                Articles: { // 文章详情页
                    Back: 'Back',
                    Edit: 'Edit',
                    publisher: 'publisher:',
                    Year: 'Year',
                    Month: 'Month',
                    Day: 'Day'
                }
            },
            Manage: { // 管理人员
                Admin_shareEverying: {
                    Author: 'Author'
                },
                Admin_borrowed: { // 管理员 借出页面
                   re_reueset: 'Do you want to reject this borrow request?',
                   ap_succ: 'The machine was loaned out successfully',
                   rj_succ: 'You already rejected this request',
                   rt_succ: 'You have agreed to the early return of the machine',
                   Reason: 'Reason:'
                },
                Admin_check: { // 管理员 出库页面
                    ap_succ: 'Do I need to check it out through this one？',
                    ar_succ: 'Are you sure you want to return this lending information?',
                    ap_mrs: 'You approved this check out request.',
                    er_mrs: 'You rejected this check out request.'
                },
                Admin_sut: { // 管理员的 search页面
                    Add_SUT: 'Add SUT',
                    Release: 'Release',
                    Code_Name: 'Code Name',
                    Sut_Name: 'Sut Name',
                    Jurisdiction: 'Jurisdiction',
                    Sit: 'Sit',
                    Lab: 'Lab',
                    plinput: 'Please input',
                    Rack: 'Rack',
                    Slot: 'Slot',
                    SN: 'SN',
                    Armory: 'Armory',
                    SUT_IP: 'SUT IP',
                    XCC_USER: 'XCC USER',
                    XCC_PW: 'XCC PW',
                    Configuration: 'Configuration',
                    Save: 'Save',
                    Edit_SUT: 'Edit SUT',
                    Pl_select: 'Please select',
                    rules: {
                        P_codeName: 'Please select the codeName',
                        Min_length: 'Minimum three characters in length',
                        P_SutName: 'Please enter the SutName',
                        P_release: 'Please select the release',
                        P_location: 'Please select the location',
                        P_lab: 'Please enter the lab',
                        P_Rack: 'Please enter the Rack',
                        P_solt: 'Please enter the solt',
                        please_Configuration: 'please fill in Configuration'
                    },
                    like_recommended: 'The data you searched is not available yet. I think you have recommended the data you like',
                    No_search: 'There is no data for you to search',
                    Add_succ: 'Add server successfully',
                    chan_succ: 'Change server successfully',
                    delete_sut: 'Whether to delete this list permanently?',
                    Undeleted: 'Undeleted'
                },
                All_Hardware: {
                    Hide: 'Hide',
                    SutName: 'SutName',
                    Release: 'Release',
                    Site: 'Site',
                    Lab: 'Lab',
                    Rack: 'Rack',
                    Slot: 'Slot',
                    Armory: 'Armory',
                    MPO: 'MPO',
                    IP: 'IP',
                    LXCA_Status: 'LXCA Status',
                    Action: 'Action',
                    Operation: 'Operation',
                    Remove: 'Remove',
                    removelxca: 'Whether to remove the sut from the LXCA?',
                    sysimport: 'Batch entry', // 机器批量导入
                    upFile: 'Please select the Excel file for batch entry<br/> Drag the file here or <em>click on the Upload</em>',
                    upSize: 'Only XLSX/XLS files and no more than 500KB can be uploaded',
                    Type2: 'Import database successful, add to LXCA failed, contact administrator for processing',
                    Task_query: 'Task query',
                    Type3: 'Import database successfully, task added to LXCA successfully, job_ID returned',
                    Type4: 'Task creation failed to check the LXCA file format for a problem',
                    Type5: 'Check for errors in the imported LXCA file and return error lines and error messages',
                    Type6: 'The import file template is incorrect',
                    Type7: 'Error uploading file, no file',
                    Type8: 'There are required fields that are empty',
                    TaskTitle: 'Import lXCA information',
                    errorText: 'The error message'
                },
                ShareRatio: {
                    Department_Name: 'Department Name',
                    Line_Manager: 'Line Manager',
                    Totality: 'Totality',
                    Shareable: 'Shareable',
                    Unshareable: 'Unshareable',
                    OK: 'OK',
                    Cancel: 'Cancel',
                    Operation: 'Operation'
                },
                AddPage: {
                    SutName: 'SutName:',
                    Release: 'Release:',
                    SUT_IP: 'BMC IP:',
                    SN: 'SN:',
                    Slot: 'Slot:',
                    Armory: 'Armory:',
                    Code_Name: 'CodeName:',
                    XCC_USER: 'BMC User:',
                    XCC_PW: 'BMC Password:',
                    SiteLabRack: 'Site/Lab/Rack:',
                    Main_Polling_Owner: 'MPO:',
                    AddedtotheLXCA: 'Added to the LXCA',
                    Save: 'Save'
                },
                Detalis: { // 机台详情页
                    Borrow: 'Borrow',
                    Check_out: 'Check out',
                    Update: 'Update'
                },
                Sites: {
                    sitename: 'Please fill in the city name',
                    cityname: 'Please fill in the laboratory name',
                    AddCity: 'Add the city',
                    AddLab: 'Add the laboratory',
                    ChangeBal: 'Modify laboratory',
                    SiteName: 'Site Name',
                    level: 'Level',
                    Admin: 'Admin Name',
                    levelPlease: 'Please select the level',
                    level1: 'level1',
                    level2: 'level2',
                    level3: 'level3',
                    created: 'Add a success',
                    Change: 'Modify the success',
                    laboratory: 'Lab Name',
                    allocation: 'Distribution pattern',
                    engineers: 'Enginner',
                    patternPl: 'Please select the work order allocation mode',
                    engineer: 'Please select one or more engineers',
                    model1: 'Allocation',
                    model2: 'Manually specified',
                    model3: 'All staff distribution',
                    noData: 'No data are available for the area'
                },
                project: {
                    codename: 'CodeName',
                    Codename: 'Codename:',
                    platform: 'Platform',
                    Platform: 'Platform:',
                    wave: 'Wave',
                    TPM: 'TPM',
                    SL: 'SL',
                    LTE: 'LTE',
                    Details: 'Details',
                    config: 'Config',
                    configuration: 'Configuration',
                    cancel: 'Cancel',
                    OK: 'OK',
                    add: 'Add',
                    Milestone: 'Milestone',
                    Memory: 'Memory',
                    Phase: 'HW Level',
                    phase: 'HW Level:',
                    Entry: 'Entry',
                    Exit: 'Exit'
                },
                All_Parts: {
                    PartName: 'PartName',
                    site: 'Site',
                    lab: 'Lab',
                    rack: 'Rack',
                    PN: 'PN',
                    ProductName: 'ProductName',
                    ProductType: 'ProductType',
                    Serial: 'Serial',
                    Comments: 'Comments',
                    ProductID: 'ProductID',
                    Installer: 'Installer',
                    Remover: 'Remover',
                    StartTime: 'StartTime',
                    EndTime: 'EndTime',
                    history: 'History'
                }
            }
        }
    }
}
