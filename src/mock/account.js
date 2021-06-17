export default {
    getCheckRelationAdvertiser: config => {
        return {
            code: 0,
            result: {
                msg_type: 0,
                total: 10
            }
        }
    },
    adminAccountsTotal: config => {
        return {
            code: 0,
            result: {
                msg_type: 0,
                total: 10
            }
        }
    },
    clientList: config => {
        return {
            code: 0,
            result: [
                {
                    id: 123,
                    industry_id: 1,
                    industry_name: "汽车及零配件",
                    name: "ceshi ",
                    num: 0
                },
                {
                    id: 132,
                    industry_id: null,
                    industry_name: null,
                    name: "aaa",
                    num: 0
                },
                {
                    id: 133,
                    industry_id: 1,
                    industry_name: "汽车及零配件",
                    name: "新建",
                    num: 0
                }
            ]
        }
    },
    adminAccounts: () => {
        return {
            code: 0,
            result: {
                "total": 15,
                "total_page": 2,
                "page": 1,
                "page_size": 10,
                "list": [
                    {
                        "advertiser_id": 187,
                        "media_advertiser_id": "1695891213526029",
                        "media_advertiser_name": "滴藏酒-客户版-直播2",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 1,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:54",
                        "client_name": "酒",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 170,
                        "media_advertiser_id": "1663932789210125",
                        "media_advertiser_name": "零跑T03-效果通",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:31:05",
                        "client_name": "效果通",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 171,
                        "media_advertiser_id": "1685566033965069",
                        "media_advertiser_name": "零跑T03效果通V5",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:31:02",
                        "client_name": "T03 V5",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 186,
                        "media_advertiser_id": "1698363722267655",
                        "media_advertiser_name": "KOLON SPORT可隆",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:54",
                        "client_name": "KELON",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 183,
                        "media_advertiser_id": "1698186486252551",
                        "media_advertiser_name": "零跑T03效果通V9",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:48",
                        "client_name": "零跑T03",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 164,
                        "media_advertiser_id": "1685566035250183",
                        "media_advertiser_name": "零跑C11效果通V2",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:31",
                        "client_name": "0603",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 169,
                        "media_advertiser_id": "1686292439775240",
                        "media_advertiser_name": "零跑C11效果通V6",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:27",
                        "client_name": "零跑C",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 161,
                        "media_advertiser_id": "1685566034637005",
                        "media_advertiser_name": "零跑C11效果通V1",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:24",
                        "client_name": "零跑C",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 157,
                        "media_advertiser_id": "1681695586570253",
                        "media_advertiser_name": "零跑T03效果通V3",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:17",
                        "client_name": "零跑C1",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    },
                    {
                        "advertiser_id": 59,
                        "media_advertiser_id": "1665378445564936",
                        "media_advertiser_name": "零跑T03上市直播",
                        "platform": 1,
                        "status": 1,
                        "syncstatus": 2,
                        "syncfailreason": null,
                        "synctime": "2021-06-17 17:30:05",
                        "client_name": "零跑T03",
                        "owner": "hulixia",
                        "email": "hu.lixia@hylink.com",
                        "truename": "胡丽霞"
                    }
                ]
            }
        }
    }
}