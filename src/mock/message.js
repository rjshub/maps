export default {
    enum: config => {
        return {
            code: 0,
            result: {
                data: {
                    deal_status: {
                        0: "待处理",
                        1: "同意",
                        2: "拒绝"
                    },
                    platform: [
                        {
                            code: "jl",
                            id: 1,
                            name: "巨量引擎",
                            report_synctime: "2021-06-16 21:27:06",
                        },
                        {
                            code: "tx",
                            id: 2,
                            name: "腾讯广告",
                            report_synctime: "2021-06-16 21:19:32",
                        },
                        {
                            code: "wx",
                            id: 3,
                            name: "微信广告",
                            report_synctime: "2021-06-16 21:14:43",
                        },
                    ],
                    status: {
                        0: "未读",
                        1: "已读"
                    },
                    type: {
                        1: "团队申请",
                        2: "退出团队",
                        3: "权限变更",
                        4: "权限申请",
                        5: "信息修改",
                        6: "同步失败",
                        7: "广告推送",
                        8: "规则提醒"
                    }
                }
            }
        }
    },
    getTotal: config => {
        return {
            code: 0,
            result: {
                total: 20
            }
        }
    },
    getMessageInfo: () => {
        return {
            code: 0,
            result: [
                {
                    "id": 10,
                    "user_id": 20,
                    "team_id": 0,
                    "type": 1,
                    "letter_status": 1,
                    "email_status": 1,
                    "content": "",
                    "ctime": "2020-10-28 09:43:18",
                    "utime": "2021-05-28 17:22:01"
                },
                {
                    "id": 21,
                    "user_id": 20,
                    "team_id": 7,
                    "type": 2,
                    "letter_status": 1,
                    "email_status": 1,
                    "content": "hu.lixia@hylink.com",
                    "ctime": "2021-04-19 09:45:18",
                    "utime": "2021-05-17 21:16:55"
                }
            ]
        }
    },
    getEmailList: () => {
        return {
            code: 0,
            result: [
                {
                    "email": "hu.lixia@hylink.com",
                    "username": "hulixia"
                },
                {
                    "email": "bo.xidong@hylink.com",
                    "username": "bxd"
                },
                {
                    "email": "hudaxiaojie1988@163.com",
                    "username": "lisa163"
                },
                {
                    "email": "ren.jianshuai@hylinkad.com",
                    "username": "rjs"
                },
                {
                    "email": "ren.jianshuai@hylink.com",
                    "username": "ren"
                },
                {
                    "email": "hu.lixia@hylinkad.com",
                    "username": "lisa"
                },
                {
                    "email": "lin.hao@hylinkad.com",
                    "username": "linhao"
                },
                {
                    "email": "luca.jiang@hylink.com",
                    "username": "luca2"
                },
                {
                    "email": "miki.cao@hylink.com",
                    "username": "pinocao"
                },
                {
                    "email": "liang.rui@hylink.com",
                    "username": "larry"
                }
            ]
        }
    },
    getList: config => {
        const param = JSON.parse(config.body)
        let type = []
        if (param.msg_type == '3') {
            type = [7, 8]
        } else if (param.msg_type == '2') {
            type = [1, 4]
        } else {
            type = [
                1,
                2,
                3,
                4,
                5,
                6
            ]
        }
        return {
            code: 0,
            result: {
                "total": 0,
                "list": [],
                "type": type
            }
        }
    },
    popList: () => {
        return {
            code: 0,
            result: {
                list: []
            }
        }
    }
}