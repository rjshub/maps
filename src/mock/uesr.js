import Mock from 'mockjs'

export default {
    login: config => {
        return {
            code: 0,
            result: {
                ctime: "2020-10-21 17:59:49",
                email: "ren.jianshuai@hylinkad.com",
                id: 19,
                last_logintime: "2021-06-16 21:47:36",
                logintime: "2021-06-16 21:47:36",
                mobile: "13759986952",
                navi: 1,
                password: "6007e3ddb65fec59ef00c2e11e94cdf1",
                refresh_time: 1623851256,
                status: 1,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjM5MjMyNTYsInN1YiI6Im1hcHNqd3QiLCJuYmYiOjE2MjM4NTE1NTYsImF1ZCI6InVzZXIiLCJpYXQiOjE2MjM4NTEyNTYsImp0aSI6IjAzNzljNThhODk2YjllOTFmMGJkMDllZmU2NTcxMjQxIiwiaXNzIjoibWFwcyIsInN0YXR1cyI6MSwiZGF0YSI6eyJpZCI6MTksInVzZXJuYW1lIjoicmpzIiwidHJ1ZW5hbWUiOiLku7vlu7rluIUiLCJlbWFpbCI6InJlbi5qaWFuc2h1YWlAaHlsaW5rYWQuY29tIn19.yPCEIP77R-5qWHstvwIBDFTRP3hvDguHLgr39c30d_c",
                truename: "任建帅",
                userid: "s529r9e28u155946",
                username: "rjs",
                utime: "2021-06-16 21:47:36"
            }
        }
    },
    logout: config => {
        return {
            code: 0,
            result: true
        }
    },
    getInfo: () => {
        return {
            code: 0,
            result: {
                "id": 19,
                "username": "rjs",
                "userid": "s529r9e28u155946",
                "truename": "任建帅",
                "mobile": "13759986952",
                "email": "ren.jianshuai@hylinkad.com",
                "password": "6007e3ddb65fec59ef00c2e11e94cdf1",
                "status": 1,
                "logintime": "2021-06-17 17:52:20",
                "last_logintime": "2021-06-17 17:52:20",
                "refresh_time": 1623924638,
                "navi": 1,
                "ctime": "2020-10-21 17:59:49",
                "utime": "2021-06-17 18:10:38"
            }
        }
    },
    teamList: config => {
        return {
            code: 0,
            result: [
                {
                    id: "9",
                    is_manager: "1",
                    name: "rjs的团队",
                    status: "1",
                    teamid: "80a390341m9e65t4",
                    truename: "任建帅",
                    username: "rjs",
                },
                {
                    id: "7",
                    is_manager: "0",
                    name: "hulixia的团队",
                    status: "1",
                    teamid: "95t5568e20m0a293",
                    truename: "胡丽霞",
                    username: "hulixia",
                },
            ]
        }
    },
    userdetail: config => {
        return {
            code: 0,
            result: {
                advertiserlist: [],
                auth: null,
                authdetail: null,
                ctime: "2020-10-22 15:35:27",
                enddate: null,
                id: 125,
                is_auth: 1,
                is_manager: 1,
                join_status: 2,
                remark: "团队创建者",
                startdate: null,
                status: 1,
                team_id: 9,
                user_id: 19,
                utime: "2020-10-22 15:35:27",
            }
        }
    },
    removestatus: config => {
        return {
            code: 0,
            result: true
        }
    },
    userlists: () => {
        return {
            code: 0,
            result: {
                "teamuserlist": {
                    "total": "15",
                    "list": [
                        {
                            "user_id": "20",
                            "username": "hulixia",
                            "truename": "胡丽霞",
                            "email": "hu.lixia@hylink.com",
                            "logintime": "2021-06-17 17:19:10",
                            "status": "1",
                            "is_manager": "1",
                            "remark": "团队创建者",
                            "auth": null,
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "0"
                        },
                        {
                            "user_id": "49",
                            "username": "larry",
                            "truename": "larry",
                            "email": "liang.rui@hylink.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": null,
                            "auth": "[{\"3\":\"1\"},{\"4\":\"1\"},{\"5\":\"1\"},{\"6\":\"2\"},{\"8\":\"2\"},{\"10\":\"2\"},{\"11\":\"2\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "48",
                            "username": "hlx",
                            "truename": "hulixiaqq",
                            "email": "461115980@qq.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": "",
                            "auth": "[{\"3\":\"1\"},{\"4\":\"1\"},{\"5\":\"1\"},{\"6\":\"1\"},{\"8\":\"1\"},{\"10\":\"1\"},{\"11\":\"1\"}]",
                            "startdate": "2021-06-06",
                            "enddate": "2021-06-06",
                            "datestatus": "0",
                            "is_auth": "0"
                        },
                        {
                            "user_id": "42",
                            "username": "bxd",
                            "truename": "boxidong",
                            "email": "bo.xidong@hylink.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": null,
                            "auth": "[{\"3\":\"2\"},{\"4\":\"1\"},{\"5\":\"2\"},{\"6\":\"1\"},{\"8\":\"2\"},{\"10\":\"2\"},{\"11\":\"2\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "44",
                            "username": "lisa163",
                            "truename": "lisahu163",
                            "email": "hudaxiaojie1988@163.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": null,
                            "auth": "[{\"3\":\"0\"},{\"4\":\"1\"},{\"5\":\"0\"},{\"6\":\"1\"},{\"8\":\"0\"},{\"10\":\"0\"},{\"11\":\"0\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "19",
                            "username": "rjs",
                            "truename": "任建帅",
                            "email": "ren.jianshuai@hylinkad.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": "",
                            "auth": "[{\"3\":\"2\"},{\"4\":\"1\"},{\"5\":\"2\"},{\"6\":\"1\"},{\"8\":\"2\"},{\"10\":\"1\"},{\"11\":\"2\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "40",
                            "username": "ren",
                            "truename": "renjianshuai",
                            "email": "ren.jianshuai@hylink.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": "",
                            "auth": "[{\"3\":\"1\"},{\"4\":\"1\"},{\"5\":\"1\"},{\"6\":\"1\"},{\"8\":\"1\"},{\"10\":\"1\"},{\"11\":\"1\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "39",
                            "username": "lisa",
                            "truename": "lisa",
                            "email": "hu.lixia@hylinkad.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": null,
                            "auth": "[{\"3\":\"1\"},{\"4\":\"1\"},{\"5\":\"1\"},{\"6\":\"1\"},{\"8\":\"2\"},{\"10\":\"2\"},{\"11\":\"2\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "46",
                            "username": "linhao",
                            "truename": "林豪",
                            "email": "lin.hao@hylinkad.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": null,
                            "auth": "[{\"3\":\"1\"},{\"4\":\"1\"},{\"5\":\"1\"},{\"6\":\"1\"},{\"8\":\"2\"},{\"10\":\"2\"},{\"11\":\"2\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        },
                        {
                            "user_id": "36",
                            "username": "luca2",
                            "truename": "蒋路加",
                            "email": "luca.jiang@hylink.com",
                            "logintime": null,
                            "status": "1",
                            "is_manager": "0",
                            "remark": "",
                            "auth": "[{\"3\":\"2\"},{\"4\":\"1\"},{\"5\":\"2\"},{\"6\":\"2\"},{\"8\":\"1\"},{\"10\":\"1\"},{\"11\":\"1\"}]",
                            "startdate": null,
                            "enddate": null,
                            "datestatus": "1",
                            "is_auth": "1"
                        }
                    ]
                },
                "team": {
                    "id": 7,
                    "teamid": "95t5568e20m0a293",
                    "manager_user_id": 20,
                    "name": "hulixia的团队",
                    "ctime": "2020-10-21 18:27:39",
                    "utime": "2020-10-21 18:27:39"
                }
            }
        }
    },
    menuselectedlist: () => {
        return {
            code: 0,
            result: {
                "menulist": [
                    {
                        "name_zh": "广告智投",
                        "children": [
                            {
                                "id": 8,
                                "parent_id": 7,
                                "name_zh": "广告管理",
                                "explain_zh": "可修改广告设置、应用智能规则"
                            }
                        ]
                    },
                    {
                        "name_zh": "数据中心",
                        "children": [
                            {
                                "id": 3,
                                "parent_id": 1,
                                "name_zh": "客户报表",
                                "explain_zh": "可下载报表"
                            },
                            {
                                "id": 5,
                                "parent_id": 1,
                                "name_zh": "效果报表",
                                "explain_zh": "可下载报表"
                            },
                            {
                                "id": 6,
                                "parent_id": 1,
                                "name_zh": "报表订阅",
                                "explain_zh": "可设置定时邮件发送指定的报表"
                            }
                        ]
                    },
                    {
                        "name_zh": "辅助工具",
                        "children": [
                            {
                                "id": 10,
                                "parent_id": 9,
                                "name_zh": "规则管理>智能规则",
                                "explain_zh": "可在团队内创建智能规则，管理团队内所有智能规则"
                            },
                            {
                                "id": 11,
                                "parent_id": 9,
                                "name_zh": "规则管理>规则任务",
                                "explain_zh": "可在团队内创建规则任务，管理团队内所有规则任务"
                            }
                        ]
                    },
                    {
                        "name_zh": "系统管理",
                        "children": [
                            {
                                "id": 4,
                                "parent_id": 2,
                                "name_zh": "账号管理",
                                "explain_zh": "可修改、删除管理员分配的广告账号。（不可修改客户）"
                            }
                        ]
                    }
                ]
            }
        }
    },
    teamuserauth: () => {
        return {
            code: 0,
            result: {
                "auth": [
                    {
                        "3": "1"
                    },
                    {
                        "4": "1"
                    },
                    {
                        "5": "1"
                    },
                    {
                        "6": "2"
                    },
                    {
                        "8": "2"
                    },
                    {
                        "10": "2"
                    },
                    {
                        "11": "2"
                    }
                ],
                "startdate": null,
                "enddate": null,
                "advertiserlist": [
                    {
                        "name": "微信广告",
                        "name_code": "wx",
                        "list": [
                            {
                                "id": 130,
                                "media_advertiser_id": "4032237",
                                "media_advertiser_name": "雅诗兰黛",
                                "platform": 3
                            },
                            {
                                "id": 121,
                                "media_advertiser_id": "4032257",
                                "media_advertiser_name": "Origins悦木之源",
                                "platform": 3
                            },
                            {
                                "id": 129,
                                "media_advertiser_id": "4032101",
                                "media_advertiser_name": "倩碧Clinique",
                                "platform": 3
                            }
                        ]
                    },
                    {
                        "name": "巨量引擎",
                        "name_code": "jl",
                        "list": [
                            {
                                "id": 59,
                                "media_advertiser_id": "1665378445564936",
                                "media_advertiser_name": "零跑T03上市直播",
                                "platform": 1
                            },
                            {
                                "id": 171,
                                "media_advertiser_id": "1685566033965069",
                                "media_advertiser_name": "零跑T03效果通V5",
                                "platform": 1
                            }
                        ]
                    }
                ]
            }
        }
    },
    selectlist: () => {
        return {
            code: 0,
            result: {
                "clientlist": [
                    {
                        "id": 71,
                        "name": "雅思兰黛-微信",
                        "industry_id": 35,
                        "industry_name": "医疗/护理/保健/卫生",
                        "num": 3
                    },
                    {
                        "id": 124,
                        "name": "极兔",
                        "industry_id": 2,
                        "industry_name": "快速消费品(食品,饮料,化妆品)",
                        "num": 1
                    },
                    {
                        "id": 153,
                        "name": "零跑C1",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 1
                    },
                    {
                        "id": 154,
                        "name": "商务管家-腾讯",
                        "industry_id": 2,
                        "industry_name": "快速消费品(食品,饮料,化妆品)",
                        "num": 1
                    },
                    {
                        "id": 156,
                        "name": "零跑",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 0
                    },
                    {
                        "id": 157,
                        "name": "悦木之源",
                        "industry_id": 8,
                        "industry_name": "娱乐/休闲/体育",
                        "num": 0
                    },
                    {
                        "id": 158,
                        "name": "零跑CV2",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 0
                    },
                    {
                        "id": 159,
                        "name": "倩碧-微信",
                        "industry_id": 2,
                        "industry_name": "快速消费品(食品,饮料,化妆品)",
                        "num": 0
                    },
                    {
                        "id": 160,
                        "name": "零跑C",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 2
                    },
                    {
                        "id": 161,
                        "name": "多账号客户",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 0
                    },
                    {
                        "id": 162,
                        "name": "HYLINK test",
                        "industry_id": 12,
                        "industry_name": "广告",
                        "num": 0
                    },
                    {
                        "id": 172,
                        "name": "零跑T03",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 2
                    },
                    {
                        "id": 193,
                        "name": "效果通",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 1
                    },
                    {
                        "id": 194,
                        "name": "0603",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 1
                    },
                    {
                        "id": 197,
                        "name": "T03 V6",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 0
                    },
                    {
                        "id": 198,
                        "name": "T03 V5",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 1
                    },
                    {
                        "id": 201,
                        "name": "松下",
                        "industry_id": 1,
                        "industry_name": "汽车及零配件",
                        "num": 0
                    },
                    {
                        "id": 202,
                        "name": "KELON",
                        "industry_id": 2,
                        "industry_name": "快速消费品(食品,饮料,化妆品)",
                        "num": 1
                    },
                    {
                        "id": 203,
                        "name": "酒",
                        "industry_id": 2,
                        "industry_name": "快速消费品(食品,饮料,化妆品)",
                        "num": 1
                    }
                ]
            }
        }
    }
}