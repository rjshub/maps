<template>
    <div class="all-table-container">
        <AccountTable type="all"
            :tableData="tableData"
            :tableConfig="tableConfig"
            @update_list="update_sort_list"
            @change_account_status="change_account_status"
            @selectChange="selectChange"></AccountTable>
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
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("permissions", ["Account_permission"]),
  },
  methods: {
    set_config() {
      const config = {
        handleWidth: "80",
        columnConfig: [
          {
            label: this.$t("lang.account_all_table_config.status"),
            prop: "status",
            width: "100",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_all_table_config.platform"),
            prop: "platform",
            width: "80",
            tooltip: false,
            sortable: false,
          },
          {
            label: this.$t("lang.account_all_table_config.account_name"),
            prop: "media_advertiser_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_all_table_config.account_id"),
            prop: "media_advertiser_id",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_all_table_config.client"),
            prop: "client_name",
            width: "",
            tooltip: true,
            sortable: false,
          },
          {
            label: this.$t("lang.account_all_table_config.sync_time"),
            prop: "syncstatus",
            width: "185",
            tooltip: false,
            sortable: true,
          },
          {
            label: this.$t("lang.account_all_table_config.owner"),
            prop: "owner",
            width: "120",
            tooltip: true,
            sortable: false,
          },
        ],
        handleConfig: [
          {
            icon: "maps-icon-trash",
            title: this.$t("lang.public_delete_tooltip"),
            text: "",
            color: '',
            handle: async (param) => {
              await this.onDelet(param);
            },
            disabled: false,
          },
        ],
      };
      this.tableConfig = config;
    },
    onDelet(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t("lang.account_delete_this.confirm")),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t("lang.account_delete_this.point_1")),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t("lang.account_delete_this.point_2")),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/account/del";
          const param = {
            team_id: this.active_team_id,
            advertiser_id: [row.advertiser_id],
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.$emit("updateList");
          }
        })
        .catch(() => {
          return false;
        });
    },
    change_account_status() {
      this.$emit("updateList");
    },
    selectChange(ids) {
      this.$emit("updateAccountIds", ids);
    },
    update_sort_list(param) {
      this.$emit("updateSortList", param)
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
  mounted() {
    this.set_config();
  },
};
</script>
<style lang='scss' scoped>
.all-table-container {
}
</style>