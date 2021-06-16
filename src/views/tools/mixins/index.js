import store from "@/store";

let [attribution_text, during_text] = ['预估转化成本', '范围内']
if (store.state.user.language == 'en') {
  attribution_text = 'eCPL'
  during_text = 'Specified range'
}

// 消耗
const cost_campaignDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '消耗',
  name_en: 'Cost',
  code: '2'
}, {
  name_zh: 'Campaign预算',
  name_en: 'Campaign Budget',
  code: '3'
}]
const cost_adDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '消耗',
  name_en: 'Cost',
  code: '2'
}, {
  name_zh: 'Ad预算',
  name_en: 'Ad Budget',
  code: '4'
}]
// 转化成本（上报）convert_cost_
const convert_cost_campaignDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '转化成本（上报）',
  name_en: 'Convert Cost',
  code: '2'
}, {
  name_zh: 'Campaign预算',
  name_en: 'Campaign Budget',
  code: '3'
}]
const convert_cost_adDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '转化成本（上报）',
  name_en: 'Convert Cost',
  code: '2'
}, {
  name_zh: 'Ad预算',
  name_en: 'Ad Budget',
  code: '4'
}]
// 转化成本（播放）attribution_convert_cost_
const attribution_convert_cost_campaignDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '转化成本（播放）',
  name_en: 'Attribution Convert Cost',
  code: '2'
}, {
  name_zh: 'Campaign预算',
  name_en: 'Campaign Budget',
  code: '3'
}]
const attribution_convert_cost_adDataType = [{
  name_zh: '固定数值',
  name_en: 'guDing',
  code: '1'
}, {
  name_zh: '转化成本（播放）',
  name_en: 'Attribution Convert Cost',
  code: '2'
}, {
  name_zh: 'Ad预算',
  name_en: 'Ad Budget',
  code: '4'
}]
//   消耗数据范围
const dataScope = [{
  name_zh: '总数据',
  name_en: 'Lifetime',
  code: '1',
},
{
  name_zh: '近3天数据',
  name_en: 'Last 3 days',
  code: '2',
},
{
  name_zh: '当天数据',
  name_en: 'Today',
  code: '3',
},
]
const dataRangeList = [
  {
    name_zh: '范围内',
    name_en: '',
    code: '1',
    disabled: false
  },
  {
    name_zh: '范围内TOP3',
    name_en: '',
    code: '2',
    disabled: false
  },
  {
    name_zh: '不设置范围',
    name_en: '',
    code: '3',
    disabled: false
  }
]

