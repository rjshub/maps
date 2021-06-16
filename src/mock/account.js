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
    }
}