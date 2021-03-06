import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const zh = {
  lang: {
    // 版权
    copyright: ' Hylink. 华扬联众数字技术股份有限公司 版权所有',
    not_chrome: 'MAPS： 浏览器Chrome对产品的兼容性及浏览体验更好，建议您在最新版本的Chrome上运行MAPS。',
    sync_fail_point: '以下账号数据同步失败，您可联系管理员处理。',
    login_expired: '登录信息过期，请重新登录。',
    // 登录页
    login_no_account: '没有账号 ? 立即',
    login_has_account: '已有账号？',
    login_sign_in: '登录',
    login_sign_up: '注册',
    login_sign_in_form_title: '账号登录',
    login_forget_password: '忘记密码？',
    login_button_login: '登 录',
    login_button_logining: '登录中...',
    login_button_logout: '退出登录',
    login_email_verified: '邮箱验证成功！请登录。',
    login_sign_up_step1_title1: '欢迎注册MAPS系统',
    login_sign_up_step1_title2: '实现多广告平台一站式管理体验，',
    login_sign_up_step2_title1: '验证你的注册邮箱',
    login_sign_up_step2_title2: '我们已经向您的邮箱：',
    login_sign_up_step2_title3: ' 发送了一封确认邮件。<br/>您需要在<span style="color: #0bb3b3">10分钟内</span>点击邮件内的激活链接对账户进行激活',
    login_sign_up_step1_button: '立即注册',
    login_send_email_again: '未收到邮件，点击再次发送',
    login_forget_password_step1_title1: '找回密码',
    login_forget_password_step1_title2: '想起来了，返回',
    login_forget_password_step2_title2: '发送了一封确认邮件。<br/>您需要在<span style="color: #0bb3b3">10分钟内</span>点击邮件内的链接进入重设密码。',
    login_forget_password_step1_button: '重置密码',
    login_forget_password_step3_button: ' 确认更换密码',
    login_password_change_success: '密码修改成功。',
    login_choose_team: '选择团队',
    login_apply_join_team: '申请加入其他团队',
    login_can_not_select_team: '您的账号已被该团队管理员禁用，暂时无法访问该团队。您可联系团队管理员',

    // 导航
    layout_system_nav: '系统管理',
    layout_system_account_nav: '账号管理',
    layout_system_team_nav: '团队管理',
    layout_system_message_subscribe_nav: '订阅消息',
    layout_system_message_all_nav: '全部消息',
    layout_system_message_nav: '消息中心',
    layout_system_root_nav: '系统账号',
    layout_report_nav: '数据中心',
    layout_report_customer_nav: '客户报表',
    layout_report_effect_nav: '效果报表',
    layout_report_subscribe_nav: '报表订阅',
    layout_setting_nav: '辅助工具',
    layout_Rules_Management_nav: '规则管理',
    layout_Automated_Rules_nav: '智能规则',
    layout_Rule_Tasks_nav: '规则任务',

    // 输入框，表单
    public_login_username_placeholder: '请输入登录邮箱或用户名',
    public_password_placeholder: '请输入登录密码',
    public_confirm_password_placeholder: '请确认密码',
    public_new_password_placeholder: '请输入新密码',
    public_new_confirm_password_placeholder: '请确认密码',
    public_vcode_placeholder: '验证码',
    public_email_placeholder: '请输入登录邮箱',
    public_username_placeholder: '请输入用户名',
    public_truename_placeholder: '请输入真实姓名',
    public_phone_placeholder: '请输入手机号',
    public_team_search_placeholder: '请输入团队名称、ID或团队管理员用户名搜索',
    public_password_original_placeholder: '请输入原密码',
    public_password_new_placeholder: '请输入新密码',
    public_password_confirm_placeholder: '请再输入一次新密码',
    public_add_to_customer: '添加到客户',
    public_platform_placeholder: '平台',
    public_status_placeholder: '状态',
    public_customer_placeholder: '客户',
    public_account_client_owner_placeholder: '搜索账号、客户、所属人',
    public_new_customer_name: '请输入新客户名称',
    public_customer_name_placeholder: '客户名称',
    public_team_member_permission_placeholder: '成员权限', //Permission
    public_select_customer_placeholder: '选择客户',
    public_select_platform_placeholder: '选择平台',
    public_select_view_type_placeholder: '选择查看类型',
    public_select_account_placeholder: '选择账号',
    public_select_objectives_placeholder: '推广目的',
    public_Enter_client_name: '请输入客户名称',
    public_Choose_an_industry_category: '请选择客户所属的行业',

    public_expand: '展开',
    public_collapse: '收起',
    public_all: '全部', //全部
    public_all_customer: '全部客户',
    public_all_type: '全部类型',
    public_all_platform: '全部平台',
    public_all_status: '全部状态',
    public_Visible: '启用', // 状态展示
    public_Invisible: '禁用', // 状态展示
    public_enable: '启用', // 除账号管理之外使用
    public_disable: '禁用', // 状态展示
    public_apply: '申请', //Apply for
    public_Stateless: '未申请',
    public_Awaiting_response: '待确认',
    public_Rejected: '被拒绝',
    public_Expired: '已过期',
    public_Assigned: '已分配',
    public_Awaiting_assignment: '未分配',
    public_operate: '操作',
    public_parent_module: '一级模块',
    public_child_module: '二级模块',
    public_permission: '权限',
    public_show_permission: '查看', //readable
    public_edit_permission: '编辑', //readable & writable
    public_no_data: '暂无数据',
    public_detail: '详情',
    public_start_time: '开始日期',
    public_end_time: '结束日期',
    public_range_separator: '至',
    public_check_all: '全选',
    public_checked: '已选',
    public_clear_all: '清空',
    public_read: '已读', //已读状态
    public_unread: '未读', //未读状态
    public_Export_as_PNG: '下载PNG',
    public_Export_as_Excel: '下载EXCEL',
    public_not_select: '暂不选择',
    public_See_All: '查看全部',
    public_money: '元',
    public_Stay_tuned: '敬请期待',
    public_total: '总计',
    public_Average: '平均值',
    public_load_more: '加载更多',
    public_Monday: '星期一',
    public_Tuesday: '星期二',
    public_Wednesday: '星期三',
    public_Thursday: '星期四',
    public_Friday: '星期五',
    public_Saturday: '星期六',
    public_Sunday: '星期日',
    public_all_day: '全天',
    public_Custom: '自定义',
    public_jl: '巨量引擎',
    public_tx: '腾讯广告',
    public_wx: '微信广告',
    public_week_time: '星期/时间', //Day/Time
    public_select: '请选择',
    public_must: '必须',
    public_Attention: '请注意',
    public_point: '提示',

    public_account_batch_before: '请先选择账号，再进行批量操作',
    public_member_batch_before: '请先选择成员，再进行批量操作',
    public_message_batch_before: '请先选择消息，再进行批量操作',
    public_Task_batch_before: '请先选择任务，再进行批量操作',
    public_rule_batch_before: '请先选择规则，再进行批量操作',

    // 按钮
    public_button_join_team: '申请加入团队',
    public_button_confirm: '确 定',
    public_button_cancel: '取 消',
    public_button_save: '保 存',
    public_button_apply: '申 请',
    public_button_next: '下一步',
    public_button_connect: '确认关联',
    public_button_close: '关 闭',
    public_button_Reject: '残忍拒绝',
    public_button_Approve: '同意申请',
    public_button_Reject_apply: '拒绝请求',
    public_button_Approve_apply: '确认分配',
    public_button_Got_it: '知道了',
    public_button_submit: '提 交',
    public_button_apply_to: '应 用',

    // tooltip
    public_vcode_tooltip: '点击图片换一张',
    public_back_top: '返回顶部',
    public_delete_tooltip: '删除', //账号专用
    public_delete_tooltip_x: '删除', //除账号管理
    public_edit_tooltip: '编辑',
    public_open_tooltip: '启用', // 操作提示
    public_forbidden_tooltip: '禁用', // 操作提示
    public_show_permission_tooltip: '查看权限',
    public_apply_permission_tooltip: '申请权限',
    public_fast_access_tooltip: '快速登录',
    public_Team_Administrator: '团队管理员',
    public_Full_screen_Mode: '全屏查看',
    public_Full_Exit_screen_Mode: '退出全屏',
    public_copy_tooltip: '复制',
    public_show_log_tooltip: '查看日志',
    public_show_tooltip: '查看',

    // 个人中心
    personal_your_team: '您的团队',
    personal_logout_text: '确定要退出系统吗?',
    personal_user_info: '基本信息',
    personal_user_id: '用户ID',
    personal_user_username: '用户名',
    personal_user_email: '邮箱',
    personal_user_truename: '真实姓名',
    personal_user_phone: '手机号',
    personal_password_manage: '密码管理',
    personal_password: '账号密码',
    personal_password_original: '原密码',
    personal_password_new: '新密码',
    personal_password_confirm: '确认新密码',
    personal_password_changed: '密码修改成功! 请重新登录系统!',
    personal_Notice_board: '站内信',
    personal_Personal: '个人中心',
    personal_Help_Center: '帮助中心',
    personal_check_team: '您已切换至',
    personal_check_team_point: '，正在获取数据...', //Data acquisition in progress.

    // 账号
    account_industry: '行业',
    account_customer_list: '客户列表',
    account_all_ad_account: '全部账号',
    account_Assigned: '被分配账号',
    account_not_Assigned: '未分配账号',
    account_connect: '关联账号',
    account_add_to_new_customer: '添加到新客户',
    account_no_connect_account: '没有找到已关联的账号',
    account_no_connect_account_point: '您需要关联至少一个广告账号，才能在MAPS平台中查看广告投放数据',
    account_no_ad_account: '没有找到广告账号',
    account_no_ad_account_point: '请前往“未分配账号”列表，申请广告账号权限',
    account_no_apply_account: '暂无可申请的广告账号',
    account_no_apply_account_point: '您可联系管理员咨询',
    account_batch_apply_permission: '批量申请账号权限',
    account_add_to_: '添加到',
    account_delete_confirm: '您确定要删除账号？',
    account_delete_point_1: '删除后，系统将不再展示这些账号下的所有数据。',
    account_delete_point_2: '您可以重新关联这些账号。',
    account_delete_this: {
      confirm: '确定要删除该账号？',
      point_1: '删除后，系统将不再同步和展示该账号下的所有数据。',
      point_2: '团队管理员可以重新关联该账号。'
    },
    account_delete_these: {
      confirm: '确定要删除这些账号？',
      point_1: '删除后，系统将不再同步和展示这些账号下的所有数据。',
      point_2: '团队管理员可以重新关联这些账号。'
    },
    account_open_these: {
      confirm: '确认要启用这些账号吗？',
      point_1: '系统将同步和展示所选账号的广告数据。',
      point_2: '您将可看到此账号下的广告数据。',
    },
    account_open_this: {
      confirm: '确定要启用此账号吗？',
      point_1: '系统将同步和展示所选账号的广告数据。',
      point_2: '您将可看到此账号下的广告数据。',
    },
    account_close_these: {
      confirm: '确认要禁用这些账号吗？',
      point_1: '系统将不再展示这些账号下的所有广告数据。',
      point_2: '您将无法看到这些账号下的广告数据。',
    },
    account_close_this: {
      confirm: '确定要禁用该账号吗？',
      point_1: '系统将不再展示该账号下的所有广告数据。',
      point_2: '您将无法看到此账号下的广告数据。',
    },
    account_all_table_config: {
      status: '状态',
      platform: '平台',
      account_name: '账号名称',
      account_id: '账号 ID',
      client: '客户',
      sync_time: '同步时间',
      owner: '账号所属人'
    },
    account_distribute_table_config: {
      status: '状态',
      platform: '平台',
      account_name: '账号名称',
      account_id: '账号 ID',
      client: '客户',
      sync_time: '同步时间',
      owner: '账号所属人'
    },
    account_undistribute_table_config: {
      status: '申请状态',
      platform: '平台',
      account_name: '账号名称',
      account_id: '账号 ID',
      client: '客户',
      apply_time: '申请时间',
      owner: '账号所属人'
    },
    account_not_sync: '未同步',
    account_syncing: '同步中...',
    account_permission_title: '账号权限',
    account_limit_expired: '若超过时间，成员需重新申请账号权限',
    account_Accessible_time: '可访问时间',
    account_apply_permission_confirm: '确认向管理员申请以下账号的访问权限吗？',
    account_apply_permission_point: '系统将向管理员发送申请，您需要等待管理员确认',
    account_name: '广告账号名称',
    account_id: '广告账号ID',
    account_owner: '账号所属人',
    account_apply_permission_title: '申请账号权限',
    account_Create_new_client: '创建新客户',
    account_Select_from_existing_clients: '选择已有客户', //Select from existing clients
    account_note: "<span style='color: #ff3333'>*注意：</span>请在下一步<span style='color: #ff3333'>勾选</span>“允许服务商管理敏感物料（当前授权涉及 素材预览图、销售线索、广告评论的数据访问），勾选即表明已同意《敏感物料授权书》。”",
    account_connect_new_1: '请关联',
    account_connect_new_2: '平台账号',
    account_create_choose_customer: '创建/选择客户',
    account_Select_ad_platform: '选择关联账号平台',
    account_confirm_want_connect: '请确认要关联的账号',
    account_search_name_id: '搜索账号名称/ID',
    account_Connection_failed: '无法关联', //Connection failed
    account_Connection_failed_point: '以下账号已被其他MAPS用户绑定，您无法关联这些账号', //Connection failed
    account_sync_failed_point: '以下账号数据同步失败，您可联系管理员处理。',
    account_delete_customer_title: '删除客户', //Delete client
    account_delete_customer_confirm: '确定要删除该客户吗？',
    account_delete_customer_accounts_confirm: '该客户下有广告账号。是否确定删除客户？<br><span style="font-size: 12px;color: #999;font-weight: 500">此操作仅删除客户，不删除客户下的所有账号。 <br>一个账号必须属于一个客户，请为这些账号指派一个新的客户。 <br>如果您要删除该客户下的所有广告账号，则需要在本页右侧的账号列表操作删除。</span>',
    account_try_add_new_customer: '尝试创建第一个客户', //Try to create your first client.
    account_add_customer_title: '新建客户',
    account_edit_customer_title: '编辑客户',
    account_can_not_see: '管理员为您分配的账号权限还未生效，生效时间：', //You are out of accessible hours and temporarily unable to see the data under these ad accounts. The accessible time is
    account_auth_point: '数据同步中，由于数据量比较大，可能需要一些时间，请您稍后在账号列表中查看同步状态。',
    account_syncing_not_handle: '账号同步中，暂时无法操作。',
    account_connected: '已关联',
    account_fail: '同步失败',
    account_fail_point: '以下广告账号同步失败，请稍后重试或联系管理员',

    // 团队
    team_apply_join_title: '申请加入团队',
    team_apply_join: '申请加入',
    team_applying: '申请中',
    team_joined: '已加入',
    team_leave: '退出团队',
    team_member_list: '成员列表', //All Members
    team_Add_Members: '邀请成员',
    team_all_member: '全部成员',
    team_permission_Assigned: '已分配',
    team_permission_not_assigned: '未分配',
    team_member_status: '成员状态',
    team_search_by_name: '搜索名称',
    team_member_table_config: {
      operate: '操作',
      status: '状态',
      username: '成员用户名',
      truename: '真实姓名',
      email: '登录邮箱',
      permission: '成员权限',
      logintime: '最近一次登录时间',
      identity: '身份',
      remark: '备注',
    },
    team_Administrator: '管理员',
    team_leave_confirm: '确定要退出团队吗？您将不再能看到团队内所有广告账号数据，但您可以申请再次加入此团队。',
    team_can_not_invite: '您未关联广告账号，无法添加成员。请先前往【账号管理】页面关联广告账号。',
    team_delate_member_this: {
      confirm: '确定要该删除成员吗？',
      point: '该成员将无法再看到您分配的账号数据。'
    },
    team_delate_member_these: {
      confirm: '确定要删除这些成员吗？',
      point: '成员将无法再看到您分配的账号数据。'
    },
    team_open_member_this: {
      confirm: '确定要启用成员吗？',
      point: '该成员将可以看到您分配的账号数据。'
    },
    team_open_member_these: {
      confirm: '确定要启用成员吗？',
      point: '这些成员将可以看到您分配的账号数据。'
    },
    team_close_member_this: {
      confirm: '确定要禁用成员吗？',
      point: '确认禁用后，该成员将无法看到您分配的账号数据。'
    },
    team_close_member_these: {
      confirm: '确定要禁用成员吗？',
      point: '这些成员将无法看到您分配的账号数据。'
    },
    team_member_info: '成员信息',
    team_member_email: '成员邮箱:',
    team_maps_login_email: '请输入成员在MAPS平台的注册邮箱，邮箱与邮箱之间用逗号隔开。',
    team_Accessible_time: '截止日期:',
    team_time_Unlimited: '不限制',
    team_time_Custom: '限制',
    team_time_Custom_point: '<p style="text-align: left;">表示在这个时间段内，成员可以查看您分配的广告账号数据。超过设置的时间范围，系统自动禁用成员，该成员将无法查看您分配的广告账号数据。</p>',
    team_Assign_ad_accounts: '分配广告账号',
    team_Assign_permissions: '分配权限',
    team_remark: '备注（选填）', //Note (Optional)
    team_edit_member: '编辑成员',
    team_select_account_to_member: '未给用户分配账号！',
    team_ad_account: '广告账号',
    team_search_account_name_id: '搜索账户名称/ID',
    team_edit_name: '修改团队名称', //Edit Team Name
    team_delete_member: '删除成员',
    team_permission_point: '团队管理员为您分配的账号权限如下：',

    // 消息
    message_subscribe_title: '订阅消息',
    message_type: '消息类型',
    message_Notice_board: '站内信',
    message_email: '邮箱',
    message_System_Notifications: '系统通知',
    message_System_Notifications_point: '团队申请/退出、权限申请/变更、账号信息修改通知',
    message_Automated_Rules: '触发规则提醒',
    message_Automated_Rules_point: '广告触发智能规则时的通知',
    message_Application_Notifications: '申请及审批',
    message_member: '成员',
    message_member_unit: '人',
    message_search_members: '搜索用户名/邮箱',
    message_email_open_point: '确定要启用邮箱通知吗？系统将会推送系统消息（团队申请、权限申请）到您的登录邮箱。',
    message_email_close_point: '确定要禁用邮箱通知吗？系统将不会推送系统消息（团队申请、权限申请）到您的登录邮箱。',
    message_Mark_as_Read: '设为已读',
    message_Search_by_keywords: '搜索关键词',
    message_Mark_All_as_Read: '全部标为已读',
    message_Request_to_join_your_team: '团队申请处理',
    message_join_team_applying: ',点击同意，您可前往【系统管理】-【团队管理】为其分配权限。点击拒绝，则表示您拒绝其加入您的团队。',
    message_join_team_agreed: '您<span style="color: #ff0000">已同意</span>该成员加入团队，请前往【系统管理】＞【团队管理】查看成员详细信息。',
    message_join_team_Rejected: '您<span style="color: #ff0000">已拒绝</span>该成员加入团队。',
    message_Account_permission_request: '权限申请处理',
    message_permission_applying: '，请为其分配权限或拒绝。<br/>',
    message_permission_agreed: '您<span style="color: #ff0000;display: inline;">已同意</span>过此条申请，您为该成员分配的权限如下。您也可前往【系统管理】＞【团队管理】查看成员详细信息。',
    message_permission_Rejected: '您<span style="color: #ff0000;display: inline;">已拒绝</span>为该成员分配账号权限。您可前往【系统管理】＞【团队管理】查看成员详细信息。',
    message_Notice_board_tittle: '站内信消息',
    message_table_config: {
      status: '状态',
      platform: '平台',
      msg: '消息详情',
      type_label: '消息类型',
      ctime: '通知时间',
    },

    // 客户报表
    report_Clients_Report: '客户报表',
    report_Updated_time: '数据更新时间：',
    report_Updated_time_point: '本表格数据每30分钟更新一次。', //Table data updated every 15 minutes.
    report_Percentage_analysis: '占比分析',
    report_Trend_analysis: '趋势分析',
    report_Detailed_data: '详细数据',
    report_View_daily_data: '分日查看',
    report_View_hourly_data: '分时查看',
    report_Customize_Columns: '自定义列',
    report_show_zero: '显示全部值为0的数据',
    report_not_show_zero: '不显示全部值为0的数据',
    report_Export_as_Excel: '下载表格',
    report_Save_as_preset: '保存为常用列',
    report_Show_total_row: '显示总计',
    report_Search_by_field_name: '搜索字段名称',
    report_data_type: '数据类型',
    report_Compare: '对比',
    report_hour: '时',
    report_day: '日',
    report_week: '周',
    report_month: '月',
    report_year: '年',
    report_analysis: '占比',
    report_platform_analysis: '平台占比',
    report_Effectiveness_Report: '效果报表',
    report_effect_search: '搜索名称/ID',
    report_download_zip_title: '客户报表占比分析图',
    report_Donut_Chart_Client_Report: '客户报表占比分析图-客户维度',
    report_platform_Chart_Client_Report: '客户报表占比分析图-平台维度',
    report_Trend_Chart_Client_Report: '客户报表趋势分析图',
    report_No_data_during_selected_date_range: '没有找到相关数据',
    report_nums: '项',
    report_download_table_offline_excel: '您的数据正在后台导出，稍后将发送到指定邮箱。',
    report_download_table_local_excel: '您的数据正在导出，请稍后。',
    report_forbidden_seven: '趋势分析图中不允许查看超过7天的分时数据。',
    report_Clients_Report_Detailed_data: '客户报表-详细数据表',
    report_Effectiveness_Report_Detailed_data: '效果报表-详细数据表',
    report_has_this_field: '含此字段',
    report_time_line_report_label: '上报',
    report_time_line_report_desc: '将转化数据记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。',
    report_time_line_IMP_label: '播放',
    report_time_line_IMP_desc: '在转化行为发生（或回传）后，将转化行为匹配到过去X天内的展示扣费的时间上。 暂不支持查看当日数据。<br><br>巨量引擎：7天内<br>腾讯广告：30天内<br>微信广告：无此字段<br><br>例如：广告在8月20日展示给用户，此时广告花费10元，用户点击广告后于8月23日产生1笔购买，则8月23日的购买行为会展示在8月20日，8月23日没有转化数。',
    report_download_title: '下载数据',
    report_download_data_type: '数据格式：',
    report_download_Source_data: '源数据',
    report_download_Keep_format: '保留格式',
    report_download_Export_mode: '下载方式：',
    report_download_Real_time_export: '实时下载',
    report_download_Offline_export: '离线下载',
    report_download_Recipients: '邮箱地址：',
    report_download_Recipients_placeholder: '最多填写20个邮箱，邮箱和邮箱之间用逗号隔开',
    report_download_max: '提示：本次下载数据量较大，无法实时导出，请使用离线下载。系统成功导出后会将Excel文件发送到指定邮箱。',
    report_download_min: '提示：本次下载数据量较少，建议使用实时下载，直接保存Excel文件到本地。',
    report_download_source_tooltip: '下载内容会保留字段所有小数位，不展示千分符。<br><br>如API返回的下单ROI是6位小数，那么下载的Excel表中的下单ROI也将展示6位小数。',
    report_download_format_tooltip: '下载内容会保留页面中展示的数字格式，包括小数位、千分符。',
    report_download_loading_text: 'MAPS拼命加载中，请稍等...',//请稍等，正在为您查询...
    report_download_loading_forbidden: '本次下载数据量过大，无法下载！请缩小查询范围或分时段下载！',
    report_search_point_1: 'MAPS的“客户报表”汇总了多个平台的广告数据，部分字段在不同平台的计算公式不同。因此在您筛选查看多个平台的数据时，以下字段的数据将不会展示。',
    report_search_point_2: '建议您筛选单个平台查看这些数据：',
    report_search_point_3: '深度转化率（上报）、深度转化率（播放）、下单单价、下单ROI',

    // 报表订阅
    report_subscribe_Schedule_Email: '定时任务',
    report_subscribe_Add_Task: '新建任务',
    report_subscribe_Report_type: '报表类型',
    report_subscribe_Report_type_all: '全部报表',
    report_subscribe_Running_status: '运行状态',
    report_subscribe_Running: '运行中',
    report_subscribe_Has_not_started: '未开始',
    report_subscribe_Search_by_Email_subject: '搜索邮件标题',
    report_subscribe_Send_manually: '手动发送',
    report_subscribe_View_run_log: '查看日志',
    report_subscribe_task_table: {
      status: "状态",
      operate: "操作",
      running_status: '运行状态',
      email_title: '邮件标题',
      report_type: '报表类型',
      data_during: '数据范围',
      last_running: '上次运行时间',
      next_running: '下次运行时间',
      receive_email: '接收邮箱',
      send_period: '发送周期',
      start_date: '开始日期',
    },
    report_subscribe_Delete_task: '删除任务',
    report_delete_task_this: {
      confirm: '确定删除这条定时邮件任务吗？',
      point: '该条任务将从列表中消失。'
    },
    report_delete_task_these: {
      confirm: '确定删除这些定时邮件任务吗？',
      point: '这些任务将从列表中消失。'
    },
    report_open_task_this: {
      confirm: '确定启用这条定时邮件任务吗？',
      point: '系统将根据您的设置自动发送报表邮件。'
    },
    report_open_task_these: {
      confirm: '确定启用这些定时邮件任务吗？',
      point: '系统将根据您的设置自动发送报表邮件。'
    },
    report_close_task_this: {
      confirm: '确定禁用这条定时邮件任务吗？',
      point: '该定时任务将不会被系统执行。'
    },
    report_close_task_these: {
      confirm: '确定禁用这些定时邮件任务吗？',
      point: '这些定时任务将不会被系统执行。'
    },
    report_subscribe_Send_email_manually: '手动发送邮件',
    report_subscribe_Send_email: {
      confirm: '确定要手动发送该定时邮件吗？',
      point: '系统将立即执行此任务。'
    },
    report_subscribe_log_title: '邮件日志',
    report_subscribe_Results: {
      title: '运行结果',
      all: '全部结果',
      success: '发送成功',
      fail: '发送失败',
    },
    report_subscribe_log_table: {
      time: '运行时间',
      result: '运行结果'
    },
    report_subscribe_list_empty_point: '请添加定时发送报表任务',
    // 任务新建编辑
    report_task_drawer_add_title: '创建定时邮件任务',
    report_task_drawer_edit_title: '编辑定时邮件任务',
    report_task_Email_basic_settings: '邮件基本信息',
    report_task_Email_subject_label: '邮件标题:',
    report_task_Email_subject_placeholder: '请输入标题，系统将发送该标题的邮件',
    report_task_Email_text_label: '邮件正文:（选填）',
    report_task_Email_text_placeholder: '选填，系统默认以“报表类型（口径）”+“报表维度”+“数据范围”为正文内容发送邮件,如 ”客户报表（上报）、效果报表（上报），报表维度：分日，数据范围：当天。“',
    report_task_Report_settings: '报表信息设置',
    report_task_Report_type_label: '报表类型:',
    report_task_Report_Dimension_label: '报表维度:',
    report_task_View_daily_data: '分日查看',
    report_task_Date_range_label: '数据范围',
    report_task_customize_time_point: '不包含当天，如系统在2020年9月30日发送邮件，设定的数据范围是近7天，那么系统会发送9月23日至9月29日这7天的数据。',
    report_task_customize_time_text_left: '近',
    report_task_customize_time_text_right: '天',
    report_task_Choose_fields_label: '字段选择:',
    report_task_Choose_fields_point: '系统将按照您在各个报表页面中保存的最新常用自定义列来导出数据。',
    report_task_Default: '系统默认',
    report_task_Email_delivery_settings: '邮件发送设置',
    report_task_Frequency_label: '重复周期',
    report_task_Repeat_interval_label: '间隔小时',
    report_task_Start_End_Time_label: '起止时间:',
    report_task_Start_Time_label: '起始时间',
    report_task_End_Time_label: '结束时间',
    report_task_Time_range_label: '选择时间范围',
    report_task_Delivery_time_label: '发送时间',
    report_task_Delivery_time_placeholder: '选择时间点',
    report_task_Delivery_date_label: '发送日期',
    report_task_start_date_label: '开始日期:',
    report_task_Select_date_placeholder: '选择日期',
    report_task_start_date_tooltip: '即这条定时任务启用生效的时间。',
    report_task_Recipients: '邮件接收人',
    report_task_Recipients_point: '请输入邮箱地址，可一次性添加多个邮箱，邮箱与邮箱之间用逗号隔开',
    report_task_Recipients_add: '确 认',
    report_task_Recipients_error: '请点击右侧的【确定】按钮，添加接收人',
    report_task_only_month: '仅展示最近一个月的运行日志',
    report_task_confirm_save_edit: '是否保存已填写的内容？',

    // 帮助中心
    help_center_base_title: '快速入门',
    help_center_advanced_title: '进阶教程',
    help_center_point: '您是否需要以下帮助？',
    help_center_no_more: '暂无更多',
    help_center_submit_request: '我要反馈',
    help_center_request_point: '为了更好地处理您的问题，请详细填写以下内容',
    help_center_request_title: '反馈标题',
    help_center_request_desc: '问题描述',
    help_center_request_mobile: '联系电话',

    // 智能规则
    intelligent_rule_list: '规则列表',
    intelligent_rule_log_list: '运行日志',
    intelligent_rule_create_new: '创建新规则', //Create Rule
    intelligent_rule_table_config: {
      status: '状态',
      action: '操作',
      rule_name: '规则名称',
      detail: '规则详情',
      creator: '创建人',
      effective: '有效期',
      Last_Edited: '最近修改',
    },
    intelligent_rule_list_empty: "暂无规则",
    intelligent_rule_delete_this: {
      confirm: '确定要删除该规则吗？',
      point: '规则将从列表中消失。'
    },
    intelligent_rule_delete_these: {
      confirm: '确定要删除这些规则吗？',
      point: '规则将从列表中消失。'
    },
    intelligent_rule_open_this: {
      confirm: '确定要启用该规则吗？',
      point: '在规则的有效期内，您将可以应用该规则。'
    },
    intelligent_rule_open_these: {
      confirm: '确定要启用这些规则吗？',
      point: '在规则的有效期内，您将可以应用这些规则。'
    },
    intelligent_rule_close_this: {
      confirm: '确定要禁用该规则吗？',
      point: '此条规则将不再生效。'
    },
    intelligent_rule_close_these: {
      confirm: '确定要禁用这些规则吗？',
      point: '这些规则将不再生效。'
    },
    intelligent_rule_detail_title: '规则详情', //弹框
    intelligent_rule_detail_config: {
      Basic_Settings: '规则基本信息',
      rule_name: '规则名称',
      platform: '规则应用平台',
      range: '规则应用维度',
      check_time: '规则检查时间',
      open_condition: '触发条件',
      remove_condition: '排除条件',
      operation: '系统执行操作',
      Rule_Execution_Targets: '规则运行对象'
    },
    intelligent_rule_create_collapse: {
      title_1: '选择规则模板', //Choose a rule template
      title_2: '新建智能规则',
      title_3: '设置规则触发条件',
      title_4: '设置规则排除条件（选填）',
      title_5: '设置执行操作',
      title_6: '设置执行时段&频率',
    },
    intelligent_rule_create_model: {
      All: '全部模板',
      Budget: '预算控制',
      Quality: '质量监控',
    },
    intelligent_rule_create_form: {
      name: '规则名称：',
      platform: '应用平台：',
      range: '应用维度：',
      validity: '有效期：',
      action: '操作',
      Check_Schedule: '检查时段：',
      Frequency: '检查频率：',
    },
    intelligent_rule_Condition: '条件',
    intelligent_rule_Choose_metric: '选择指标',
    intelligent_rule_Add_a_condition: '添加条件',
    intelligent_rule_Choose_action: '选择操作',
    intelligent_rule_Set_by_platform: '分平台设置',
    intelligent_rule_Custom_point: '自定义时段时，系统将累加一天内所有选择的时段进行检查。如选择星期一的8:00-10:00、19:00-24:00，频率设置为每3小时检查一次，则系统将分别在8点、20点、23点检查，剩下的23点-24点这一小时系统将不再检查。',
    intelligent_rule_interval_disabled_point: '一天内检查时段的总和必须大于检查频率。',
    intelligent_rule_Create_Automated_Rule_title: "创建智能规则",
    intelligent_rule_edit_Automated_Rule_title: "编辑智能规则",
    intelligent_rule_copy_Automated_Rule_title: "复制智能规则",
    intelligent_rule_quit_title: '提醒', //Reminder
    intelligent_rule_quit_point: '您还有未保存的内容，确定要退出吗？',
    intelligent_rule_condition_point: '填写内容不符合格式要求，请检查！',
    intelligent_rule_hour_week_point: '请用鼠标点选时间段。', //Select timeslots by clicking and dragging.
    intelligent_rule_delivery_campaign: '规则应用维度为Campaign时，“唯一有效”指这条Campaign是所属账号下唯一开启的。',
    intelligent_rule_delivery_ad: '规则应用维度为Ad时，“唯一投放中”指这条Ad是所属Campaign下唯一正在投放中的。',
    intelligent_rule_search: '搜索规则名称/ID/创建人',
    intelligent_rule_remove_repeat: '排除条件中存在与触发条件相同的内容，请修改！',
    intelligent_rule_name_placeholder: '请输入规则具体名称',
    intelligent_rule_save_check_time: '请拖拽选择检查时间！',
    intelligent_rule_effective: '至',

    // 规则任务
    intelligent_task_delete_this: {
      confirm: '确定删除该任务吗？',
      point: '系统将不再执行该任务下的所有规则，任务也将从列表中消失。'
    },
    intelligent_task_delete_these: {
      confirm: '确定删除这些任务吗？',
      point: '系统将不再执行这些任务下的所有规则，任务也将从列表中消失。'
    },
    intelligent_task_open_this: {
      confirm: '确定启用该任务吗？',
      point: '当任务被添加到在Campaign/Ad上时，系统将执行该任务下的所有规则。'
    },
    intelligent_task_open_these: {
      confirm: '确定启用这些任务吗？',
      point: '当任务被添加到在Campaign/Ad上时，系统将执行这些任务下的所有规则。'
    },
    intelligent_task_close_this: {
      confirm: '确定要禁用该任务吗？',
      point: '系统将不再执行该任务下的规则。'
    },
    intelligent_task_close_these: {
      confirm: '确定要禁用这些任务吗？',
      point: '系统将不再执行这些任务下的规则。'
    },
    intelligent_task_create_level_point: '响应层级指规则执行对象所在的层级<br>响应范围指规则具体的执行对象<br><br>巨量引擎平台：Campaign=广告组、Ad=计划',
    intelligent_task_create_range_point: '当规则中包含范围条件时，用户需选择计算范围。所有范围不会跨账号进行计算。<br><br>巨量引擎平台：Campaign=广告组、Ad=计划',

    //正则报错
    reg_not_quotes: '不允许输入单双引号。',
    reg_login_username_required: '邮箱地址或用户名不能为空。',
    reg_email_required: '邮箱地址不能为空。',
    reg_email_error_message: '邮箱格式错误！需以@hylink.com或@hylinkad.com或@pagechoice.com结尾。',
    reg_is_email_error_message: '请输入正确的邮箱地址。',
    reg_username_required: '用户名不能为空。',
    reg_username_error_message1: '用户名格式错误！2-20个字符。',
    reg_username_error_message2: '仅允许中文、英文大小写字母、空格，2-20个字符',
    reg_user_name_length: '2-20个字符。',
    reg_password_required: '用户密码不能为空。',
    reg_password_rule_error: '8-20个字符，需包含英文字母、数字、特殊字符!-   +*@#$ .~中的至少2种组合。',
    reg_Original_password_required: '原密码不能为空。',
    reg_confirm_password_required: '确认密码不能为空。',
    reg_confirm_password_rule_error: '两次密码输入不一致。',
    reg_vcode_required: '验证码不能为空。',
    reg_vcode_length: '请输入正确的4位验证码。',
    reg_trueName_required: '真实姓名不能为空。',
    reg_trueName_rule_error: '仅允许中文、英文大小写字母，2-15个字符。',
    reg_trueName_length: '2-15个字符。',
    reg_phone_required: '手机号不能为空。',
    reg_phone_rule_error: '输入手机号不合法。',
    reg_phone_rule_error_2: '请填写有效的手机号码！',
    reg_customer_name_required: '客户名称不能为空。',
    reg_team_name_required: '团队名称不能为空。2-20个字符',
    reg_time_required: '请选择日期',
    reg_task_least_one_recipient: '请填写至少1个邮件接收人！',
    reg_task_send_up_to_20_recipient: '邮件接收人不允许超过20个！',
    reg_task_number_of_days: '请填写天数！',
    reg_task_between_1_and_100: '仅允许填写1-100（包含1和100）之间的正整数！',
    reg_task_email_subject_required: '必须填写邮件标题！',
    reg_task_report_type_required: '必须勾选报表类型！',
    reg_task_delivery_date_required: '请选择发送日期！',
    reg_task_start_date_required: '请选择开始日期！',
    reg_customer_industry_required: '请选择行业！',
    reg_time_not_equal: '开始时间不能等于结束时间！',
    reg_title_required: '必须填写标题',
    reg_desc_required: '必须填写问题描述',
    reg_percent_error: '只允许输入0-100的整数。',
    reg_2_places: '最多允许2位小数。', //Up to 2 decimal places
    reg_1000_9999999: '只允许输入1000至9999999.99的数字。',
    reg_50_1000000: '只允许输入50至1000000的数字。',
    reg_100_1000000: '只允许输入100至1000000的数字。',
    reg_rule_name_required: '必须填写名称！',
    reg_rule_platform_required: '必须选择平台！',
    reg_rule_date_required: '必须选择开始和结束时间！',
    reg_rule_condition_required: '条件项不允许为空！',
    reg_rule_operate_required: '执行操作不允许为空！',
    reg_rule_condition_1_100: '1-100的整数。',
    reg_rule_condition_0_9999999: '0-9999999.99的数字。',
    reg_rule_condition_0_10000: '0-10000的整数。',
    reg_rule_condition_0_999999999: '0-999999999的整数。',
  },
  ...zhLocale
}

export default zh
