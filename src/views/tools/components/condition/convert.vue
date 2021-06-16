<template>
    <div class="convert-condition">
        <el-form :model="form"
            :rules="rules"
            ref="convertForm"
            label-width="0"
            class="condition-form">
            <el-form-item label=""
                prop="compare">
                <el-select v-model="form.compare"
                    size="mini"
                    class="formula"
                    @change="compare_change"
                    :placeholder="$t('lang.public_select')">
                    <el-option v-for="item in formula"
                        :key="item.code"
                        :label="item[`name_${language}`]"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=""
                prop="convert">
                <el-input size="mini"
                    class="Number-int"
                    @change="validator_form"
                    v-model="form.convert">
                </el-input>
            </el-form-item>
            <div v-if="is_between"
                class="inline-condition-form">
                <span class="L">-</span>
                <el-form-item label=""
                    prop="convert2">
                    <el-input size="mini"
                        class="Number-int"
                        @change="validator_form"
                        v-model="form.convert2">
                    </el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { config as formulaConfig } from "@/views/tools/mixins/index";
import validator from "./validator";

export default {
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [validator],
  components: {},
  data() {
    return {
      form: this.config,
      formula: formulaConfig.formulaList,
      is_between: false,
    };
  },
  watch: {
    config: {
      handler: function (val) {
        this.form = val;
      },
      deep: true,
    },
  },
  methods: {
    compare_change(param) {
      this.$refs.convertForm.clearValidate();
      if (param == 6) {
        this.is_between = true;
        this.form.convert = "";
      } else {
        this.is_between = false;
        this.form.convert = "";
        this.form.convert2 = "";
      }
    },
    validator_form() {
      let state = true;
      this.$refs.convertForm.validate((valid) => {
        if (valid) {
          state = true;
          this.$emit("success", this.form);
        } else {
          state = false;
          this.$emit("fail");
        }
      });
      return state;
    },
  },
  mounted() {
    if (this.form.compare == "6") {
      this.is_between = true;
    }
  },
};
</script>
<style lang='scss' scoped>
</style>