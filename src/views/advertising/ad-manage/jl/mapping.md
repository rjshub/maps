<!-- campaign 投放状态（status） -->
1 => 不限
2 => 不限（包含已删除）
CAMPAIGN_STATUS_ENABLE => 启用
CAMPAIGN_STATUS_DISABLE => 暂停
CAMPAIGN_STATUS_DELETE => 删除

<!-- 操作状态（opt_status） -->
CAMPAIGN_STATUS_ENABLE => 启用
CAMPAIGN_STATUS_DISABLE => 暂停

<!-- 预算类型（budget_mode） -->
BUDGET_MODE_INFINITE => 不限
BUDGET_MODE_DAY => 日预算
BUDGET_MODE_TOTAL => 总预算

<!-- 广告组类型（campaign_type） -->
FEED => 信息流广告
SEARCH => 搜索广告

<!-- 推送状态（push_status） -->
0 => 不限
1 => 推送成功
2 => 推送失败
3 => 未推送
4 => 未修改
5 => 推送中

<!-- 推广目的（landing_type） -->
LINK => 销售线索收集
AWEME => 抖音号推广
SHOP => 电商店铺推广
STORE => 门店推广
DPA => 商品目录推广
APP => 应用推广
GOODS => 鲁班商品推广
ARTICLE => 头条文章推广
UNKNOWN => API不支持的目的类型

<!-- 投放位置（inventory_type） -->
INVENTORY_FEED => 头条
INVENTORY_VIDEO_FEED => 西瓜
INVENTORY_HOTSOON_FEED => 火山
INVENTORY_AWEME_FEED => 抖音
INVENTORY_UNION_SLOT => 穿山甲
UNION_BOUTIQUE_GAME => 穿山甲激励视频
INVENTORY_UNION_SPLASH_SLOT => 穿山甲开屏
INVENTORY_AWEME_SEARCH => 抖音搜索
INVENTORY_SEARCH => 头条搜索
INVENTORY_UNIVERSAL => 通投智选
INVENTORY_BEAUTY => 轻颜相机
INVENTORY_PIPIXIA => 皮皮虾
INVENTORY_AUTOMOBILE => 懂车帝
INVENTORY_STUDY => 好好学习
INVENTORY_FACE_U => faceu

<!-- 应用规则（apply_rule） -->
0 => 未应用规则
1 => 已应用规则

<!-- 触发规则未操作 -->
1 => 未操作触发广告组
2 => 异常触发广告组

<!-- ad投放状态 （status） -->
1 => 不限
0 => 不限（包含已删除）
AD_STATUS_DELIVERY_OK => 投放中
AD_STATUS_DISABLE => 计划暂停
AD_STATUS_AUDIT => 新建审核中
AD_STATUS_REAUDIT => 修改审核中
AD_STATUS_DONE => 已完成
AD_STATUS_CREATE => 计划新建
AD_STATUS_AUDIT_DENY => 审核不通过
AD_STATUS_BALANCE_EXCEED => 账户余额不足
AD_STATUS_BUDGET_EXCEED => 超出预算
AD_STATUS_NOT_START => 未到达投放时间
AD_STATUS_NO_SCHEDULE => 不在投放时段
AD_STATUS_CAMPAIGN_DISABLE => 已被广告组暂停
AD_STATUS_CAMPAIGN_EXCEED => 广告组超出预算
AD_STATUS_CAMPAIGN_PRE_OFFLINE_BUDGET => 广告组接近预算
AD_STATUS_PRE_OFFLINE_BUDGET => 广告接近预算
AD_STATUS_ADVERTISER_BUDGET_EXCEED => 超出广告主日预算
AD_STATUS_DELETE => 已删除
AD_STATUS_LIVE_CANNOT_LANUCH => 关联直播间不可投放
AD_STATUS_PRE_ONLINE => 预上线
AD_STATUS_DSP_AD_DISABLE => 已被广告计划暂停
AD_STATUS_AUDIT_STATUS_ERROR => 异常，请联系审核人员
AD_STATUS_DRAFT => 草稿
AD_STATUS_ADVERTISER_PRE_OFFLINE_BUDGET => 账户接近预算
AD_STATUS_CANNOT_EDIT => 不可编辑
AD_STATUS_EXTERNAL_URL_DISABLE => 落地页暂不可用
AD_STATUS_LIVE_ROOM_OFF => 关联直播间未开播
AD_STATUS_AWEME_ACCOUNT_PUNISHED => 关联抖音账号封禁不可投放
AD_STATUS_AWEME_ACCOUNT_DISABLED => 关联抖音号不可投
AD_STATUS_PRODUCT_OFFLINE => 关联商品不可投

