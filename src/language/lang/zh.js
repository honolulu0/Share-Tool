module.exports = {
    Lang: {
        public: { // 公用的
            SubBtn: '提 交',
            No_data: '没有数据',
            Add: '新增',
            search: '请输入搜索内容',
            ConfirmBtn: '确认',
            CancelBtn: '取消',
            DetailBtn: '详情',
            CloseBtn: '关闭',
            RejBtn: '拒绝',
            PassBtn: '通过',
            ComBtn: '完成',
            ReturnBtn: '返回',
            TenReturn: '归还',
            ApreBtn: '同意',
            DeBtn: '删除',
            Agben: '我同意', // 新增
            Impbtn: '导入',
            DownBtn: '下载',
            Message: { // 公用的message 提示信息 只做到了成功的有国际化，没成功的应为是后台返回的我没法做处理
                delete: '删除成功！',
                commit: '内容不能为空！',
                edit: '修改成功！',
                copy: '复制成功！',
                top: '请手动选择您想要交流的工具',
                dowSuc: '下载成功',
                chaeckError: '必须选一项'
            },
            Reservation_label: { // 我的预定和管理员的所有预定的Label
                Name: '名称',
                IP: 'IP地址',
                User: '用户名',
                PW: '密码',
                Start: '开始',
                End: '结束',
                Usage: '用途',
                Applicant: '申请人',
                Select_Dates: '选择日期',
                start_placeholder: '开始时间',
                end_placeholder: '结束时间',
                Comments: '备注',
                Please_enter_content: '请输入内容',
                Chat: '聊天',
                click_copy: '点击复制',
                Click_open: '点击打开'
            },
            Log: { // 我的预定的下载log和管理员的log
                Title: '标题',
                Please_title: '请输入标题',
                OS_IP_address: '系统IP地址:',
                Please_address: '请输入IP地址',
                OS_Username: '系统用户名:',
                Please_username: '请输入用户名',
                OS_password: '系统密码:',
                Please_password: '请输入密码',
                File_Type: '日志类型:',
                OS: 'OS',
                LXPM: 'LXPM(LEPT)',
                RAID_HBA: 'RAID/HBA',
                UEFI_IMM: 'UEFI/IMM(SEL)',
                FFDC: 'FFDC',
                INVENTORY: 'INVENTORY',
                ONECLI: 'ONECLI',
                Please_onecli: 'onecli路径,例如 c:\\onecli (win系统)或者 /onecli (linux系统)',
                propmt: '使用log文件抓取功能，您需要先准备log抓取环境，请联系',
                contact: '小龙',
                propmt2: '谢谢！',
                LXEM: {
                    lebal: 'LXEM',
                    pl1: 'BMC/XCC IP地址',
                    pl2: '用户名',
                    pl3: '密码'
                },
                PSCAN: 'PSCAN',
                Please_pscan: 'pscan路径,例如 c:\\pscan (win系统)或者 /pscan (linux系统)',
                rules: { // 一些必填log的规则提示
                    r_name: '请输入用户名',
                    r_t_s: '长度不少于5个字符',
                    r_Pass: '请输入密码',
                    r_ip: '请输入IP地址',
                    r_title: '请输入标题'
                }
            },
            Nps: { // 评分的共用
                title: '体验过Share Center的服务后，您是否会推荐同事使用？',
                bad: '您的意见对我们的改进非常重要，请与我们分享更多的细节，您的反馈将被高度保密. -- Donald Wang',
                Notbad: '感谢您的使用，我们将会做的更好',
                nice: ' 可以占用您一分钟为我们写一个短评吗？这将告诉其他人我们工作的如何',
                upimg: '请为上传的文章选择第一个图片<br>拖拽文件到此处 或者 <em>点击上传</em>',
                Ping_input_comments: '请输入评论',
                Hint_title: '<span>不怎么喜欢</span><span>非常喜欢</span>',
                comments: '意见:',
                No_up: '不支持的文件格式! 请重新上传.',
                up_size: '图片大小不超过500KB!',
                Reta_succ: '评分成功'
            },
            SSEHit: {
                request: 'Request',
                borrowed: 'Borrowed',
                checkout: 'Check out',
                reservation: 'Reservation',
                logfile: 'Logfile',
                browRejone: ' 抱歉，您的借用申请:',
                browRejtwo: ' 被拒绝, 原因是:',
                browSucone: '您的借出申请 ', // 新增借出成功
                browSuctwo: ' 已完成，您可以在我的借出中找到该记录。感谢您的使用!', // 新增借出成功
                checkRejone: ' 抱歉，您的出库申请: ', // 新增出库被拒
                checkRejtwo: ' 被 ',
                checkRejthr: ' 拒绝了, 原因是:',
                checkSucone: '您的出库申请 ', // 新增出库成功
                checkSuctwo: '已完成，您可以在我的出库中找到该记录。感谢您的使用!', // 新增出库成功
                requChenone: '您的申请 ', // 新增工单派发给工程师
                requUsbadmone: ' 创建了一个的工单：',
                requUsbadmintwo: '请尽快处理该信息。',
                requChentwo: ' 已被受理。SC工程师 ',
                requChenthr: '将尽快联系您。',
                requSUccone: '您的需求 ', // 新增工单已完成
                requSUcctwo: ' 已完成，请您花费几秒钟为本次服务打一个评分!  谢谢！',
                requRejone: '抱歉，您提交的需求 ', // 新增工单被拒 -------------------------------------
                requRejtwo: ' 在 ',
                requRejthr: ' 上 ',
                requRejfur: ' 已被拒绝, 原因是: ',
                resChanthr: ' 至 ',
                Adminbroone: ' 申请借用这台机器 ', // 管理员的借出
                Adminbrotwo: ' ， 请去确认是否可以批准该申请。',
                AdminbroRet: ' 借出物料: ', // 借出物料
                BroRetSuc: ' 已成功归还!',
                AdminChek: ' 申请为此机台 ', // 管理元出库
                AdminChektwo: '办理出库手续, 请去审核这个申请。',
                reserChanone: ' 修改了您的预定 ',
                reserChantwo: '，原预定为： ',
                reserChanthr: ' 新预订为：',
                reserChanfur: ', 原因是: ',
                mpoone: `您已被指定为MPO（初始共享人）,系统为: `, // mpo
                mpotwo: ', 我们暂时为您预留一周: ',
                mpothr: ', 您可以在“我的预定”中更改日期. 更改之后,此机器将开放给其它用户使用.谢谢！',
                mpoNoon: ' Share Tool 没有锁定上架机器,请尽快预定',
                mpowarone: ' 更改了您预定的 ',
                mpowartwo: ', 原因是: ',
                mpowarthr: ' . 原始日期为 ',
                mpowarfur: '. 更改之后为 ',
                mpouserone: '这台机器 ',
                before: ' 的 ',
                mpousertwo: '，需要您在 ',
                mpouserthr: ' 前归还机台。请备份您的数据并于 ',
                mpouserfur: '前归还此机台，逾期Share Tool将自动归还此机器给MPO。感谢您的理解！',
                mporeserone: '抱歉的通知您: 因为您未按照MPO的要求, 于 ',
                mporesertwo: ' 前取消对本 ',
                mporeserthr: '的预定，所以我们不得不取消您的预定。',
                mporesercancelone: '很抱歉的通知您 您的预定不在 ',
                mporesercanceltwo: '所以取消了您的预定',
                mpousercancelone: '很抱歉的通知您， 您的借出不在',
                mpousercanceltwo: '所以取消了您的借出',
                mposuccessone: '您已经对 ',
                mposuccesstwo: ' 成功的预定了，所以该机器已经解锁。',
                reserRemoveone: '抱歉的通知您: ', // 取消预定
                canceled: ' 取消了您该机器的预定: '
            }
        },
        module: { // 项目的动态路由模块
            Sidebr: { // 项目的侧边栏导航
                Search: '搜索',
                Reservation: '预定',
                My_Reservation: '我的预定',
                My_Logfile: '我的日志',
                Support: '支持',
                New_Request: '新的需求',
                My_Requests: '我的需求',
                My_Borrowed: '我的借出',
                My_Check_out: '我的出库',
                My_Tasks: '我的任务',
                CMS: '文章管理',
                Create_News: '新建文章',
                All_News: '所有文章',
                Management: '管理',
                Data: '数据',
                Lab: '实验室',
                Configuration: '配置',
                All_Hardware: '所有硬件',
                Soft_Ware: '软件',
                Service: '服务',
                ShareRatio: '共享比例',
                Admin_All_Requests: '所有需求',
                Admin_All_Borrowed: '所有借出',
                Admin_All_Check_out: '所有出库',
                Admin_Assign_Engineer: '指派工程师',
                Admin_Search: '管理搜索',
                Admin_All_Reservations: '所有预定',
                MainPollingOwner: '提供共享者',
                Data_Analysis: '数据分析',
                Log_File: '日志文件',
                Admin_All_Share_Everything: '所有共享',
                Dashboard: '仪表板',
                dashboard: '仪表板',
                CreateBorrowed: '新建借出',
                CreateCheckout: '新建出库',
                Article: '正文', // 文章详情页
                AmendNew: '编辑文章', // 修改文章页
                CreateReservation: '新建预定', // 创建预定页
                Details: '详细信息', // 机器详情页
                AddPage: '添加页面', // 添加一台机器
                project: '项目',
                AdminMaintenance: '项目维护',
                ShareEverything: 'ShareEverything', // 帮助
                Admin_Sites: '地点',
                Admin_City: '城市',
                Milestone: '里程碑',
                Project: '项目维护',
                AllParts: '所有部件',
                partsDetail: '物料详情'
            },
            Header: { // 项目的头部
                ShareTool: 'Share Tool',
                MyReservation: '我的预定',
                MyRequests: '我的需求',
                MyLogfile: '我的日志',
                Logout: '注销',
                MyBorrowed: '我的借出',
                MyCheckout: '我的出库'
            },
            Home: { // home容器页
                CreateRequest: '新建需求',
                CreateBorrow: '申请借出',
                CreateCheckout: '申请出库',
                export: '筛选导出',
                exportUser: '导出用户'
            }
        },
        Views: { // 页面
            Nopage: { // 404页面
                error_desc: '额 ~ 您访问的页面不存在',
                GoHome: '返回主页',
                GoBack: '返回上个页面'
            },
            Login: { // 登陆页面
                slogan: `Share Center &nbsp 助您<br/>专注核心任务!`,
                linkone: '在线资源',
                linktwo: '虚拟机房展示',
                shareTool: '<span style="color:red;">S</span><span>hare</span>&nbsp;<span>Tool</span><p class="small">Version 0.0.1</p>',
                ITcode: 'IT账号',
                Password: '密码',
                login: '登 录',
                Publisher: '发布者:',
                p_itcode: '请输入IT账号', // 新增
                p_pass: '请输入域密码', // 新增
                logerror1: '用户名或密码错误!',
                logerror2: '认证服务器连接失败。',
                logerror3: '抱歉目前系统在试运行阶段，只支持部分内测用户。'
            },
            ShareEverything: { // 捐赠页面
                TitleText: '如果您有任何想与DCG成员分享的东西，请在这里告诉我们，我们稍后将会与您联系. 包括但不限于实验室，硬件，交换机，技术……',
                Title: '标题:',
                Commits: '备注:',
                PlaceholderTitle: '请输入标题',
                Placeholdercommits: '请输入备注',
                rules_Title: '请输入标题',
                Addsuccess: '非常感谢您的分享！Share Center代表所有用户向您表示由衷的感谢！',
                CloseConfirm: '确认关闭'
            },
            Sut: {
                Suts: { // 首页search页面
                    Select_month: '选择月',
                    vacant: '空闲',
                    Reserved: '已预订',
                    Check_Out: '已出库',
                    Borrowed: '已借出',
                    Passed_Date: '已过期',
                    SearchLike: '您搜索的数据已不可用.建议搜索',
                    SearchNodata: '没有符合条件的结果',
                    Vacant_title: '系统/部件闲置，可以预定用于远程开发/验证工作.',
                    Check_out_title: '系统/部件将被发送到联想之外且不再返回. 在此之前，仍然可以被预定和使用.',
                    Borrowedtitle: '系统/部件被借出Share Center用于紧急调试、修订等，完成后将归还.',
                    Passed_Date_title: '没人能改变昨天，已经过去的日子是没办法预定的.',
                    num: '数量',
                    SelectAll: '全选',
                    Bulk_booking: '批量预定',
                    Bulk_success: '批量预定成功',
                    Bulk_result: '批量预定结果',
                    Bulk_resver_success: '您预定成功的机器有:',
                    Bulk_resver_error: '您预定失败的机器有:',
                    resver_error_why: '原因是这个或这些机器已经被预定了。',
                    Mpo_error_why: '原因是这些或这个机器已被Mpo上锁了，暂不可预定。',
                    Check_error_why: '原因是这些或这个机器已经被出库了',
                    brrowed_error_why: '原因是这些或这个机器已经被借出了'
                },
                MyReservation: { // 我的预定页面
                    edit_time: '请填写要修改的时间和内容',
                    log_dw: '正在下载日志文件',
                    edit_text: '修改预定',
                    Cancel: '取消预订',
                    delete_title: '确定要取消预定吗?',
                    Log_cont: '日志抓取',
                    request_title: '创建支持请求',
                    Canceled: '已取消',
                    GOSaat: 'SaaT tool'
                },
                Mylog_allLog: { // 我的log下载和所有的log页面
                    label: {
                        Task_Name: '任务名',
                        Name_of_System: '系统名',
                        Type: '类型',
                        Create_Time: '创建时间',
                        Status: '状态',
                        Log_Info: '日志信息',
                        explain: '违规'
                    },
                    Finish: '完成',
                    Fail: '失败',
                    In_Progress: '下载中'
                },
                CreateReservation: { // 创建预定页面
                    please_usage: '请填写您的用途',
                    Add_Request: '附加需求',
                    Details: '详细信息:',
                    Please_request: '请详细描述您的需求',
                    Prompt: '预定确认', // 修改
                    Dear: '亲爱的', // 新增
                    title_text: '您正在预定这台机器 --', // 新增
                    Time_title: '预定的时间为(年/月/日):', // 新增
                    MPO_title: '请确认您同意以下规则：', // 新增
                    one_text: ' 作为MPO (Poll这台机器的同事，即 Main Polling Owner), ', // 新增
                    two_text: ' 有对于此台机器的优先使用权。即便您已预定此机台，并正在使用中，但如果MPO需要您尽快归还此机台， 您需要按照MPO设定的归还时限 --  ', // 新增
                    Day: '天内 归还此机台。', // 新增
                    text: '您是按照您真实的需求预订，并承诺当您使用完毕后会尽快释放此硬件给其他同事使用。', // 新增
                    Configuration: '配置',
                    S_m_R: '预定成功',
                    O_c_S: '订单创建成功',
                    err_r_r: '预定失败. 订单创建不成功',
                    ReleaseData: {
                        SystemID: '系统编号:',
                        SystemName: '系统名称:',
                        CodeName: '代号:',
                        SN: '序列号:',
                        Location: '位置:',
                        Release: '发行版本:',
                        Armory: 'Armory:'
                    },
                    collapse: { // 公用的折叠面板
                        P_d: '处理器', // 折叠面板一，以此类推
                        Bn: '插槽',
                        Processor_Speed: '处理器速度',
                        Number_of_Cores: '核心数',
                        Product_Name: '产品名称',
                        Product_Family: '产品系列',
                        Manufacturer: '制造商',
                        M_d: '内存', // ----------------------------
                        Size: '容量',
                        Speed: '速度',
                        Type: '类型',
                        Model: '型号',
                        Serial_number: '序列号',
                        Part_number: '部件号',
                        D_d: '驱动器', // -------------------------------
                        RAID: 'RAID',
                        Capacity: '容量',
                        Drive_Type: '驱动器类型',
                        RAID_State: 'RAID状态',
                        Storage_Pool: '存储池',
                        Part_Number: '部件号',
                        SSD_Remaining_Life: 'SSD剩余寿命',
                        F_m: '闪存', // ---------------------------
                        Slot_Number: '插槽',
                        P_s: '电源模块', // -------------------------
                        Name: '名称',
                        Total_output_power: '总输出电压(伏)',
                        R_n: 'RAID配置', // -------------------
                        E_s: '扩展卡', // -----------------------
                        FRU: 'FRU编号',
                        Version: '版本',
                        Release_Date: '发行日期',
                        F_e: '固件', // --------------------------------
                        Build: 'Build'
                    }
                }
            },
            Support: { // 工单类
                request: { // 创建工单页
                    Location: '选择Share Center位置',
                    bj: '北京',
                    B_t_r_s: '绑定已预订的系统',
                    P_s_r: '请选择预定',
                    create_request_title: '标题不能为空',
                    Prompt: '预定确认',
                    title_text: '您已经成功创建了这条工单 --',
                    IDtext: '这个工单的工单号为',
                    Category: '类别',
                    Select_cate: '请选择类别',
                    CategoryNone: '请至少选择一个类别',
                    CheckTitle: {
                        '更换配置': ['主板', '内存', 'CPU', '网卡', 'RAID卡', '电源', 'PCIE转接卡', '网线', '模块'],
                        '查看状态': ['IP', '光驱', 'LED灯色'],
                        '插外接设备': ['插网线', '插U盘'],
                        '安装操作系统': ['安装 OS'],
                        '刷新': ['刷新'],
                        '机器上/下架': ['上架', '下架'],
                        '组装机器': ['组装机器'],
                        '故障排查': ['故障排除']
                    },
                    Others: '其他:',
                    Enter_the_lab: '进入实验室:',
                    enterplac: '进入实验室',
                    Project: '项目',
                    UseRequestTitle: '是否取消上一个工单',
                    Yes: '是',
                    No: '否',
                    RequestViolations: '上一次工单违规记录',
                    ViolationsCont: '请填写上一次违规原因'
                },
                MyReq_allReq: { // 我的工单也和所有工单页
                    Ticket_Title: '订单标题',
                    Location: '位置',
                    Operator: '操作者',
                    Create_Time: '创建时间',
                    Rating: '评分',
                    Flow_Chart: '处理流程',
                    applicant: '申请人',
                    Chat_with_engineer: '与工程师沟通',
                    The_flow_chart: '处理流程',
                    OK: '好',
                    Discuss: '讨论',
                    Engineer: '工程师',
                    Time: '时间:',
                    ID: '工单号',
                    filename: '数据报表',
                    time_line: {
                        Review: '创建请求.',
                        Assigned: '批准请求,',
                        Assigned2: '正在处理.',
                        Modify_engineer: '指定处理工程师为',
                        Complete: '处理完成',
                        Reject: '拒绝了该请求，因为'
                    }
                },
                AssEnginner: { // 工程师页
                    Reject_request: '拒绝此需求?',
                    Please_reason: '请输入拒绝的原因',
                    Assign_engineer: '指定工程师',
                    Site: '地点:',
                    Input_back: '该工单已拒绝',
                    Congratulations_signing: '恭喜，已成功指定工程师！'
                },
                Task: {
                    Close_this_request: '关闭该请求',
                    confriomText: '是否确定完成工单',
                    repair_success: '完成订单'
                },
                Mycheck: { // 我的出库页
                    Approver: '审批人',
                    Check_Date: '出库日期',
                    create_check: '申请出库',
                    complete_check: '完成出库操作',
                    reject_text: '拒绝出库申请，因为 '
                },
                Myborrowed: { // 我的借出页
                    returnText: '确定归还该系统吗?',
                    returnOk: '同意归还',
                    create_borrow: '申请借出',
                    approved_borrow: '同意借出',
                    return_borrow: '在预定日期前归还了系统',
                    complete_borrow: '完成借出操作',
                    reject_borrow: '拒绝借出申请，因为',
                    return_succes: '您已提前归还所借系统.感谢您的合作'
                },
                Creat_bor_che: { // 创建出库和借出页， 共用
                    borText: '请填写借出的理由.',
                    checkText: '请填写将系统借出仓库的理由',
                    borsuccess: '借出申请创建成功',
                    checksuccess: '出库申请创建成功'
                },
                MainPollingOwner: {
                    LockTime: '锁定期',
                    ReturnDue: '归还时限',
                    UnlockDate: '发布时间',
                    RequestReturn: '强制归还',
                    returnMesg: '您确定想要用户在选定日期之前强制返还吗？',
                    returnYes: '设置强制返还成功!',
                    returnNo: '取消',
                    borrow: '借出锁定',
                    Reservation: '预定锁定',
                    checkoutlock: '出库锁定',
                    modifypasswd: '改密码锁定'
                }
            },
            Cms: { // 文章管理
                CreateNews: { // 创建文章页
                    Poster: '封面图:',
                    up_size: '请选择要上传的封面图片，像素须为1920*1080<br>将文件拖拽到此处 或者 <em>点击虚线框中区域</em>',
                    Edit_Article: '编辑文章:',
                    up_succ: '上传成功',
                    up_del: '删除失败，因为',
                    up_err: '上传错误',
                    Article_created_successfully: '文章创建成功',
                    warning: '上传的文件不符合要求. 图片标准为宽1920px，高1080px. 当前上传图片宽高分别为：',
                    format: `上传的文件格式无效.请重新上传`,
                    and: '和'
                },
                Articles: { // 文章详情页
                    Back: '返回',
                    Edit: '编辑',
                    publisher: '发布者:',
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
                    re_reueset: '您是否要拒绝这个借出申请?',
                    ap_succ: '系统借出成功',
                    rj_succ: '您已拒绝该申请'
                },
                Admin_check: { // 管理员 出库页面
                    ap_succ: '确定批准该系统出库？',
                    ar_succ: '确定要归还该系统?',
                    ap_mrs: '已批准该出库申请.',
                    er_mrs: '已拒绝该出库申请.'
                },
                Admin_sut: { // 管理员的 search页面
                    Add_SUT: '新增SUT',
                    Release: '项目',
                    Code_Name: '代号',
                    Sut_Name: 'SUT名称',
                    Jurisdiction: 'Jurisdiction',
                    Sit: '位置',
                    Lab: '实验室',
                    plinput: '请输入',
                    Rack: '机架',
                    Slot: '机位',
                    SN: '序列号',
                    Armory: 'Armory',
                    SUT_IP: 'XCC IP',
                    XCC_USER: 'XCC用户名',
                    XCC_PW: 'XCC密码',
                    Configuration: '配置',
                    Save: '保存',
                    Edit_SUT: '编辑SUT信息',
                    Pl_select: '请选择',
                    rules: {
                        P_codeName: '请选择代号',
                        Min_length: '长度最少3个字符',
                        P_SutName: '请输入SUT名称',
                        P_release: '请选择项目',
                        P_location: '请选择位置',
                        P_lab: '请输入实验室',
                        P_Rack: '请输入机架',
                        P_solt: '请输入机位',
                        please_Configuration: '请填写配置'
                    },
                    like_recommended: '您搜索的数据已不可用.建议搜索',
                    No_search: '没有符合条件的结果',
                    Add_succ: '新增服务器成功',
                    chan_succ: '修改服务器成功',
                    delete_sut: '是否永久删除该列表?',
                    Undeleted: '未删除'
                },
                All_Hardware: {
                    Hide: '隐藏',
                    SutName: 'SUT名',
                    Release: '项目',
                    Site: '地点',
                    Lab: '实验室',
                    Rack: '机架',
                    Slot: '机位',
                    Armory: 'Armory',
                    MPO: '初始共享者',
                    IP: 'IP地址',
                    LXCA_Status: 'LXCA状态',
                    Action: '动作',
                    Operation: '操作',
                    Remove: '移除',
                    removelxca: '是否从LXCA中移除SUT？',
                    sysimport: '批量录入', // 机器批量导入
                    upFile: '请选择用于批量录入的Excel文件<br/> 将文件拖到这里 或 <em>点击上传</em>',
                    upSize: '只能上传xlsx/xls文件，不超过500KB',
                    Type2: '导入数据库成功，添加到lxca失败，联系管理员处理',
                    Task_query: '任务查询',
                    Type3: '导入数据库成功，添加到lxca的任务添加成功，返回job_id',
                    Type4: '检查lxca文件格式出现问题任务创建失败',
                    Type5: '检查导入lxca文件有错误，返回错误行和错误信息',
                    Type6: '导入文件模板不对',
                    Type7: '上传文件有误，没有文件',
                    Type8: '导入数据有未填写的非空字段',
                    TaskTitle: '导入lxca信息',
                    errorText: '错误信息'
                },
                ShareRatio: {
                    Department_Name: '部门名称',
                    Line_Manager: '线经理',
                    Totality: '总计',
                    Shareable: '可共享',
                    Unshareable: '不可共享',
                    OK: 'OK',
                    Cancel: '取消',
                    Operation: '操作'
                },
                AddPage: {
                    SutName: 'SUT名:',
                    Release: '项目:',
                    SUT_IP: 'BMC IP:',
                    SN: '序列号:',
                    Slot: '机位:',
                    Armory: 'Armory:',
                    Code_Name: '代号:',
                    XCC_USER: 'BMC用户名:',
                    XCC_PW: 'BMC密码:',
                    SiteLabRack: '地点/实验室/机架：',
                    Main_Polling_Owner: '初始共享者：',
                    AddedtotheLXCA: '加入LXCA',
                    Save: '保存'
                },
                Detalis: { // 机台详情页
                    Borrow: '借出',
                    Check_out: '出库',
                    Update: '更新'
                },
                Sites: {
                    sitename: '请填写城市名称',
                    cityname: '请填写实验室名称',
                    AddCity: '添加城市',
                    AddLab: '添加实验室',
                    ChangeBal: '修改实验室',
                    SiteName: '城市名字',
                    level: '级别',
                    Admin: '管理员',
                    levelPlease: '请选择级别',
                    level1: '级别1',
                    level2: '级别2',
                    level3: '级别3',
                    created: '创建成功',
                    Change: '修改成功',
                    laboratory: '实验室名称',
                    allocation: '分配模式',
                    patternPl: '请选择工单分配模式',
                    engineers: '工程师',
                    engineer: '请选择一个或多个工程师',
                    model1: '轮流分配',
                    model2: '手工指定',
                    model3: '全员分配'
                },
                project: {
                    codename: '代号',
                    Codename: '代号：',
                    platform: '平台',
                    Platform: '平台：',
                    wave: 'Wave',
                    TPM: 'TPM',
                    SL: 'SL',
                    LTE: 'LTE',
                    Details: '详情',
                    config: '配置',
                    configuration: '配置信息',
                    cancel: '取消',
                    OK: '提交',
                    add: '添加',
                    Milestone: '时间节点',
                    Phase: '阶段',
                    phase: '阶段：',
                    Entry: '开始时间',
                    Exit: '结束时间'
                },
                All_Parts: {
                    PartName: '零件名',
                    site: '位置',
                    lab: '机房',
                    rack: '机柜',
                    PN: '型号',
                    ProductName: '产品名',
                    ProductType: '产品类型',
                    Serial: '序列号',
                    Comments: '备注',
                    ProductID: '产品ID',
                    Installer: '装机者',
                    Remover: '拆除者',
                    StartTime: '开始时间',
                    EndTime: '结束时间',
                    history: '历史'
                }
            }
        }
    }
}
