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
    }
}