<!-- 操作状态（opt_status） -->
AD_STATUS_ENABLE => 启用
AD_STATUS_DISABLE => 暂停

<!-- 出价类型（pricing） -->
PRICING_CPM => CPM
PRICING_OCPM => oCPM
PRICING_CPC => CPC
PRICING_OCPC => oCPC
PRICING_CPA => CPA
PRICING_CPV => CPV

<!-- 投放场景（smart_bid_type） -->
SMART_BID_CUSTOM => 常规投放
SMART_BID_CONSERVATIVE => 放量投放

<!-- 投放内容（delivery_content） -->
LANDING_PAGE_LINK => 落地页 
EXTERNAL_URL => 落地页 
MICRO_APP => 小程序 
DOWNLOAD_URL => 下载链接 
QUICK_APP_URL => 快应用 
GOODS_LINK => 商品链接 
LIVE => 直播间 
LIVE_ROOM => 直播间 
DOUYIN => 抖音POI门店 
THIRD_PARTY => 第三方门店 
NORMAL => 自建门店 
AWEME_HOME_PAGE => 抖音主页 
SHOP => 电商店铺 
GOODS => 商品推广 
STORE => 门店 
STORE_ACTIVITY => 活动

<!-- 智能放量（auto_extend_enabled） -->
0 => 不启用
1 => 启用

<!-- 智能放量目的（auto_extend_targets） -->
REGION => 地域 
GENDER => 性别 
AGE => 年龄 
CUSTOM_AUDIENCE => 自定义人群 
INTEREST_ACTION => 行为兴趣 

<!-- 投放速度类型（flow_control_mode） -->
FLOW_CONTROL_MODE_FAST => 优先跑量 
FLOW_CONTROL_MODE_SMOOTH => 控制成本上限 
FLOW_CONTROL_MODE_BALANCE => 均衡投放 

FLOW_CONTROL_MODE_FAST => 加速投放 
FLOW_CONTROL_MODE_SMOOTH => 标准投放 

<!-- 创意状态（status） -->
CREATIVE_STATUS_DELIVERY_OK => 投放中 
CREATIVE_STATUS_DISABLE => 创意暂停 
CREATIVE_STATUS_NOT_START => 未到达投放时间 
CREATIVE_STATUS_NO_SCHEDULE => 不在投放时段 
CREATIVE_STATUS_CAMPAIGN_DISABLE => 已被广告组暂停 
CREATIVE_STATUS_CAMPAIGN_EXCEED => 广告组超出预算 
CREATIVE_STATUS_AUDIT => 新建审核中 
CREATIVE_STATUS_REAUDIT => 修改审核中 
CREATIVE_STATUS_DONE => 已完成 
CREATIVE_STATUS_AD_DISABLE => 广告计划暂停 
CREATIVE_STATUS_AUDIT_DENY => 审核不通过 
CREATIVE_STATUS_BALANCE_EXCEED => 账户余额不足 
CREATIVE_STATUS_BUDGET_EXCEED => 超出预算 
CREATIVE_STATUS_PRE_ONLINE => 预上线 
CREATIVE_STATUS_AD_AUDIT => 广告计划新建审核中 
CREATIVE_STATUS_AD_REAUDIT => 广告计划修改审核中 
CREATIVE_STATUS_AD_AUDIT_DENY => 广告计划审核不通过 
CREATIVE_STATUS_ADVERTISER_BUDGET_EXCEED => 超出账户日预算 
CREATIVE_STATUS_DELETE => 已删除 
CREATIVE_STATUS_DATA_ERROR => 数据错误

<!-- 创意方式（creative_material_mode） -->
STATIC_ASSEMBLE => 程序化创意 
'' => 自定义创意 

<!-- 角色（role） -->
ROLE_ADVERTISER => 普通广告主（直客） 
ROLE_CHILD_ADVERTISER => 普通广告主（代理商子客户） 
ROLE_CHILD_AGENT => 二级代理商 
ROLE_AGENT => 一级代理商