<template>
  <el-popover
    placement="bottom-start"
    :title="title"
    width="500"
    v-model="visible"
    popper-class="filter-popover-box"
    trigger="click"
    content=""
  >
    <div slot="reference">
      <slot name="reference"></slot>
    </div>
    <div
      class="main"
      v-if="Object.keys(filter).length"
    >
      <div class="filter-list">
        <div
          class="filter-item"
          v-for="(item, index) in config"
          :key="index"
        >
          <div
            class="item-title"
            v-if="
              item.hasOwnProperty('show') && item.show.indexOf(handle) != -1
            "
          >
            {{ item.name }}
          </div>
          <div
            class="item-content"
            v-if="
              item.hasOwnProperty('show') && item.show.indexOf(handle) != -1
            "
          >
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type == 1"
              v-model="filter[item.value]"
            >
              <el-checkbox
                v-for="option in item.list"
                :key="option.value"
                :label="option.value"
              >{{ option.name }}</el-checkbox>
            </el-checkbox-group>
            <!-- 单选框 -->
            <el-radio-group
              v-if="item.type == 2"
              v-model="filter[item.value]"
            >
              <el-radio
                v-for="option in item.list"
                :key="option.value"
                :label="option.value"
              >{{ option.name }}</el-radio>
            </el-radio-group>
            <!-- 时间筛选 -->
            <el-date-picker
              v-if="item.type == 3"
              v-model="filter[item.value]"
              type="daterange"
              :editable="false"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :clearable="item.value != 'create_date'"
              :picker-options="pickerOptions"
              @focus="date_picker_focus(item.value)"
            >
            </el-date-picker>
            <!-- 单选+下拉 -->
            <div
              class="combined"
              v-if="item.type == 4"
            >
              <!-- <el-radio-group v-model="filter[item.value]">
                                <el-radio v-for="option in item.list" 
                                    :key="option.value"
                                    :label="option.value">{{option.name}}</el-radio>
                            </el-radio-group> -->
              <el-checkbox-group
                v-model="filter[item.value]"
                @change="complex_change($event, item)"
              >
                <el-checkbox
                  v-for="option in item.list"
                  :key="option.value"
                  :label="option.value"
                >{{ option.name }}</el-checkbox>
              </el-checkbox-group>

              <!-- v-if="item.relation.list.length" -->
              <filter-select
                v-model="filter[item.relation.value]"
                style="margin: 0;width: 33%"
                :prop="{ value: 'value', label: `name`, label_id: 'id' }"
                :options="item.relation.list"
                :showId="
                  Boolean(
                    item.relation.list.length &&
                      item.relation.value != 'auto_extend_targets'
                  )
                "
                :loadMore="false"
                :disabled="set_relation(filter[item.value], item.relation.key)"
                filterable
                multiple
                :placeholder="item.relation.placeholder"
              ></filter-select>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">

        <el-button
          size="mini"
          class="maps-button-mini"
          @click="handle_cancel_config"
          plain
        >{{ $t("lang.public_button_cancel") }}</el-button>
        <el-button
          size="mini"
          class="maps-button-mini"
          @click="handle_save_config"
          type="primary"
        >{{ $t("lang.public_button_apply_to") }}</el-button>
      </div>
    </div>
    <div
      class="empty-option"
      v-else
    >暂无数据</div>
  </el-popover>
</template>

<script>
import _ from "lodash";
export default {
  name: "FilterPopover",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    config: {
      default: () => {
        return [];
      },
    },
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
    handle: {
      default: "1",
    },
  },
  data() {
    return {
      visible: false,
      filter: {},
      empty: [],
      create_date_pickerMinDate: null,
      delivery_date_pickerMinDate: null,
      pickerOptions: {},
    };
  },
  watch: {
    model: {
      handler() {
        this.$nextTick(() => {
          this.filter = _.cloneDeep(this.model);
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.filter = _.cloneDeep(this.model);
      });
    },
    // 判断是否有筛选条件
    check_filter() {
      let state = false;
      this.config.forEach((item) => {
        if (this.filter[item.value] != "" || this.filter[item.value].length) {
          state = true;
        }
      });
      return state;
    },
    // 复选+下拉时改变
    complex_change(param, info) {
      if (!param.includes(Number(info.relation.key))) {
        if (this.filter[info.relation.value].length) {
          this.filter[info.relation.value] = [];
        }
      }
    },
    // 时间
    date_picker_focus(type) {
      this.pickerOptions = {
        onPick: (obj) => {
          if (!obj.maxDate) {
            this[`${type}_pickerMinDate`] = new Date(obj.minDate).getTime();
          }
        },
        disabledDate: (time) => {
          if (this[`${type}_pickerMinDate`]) {
            const day1 = 365 * 24 * 3600 * 1000;
            let maxTime = this[`${type}_pickerMinDate`] + day1;
            let minTime = this[`${type}_pickerMinDate`] - day1;
            if (type == "create_date") {
              return (
                time.getTime() > Date.now() ||
                time.getTime() > maxTime ||
                time.getTime() < minTime
              );
            } else {
              return time.getTime() > maxTime || time.getTime() < minTime;
            }
          } else {
            if (type == "create_date") {
              return time.getTime() > Date.now();
            }
          }
        },
      };
    },
    handle_cancel_config() {
      this.visible = false;
      this.filter = _.cloneDeep(this.model);
    },
    handle_save_config() {
      this.$emit("update", { filter: this.filter, state: this.check_filter() });
      this.visible = false;
    },
    set_relation(param, key) {
      if (param != undefined) {
        const data = param.length ? param : [];
        const index = data.findIndex((obj) => {
          return obj == key;
        });
        if (index < 0) {
          return true;
        }
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="scss">
.filter-popover-box {
  min-height: 100px;
  padding: 20px;
  .el-popover__title {
    font-weight: 700;
    color: #333;
  }
  .main {
    // min-height: 160px;
    .filter-list {
      max-height: 420px;
      overflow-y: auto;
    }
    .filter-item {
      margin-bottom: 10px;
      .item-title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
        margin: 5px 0 10px 0;
      }
      .item-content {
        .combined {
          width: 100%;
          display: flex;
          align-items: center;
          .el-checkbox-group {
            flex: 1;
            .el-checkbox {
              width: 50%;
            }
          }
        }
        .el-radio-group {
          flex-wrap: wrap;
          .el-radio {
            width: 33%;
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
        .el-checkbox-group {
          .el-checkbox {
            width: 33%;
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
        .el-date-editor.el-input__inner {
          height: 32px;
          line-height: 32px;
          span,
          i {
            line-height: 24px;
          }
        }
        .el-date-editor .el-range-input,
        .el-date-editor .el-range-separator {
          font-size: 12px;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
  .empty-option {
    text-align: center;
    margin-top: 20px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
<style lang='scss' scoped>
</style>