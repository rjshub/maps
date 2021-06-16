import enLocale from 'element-ui/lib/locale/lang/en';

const en = {
  lang: {
    // 版权
    copyright: ' Hylink. All Rights Reserved',
    not_chrome: 'We highly recommend using the latest Google Chrome browser for the best and seamless experience across MAPS.', //MAPS： 浏览器Chrome对产品的兼容性及浏览体验更好，建议您在最新版本的Chrome上运行MAPS。
    sync_fail_point: 'For these ad accounts, advertising data may not be up to date. Please contact the administrator.', //以下账号数据同步失败，您可联系管理员处理。
    login_expired: 'Login information has expired, please relogin.', //登录信息过期，请重新登录。
    // 登录页
    login_no_account: "Don't have an account ?", // 没有账号 ? 立即
    login_has_account: 'Already registered ?', //已有账号？
    login_sign_in: 'Login', //立即登录
    login_sign_up: 'Sign up', //注册
    login_sign_in_form_title: 'Sign in to your account', //账号登录
    login_forget_password: 'Forgot your password?', //忘记密码？
    login_button_login: 'Login', //登 录
    login_button_logining: 'Please wait ...', //登录中...
    login_button_logout: 'Log out', //退出登录
    login_email_verified: 'Email verified successful！Please log in.', //邮箱验证成功，请登录！
    login_sign_up_step1_title1: 'Get started with MAPS',
    login_sign_up_step1_title2: "A one-stop management platform for all your ads, ",
    login_sign_up_step2_title1: 'Verify the registered email', //验证你的注册邮箱
    login_sign_up_step2_title2: 'An Email has been sent to ',
    login_sign_up_step2_title3: '. <br/> It contains a link you must click to verify your registered Email within <span style="color: #0bb3b3">10 minutes</span>.',
    login_sign_up_step1_button: 'Submit', //立即注册
    login_send_email_again: 'No email received,send again.', //未收到邮件，点击再次发送
    login_forget_password_step1_title1: 'Get back your password', //找回密码
    login_forget_password_step1_title2: 'Back to', //想起来了，返回
    login_forget_password_step2_title2: '. <br/> It contains a link you must click to reset your password within <span style="color: #0bb3b3">10 minutes</span>.', //发送了一封确认邮件您需要在10分钟内点击邮件内的链接进入重设密码。
    login_forget_password_step1_button: 'Reset Password', //重置密码
    login_forget_password_step3_button: 'Change Password', //确认更换密码
    login_password_change_success: 'Password changed successfully.', //密码修改成功，请重新登录。
    login_choose_team: 'Please select a team', //选择团队
    login_apply_join_team: 'Request to join other teams', //申请加入其他团队
    login_can_not_select_team: 'Your account has been disabled by the administrator of this team and you are temporarily unable to visit the team. You can contact the team administrator ', //您的账号已被该团队管理员禁用，暂时无法访问该团队。您可联系团队管理员

    // 导航
    layout_system_nav: 'SETTINGS', //系统管理
    layout_system_account_nav: 'Ad Accounts', //账号管理
    layout_system_team_nav: 'Team', //团队管理
    layout_system_message_subscribe_nav: 'Notifications Settings', //订阅消息
    layout_system_message_all_nav: 'All Notifications', //全部消息
    layout_system_message_nav: 'Notifications', //消息中心
    layout_system_root_nav: 'Users', //系统账号
    layout_report_nav: 'REPORT', //数据中心
    layout_report_customer_nav: 'Clients Report', //客户报表
    layout_report_effect_nav: 'Effectiveness Report', //效果报表
    layout_report_subscribe_nav: 'Subscribe', //报表订阅
    layout_setting_nav: 'TOOLS', //辅助工具
    layout_Rules_Management_nav: 'Rules Management', //规则管理
    layout_Automated_Rules_nav: 'Automated Rules', //智能规则
    layout_Rule_Tasks_nav: 'Rule Tasks', //规则任务

    // 输入框，表单
    public_login_username_placeholder: 'Email address / User Name', //请输入登录邮箱或用户名
    public_password_placeholder: 'Password', //请输入登录密码
    public_confirm_password_placeholder: 'Confirm password',
    public_new_password_placeholder: 'New password', //请输入新密码
    public_new_confirm_password_placeholder: 'Confirm password', //请确认新密码
    public_vcode_placeholder: 'Verification Code', //验证码
    public_email_placeholder: 'Email Address', //请输入登录邮箱
    public_username_placeholder: 'Username',
    public_truename_placeholder: 'Full Name',
    public_phone_placeholder: 'Mobile Phone',
    public_team_search_placeholder: 'Search by Team name or ID or username of Team Administrator', //请输入团队名称、ID或团队管理员用户名搜索
    public_password_original_placeholder: 'Enter original password', //请输入原密码
    public_password_new_placeholder: 'Enter new password', //请输入新密码
    public_password_confirm_placeholder: 'Enter new password again', //请再输入一次新密码
    public_add_to_customer: 'Add To Client', //添加到客户
    public_platform_placeholder: 'Platform', //平台
    public_status_placeholder: 'Status', //状态
    public_customer_placeholder: 'Client', //客户
    public_account_client_owner_placeholder: 'Search by Ad accounts, Clients or Account owner', //搜索账号、客户、所属人
    public_new_customer_name: 'Enter new client name', //请输入新客户名称
    public_customer_name_placeholder: 'Client Name', //客户名称
    public_team_member_permission_placeholder: 'Permission', //成员权限
    public_select_customer_placeholder: 'Select Clients', //选择客户
    public_select_platform_placeholder: 'Select Platforms', //选择平台
    public_select_view_type_placeholder: 'Select View Type', //选择查看类型
    public_select_account_placeholder: 'Select Accounts', //选择账号
    public_select_objectives_placeholder: 'Select Objectives', //推广目的
    public_Enter_client_name: 'Enter client name', //请输入客户名称
    public_Choose_an_industry_category: 'Choose an industry category', //请选择客户所属的行业

    public_expand: 'Expand', //展开
    public_collapse: 'Collapse', //收起
    public_all: 'All', //全部
    public_all_customer: 'All Clients', //全部客户
    public_all_type: 'All Types', //全部类型
    public_all_platform: 'All Platforms', //全部平台
    public_all_status: 'All Status', //全部状态
    public_Visible: 'Visible', //启用
    public_Invisible: 'Invisible', //禁用
    public_enable: 'Enable', // 启用 除账号管理之外使用
    public_disable: 'Disable', // 禁用
    public_apply: 'Apply', //Apply for申请
    public_Stateless: 'Stateless', //未申请
    public_Awaiting_response: 'Awaiting Response', //待确认
    public_Rejected: 'Rejected', //被拒绝
    public_Expired: 'Expired', //已过期
    public_Assigned: 'Assigned', //已分配
    public_Awaiting_assignment: 'Awaiting assignment', //未分配
    public_operate: 'Action', //操作
    public_parent_module: 'Parent Module', //一级模块
    public_child_module: 'Child Module', //二级模块
    public_permission: 'Permissions', //权限
    public_show_permission: 'Readable', //查看
    public_edit_permission: 'readable & writable', //编辑
    public_no_data: 'No data', //暂无数据
    public_detail: 'Detail', //详情
    public_start_time: 'Start Time', //开始日期
    public_end_time: 'End Time', //结束日期
    public_range_separator: '-', //至
    public_check_all: 'All', //全选
    public_checked: 'Selected', //已选
    public_clear_all: 'Clear', //清空
    public_read: 'Read', //已读
    public_unread: 'Unread', //未读
    public_Export_as_PNG: 'Export as PNG', //下载PNG
    public_Export_as_Excel: 'Export as Excel', //下载EXCEL
    public_not_select: 'Not select', //暂不选择
    public_See_All: 'See All', //查看全部
    public_money: 'CNY', //元
    public_Stay_tuned: 'Stay tuned', //敬请期待
    public_total: 'Total', //总计
    public_Average: 'Average', //平均值
    public_load_more: 'See More', //加载更多
    public_Monday: 'Monday', //星期一
    public_Tuesday: 'Tuesday', //星期二
    public_Wednesday: 'Wednesday', //星期三
    public_Thursday: 'Thursday', //星期四
    public_Friday: 'Friday', //星期五
    public_Saturday: 'Saturday', //星期六
    public_Sunday: 'Sunday', //星期日
    public_all_day: 'All day', //全天
    public_Custom: 'Custom', //自定义
    public_jl: 'Ocean Engine', //巨量引擎
    public_tx: 'Tencent Ads', //腾讯广告
    public_wx: 'WeChat Ads', //微信广告
    public_week_time: 'Day/Time', //星期/时间
    public_select: 'Please select', //请选择
    public_must: 'must', //必须 
    public_Attention: 'Attention', //请注意
    public_point: 'Point', //提示

    public_account_batch_before: 'You have to select ad account before you can make bulk changes.', //请先选择账号，再进行批量操作
    public_member_batch_before: 'You have to select member before you can make bulk changes.', //请先选择成员，再进行批量操作
    public_message_batch_before: 'You have to select notification before you can make bulk changes.', //请先选择账号，再进行批量操作
    public_Task_batch_before: 'You have to select task before you can make bulk changes.', //请先选择任务，再进行批量操作
    public_rule_batch_before: 'You have to select rules before you can make bulk changes.', //请先选择规则，再进行批量操作

    // 按钮
    public_button_join_team: 'Request to join', //申请加入团队
    public_button_confirm: 'OK', //确定
    public_button_cancel: 'Cancel', //取消
    public_button_save: 'Save', //保存
    public_button_apply: 'Apply', //申 请
    public_button_next: 'Next step', //下一步
    public_button_connect: 'Confirm', //确认关联
    public_button_close: 'Close', //关 闭
    public_button_Reject: 'Reject', //残忍拒绝
    public_button_Approve: 'Approve', //同意申请
    public_button_Reject_apply: 'Reject', //拒绝请求
    public_button_Approve_apply: 'Approve', //确认分配
    public_button_Got_it: 'Got it', //知道了
    public_button_submit: 'Submit', //提 交
    public_button_apply_to: 'Apply', //应 用

    // tooltip
    public_vcode_tooltip: 'Click to refresh the verification code', //点击图片换一张
    public_back_top: 'Back To Top', //返回顶部
    public_delete_tooltip: 'Disconnect', //删除
    public_delete_tooltip_x: 'Delete', //除账号管理
    public_edit_tooltip: 'Edit', //编辑
    public_open_tooltip: 'Make Visible', //启用
    public_forbidden_tooltip: 'Make Invisible', //禁用
    public_show_permission_tooltip: 'Show Permission', //查看权限
    public_apply_permission_tooltip: 'Apply Permission', //申请权限
    public_fast_access_tooltip: '', //快速登录
    public_Team_Administrator: 'Team Administrator', //团队管理员
    public_Full_screen_Mode: 'Full screen Mode', //全屏查看
    public_Full_Exit_screen_Mode: 'Exit', //退出全屏
    public_copy_tooltip: 'Copy', //复制
    public_show_log_tooltip: 'View Logs', //查看日志
    public_show_tooltip: 'View', //查看

    // 个人中心
    personal_your_team: 'Your Team', //您的团队
    personal_logout_text: 'Are you sure to log out?', //确定要退出系统吗?
    personal_user_info: 'User Info', //基本信息
    personal_user_id: 'User ID', //用户ID
    personal_user_username: 'User Name', //用户名
    personal_user_email: 'Email', //登录邮箱
    personal_user_truename: 'Full Name', //真实姓名
    personal_user_phone: 'Mobile phone', //手机号
    personal_password_manage: 'User Password', //密码管理
    personal_password: 'Password', //账号密码
    personal_password_original: 'Original password', //原密码
    personal_password_new: 'New password', //新密码
    personal_password_confirm: 'Confirm new password', //确认新密码
    personal_password_changed: 'Reset Password successful！Please login again!', //密码修改成功! 请重新登录系统!
    personal_Notice_board: 'Notice board', //站内信
    personal_Personal: 'Personal', //个人中心
    personal_Help_Center: 'Help',
    personal_check_team: 'You have switched to ', //您已切换至
    personal_check_team_point: '. Data acquisition in progress...', //，正在获取数据...

    // 账号
    account_industry: 'Industry', //行业
    account_customer_list: 'Clients', //客户列表
    account_all_ad_account: 'All Ad Accounts', //全部账号
    account_Assigned: 'Assigned Accounts', //被分配账号
    account_not_Assigned: 'Not Assigned Accounts', //未分配账号
    account_connect: 'Connect', //关联账号
    account_add_to_new_customer: 'Add to new client', //添加到新客户
    account_no_connect_account: 'No Ad Accounts found.', //没有找到已关联的账号
    account_no_connect_account_point: 'Please connect at least one ad account to see the related ad performance data on MAPS.', //您需要关联至少一个广告账号，才能在MAPS平台中查看广告投放数据
    account_no_ad_account: 'No Ad Accounts found.', //没有找到广告账号
    account_no_ad_account_point: 'Please go to "Not Assigned Accounts" list to apply for account permissions.', //请前往“未分配账号”列表，申请广告账号权限
    account_no_apply_account: 'No ad account available', //暂无可申请的广告账号
    account_no_apply_account_point: 'You could contact the administrator for help.', //您可联系管理员咨询
    account_batch_apply_permission: 'Sending request in batches', //批量申请账号权限
    account_add_to_: 'Add To ', //添加到
    account_delete_confirm: 'Are you sure you want to disconnect these ad accounts?', //您确定要删除账号？
    account_delete_point_1: 'The system will no longer display all data under these accounts. ', //删除后，系统将不再展示这些账号下的所有数据。
    account_delete_point_2: 'You can still reconnect these accounts.', //您可以重新关联这些账号。
    account_delete_this: {
      confirm: 'Are you sure you want to disconnect this ad account?', //确定要删除该账号？
      point_1: 'The system will no longer display and sync all data under this account.', //删除后，系统将不再展示该账号下的所有数据。
      point_2: 'Team administrator can still reconnect these accounts.' //团队管理员可以重新关联该账号。
    },
    account_delete_these: {
      confirm: 'Are you sure you want to disconnect these ad accounts?', //确定要删除这些账号？
      point_1: 'The system will no longer display and sync all data under these accounts.', //删除后，系统将不再展示这些账号下的所有数据。
      point_2: 'Team administrator can still reconnect these accounts.' //团队管理员可以重新关联这些账号。
    },
    account_open_these: {
      confirm: 'Are you sure you want to enable these accounts?', //确认要启用这些账号吗？
      point_1: 'The system will start syncing the data of the selected account and display them.', //系统将开始同步所选账号的广告数据。
      point_2: 'You will be able to see the ad data under these accounts.', //您将可看到此账号下的广告数据。
    },
    account_open_this: {
      confirm: 'Are you sure you want to enable this account?', //确定要启用此账号吗？
      point_1: 'The system will start syncing the data of this account.  ', //系统将开始同步所选账号的广告数据。
      point_2: 'You will be able to see the ad data under this account.', //您将可看到此账号下的广告数据。
    },
    account_close_these: {
      confirm: 'Are you sure you want to disable these accounts?', //确认要禁用这些账号吗？
      point_1: 'The system will stop syncing the data of the selected account. ', //系统将不再同步和展示这些账号下的所有广告数据。
      point_2: 'You will not be able to see the ad data under these accounts.', //您将无法看到这些账号下的广告数据。
    },
    account_close_this: {
      confirm: 'Are you sure you want to disable this account? ', //确定要禁用该账号吗？
      point_1: 'The system will stop syncing the data of this account.', //系统将不再同步和展示该账号下的所有广告数据。
      point_2: 'You will not be able to see the ad data under this account.', //您将无法看到此账号下的广告数据。
    },
    account_all_table_config: {
      status: 'Status', //状态
      platform: 'Platform', //平台
      account_name: 'Account Name', //账号名称
      account_id: 'Account ID', //账号 ID
      client: 'Client', //客户
      sync_time: 'Sync Time', //同步时间
      owner: 'Account Owner' //账号所属人
    },
    account_distribute_table_config: {
      status: 'Status', //状态
      platform: 'Platform', //平台
      account_name: 'Account Name', //账号名称
      account_id: 'Account ID', //账号 ID
      client: 'Client', //客户
      sync_time: 'Sync Time', //同步时间
      owner: 'Account Owner' //账号所属人
    },
    account_undistribute_table_config: {
      status: 'Status', //状态
      platform: 'Platform', //平台
      account_name: 'Account Name', //账号名称
      account_id: 'Account ID', //账号 ID
      client: 'Client', //客户
      apply_time: 'Apply Time', //申请时间
      owner: 'Account Owner' //账号所属人
    },
    account_not_sync: 'Not Sync', //未同步
    account_syncing: 'Syncing...', //同步中...
    account_permission_title: 'Ad Account Permissions', //账号权限
    account_limit_expired: 'After the time limit, the member need to reapply for account permissions.', //若超过时间，成员需重新申请账号权限
    account_Accessible_time: 'Accessible time', //可访问时间
    account_apply_permission_confirm: 'Are you sure you want to send the access request for ad accounts as follow?', //确认向管理员申请以下账号的访问权限吗？
    account_apply_permission_point: 'Click on the ‘Apply’ button and a request will be sent to the team administrator, then you will need to wait for him/her to process it.', //系统将向管理员发送申请，您需要等待管理员确认
    account_name: 'AD Account Name', //广告主账号名称
    account_id: 'AD Account ID', //广告主账号ID
    account_owner: 'AD Account Owner', //账号所属人
    account_apply_permission_title: 'Apply for account permissions', //申请账号权限
    account_Create_new_client: 'Create new client', //创建新客户
    account_Select_from_existing_clients: 'Select from existing clients', //选择已有客户
    account_note: `<span style='color: #ff3333'>Attention: </span>Please <span style='color: #ff3333'>tick the box</span> "Allow service providers to manage sensitive materials (current authorization involves data access to material previews, sales leads, and ad comments)" in the next step.`, //注意：<br>请确认您要关联的账号是否属于一户多开
    account_connect_new_1: 'Please connect ', //请关联平台账号
    account_connect_new_2: ' ad accounts', //请关联平台账号
    account_create_choose_customer: 'Create or choose a client', //创建/选择客户
    account_Select_ad_platform: 'Select ad platform', //选择关联账号平台
    account_confirm_want_connect: 'Choose ad accounts you want to connect', //请确认要关联的账号
    account_search_name_id: 'Search by Account name or ID', //搜索账号名称/ID
    account_Connection_failed: 'Connection failed', //无法关联
    account_Connection_failed_point: 'The following ad accounts are already bound to other MAPS users, you cannot connect these accounts', //以下账号已被其他MAPS用户绑定，您无法关联这些账号
    account_sync_failed_point: 'For these ad accounts, advertising data may not be up to date. Please contact the administrator.', //以下账号数据同步失败，您可联系管理员处理。
    account_delete_customer_title: 'Delete client', //删除客户
    account_delete_customer_confirm: 'Are you sure you want to delete this client?', //确定要删除该客户吗？
    account_delete_customer_accounts_confirm: 'Are you sure you want to delete the client ? <br> <span style="font-size: 12px;color: #999;font-weight: 500">Only the client will be deleted. <br> Since there are some ad accounts under this client, please specify a new client to transfer these accounts.</span>', //该客户下有广告账号。是否确定删除客户？<br>此操作仅删除客户，不删除客户下的所有账号。 <br>一个账号必须属于一个客户，请为这些账号指派一个新的客户。 <br>如果您要删除该客户下的所有广告账号，则需要在本页右侧的账号列表操作删除。</p>
    account_try_add_new_customer: 'Try to create your first client.', //尝试创建第一个客户
    account_add_customer_title: 'Add Client', //新建客户
    account_edit_customer_title: 'Edit Client', //编辑客户
    account_can_not_see: 'You are out of accessible hours and temporarily unable to see the data under these ad accounts. The accessible time is ', //管理员为您分配的账号权限还未生效，生效时间：
    account_auth_point: 'Data sync in progress. Due to the large amount of data, it may take some time, please check the sync status in the account list later.', //数据同步中，由于数据量比较大，可能需要一些时间，请您稍后在账号列表中查看同步状态。
    account_syncing_not_handle: 'Data sync in progress, please operate later.', //账号同步中，暂时无法操作
    account_connected: 'Connected ', //已关联
    account_fail: 'Sync Failed', //同步失败
    account_fail_point: 'For these ad accounts, data may not be up to date, please relink them later or contact the administrator.', //以下广告账号同步失败，请稍后重试或联系管理员

    // 团队
    team_apply_join_title: 'Request to join team', //申请加入团队
    team_apply_join: 'Join', //申请加入
    team_applying: 'In process', //申请中
    team_joined: 'Already in', //已加入
    team_leave: 'Leave Team', //退出团队
    team_member_list: 'All Members', //成员列表
    team_Add_Members: 'Add Members', //邀请成员
    team_all_member: 'All Member', //全部成员
    team_permission_Assigned: 'Assigned', //已分配权限
    team_permission_not_assigned: 'Not Assigned', //未分配权限
    team_member_status: 'Member Status', //成员状态
    team_search_by_name: 'Search by Name', //搜索名称
    team_member_table_config: {
      operate: 'Action', //操作
      status: 'Status', //状态
      username: 'Username', //成员昵称
      truename: 'Full name', //真实姓名
      email: 'Email', //登录邮箱
      permission: 'Permission', //成员权限
      logintime: 'Last sign in', //最近一次登录时间
      identity: 'Identity', //身份
      remark: 'Remark', //备注
    },
    team_Administrator: 'Administrator', //管理员
    team_leave_confirm: 'Are you sure you want to leave the team? You will not be able to see the ad accounts data of this team. However, you can apply to join the team again.', //确定要退出团队吗？您将不再能看到团队内所有广告账号数据，但您可以申请再次加入此团队。
    team_can_not_invite: 'You have not connected any ad accounts and cannot add members. Please go to the【Ad Accounts】page to connect.', //您未关联广告账号，无法添加成员。请先前往【账号管理】页面关联广告账号。
    team_delate_member_this: {
      confirm: 'Are you sure you want to delete the member?', //确定要该删除成员吗？
      point: 'The member will no longer be able to see the account data you assigned.' //该成员将无法再看到您分配的账号数据。
    },
    team_delate_member_these: {
      confirm: 'Are you sure you want to delete these members? ', //确定要删除这些成员吗？
      point: 'They will no longer be able to see the account data you assigned.' //成员将无法再看到您分配的账号数据。
    },
    team_open_member_this: {
      confirm: 'Are you sure you want to enable the member?', //确定要启用成员吗？
      point: 'The member will be able to see the account data you have assigned.' //该成员将可以看到您分配的账号数据。
    },
    team_open_member_these: {
      confirm: 'Are you sure you want to enable these members?', //确定要启用成员吗？
      point: 'They will be able to see the account data you have assigned.' //这些成员将可以看到您分配的账号数据。
    },
    team_close_member_this: {
      confirm: 'Are you sure you want to disable the member?', //确定要禁用成员吗？
      point: 'The member will not be able to see the account data you have assigned.' //确认禁用后，该成员将无法看到您分配的账号数据。
    },
    team_close_member_these: {
      confirm: 'Are you sure you want to disable these members?', //确定要禁用成员吗？
      point: 'They will not be able to see the account data you have assigned.' //这些成员将无法看到您分配的账号数据。
    },
    team_member_info: 'About member', //成员信息
    team_member_email: 'Email address:', //成员邮箱
    team_maps_login_email: "Please enter MAPS users' email addresses and separated them by commas.", //请输入成员在MAPS平台的注册邮箱，邮箱与邮箱之间用逗号隔开
    team_Accessible_time: 'Accessible time:', //截止日期
    team_time_Unlimited: 'Unlimited', //不限制
    team_time_Custom: 'Custom', //限制
    team_time_Custom_point: '<p style="text-align: left;">During this time frame, the member can view the data of your assigned ad account. After the time limit, the member need to reapply for account permissions.</p>', //表示在这个时间段内，成员可以查看您分配的广告账号数据。超过设置的时间范围，系统自动禁用成员，该成员将无法查看您分配的广告账号数据。
    team_Assign_ad_accounts: 'Assign ad accounts', //分配广告账号
    team_Assign_permissions: 'Assign permissions', //分配权限
    team_remark: 'Note (Optional)', //备注（选填）
    team_edit_member: 'Edit', //编辑成员
    team_select_account_to_member: 'Please Assign ad accounts to member.', //未给用户分配账号！
    team_ad_account: 'Ad Account', //广告账号
    team_search_account_name_id: 'Search by Account name or ID', //搜索账户名称/ID
    team_edit_name: 'Edit Team Name', //修改团队名称
    team_delete_member: 'Delete member', //删除成员
    team_permission_point: 'The team administrator has assigned you the following permissions:', //团队管理员为您分配的账号权限如下：

    // 消息
    message_subscribe_title: 'Notifications Settings', //订阅消息
    message_type: 'Notifications Type', //消息类型
    message_Notice_board: 'Notice board', //站内信
    message_email: 'Email', //邮箱
    message_System_Notifications: 'System Notifications', //系统通知
    message_System_Notifications_point: 'Notifications about team, accounts permission and personal information,', //团队申请/退出、权限申请/变更、账号信息修改通知
    message_Automated_Rules: 'Automated Rules', //智能监控消息
    message_Automated_Rules_point: '系统根据智能规则自动监控并发送通知', //
    message_Application_Notifications: 'Application Notifications', //申请及审批
    message_member: 'Members', //成员
    message_member_unit: '', //人
    message_search_members: 'Search by Username or Email', //搜索昵称/邮箱
    message_email_open_point: 'Are you sure you want to turn on  email notifications? System notifications (team requests, permission requests) will be sent to your login email address.', //确定要启用邮箱通知吗？系统将会推送系统消息（团队申请、权限申请）到您的登录邮箱。
    message_email_close_point: 'Are you sure you want to turn off email notifications? System notifications (team requests, permission requests) will not be sent to your login email address.', //确定要禁用邮箱通知吗？系统将不会推送系统消息（团队申请、权限申请）到您的登录邮箱。
    message_Mark_as_Read: 'Mark as Read', //设为已读
    message_Search_by_keywords: 'Search by keywords', //搜索消息关键词
    message_Mark_All_as_Read: 'Mark All as Read', //全部标为已读
    message_Request_to_join_your_team: 'Request to join your team', //团队申请处理
    message_join_team_applying: ',Click Approve, and you can go to 【System Management】 - 【Team 】to assign permissions. If you click Reject that means you have rejected him from joining your team.', //,点击同意，您可前往【系统管理】-【团队管理】为其分配权限。点击拒绝，则表示您拒绝其加入您的团队。
    message_join_team_agreed: 'You have <span style="color: #ff0000">approved</span> the member to join the team, please go to【MANAGE】>【Team】to view the detailed information of the member.', //您<span style="color: #ff0000">已同意</span>该成员加入团队，请前往【系统管理】＞【团队管理】查看成员详细信息。
    message_join_team_Rejected: 'You have <span style="color: #ff0000">rejected</span> the member to join the team', //您<span style="color: #ff0000">已拒绝</span>该成员加入团队。
    message_Account_permission_request: 'Account permission request', //权限申请处理
    message_permission_applying: ':<br>', //，请为其分配权限或拒绝。<br/>
    message_permission_agreed: 'This request has been <span style="color: #ff0000;display: inline;">approved</span>, and the permissions you have granted to this member are as follows. You can also go to 【MANAGE】> 【Team】 to check.', //您<span style="color: #ff0000;display: inline;">已同意</span>过此条申请，您为该成员分配的权限如下。您也可前往【系统管理】＞【团队管理】查看成员详细信息。
    message_permission_Rejected: 'This request has been <span style="color: #ff0000;display: inline;">rejected</span>. You can go to 【MANAGE】> 【Team】 to check.', //您<span style="color: #ff0000;display: inline;">已拒绝</span>为该成员分配账号权限。您可前往【系统管理】＞【团队管理】查看成员详细信息。
    message_Notice_board_tittle: 'Notice board', //站内信消息
    message_table_config: {
      status: 'Status', //状态
      platform: 'Platform', //平台
      msg: 'Details', //消息详情
      type_label: 'Type', //消息类型
      ctime: 'Time notified', //通知时间
    },

    // 客户报表
    report_Clients_Report: 'Clients Report', //客户报表
    report_Updated_time: ' updated time: ', //数据更新时间：
    report_Updated_time_point: 'Table data updated every 30 minutes.', //本表格数据每5分钟更新一次。
    report_Percentage_analysis: 'Percentage analysis', //占比分析
    report_Trend_analysis: 'Trend analysis', //趋势分析
    report_Detailed_data: 'Detailed data', //详细数据
    report_View_daily_data: 'View daily data', //分日查看
    report_View_hourly_data: 'View hourly data', //分时查看
    report_Customize_Columns: 'Customize Columns', //自定义列
    report_show_zero: 'Show all data (including all values equal to 0)', //显示所有数据（包括全部值为0）
    report_not_show_zero: 'Hide data that all values are equal to 0', //隐藏全部值为0的数据
    report_Export_as_Excel: 'Export as Excel', //下载表格
    report_Save_as_preset: 'Save as preset', //保存为常用列
    report_Show_total_row: 'Show total row', //显示总计
    report_Search_by_field_name: 'Search by Field name', //搜索字段名称
    report_data_type: 'Data Type', //数据类型
    report_Compare: 'Compare', //对比
    report_hour: 'Hour', //时
    report_day: 'Day', //日
    report_week: 'Week', //周
    report_month: 'Month', //月
    report_year: 'Year', //年
    report_analysis: ' analysis', //占比
    report_platform_analysis: 'Platform analysis', //平台占比
    report_Effectiveness_Report: 'Effectiveness Report', //效果报表
    report_effect_search: 'Search by Name or ID', //搜索名称/ID
    report_download_zip_title: 'Donut Chart-Dimension', //客户报表占比分析图
    report_Donut_Chart_Client_Report: 'Donut Chart-Dimension:Client  (Client Report)', //客户报表占比分析图-客户维度
    report_platform_Chart_Client_Report: 'Donut Chart-Dimension:Platform  (Client Report)', //客户报表占比分析图-平台维度
    report_Trend_Chart_Client_Report: 'Trend Chart (Client Report)', //客户报表趋势分析图
    report_No_data_during_selected_date_range: 'No data during selected date range', //没有找到相关数据
    report_nums: '', //项
    report_download_table_offline_excel: 'Your data is being exported in the background and will be sent to the specified addresses later.', //您的数据正在后台导出，稍后将发送到指定邮箱
    report_download_table_local_excel: 'Your export is being processed, please wait a moment.', //您的数据正在导出，请稍后。
    report_forbidden_seven: 'You cannot view hourly data for more than 7 days in trend chart.', //趋势分析图中不允许查看超过7天的分时数据
    report_Clients_Report_Detailed_data: 'Clients Report Detailed data', //客户报表-详细数据表
    report_Effectiveness_Report_Detailed_data: 'Effectiveness Report Detailed data', //效果报表-详细数据表
    report_has_this_field: ' has this field.', //含此字段
    report_time_line_report_label: 'Report', //上报
    report_time_line_report_desc: "When a conversion event occurs, we recorded conversion data. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.", //将转化数据记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。
    report_time_line_IMP_label: 'IMP', //播放
    report_time_line_IMP_desc: "After the conversion behavior occurs (or post back), it will be recorded to the data of the date that ads were shown in the past X days , can be viewed on the next day.<br><br>Ocean Engine: within 7 days<br>Tencent Ad: within 30 days<br>Wechat Ad: There's no such field.<br><br>For example: If an ad is shown to a user on Aug 20th. it will come at the advertisement costs 10 yuan. The user do purchase behavior on Aug 23 after the user clicks on the ad，that will be recorded on Aug20th，but not on the Aug 23. ", //在转化行为发生（或回传）后，将转化行为匹配到过去X天内的展示扣费的时间上。 暂不支持查看当日数据。<br><br>巨量引擎：7天内<br>腾讯广告：30天内<br>微信广告：无此字段<br><br>例如：广告在8月20日展示给用户，此时广告花费10元，用户点击广告后于8月23日产生1笔购买，则8月23日的购买行为会展示在8月20日，8月23日没有转化数。
    report_download_title: 'Export as Excel', //下载数据
    report_download_data_type: 'Data format:', //数据格式
    report_download_Source_data: 'Source data', //源数据
    report_download_Keep_format: 'Keep format', //保留格式
    report_download_Export_mode: 'Real-time export:', //下载方式：
    report_download_Real_time_export: 'Export mode', //实时下载
    report_download_Offline_export: 'Offline export', //离线下载
    report_download_Recipients: 'Recipients:', //邮件地址：
    report_download_Recipients_placeholder: 'Up to 20 email addresses can be filled in at once, separated by commas', //最多填写20个邮箱，邮箱和邮箱之间用逗号隔开
    report_download_max: 'Tip: The data you exported is too large to export in real time, please use Offline Export. The Excel file will be sent to the specified email addresses after the system successfully exported.', //提示：本次下载数据已超过5000行，数据量较大，无法实时导出，请使用离线下载。系统成功导出后会将Excel文件发送到指定邮箱。
    report_download_min: 'Tip: The exported data volume is small, so we recommend using real-time  export and directly saving the Excel file to the local.', //提示：本次下载数据量较少，建议使用实时下载，直接保存Excel文件到本地。
    report_download_source_tooltip: 'The exported files will retain all decimal places in the field and will not show thousands separators. <br><br>For example, if the API returns an Order ROI with 6 decimal places, then the exported form will also show 6 decimal places.', //下载内容会保留字段所有小数位，不展示千分符。<br><br>如API返回的下单ROI是6位小数，那么下载的Excel表中的下单ROI也将展示6位小数。
    report_download_format_tooltip: 'The exported files will retain the data format displayed on MAPS, including the setting of decimal places and thousands separator.', //下载内容会保留页面中展示的数字格式，包括小数位、千分符。
    report_download_loading_text: 'Please wait while we are processing your request.', //请稍等，正在为您查询...
    report_download_loading_forbidden: 'The data is too large to export! Please narrow down the scope of inquiry or export in time intervals!', //本次下载数据量过大，无法下载！请缩小查询范围或分时段下载！
    report_search_point_1: 'The Clients Report combines advertising data from multiple platforms, and some fields have different calculation formulas in different platforms. Therefore, when you filter to view data from multiple platforms, following fields’ data will not be displayed.', //MAPS的“客户报表”汇总了多个平台的广告数据，部分字段在不同平台的计算公式不同。因此在您筛选查看多个平台的数据时，以下字段的数据将不会展示。
    report_search_point_2: 'We suggest that you filter one platform and then view this data:', //建议您筛选单个平台查看这些数据：
    report_search_point_3: 'd-CVR (Report)、d-CVR (IMP)、Unit price of an order、Order ROI', //深度转化率（上报）、深度转化率（播放）、下单单价、下单ROI

    // 报表订阅
    report_subscribe_Schedule_Email: 'Schedule Email', //定时任务
    report_subscribe_Add_Task: 'Add Task', //新建任务
    report_subscribe_Report_type: 'Report Type', //报表类型
    report_subscribe_Report_type_all: 'All', //全部报表
    report_subscribe_Running_status: 'Running status', //运行状态
    report_subscribe_Running: 'Running', //运行中
    report_subscribe_Has_not_started: 'Has not started', //未开始
    report_subscribe_Search_by_Email_subject: 'Search by Email subject', //搜索邮件标题
    report_subscribe_Send_manually: 'Send manually', //手动发送
    report_subscribe_View_run_log: 'View log', //查看日志
    report_subscribe_task_table: {
      status: "Status", //状态
      operate: "Action", //操作
      running_status: 'Running status', //运行状态
      email_title: 'Email subject', //邮件标题
      report_type: 'Report Type', //报表类型
      data_during: 'Date range', //数据范围
      last_running: 'Last run time', //上次运行时间
      next_running: 'Next run time', //下次运行时间
      receive_email: 'Recipient', //接收邮箱
      send_period: 'Delivery time', //发送周期
      start_date: 'Start date', //开始日期
    },
    report_subscribe_Delete_task: 'Delete Task', //删除任务
    report_delete_task_this: {
      confirm: 'Are you sure you want to delete this task?', //确定删除这条定时邮件任务吗？
      point: 'It will disappear from the list.' //该条任务将从列表中消失。
    },
    report_delete_task_these: {
      confirm: 'Are you sure you want to delete these tasks?', //确定删除这些定时邮件任务吗？
      point: 'They will disappear from the list.' //这些任务将从列表中消失。
    },
    report_open_task_this: {
      confirm: 'Are you sure you want to enable this task?', //确定启用这条定时邮件任务吗？
      point: 'It will be run by the system.' //系统将根据您的设置自动发送报表邮件。
    },
    report_open_task_these: {
      confirm: 'Are you sure you want to enable these tasks?', //确定启用这些定时邮件任务吗？
      point: 'They will be run by the system.' //系统将根据您的设置自动发送报表邮件。
    },
    report_close_task_this: {
      confirm: 'Are you sure you want to disable this task?', //确定禁用这条定时邮件任务吗？
      point: 'It will not be run by the system.' //该定时任务将不会被系统执行。
    },
    report_close_task_these: {
      confirm: 'Are you sure you want to disable these tasks?', //确定禁用这些定时邮件任务吗？
      point: 'They will not be run by the system.' //这些定时任务将不会被系统执行。
    },
    report_subscribe_Send_email_manually: 'Send email manually', //手动发送邮件
    report_subscribe_Send_email: {
      confirm: 'Are you sure you want to send this email manually?', //确定要手动发送该定时邮件吗？
      point: 'It will be run immediately by the system.' //系统将立即执行此任务。
    },
    report_subscribe_log_title: 'Running log', //查看日志
    report_subscribe_Results: {
      title: 'Results', //运行结果
      all: 'All results', //全部结果
      success: 'Successful', //发送成功
      fail: 'Failed', //发送失败
    },
    report_subscribe_log_table: {
      time: 'Time', //运行时间
      result: 'Result' //运行结果
    },
    report_subscribe_list_empty_point: 'Please create a scheduled email task', //请添加定时发送报表任务
    // 任务新建编辑
    report_task_drawer_add_title: 'Create a scheduled email task', //创建定时邮件任务
    report_task_drawer_edit_title: 'Edit a scheduled email task', //编辑定时邮件任务
    report_task_Email_basic_settings: 'Email basic settings', //邮件基本信息
    report_task_Email_subject_label: 'Email subject:', //邮件标题
    report_task_Email_subject_placeholder: 'Please enter a subject, the system will send an email with it.', //请输入标题，系统将发送该标题的邮件
    report_task_Email_text_label: 'Email text: (optional)', //邮件正文:（选填）
    report_task_Email_text_placeholder: 'Optional. The default email text will contain "report type（atrribution model）", "dimension" and "data range" details that you set. Ex: "Effectiveness Report（Report). View daily data. The data range is this month."', //选填，系统默认以“报表类型（口径）”+“报表维度”+“数据范围”为正文内容发送邮件,如 ”客户报表（上报）、效果报表（上报），报表维度：分日，数据范围：当天。“
    report_task_Report_settings: 'Report settings', //报表信息设置
    report_task_Report_type_label: 'Report type', //报表类型
    report_task_Report_Dimension_label: 'Dimension', //报表维度
    report_task_View_daily_data: 'View daily data', //分日查看
    report_task_Date_range_label: 'Date range', //数据范围
    report_task_customize_time_point: 'Excluding today. If the system sends emails on September 30, 2020, and the set date range is Last 7 days, you will receive data reports from September 23 to September 29.', //不包含当天，如系统在2020年9月30日发送邮件，设定的数据范围是近7天，那么系统会发送9月23日至9月29日这7天的数据。
    report_task_customize_time_text_left: 'Last ', //近
    report_task_customize_time_text_right: ' days', //天
    report_task_Choose_fields_label: 'Choose fields:', //字段选择
    report_task_Choose_fields_point: 'The system will export the data according to the latest custom columns that you set up on each report page.', //系统将按照您在各个报表页面中保存的最新常用自定义列来导出数据。
    report_task_Default: 'Default', //系统默认
    report_task_Email_delivery_settings: 'Email delivery settings', //邮件发送设置
    report_task_Frequency_label: 'Frequency', //重复周期
    report_task_Repeat_interval_label: 'Repeat interval', //间隔小时
    report_task_Start_End_Time_label: 'Start & End Time:', //起止时间
    report_task_Start_Time_label: 'Start Time', //起始时间
    report_task_End_Time_label: 'End Time', //结束时间
    report_task_Time_range_label: 'Select time range', //选择时间范围
    report_task_Delivery_time_label: 'Delivery time', //发送时间
    report_task_Delivery_time_placeholder: 'Select time', //选择时间点
    report_task_Delivery_date_label: 'Delivery date', //发送日期
    report_task_start_date_label: 'Start date:', //开始日期
    report_task_Select_date_placeholder: 'Select date', //选择日期
    report_task_start_date_tooltip: 'When this task takes effect.', //即这条定时任务启用生效的时间。
    report_task_Recipients: 'Recipients', //邮件接收人
    report_task_Recipients_point: 'Please enter email addresses and separated them by commas.....', //请输入邮箱地址，可一次性添加多个邮箱，邮箱与邮箱之间用逗号隔开
    report_task_Recipients_add: 'Confirm', //添加
    report_task_Recipients_error: 'Please click the “Confirm” button on the right to add recipients!', //请点击右侧的【确定】按钮，添加接收人
    report_task_only_month: 'The list shows all running logs from the past 30 days.', //仅展示最近一个月的运行日志
    report_task_confirm_save_edit: 'Do you want to save the configured content?', //是否保存已填写的内容？

    // 帮助中心
    help_center_base_title: 'Quick Start', //快速入门
    help_center_advanced_title: 'Advanced Guides', //进阶教程
    help_center_point: 'How can we help you with ?', //
    help_center_no_more: 'No More', //暂无更多
    help_center_submit_request: 'Submit a Request', //我要反馈
    help_center_request_point: 'Please enter the details of your request. A member of our support staff will respond as soon as possible.', //为了更好地处理您的问题，请详细填写以下内容
    help_center_request_title: 'Subject', //反馈标题
    help_center_request_desc: 'Description', //问题描述
    help_center_request_mobile: 'Mobile', //联系电话

    // 智能规则
    intelligent_rule_list: 'Rule List', //规则列表
    intelligent_rule_log_list: 'Run Log', //运行日志
    intelligent_rule_create_new: 'Create Rule', //新建规则
    intelligent_rule_table_config: {
      status: 'Status', //状态
      action: 'Action', //操作
      rule_name: 'Rule Name', //规则名称
      detail: 'Rule Detail', //规则详情
      creator: 'Creator', //创建人
      effective: 'Effective date', //有效期
      Last_Edited: 'Last Edited', //最近修改
    },
    intelligent_rule_list_empty: "No Rule", //暂无规则
    intelligent_rule_delete_this: {
      confirm: 'Are you sure you want to delete this rule?', //确定要删除该规则吗？
      point: ' It will disappear from the list.' //此条规则将不再生效。
    },
    intelligent_rule_delete_these: {
      confirm: 'Are you sure you want to delete these rules?', //确定要删除这些规则吗？
      point: 'They will disappear from the list.' //这些规则将不再生效。
    },
    intelligent_rule_open_this: {
      confirm: 'Are you sure you want to enable this rule? ', //确定要启用该规则吗？
      point: 'Within the effective period, you will be able to apply this rule.' //在规则的有效期内，您将可以应用该规则。
    },
    intelligent_rule_open_these: {
      confirm: 'Are you sure you want to enable these rules?', //确定要启用该规则吗？
      point: 'Within the effective period, you will be able to apply these rules.' //在规则的有效期内，您将可以应用该规则。
    },
    intelligent_rule_close_this: {
      confirm: 'Are you sure you want to disable this rule?', //确定要禁用该规则吗？
      point: ' It will no longer take effect.' //此条规则将不再生效。
    },
    intelligent_rule_close_these: {
      confirm: 'Are you sure you want to disable these rules? ', //确定要禁用这些规则吗？
      point: 'These rules will no longer take effect.' //这些规则将不再生效。
    },
    intelligent_rule_detail_title: 'More information on this rule', //规则详情弹框
    intelligent_rule_detail_config: {
      Basic_Settings: 'Basic Settings', //规则基本信息
      rule_name: 'Rule Name', //规则名称
      platform: 'Platforms', //规则应用平台
      range: 'Level', //规则应用维度
      check_time: 'Check Schedule', //规则检查时间
      open_condition: 'Triggering Conditions', //触发条件
      remove_condition: 'Exclude Conditions', //排除条件
      operation: 'Action', //系统执行操作
      Rule_Execution_Targets: 'Rule Execution Targets', //规则运行对象
    },
    intelligent_rule_create_collapse: {
      title_1: 'Choose a rule template', //选择规则模板
      title_2: 'Basic Settings', //新建自动规则
      title_3: 'Triggering Conditions', //设置规则触发条件
      title_4: 'Exclude Conditions (Optional)', //设置规则排除条件
      title_5: 'Action', //设置执行操作
      title_6: 'Schedule & Frequency', //设置执行时段&频率
    },
    intelligent_rule_create_model: {
      All: 'All', //全部模板
      Budget: 'Budget', //预算控制
      Quality: 'Quality', //质量监控
    },
    intelligent_rule_create_form: {
      name: 'Rule Name:', //规则名称：
      platform: 'Platform:', //应用平台：
      range: 'Level:', //应用维度：
      validity: 'Effective date:', //有效期：
      action: 'Action:', //操作
      Check_Schedule: 'Check Schedule:', //检查时段：
      Frequency: 'Frequency:', //检查频率：
    },
    intelligent_rule_Condition: 'Condition ', //条件
    intelligent_rule_Choose_metric: 'Choose metric', //选择指标
    intelligent_rule_Add_a_condition: 'Add a condition', //添加条件
    intelligent_rule_Choose_action: 'Choose action', //选择操作
    intelligent_rule_Set_by_platform: 'Set by platform', //分平台设置
    intelligent_rule_Custom_point: 'When customizing the time period, MAPS will accumulate all selected time periods within a day for checking. If you select 8:00-10:00 and 19:00-24:00 on Monday , and the frequency is set to check per 3 hours, MAPS will check at 8:00, 20:00 and 23:00 respectively.', //自定义时段时，系统将累加一天内所有选择的时段进行检查。如选择星期一的8:00-10:00、19:00-24:00，频率设置为每3小时检查一次，则系统将分别在8点、20点、23点检查，剩下的23点-24点这一小时系统将不再检查。
    intelligent_rule_interval_disabled_point: 'The total number of check periods in a day must be greater than the frequency of checks.', //一天内检查时段的总和必须大于检查频率。
    intelligent_rule_Create_Automated_Rule_title: "Create Automated Rule", //创建智能规则
    intelligent_rule_edit_Automated_Rule_title: "Edit Automated Rule", //编辑智能规则
    intelligent_rule_copy_Automated_Rule_title: "Copy Automated Rule", //复制智能规则
    intelligent_rule_quit_title: 'Reminder', //提醒
    intelligent_rule_quit_point: 'You still have unsaved content. Are you sure you want to quit?', //您还有未保存的内容，确定要退出吗？
    intelligent_rule_condition_point: 'The content you filled in does not meet the format requirements, please check!', //填写内容不符合格式要求，请检查！
    intelligent_rule_hour_week_point: 'Select timeslots by clicking and dragging.', //请用鼠标点选时间段。
    intelligent_rule_delivery_campaign: 'When the rule is applied to the Campaign level, this condition means that this campaign is the only one enabled under the account it belongs to.', //规则应用维度为Campaign时，“唯一投放中”指这条Campaign是所属账号下唯一开启的。
    intelligent_rule_delivery_ad: 'When the rule is applied to the Ad level, this condition means that this ad is the only one being delivered under the campaign it belongs to.', //规则应用维度为Ad时，“唯一投放中”指这条Ad是所属Campaign下唯一正在投放中的。
    intelligent_rule_search: 'Search by Name/ ID/ Creator', //搜索规则名称/ID/创建人
    intelligent_rule_remove_repeat: 'There is/are exclude condition(s) that is/are the same as the trigger condition(s), please check!', //排除条件中存在与触发条件相同的内容，请修改！
    intelligent_rule_name_placeholder: 'Please enter the rule name', //请输入规则具体名称
    intelligent_rule_save_check_time: 'Please select timeslots by clicking and dragging.', //请拖拽选择检查时间！
    intelligent_rule_effective: 'to', //至

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
    reg_not_quotes: 'Single and double quotes are not allowed.',
    reg_login_username_required: 'Email address or username is required.', //邮箱地址或用户名不能为空。
    reg_email_required: 'Email address is required！', //邮箱地址不能为空。
    reg_email_error_message: "Incorrect email format, must end with '@hylink.com' or '@hylinkad.com' or @pagechoice.com.", //邮箱格式错误！需以@hylink.com或@hylinkad.com或@pagechoice.com结尾。
    reg_is_email_error_message: 'Please enter valid email addresses!', //请输入正确的邮箱地址。
    reg_username_required: 'Please enter username.', //用户名不能为空。
    reg_username_error_message1: 'Incorrect username format！between 2-20 characters。', //用户名格式错误！2-10个个字符。
    reg_username_error_message2: 'Only Chinese and English letters can be allowed, between 2-20 characters.', //仅允许中文、英文大小写字母、空格，2-20个字符
    reg_user_name_length: 'Between 2-20 characters.',
    reg_password_required: 'Password is required.', //用户密码不能为空。
    reg_password_rule_error: 'Only English letters, numbers, or special characters including !-+*@#$ .~  is  allowed. At least two of the three types are combined, between 8 - 20 characters.', //8-20个字符，需包含英文字母、数字、特殊字符!-   +*@#$ .~中的至少2种组合。
    reg_Original_password_required: 'Original password is required.', //原密码不能为空
    reg_confirm_password_required: 'Please enter the password again.', //确认密码不能为空。
    reg_confirm_password_rule_error: 'Two passwords entered do not match.', //两次密码输入不一致。
    reg_vcode_required: 'Verification code is required.', //验证码不能为空！
    reg_vcode_length: '4 characters in length.', //请输入正确的4位验证码。
    reg_trueName_required: 'Full name is required.', //真实姓名不能为空。
    reg_trueName_rule_error: 'Only Chinese and English letters can be allowed, between 2-15 characters.', //仅允许中文、英文大小写字母，2-15个字符。
    reg_trueName_length: 'Between 2-15 characters.',
    reg_phone_required: 'Mobile phone is required.', //手机号不能为空。
    reg_phone_rule_error: 'The phone number entered is illegal!', //输入手机号不合法。
    reg_phone_rule_error_2: 'Please enter a valid phone number!', //请填写有效的手机号码！
    reg_customer_name_required: 'Client name is required', //客户名称不能为空。
    reg_team_name_required: 'Team name is required. between 2-20 characters.', //团队名称不能为空。2-20个字符
    reg_time_required: 'Custom time is required.', //请选择日期
    reg_task_least_one_recipient: 'Please specify at least one recipient!', //请填写至少1个邮件接收人！
    reg_task_send_up_to_20_recipient: 'You can send up to 20 recipients per email.', //邮件接收人不允许超过20个！
    reg_task_number_of_days: 'Please fill in the number of days!', //请填写天数！
    reg_task_between_1_and_100: 'Only positive integer between 1 and 100 (including 1 and 100)  is allowed!', //仅允许填写1-100（包含1和100）之间的正整数！
    reg_task_email_subject_required: 'Please fill in the email subject!', //必须填写邮件标题！
    reg_task_report_type_required: 'Please choose the report type!', //必须勾选报表类型！
    reg_task_delivery_date_required: 'Please choose the delivery date!', //请选择发送日期！
    reg_task_start_date_required: 'Please choose the start date!', //请选择开始日期！
    reg_customer_industry_required: 'Please choose the industry category!', //请选择行业！
    reg_time_not_equal: 'Start time cannot equal the end time!', //开始时间不能等于结束时间！
    reg_title_required: 'Title cannot be empty!', //必须填写标题
    reg_desc_required: 'Description cannot be empty!', //必须填写问题描述
    reg_percent_error: 'Integer from 1 to 100 ', //只允许输入0-100的整数。
    reg_2_places: 'Up to 2 decimal places', //最多允许2位小数。
    reg_1000_9999999: 'Number from 1000 to 9999999.99 ', //只允许输入1000至9999999.99的数字。
    reg_50_1000000: 'Number from 50 to 1000000.', //只允许输入50至1000000的数字。
    reg_100_1000000: 'Number from 100 to 1000000.', //只允许输入100至1000000的数字。
    reg_rule_name_required: 'Rule name cannot be empty!', //必须填写名称！
    reg_rule_platform_required: 'Please choose platform!', //必须选择平台！
    reg_rule_date_required: 'Start and end dates cannot be empty!', //必须选择开始和结束时间！
    reg_rule_condition_required: 'Condition cannot be empty!', //条件项不允许为空！
    reg_rule_operate_required: 'Action cannot be empty!', //执行操作不允许为空！
    reg_rule_condition_1_100: '0-100', //1-100的整数。
    reg_rule_condition_0_9999999: '0-9999999.99', //0-9999999.99的数字。
    reg_rule_condition_0_10000: '0-10000', //0-10000的整数。
    reg_rule_condition_0_999999999: '0-999999999', //0-999999999的整数。
  },
  ...enLocale
}

export default en
