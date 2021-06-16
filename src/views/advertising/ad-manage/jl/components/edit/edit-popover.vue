<template>
  <el-popover
    placement="bottom"
    width="100%"
    popper-class="adversiting-edit-item-popover"
    trigger="manual"
    v-model="visible"
    :disabled="disabled"
    @after-leave="after_leave"
  >
    <div slot="reference">
      <slot name="reference"></slot>
    </div>
    <!-- <slot name="popover_main"></slot> -->
    <main>
      <div class="title">{{ config.label }}</div>
      <component
        :is="active_model"
        :config="row"
        :key="row.id+'_'+config.prop"
        ref="edit_item"
        @cancel="close"
        @save="save_edit"
      ></component>
    </main>

  </el-popover>
</template>

<script>
import EditName from "./name";
import EditBudGet from "./budget";
import EditBid from "./bid";
import EditFlowControlMode from "./flow_control_mode";
import EditDeliveryDate from "./delivery_date";
import EditAutomaticTargeting from "./automatic_targeting";

export default {
  name: "EditPopover",
  components: {
    EditName,
    EditBudGet,
    EditBid,
    EditFlowControlMode,
    EditDeliveryDate,
    EditAutomaticTargeting,
  },
  props: {
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      label: "",
      row: "",
      config: "",
      active_model: "",
    };
  },
  methods: {
    show(info, row, model) {
      this.config = info;
      this.row = row;
      this.active_model = model;
      this.visible = true;
    },
    close() {
      this.active_model = ''
      this.row = ''
      this.visible = false;
    },
    save_edit(param) {
      this.$emit("save", param);
    },
    after_leave() {
      this.$emit("afterLeave");
    },
  },
};
</script>

<style lang="scss">
.adversiting-edit-item-popover {
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
  // width: 500px;
  padding: 0 20px 12px 20px;
  main {
    .title {
      height: 40px;
      // border-bottom: 1px solid #f1f1f1;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      line-height: 40px;
      // margin-bottom: 10px;
    }
  }
}
</style>