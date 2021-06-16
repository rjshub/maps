<template>
    <div class="help-container"
        style="height: calc(100% - 29px)"
        v-loading.fullscreen="isLoading">
        <el-row>
            <el-col :span="18"
                class="video-tutorials">
                <div class="title"
                    style="padding-left: 25px">
                    <el-tabs v-model="help_active_name"
                        @tab-click="handle_choose_help_type">
                        <el-tab-pane :label="$t('lang.help_center_base_title')"
                            :name="$t('lang.help_center_base_title')"></el-tab-pane>
                        <el-tab-pane :label="$t('lang.help_center_advanced_title')"
                            :name="$t('lang.help_center_advanced_title')"></el-tab-pane>
                    </el-tabs>
                </div>

                <main>
                    <div class="help-filter select-container">
                        <span>{{help_active_name == $t('lang.help_center_base_title')? $t('lang.help_center_point'):' '}}</span>
                        <div class="filter">
                            <el-select v-model="filter_form.model"
                                placeholder=""
                                size="mini"
                                filterable
                                style="width: 120px;margin: 0 10px"
                                @change="filter_change">
                                <el-option :label="$t('lang.public_all')"
                                    value=""></el-option>
                                <el-option v-for="item in model_list"
                                    :key="item.type"
                                    :label="item.type"
                                    :value="item.type"></el-option>
                            </el-select>
                            <el-input size="mini"
                                style="width:300px"
                                :placeholder="$t('lang.message_Search_by_keywords')"
                                @keyup.enter.native="filter_change"
                                class="filter-input"
                                v-model="filter_form.word">
                                <div slot="prefix"
                                    style="cursor: pointer">
                                    <i class="iconfont maps-icon-search"
                                        @click="filter_change"></i>
                                </div>
                            </el-input>
                        </div>

                    </div>
                    <div class="video-list">
                        <el-row :gutter="10"
                            v-if="video_list.length"
                            v-infinite-scroll="get_more_video"
                            infinite-scroll-disabled="disabled">
                            <el-col :span="8"
                                v-for="(video_item, index) in video_list.slice(0, count)"
                                :key="video_item.id">
                                <div class="video-box"
                                    :style="`background-image: url(${video_item.cover})`">
                                    <!-- <img :src="video_item.cover"
                                        alt /> -->
                                    <div class="modal">
                                        <i class="iconfont maps-icon-open"
                                            @click="handle_play_video(video_item.url, index)"></i>
                                    </div>
                                </div>
                                <div class="video-message">
                                    <maps-tooltip :text="video_item[`title_${language}`]"
                                        align="left">
                                        <span class="title">{{video_item[`title_${language}`]}}</span>
                                    </maps-tooltip>
                                    <maps-tooltip :text="video_item[`desc_${language}`]"
                                        align="left">
                                        <span class="detail">{{video_item[`desc_${language}`]}}</span>
                                    </maps-tooltip>
                                    <span class="module">{{video_item.duration}}</span>
                                </div>
                            </el-col>
                        </el-row>

                        <div class="load-more"
                            v-if="video_list.length">
                            <span v-if="noMore">{{$t('lang.help_center_no_more')}}</span>
                            <span v-else
                                @click="get_more_video"
                                style="cursor:pointer">
                                <i class="iconfont maps-icon-down"></i>
                                {{$t('lang.public_load_more')}}
                            </span>
                        </div>

                        <div class="enpty-text"
                            v-if="!video_list.length">{{$t('lang.public_no_data')}}</div>
                    </div>

                </main>
            </el-col>
            <el-col :span="6"
                class="submit-request">
                <div class="title">{{$t('lang.help_center_submit_request')}}</div>
                <main>
                    <span class="title"
                        style="font-weight: 400">{{$t('lang.help_center_request_point')}}</span>
                    <el-form label-position="top"
                        ref="submit_form"
                        :rules="submit_rules"
                        :model="submit_form">
                        <span class="title">{{$t('lang.help_center_request_title')}}</span>
                        <!-- @keyup.enter.native="onSubmit('submit_form')" -->
                        <el-form-item prop="title">
                            <el-input v-model="submit_form.title"
                                maxlength="50"
                                show-word-limit
                                :onkeyup="check_field_label()"></el-input>
                        </el-form-item>

                        <span class="title">{{$t('lang.help_center_request_desc')}}</span>
                        <el-form-item prop="content">
                            <el-input type="textarea"
                                :rows="4"
                                v-model="submit_form.content"
                                maxlength="500"
                                show-word-limit></el-input>
                        </el-form-item>

                        <span class="title">{{$t('lang.help_center_request_mobile')}}</span>
                        <div class="mobile">
                            <el-form-item class="mobile-area"
                                prop="area_code">
                                <el-select v-model="submit_form.area_code"
                                    style="width: 100%"
                                    @change="handle_area_code_change">
                                    <el-option v-for="item in area_code_options"
                                        :key="item.value"
                                        :label="item[`name_${language}`]"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item class="mobile-number"
                                prop="mobile">
                                <el-input v-model="submit_form.mobile"></el-input>
                            </el-form-item>
                        </div>

                        <el-form-item size="large">
                            <el-button type="primary"
                                style="width: 100%"
                                @click="onSubmit('submit_form')">{{$t('lang.public_button_submit')}}</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- <p style="color:#0BB3B3;font-size: 12px">We may send a reply email to your registered email.</p> -->
                </main>
            </el-col>
        </el-row>

        <!-- 视频播放 -->
        <el-dialog :visible.sync="video_dialog_visible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            custom-class="video-dialog"
            width="80%">
            <video :src="video_path"
                object-fit="fill"
                width="100%"
                controls></video>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import default_path from "@/assets/image/logo.png";

