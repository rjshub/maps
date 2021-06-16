<template>
    <maps-drawer :title="drawer_title"
        class="create-drawer"
        ref="mpasDrawer_task"
        @close="close_drawer"
        :loading="isLoading">
        <section slot="drawerHeader">
            <el-button size="mini"
                class="maps-button-mini"
                @click="handle_cancel"
                plain>{{$t('lang.public_button_cancel')}}</el-button>
            <el-button size="mini"
                class="maps-button-mini"
                @click="handle_save('task_form')"
                type="primary">{{$t('lang.public_button_save')}}</el-button>
        </section>
        <section slot="drawerBody"
            class="create-main">
            <el-collapse v-model="activeNames">
                <el-form :model="task_form"
                    :rules="rules"
                    ref="task_form"
                    :hide-required-asterisk="true"
                    :label-width="language === 'zh'? '60px':'110px'"
                    label-position="left"
                    class="demo-task_form">
                    <!-- 邮件基本信息 -->
                    <el-collapse-item :title="$t('lang.report_task_Email_basic_settings')"
                        name="1">
                        <el-form-item :label="$t('lang.report_task_Email_subject_label')"
                            style="margin-bottom: 20px"
                            prop="title">
                            <el-input :placeholder="$t('lang.report_task_Email_subject_placeholder')"
                                maxlength="20"
                                size="mini"
                                show-word-limit
                                v-model="task_form.title"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('lang.report_task_Email_text_label')"
                            prop="content">
                            <el-input type="textarea"
                                :placeholder="$t('lang.report_task_Email_text_placeholder')"
                                :rows="4"
                                size="mini"
                                maxlength="200"
                                show-word-limit
                                v-model="task_form.content"></el-input>
                        </el-form-item>
                    </el-collapse-item>
                    <!-- 报表信息设置 -->
                    <el-collapse-item :title="$t('lang.report_task_Report_settings')"
                        name="2">
                        <el-form-item :label="$t('lang.report_task_Report_type_label')"
                            style="margin-bottom: 0"
                            class="error-reset "
                            prop="type">
                            <el-checkbox-group v-model="task_form.type">
                                <el-checkbox :label="String(item.code)"
                                    v-for="item in typelist"
                                    :key="item.code">{{item.name}}
                                    <el-radio-group style="margin-left: 5px;"
                                        v-if="task_form.type.includes(String(item.code))"
                                        v-model="time_line_form[item.code]">
                                        <maps-tooltip :text="item.desc"
                                            align="left"
                                            v-for="item in time_line_list"
                                            :key="item.id">
                                            <el-radio-button :label="item.id">{{item.name}}</el-radio-button>
                                        </maps-tooltip>
                                    </el-radio-group>
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item :label="$t('lang.report_task_Report_Dimension_label')"
                            class="error-reset"
                            style="margin-bottom: 5px"
                            prop="dimension">
                            <el-radio-group v-model="task_form.dimension">
                                <el-radio :label="item.code"
                                    v-for="item in dimensionlist"
                                    :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="inline-form">
                            <el-form-item :label="$t('lang.report_task_Date_range_label')+':'"
                                style="margin-bottom: 5px"
                                prop="data_range">
                                <el-select v-model="task_form.data_range"
                                    style="width: 230px"
                                    size="mini"
                                    @change="data_range_change"
                                    :placeholder="$t('lang.report_task_Date_range_label')">
                                    <el-option v-for="item in datarangelist"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="String(item.code)"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="task_form.data_range == '10'"
                                style="margin-bottom: 5px"
                                class="customize-form"
                                prop="days">
                                {{$t('lang.report_task_customize_time_text_left')}}
                                <el-input size="mini"
                                    v-model="task_form.days"></el-input>
                                {{$t('lang.report_task_customize_time_text_right')}}
                                <maps-tooltip :text="$t('lang.report_task_customize_time_point')"
                                    align="left">
                                    <i class="iconfont maps-icon-info"></i>
                                </maps-tooltip>
                            </el-form-item>
                        </div>
                        <el-form-item :label="$t('lang.report_task_Choose_fields_label')"
                            class="customize-form"
                            style="margin-bottom: 5px">
                            <el-radio-group v-model="task_form.columns">
                                <el-radio label="">{{$t('lang.report_task_Default')}}</el-radio>
                            </el-radio-group>
                            <maps-tooltip :text="$t('lang.report_task_Choose_fields_point')"
                                align="left">
                                <i class="iconfont maps-icon-info"></i>
                            </maps-tooltip>
                        </el-form-item>
                    </el-collapse-item>
                    <!-- 邮件发送设置 -->
                    <el-collapse-item :title="$t('lang.report_task_Email_delivery_settings')"
                        name="3">
                        <el-form-item :label="$t('lang.report_task_Frequency_label') + ':'"
                            prop="cycle">
                            <el-select v-model="task_form.cycle"
                                size="mini"
                                @change="period_change"
                                :placeholder="$t('lang.report_task_Frequency_label')">
                                <el-option v-for="item in cyclelist"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="String(item.code)"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 按时 -->
                        <div v-if="task_form.cycle == '1'">
                            <el-form-item :label="$t('lang.report_task_Repeat_interval_label') + ':'"
                                prop="interval">
                                <el-select v-model="task_form.interval"
                                    size="mini"
                                    :placeholder="$t('lang.report_task_Repeat_interval_label')">
                                    <el-option v-for="item in hour_list"
                                        :key="item.value"
                                        :label="item[`name_${language}`]"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('lang.report_task_Start_End_Time_label')"
                                prop="hour_start_end_date">
                                <el-time-picker is-range
                                    size="mini"
                                    :picker-options="{
                                        selectableRange: '00:00 - 23:59',
                                        format: 'HH:mm',
                                    }"
                                    value-format='HH:mm'
                                    format='HH:mm'
                                    :clearable="false"
                                    v-model="task_form.hour_start_end_date"
                                    :range-separator="$t('lang.public_range_separator')"
                                    :start-placeholder="$t('lang.report_task_Start_Time_label')"
                                    :end-placeholder="$t('lang.report_task_End_Time_label')"
                                    :placeholder="$t('lang.report_task_Time_range_label')"
                                    @change="hour_start_end_change">
                                </el-time-picker>
                            </el-form-item>
                        </div>
                        <!-- 按日 -->
                        <div v-if="task_form.cycle == '2'">
                            <el-form-item :label="$t('lang.report_task_Delivery_time_label') + ':'"
                                prop="starttime">
                                <el-time-picker v-model="task_form.starttime"
                                    size="mini"
                                    :clearable="false"
                                    :picker-options="{
                                        selectableRange: '00:00:00 - 23:59:59',
                                        format: 'HH:mm'
                                    }"
                                    value-format='HH:mm'
                                    format='HH:mm'
                                    :placeholder="$t('lang.report_task_Delivery_time_label')">
                                </el-time-picker>
                            </el-form-item>
                        </div>
                        <!-- 按周 -->
                        <div v-if="task_form.cycle == '3'">
                            <el-form-item style="position: absolute;z-index: -1;"></el-form-item>
                            <el-form-item :label="$t('lang.report_task_Delivery_date_label') + ':'"
                                prop="week">
                                <el-select v-model="task_form.week"
                                    size="mini"
                                    multiple
                                    collapse-tags
                                    :placeholder="$t('lang.report_task_Delivery_date_label')">
                                    <el-option v-for="item in weeklist"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="String(item.code)">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('lang.report_task_Delivery_time_label') + ':'"
                                prop="starttime">
                                <el-time-picker v-model="task_form.starttime"
                                    size="mini"
                                    :clearable="false"
                                    :picker-options="{
                                        selectableRange: '00:00:00 - 23:59:59',
                                        format: 'HH:mm'
                                    }"
                                    value-format='HH:mm'
                                    format='HH:mm'
                                    :placeholder="$t('lang.report_task_Delivery_time_placeholder')">
                                </el-time-picker>
                            </el-form-item>
                        </div>
                        <!-- 按月 -->
                        <div v-if="task_form.cycle == '4'"
                            class="inline-form">
                            <el-form-item :label="$t('lang.report_task_Delivery_time_label') + ':'"
                                :style="language == 'zh'? 'width:200px':'width:330px'"
                                prop="month_day">
                                <el-select v-model="task_form.month_day"
                                    size="mini"
                                    :placeholder="$t('lang.report_task_Delivery_date_label')">
                                    <el-option v-for="item in days_list"
                                        :key="item.value"
                                        :label="item[`name_${language}`]"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label-width="0"
                                prop="starttime">
                                <el-time-picker v-model="task_form.starttime"
                                    size="mini"
                                    :clearable="false"
                                    :picker-options="{
                                        selectableRange: '00:00:00 - 23:59:59',
                                        format: 'HH:mm'
                                    }"
                                    value-format='HH:mm'
                                    format='HH:mm'
                                    :placeholder="$t('lang.report_task_Delivery_time_placeholder')">
                                </el-time-picker>
                            </el-form-item>
                        </div>

                        <el-form-item :label="$t('lang.report_task_start_date_label')"
                            style="margin-bottom: 20px"
                            prop="startdate">
                            <el-date-picker v-model="task_form.startdate"
                                size="mini"
                                align="right"
                                value-format="yyyy-MM-dd"
                                type="date"
                                :placeholder="$t('lang.report_task_Select_date_placeholder')"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                            <maps-tooltip :text="$t('lang.report_task_start_date_tooltip')">
                                <i class="iconfont maps-icon-info"
                                    style="color: #999;margin-left: 10px;"></i>
                            </maps-tooltip>
                        </el-form-item>
                    </el-collapse-item>
                    <!-- 邮件接收人 -->
                    <el-collapse-item :title="$t('lang.report_task_Recipients')"
                        name="4">
                        <el-form-item prop="emails"
                            style="margin-bottom: 20px"
                            class="emails-form"
                            label-width="0">
                            <el-input :placeholder="$t('lang.report_task_Recipients_point')"
                                size="mini"
                                v-model="task_form.emails"
                                class="receiver-input"
                                @keyup.enter.native="handle_emails_result"></el-input>
                            <el-button size="mini"
                                type="primary"
                                @click="handle_emails_result">{{$t('lang.report_task_Recipients_add')}}</el-button>
                        </el-form-item>
                        <div class="receiver-list">
                            <div class="receiver-item"
                                v-for="(item, index) in receiver_result"
                                :key="index">
                                <span>{{item}}</span>
                                <span @click="clear_receiver(item, index)">&times</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-form>
            </el-collapse>
        </section>
    </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import moment from "moment";
