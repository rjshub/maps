import Mock from 'mockjs'
import UserApi from './uesr'
import AccountApi from './account'
import MessageApi from './message'
import ReportApi from './report'

// 设置拦截ajax请求的相应时间
// Mock.setup({
//     timeout: '200-600'
// });

// let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//     if (key === './index.js') return;
//     configArray = configArray.concat(files(key).default);
// });

// // 注册所有的mock服务
// configArray.forEach((item) => {
//     for (let [path, target] of Object.entries(item)) {
//         let protocol = path.split('|');
//         Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
//     }
// });


// 用户+团队
Mock.mock(/\/nologin\/login/, 'post', UserApi.login)
Mock.mock(/\/user\/logout/, 'post', UserApi.logout)
Mock.mock(/\/team\/userteamlist/, 'post', UserApi.teamList)
Mock.mock(/\/team\/userdetail/, 'post', UserApi.userdetail)

// 账号
Mock.mock(/\/account\/adminAccountsTotal/, 'post', AccountApi.adminAccountsTotal)
Mock.mock(/\/account\/getCheckRelationAdvertiser/, 'post', AccountApi.getCheckRelationAdvertiser)
Mock.mock(/\/account\/clientList/, 'post', AccountApi.clientList)

// 消息
Mock.mock(/\/message\/enum/, 'post', MessageApi.enum)
Mock.mock(/\/message\/getTotal/, 'post', MessageApi.getTotal)

// 数据中心
Mock.mock(/\/industry\/lists/, 'post', ReportApi.industryList)