export default {
    industryList: config => {
        return {
            code: 0,
            result: [
                {
                    id: 1,
                    name_en: "Automobile & Components",
                    name_zh: "汽车及零配件"
                },
                {
                    id: 2,
                    name_en: "FMCG( Food,Beverage,Cosmetics)",
                    name_zh: "快速消费品(食品,饮料,化妆品)"
                },
                {
                    id: 3,
                    name_en: "Apparel/Textiles/Leather Goods",
                    name_zh: "服装/纺织/皮革"
                }
            ]
        }
    },
    chartSelectlist: () => {
        return {
            code: 0,
            result: {
                percentageTitleList: [
                    {
                        "zh": "消耗",
                        "en": "Cost",
                        "name": "cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2"
                    },
                    {
                        "zh": "展示数",
                        "en": "Impressions",
                        "name": "show",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0"
                    },
                    {
                        "zh": "点击数",
                        "en": "Clicks",
                        "name": "click",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0"
                    },
                    {
                        "zh": "转化数(上报)",
                        "en": "Conversions (Report)",
                        "name": "convert",
                        "map_name": "attribution_convert",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0",
                        "time_line": "1"
                    },
                    {
                        "zh": "深度转化数(上报)",
                        "en": "Deep conversions (Report)",
                        "name": "deep_convert",
                        "map_name": "attribution_deep_convert",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0",
                        "time_line": "1"
                    }
                ],
                trendTitleList: [
                    {
                        "zh": "消耗",
                        "en": "Cost",
                        "name": "cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2"
                    },
                    {
                        "zh": "展示数",
                        "en": "Impressions",
                        "name": "show",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0"
                    },
                    {
                        "zh": "点击数",
                        "en": "Click",
                        "name": "click",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0"
                    },
                    {
                        "zh": "点击率",
                        "en": "CTR",
                        "name": "ctr",
                        "format": "0.00%",
                        "unit": "%",
                        "decimal": "2"
                    },
                    {
                        "zh": "转化数(上报)",
                        "en": "Conversions (Report)",
                        "name": "convert",
                        "map_name": "attribution_convert",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0",
                        "time_line": "1"
                    },
                    {
                        "zh": "转化成本(上报)",
                        "en": "Cost per conversion (Report)",
                        "name": "convert_cost",
                        "map_name": "attribution_convert_cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2",
                        "time_line": "1"
                    },
                    {
                        "zh": "转化率(上报)",
                        "en": "CVR (Report)",
                        "name": "convert_rate",
                        "map_name": "convert_rate_imp",
                        "format": "0.00%",
                        "unit": "%",
                        "decimal": "2",
                        "time_line": "1"
                    },
                    {
                        "zh": "综合转化率(上报)",
                        "en": "Overall CVR (Report)",
                        "name": "synthesize_convert_rate",
                        "map_name": "synthesize_convert_rate_imp",
                        "format": "0.00%",
                        "unit": "%",
                        "decimal": "0",
                        "time_line": "1"
                    },
                    {
                        "zh": "深度转化率(上报)",
                        "en": "d-CVR (Report)",
                        "name": "deep_convert_rate",
                        "map_name": "deep_convert_rate_imp",
                        "format": "0.00%",
                        "unit": "%",
                        "decimal": "2",
                        "time_line": "1"
                    },
                    {
                        "zh": "深度转化数(上报)",
                        "en": "Deep conversions (Report)",
                        "name": "deep_convert",
                        "map_name": "attribution_deep_convert",
                        "format": "#,##0_ ",
                        "unit": "",
                        "decimal": "0",
                        "time_line": "1"
                    },
                    {
                        "zh": "深度转化成本(上报)",
                        "en": "Cost per deep conversion (Report)",
                        "name": "deep_convert_cost",
                        "map_name": "attribution_deep_convert_cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2",
                        "time_line": "1"
                    },
                    {
                        "zh": "CPM",
                        "en": "CPM",
                        "name": "avg_show_cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2"
                    },
                    {
                        "zh": "CPC",
                        "en": "CPC",
                        "name": "avg_click_cost",
                        "format": "#,##0.00",
                        "unit": "¥",
                        "decimal": "2"
                    }
                ]
            }
        }
    },
    selectlist: () => {
        return {
            code: 0,
            result: {
                adlist: [
                    {
                        ad_name: "新-美妆人群-女-核心城市",
                        id: "3525631411_3",
                        landing_type: 1,
                        media_ad_id: 3525631411,
                        platform: 3,
                    },
                    {
                        ad_name: "品类人群-新-重点城市",
                        id: "3525634448_3",
                        landing_type: 1,
                        media_ad_id: 3525634448,
                        platform: 3,
                    },
                ],
                advertiserlist: [
                    {
                        id: 130,
                        media_advertiser_id: "4032237",
                        media_advertiser_name: "雅诗兰黛",
                        platform: 3,
                    },
                    {
                        id: 159,
                        media_advertiser_id: "18407075",
                        media_advertiser_name: "谦寻(杭州)文化传媒有限公司",
                        platform: 2
                    }
                ],
                campaignlist: [
                    {
                        campaign_name: "0611美妆人群-高-上海-90",
                        id: "3528232886_3",
                        landing_type: 1,
                        media_campaign_id: 3528232886,
                        platform: 3
                    },
                    {
                        campaign_name: "0611美妆人群-国-重点城市-50",
                        id: "3539923442_3",
                        landing_type: 1,
                        media_campaign_id: 3539923442,
                        platform: 3
                    }
                ],
                clientlist: [
                    {
                        "id": 71,
                        "name": "雅思兰黛-微信"
                    },
                    {
                        "id": 154,
                        "name": "商务管家-腾讯"
                    },
                    {
                        "id": 160,
                        "name": "零跑C"
                    },
                    {
                        "id": 194,
                        "name": "0603"
                    },
                    {
                        "id": 124,
                        "name": "极兔"
                    },
                    {
                        "id": 153,
                        "name": "零跑C1"
                    },
                    {
                        "id": 172,
                        "name": "零跑T03"
                    },
                    {
                        "id": 198,
                        "name": "T03 V5"
                    },
                    {
                        "id": 193,
                        "name": "效果通"
                    },
                    {
                        "id": 202,
                        "name": "KELON"
                    },
                    {
                        "id": 203,
                        "name": "酒"
                    }
                ],
                platformlist: [
                    {
                        "id": 1,
                        "code": "jl",
                        "report_synctime": "2021-06-17 15:56:51",
                        "name": "巨量引擎"
                    },
                    {
                        "id": 2,
                        "code": "tx",
                        "report_synctime": "2021-06-17 15:50:47",
                        "name": "腾讯广告"
                    },
                    {
                        "id": 3,
                        "code": "wx",
                        "report_synctime": "2021-06-17 15:53:17",
                        "name": "微信广告"
                    }
                ],
                promotionpurposelist: [
                    {
                        "code": 1,
                        "name_zh": "销售线索（All）",
                        "name_en": "Reservations (All)"
                    },
                    {
                        "code": 16,
                        "name_zh": "品牌活动推广（腾讯、微信）",
                        "name_en": "Brand Promotion (Tencent&Wechat)"
                    },
                    {
                        "code": 36,
                        "name_zh": "PROMOTED_OBJECT_TYPE_WECHAT_CHANNELS",
                        "name_en": "PROMOTED_OBJECT_TYPE_WECHAT_CHANNELS"
                    },
                    {
                        "code": 3,
                        "name_zh": "商品推广（All）",
                        "name_en": "EC Promotion (All)"
                    },
                    {
                        "code": 4,
                        "name_zh": "门店推广（巨量）",
                        "name_en": "Offline Store Promotion (All)"
                    },
                    {
                        "code": 0,
                        "name_zh": "API不支持的目的类型",
                        "name_en": "Unsupported objective"
                    }
                ],
                sync_failure: []
            }
        }
    },
    titlelist: config => {
        const param = JSON.parse(config.body)
        let titles = []
        if (param.type == 'client') {
            titles = [
                {
                    "zh": "属性设置",
                    "en": "Settings",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "时间",
                            "en": "Date",
                            "align": "left",
                            "key": "date"
                        },
                        {
                            "zh": "客户名称",
                            "en": "Client name",
                            "align": "left",
                            "key": "client_name"
                        },
                        {
                            "zh": "平台",
                            "en": "Platform",
                            "align": "left",
                            "desc_zh": "账号所属的广告平台",
                            "desc_en": "Related ad platform",
                            "key": "platform"
                        },
                        {
                            "zh": "广告主账号ID",
                            "en": "Account ID",
                            "format": "0_ ",
                            "align": "left",
                            "desc_zh": "对应的广告主账号ID",
                            "desc_en": "Related ad account ID",
                            "key": "media_advertiser_id"
                        },
                        {
                            "zh": "广告主账号名称",
                            "en": "Account name",
                            "align": "left",
                            "desc_zh": "对应的广告主账号名称",
                            "desc_en": "Related ad account name",
                            "key": "media_advertiser_name"
                        }
                    ]
                },
                {
                    "zh": "展现数据",
                    "en": "Performance",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "消耗（元）",
                            "en": "Cost",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "展示广告在投放期内的花费金额，当天数据可能会有波动，次日稳定。",
                            "desc_en": "Display the amount spent in running period. The data may fluctuate on the day, but will be stable the next day.",
                            "key": "cost"
                        },
                        {
                            "zh": "展示数",
                            "en": "Impressions",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告展示给用户的次数。",
                            "desc_en": "The number of times your ads were be viewed by audience.",
                            "key": "show"
                        },
                        {
                            "zh": "点击数",
                            "en": "Clicks",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "当头条用户点击广告素材时，触发点击事件，该事件被认为是一次有效的广告点击。",
                            "desc_en": "If the user clicks on an ad, a click event will be triggered as a valid ad click.",
                            "key": "click"
                        },
                        {
                            "zh": "点击率",
                            "en": "CTR",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "点击通过率，计算公式=点击数/展示数*100%",
                            "desc_en": "Click through rate, its calculation formula  is clicks/impressions*100%.",
                            "key": "ctr"
                        },
                        {
                            "zh": "CPC",
                            "en": "CPC",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "平均点击单价，广告主为每次点击付出的费用。计算公式=消耗/点击数",
                            "desc_en": "Cost per click, its calculation formula  is cost/clicks.",
                            "key": "avg_click_cost"
                        },
                        {
                            "zh": "CPM",
                            "en": "CPM",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "平均千次展现费用，广告平均每1000次展示付出的费用。计算公式=消耗/展示数*1000",
                            "desc_en": "Cost per 1,000 impressions, its calculation formula is cost/impressions*1000.",
                            "key": "avg_show_cost"
                        }
                    ]
                },
                {
                    "zh": "转化数据（上报）",
                    "en": "Conversion Data (Report)",
                    "desc_zh": "将转化数据记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。",
                    "desc_en": "When a conversion event occurs, we recorded conversion data. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                    "children": [
                        {
                            "zh": "转化数（上报）",
                            "en": "Conversions (Report)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "将转化数记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。",
                            "desc_en": "When a conversion event occurs, it is recorded as a conversion. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                            "key": "convert"
                        },
                        {
                            "zh": "转化率（上报）",
                            "en": "Conversion rate (Report)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "广告的平均转化率。不同平台的计算公式可能有所不同。<br/><br/>\r\n                            ① 巨量引擎：转化数（上报）/点击数*100%。<br/><br/>\r\n                            ② 腾讯广告：转化数（上报）/点击数*100%。<br/><br/>\r\n                            ③ 微信广告:<br/>\r\n                            -朋友圈广告的转化率=转化数（上报）/可转化点击次数 *100%<br/>\r\n                            -公众号广告的转化率=转化数（上报）/点击次数 *100%",
                            "desc_en": "Conversion rate.  The calculation formula of this field on each platform may be different.<br/><br/>\r\n                            ①On Ocean Engine platform, the formula is Conversions (Report)/clicks *100%.<br/><br/>\r\n                            ②On Tencent Ads platform, the formula is Conversions (Report)/clicks *100%.<br/><br/>\r\n                            ③On Wechat Ads platform<br/>\r\n                            -The formula for calculating CVR (Report) of Wechat Moments Ads is Conversions (Report) /Convertible Clicks *100%.<br/>\r\n                            -The formula for calculating CVR (Report) of Wechat Official Accounts Ads is Conversions (Report) /Clicks *100%.",
                            "key": "convert_rate"
                        },
                        {
                            "zh": "转化成本（上报）",
                            "en": "Cost per conversion (Report)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每个转化所付出的平均成本。计算公式=消耗/转化数（上报），当天数据可能有波动。",
                            "desc_en": "The average cost per conversion from your ads. The calculation formula is cost /conversions (Report). Data may fluctuate on the day the ad is placed.",
                            "key": "convert_cost"
                        },
                        {
                            "zh": "综合转化率（上报）",
                            "en": "Overall CVR (Report)",
                            "format": "0%",
                            "align": "right",
                            "desc_zh": "广告平均每1000次展示的转化率。计算公式=转化数（上报）/展示数*1000*100%，四舍五入取整数。",
                            "desc_en": "The average conversion rate for 1,000 impressions. The calculation formula is conversions (Report)/impressions *1000*100%, rounded to integer.",
                            "key": "synthesize_convert_rate"
                        },
                        {
                            "zh": "深度转化数（上报）",
                            "en": "Deep conversions (Report)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "将深度转化数记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，我们会把激活数据披露在晚上19点。",
                            "desc_en": "When a deep conversion event occurs, it is recorded as a conversion. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                            "key": "deep_convert"
                        },
                        {
                            "zh": "深度转化率（上报）",
                            "en": "d-CVR (Report)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "广告的平均深度转化率，每个平台的计算公式可能不同。建议筛选单个平台查看该数据。<br/><br/>\r\n                            ① 巨量引擎：深度转化率（上报）=深度转化数（上报）/转化数（上报）*100%<br/><br/>\r\n                            ② 腾讯广告：深度转化率（上报）=深度转化数（上报）/点击数*100%<br/><br/>\r\n                            ③ 微信广告:<br/>\r\n                            -朋友圈广告的深度转化率公式=深度转化数（上报）/可转化点击次数*100%<br/>\r\n                            -公众号广告的转化率公式=深度转化数（上报）/点击次数*100%",
                            "desc_en": "Deep conversion Rate. The calculation formula of this field on each platform may be different. We suggest that you filter one platform and then view this data.<br/><br/>\r\n                            ①On Ocean Engine platform, the formula is Deep conversions (Report)/Conversions (Report)*100%<br/><br/>\r\n                            ②On Tencent Ads platform, the formula is Deep conversions (Report)/Clicks)*100%<br/><br/>\r\n                            ③On Wechat Ads platform<br/>\r\n                            -The formula for calculating d-CVR (Report) of Wechat Moments Ads is Deep conversions (Report)/Convertible Clicks*100%<br/>\r\n                            -The formula for calculating d-CVR (Report) of Wechat Official Accounts Ads is Deep conversions (Report)/Clicks*100%",
                            "key": "deep_convert_rate"
                        },
                        {
                            "zh": "深度转化成本（上报）",
                            "en": "Cost per deep conversion (Report)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每个深度转化所付出的平均成本。计算公式=消耗/深度转化数（上报），当天数据可能有波动。",
                            "desc_en": "The average cost per deep conversion from your ads. The calculation formula is cost/deep conversions (Report). The data may fluctuate on the day.",
                            "key": "deep_convert_cost"
                        }
                    ]
                },
                {
                    "zh": "落地页及门店数据 ",
                    "en": "Landing Page & Store",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "表单预约量",
                            "en": "Reservations",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户在落地页提交表单的次数。",
                            "desc_en": "The number of times the user submitted the reservation form on the landing page.",
                            "key": "form"
                        }
                    ]
                },
                {
                    "zh": "互动数据",
                    "en": "Engagement",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "关注数",
                            "en": "New followers",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被受众新增关注的数量，目前除抖音、头条号外，微头条、抖音火山版可新增关注。",
                            "desc_en": "The number of new followers. ",
                            "key": "follow"
                        },
                        {
                            "zh": "点赞数",
                            "en": "Likes",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被用户点赞的次数。",
                            "desc_en": "The number of likes of your ad.",
                            "key": "likes"
                        },
                        {
                            "zh": "评论数",
                            "en": "Comments",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被用户评论的次数。",
                            "desc_en": "The number of comments of your ad.",
                            "key": "comments"
                        },
                        {
                            "zh": "分享数",
                            "en": "Shares",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被分享/转发的次数。",
                            "desc_en": "The number of shares of your ads.",
                            "key": "shares"
                        }
                    ]
                },
                {
                    "zh": "下单数据",
                    "en": "Order Data",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "下单量（网页）",
                            "en": "Orders (Web)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户通过该广告在网页生成商品订单的次数。",
                            "desc_en": "The number of order events tracked on your website and attributed to your ads.",
                            "icon": "tx,wx",
                            "key": "order_count"
                        },
                        {
                            "zh": "下单率（网页）",
                            "en": "Order rate (Web)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "用户点击广告后在网页生成订单的比率。不同平台的计算公式可能有所不同。<br/><br/>\r\n                        ① 巨量引擎：无此字段<br/><br/>\r\n                        ② 腾讯广告：计算公式=下单量（网页）/点击量*100%<br/><br/>\r\n                        ③ 微信广告：<br/>\r\n                        -朋友圈广告的下单率（网页）=下单量（网页）/可转化点击次数 *100%<br/>\r\n                        -公众号广告的下单率（网页=下单量（网页）/点击次数 *100%",
                            "desc_en": "Order Rate. The calculation formula of this field on each platform may be different. <br/><br/>\r\n                        ① This field is not available on Ocean Engine platform. <br/><br/>\r\n                        ② On Tencent Ads platform, the formula is Orders (Web)/Clicks*100%<br/><br/>\r\n                        ③ On Wechat Ads platform<br/>\r\n                        -The formula for calculating CVR (Report) of Wechat Moments Ads is Orders (Web) /Convertible Clicks *100%.<br/>\r\n                        -The formula for calculating CVR (Report) of Wechat Official Accounts Ads is Orders (Web) /Clicks *100%.",
                            "icon": "tx,wx",
                            "key": "order_rate"
                        },
                        {
                            "zh": "下单成本（网页）",
                            "en": "Cost per order (Web)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每次下单付出的费用成本，计算公式=花费/下单量（网页）。",
                            "desc_en": "The average cost per order from your ads. The calculation formula is Cost/Orders (Web)",
                            "icon": "tx,wx",
                            "key": "order_cost"
                        },
                        {
                            "zh": "下单金额（网页）",
                            "en": "Order amount (Web)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告带来的总订单金额（即销售额）。",
                            "desc_en": "Total order amount generated on the website.",
                            "icon": "tx,wx",
                            "key": "web_order_amount"
                        },
                        {
                            "key": "web_order_cost"
                        },
                        {
                            "zh": "下单ROI",
                            "en": "Order ROI",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "订单的投入产出比，腾讯广告计算公式=订单金额/花费；微信广告计算公式=下单金额（网页）/花费。建议筛选单个平台查看该数据。",
                            "desc_en": "Return on ad cost.  The calculation formula of Tencent Ads is Total order Amount/Cost *100%. The calculation formula of Wechat Ads is Order Amount (Web)/Cost *100%.  We suggest that you filter one platform and then view this data.",
                            "icon": "tx,wx",
                            "key": "order_roi"
                        },
                        {
                            "zh": "下单单价",
                            "en": "Unit price of an order",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "订单的平均单价，计算公式=订单金额/下单量（网页）；微信广告计算公式=下单金额（网页）/下单量（网页）。建议筛选单个平台查看该数据。",
                            "desc_en": "The average unit price of an order. The calculation formula of Tencent Ads is Total order Amount/Orders (Web).The calculation formula of Wecaht Ads is Order Amount (Web)/Orders (Web).  We suggest that you filter one platform and then view this data.",
                            "icon": "tx,wx",
                            "key": "order_unit_price"
                        },
                        {
                            "zh": "订单金额",
                            "en": "Total order amount",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "用户在网页内下单付出的总金额。",
                            "desc_en": "Total order amount paid by user on the website.",
                            "icon": "tx",
                            "key": "order_amount"
                        },
                        {
                            "zh": "下单量（App）",
                            "en": "Orders (App)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户在App内生成商品订单的次数。",
                            "desc_en": "The number of order events tracked in the App and attributed to your ads.",
                            "icon": "tx",
                            "key": "app_order_count"
                        },
                        {
                            "zh": "下单率（App）",
                            "en": "Order rate (App)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "用户点击广告后在App生成订单的比率，计算公式=下单量（App）/点击量*100%。",
                            "desc_en": "Order Rate. The calculation formula is Orders (App)/Clicks*100%. ",
                            "icon": "tx",
                            "key": "app_order_rate"
                        },
                        {
                            "zh": "下单成本（App）",
                            "en": "Cost per order (App)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每次在App内生成的订单付出的费用成本，计算公式=花费/下单量（App）。",
                            "desc_en": "The average cost per order from your ads. The calculation formula is Cost/Orders (App)",
                            "icon": "tx",
                            "key": "app_order_cost"
                        },
                        {
                            "zh": "下单金额（App）",
                            "en": "Order amount (App)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "用户在App产生订单的金额。",
                            "desc_en": "Total order amount generated in the App.",
                            "icon": "tx",
                            "key": "app_order_amount"
                        }
                    ]
                }
            ]
        } else {
            titles = [
                {
                    "zh": "属性设置",
                    "en": "Settings",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "时间",
                            "en": "Date",
                            "align": "left",
                            "key": "date"
                        },
                        {
                            "zh": "平台",
                            "en": "Platform",
                            "align": "left",
                            "desc_zh": "账号所属的广告平台",
                            "desc_en": "Related ad platform",
                            "key": "platform"
                        },
                        {
                            "zh": "广告主账号ID",
                            "en": "Account ID",
                            "format": "0_ ",
                            "align": "left",
                            "desc_zh": "对应的广告主账号ID",
                            "desc_en": "Related ad account ID",
                            "key": "media_advertiser_id"
                        },
                        {
                            "zh": "广告主账号名称",
                            "en": "Account name",
                            "align": "left",
                            "desc_zh": "对应的广告主账号名称",
                            "desc_en": "Related ad account name",
                            "key": "media_advertiser_name"
                        },
                        {
                            "zh": "Campaign ID",
                            "en": "Campaign ID",
                            "format": "0_ ",
                            "align": "left",
                            "key": "media_campaign_id"
                        },
                        {
                            "zh": "Campaign名称",
                            "en": "Campaign name",
                            "align": "left",
                            "key": "campaign_name"
                        },
                        {
                            "zh": "Ad ID",
                            "en": "Ad ID",
                            "format": "0_ ",
                            "align": "left",
                            "key": "media_ad_id"
                        },
                        {
                            "zh": "Ad名称",
                            "en": "Ad name",
                            "align": "left",
                            "key": "ad_name"
                        },
                        {
                            "zh": "Creative ID",
                            "en": "Creative ID",
                            "format": "0_ ",
                            "align": "left",
                            "key": "creative_id"
                        },
                        {
                            "zh": "Creative名称",
                            "en": "Creative name",
                            "align": "left",
                            "key": "creative_name"
                        },
                        {
                            "zh": "推广目的",
                            "en": "Objective",
                            "align": "left",
                            "desc_zh": "对应Campaign的推广目的",
                            "desc_en": "Objective of campaign",
                            "key": "landing_type"
                        }
                    ]
                },
                {
                    "zh": "展现数据",
                    "en": "Performance",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "消耗（元）",
                            "en": "Cost",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "展示广告在投放期内的花费金额，当天数据可能会有波动，次日稳定。",
                            "desc_en": "Display the amount spent in running period. The data may fluctuate on the day, but will be stable the next day.",
                            "key": "cost"
                        },
                        {
                            "zh": "展示数",
                            "en": "Impressions",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告展示给用户的次数。",
                            "desc_en": "The number of times your ads were be viewed by audience.",
                            "key": "show"
                        },
                        {
                            "zh": "点击数",
                            "en": "Clicks",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "当头条用户点击广告素材时，触发点击事件，该事件被认为是一次有效的广告点击。",
                            "desc_en": "If the user clicks on an ad, a click event will be triggered as a valid ad click.",
                            "key": "click"
                        },
                        {
                            "zh": "点击率",
                            "en": "CTR",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "点击通过率，计算公式=点击数/展示数*100%",
                            "desc_en": "Click through rate, its calculation formula  is clicks/impressions*100%.",
                            "key": "ctr"
                        },
                        {
                            "zh": "CPC",
                            "en": "CPC",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "平均点击单价，广告主为每次点击付出的费用。计算公式=消耗/点击数",
                            "desc_en": "Cost per click, its calculation formula  is cost/clicks.",
                            "key": "avg_click_cost"
                        },
                        {
                            "zh": "CPM",
                            "en": "CPM",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "平均千次展现费用，广告平均每1000次展示付出的费用。计算公式=消耗/展示数*1000",
                            "desc_en": "Cost per 1,000 impressions, its calculation formula is cost/impressions*1000.",
                            "key": "avg_show_cost"
                        }
                    ]
                },
                {
                    "zh": "转化数据（上报）",
                    "en": "Conversion Data (Report)",
                    "desc_zh": "将转化数据记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。",
                    "desc_en": "When a conversion event occurs, we recorded conversion data. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                    "children": [
                        {
                            "zh": "转化数（上报）",
                            "en": "Conversions (Report)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "将转化数记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，会把激活数据披露在晚上19点。",
                            "desc_en": "When a conversion event occurs, it is recorded as a conversion. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                            "key": "convert"
                        },
                        {
                            "zh": "转化率（上报）",
                            "en": "Conversion rate (Report)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "广告的平均转化率。不同平台的计算公式可能有所不同。<br/><br/>\r\n                            ① 巨量引擎：转化数（上报）/点击数*100%。<br/><br/>\r\n                            ② 腾讯广告：转化数（上报）/点击数*100%。<br/><br/>\r\n                            ③ 微信广告:<br/>\r\n                            -朋友圈广告的转化率=转化数（上报）/可转化点击次数 *100%<br/>\r\n                            -公众号广告的转化率=转化数（上报）/点击次数 *100%",
                            "desc_en": "Conversion rate.  The calculation formula of this field on each platform may be different.<br/><br/>\r\n                            ①On Ocean Engine platform, the formula is Conversions (Report)/clicks *100%.<br/><br/>\r\n                            ②On Tencent Ads platform, the formula is Conversions (Report)/clicks *100%.<br/><br/>\r\n                            ③On Wechat Ads platform<br/>\r\n                            -The formula for calculating CVR (Report) of Wechat Moments Ads is Conversions (Report) /Convertible Clicks *100%.<br/>\r\n                            -The formula for calculating CVR (Report) of Wechat Official Accounts Ads is Conversions (Report) /Clicks *100%.",
                            "key": "convert_rate"
                        },
                        {
                            "zh": "转化成本（上报）",
                            "en": "Cost per conversion (Report)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每个转化所付出的平均成本。计算公式=消耗/转化数（上报），当天数据可能有波动。",
                            "desc_en": "The average cost per conversion from your ads. The calculation formula is cost /conversions (Report). Data may fluctuate on the day the ad is placed.",
                            "key": "convert_cost"
                        },
                        {
                            "zh": "综合转化率（上报）",
                            "en": "Overall CVR (Report)",
                            "format": "0%",
                            "align": "right",
                            "desc_zh": "广告平均每1000次展示的转化率。计算公式=转化数（上报）/展示数*1000*100%，四舍五入取整数。",
                            "desc_en": "The average conversion rate for 1,000 impressions. The calculation formula is conversions (Report)/impressions *1000*100%, rounded to integer.",
                            "key": "synthesize_convert_rate"
                        },
                        {
                            "zh": "深度转化数（上报）",
                            "en": "Deep conversions (Report)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "将深度转化数记录在转化事件发生的时间上。例如您的广告在早上8点进行了展示和点击，用户晚上19点发生激活行为，我们会把激活数据披露在晚上19点。",
                            "desc_en": "When a deep conversion event occurs, it is recorded as a conversion. For example, if your advertisement is displayed and clicked at 8 o'clock in the morning, and the user activates at 19 o'clock in the evening, the activation data will be recorded at 19 o'clock in the evening.",
                            "key": "deep_convert"
                        },
                        {
                            "zh": "深度转化率（上报）",
                            "en": "d-CVR (Report)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "广告的平均深度转化率，每个平台的计算公式可能不同。<br/><br/>\r\n                            ① 巨量引擎：深度转化率（上报）=深度转化数（上报）/转化数（上报）*100%<br/><br/>\r\n                            ② 腾讯广告：深度转化率（上报）=深度转化数（上报）/点击数*100%<br/><br/>\r\n                            ③ 微信广告:<br/>\r\n                            -朋友圈广告的深度转化率公式=深度转化数（上报）/可转化点击次数*100%<br/>\r\n                            -公众号广告的转化率公式=深度转化数（上报）/点击次数*100%",
                            "desc_en": "Deep conversion Rate. The calculation formula of this field on each platform may be different. <br/><br/>\r\n                            ①On Ocean Engine platform, the formula is Deep conversions (Report)/Conversions (Report)*100%<br/><br/>\r\n                            ②On Tencent Ads platform, the formula is Deep conversions (Report)/Clicks)*100%<br/><br/>\r\n                            ③On Wechat Ads platform<br/>\r\n                            -The formula for calculating d-CVR (Report) of Wechat Moments Ads is Deep conversions (Report)/Convertible Clicks*100%<br/>\r\n                            -The formula for calculating d-CVR (Report) of Wechat Official Accounts Ads is Deep conversions (Report)/Clicks*100%",
                            "key": "deep_convert_rate"
                        },
                        {
                            "zh": "深度转化成本（上报）",
                            "en": "Cost per deep conversion (Report)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每个深度转化所付出的平均成本。计算公式=消耗/深度转化数（上报），当天数据可能有波动。",
                            "desc_en": "The average cost per deep conversion from your ads. The calculation formula is cost/deep conversions (Report). The data may fluctuate on the day.",
                            "key": "deep_convert_cost"
                        }
                    ]
                },
                {
                    "zh": "落地页及门店数据 ",
                    "en": "Landing Page & Store",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "表单预约量",
                            "en": "Reservations",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户在落地页提交表单的次数。",
                            "desc_en": "The number of times the user submitted the reservation form on the landing page.",
                            "key": "form"
                        }
                    ]
                },
                {
                    "zh": "互动数据",
                    "en": "Engagement",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "关注数",
                            "en": "New followers",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被受众新增关注的数量，目前除抖音、头条号外，微头条、抖音火山版可新增关注。",
                            "desc_en": "The number of new followers.",
                            "key": "follow"
                        },
                        {
                            "zh": "点赞数",
                            "en": "Likes",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被用户点赞的次数。",
                            "desc_en": "The number of likes of your ad.",
                            "key": "likes"
                        },
                        {
                            "zh": "评论数",
                            "en": "Comments",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被用户评论的次数。",
                            "desc_en": "The number of comments of your ad.",
                            "key": "comments"
                        },
                        {
                            "zh": "分享数",
                            "en": "Shares",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告被分享/转发的次数。",
                            "desc_en": "The number of shares of your ads.",
                            "key": "shares"
                        }
                    ]
                },
                {
                    "zh": "下单数据",
                    "en": "Order Data",
                    "desc_zh": "",
                    "desc_en": "",
                    "children": [
                        {
                            "zh": "下单量（网页）",
                            "en": "Orders (Web)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户通过该广告在网页生成商品订单的次数。",
                            "desc_en": "The number of order events tracked on your website and attributed to your ads.",
                            "icon": "tx,wx",
                            "key": "order_count"
                        },
                        {
                            "zh": "下单率（网页）",
                            "en": "Order rate (Web)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "用户点击广告后在网页生成订单的比率。不同平台的计算公式可能有所不同。<br/><br/>\r\n                        ① 巨量引擎：无此字段<br/><br/>\r\n                        ② 腾讯广告：计算公式=下单量（网页）/点击量*100%<br/><br/>\r\n                        ③ 微信广告：<br/>\r\n                        -朋友圈广告的下单率（网页）=下单量（网页）/可转化点击次数 *100%<br/>\r\n                        -公众号广告的下单率（网页=下单量（网页）/点击次数 *100%",
                            "desc_en": "Order Rate. The calculation formula of this field on each platform may be different. <br/><br/>\r\n                        ① This field is not available on Ocean Engine platform. <br/><br/>\r\n                        ② On Tencent Ads platform, the formula is Orders (Web)/Clicks*100%<br/><br/>\r\n                        ③ On Wechat Ads platform<br/>\r\n                        -The formula for calculating CVR (Report) of Wechat Moments Ads is Orders (Web) /Convertible Clicks *100%.<br/>\r\n                        -The formula for calculating CVR (Report) of Wechat Official Accounts Ads is Orders (Web) /Clicks *100%.",
                            "icon": "tx,wx",
                            "key": "order_rate"
                        },
                        {
                            "zh": "下单成本（网页）",
                            "en": "Cost per order (Web)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每次下单付出的费用成本，计算公式=花费/下单量（网页）。",
                            "desc_en": "The average cost per order from your ads. The calculation formula is Cost/Orders (Web)",
                            "icon": "tx,wx",
                            "key": "order_cost"
                        },
                        {
                            "zh": "下单金额（网页）",
                            "en": "Order amount (Web)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告带来的总订单金额（即销售额）。",
                            "desc_en": "Total order amount generated on the website.",
                            "icon": "tx,wx",
                            "key": "web_order_amount"
                        },
                        {
                            "zh": "下单ROI",
                            "en": "Order ROI",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "订单的投入产出比，腾讯广告计算公式=订单金额/花费；微信广告计算公式=下单金额（网页）/花费。",
                            "desc_en": "Return on ad cost.  The calculation formula of Tencent Ads is Total order Amount/Cost *100%. The calculation formula of Wechat Ads is Order Amount (Web)/Cost *100%.",
                            "icon": "tx,wx",
                            "key": "order_roi"
                        },
                        {
                            "zh": "下单单价",
                            "en": "Unit price of an order",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "订单的平均单价，计算公式=订单金额/下单量（网页）；微信广告计算公式=下单金额（网页）/下单量（网页）。",
                            "desc_en": "The average unit price of an order. The calculation formula of Tencent Ads is Total order Amount/Orders (Web).The calculation formula of Wecaht Ads is Order Amount (Web)/Orders (Web).",
                            "icon": "tx,wx",
                            "key": "order_unit_price"
                        },
                        {
                            "zh": "订单金额",
                            "en": "Total order amount",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "用户在网页内下单付出的总金额。",
                            "desc_en": "Total order amount paid by user on the website.",
                            "icon": "tx",
                            "key": "order_amount"
                        },
                        {
                            "zh": "下单量（App）",
                            "en": "Orders (App)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "用户在App内生成商品订单的次数。",
                            "desc_en": "The number of order events tracked in the App and attributed to your ads.",
                            "icon": "tx",
                            "key": "app_order_count"
                        },
                        {
                            "zh": "下单率（App）",
                            "en": "Order rate (App)",
                            "format": "0.00%",
                            "align": "right",
                            "desc_zh": "用户点击广告后在App生成订单的比率，计算公式=下单量（App）/点击量*100%。",
                            "desc_en": "Order Rate. The calculation formula is Orders (App)/Clicks*100%. ",
                            "icon": "tx",
                            "key": "app_order_rate"
                        },
                        {
                            "zh": "下单成本（App）",
                            "en": "Cost per order (App)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告主为每次在App内生成的订单付出的费用成本，计算公式=花费/下单量（App）。",
                            "desc_en": "The average cost per order from your ads. The calculation formula is Cost/Orders (App)",
                            "icon": "tx",
                            "key": "app_order_cost"
                        },
                        {
                            "zh": "下单金额（App）",
                            "en": "Order amount (App)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "用户在App产生订单的金额。",
                            "desc_en": "Total order amount generated in the App.",
                            "icon": "tx",
                            "key": "app_order_amount"
                        },
                        {
                            "zh": "首日新增下单量",
                            "en": "Orders (first day)",
                            "format": "#,##0_ ",
                            "align": "right",
                            "desc_zh": "广告推广获取的用户在点击广告当日，带来的下单次数。",
                            "desc_en": "The number of orders placed on the first day of the advertsing.",
                            "icon": "tx,wx",
                            "key": "first_day_order_count"
                        },
                        {
                            "zh": "首日新增下单金额",
                            "en": "Order amount (first day)",
                            "format": "#,##0.00",
                            "align": "right",
                            "desc_zh": "广告推广获取的用户在点击广告当日，带来的总订单金额（即销售额）。",
                            "desc_en": "Total order amount on the first day of the advertising.",
                            "icon": "tx,wx",
                            "key": "first_day_order_amount"
                        },
                        {
                            "zh": "首日新增下单ROI",
                            "en": "ROI (first day)",
                            "format": "#,##0.0000",
                            "align": "right",
                            "desc_zh": "首日订单的投入产出比，计算公式=首日新增下单金额/首日广告花费。",
                            "desc_en": "Return on first day ad cost. The calculation formula is ROI (first day)/Cost (first day). ",
                            "icon": "tx,wx",
                            "key": "first_day_order_roi"
                        }
                    ]
                }
            ]
        }
        return {
            code: 0,
            result: {
                selectedTitles: {
                    client_title: "date,client_name,platform,media_advertiser_name,cost,show,click,ctr,convert,convert_rate,convert_cost,synthesize_convert_rate,avg_click_cost,avg_show_cost,deep_convert,deep_convert_rate,deep_convert_cost,order_count,order_rate,order_cost,web_order_amount,order_roi,order_unit_price,order_amount,app_order_count,app_order_rate,app_order_cost,app_order_amount,form,follow,likes,comments,shares",
                    effect_title: "date,platform,media_advertiser_name,campaign_name,media_advertiser_id,media_campaign_id,ad_name,landing_type,cost,first_day_order_amount,first_day_order_roi,show,click,convert,convert_rate,ctr,avg_click_cost,avg_show_cost,form,follow,order_count,order_rate,order_cost,web_order_amount,order_roi,order_unit_price,order_amount,app_order_count,app_order_rate,app_order_cost,app_order_amount,first_day_order_count,convert_cost,synthesize_convert_rate,deep_convert,deep_convert_rate,deep_convert_cost,likes,comments,shares"
                },
                titlelists: titles
            }
        }
    },
    checkreportdate: () => {
        return {
            code: 0,
            result: []
        }
    },
    fieldcheck: () => {
        return {
            code: 0,
            result: []
        }
    },
    percentage: () => {
        return {
            code: 0,
            result: {
                data: {
                    "cost": [
                        {
                            "id": 71,
                            "name": "雅思兰黛-微信",
                            "value": 409270.38
                        },
                        {
                            "id": 193,
                            "name": "效果通",
                            "value": 19534.07
                        },
                        {
                            "id": 198,
                            "name": "T03 V5",
                            "value": 20000
                        }
                    ],
                    "show": [
                        {
                            "id": 71,
                            "name": "雅思兰黛-微信",
                            "value": "4865592"
                        },
                        {
                            "id": 193,
                            "name": "效果通",
                            "value": "362653"
                        },
                        {
                            "id": 198,
                            "name": "T03 V5",
                            "value": "464643"
                        }
                    ],
                    "click": [
                        {
                            "id": 71,
                            "name": "雅思兰黛-微信",
                            "value": "44904"
                        },
                        {
                            "id": 193,
                            "name": "效果通",
                            "value": "11799"
                        },
                        {
                            "id": 198,
                            "name": "T03 V5",
                            "value": "19748"
                        }
                    ],
                    "convert": [
                        {
                            "id": 71,
                            "name": "雅思兰黛-微信",
                            "value": "6110"
                        },
                        {
                            "id": 193,
                            "name": "效果通",
                            "value": "81"
                        },
                        {
                            "id": 198,
                            "name": "T03 V5",
                            "value": "66"
                        }
                    ],
                    "attribution_convert": [
                        {
                            "id": 193,
                            "name": "效果通",
                            "value": "81"
                        },
                        {
                            "id": 198,
                            "name": "T03 V5",
                            "value": "66"
                        }
                    ]
                },
                total: {
                    "cost": 448804.45,
                    "show": 5692888,
                    "click": 76451,
                    "convert": 6257,
                    "deep_convert": 0,
                    "attribution_convert": 147,
                    "attribution_deep_convert": 0
                }
            }
        }
    },
    advertiserlist: () => {
        return {
            code: 0,
            result: {
                total: 5,
                totallist: {
                    "cost": "448,804.45",
                    "show": "5,692,888",
                    "click": "76,451",
                    "convert": "6,257",
                    "form": "6,162",
                    "follow": "171",
                    "deep_convert": "0",
                    "attribution_convert": null,
                    "attribution_deep_convert": null,
                    "likes": "1,029",
                    "comments": "374",
                    "shares": "94",
                    "order_count": null,
                    "order_amount": null,
                    "web_order_amount": null,
                    "app_order_count": null,
                    "app_order_amount": null,
                    "first_day_order_count": null,
                    "first_day_order_amount": null,
                    "convert_rate_click_count": "73962",
                    "avg_click_cost": "5.87",
                    "avg_show_cost": "78.84",
                    "ctr": "1.34%",
                    "convert_rate": "8.46%",
                    "order_unit_price": null,
                    "order_roi": null,
                    "app_order_cost": null,
                    "app_order_rate": null,
                    "order_cost": null,
                    "deep_convert_rate": null,
                    "order_rate": null,
                    "convert_cost": "71.73",
                    "deep_convert_cost": "0.00",
                    "attribution_convert_cost": null,
                    "attribution_deep_convert_cost": null,
                    "first_day_order_roi": null,
                    "platform": null,
                    "convert_rate_imp": null,
                    "deep_convert_rate_imp": null,
                    "synthesize_convert_rate_imp": null,
                    "synthesize_convert_rate": "110%",
                    "from": "total",
                    "source": ""
                },
                list: [
                    {
                        "id": 200932,
                        "advertiser_id": 121,
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "3",
                        "form": "3",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "convert_rate_click_count": 0,
                        "filter": 1,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032257",
                        "media_advertiser_name": "Origins悦木之源",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 200931,
                        "advertiser_id": 130,
                        "platform": 3,
                        "cost": "366,081.39",
                        "show": "4,645,217",
                        "click": "41,514",
                        "convert": "5,253",
                        "form": "5,147",
                        "follow": "152",
                        "likes": "516",
                        "comments": "308",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "8.82",
                        "avg_show_cost": "78.81",
                        "ctr": "0.89%",
                        "convert_rate": "13.32%",
                        "convert_cost": "69.69",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "149",
                        "order_rate": "0.38%",
                        "order_cost": "2,456.92",
                        "web_order_amount": "135,655.00",
                        "order_roi": "0.37",
                        "order_unit_price": "910.44",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 30846,
                        "convert_rate_click_count": 39189,
                        "filter": 1,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "113%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 200925,
                        "advertiser_id": 170,
                        "platform": 1,
                        "cost": "19,534.07",
                        "show": "362,653",
                        "click": "11,799",
                        "convert": "81",
                        "form": "81",
                        "follow": "0",
                        "likes": "391",
                        "comments": "38",
                        "shares": "89",
                        "balance": 0,
                        "avg_click_cost": "1.66",
                        "avg_show_cost": "53.86",
                        "ctr": "3.25%",
                        "convert_rate": "0.69%",
                        "convert_cost": "241.16",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": "81",
                        "attribution_convert_cost": "241.16",
                        "attribution_deep_convert": "0",
                        "attribution_deep_convert_cost": "0.00",
                        "order_count": null,
                        "order_rate": null,
                        "order_cost": null,
                        "web_order_amount": null,
                        "order_roi": null,
                        "order_unit_price": null,
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": null,
                        "convert_rate_click_count": 11799,
                        "filter": 1,
                        "first_day_order_count": null,
                        "first_day_order_amount": null,
                        "first_day_order_roi": null,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": "0.69%",
                        "synthesize_convert_rate_imp": "22%",
                        "deep_convert_rate_imp": "0.00%",
                        "synthesize_convert_rate": "22%",
                        "media_advertiser_id": "1663932789210125",
                        "media_advertiser_name": "零跑T03-效果通",
                        "client_name": "效果通",
                        "source": ""
                    },
                    {
                        "id": 200924,
                        "advertiser_id": 171,
                        "platform": 1,
                        "cost": "20,000.00",
                        "show": "464,643",
                        "click": "19,748",
                        "convert": "66",
                        "form": "66",
                        "follow": "0",
                        "likes": "44",
                        "comments": "2",
                        "shares": "5",
                        "balance": 0,
                        "avg_click_cost": "1.01",
                        "avg_show_cost": "43.04",
                        "ctr": "4.25%",
                        "convert_rate": "0.33%",
                        "convert_cost": "303.03",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": "66",
                        "attribution_convert_cost": "303.03",
                        "attribution_deep_convert": "0",
                        "attribution_deep_convert_cost": "0.00",
                        "order_count": null,
                        "order_rate": null,
                        "order_cost": null,
                        "web_order_amount": null,
                        "order_roi": null,
                        "order_unit_price": null,
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": null,
                        "convert_rate_click_count": 19748,
                        "filter": 1,
                        "first_day_order_count": null,
                        "first_day_order_amount": null,
                        "first_day_order_roi": null,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": "0.33%",
                        "synthesize_convert_rate_imp": "14%",
                        "deep_convert_rate_imp": "0.00%",
                        "synthesize_convert_rate": "14%",
                        "media_advertiser_id": "1685566033965069",
                        "media_advertiser_name": "零跑T03效果通V5",
                        "client_name": "T03 V5",
                        "source": ""
                    },
                    {
                        "id": 200923,
                        "advertiser_id": 129,
                        "platform": 3,
                        "cost": "43,188.99",
                        "show": "220,375",
                        "click": "3,390",
                        "convert": "854",
                        "form": "865",
                        "follow": "19",
                        "likes": "78",
                        "comments": "26",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "12.74",
                        "avg_show_cost": "195.98",
                        "ctr": "1.54%",
                        "convert_rate": "26.47%",
                        "convert_cost": "50.57",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 3224,
                        "convert_rate_click_count": 3226,
                        "filter": 1,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "388%",
                        "media_advertiser_id": "4032101",
                        "media_advertiser_name": "倩碧Clinique",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    }
                ]
            }
        }
    },
    platformPercentage: () => {
        return {
            code: 0,
            result: {
                displayKeys: [],
                total: 449597.30000000005,
                data: [
                    {
                        "id": 1,
                        "name": "巨量引擎",
                        "value": 39995.15
                    },
                    {
                        "id": 3,
                        "name": "微信广告",
                        "value": 409602.15
                    }
                ]
            }
        }
    },
    clientPercentage: () => {
        return {
            code: 0,
            result: {
                "data": [
                    {
                        "id": 3,
                        "name": "微信广告",
                        "value": 409602.15
                    }
                ],
                "total": 409602.15
            }
        }
    },
    trend: () => {
        return {
            code: 0,
            result: {
                "displayKeys": [],
                "time_list": [
                    "2021-06-17 00:00~00:59",
                    "2021-06-17 01:00~01:59",
                    "2021-06-17 02:00~02:59",
                    "2021-06-17 03:00~03:59",
                    "2021-06-17 04:00~04:59",
                    "2021-06-17 05:00~05:59",
                    "2021-06-17 06:00~06:59",
                    "2021-06-17 07:00~07:59",
                    "2021-06-17 08:00~08:59",
                    "2021-06-17 09:00~09:59",
                    "2021-06-17 10:00~10:59",
                    "2021-06-17 11:00~11:59",
                    "2021-06-17 12:00~12:59",
                    "2021-06-17 13:00~13:59",
                    "2021-06-17 14:00~14:59",
                    "2021-06-17 15:00~15:59",
                    "2021-06-17 16:00~16:59",
                    "2021-06-17 17:00~17:59",
                    "2021-06-17 18:00~18:59",
                    "2021-06-17 19:00~19:59",
                    "2021-06-17 20:00~20:59",
                    "2021-06-17 21:00~21:59",
                    "2021-06-17 22:00~22:59",
                    "2021-06-17 23:00~23:59"
                ],
                "customer": [
                    "0603",
                    "KELON",
                    "T03 V5",
                    "效果通",
                    "酒",
                    "雅思兰黛-微信",
                    "零跑C",
                    "零跑C1",
                    "零跑T03"
                ],
                "totalList": {
                    "2021-06-17 00:00~00:59": 36171.71,
                    "2021-06-17 01:00~01:59": 22690.64,
                    "2021-06-17 02:00~02:59": 10637.41,
                    "2021-06-17 03:00~03:59": 7788.110000000001,
                    "2021-06-17 04:00~04:59": 7856.39,
                    "2021-06-17 05:00~05:59": 19221.300000000003,
                    "2021-06-17 06:00~06:59": 46671.7,
                    "2021-06-17 07:00~07:59": 59026.729999999996,
                    "2021-06-17 08:00~08:59": 52236.42999999999,
                    "2021-06-17 09:00~09:59": 34621.299999999996,
                    "2021-06-17 10:00~10:59": 29036.03,
                    "2021-06-17 11:00~11:59": 24839.010000000002,
                    "2021-06-17 12:00~12:59": 22820.64,
                    "2021-06-17 13:00~13:59": 20963.670000000002,
                    "2021-06-17 14:00~14:59": 19788.69,
                    "2021-06-17 15:00~15:59": 32338.14,
                    "2021-06-17 16:00~16:59": 9069.089999999998,
                    "2021-06-17 17:00~17:59": 0,
                    "2021-06-17 18:00~18:59": 0,
                    "2021-06-17 19:00~19:59": 0,
                    "2021-06-17 20:00~20:59": 0,
                    "2021-06-17 21:00~21:59": 0,
                    "2021-06-17 22:00~22:59": 0,
                    "2021-06-17 23:00~23:59": 0
                },
                "title": "总计",
                "data_list": [
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        584.67,
                        284.94,
                        222.09,
                        174.43,
                        369.92,
                        1347.42,
                        4004.58,
                        5958.19,
                        5113.53,
                        1569.23,
                        359.39,
                        0,
                        11.61,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1235,
                        2879.9,
                        3859.92,
                        4963.2,
                        6457.88,
                        135.52,
                        0.86,
                        2.99,
                        459.88,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        35587.04,
                        22405.7,
                        10415.32,
                        7613.68,
                        7486.47,
                        17873.88,
                        42667.119999999995,
                        53068.53999999999,
                        45887.899999999994,
                        30172.17,
                        24816.72,
                        19875.81,
                        16351.15,
                        20828.15,
                        19787.829999999998,
                        32335.149999999998,
                        8609.21,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                ]
            }
        }
    },
    effectlist: () => {
        return {
            code: 0,
            result: {
                "total": 193,
                "list": [
                    {
                        "id": 4250989,
                        "advertiser_id": 130,
                        "media_campaign_id": 3439678513,
                        "campaign_name": "618EC全品-下单-一方二方-卡片式朋友圈-综合创意1-0524",
                        "landing_type": "推广我的商品",
                        "media_ad_id": 3440506373,
                        "ad_name": "小程序历史访问for618",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "1",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "1",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "500.00",
                        "order_roi": "0.00",
                        "order_unit_price": "500.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250984,
                        "advertiser_id": 130,
                        "media_campaign_id": 3319005958,
                        "campaign_name": "ANR-标签+行动卡片-25-34岁",
                        "landing_type": "推广品牌活动",
                        "media_ad_id": 3319005966,
                        "ad_name": "宁波市-慈溪市等-重点-女-25-34岁",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "0",
                        "form": "1",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250983,
                        "advertiser_id": 130,
                        "media_campaign_id": 2477900142,
                        "campaign_name": "0205-0210-RN-EYE-轻互动滑动",
                        "landing_type": "推广品牌活动",
                        "media_ad_id": 2477900150,
                        "ad_name": "太原市等-其它-女-20至40岁",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "2",
                        "click": "0",
                        "convert": "0",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250978,
                        "advertiser_id": 121,
                        "media_campaign_id": 3356457073,
                        "campaign_name": "标签式-1.品牌相关人群-DWMM-5.4",
                        "landing_type": "销售线索",
                        "media_ad_id": 3356457075,
                        "ad_name": "标签式-1.品牌相关人群",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "1",
                        "form": "1",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032257",
                        "media_advertiser_name": "Origins悦木之源",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250970,
                        "advertiser_id": 130,
                        "media_campaign_id": 3396075164,
                        "campaign_name": "X5-下单-人群综合1-卡片式朋友圈-综合创意-0514",
                        "landing_type": "推广我的商品",
                        "media_ad_id": 3397878747,
                        "ad_name": "小程序历史访客",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "1",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "1",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "860.00",
                        "order_roi": "0.00",
                        "order_unit_price": "860.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250969,
                        "advertiser_id": 130,
                        "media_campaign_id": 2171868165,
                        "campaign_name": "Sakura-长按视频朋友圈-500w",
                        "landing_type": "推广品牌活动",
                        "media_ad_id": 2171868173,
                        "ad_name": "无锡市等-其它-女-20至35岁",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "5",
                        "click": "0",
                        "convert": "0",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250965,
                        "advertiser_id": 130,
                        "media_campaign_id": 3457845232,
                        "campaign_name": "PB-下单-一方加二方-基础图片-0528",
                        "landing_type": "推广我的商品",
                        "media_ad_id": 3457845252,
                        "ad_name": "PB-历史访问618",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "1",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "1",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "950.00",
                        "order_roi": "0.00",
                        "order_unit_price": "950.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250964,
                        "advertiser_id": 130,
                        "media_campaign_id": 3314905152,
                        "campaign_name": "RN-CREAM-4.24",
                        "landing_type": "推广品牌活动",
                        "media_ad_id": 3314905160,
                        "ad_name": "太原市等-其它-女-25至40岁",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "1",
                        "click": "0",
                        "convert": "0",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250953,
                        "advertiser_id": 130,
                        "media_campaign_id": 3503323517,
                        "campaign_name": "sakura-6.17-行动式",
                        "landing_type": "推广品牌活动",
                        "media_ad_id": 3503323525,
                        "ad_name": "北京等-核心-女-20至35岁",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "3",
                        "click": "2",
                        "convert": "2",
                        "form": "0",
                        "follow": "0",
                        "likes": "3",
                        "comments": "3",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "66.67%",
                        "convert_rate": "100.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "0",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "0.00",
                        "order_roi": "0.00",
                        "order_unit_price": "0.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 2,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "66667%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    },
                    {
                        "id": 4250952,
                        "advertiser_id": 130,
                        "media_campaign_id": 3230876820,
                        "campaign_name": "PB-下单-一方加二方-基础图片-0527",
                        "landing_type": "推广我的商品",
                        "media_ad_id": 3230876835,
                        "ad_name": "PB-EL公众号粉丝人群",
                        "platform": 3,
                        "cost": "0.00",
                        "show": "0",
                        "click": "0",
                        "convert": "1",
                        "form": "0",
                        "follow": "0",
                        "likes": "0",
                        "comments": "0",
                        "shares": "0",
                        "balance": 0,
                        "avg_click_cost": "0.00",
                        "avg_show_cost": "0.00",
                        "ctr": "0.00%",
                        "convert_rate": "0.00%",
                        "convert_cost": "0.00",
                        "deep_convert": "0",
                        "deep_convert_rate": "0.00%",
                        "deep_convert_cost": "0.00",
                        "attribution_convert": null,
                        "attribution_convert_cost": null,
                        "attribution_deep_convert": null,
                        "attribution_deep_convert_cost": null,
                        "order_count": "1",
                        "order_rate": "0.00%",
                        "order_cost": "0.00",
                        "web_order_amount": "1,020.00",
                        "order_roi": "0.00",
                        "order_unit_price": "1,020.00",
                        "order_amount": null,
                        "app_order_count": null,
                        "app_order_rate": null,
                        "app_order_cost": null,
                        "app_order_amount": null,
                        "valuable_click_count": 0,
                        "first_day_order_count": "0",
                        "first_day_order_amount": "0.00",
                        "first_day_order_roi": "0.0000",
                        "filter": 1,
                        "time_line": 0,
                        "date": "2021-06-17",
                        "convert_rate_imp": null,
                        "synthesize_convert_rate_imp": null,
                        "deep_convert_rate_imp": null,
                        "synthesize_convert_rate": "0%",
                        "media_advertiser_id": "4032237",
                        "media_advertiser_name": "雅诗兰黛",
                        "client_name": "雅思兰黛-微信",
                        "source": ""
                    }
                ],
                "totallist": {
                    "cost": "459,819.21",
                    "show": "5,860,610",
                    "click": "77,983",
                    "convert": "6,325",
                    "form": "6,225",
                    "follow": "174",
                    "deep_convert": "0",
                    "attribution_convert": null,
                    "attribution_deep_convert": null,
                    "likes": "1,055",
                    "comments": "378",
                    "shares": "97",
                    "order_count": null,
                    "order_amount": null,
                    "web_order_amount": null,
                    "app_order_count": null,
                    "app_order_amount": null,
                    "first_day_order_count": null,
                    "first_day_order_amount": null,
                    "avg_click_cost": "5.90",
                    "avg_show_cost": "78.46",
                    "ctr": "1.33%",
                    "convert_rate": "8.36%",
                    "order_unit_price": null,
                    "order_roi": null,
                    "app_order_cost": null,
                    "app_order_rate": null,
                    "order_cost": null,
                    "deep_convert_rate": null,
                    "order_rate": null,
                    "convert_cost": "72.70",
                    "deep_convert_cost": "0.00",
                    "attribution_convert_cost": null,
                    "attribution_deep_convert_cost": null,
                    "first_day_order_roi": null,
                    "platform": null,
                    "convert_rate_click_count": 75683,
                    "convert_rate_imp": null,
                    "deep_convert_rate_imp": null,
                    "synthesize_convert_rate_imp": null,
                    "synthesize_convert_rate": "108%",
                    "from": "total",
                    "source": ""
                }
            }
        }
    },
    emailTaskList: () => {
        return {
            code: 0,
            result: {
                total: 20,
                "list": [
                    {
                        "id": 140,
                        "status": 1,
                        "emails": "hu.lixia@hylink.com,461115980@qq.com,89313118@qq.com",
                        "title": "测试不要动111",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 3,
                        "days": 0,
                        "startdate": "2021-06-11",
                        "last_run_time": "2021-06-11 17:20:03",
                        "next_run_time": "2021-06-11 17:28:00",
                        "sending_period": "每日 17:28",
                        "run_status": "运行中",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "近7天",
                        "email_count": "3个"
                    },
                    {
                        "id": 136,
                        "status": 0,
                        "emails": "hu.lixia@hylink.com",
                        "title": "每4个小时报表cesgh",
                        "type": "2",
                        "time_line": "{\"2\":\"1\"}",
                        "data_range": 2,
                        "days": 0,
                        "startdate": "2021-04-09",
                        "last_run_time": "2021-06-15 09:40:01",
                        "next_run_time": "-",
                        "sending_period": "每4小时: 09:40-14:40",
                        "run_status": "-",
                        "type_name": "效果报表(上报)",
                        "data_range_name": "当天",
                        "email_count": "1个"
                    },
                    {
                        "id": 127,
                        "status": 0,
                        "emails": "461115980@qq.com",
                        "title": "hulixia日报",
                        "type": "2",
                        "time_line": "{\"2\":\"1\"}",
                        "data_range": 1,
                        "days": 0,
                        "startdate": "2021-01-21",
                        "last_run_time": "2021-01-21 11:10:00",
                        "next_run_time": "-",
                        "sending_period": "每日 11:10",
                        "run_status": "-",
                        "type_name": "效果报表(上报)",
                        "data_range_name": "前一天",
                        "email_count": "1个"
                    },
                    {
                        "id": 97,
                        "status": 1,
                        "emails": "461115980@qq.com,89313118@qq.com",
                        "title": "hulixia账号数据较多333333",
                        "type": "2",
                        "time_line": "{\"2\":\"1\"}",
                        "data_range": 10,
                        "days": 100,
                        "startdate": "2021-01-22",
                        "last_run_time": "2021-06-17 11:10:01",
                        "next_run_time": "2021-06-18 11:10:00",
                        "sending_period": "每日 11:10",
                        "run_status": "运行中",
                        "type_name": "效果报表(上报)",
                        "data_range_name": "近100天",
                        "email_count": "2个"
                    },
                    {
                        "id": 21,
                        "status": 0,
                        "emails": "hu.lixia@hylink.com",
                        "title": "自定义90天的报表数据",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 10,
                        "days": 90,
                        "startdate": "2020-12-14",
                        "last_run_time": "2020-12-14 15:00:01",
                        "next_run_time": "-",
                        "sending_period": "每日 15:00:00",
                        "run_status": "-",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "近90天",
                        "email_count": "1个"
                    },
                    {
                        "id": 20,
                        "status": 0,
                        "emails": "hu.lixia@hylink.com",
                        "title": "上月邮件",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 9,
                        "days": 0,
                        "startdate": "2020-12-08",
                        "last_run_time": "2020-12-14 16:00:00",
                        "next_run_time": "-",
                        "sending_period": "每日 16:00:00",
                        "run_status": "-",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "上月",
                        "email_count": "1个"
                    },
                    {
                        "id": 19,
                        "status": 0,
                        "emails": "hulixia@hylink.com",
                        "title": "本月邮件发送",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 8,
                        "days": 0,
                        "startdate": "2020-12-09",
                        "last_run_time": "2020-12-18 09:00:00",
                        "next_run_time": "2020-12-24 09:00:00",
                        "sending_period": "每周:星期四,星期五 09:00",
                        "run_status": "-",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "本月",
                        "email_count": "1个"
                    },
                    {
                        "id": 18,
                        "status": 0,
                        "emails": "hu.lixia@hylink.com",
                        "title": "近30天报表数据发送",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 5,
                        "days": 0,
                        "startdate": "2020-12-08",
                        "last_run_time": "2020-12-23 13:02:57",
                        "next_run_time": "2020-12-24 12:10:00",
                        "sending_period": "每日 12:10",
                        "run_status": "-",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "近30天",
                        "email_count": "1个"
                    },
                    {
                        "id": 17,
                        "status": 0,
                        "emails": "hulixia@hylink.com,hu.lixia@hylink.com,461115980@qq.com",
                        "title": "近14天报表数据发送",
                        "type": "1,2",
                        "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                        "data_range": 4,
                        "days": 0,
                        "startdate": "2020-12-08",
                        "last_run_time": "2020-12-23 11:50:00",
                        "next_run_time": "2020-12-24 11:50:00",
                        "sending_period": "每周:星期二,星期三,星期四,星期五 11:50",
                        "run_status": "-",
                        "type_name": "客户报表(上报),效果报表(上报)",
                        "data_range_name": "近14天",
                        "email_count": "3个"
                    },
                    {
                        "id": 16,
                        "status": 0,
                        "emails": "hu.lixia@hylink.com",
                        "title": "近7天的报表数据发送",
                        "type": "1",
                        "time_line": "{\"1\":\"1\"}",
                        "data_range": 3,
                        "days": 0,
                        "startdate": "2020-12-08",
                        "last_run_time": "2020-12-10 14:00:00",
                        "next_run_time": "-",
                        "sending_period": "每日 14:00:00",
                        "run_status": "-",
                        "type_name": "客户报表(上报)",
                        "data_range_name": "近7天",
                        "email_count": "1个"
                    }
                ]
            }
        }
    },
    tasklog: () => {
        return {
            code: 0,
            result: [
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 17:39"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 17:34"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 17:20"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 17:19"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 17:12"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 16:48"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 16:33"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 16:32"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 16:23"
                },
                {
                    "status": 1,
                    "msg_zh": "邮件全部发送成功！",
                    "send_time": "2021-06-11 16:21"
                }
            ]
        }
    },
    emailtaskselectlist: () => {
        return {
            code: 0,
            result: {
                "typelist": [
                    {
                        "code": 1,
                        "name": "客户报表"
                    },
                    {
                        "code": 2,
                        "name": "效果报表"
                    }
                ],
                "dimensionlist": [
                    {
                        "code": "date",
                        "name": "分日"
                    }
                ],
                "datarangelist": [
                    {
                        "code": 1,
                        "name": "前一天"
                    },
                    {
                        "code": 2,
                        "name": "当天"
                    },
                    {
                        "code": 3,
                        "name": "近7天"
                    },
                    {
                        "code": 4,
                        "name": "近14天"
                    },
                    {
                        "code": 5,
                        "name": "近30天"
                    },
                    {
                        "code": 6,
                        "name": "本周（周一至当天）"
                    },
                    {
                        "code": 7,
                        "name": "上周（周一至周日）"
                    },
                    {
                        "code": 8,
                        "name": "本月"
                    },
                    {
                        "code": 9,
                        "name": "上月"
                    },
                    {
                        "code": 10,
                        "name": "近X天"
                    }
                ],
                "cyclelist": [
                    {
                        "code": 1,
                        "name": "小时"
                    },
                    {
                        "code": 2,
                        "name": "日"
                    },
                    {
                        "code": 3,
                        "name": "周"
                    },
                    {
                        "code": 4,
                        "name": "月"
                    }
                ],
                "weeklist": [
                    {
                        "code": 1,
                        "name": "星期一"
                    },
                    {
                        "code": 2,
                        "name": "星期二"
                    },
                    {
                        "code": 3,
                        "name": "星期三"
                    },
                    {
                        "code": 4,
                        "name": "星期四"
                    },
                    {
                        "code": 5,
                        "name": "星期五"
                    },
                    {
                        "code": 6,
                        "name": "星期六"
                    },
                    {
                        "code": 7,
                        "name": "星期日"
                    }
                ],
                "runstatuslist": [
                    {
                        "code": 1,
                        "name": "运行中"
                    },
                    {
                        "code": 2,
                        "name": "未开始"
                    }
                ],
                "statuslist": [
                    {
                        "code": 1,
                        "name": "启用"
                    },
                    {
                        "code": 2,
                        "name": "禁用"
                    }
                ]
            }
        }
    },
    detail: () => {
        return {
            code: 0,
            result: {
                "id": 140,
                "team_id": 7,
                "user_id": 20,
                "title": "测试不要动111",
                "content": "",
                "type": "1,2",
                "time_line": "{\"1\":\"1\",\"2\":\"1\"}",
                "dimension": "date",
                "data_range": 3,
                "days": 0,
                "columns": "",
                "cycle": 2,
                "interval": null,
                "week": null,
                "starttime": "17:28:00",
                "endtime": null,
                "startdate": "2021-06-11",
                "month_day": null,
                "last_run_time": "2021-06-11 17:20:03",
                "next_run_time": "2021-06-11 17:28:00",
                "sending_period_zh": "每日 17:28",
                "sending_period_en": "Daily 17:28",
                "emails": "hu.lixia@hylink.com,461115980@qq.com,89313118@qq.com",
                "status": 1,
                "lang": "zh",
                "ctime": "2021-06-11 15:54:42",
                "utime": "2021-06-11 17:24:55"
            }
        }
    }
}