import _ from "lodash";

export default {
  components: {},
  data() {
    const THIS = this;
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        document.querySelector(".receiver-input .el-input__inner").style.color = "#606266";
        if (THIS.receiver_result.length == 0) {
          callback(new Error(this.$t("lang.reg_task_least_one_recipient")));
        } else {
          THIS.error_result = [];
          callback();
        }
      } else {
        value = value.replace(/[\'\"\’\‘\“\”\，]/g, "");
        this.task_form.emails = value;
        const reg = this.$constReg.allEmail;  //任意邮箱
        if (value.indexOf(",") !== -1) {
          let emails = value.split(",");
          let errors = 0;
          if (emails.length <= 20) {
            let error = [];
            emails.forEach((item) => {
              if (!reg.test(item) || item === "") {
                error.push(item);
                errors++;
                callback(new Error(this.$t("lang.reg_is_email_error_message")));
              }
            });
            THIS.error_result = error;
            if (errors === 0) {
              THIS.error_result = [];
              document.querySelector(".receiver-input .el-input__inner").style.color = "606266";
              // callback();
              callback(new Error(this.$t("lang.report_task_Recipients_error")));
            }
          } else {
            callback(new Error(this.$t("lang.reg_task_send_up_to_20_recipient")));
          }
        } else {
          if (!reg.test(value)) {
            THIS.error_result = [value];
            callback(new Error(this.$t("lang.reg_is_email_error_message")));
          } else {
            callback(new Error(this.$t("lang.report_task_Recipients_error")));
          }
        }
      }
    };
    var validatename = (rule, value, callback) => {
      value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
      const reg = this.$constReg.input_word; //除了引号都允许
      if (reg.test(value)) {
        callback(new Error(this.$t("lang.reg_not_quotes")));
      } else {
        callback();
      }
    };
    var validatenumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_task_number_of_days")));
      } else {
        const reg = /^(1|([1-9]\d{0,1})|100)$/;
        if (!reg.test(value)) {
          callback(new Error(this.$t("lang.reg_task_between_1_and_100")));
        } else {
          callback();
        }
      }
    };
    var validateDate = (rule, value, callback) => {
      if (value) {
        if (value[0] == value[1]) {
          callback(new Error(this.$t("lang.reg_time_not_equal")));
        } else {
          callback();
        }
      }
    };
    return {
      isLoading: false,
      activeNames: ["1", "2", "3", "4"],
      task_form: {
        title: "",
        content: "",
        type: [],
        time_line: { 1: "1", 2: "2" },
        hour_start_end_date: ["00:00", "23:59"],
        dimension: "date", //报表维度
        data_range: "1", //数据范围
        days: "", //自定义范围
        columns: "", //字段类型
        cycle: "1", // 重复周期
        starttime: "00:00", //发送开始时间
        endtime: "23:59", //发送结束时间
        interval: "1", // 按时，周期间隔
        week: [], //按周，发送日期
        month_day: "1", //按月。每月的日期
        startdate: "", //邮件发送开始日期
        emails: "",
      },
      time_line_form: {},
      hour_start_end_date: ["00:00", "23:59"],
      dimensionlist: [],
      typelist: [],
      datarangelist: [],
      cyclelist: [],
      weeklist: [],
      receiver_result: [],
      error_result: [],
      // 区分上报和播放
      time_line_list: [
        {
          id: "1",
          name: this.$t("lang.report_time_line_report_label"),
          desc: this.$t("lang.report_time_line_report_desc"),
        },
        {
          id: "2",
          name: this.$t("lang.report_time_line_IMP_label"),
          desc: this.$t("lang.report_time_line_IMP_desc"),
        },
      ],
      not_confirm: this.$t("lang.report_task_Recipients_error"),
      pickerOptions: {
        disabledDate(time) {
          return moment(time).endOf("day").format("x") < Date.now();
        },
      },
      rules: {
        title: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur"],
          },
          {
            required: true,
            message: this.$t("lang.reg_task_email_subject_required"),
            trigger: ["blur"],
          },
        ],
        content: [
          {
            required: false,
            validator: validatename,
            trigger: ["blur"],
          },
        ],
        type: [{ required: true, message: this.$t("lang.reg_task_report_type_required"), trigger: ["blur"] }],
        data_range: [{ required: true, message: "请选择数据范围", trigger: ["blur"] }],
        days: [{ required: true, validator: validatenumber, trigger: ["blur"] }],
        columns: [{ required: true, message: "请选择字段类型", trigger: ["blur"] }],
        cycle: [{ required: true, message: "请选择周期", trigger: ["blur"] }],
        interval: [{ required: true, message: "请选择周期间隔", trigger: ["blur"] }],
        hour_start_end_date: [{ validator: validateDate, message: "", trigger: ["blur"] }],
        week: [{ required: true, message: this.$t("lang.reg_task_delivery_date_required"), trigger: ["blur"] }],
        month_day: [{ required: true, message: this.$t("lang.reg_task_delivery_date_required"), trigger: ["blur"] }],

        startdate: [{ required: true, message: this.$t("lang.reg_task_start_date_required"), trigger: ["blur"] }],

        emails: [{ required: true, validator: validateEmail, trigger: ["change"] }],
      },
      // 编辑时的信息
      task_info: {},
      confirm_save: false,
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("report", ["handle_task"]),
    ...mapState("system", ["active_team_id"]),
    drawer_title() {
      let title = "";
      if (this.handle_task == "create") {
        title = this.$t("lang.report_task_drawer_add_title");
      } else if (this.handle_task == "edit") {
        title = this.$t("lang.report_task_drawer_edit_title");
      }
      return title;
    },
    hour_list() {
      let list = [];
      for (let i = 1; i < 24; i++) {
        let param = {};
        if (i < 10) {
          param = {
            value: `${i}`,
            name_zh: `0${i}`,
            name_en: `0${i}`,
          };
        } else {
          param = {
            value: `${i}`,
            name_zh: `${i}`,
            name_en: `${i}`,
          };
        }
        list.push(param);
      }
      return list;
    },
    days_list() {
      let list = [];
      for (let i = 1; i < 29; i++) {
        let param = {};
        if (i < 10) {
          param = {
            value: `${i}`,
            name_zh: `0${i}`,
            name_en: `${i}th`,
          };
        } else {
          param = {
            value: `${i}`,
            name_zh: `${i}`,
            name_en: `${i}th`,
          };
        }
        list.push(param);
      }
      const some_last = [
        {
          value: "-3",
          name_zh: "倒数第三天",
          name_en: "The antepenultimate day",
        },
        {
          value: "-2",
          name_zh: "倒数第二天",
          name_en: "The penultimate day",
        },
        {
          value: "-1",
          name_zh: "最后一天",
          name_en: "Last day",
        },
      ];
      return list.concat(some_last);
    },
  },
  methods: {
    async show(id = "") {
      this.$refs.mpasDrawer_task.show();
      await this.get_select_options();
      if (this.handle_task == "create") {
        this.$delete(this.task_form, "id");
      }
      if (this.handle_task == "edit") {
        this.isLoading = true;
        this.$set(this.task_form, "id", id);
        await this.get_task_info(id);
      }
    },
    close_drawer() {
      this.handle_cancel();
    },
    // 获取下拉option
    async get_select_options() {
      const url = "/emailtask/selectlist";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.cyclelist = data.cyclelist || [];
        this.datarangelist = data.datarangelist || [];
        this.dimensionlist = data.dimensionlist || [];
        this.typelist = data.typelist || [];
        this.weeklist = data.weeklist || [];
        this.format_type(this.typelist);
      }
    },
    format_type(arr) {
      if (arr.length) {
        let result = "";
        arr.forEach((item) => {
          this.$set(this.time_line_form, item.code, "1");
        });
      }
    },
    handle_cancel() {
      if (this.check_edit()) {
        this.$confirm(this.$t(`lang.report_task_confirm_save_edit`), this.$t("lang.public_edit_tooltip"), {
          confirmButtonText: this.$t("lang.public_button_confirm"),
          cancelButtonText: this.$t("lang.public_button_cancel"),
          type: "warning",
        })
          .then(() => {
            this.handle_save("task_form");
          })
          .catch(() => {
            this.refresh();
          });
      } else {
        this.refresh();
      }
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if (this.receiver_result.length) {
            this.submit_task();
          }
        } else {
          const keys = Object.keys(obj);
          if (keys.length == 1 && keys[0] == "emails" && obj.emails[0].message == this.not_confirm) {
            if (this.receiver_result.length) {
              this.submit_task();
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      });
    },
    format_param() {
      const format_time_line = () => {
        let result = {};
        this.task_form.type.forEach((item) => {
          this.$set(result, item, this.time_line_form[item]);
        });
        return result;
      };
      // 重写邮件正文
      const format_content = () => {
        let result = this.task_form.content.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");

        return result;
      };

      const param = Object.assign({}, this.task_form);
      param.team_id = this.active_team_id;
      param.content = format_content();
      param.type = this.task_form.type.join();
      param.starttime = this.task_form.starttime + ":00"; //发送开始时间
      param.endtime = this.task_form.endtime + ":00"; //发送结束时间
      param.week = this.task_form.week.join(); //按周，发送日期
      param.emails = this.receiver_result.join();
      param.time_line = JSON.stringify(format_time_line());
      return param;
    },
    // 提交数据
    async submit_task() {
      const url = "emailtask/save";
      const param = this.format_param();
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.$emit("UpdateList");
        this.refresh();
      }
    },
    // 检查是否进行了修改
    check_edit() {
      let state = false;
      if (this.handle_task == "edit") {
        const keys = Object.keys(this.task_info);
        const special_keys = ["type", "week", "hour_start_end_date"];
        if (keys.length) {
          keys.forEach((item) => {
            if (!special_keys.includes(item) && this.task_info[item] != this.task_form[item]) {
              state = true;
            }
            if (special_keys.includes(item)) {
              if (this.task_info[item].length != this.task_form[item].length) {
                state = true;
              } else {
                this.task_info[item].forEach((child, index) => {
                  if (child != this.task_form[item][index]) {
                    state = true;
                  }
                });
              }
            }
          });
        }
      } else {
        state = false;
      }
      return state;
    },
    refresh() {
      this.$refs.mpasDrawer_task.close();
      this.task_form = {
        title: "",
        content: "",
        type: [],
        time_line: { 1: "1", 2: "2" },
        dimension: "date", //报表维度
        data_range: "1", //数据范围
        days: "", //自定义范围
        columns: "", //字段类型
        cycle: "1", // 重复周期
        hour_start_end_date: ["00:00", "23:59"],
        starttime: "00:00", //发送开始时间
        endtime: "23:59", //发送结束时间
        interval: "1", // 按时，周期间隔
        week: [], //按周，发送日期
        month_day: "1", //按月。每月的日期
        startdate: "", //邮件发送开始日期
        emails: "",
      };
      this.$refs.task_form.clearValidate();
      // this.$refs.task_form.resetFields();
      this.hour_start_end_date = ["00:00", "23:59"];
      this.task_form.interval = "1";
      this.receiver_result = [];
      this.error_result = [];
    },
    // 编辑，获取详情
    async get_task_info(id) {
      const url = "/emailtask/detail";
      const param = {
        id,
        team_id: this.active_team_id,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.set_form(data);
      }
    },
    // 设置task_form
    set_form(info) {
      const format_time = (time) => {
        let result = "";
        if (time) {
          const arr = time.split(":");
          result = `${arr[0]}:${arr[1]}`;
        }
        return result;
      };
      const set_time_line = () => {
        const obj = JSON.parse(info.time_line);
        const keys = Object.keys(obj);
        keys.forEach((item) => {
          this.time_line_form[item] = obj[item];
        });
      };
      set_time_line();
      // 重写邮件正文
      const format_content = () => {
        let result = info.content.replace(/<br\/>/g, "\r\n").replace(/\&nbsp;/g, " ");

        return result;
      };
      this.task_form.title = info.title;
      this.task_form.content = format_content();
      this.task_form.type = info.type.split(",");
      this.task_form.dimension = info.dimension;
      this.task_form.data_range = String(info.data_range);
      this.task_form.days = info.days || "";
      this.task_form.columns = info.columns;
      this.task_form.cycle = String(info.cycle);
      this.task_form.starttime = format_time(info.starttime) || "00:00";
      this.task_form.endtime = format_time(info.endtime) || "23:59";
      this.task_form.hour_start_end_date = [this.task_form.starttime, this.task_form.endtime];
      this.task_form.interval = String(info.interval);
      this.task_form.week = info.week ? info.week.split(",") : [];
      this.task_form.month_day = String(info.month_day) || "";
      this.task_form.startdate = info.startdate || "";
      this.task_form.time_line = info.time_line;
      this.task_info = _.cloneDeep(this.task_form);
      this.receiver_result = info.emails.split(",");
    },
    // 切换数据范围
    data_range_change() {
      this.task_form.days = "";
      this.task_form.startdate = "";
      this.task_form.enddate = "";
    },
    // 切换周期类型
    period_change() {
      // 改变时重置四种周期类型对应的值
      this.task_form.hour_start_end_date = ["00:00", "23:59"];
      this.hour_start_end_change();
      this.task_form.interval = "01";

      this.task_form.starttime = "00:00";
      this.task_form.endtime = "23:59";

      this.task_form.week = [];

      this.task_form.month_day = ""; //按年。每月的日期

      this.task_form.startdate = "";
    },
    // 选择按时为周期时的开始结束时间
    hour_start_end_change() {
      this.task_form.starttime = this.task_form.hour_start_end_date[0]; //按时，开始时间
      this.task_form.endtime = this.task_form.hour_start_end_date[1]; //按时，结束时间
    },
    // 展示所有收件人
    handle_emails_result() {
      this.$refs.task_form.validateField("emails", (param) => {
        let dom = document.querySelector(".receiver-input .el-input__inner");
        if (param == this.not_confirm) {
          this.receiver_result = this.receiver_result.concat(this.task_form.emails.split(","));
          this.task_form.emails = "";
          this.error_result = [];
          dom.style.color = "#606266";
        } else {
          if (this.task_form.emails !== "") {
            const all = this.task_form.emails.split(",");
            let result = [];
            all.forEach((item) => {
              if (!this.error_result.includes(item) && item !== "") {
                result.push(item);
              }
            });
            this.receiver_result = this.receiver_result.concat(result);
            this.task_form.emails = this.error_result.join();
            dom.style.color = "#F56C6C";
          } else {
            dom.style.color = "#606266";
          }
        }
      });
    },
    clear_receiver(receiver, index) {
      if (this.receiver_result.length == 1) {
        this.receiver_result = [];
        this.task_form.emails = "";
      } else {
        this.receiver_result.splice(index, 1);
        // this.task_form.emails = this.receiver_result.join();
      }
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        hasLoading && (this.isLoading = false);
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.create-drawer {
  .el-collapse {
    border-width: 0;
    .el-collapse-item {
      .el-collapse-item__header {
        height: 40px;
        background: #ebebeb;
        border-width: 0;
        border-radius: 3px;
        padding: 0 20px 0 10px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 24px;
        color: #333;
        font-weight: 700;
        i {
          font-weight: 700;
        }
      }
      .el-collapse-item__header:before {
        content: "*";
        font-size: 14px;
        line-height: 24px;
        color: #ff3333;
        margin-right: 5px;
      }
      .el-collapse-item__wrap {
        border-bottom-width: 0;
        .el-collapse-item__content {
          padding: 0;
          .el-form-item {
            padding-left: 20px;
            margin-bottom: 15px;
            .el-form-item__label {
              font-size: 12px;
              font-weight: 400;
              color: #333333;
            }
            .el-radio-group {
              display: unset;
              .el-radio-button {
                .el-radio-button__inner {
                  padding: 6px 10px;
                }
              }
              .el-radio-button:not(.is-active) {
                .el-radio-button__inner:hover {
                  color: #0bb3b3;
                }
              }
              .el-radio-button.is-active {
                .el-radio-button__orig-radio:checked + .el-radio-button__inner {
                  background: #0bb3b3;
                  border-color: #0bb3b3;
                }
              }
            }
          }
          .inline-form {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .el-form-item__content {
              display: flex;
              align-items: center;
            }
            .customize-form {
              .el-form-item__content {
                margin-left: 0px !important;
                .el-input {
                  margin: 0 15px;
                }
              }
            }
          }
          .emails-form {
            .el-form-item__content {
              display: flex;
              align-items: center;
              .el-button--mini {
                margin-left: 5px;
                font-size: 14px;
                line-height: 16px;
              }
            }
          }
          .error-reset {
            .el-form-item__content {
              .el-form-item__error {
                top: 75%;
              }
            }
          }
          .el-select--mini {
            width: 220px;
            .el-select__tags {
              flex-wrap: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.create-drawer {
  .create-main {
    height: 100%;
    overflow-y: auto;
    .maps-icon-info {
      font-size: 14px;
    }
    .inline-form {
      .customize-form {
        width: 175px;
        .el-form-item__content {
          margin-left: 0px;
        }
      }
    }
    .customize-form {
      .el-form-item__content {
        i {
          color: #999;
          margin-left: 10px;
        }
      }
    }
    .receiver-list {
      height: auto;
      padding: 5px 0 0 20px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      .receiver-item {
        width: auto;
        height: 32px;
        padding: 0 10px;
        margin: 0 10px 10px 0;
        background: #f1f1f1;
        font-size: 12px;
        color: #333;
        display: flex;
        align-items: center;
        span:nth-child(2) {
          margin-left: 5px;
          font-size: 20px;
          color: #ff3333;
          cursor: pointer;
        }
      }
    }
  }
}
</style>