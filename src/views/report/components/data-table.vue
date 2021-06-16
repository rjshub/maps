<template>
    <el-table :data="set_data"
        :max-height="maxHeight"
        height="100%"
        class="maps-detail-table"
        ref="maps_table"
        style="width: 100%"
        stripe
        :border="true"
        @header-dragend="table_drag_change"
        @sort-change="table_sort_change">
        <el-table-column v-for="(item,index) in config"
            :key="index"
            :min-width="item.width"
            :fixed="item.fixed"
            :resizable="true"
            :align="item.align"
            sortable="custom"
            :prop="item.prop"
            :show-overflow-tooltip="item.tooltip">

            <template slot="header"
                slot-scope="scope">
                <maps-tooltip :text="item.desc"
                    align="left">
                    <span>{{item.label}}</span>
                </maps-tooltip>
            </template>

            <template slot-scope="scope">
                <div v-if="item.prop === 'platform'">
                    <platform-icon :platform="scope.row.platform"></platform-icon>
                </div>
                <div v-else>{{scope.row[item.prop] || '--'}}</div>
            </template>
        </el-table-column>

        <template slot="empty">
            <table-empty></table-empty>
        </template>
    </el-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {
    config: Array,
    data: Array,
    total_data: Array,
    total: [Number, String],
    is_total: Boolean,
    maxHeight: {
      type: [Number, String],
      default: "100%",
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("system", ["platform_config"]),
    ...mapState("user", ["language"]),
    set_data() {
      let data = [];
      if (this.is_total) {
        data = this.total_data.concat(this.data);
      } else {
        data = this.data;
      }
      return data;
    },
  },
  methods: {
    // 排序
    table_sort_change(column) {
      const map = {
        ascending: "ASC",
        descending: "DESC",
      };
      const param = {
        order: map[column.order],
        order_by: column.prop,
      };
      this.$emit("update_list", param);
    },
    // 拖动列宽
    table_drag_change() {
      this.$refs.maps_table.doLayout();
    },
    update() {
      this.$refs.maps_table.doLayout();
    },
  },
  mounted() {},
};
</script>
<style lang='scss'>
.maps-detail-table {
  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    thead {
      th {
        padding: 6px 0;
      }
    }
  }
  .el-table__fixed-body-wrapper tbody tr .cell,
  .el-table__body-wrapper tbody tr .cell {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .el-table__header-wrapper th > .cell {
    display: flex !important;
  }
}
</style>