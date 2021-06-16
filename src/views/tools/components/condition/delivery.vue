<template>
    <div class="delivery-condition">
        <el-form :model="form"
            :rules="rules"
            ref="deliveryForm"
            label-width="0"
            class="condition-form">
            <el-form-item label=""
                prop="">
                <el-input size="mini"
                    class="Number-int"
                    @change="validator_form"
                    value="=">
                </el-input>
            </el-form-item>

            <el-form-item label=""
                prop="status">
                <maps-tooltip :text="state_list.length? set_tooltip(state_list, form.status):''">
                    <el-select v-model="form.status"
                        size="mini"
                        class="formula"
                        @change="validator_form"
                        :placeholder="$t('lang.public_select')">
                        <el-option v-for="item in state_list"
                            :key="item.code"
                            :label="item[`name_${language}`]"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </maps-tooltip>

                <maps-tooltip :text="set_point"
                    align="left">
                    <i class="iconfont maps-icon-info"
                        style="color: #999; font-size: 13px;line-height: 18px"
                        v-show="form.status == '3'"></i>
                </maps-tooltip>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { config as formulaConfig } from "@/views/tools/mixins/index";
import validator from "./validator";

export default {
  components: {},
  props: {
    config: {
      type: Object,
    },
    range: {
      required: false,
    },
  },
  mixins: [validator],
  data() {
    return {
      form: this.config,
      state_list: [],
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
  computed: {
    set_point() {
      this.state_list = formulaConfig.campaignDeliveryList;
      let text = this.$t("lang.intelligent_rule_delivery_campaign");
      if (this.range == "1") {
        this.state_list = formulaConfig.campaignDeliveryList;
        text = this.$t("lang.intelligent_rule_delivery_campaign");
      } else {
        this.state_list = formulaConfig.adDeliveryList;
        text = this.$t("lang.intelligent_rule_delivery_ad");
      }
      return text;
    },
  },
  methods: {
    // 设置tooltip
    set_tooltip(options, key) {
      const index = options.findIndex((obj) => {
        return obj.code == key;
      });
      if (index >= 0) {
        return options[index][`name_${this.language}`];
      }
    },
    validator_form() {
      let state = true;
      this.$refs.deliveryForm.validate((valid) => {
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
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>