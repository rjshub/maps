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
    }
}