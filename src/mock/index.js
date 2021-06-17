import Mock from 'mockjs'
import UserApi from './uesr'
import AccountApi from './account'
import MessageApi from './message'
import ReportApi from './report'
import Advertising from './Advertising'
import TaskApi from './ruletask'
import RuleApi from './rule'
import HelpApi from './help'

// 设置拦截ajax请求的相应时间
// Mock.setup({
//     timeout: '200-600'
// });

// 用户+团队
Mock.mock(/\/nologin\/login/, 'post', UserApi.login)
Mock.mock(/\/user\/logout/, 'post', UserApi.logout)
Mock.mock(/\/user\/getInfo/, 'post', UserApi.getInfo)
Mock.mock(/\/user\/removestatus/, 'post', UserApi.removestatus)
Mock.mock(/\/team\/userteamlist/, 'post', UserApi.teamList)
Mock.mock(/\/team\/userdetail/, 'post', UserApi.userdetail)
Mock.mock(/\/team\/userlists/, 'post', UserApi.userlists)
Mock.mock(/\/team\/menuselectedlist/, 'post', UserApi.menuselectedlist)
Mock.mock(/\/team\/teamuserauth/, 'post', UserApi.teamuserauth)
Mock.mock(/\/team\/selectlist/, 'post', UserApi.selectlist)

// 账号
Mock.mock(/\/account\/adminAccountsTotal/, 'post', AccountApi.adminAccountsTotal)
Mock.mock(/\/account\/getCheckRelationAdvertiser/, 'post', AccountApi.getCheckRelationAdvertiser)
Mock.mock(/\/account\/clientList/, 'post', AccountApi.clientList)
Mock.mock(/\/account\/adminAccounts/, 'post', AccountApi.adminAccounts)

// 消息
Mock.mock(/\/message\/enum/, 'post', MessageApi.enum)
Mock.mock(/\/message\/getTotal/, 'post', MessageApi.getTotal)
Mock.mock(/\/message\/getMessageInfo/, 'post', MessageApi.getMessageInfo)
Mock.mock(/\/message\/getEmailList/, 'post', MessageApi.getEmailList)
Mock.mock(/\/message\/getTotal/, 'post', MessageApi.getTotal)
Mock.mock(/\/message\/getList/, 'post', MessageApi.getList)
Mock.mock(/\/message\/popList/, 'post', MessageApi.popList)

// 数据中心
Mock.mock(/\/industry\/lists/, 'post', ReportApi.industryList)
Mock.mock(/\/report\/chartSelectlist/, 'post', ReportApi.chartSelectlist)
Mock.mock(/\/report\/selectlist/, 'post', ReportApi.selectlist)
Mock.mock(/\/report\/titlelist/, 'post', ReportApi.titlelist)
Mock.mock(/\/report\/checkreportdate/, 'post', ReportApi.checkreportdate)
Mock.mock(/\/report\/fieldcheck/, 'post', ReportApi.fieldcheck)
Mock.mock(/\/report\/percentage/, 'post', ReportApi.percentage)
Mock.mock(/\/report\/advertiserlist/, 'post', ReportApi.advertiserlist)
Mock.mock(/\/report\/platformPercentage/, 'post', ReportApi.platformPercentage)
Mock.mock(/\/report\/clientPercentage/, 'post', ReportApi.clientPercentage)
Mock.mock(/\/report\/trend/, 'post', ReportApi.trend)
Mock.mock(/\/report\/effectlist/, 'post', ReportApi.effectlist)
Mock.mock(/\/emailtask\/list/, 'post', ReportApi.emailTaskList)
Mock.mock(/\/emailtask\/tasklog/, 'post', ReportApi.tasklog)
Mock.mock(/\/emailtask\/selectlist/, 'post', ReportApi.emailtaskselectlist)
Mock.mock(/\/emailtask\/detail/, 'post', ReportApi.detail)

// 智能投放  /adpush/jl/**/**/
Mock.mock(/\/adpush\/jl\/advertiser\/getFilterList/, 'post', Advertising.accountGetFilterList)
Mock.mock(/\/adpush\/jl\/advertiser\/titlelist/, 'post', Advertising.accountTitleList)
Mock.mock(/\/adpush\/jl\/advertiser\/getList/, 'post', Advertising.accountTableList)
Mock.mock(/\/adpush\/jl\/campaign\/getFilterList/, 'post', Advertising.GetFilterList)
Mock.mock(/\/adpush\/jl\/campaign\/titlelist/, 'post', Advertising.TitleList)
Mock.mock(/\/adpush\/jl\/campaign\/getList/, 'post', Advertising.TableList)
Mock.mock(/\/adpush\/jl\/campaignedit\/getList/, 'post', Advertising.TableList)
Mock.mock(/\/adpush\/jl\/campaignedit\/checkAdvertiserStatus/, 'post', Advertising.checkAdvertiserStatus)
Mock.mock(/\/adpush\/jl\/campaignedit\/open/, 'post', Advertising.open)
Mock.mock(/\/adpush\/jl\/campaignedit\/close/, 'post', Advertising.close)
Mock.mock(/\/adpush\/jl\/ad\/getFilterList/, 'post', Advertising.GetFilterList)
Mock.mock(/\/adpush\/jl\/ad\/titlelist/, 'post', Advertising.TitleList)
Mock.mock(/\/adpush\/jl\/ad\/getList/, 'post', Advertising.TableList)
Mock.mock(/\/adpush\/jl\/adedit\/getList/, 'post', Advertising.TableList)
Mock.mock(/\/adpush\/jl\/adedit\/checkAdvertiserStatus/, 'post', Advertising.checkAdvertiserStatus)
Mock.mock(/\/adpush\/jl\/adedit\/open/, 'post', Advertising.open)
Mock.mock(/\/adpush\/jl\/adedit\/close/, 'post', Advertising.close)
Mock.mock(/\/adpush\/jl\/creative\/getFilterList/, 'post', Advertising.GetFilterList)
Mock.mock(/\/adpush\/jl\/creative\/titlelist/, 'post', Advertising.creativeTitleList)
Mock.mock(/\/adpush\/jl\/creative\/getList/, 'post', Advertising.creativeTableList)

// 规则任务
Mock.mock(/\/ruletask\/trees/, 'post', TaskApi.trees)
Mock.mock(/\/ruletask\/rulelist/, 'post', TaskApi.rulelist)
Mock.mock(/\/ruletask\/ruletasklist/, 'post', TaskApi.ruletasklist)
Mock.mock(/\/ruletask\/ruletaskdetail/, 'post', TaskApi.ruletaskdetail)

// 规则
Mock.mock(/\/rule\/list/, 'post', RuleApi.list)
Mock.mock(/\/rule\/listdetail/, 'post', RuleApi.listdetail)
Mock.mock(/\/rule\/detail/, 'post', RuleApi.detail)
Mock.mock(/\/rule\/modellist/, 'post', RuleApi.modellist)
Mock.mock(/\/rule\/crontabloglist/, 'post', RuleApi.crontabloglist)

// 帮助中心
Mock.mock(/\/helpcenter\/selectlist/, 'post', HelpApi.selectlist)
Mock.mock(/\/helpcenter\/lists/, 'post', HelpApi.lists)