<template>
  <div class="distribute-table-container">
    <AccountTable
      ref="AccountTable"
      type="distribute"
      :tableData="tableData"
      :tableConfig="tableConfig"
      @update_list="update_sort_list"
      @change_account_status="change_account_status"
      @selectChange="selectChange"
    ></AccountTable>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import AccountTable from "../components/account-table";

export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  components: { AccountTable },
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
        handleWidth: "",
        columnConfig: [
          {
            label: this.$t("lang.account_distribute_table_config.status"),
            prop: "status",
            width: "100",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_distribute_table_config.platform"),
            prop: "platform",
            width: "80",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_distribute_table_config.account_name"),
            prop: "media_advertiser_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_distribute_table_config.account_id"),
            prop: "media_advertiser_id",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_distribute_table_config.client"),
            prop: "client_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_distribute_table_config.sync_time"),
            prop: "syncstatus",
            width: "185",
            tooltip: false,
            sortable: true,
          },
          {
            label: this.$t("lang.account_distribute_table_config.owner"),
            prop: "owner",
            width: "120",
            tooltip: true,
            sortable: false,
          },
        ],
        handleConfig: [],
      };
      this.tableConfig = config;
    },

    change_account_status() {
      this.$emit("updateList");
    },
    selectChange(ids) {
      this.$emit("updateAccountIds", ids);
    },
    update_sort_list(param) {
      this.$emit("updateSortList", param);
    },
  },
  mounted() {
    this.set_config();
  },
};
</script>
<style lang='scss' scoped>
</style>