const config = {
  // 维度
  rangeList: [{
    code: "1",
    name: "Campaign",
  },
  {
    code: "2",
    name: "Ad",
  },
  ],
  //   有效期
  validityList: [{
    code: "0",
    name_zh: "从今天开始长期生效",
    name_en: "Long-term effective starting today",
  },
  {
    code: "1",
    name_zh: "设置开始和结束日期",
    name_en: "Set start and end dates",
  },
  ],
  //   条件限制
  conditionLimitList: [{
    code: "1",
    name_zh: "满足以下所有条件",
    name_en: "All of the following match",
  },
  {
    code: "2",
    name_zh: "满足以下任一条件",
    name_en: "Any of the following match",
  },
  ],
  //   ad、campaign操作
  handleUpdateList: [{
    name_zh: "调整为",
    name_en: "Change to",
    code: "1",
  },
  {
    name_zh: "提高",
    name_en: "Increase by",
    code: "2",
  },
  {
    name_zh: "降低",
    name_en: "Decrease by",
    code: "3",
  },
  ],
  //   频率
  rateList: [{
    name_zh: "每0.5小时",
    name_en: "Every 0.5 hour",
    code: "0.5",
    key: 0.5,
    enable: true,
  },
  {
    name_zh: "每3小时",
    name_en: "Every 3 hours",
    code: "3",
    key: 3,
    enable: true,
  },
  {
    name_zh: "每6小时",
    name_en: "Every 6 hours",
    code: "6",
    key: 6,
    enable: true,
  },
  {
    name_zh: "每12小时",
    name_en: "Every 12 hours",
    code: "12",
    key: 12,
    enable: true,
  },
  {
    name_zh: "每24小时",
    name_en: "Every 24 hours",
    code: "24",
    key: 24,
    enable: true,
  },
  ],

  //   条件所需参数配置
  //   消耗数据范围
  dataScope: [{
    name_zh: '总数据',
    name_en: 'Lifetime',
    code: '1',
    disabled: false
  },
  {
    name_zh: '近3天数据',
    name_en: 'Last 3 days',
    code: '2',
    disabled: false
  },
  {
    name_zh: '当天数据',
    name_en: 'Today',
    code: '3',
    disabled: false
  },
  ],
  //   转化成本
  dataScopeCostPer: [{
    name_zh: '总数据',
    name_en: 'Lifetime',
    code: '1',
  },
  {
    name_zh: '当天数据',
    name_en: 'Today',
    code: '3',
  },
  ],
  //   转化成本数据选择
  // convertCostData: convert_cost,
  //   运算符
  formulaList: [{
    name_zh: '=',
    name_en: '=',
    code: '1',
  },
  {
    name_zh: '>',
    name_en: '>',
    code: '2',
  },
  {
    name_zh: '<',
    name_en: '<',
    code: '3',
  },
  {
    name_zh: '≥',
    name_en: '≥',
    code: '4',
  },
  {
    name_zh: '≤',
    name_en: '≤',
    code: '5',
  },
  {
    name_zh: '介于',
    name_en: 'Between',
    code: '6',
  },
  ],
  //   campaign条件指标
  campaignConditionTarget: [
    // {
    //   name_zh: '已投放时间',
    //   name_en: 'Elapsed Time',
    //   code: 'elapsed_time'
    // },
    {
      name_zh: '消耗',
      name_en: 'Cost',
      code: 'cost'
    },
    {
      name_zh: '投放状态',
      name_en: 'Delivery',
      code: 'delivery'
    },
    {
      name_zh: '转化数（上报）',
      name_en: 'Conversions(Report)',
      code: 'convert'
    },
    {
      name_zh: '转化成本（上报）',
      name_en: 'Cost per conversion(Report)',
      code: 'convert_cost'
    },
    {
      name_zh: '转化数（播放）',
      name_en: 'Conversions(IMP)',
      code: 'attribution_convert'
    },
    {
      name_zh: '转化成本（播放）',
      name_en: 'Cost per conversion(IMP)',
      code: 'attribution_convert_cost'
    },
    {
      name_zh: 'Campaign预算类型',
      name_en: 'Campaign Budget Type',
      code: 'campaign_budget_type'
    },
  ],
  //   ad条件指标
  AdConditionTarget: [{
    name_zh: '已投放时间',
    name_en: 'Elapsed Time',
    code: 'elapsed_time'
  },
  {
    name_zh: '消耗',
    name_en: 'Cost',
    code: 'cost'
  },
  {
    name_zh: '投放状态',
    name_en: 'Delivery',
    code: 'delivery'
  },
  {
    name_zh: '转化数（上报）',
    name_en: 'Conversions(Report)',
    code: 'convert'
  },
  {
    name_zh: '转化成本（上报）',
    name_en: 'Cost per conversion(Report)',
    code: 'convert_cost'
  },
  {
    name_zh: '转化数（播放）',
    name_en: 'Conversions(IMP)',
    code: 'attribution_convert'
  },
  {
    name_zh: '转化成本（播放）',
    name_en: 'Cost per conversion(IMP)',
    code: 'attribution_convert_cost'
  },
  {
    name_zh: 'Ad预算类型',
    name_en: 'Ad Budget Type',
    code: 'ad_budget_type'
  },
  ],
  //   campaign预算类型
  campaignBudgetType: [{
    name_zh: '不限',
    name_en: 'No Limit',
    code: '1'
  },
  {
    name_zh: '日预算',
    name_en: 'Daily',
    code: '2'
  },
  ],
  // ad预算类型
  adBudgetType: [{
    name_zh: '不限',
    name_en: 'No Limit',
    code: '1'
  },
  {
    name_zh: '日预算',
    name_en: 'Daily',
    code: '2'
  },
  {
    name_zh: '总预算',
    name_en: 'zongyusuan',
    code: '3'
  }
  ],
  //   campaign投放状态
  campaignDeliveryList: [{
    name_zh: '有效',
    name_en: 'Enable',
    code: '1'
  },
  {
    name_zh: '暂停',
    name_en: 'Pause',
    code: '2'
  },
  {
    name_zh: '唯一有效',
    name_en: 'the only one enabled',
    code: '3'
  },
  ],
  adDeliveryList: [{
    name_zh: '投放中',
    name_en: 'Active',
    code: '1'
  },
  {
    name_zh: '暂停',
    name_en: 'Pause',
    code: '2'
  },
  {
    name_zh: '唯一投放中',
    name_en: 'The only one active',
    code: '3'
  },
  ],
  //   投放时间
  elapsedTimeForm: {
    field: "elapsed_time",
    compare: "1",
    hour: "",
    hour2: ""
  },
  //   消耗
  costForm: {
    field: "cost",
    data_range: "1", //1总数据，2近3天数据，3当天数据
    compare: "1",
    type: "", //costrange为消耗时出现，1总数据,2近三天，3当天
    cost: "",
    percent: "", //50%
    costrange: '1', //数据类型，1固定值，2消耗。3campaign预算，4ad预算
    costrangetype: '', //范围，1范围内，2范围内top3,3不设置范围
    type2: "", //选择介于的时候才出现
    cost2: "", //选择介于的时候才出现
    percent2: "", //选择介于的时候才出现
    costrange2: '',
    costrangetype2: '',
  },
  //   投放状态
  deliveryForm: {
    field: "delivery",
    compare: "1",
    status: "1" //1有效，2暂停，3唯一投放中
  },
  //   转化数（上报）
  convertForm: {
    field: "convert",
    compare: "1",
    convert: "",
    convert2: "" //介于的时候才有值
  },
  //   转化成本（上报）
  convertCostForm: {
    field: "convert_cost",
    data_range: "1", //1总数据，3当天数据
    compare: "1",
    convert_cost: "",
    percent: "", //50%
    type: '',
    costrange: '1', //数据类型，1固定值，2消耗。3campaign预算，4ad预算
    costrangetype: '', //范围，1范围内，2范围内top3,3不设置范围
    convert_cost2: "", //选择介于的时候才出现
    percent2: "", //选择介于的时候才出现
    type2: "", //选择介于的时候才出现
    costrange2: '',
    costrangetype2: '',
  },
  //   转化数（播放）
  attributionConvertForm: {
    field: "attribution_convert",
    compare: "1",
    attribution_convert: "",
    attribution_convert2: "" //介于的时候才有值
  },
  //   转化成本（播放）
  attributionConvertCostForm: {
    field: "attribution_convert_cost",
    data_range: "1", //1总数据，2近3天数据，3当天数据
    compare: "1",
    attribution_convert_cost: "",
    percent: "", //50%
    type: '',
    costrange: '1', //数据类型，1固定值，2消耗。3campaign预算，4ad预算
    costrangetype: '', //范围，1范围内，2范围内top3,3不设置范围
    attribution_convert_cost2: "", //选择介于的时候才出现
    percent2: "", //选择介于的时候才出现
    type2: "", //选择介于的时候才出现
    costrange2: '',
    costrangetype2: '',
  },
  //   Campaign预算类型
  campaignBudgetTypeForm: {
    field: "campaign_budget_type",
    compare: "1",
    type: "1" //1不限，2日预算
  },
  //   ad预算类型
  adBudgetTypeForm: {
    field: "ad_budget_type",
    compare: "1",
    type: "1" //1不限，2日预算
  },

  //   消耗表单配置
  //   固定值+介于
  costrange_1_6: [{
    type: "input",
    key: "cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "input",
    key: "cost2",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   固定值+其他
  costrange_1_X: [{
    type: "input",
    key: "cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   消耗+介于
  costrange_2_6: [{
    type: "select",
    key: "type",
    options: dataScope,
    relation: 'type2',
    show: true
  },
  {
    type: "select",
    key: "costrangetype",
    options: dataRangeList,
    relation: 'costrangetype2',
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "type2",
    options: dataScope,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "costrangetype2",
    options: dataRangeList,
    disabled: true,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  // 消耗+其他,(top3)
  costrange_2_X: [
    {
      type: "select",
      key: "type",
      options: dataScope,
      show: true
    },
    {
      type: "select",
      key: "costrangetype",
      options: dataRangeList,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      readonly: false,
      show: true
    },
  ],
  //   campaign、ad预算+其他
  costrange_3_X: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  // campaign、ad预算+介于
  costrange_3_6: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
    {
      type: "text",
      key: "-",
      append: "",
      show: true
    },
    {
      type: "select",
      key: "costrange2",
      options: cost_campaignDataType,
      disabled: true,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent2",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],

  // 转化成本（上报）
  //   固定值+介于
  convert_cost_range_1_6: [{
    type: "input",
    key: "convert_cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: convert_cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "input",
    key: "convert_cost2",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   固定值+其他
  convert_cost_range_1_X: [{
    type: "input",
    key: "convert_cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   消耗+介于
  convert_cost_range_2_6: [{
    type: "select",
    key: "type",
    options: dataScope,
    relation: 'type2',
    show: true
  },
  {
    type: "select",
    key: "costrangetype",
    options: dataRangeList,
    relation: 'costrangetype2',
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: convert_cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "type2",
    options: dataScope,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "costrangetype2",
    options: dataRangeList,
    disabled: true,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  // 消耗+其他
  convert_cost_range_2_X: [
    {
      type: "select",
      key: "type",
      options: dataScope,
      show: true
    },
    {
      type: "select",
      key: "costrangetype",
      options: dataRangeList,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  //   campaign、ad预算+其他
  convert_cost_range_3_X: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  // campaign、ad预算+介于
  convert_cost_range_3_6: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
    {
      type: "text",
      key: "-",
      append: "",
      show: true
    },
    {
      type: "select",
      key: "costrange2",
      options: convert_cost_campaignDataType,
      disabled: true,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent2",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  // 转化成本（上报） 完

  // 转化成本（播放）
  //   固定值+介于
  attribution_convert_cost_range_1_6: [{
    type: "input",
    key: "attribution_convert_cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: attribution_convert_cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "input",
    key: "attribution_convert_cost2",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   固定值+其他
  attribution_convert_cost_range_1_X: [{
    type: "input",
    key: "attribution_convert_cost",
    append: "",
    placeholder: attribution_text,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  //   消耗+介于
  attribution_convert_cost_range_2_6: [{
    type: "select",
    key: "type",
    options: dataScope,
    relation: 'type2',
    show: true
  },
  {
    type: "select",
    key: "costrangetype",
    options: dataRangeList,
    relation: 'costrangetype2',
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  {
    type: "text",
    key: "-",
    append: "",
    show: true
  },
  {
    type: "select",
    key: "costrange2",
    options: attribution_convert_cost_campaignDataType,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "type2",
    options: dataScope,
    disabled: true,
    show: true
  },
  {
    type: "select",
    key: "costrangetype2",
    options: dataRangeList,
    disabled: true,
    show: true
  },
  {
    type: "text",
    key: "×",
    append: "",
    show: true
  },
  {
    type: "input",
    key: "percent2",
    append: "%",
    placeholder: "0-10000",
    show: true
  },
  ],
  // 消耗+其他
  attribution_convert_cost_range_2_X: [
    {
      type: "select",
      key: "type",
      options: dataScope,
      show: true
    },
    {
      type: "select",
      key: "costrangetype",
      options: dataRangeList,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  //   campaign、ad预算+其他
  attribution_convert_cost_range_3_X: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
  // campaign、ad预算+介于
  attribution_convert_cost_range_3_6: [
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
    {
      type: "text",
      key: "-",
      append: "",
      show: true
    },
    {
      type: "select",
      key: "costrange2",
      options: attribution_convert_cost_campaignDataType,
      disabled: true,
      show: true
    },
    {
      type: "text",
      key: "×",
      append: "",
      show: true
    },
    {
      type: "input",
      key: "percent2",
      append: "%",
      placeholder: "0-10000",
      show: true
    },
  ],
}


let range = '1'

const reset_range = (param, info) => {
  range = param
  // 消耗
  config.costrange_1_6[4].options = range == '1' ? cost_campaignDataType : cost_adDataType
  config.costrange_3_6[3].options = range == '1' ? cost_campaignDataType : cost_adDataType
  // 上报
  config.convert_cost_range_1_6[4].options = range == '1' ? convert_cost_campaignDataType : convert_cost_adDataType
  config.convert_cost_range_3_6[3].options = range == '1' ? convert_cost_campaignDataType : convert_cost_adDataType
  // 播放
  config.attribution_convert_cost_range_1_6[4].options = range == '1' ? attribution_convert_cost_campaignDataType : attribution_convert_cost_adDataType
  config.attribution_convert_cost_range_3_6[3].options = range == '1' ? attribution_convert_cost_campaignDataType : attribution_convert_cost_adDataType
}

export {
  config,
  cost_campaignDataType,
  cost_adDataType,
  convert_cost_campaignDataType,
  convert_cost_adDataType,
  attribution_convert_cost_campaignDataType,
  attribution_convert_cost_adDataType,
  reset_range
}
