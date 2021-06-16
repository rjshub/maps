<template>
    <el-dialog :title="$t('lang.team_edit_name')"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        width="30%">
        <el-form :model="edit_team_form"
            :rules="rules"
            ref="edit_team_form">
            <el-form-item prop="name">
                <el-input v-model="edit_team_form.name"
                    maxlength="20"
                    minlength="2"
                    show-word-limit
                    autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer"
            class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('lang.public_button_cancel')}}</el-button>
            <el-button type="primary"
                @click="submit('edit_team_form')">{{$t('lang.public_button_confirm')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "" || value.length < 2) {
        callback(new Error(this.$t('lang.reg_team_name_required')));
      } else {
        value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
        const reg = this.$constReg.input_word; //除了引号都允许
        if (reg.test(value)) {
          callback(new Error(this.$t('lang.reg_not_quotes')));
        } else {
          callback();
        }
      }
    };
    return {
      dialogVisible: false,
      edit_team_form: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("system", ["teamID"]),
  },
  methods: {
    show(param) {
      this.dialogVisible = true;
      this.edit_team_form.name = param.name;
    },
    handleClose(done) {
      this.$refs.edit_team_form.clearValidate();
      this.$refs.edit_team_form.resetFields();
      done();
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/team/updatename";
          const param = {
            team_id: this.teamID,
            name: this.edit_team_form.name,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.$emit("updatename_success", this.edit_team_form.name);
            this.dialogVisible = false;
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
        hasLoading && (this.isLoading = false);
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>