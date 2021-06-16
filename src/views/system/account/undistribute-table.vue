<template>
    <div class="undistribute-table-container">
        <AccountTable ref="AccountTable"
            :tableData="tableData"
            type="undistribute"
            :tableConfig="tableConfig"
            @selectChange="selectChange"></AccountTable>
        <ApplyPermission ref="ApplyPermission"
            :title="$t('lang.account_apply_permission_title')"
            @applySuccess="applySuccess"></ApplyPermission>
    </div>
</template>

<script>
import AccountTable from "../components/account-table";
import ApplyPermission from "../components/apply-permission";

export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  components: { AccountTable, ApplyPermission },
  data() {
    return {
      tableConfig: {
        handleWidth: "240",
        columnConfig: [],
        handleConfig: [],
      },
    };
  },
  watch: {},
  methods: {
    set_config() {
      const config = {
        handleWidth: "80",
        columnConfig: [
          {
            label: this.$t("lang.account_undistribute_table_config.status"),
            prop: "apply_status",
            width: "90",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.platform"),
            prop: "platform",
            width: "80",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.account_name"),
            prop: "media_advertiser_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.account_id"),
            prop: "media_advertiser_id",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.client"),
            prop: "client_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.owner"),
            prop: "owner",
            width: "120",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_undistribute_table_config.apply_time"),
            prop: "apply_time",
            width: "160",
            tooltip: false,
            sortable: false,
          },
        ],
        handleConfig: [
          {
            icon: "",
            title: "",
            color: '#0BB3B3',
            text: this.$t("lang.public_apply"),
            handle: async (param) => {
              await this.onApply(param);
            },
            disabled: false,
          },
        ],
      };
      this.tableConfig = config;
    },
    onApply(param) {
      this.$refs.ApplyPermission.show([param.advertiser_id], [param]);
    },
    applySuccess() {
      this.$emit("updateList");
    },
    selectChange(ids) {
      this.$emit("updateAccountIds", ids);
    },
  },
  mounted() {
    this.set_config();
  },
};
</script>
<style lang='scss' scoped>
</style>