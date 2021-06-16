<template>
  <el-form :model="form" :rules="rules" ref="form" class="delivery_date_Form">
    <el-form-item style="margin-bottom: 5px">
      <el-radio-group v-model="form.schedule_type">
        <el-radio label="SCHEDULE_FROM_NOW" :disabled="is_budegt_total"
          >从今天起长期投放</el-radio
        >
        <el-radio label="SCHEDULE_START_END"
          >设置结束日期</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <div v-if="form.schedule_type == 'SCHEDULE_START_END'" style="height: 65px">
      <el-col :span="11">
        <el-form-item prop="start_time">
          <el-date-picker
            v-model="form.start_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间"
            :disabled="is_start_end"
            :picker-options="startpickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="end_time">
          <el-date-picker
            v-model="form.end_time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间"
            :picker-options="startpickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </div>

    <el-form-item style="text-align: right; margin: 0">
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
        >{{ $t("lang.public_button_cancel") }}</el-button
      >
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_save('form')"
        type="primary"
        >{{ $t("lang.public_button_save") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "DeliveryDate",
  props: {
    config: {},
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (this.form.start_time.length && this.form.end_time.length) {
        const start = new Date(this.form.start_time).getTime();
        const end = new Date(this.form.end_time).getTime();
        if (start >= end) {
          callback(new Error("结束日期必须大于开始日期！"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        schedule_type: "SCHEDULE_START_END",
        delivery_date: "",
        start_time: "",
        end_time: "",
      },
      rules: {
        start_time: [
          {
            required: true,
            validator: validateDate,
            trigger: ["blur"],
          },
          {
            required: true,
            message: "请选择开始时间。",
            trigger: ["blur"],
          },
        ],
        end_time: [
          {
            required: true,
            message: "请选择结束时间。",
            trigger: ["blur"],
          },
        ],
      },
      is_start_end: true, //是否是开始和结束(进制修改开始时间)
      is_budegt_total: false, //预算类型是否是总预算
      startpickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 1000*60*60*24;
        },
      },
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  watch: {
    config: {
      handler() {
        if (this.active_tab == "ad") {
          this.form.schedule_type =
            this.config.schedule_type || "SCHEDULE_START_END";
          this.form.delivery_date = this.config.delivery_date || "";

          // const date = this.config.delivery_date.split(" ");
          // this.form.start_time = date[0];
          this.form.start_time = this.config.start_time.split(" ")[0]
          if (this.config.schedule_type == "SCHEDULE_START_END") {
            // this.is_start_end = true;
            const date = this.config.end_time.split(" ");
            this.form.end_time = date[0];
          } else if (this.config.schedule_type == "SCHEDULE_FROM_NOW") {
            // this.is_start_end = false;
            this.form.end_time = "";
          }
          //   总预算
          if (this.config.budget_mode == "BUDGET_MODE_TOTAL") {
            this.is_budegt_total = true;
            this.form.schedule_type = "SCHEDULE_START_END";
          } else {
            this.is_budegt_total = false;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handle_cancel() {
      this.form.schedule_type = this.config.schedule_type;
      this.form.delivery_date = this.config.delivery_date;
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
      this.$emit("cancel");
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            schedule_type: this.form.schedule_type,
            delivery_date: "",
            start_time: this.form.start_time,
            end_time: this.form.end_time,
          };
          if (this.form.schedule_type == "SCHEDULE_FROM_NOW") {
            param.delivery_date = `${moment(new Date()).format("YYYY-MM-DD")} ——`;
          } else {
            param.delivery_date = `${this.form.start_time} 至 ${this.form.start_time}`;
          }
          this.$emit("save", param);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.delivery_date_Form {
  .el-date-editor {
    width: 100%;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    span,
    i {
      line-height: 24px;
    }
  }
  .line {
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
</style>