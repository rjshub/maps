<template>
    <div class="select-account">
        <section class="select">
            <div class="title">{{$t('lang.team_ad_account')}}</div>
            <div style="padding: 10px">
                <el-input size="mini"
                    :placeholder="$t('lang.team_search_account_name_id')"
                    class="filter-input"
                    @keyup.enter.native="filter_change"
                    v-model="word">
                    <div slot="prefix"
                        style="cursor: pointer">
                        <i class="iconfont maps-icon-search"
                            @click="filter_change"></i>
                    </div>
                </el-input>
            </div>
            <main v-if="list.length">
                <div class="list-item all-check">
                    <el-checkbox :indeterminate="isIndeterminate"
                        :disabled="!set_account_list.length"
                        v-model="checkAll"
                        @change="handleCheckAllChange">{{$t('lang.public_check_all')}}</el-checkbox>
                </div>

                <el-checkbox-group v-model="result"
                    @change="handleCheckedAccountChange">
                    <div class="list-item"
                        v-for="(item, index) in set_account_list"
                        :key="item.id"
                        :class="set_stripe(index)">
                        <el-checkbox :label="`${item.media_advertiser_name},${item.id}`">{{item.media_advertiser_name}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </main>
            <span v-else
                class="empty-text">{{$t('lang.public_no_data')}}</span>
        </section>
        <section>
            <i class="iconfont maps-icon-right"></i>
        </section>
        <section class="result">
            <div class="title result-title">
                {{$t('lang.public_checked')}}
                <el-button type="text"
                    @click="clear('all')">{{$t('lang.public_clear_all')}}</el-button>
            </div>
            <main v-if="result.length">
                <div class="list-item result-item"
                    v-for="(item, index) in result"
                    :key="index"
                    :class="set_stripe(index)">
                    <span class="result_title">{{item.split(',')[0]}}</span>
                    <span class="clear"
                        @click="clear(item)">&times</span>
                </div>
            </main>
            <span v-else
                class="empty-text">{{$t('lang.public_no_data')}}</span>
        </section>
    </div>

</template>

<script>
export default {
  components: {},
  props: {
    list: {
      type: Array,
    },
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        this.checkAll = false;
        this.isIndeterminate = false;
        this.all_account_ids = [];
        newVal.forEach((item) => {
          // this.all_account_ids.push(item.id);
          this.all_account_ids.push(`${item.media_advertiser_name},${item.id}`);
        });
        this.handleCheckedAccountChange()
      },
      immediate: true,
    },
  },
  data() {
    return {
      word: "",
      checkAll: false,
      isIndeterminate: false,
      all_account_ids: [],
      result: [],
    };
  },
  computed: {
    set_result() {
      const data = [];
      if (this.result.length) {
        this.result.forEach((item) => {
          const index = this.list.findIndex((obj) => {
            return obj.id == item;
          });
          if (index !== -1) {
            data.push(this.list[index]);
          }
        });
      }
      return data;
    },
    set_account_list() {
      let groups = [];
      if (this.word) {
        this.list.forEach((item) => {
          if (
            item.media_advertiser_name.toLowerCase().includes(this.word.toLowerCase()) ||
            item.media_advertiser_name.toLowerCase() == this.word.toLowerCase() ||
            item.media_advertiser_id.includes(this.word.toLowerCase()) ||
            item.media_advertiser_id == this.word.toLowerCase()
          ) {
            groups.push(item);
          }
        });
      } else {
        groups = this.list;
      }

      return groups;
    },
  },
  methods: {
    refresh() {
      this.checkAll = false;
      this.isIndeterminate = false;
      this.all_account_ids = [];
      this.result = [];
    },
    update_checked_result(arr = []) {
      let data = [];
      if (arr.length) {
        arr.forEach((item) => {
          data.push(`${item.media_advertiser_name},${item.id}`);
        });
      }
      this.result = data;
      this.$emit("updateAccountList", this.result);
    },
    filter_change(param) {},
    // 斑马纹
    set_stripe(index) {
      if (index === 0) {
        return "light-item";
      } else if (index === 1) {
        return "dark-item";
      } else {
        if (index % 2 === 0) {
          return "light-item";
        } else {
          return "dark-item";
        }
      }
    },
    handleCheckAllChange(val) {
      // this.result = val ? this.set_all(true) : this.set_all(false);
      val ? this.set_all(true) : this.set_all(false);
      this.isIndeterminate = false;
      this.$emit("updateAccountList", this.result);
    },
    set_all(all) {
      this.all_account_ids.forEach((item) => {
        if (all && !this.result.includes(item)) {
          this.result.push(item);
        } else if (!all && this.result.includes(item)) {
          const index = this.result.findIndex((obj) => {
            return obj === item;
          });
          if (index >= 0) {
            this.result.splice(index, 1);
          }
        }
      });
    },
    handleCheckedAccountChange() {//value
      let tmp_value = []
      if (this.list.length) {
        this.list.forEach(item => {
          if (this.result.includes(`${item.media_advertiser_name},${item.id}`)) {
            tmp_value.push(item)
          }
        })
      }
      let checkedCount = tmp_value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
      this.$emit("updateAccountList", this.result);
    },
    // 结果处理
    clear(param) {
      if (param === "all") {
        this.result = [];
        this.checkAll = false;
        this.isIndeterminate = false;
      } else {
        const index = this.result.findIndex((obj) => {
          return obj === param;
        });
        this.result.splice(index, 1);
        if (this.result.length === 0) {
          this.checkAll = false;
          this.isIndeterminate = false;
        }
      }
      this.$emit("updateAccountList", this.result);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.select-account {
  display: flex;
  .select {
    .el-checkbox {
      margin: 0;
      width: 100%;
      .el-checkbox__label {
        font-size: 12px;
        color: #333;
        line-height: 32px;
      }
    }
    .all-check {
      .el-checkbox {
        .el-checkbox__label {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.select-account {
  width: 60%;
  .select,
  .result {
    width: 40%;
    height: 100%;
    border: 1px solid #dcdfe6;
    .title {
      height: 36px;
      padding: 0 15px;
      background: #f1f1f1;
      border-bottom: 1px solid #dcdfe6;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      line-height: 36px;
    }
    main {
      height: calc(100% - 93px);
      overflow-y: auto;
      .list-item {
        height: 32px;
        padding: 0 10px;
        font-size: 12px;
        color: #333;
        line-height: 32px;
      }
      .light-item {
        background: unset;
      }
      .dark-item {
        background: #f1f1f1;
      }
    }
  }
  & > section:nth-child(2) {
    padding: 0 10px;
    i {
      font-size: 48px;
      line-height: 240px;
      color: #e0e0e0;
    }
  }
  .result {
    .result-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    main {
      height: calc(100% - 37px);
      overflow-y: auto;
      .result-item {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        // overflow: hidden;
        .result_title {
          max-width: calc(100% - 20px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .clear {
          font-size: 10px;
          color: #ff3333;
          cursor: pointer;
        }
      }
    }
  }
  section {
    position: relative;
    .empty-text {
      color: #909399;
      font-size: 14px;
      position: absolute;
      margin: 0 auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>