export default {
  components: {},
  data() {
    var validatename = (rule, value, callback) => {
      let msg = "";
      if (rule.field == "title") {
        msg = this.$t("lang.reg_title_required");
      } else if (rule.field == "content") {
        msg = this.$t("lang.reg_desc_required");
      }
      if (value === "") {
        callback(new Error(msg));
      } else {
        value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
        const reg = this.$constReg.input_word; //除了引号都允许
        if (reg.test(value)) {
          callback(new Error(this.$t("lang.reg_not_quotes")));
        } else {
          callback();
        }
      }
    };
    return {
      isLoading: false,
      default_path: default_path,
      help_active_name: this.$t("lang.help_center_base_title"),
      // video list
      count: 6,
      filter_form: {
        model: "",
        word: "",
      },
      model_list: [],
      video_list: [],
      video_dialog_visible: false,
      video_path: "",
      videoImg: "",
      //   submit request
      submit_form: {
        title: "",
        content: "",
        area_code: "86",
        mobile: "",
      },
      submit_rules: {
        title: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur", "change"],
          },
        ],
        content: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            required: true,
            validator: "",
            trigger: ["blur", "change"],
          },
        ],
      },
      area_code_options: [
        {
          value: "86",
          name_zh: "中国大陆(+86)",
          name_en: "China(+86)",
        },
        {
          value: "852",
          name_zh: "中国香港(+852)",
          name_en: "HK(+852)",
        },
        {
          value: "1",
          name_zh: "美国(+1)",
          name_en: "USA(+1)",
        },
      ],
      timer: null,
    };
  },
  computed: {
    ...mapState("user", ["language"]),
    noMore() {
      return this.count >= this.video_list.length;
    },
    disabled() {
      return this.noMore;
    },
  },
  methods: {
    // 获取筛选条件
    async get_model_list() {
      const url = "/helpcenter/selectlist";
      const param = {
        type: this.help_active_name,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        // 区分入门还是进阶
        this.model_list = data;
      }
    },
    filter_change() {
      this.get_help_video_list();
    },
    // 切换内容
    handle_choose_help_type() {
      this.count = 6;
      this.video_dialog_visible = false;
      this.video_path = "";
      this.videoImg = "";
      this.get_model_list()
      this.get_help_video_list()
    },
    async get_help_video_list() {
      const url = "/helpcenter/lists";
      const param = {
        type: this.help_active_name,
        model: this.filter_form.model,
        word: this.filter_form.word,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        const format_url = (arr) => {
          const domain = window.location.origin;
          arr.map((item) => {
            item.cover = domain + "/china" + item.cover;
            item.url = domain + "/china" + item.url;
          });
        };
        format_url(data.list);
        this.video_list = data.list;
      }
    },
    get_more_video() {
      this.isLoading = true;
      setTimeout(() => {
        this.count += 6;
        this.isLoading = false;
      }, 500);
    },
    // 播放视频
    handle_play_video(path, index) {
      this.video_path = path;
      this.video_dialog_visible = true;
    },
    // 提交其他问题
    check_field_label() {
      this.submit_form.title = this.submit_form.title.replace(/[\'\"\”\“\‘\’]/g, "");
    },
    set_mobile_regs(regs) {
      var validatePhone = (rule, value, callback) => {
        var phone = value.replace(/\s/g, ""); //去除空格
        if (value.length == 0) {
          callback(this.$t("lang.reg_phone_required"));
        } else {
          if (!regs.test(phone)) {
            callback([new Error(this.$t("lang.reg_phone_rule_error_2"))]);
          } else {
            callback();
          }
        }
      };
      this.submit_rules.mobile[0].validator = validatePhone;
    },
    handle_area_code_change(param) {
      let regs = "";
      switch (param) {
        case "86":
          regs = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0-1,6-8])|(18[0-9])|(19[8,9]))\d{8}$/;
          break;
        case "852":
          regs = /^(5|6|8|9)[0-9]{7}$/;
          break;
        case "1":
          regs = /^\d{3}\s?-?\d{3}-?\s?\d{4}$/;
          break;
        default:
          regs = /^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0-1,6-8])|(18[0-9])|(19[8,9]))\d{8}$/;
          break;
      }
      this.set_mobile_regs(regs);
      this.$refs.submit_form.validateField("mobile");
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/helpcenter/add";
          const data = await this.fetchCore(url, this.submit_form, true);
          if (data) {
            this.$refs[formName].resetFields();
          }
        } else {
          return false;
        }
      });
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        return false;
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },
  mounted() {
    this.set_mobile_regs(/^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0-1,6-8])|(18[0-9])|(19[8,9]))\d{8}$/);
  },
  created() {
    this.get_model_list();
    this.get_help_video_list();
  },
};
</script>
<style lang="scss">
.help-container {
  video {
    border: 0;
    display: block;
    background: none;
    background-color: none;
    overflow: hidden;
  }
  .video-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      //   padding: 30px 0;
      padding: 0;
      border-top: 30px solid #000;
      border-bottom: 30px solid #000;
      background: #000;
      overflow: hidden;
    }
    .el-dialog__headerbtn {
      top: 0;
      right: -40px;
      i {
        color: #333;
        font-size: 36px;
      }
    }
  }

  .submit-request {
    .el-form > .title:before {
      content: "*";
      font-size: 14px;
      line-height: 24px;
      color: #ff3333;
      margin-right: 5px;
    }
    .mobile {
      .mobile-area {
        width: 145px;
        margin-bottom: 35px;

        .el-form-item__content {
          .el-input__inner {
            // width: 115px;
            width: 100%;
            border: none;
            background: #f3f3f3;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
      .mobile-number {
        flex: 1;
        margin-bottom: 35px;
        .el-form-item__content {
          .el-input__inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.help-container {
  height: calc(100% - 69px) !important;
  padding: 20px 20px 0 20px;
  & > .el-row {
    height: 100%;
    color: #333;
    .el-col {
      height: 100%;
      & > .title {
        height: 40px;
        padding: 0 20px;
        background: #e1e1e1;
        font-size: 14px;
        color: #333333;
        line-height: 40px;
      }
      & > main {
        height: calc(100% - 60px);
        padding: 20px 20px 0 20px;
        background: #fff;
      }
    }
    .video-tutorials {
      padding-right: 20px;
      & > main {
        .help-filter {
          padding-left: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          & > span {
            font-size: 24px;
            // font-weight: bold;
          }
        }
        .video-list {
          height: calc(100% - 56px);
          position: relative;
          .el-row {
            height: calc(100% - 50px);
            // padding-bottom: 50px;
            overflow-y: auto;
            margin: 0 !important;
            .el-col {
              height: auto;
              margin-bottom: 20px;
              .video-box {
                height: 240px;
                border: 1px solid #dddddd;
                border-bottom: 0;
                position: relative;
                overflow: hidden;
                background-size: cover;
                background-repeat: no-repeat;
                // img {
                //   display: inline-block;
                //   // width: 100%;
                //   height: 100%;
                // }
                .modal {
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.5);
                  display: none;
                  position: absolute;
                  top: 0;
                  left: 0;
                  i {
                    font-size: 48px;
                    color: #fff;
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
              }
              .video-box:hover {
                .modal {
                  display: block;
                }
              }
              .video-message {
                padding: 20px;
                border: 1px solid #dddddd;
                border-top: 0;
                font-size: 12px;
                position: relative;
                span {
                  display: inline-block;
                  // text-align: justify;
                  text-overflow: ellipsis;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .title {
                  height: 32px;
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 5px;
                }
                .detail {
                  height: 30px;
                }
                .module {
                  height: 20px;
                  padding: 0 10px;
                  background: #dddddd;
                  color: #666666;
                  line-height: 20px;
                  position: absolute;
                  bottom: 0;
                  right: 0;
                }
              }
            }
          }
          .load-more {
            height: 50px;
            width: 100%;
            background: #fff;
            border-top: 1px solid #f1f1f1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0bb3b3;
            font-size: 14px;
            position: absolute;
            bottom: 0;
          }
          .enpty-text {
            font-size: 14px;
            color: #999;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    .submit-request {
      main {
        font-size: 14px;
        color: #333;
        overflow-y: auto;
        .title {
          display: inline-block;
          font-weight: bold;
          line-height: 24px;
          margin-bottom: 10px;
        }
        p {
          color: #999999;
          line-height: 18px;
          margin-bottom: 20px;
        }

        .mobile {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .mobile-area {
            .el-form-item__content {
              .el-input__inner {
                border: none;
                background: #dddddd;
              }
            }
          }
        }
      }
    }
  }
}
</style>