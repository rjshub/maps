export default {
    trees: () => {
        return {
            code: 0,
            result: {
                ad: [
                    {
                        id: "161",
                        media_id: "1685566034637005",
                        name: "零跑C11效果通V1",
                        total: 3,
                        value: "161",
                        children: [
                            {
                                id: "161_1444",
                                media_id: 1693103982108723,
                                name: "29城通投",
                                total: 122,
                                value: "161_1444"
                            },
                            {
                                id: "161_1376",
                                media_id: 1686423759254583,
                                name: "1219",
                                total: 1,
                                value: "161_1376"
                            }
                        ]
                    },
                    {
                        id: "164",
                        media_id: "1685566035250183",
                        name: "零跑C11效果通V2",
                        total: 5,
                        value: "164",
                        children: [
                            {
                                id: "164_1436",
                                media_id: 1688825915700284,
                                name: "3月TOP8城",
                                total: 38,
                                value: "164_1436"
                            },
                            {
                                id: "164_1474",
                                media_id: 1696442875325483,
                                name: "行动转化_销售线索收集_04_08_11:53:10",
                                total: 1,
                                value: "164_1474"
                            }
                        ]
                    }
                ],
                campaign: [
                    {
                        id: "161",
                        media_id: "1685566034637005",
                        name: "零跑C11效果通V1",
                        total: 4,
                        value: "161",
                        children: [
                            {
                                end_flag: false,
                                flag: false,
                                id: "161_1376",
                                media_id: 1686423759254583,
                                name: "1219",
                                value: "161_1376_1686423759254583"
                            },
                            {
                                end_flag: false,
                                flag: false,
                                id: "161_1444",
                                media_id: 1693103982108723,
                                name: "29城通投",
                                value: "161_1444_1693103982108723"
                            }
                        ]
                    },
                    {
                        id: "164",
                        media_id: "1685566035250183",
                        name: "零跑C11效果通V2",
                        total: 5,
                        value: "164",
                        children: [
                            {
                                end_flag: false,
                                flag: false,
                                id: "164_1429",
                                media_id: 1688642874049587,
                                name: "0112",
                                value: "164_1429_1688642874049587"
                            },
                            {
                                end_flag: false,
                                flag: false,
                                id: "164_1430",
                                media_id: 1688733845973047,
                                name: "0113",
                                value: "164_1430_1688733845973047"
                            }
                        ]
                    }
                ]
            }
        }
    },
    rulelist: () => {
        return {
            code: 0,
            result: [
                {
                    enddate: null,
                    id: 238,
                    interval: 3,
                    is_all_range_flag: 0,
                    is_range: 0,
                    name: "test",
                    open_condition: "[{\"field\":\"cost\",\"data_range\":\"1\",\"compare\":\"1\",\"type\":\"1\",\"cost\":\"22.33\",\"percent\":\"33\",\"costrange\":\"1\",\"costrangetype\":\"3\",\"type2\":\"1\",\"cost2\":\"\",\"percent2\":\"\",\"costrange2\":\"\",\"costrangetype2\":\"\"}]",
                    open_connect: 1,
                    operation: "{\"operate\":\"1\",\"res\":[{\"platform\":\"0\",\"action\":\"1\",\"value\":\"\",\"format\":\"¥\"}]}",
                    parent_id: 0,
                    period: 1,
                    platform: "1",
                    range: 1,
                    remove_condition: "[]",
                    remove_connect: 2,
                    rid: "r88",
                    startdate: "2021-05-07",
                    status: 1,
                    team_id: 7,
                    timeline: "{\"timestr\":[],\"content\":[],\"section\":[]}",
                    user_id: 20,
                    utime: "2021-05-07 18:29:04",
                    ctime: "2021-05-07 18:05:03",
                    detail: {
                        interval: "每3小时",
                        open_condition: ["消耗(总数据)=22.33 * 33%"],
                        open_connect: "满足以下所有条件",
                        operation: ["开启"],
                        period: 1,
                        platform: "巨量引擎",
                        range: "Campaign",
                        remove_condition: [],
                        remove_connect: "满足以下任一条件",
                        rule_name: "test(ID:r88)",
                        timeline: "全天"
                    }
                },
                {
                    enddate: null,
                    id: 237,
                    interval: 3,
                    is_all_range_flag: 2,
                    is_range: 2,
                    name: "campaign-top3",
                    open_condition: "[{\"field\":\"cost\",\"data_range\":\"1\",\"compare\":\"1\",\"type\":\"1\",\"cost\":\"\",\"percent\":\"12\",\"costrange\":\"2\",\"costrangetype\":\"2\",\"type2\":\"\",\"cost2\":\"\",\"percent2\":\"\",\"costrange2\":\"\",\"costrangetype2\":\"\"}]",
                    open_connect: 1,
                    operation: "{\"operate\":\"1\",\"res\":[]}",
                    parent_id: 0,
                    period: 1,
                    platform: "1",
                    range: 1,
                    remove_condition: "[]",
                    remove_connect: 2,
                    rid: "r87",
                    startdate: "2021-05-07",
                    status: 1,
                    team_id: 7,
                    timeline: "{\"timestr\":[],\"content\":[],\"section\":[]}",
                    user_id: 20,
                    utime: "2021-05-07 17:44:58",
                    ctime: "2021-05-07 17:44:58",
                    detail: {
                        interval: "每3小时",
                        open_condition: ["消耗(总数据)=消耗 (总数据)"],
                        open_connect: "满足以下所有条件",
                        operation: ["开启"],
                        period: 1,
                        platform: "巨量引擎",
                        range: "Campaign",
                        remove_condition: [],
                        remove_connect: "满足以下任一条件",
                        rule_name: "campaign-top3(ID:r87)",
                        timeline: "全天"
                    }
                }
            ]
        }
    },
    ruletasklist: () => {
        return {
            code: 0,
            result: {
                "total": 24,
                "list": [
                    {
                        "id": 249,
                        "rid": "tad15",
                        "team_id": 23,
                        "name": "",
                        "level": 2,
                        "user_id": 39,
                        "create_user": "lisa",
                        "range": 7,
                        "range_detail": "1个Campaign下全部Ad（总是包括新建Ad）",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 17:37:48",
                        "ctime": "2021-06-11 17:37:48",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "转化播放的条件测试hlx",
                                "id": "r77",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "campaign_name": "投放速度API修改测试-电商店铺0",
                                "campaign_id": 1700969441732619,
                                "list": [
                                    {
                                        "name": "投放速度API修改测试-电商店铺-CPC-加速投放",
                                        "id": 1700969469193224
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 17:37:48",
                                "username": "lisa"
                            }
                        ]
                    },
                    {
                        "id": 246,
                        "rid": "tad14",
                        "team_id": 23,
                        "name": "xinjian-ad",
                        "level": 2,
                        "user_id": 19,
                        "create_user": "rjs",
                        "range": 4,
                        "range_detail": "单个Ad",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:33:22",
                        "ctime": "2021-06-11 10:33:22",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "ad_rule",
                                "id": "r133",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_campaign_测试_不要挂规则",
                                "campaign_id": 1700170377385011,
                                "list": [
                                    {
                                        "name": "lh_ad_字段6",
                                        "id": 1701616660504587
                                    },
                                    {
                                        "name": "lh_ad_字段7",
                                        "id": 1701624567371835
                                    },
                                    {
                                        "name": "lh_ad_转化目标",
                                        "id": 1702169816560675
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "campaign_name": "hylink0604_品牌认知_销售线索收集_06_04_14:29:001",
                                "campaign_id": 1701617514020989,
                                "list": [
                                    {
                                        "name": "hy_0604同步_CPC_06_04_14:42:1211",
                                        "id": 1701617549812859
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "campaign_name": "行动转化_销售线索收集_06_09_09:52:38",
                                "campaign_id": 1702052296821763,
                                "list": [
                                    {
                                        "name": "首选场景",
                                        "id": 1702052468475947
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_Campaign_销售线索手机_rename",
                                "campaign_id": 1699607965731886,
                                "list": [
                                    {
                                        "name": "lh_ad_长期投放1",
                                        "id": 1702146968060963
                                    },
                                    {
                                        "name": "lh_ad_投放30天",
                                        "id": 1702147055698948
                                    },
                                    {
                                        "name": "lh_ad_长期投放2",
                                        "id": 1702147003752573
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "luca-test-测批量推送2",
                                "campaign_id": 1699979227692040,
                                "list": [
                                    {
                                        "name": "lh_ad_深度转化1",
                                        "id": 1702169272949787
                                    },
                                    {
                                        "name": "lh_ad_深度转化2",
                                        "id": 1702169283715133
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:33:22",
                                "username": "rjs"
                            }
                        ]
                    },
                    {
                        "id": 245,
                        "rid": "tc9",
                        "team_id": 23,
                        "name": "测试1",
                        "level": 1,
                        "user_id": 46,
                        "create_user": "linhao",
                        "range": 1,
                        "range_detail": "单个Campaign",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:30:15",
                        "ctime": "2021-06-11 10:30:15",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "campagin_rule",
                                "id": "r132",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "list": [
                                    {
                                        "name": "lh_campaign_测试_不要挂规则",
                                        "id": 1700170377385011
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:30:15",
                                "username": "linhao"
                            }
                        ]
                    },
                    {
                        "id": 244,
                        "rid": "tad13",
                        "team_id": 23,
                        "name": "ceshi xinjian",
                        "level": 2,
                        "user_id": 19,
                        "create_user": "rjs",
                        "range": 4,
                        "range_detail": "单个Ad",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:27:33",
                        "ctime": "2021-06-11 10:27:33",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "ad_rule",
                                "id": "r133",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_campaign_测试_不要挂规则",
                                "campaign_id": 1700170377385011,
                                "list": [
                                    {
                                        "name": "lh_ad_字段6",
                                        "id": 1701616660504587
                                    },
                                    {
                                        "name": "lh_ad_字段7",
                                        "id": 1701624567371835
                                    },
                                    {
                                        "name": "lh_ad_转化目标",
                                        "id": 1702169816560675
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "campaign_name": "hylink0604_品牌认知_销售线索收集_06_04_14:29:001",
                                "campaign_id": 1701617514020989,
                                "list": [
                                    {
                                        "name": "hy_0604同步_CPC_06_04_14:42:1211",
                                        "id": 1701617549812859
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "campaign_name": "行动转化_销售线索收集_06_09_09:52:38",
                                "campaign_id": 1702052296821763,
                                "list": [
                                    {
                                        "name": "首选场景",
                                        "id": 1702052468475947
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_Campaign_销售线索手机_rename",
                                "campaign_id": 1699607965731886,
                                "list": [
                                    {
                                        "name": "lh_ad_长期投放1",
                                        "id": 1702146968060963
                                    },
                                    {
                                        "name": "lh_ad_投放30天",
                                        "id": 1702147055698948
                                    },
                                    {
                                        "name": "lh_ad_长期投放2",
                                        "id": 1702147003752573
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "luca-test-测批量推送2",
                                "campaign_id": 1699979227692040,
                                "list": [
                                    {
                                        "name": "lh_ad_深度转化1",
                                        "id": 1702169272949787
                                    },
                                    {
                                        "name": "lh_ad_深度转化2",
                                        "id": 1702169283715133
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:27:33",
                                "username": "rjs"
                            }
                        ]
                    },
                    {
                        "id": 239,
                        "rid": "tad12",
                        "team_id": 23,
                        "name": "ce1",
                        "level": 2,
                        "user_id": 46,
                        "create_user": "linhao",
                        "range": 4,
                        "range_detail": "单个Ad",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:21:00",
                        "ctime": "2021-06-11 10:21:00",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "ad_rule",
                                "id": "r133",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_campaign_测试_不要挂规则",
                                "campaign_id": 1700170377385011,
                                "list": [
                                    {
                                        "name": "lh_ad_转化目标",
                                        "id": 1702169816560675
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:21:00",
                                "username": "linhao"
                            }
                        ]
                    },
                    {
                        "id": 238,
                        "rid": "tc8",
                        "team_id": 23,
                        "name": "ce",
                        "level": 1,
                        "user_id": 46,
                        "create_user": "linhao",
                        "range": 1,
                        "range_detail": "单个Campaign",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:20:07",
                        "ctime": "2021-06-11 10:20:07",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "campagin_rule",
                                "id": "r132",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "list": [
                                    {
                                        "name": "lh_campaign1_renmae",
                                        "id": 1699082418109476
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:20:07",
                                "username": "linhao"
                            }
                        ]
                    },
                    {
                        "id": 237,
                        "rid": "tad11",
                        "team_id": 23,
                        "name": "777",
                        "level": 2,
                        "user_id": 49,
                        "create_user": "larry",
                        "range": 6,
                        "range_detail": "1个账号下选中的Ad",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-11 10:11:42",
                        "ctime": "2021-06-11 10:11:42",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "ddd",
                                "id": "r123",
                                "operation": "暂停"
                            },
                            {
                                "name": "ddddddddd",
                                "id": "r124",
                                "operation": "暂停"
                            },
                            {
                                "name": "rr",
                                "id": "r127",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_Campaign_销售线索手机_rename",
                                "campaign_id": 1699607965731886,
                                "list": [
                                    {
                                        "name": "lh_ad_投放30天",
                                        "id": 1702147055698948
                                    },
                                    {
                                        "name": "lh_ad_长期投放2",
                                        "id": 1702147003752573
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-11 10:11:42",
                                "username": "larry"
                            }
                        ]
                    },
                    {
                        "id": 233,
                        "rid": "tad9",
                        "team_id": 23,
                        "name": "2326566666666666666666666666666666666666",
                        "level": 2,
                        "user_id": 50,
                        "create_user": "qlinhaohao",
                        "range": 6,
                        "range_detail": "1个账号下选中的Ad",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-10 16:05:08",
                        "ctime": "2021-06-04 11:28:18",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "lh_ad_rule_排除所有",
                                "id": "r118",
                                "operation": "仅通知"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_Campaign_销售线索手机_rename",
                                "campaign_id": 1699607965731886,
                                "list": [
                                    {
                                        "name": "lh_ad6_rename_12",
                                        "id": 1699891692663843
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-10 16:05:09",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-10 16:05:02",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-10 14:38:33",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-04 11:29:01",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-04 11:28:19",
                                "username": "qlinhaohao"
                            }
                        ]
                    },
                    {
                        "id": 234,
                        "rid": "tad10",
                        "team_id": 23,
                        "name": "tttt",
                        "level": 2,
                        "user_id": 50,
                        "create_user": "qlinhaohao",
                        "range": 4,
                        "range_detail": "单个Ad",
                        "platform": 1,
                        "status": 0,
                        "utime": "2021-06-10 16:04:44",
                        "ctime": "2021-06-10 15:58:03",
                        "operation_flag": false,
                        "rule_detail": [
                            {
                                "name": "ad-投放时间-大于",
                                "id": "r65",
                                "operation": "暂停"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_Campaign_销售线索手机_rename",
                                "campaign_id": 1699607965731886,
                                "list": [
                                    {
                                        "name": "lh_ad6_rename_12",
                                        "id": 1699891692663843
                                    },
                                    {
                                        "name": "lh_ad6_rename_13",
                                        "id": 1699790176854030
                                    },
                                    {
                                        "name": "lh_ad_自动出价",
                                        "id": 1699608033414203
                                    },
                                    {
                                        "name": "lh_ad6_rename_14",
                                        "id": 1699790229394523
                                    },
                                    {
                                        "name": "lh_ad_CPC",
                                        "id": 1699717827280947
                                    },
                                    {
                                        "name": "lh_ad_v_CPC_点击量_1",
                                        "id": 1699612014817303
                                    },
                                    {
                                        "name": "lh_ad_CPA_1",
                                        "id": 1699713295389723
                                    },
                                    {
                                        "name": "lh_ad_v_OCPC_转化量_1",
                                        "id": 1699797421880349
                                    },
                                    {
                                        "name": "lh_ad_v_CPA_转化量_1",
                                        "id": 1699797395927070
                                    },
                                    {
                                        "name": "lh_ad_智能放量_使用了定向包4r",
                                        "id": 1699891692069923
                                    },
                                    {
                                        "name": "lh_ad_系统优选广告位_1_1",
                                        "id": 1699891515629603
                                    },
                                    {
                                        "name": "lh_ad_v_OCPM_转化量_1",
                                        "id": 1699797428474916
                                    },
                                    {
                                        "name": "lh_ad_CPM",
                                        "id": 1699717783549032
                                    },
                                    {
                                        "name": "lh_ad_v_CPM_展示量",
                                        "id": 1699797516445725
                                    },
                                    {
                                        "name": "lh_ad_智能放量_不开启_全选2r",
                                        "id": 1699895386843171
                                    },
                                    {
                                        "name": "lh_ad_首选媒体_1_1",
                                        "id": 1699891672105019
                                    },
                                    {
                                        "name": "lh_ad_智能放量_开启_全选1r",
                                        "id": 1699895284854843
                                    },
                                    {
                                        "name": "lh_ad7_rename_2r",
                                        "id": 1699713433082916
                                    },
                                    {
                                        "name": "lh_ad_oCPC_rename",
                                        "id": 1699611924784187
                                    },
                                    {
                                        "name": "lh_modify1",
                                        "id": 1700697534923838
                                    },
                                    {
                                        "name": "lh_ad_长期投放1",
                                        "id": 1702146968060963
                                    },
                                    {
                                        "name": "lh_ad_投放30天",
                                        "id": 1702147055698948
                                    },
                                    {
                                        "name": "lh_ad_长期投放2",
                                        "id": 1702147003752573
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_campaign1_renmae",
                                "campaign_id": 1699082418109476,
                                "list": [
                                    {
                                        "name": "lh_ad7_rename_1r",
                                        "id": 1699447599048715
                                    },
                                    {
                                        "name": "lh_ad8_1",
                                        "id": 1699447637959704
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "lh_campaign_测试_不要挂规则",
                                "campaign_id": 1700170377385011,
                                "list": [
                                    {
                                        "name": "lh_modify3",
                                        "id": 1700170682608696
                                    },
                                    {
                                        "name": "lh_ad_放量投放_不优化2",
                                        "id": 1700785708149796
                                    },
                                    {
                                        "name": "lh_ad_放量投放_优化1",
                                        "id": 1700785658639389
                                    },
                                    {
                                        "name": "lh_ad_字段2",
                                        "id": 1701600528663565
                                    },
                                    {
                                        "name": "lh_ad_字段1",
                                        "id": 1701600495443991
                                    },
                                    {
                                        "name": "lh_ad_字段5",
                                        "id": 1701600959174664
                                    },
                                    {
                                        "name": "lh_ad_字段3",
                                        "id": 1701600899798077
                                    },
                                    {
                                        "name": "lh_ad_字段4",
                                        "id": 1701600934062135
                                    },
                                    {
                                        "name": "lh_ad_字段6",
                                        "id": 1701616660504587
                                    },
                                    {
                                        "name": "lh_ad_字段7",
                                        "id": 1701624567371835
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "luca-test-测批量推送2",
                                "campaign_id": 1699979227692040,
                                "list": [
                                    {
                                        "name": "lh_ad_深度转化_自动优化4",
                                        "id": 1700713447889931
                                    },
                                    {
                                        "name": "lh_ad_深度转化_手动出价3",
                                        "id": 1700713603878923
                                    }
                                ]
                            },
                            {
                                "advertiser_id": "1676688294065165",
                                "advertiser_name": "meDAQU",
                                "campaign_name": "te  st",
                                "campaign_id": 1701514007650548,
                                "list": [
                                    {
                                        "name": "lh_addddddd",
                                        "id": 1701514161181822
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-10 16:04:44",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-10 16:04:21",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-10 16:03:42",
                                "username": "qlinhaohao"
                            },
                            {
                                "ctime": "2021-06-10 15:58:03",
                                "username": "qlinhaohao"
                            }
                        ]
                    },
                    {
                        "id": 232,
                        "rid": "tc7",
                        "team_id": 23,
                        "name": "",
                        "level": 1,
                        "user_id": 20,
                        "create_user": "hulixia",
                        "range": 1,
                        "range_detail": "单个Campaign",
                        "platform": 1,
                        "status": 1,
                        "utime": "2021-06-04 10:01:44",
                        "ctime": "2021-06-04 10:01:44",
                        "operation_flag": true,
                        "rule_detail": [
                            {
                                "name": "更新Campaign预算hlx0508",
                                "id": "r45",
                                "operation": "更新Campaign预算 提高50%"
                            }
                        ],
                        "response": [
                            {
                                "advertiser_id": "1669552888556548",
                                "advertiser_name": "Hylink头条",
                                "list": [
                                    {
                                        "name": "电商店铺推广_testhlx",
                                        "id": 1696366846200840
                                    }
                                ]
                            }
                        ],
                        "editlist": [
                            {
                                "ctime": "2021-06-04 10:01:44",
                                "username": "hulixia"
                            }
                        ]
                    }
                ]
            }
        }
    },
    ruletaskdetail: () => {
        return {
            code: 0,
            result: {
                "id": 232,
                "rid": "tc7",
                "team_id": 23,
                "name": "",
                "level": 1,
                "user_id": 20,
                "range": 1,
                "platform": 1,
                "status": 1,
                "utime": "2021-06-04 10:01:44",
                "ctime": "2021-06-04 10:01:44",
                "ids": [
                    "62_1471"
                ],
                "rule_ids": [
                    219
                ]
            }
        }
    }
}