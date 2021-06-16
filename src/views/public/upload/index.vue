<template>
  <div class="maps-upload">
    <el-upload
      :action="upload_action"
      :show-file-list="false"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :on-error="handle_upload_error"
      :before-upload="handle_before_upload"
    >
      <slot name="upload_button"></slot>
    </el-upload>

    <!-- 上传重复文件 -->
    <el-dialog
      :visible.sync="upload_check_dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="repeat-dialog"
      width="680px"
    >
      <div class="repeat-box" v-if="excel_repeat.length" :style="set_height">
        <div class="title">The uploaded excel has duplicate contents, the system write in only one:</div>
        <ul>
          <li
            class="repeat-item"
            v-for="(item, index) in excel_repeat"
            :key="index"
            :class="set_repeat_class(index)"
          >
            <div>
              <span class="item-label">Campaign:</span>
              <span class="item-content">{{item.campaign}}</span>
            </div>
            <div>
              <span class="item-label">Ad Set:</span>
              <span class="item-content">{{item.adset}}</span>
            </div>
            <div>
              <span class="item-label">AD:</span>
              <span class="item-content">{{item.ad}}</span>
            </div>
            <div style="color: #E6941A">
              <span class="item-label">{{`Repeat ${item.count > 1? 'Times':'Time'}`}}</span>
              <span class="item-content">{{item.count}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="repeat-box" v-if="system_repeat.length" :style="set_height">
        <div class="title">{{point_text}}</div>
        <ul>
          <li
            class="repeat-item"
            v-for="(item, index) in system_repeat"
            :key="index"
            :class="set_repeat_class(index)"
          >
            <div>
              <span class="item-label">Campaign:</span>
              <span class="item-content">{{item.campaign}}</span>
            </div>
            <div>
              <span class="item-label">Ad Set:</span>
              <span class="item-content">{{item.adset}}</span>
            </div>
            <div>
              <span class="item-label">AD:</span>
              <span class="item-content">{{item.ad}}</span>
            </div>
            <div style="color: #E6941A">
              <span class="item-label">{{`Repeat ${item.count > 1? 'Times':'Time'}`}}</span>
              <span class="item-content">{{item.count}}</span>
            </div>
          </li>
        </ul>
      </div>
      <span class="remark" style="line-height:20px;color: #E6941A">
        <span style="font-weight: bold">Remark:</span>
        <span
          v-if="system_repeat.length"
        >If you click 'Yes',the system will overwrite names with new contents of duplicate AD ID,if not, giving up to upload.</span>
        <span
          v-else
        >If you click 'Yes', the system will write in only one of the repeated names, if not, giving up to upload.</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_cover">No</el-button>
        <el-button type="primary" @click="confirm_cover">Yes</el-button>
      </span>
    </el-dialog>
    <!-- 上传错误规则 -->
    <el-dialog
      :visible.sync="upload_wrong_rules_dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      custom-class="wrong-rule-dialog"
      width="680px"
    >
      <span
        style="line-height:20px;color: #E6941A"
      >The combination of names in excel does not meet the rules, please check.</span>
      <div class="repeat-box" v-if="wrong_rules_list.length" style="margin: 15px 0 0 0">
        <ul>
          <li class="repeat-item" v-for="(item, index) in wrong_rules_list" :key="index">
            <div class="title">{{`${item.name} ( ${item.typename} )`}}</div>
            <div>
              <span class="item-label">Rules:</span>
              <span class="item-content">{{item.rulecontent}}</span>
            </div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upload_wrong_rules_dialog = false">Ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      upload_action: "",
      upload_check_dialog: false,
      upload_action: "",
      upload_cover: "",
      upload_file: {},
      excel_repeat: [],
      system_repeat: [],
      point_text:
        "Rows of data with the same AD ID are found in system. Would you like to overwrite them?",
      upload_wrong_rules_dialog: false,
      wrong_rules_list: []
    };
  },
  computed: {
    set_height() {
      if (this.excel_repeat.length && this.system_repeat.length) {
        // return "height: calc((100% - 36px)/2)";
        return "max-height: 200px";
      } else {
        // return "height: calc(100% - 36px)";
        return "max-height: 400px";
      }
    }
  },
  methods: {
    // 设置列表斑马纹
    set_repeat_class(index) {
      if (index === 0) {
        return "light-item";
      } else if (index === 1) {
        return "dark-item";
      } else {
        if (index % 2 === 0) {
          return "light-item";
        } else {
          return "dark-item";
        }
      }
    },
    handle_upload_error() {
      this.isLoading = true;
    },
    handle_before_upload(file) {
      this.$emit("upload_start", { isLoading: true });
      this.isLoading = true;
      this.upload_file = file;
      let _THIS = this;
      let fd = new FormData();
      fd.append("file", file); //传文件
      fd.append("chose", _THIS.upload_cover); //传其他参数1覆盖2不覆盖
      fetch
        .post("/name/upload", fd)
        .then(function(res) {
          _THIS.isLoading = false;
          if (res.is_check == 1) {
            _THIS.$emit("upload_end", { isLoading: false });
            _THIS.upload_check_dialog = true;
            _THIS.excel_repeat = res.excel;
            _THIS.system_repeat = res.system;
            if (res.system.length > 1) {
              _THIS.point_text =
                "Rows of data with the same AD ID are found in system. Would you like to overwrite them?";
            } else {
              _THIS.point_text =
                "A row of data with the same AD ID are found in system. Would you like to overwrite them?";
            }
          } else if (res.is_check == 2) {
            _THIS.$emit("upload_end", { isLoading: false });
            _THIS.upload_wrong_rules_dialog = true;
            _THIS.wrong_rules_list = res.list;
          } else {
            _THIS.upload_check_dialog = false;
            _THIS.$emit("upload_success"); // 完善
          }
          _THIS.upload_cover = "";
        })
        .catch(err => {
          _THIS.$emit("upload_end", { isLoading: false });
          _THIS.upload_cover = "";
          _THIS.isLoading = false;
        });
    },
    cancel_cover() {
      this.upload_check_dialog = false;
    },
    confirm_cover() {
      this.upload_cover = 1;
      this.handle_before_upload(this.upload_file);
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
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.repeat-dialog {
  // height: 620px;
  overflow: hidden;
  .el-dialog__header {
    padding-top: 10px;
  }
  .el-dialog__body {
    // height: calc(100% - 150px);
  }
}
.wrong-rule-dialog {
  // height: 620px;
  overflow: hidden;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    // height: calc(100% - 130px);
  }
}
</style>
<style lang='scss' scoped>
.maps-upload {
  display: block !important;
  .repeat-box {
    color: #333;
    margin-bottom: 15px;
    display: flex;
    flex-flow: column;
    .title {
      background: #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      padding: 10px 20px;
    }
    ul {
      // max-height: 160px;
      flex: 1;
      overflow-y: auto;
    }
    .repeat-item {
      line-height: 20px;
      div {
        display: flex;
      }
      span {
        display: inline-block;
      }
      .item-label {
        width: 80px;
        padding: 0 10px;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
      }
      .item-content {
        flex: 1;
      }
    }
    .light-item {
      background: #fff;
    }
    .dark-item {
      background: #f1f1f1;
    }
  }
  .remark {
    word-wrap: break-word;
    white-space: normal;
    word-break: break-all;
  }
  .wrong-rule-dialog {
    .repeat-box {
      max-height: 400px;
    }
    .repeat-item {
      .item-label {
        width: 50px;
      }
    }
  }
}
</style>