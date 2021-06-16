<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    class="demo-ruleForm"
  >
    <el-form-item style="margin-bottom: 5px">
      <!-- <el-radio-group v-model="form.auto_extend_enabled">
        <el-radio-button label="0">不启用</el-radio-button>
        <maps-tooltip :text="forbidden_open? forbidden_open_text:''">
          <el-radio-button
            label="1"
            :disabled="forbidden_open"
          >启用</el-radio-button>
        </maps-tooltip>
      </el-radio-group> -->
      <maps-tooltip :text="forbidden_open? forbidden_open_text:''">
        <el-switch
          v-model="form.auto_extend_enabled"
          :disabled="forbidden_open"
          :active-value="1"
          :inactive-value="0"
          active-color="#0BB3B3"
          inactive-color="#C4C4C4"
        ></el-switch>
      </maps-tooltip>
      <span style="line-height: 20px;margin-left: 5px">{{form.auto_extend_enabled == '1'? '启用':'禁用'}}</span>
    </el-form-item>
    <el-form-item
      prop="auto_extend_targets"
      v-if="form.auto_extend_enabled == '1'"
    >
      <el-checkbox-group v-model="form.auto_extend_targets">
        <maps-tooltip
          :text="!item.enable ? '您未设置该定向，因此无法勾选' : ''"
          v-for="item in auto_extend_targets_config"
          :key="item.value"
        >
          <el-checkbox
            :label="item.value"
            style="margin: 0;width:33%"
            :key="item.value"
            :disabled="!item.enable"
            name="type"
          >
            {{ item.label }}
          </el-checkbox>
        </maps-tooltip>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item style="text-align: right; margin: 0">
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
      >{{ $t("lang.public_button_cancel") }}</el-button>
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_save('form')"
        type="primary"
      >{{ $t("lang.public_button_save") }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AutomaticTargeting",
  props: {
    config: {},
  },
  data() {
    return {
      form: {
        auto_extend_targets: [],
        auto_extend_enabled: "1",
      },
      rules: {
        auto_extend_targets: [
          {
            required: true,
            message: "请选择可开放定向！",
            trigger: ["blur"],
          },
        ],
      },
      auto_extend_targets_config: [
        {
          label: "地域",
          value: "REGION",
          map: "district",
          enable: true,
        },
        {
          label: "性别",
          value: "GENDER",
          map: "gender",
          enable: true,
        },
        {
          label: "年龄",
          value: "AGE",
          map: "age",
          enable: true,
        },
        {
          label: "行为兴趣",
          value: "INTEREST_ACTION",
          map: "interest_action_mode",
          enable: true,
        },
        {
          label: "自定义人群",
          value: "CUSTOM_AUDIENCE",
          map_1: "retargeting_tags",
          map_2: "retargeting_tags_exclude",
          enable: true,
        },
      ],
      forbidden_open_text:
        "以下定向被设置为不限，不可开启智能放量：地域、性别、年龄、行为兴趣、自定义人群。",
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
    forbidden_open() {
      let state = true;
      this.auto_extend_targets_config.forEach((item) => {
        if (item.enable) {
          state = false;
        }
      });
      return state;
    },
  },
  watch: {
    config: {
      handler() {
        if (this.active_tab == "ad") {
          this.form.auto_extend_enabled =
            this.config.auto_extend_enabled;
          if (this.config.auto_extend_targets.length) {
            if (this.config.auto_extend_targets.indexOf("[") > -1) {
              this.form.auto_extend_targets =
                JSON.parse(this.config.auto_extend_targets) || [];
            } else {
              this.form.auto_extend_targets = [this.config.auto_extend_targets];
            }
          } else {
            this.form.auto_extend_targets = [];
          }

          // this.form.auto_extend_targets = this.config.auto_extend_targets || [];

          this.auto_extend_targets_config.forEach((item) => {
            if (item.value == "CUSTOM_AUDIENCE") {
              if (
                (!this.config.hasOwnProperty(item.map_1) ||
                  !this.config[item.map_1]) &&
                (!this.config.hasOwnProperty(item.map_2) ||
                  !this.config[item.map_2])
              ) {
                item.enable = false;
              } else {
                if (
                  (this.config.hasOwnProperty(item.map_1) && this.config[item.map_1] != "[]") ||
                  (this.config.hasOwnProperty(item.map_2) && this.config[item.map_2] != "[]")
                ) {
                  item.enable = true;
                } else {
                  item.enable = false;
                }
              }
            } else if (item.value == "REGION" || item.value == "GENDER") {
              //地域和性别为none时，表示不限
              if (
                this.config.hasOwnProperty(item.map) &&
                this.config[item.map] == "NONE"
              ) {
                item.enable = false;
              } else {
                item.enable = true;
              }
            } else if (item.value == "AGE") {
              //m没有返回年龄，表示不限
              if (
                !this.config.hasOwnProperty(item.map) ||
                this.config[item.map] == "[]"
              ) {
                item.enable = false;
              } else {
                item.enable = true;
              }
            } else if (item.value == "INTEREST_ACTION") {
              // 行为兴趣是UNLIMITED，表示不限
              if (
                this.config.hasOwnProperty(item.map) &&
                this.config[item.map] == "UNLIMITED"
              ) {
                item.enable = false;
              } else {
                item.enable = true;
              }
            }
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handle_cancel() {
      this.form.auto_extend_enabled = this.config.auto_extend_enabled;
      this.form.auto_extend_targets = this.config.auto_extend_targets.length
        ? JSON.parse(this.config.auto_extend_targets)
        : [];
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
      this.$emit("cancel");
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.auto_extend_enabled == "0") {
            this.form.auto_extend_targets = [];
          }
          const param = {
            auto_extend_enabled: this.form.auto_extend_enabled,
            auto_extend_targets: this.form.auto_extend_targets,
          };
          this.$emit("save", param);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>