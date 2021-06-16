<template>
    <el-dialog :title="$t('lang.report_download_title')"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        width="600px"
        custom-class="download-file-container">
        <div class="connect-main">
            <span style="color: #FF3333;">{{more_than_5000? $t('lang.report_download_max'):$t('lang.report_download_min')}}</span>
            <el-form ref="download_form"
                :model="download_form"
                :rules="rule"
                :label-width="language == 'zh'? '100px':'120px'">
                <el-form-item :label="$t('lang.report_download_data_type')"
                    style="margin: 10px 0 0 0">
                    <el-radio-group v-model="download_form.format">
                        <el-radio label="1">
                            <span>{{$t('lang.report_download_Source_data')}}</span>
                            <maps-tooltip :text="$t('lang.report_download_source_tooltip')"
                                align="left">
                                <i class="iconfont maps-icon-info"
                                    style="color: #999; font-size: 13px;line-height: 18px"></i>
                            </maps-tooltip>
                        </el-radio>
                        <el-radio label="2">
                            <span>{{$t('lang.report_download_Keep_format')}}</span>
                            <maps-tooltip :text="$t('lang.report_download_format_tooltip')"
                                align="left">
                                <i class="iconfont maps-icon-info"
                                    style="color: #999; font-size: 13px;line-height: 18px"></i>
                            </maps-tooltip>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('lang.report_download_Export_mode')">
                    <el-radio-group v-model="download_form.download_method">
                        <el-radio label="0"
                            :disabled="more_than_5000">{{$t('lang.report_download_Real_time_export')}}</el-radio>
                        <el-radio label="1">{{$t('lang.report_download_Offline_export')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="download_form.download_method == '1'">
                    <!-- <el-form-item label="邮件标题：">
                        {{download_form.name}}
                    </el-form-item> -->
                    <el-form-item :label="$t('lang.report_download_Recipients')"
                        prop="emails">
                        <el-input type="textarea"
                            :rows="4"
                            size="mini"
                            :placeholder="$t('lang.report_download_Recipients_placeholder')"
                            v-model="download_form.emails"></el-input>
                    </el-form-item>
                </div>

            </el-form>
        </div>
        <span slot="footer"
            class="dialog-footer">
            <el-button @click="cancel">{{$t('lang.public_button_cancel')}}</el-button>
            <el-button type="primary"
                @click="submit('download_form')">{{$t('lang.public_button_confirm')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import moment from "moment";

export default {
  components: {},
  props: {
    module: {
      type: String,
      default: "--",
    },
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_email_required")));
      } else {
        value = value.replace(/[\'\"\’\‘\“\”\，]/g, "");
        this.download_form.emails = value;
        const reg = this.$constReg.allEmail; //任意邮箱
        if (value.indexOf(",") !== -1) {
          let emails = value.split(",");

          if (emails.length > 20) {
            callback(new Error(this.$t("lang.reg_task_send_up_to_20_recipient")));
          } else {
            let errors = 0;
            emails.forEach((item) => {
              if (!reg.test(item) || item === "") {
                errors++;
                callback(new Error(this.$t("lang.reg_is_email_error_message")));
              }
            });
            if (errors === 0) {
              callback();
            }
          }
        } else {
          if (!reg.test(value)) {
            callback(new Error(this.$t("lang.reg_is_email_error_message")));
          } else {
            callback();
          }
        }
      }
    };
    return {
      isLoading: false,
      dialogVisible: false,
      more_than_5000: false,
      download_form: {
        total: "0", // 0下载1查数据
        format: "2", // 是否是源数据
        download_method: "0", //实时或者离线
        // name: "",
        emails: "",
      },
      rule: {
        emails: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["blur"],
          },
        ],
      },
      download_loading: false,
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
  },
  methods: {
    show(param = false) {
      this.dialogVisible = true;

      this.more_than_5000 = param;
      if (param) {
        this.download_form.download_method = "1";
      }
    },
    handleClose(done) {
      this.refresh();
      done();
    },
    refresh() {
      this.download_form = {
        total: "0",
        format: "2", // 是否是源数据
        download_method: "0", //实时或者离线
        // name: "",
        emails: "",
      };
      this.$refs.download_form.resetFields();
      this.dialogVisible = false;
    },
    set_email_title() {
      const time = moment(new Date()).format("YYMMDD_HHmm");
      this.download_form.name = `${this.module}_${time}`;
    },
    cancel() {
      this.refresh();
    },
    async submit(FormName) {
      if (this.download_form.download_method == "0") {
        this.$emit("download_local", this.download_form);
        this.refresh();
      } else {
        this.$refs[FormName].validate(async (valid) => {
          if (valid) {
            this.$emit("download_offline", this.download_form);
            this.refresh();
          }
        });
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
  mounted() {
    // this.set_email_title();
  },
};
</script>
<style lang="scss">
.download-file-container {
  .el-dialog__body {
    padding: 20px 20px 10px 20px;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__label {
        text-align: left;
      }
      .el-form-item__content {
        min-height: 40px;
        display: flex;
        align-items: center;
        .el-radio-group {
          display: unset;
          .el-radio {
            width: 120px;
            .el-radio__label {
              font-size: 14px;
            }
          }
          .maps-icon-info {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.download-file-container {
  .connect-main {
    font-size: 14px;
  }
}
</style>