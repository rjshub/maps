<template>
    <el-drawer :visible.sync="drawer"
        direction="rtl"
        size="55%"
        custom-class="table-config-container fullscreen-drawer"
        :close-on-press-escape="false"
        :show-close="false"
        :wrapperClosable="false"
        :destroy-on-close="true"
        v-loading="dialog_row_loading">
        <section class="drawer-header">
            <div class="back"
                @click="close_drawer">
                <i class="iconfont maps-icon-right"></i>
            </div>

            <div class="right-btn">
                <div>
                    <span>{{$t('lang.report_Customize_Columns')}} - {{title}}</span>
                    <el-checkbox v-model="save_config">{{$t('lang.report_Save_as_preset')}}</el-checkbox>
                    <el-checkbox v-model="show_total">{{$t('lang.report_Show_total_row')}}</el-checkbox>
                </div>

                <div class="btn">
                    <el-button size="mini"
                        class="maps-button-mini"
                        @click="handle_cancel_config"
                        plain>{{$t('lang.public_button_cancel')}}</el-button>
                    <el-button size="mini"
                        class="maps-button-mini"
                        @click="handle_save_config"
                        type="primary">{{$t('lang.public_button_save')}}</el-button>
                </div>
            </div>
        </section>
        <section class="drawer-main">
            <div class="main-left">
                <!-- :style="language == 'zh'? 'min-width: 160px':'min-width: 215px'"> -->
                <el-tabs tab-position="left"
                    v-model="module_name"
                    @tab-click="jump_to_module"
                    style="height: 100%">
                    <el-tab-pane v-for="(item, index) in set_module_list"
                        :key="index"
                        :name="item[language]"
                        :label="item[language]"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="main-center">
                <div class="select-contsiner select-filter">
                    <el-input size="mini"
                        :placeholder="$t('lang.report_Search_by_field_name')"
                        :clearable="true"
                        class="filter-input"
                        @keyup.enter.native="filter_change"
                        v-model="filter_word">
                        <div slot="prefix"
                            style="cursor: pointer">
                            <i class="iconfont maps-icon-search"
                                @click="filter_change"></i>
                        </div>
                    </el-input>
                </div>
                <main class="module-list"
                    v-if="set_title_list.length"
                    ref="module_list">
                    <div class="module-item"
                        v-for="(item, item_index) in set_title_list"
                        :ref="`module_card_${item_index}`"
                        :key="item_index">
                        <div class="item-header">
                            <span style="line-height: 18px">
                                {{item[language]}}
                                <maps-tooltip :text="set_title_desc(item)"
                                    align="left">
                                    {{item.hasOwnProperty(`desc_${language}`)}}
                                    <i class="iconfont maps-icon-info"
                                        style="color: #999; font-size: 13px;line-height: 18px"
                                        v-if="item.hasOwnProperty(`desc_${language}`) && item[`desc_${language}`] != ''"></i>
                                </maps-tooltip>
                            </span>

                            <el-checkbox :indeterminate="item.indeterminate"
                                v-if="show_checkall"
                                v-model="item.mychecked"
                                @change="all_check_change(item_index)">{{$t('lang.public_check_all')}}</el-checkbox>
                        </div>
                        <div class="item-child">
                            <div class="child"
                                :class="child.hasOwnProperty('icon')? 'icon-child':'not-icon-child'"
                                v-for="(child, child_index) in item.children"
                                :key="child_index">
                                <maps-tooltip :text="set_child_desc(child)"
                                    align="left">
                                    <el-checkbox v-model="child.mychecked"
                                        :disabled="child.disable"
                                        @change="title_check_change(item_index,child_index)">{{child[language]}}</el-checkbox>
                                </maps-tooltip>
                                <IconBox v-if="child.hasOwnProperty('icon')"
                                    :key="child_index"
                                    :icon="child.icon"></IconBox>
                            </div>
                        </div>
                    </div>
                </main>
                <div class="list-empty"
                    v-else>
                    <i class="iconfont maps-icon-nodata"></i>
                    <span>{{$t('lang.public_no_data')}}</span>
                </div>
            </div>
            <div class="main-right">
                <div class="right-title">
                    {{$t('lang.public_checked')}}
                    <el-button type="text"
                        @click="clear_all"
                        size="mini">{{$t('lang.public_clear_all')}}</el-button>
                </div>
                <draggable class="grag-warp"
                    v-model="result_list"
                    v-bind="dragOptions"
                    draggable=".enable-move"
                    @change="drag_change"
                    @start="isDrag = true"
                    @end="isDrag = false">

                    <div class="result-item"
                        :class="special_key.includes(result.key)? 'special-key':'enable-move'"
                        v-for="(result, index) in result_list"
                        :key="index">
                        <div>
                            <i :class="special_key.includes(result.key)? '':'maps-icon-drag'"
                                class="iconfont "
                                style="display: inline-block;width:16px"></i>
                            {{result[language]}}
                        </div>
                        <span v-if="!special_key.includes(result.key)"
                            @click="clear(result)">&times</span>
                    </div>
                </draggable>
            </div>
        </section>
    </el-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import fetch from "@/services/fetch";
import draggable from "vuedraggable";
import _ from "lodash";
import IconBox from "./icon-box";
import platform_jl_path from "@/assets/image/platform/jl.svg";
import platform_tx_path from "@/assets/image/platform/tx.svg";
import platform_wx_path from "@/assets/image/platform/wx.svg";

export default {
  props: {
    title: String,
    type: String,
    moduleList: Array,
    titleList: Array,
    checkedList: Array,
    special_key: Array,
    timeLine: String,
  },
  components: { draggable, IconBox },
  data() {
    // const THIS = this;
    return {
      platform_jl_path: platform_jl_path,
      platform_tx_path: platform_tx_path,
      platform_wx_path: platform_wx_path,
      drawer: false,
      dialog_row_loading: false,
      save_config: false, // 保存常用列
      show_total: true, // 显示总计
      dragOptions: {
        animation: 500,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      isDrag: false,
      filter_word: "",
      result_list: [],
      module_name: "",
      show_checkall: true,
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
    set_title_list() {
      if (!this.titleList.length) {
        return false;
      }
      const word = this.filter_word.trim();
      let list = [];
      if (word.length) {
        this.show_checkall = false;
        this.titleList.forEach((item, index) => {
          let tmp_item = _.cloneDeep(item);
          tmp_item.children = [];
          if (item.children && item.children.length) {
            let tmp_child = [];
            item.children.forEach((child) => {
              if (child[this.language].toLowerCase().includes(word.toLowerCase()) || child[this.language].toLowerCase() == word.toLowerCase()) {
                tmp_child.push(child);
                tmp_item.children = tmp_child;
              }
            });
          }
          if (tmp_item.children.length) {
            list.push(tmp_item);
          }
        });
      } else {
        this.show_checkall = true;
        list = this.titleList;
      }
      if (list.length) {
        this.module_name = list[0][this.language];
      }
      return list;
    },
    set_module_list() {
      let list = [];
      if (this.set_title_list.length) {
        this.set_title_list.forEach((item) => {
          const param = {
            en: item.en,
            zh: item.zh,
          };
          list.push(param);
        });
      } else {
        // list = this.moduleList;
        list = [];
      }
      return list;
    },
  },
  methods: {
    show() {
      this.drawer = true;
      this.result_list = _.cloneDeep(this.checkedList);
      this.module_name = this.titleList[0][this.language];
    },
    close_drawer() {
      this.handle_cancel_config();
    },
    filter_change() {},
    // 设置每个配置类型tooltip
    set_title_desc(param) {
      let text = "";
      if (param.hasOwnProperty(`desc_${this.language}`)) {
        text = param[`desc_${this.language}`];
      } else {
        text = "";
      }
      return text;
    },
    // 设置每个字段tooltip
    set_child_desc(param) {
      let text = "";
      if (param.hasOwnProperty(`desc_${this.language}`)) {
        text = param[`desc_${this.language}`];
      } else {
        text = "";
      }
      return text;
    },
    // 字段导航
    jump_to_module(param) {
      let el = `module_card_${param.index}`;
      let speed = 20;
      //el 标签  speed 滚动速率 此处是50px 值越大滚动的越快
      let _this = this;
      let dom = document.querySelector(".main-center");
      let windowH = dom.offsetHeight; //浏览器窗口高度
      let h = this.$refs[el][0].offsetHeight; //模块内容高度
      let t = this.$refs[el][0].offsetTop; //模块相对于内容顶部的距离

      // let top = t - (windowH - h) / 2; //需要滚动到的位置，若改为 t 则滚动到模块顶部位置，此处是滚动到模块相对于窗口垂直居中的位置
      let top = t - (windowH - t) / 2; //需要滚动到的位置，若改为 t 则滚动到模块顶部位置，此处是滚动到模块相对于窗口垂直居中的位置
      let scrollTop = dom.scrollTop; //滚动条距离顶部高度
      let currentTop = scrollTop; //默认滚动位置为当前滚动条位置，若改为0，则每次都会从顶部滚动到指定位置
      let requestId;
      //采用requestAnimationFrame，平滑动画
      function step() {
        //判断让滚动条向上滚还是向下滚
        if (scrollTop < top) {
          if (currentTop <= top) {
            if (!dom.scrollTo) {
              dom.scrollTop = top;
            } else {
              dom.scrollTo(0, currentTop);
            }
            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向下滚动
          currentTop += speed;
        } else {
          if (top <= currentTop) {
            //注：此处 - speed 是解决居中时存在的问题，可自行设置或去掉
            if (!dom.scrollTo) {
              dom.scrollTop = currentTop - speed;
            } else {
              dom.scrollTo(0, currentTop - speed);
            }

            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向上滚动
          currentTop -= speed;
        }
      }
      window.requestAnimationFrame(step);
    },
    // 字段模块全选
    all_check_change(index) {
      let format = (bool) => {
        this.titleList[index].children.map((item) => {
          if (!item.disable) {
            // 不能移动删除的除外
            item.mychecked = bool;
          }
        });
      };
      const data = this.titleList[index];
      data.indeterminate = false;
      format(data.mychecked);

      data.children.forEach((item) => {
        const param = {
          parent: data.en,
          ...item,
        };
        const index = this.result_list.findIndex((obj) => {
          return obj.key === param.key;
        });

        if (index < 0 && param.mychecked) {
          this.result_list.push(param);
        } else if (!param.mychecked && !param.disable) {
          this.result_list.splice(index, 1);
        }
      });
    },
    // 每个字段选中事件
    title_check_change(father_index, item_index) {
      let num = 0;
      const index = this.titleList.findIndex((obj) => {
        return this.set_title_list[father_index][this.language] == obj[this.language];
      });
      if (index >= 0) {
        this.titleList[index].children.forEach((item) => {
          if (item.mychecked) {
            num++;
          }
        });
        if (num === this.titleList[index].children.length) {
          this.titleList[index].mychecked = true;
          this.titleList[index].indeterminate = false;
        } else {
          this.titleList[index].mychecked = false;
          this.titleList[index].indeterminate = true;
        }
        if (num === 0) {
          this.titleList[index].mychecked = false;
          this.titleList[index].indeterminate = false;
        }

        const param = {
          parent: this.titleList[index].en,
          ...this.titleList[index].children[item_index],
        };
        this.format_result(param);
      }
    },
    format_result(param) {
      const index = this.result_list.findIndex((obj) => {
        return obj.key === param.key;
      });

      if (index < 0) {
        this.result_list.push(param);
      } else {
        this.result_list.splice(index, 1);
      }
    },
    // 右侧选中结果排序
    drag_change(e) {
      const [sort, newsort] = [e.moved.element.sort, e.moved.newIndex + 1];
      // this.update_location("move", sort, newsort);
    },
    // 清除
    clear(param) {
      const parentIndex = this.titleList.findIndex((obj) => {
        return obj.en === param.parent;
      });
      const childIndex = this.titleList[parentIndex].children.findIndex((obj) => {
        if (obj.key === param.key) {
          obj.mychecked = false;
        }
        return obj.key === param.key;
      });
      this.title_check_change(parentIndex, childIndex);
    },
    // 清空
    clear_all() {
      this.titleList.forEach((item) => {
        item.mychecked = false; //全选
        item.indeterminate = false; // 不全选
        if (item.children && item.children.length) {
          item.children.forEach((child) => {
            // 默认不可修改的字段除外
            if (!child.disable) {
              child.mychecked = false;
            }

            const index = this.result_list.findIndex((obj) => {
              return obj.key == child.key;
            });
            // 清空默认字段之外的
            if (index >= 0 && !child.disable) {
              this.result_list.splice(index, 1);
            }
          });
        }
      });
    },
    // 保存、取消
    handle_cancel_config() {
      this.refresh();
      this.$emit("cancel_setting_config", this.checkedList);
    },
    refresh() {
      this.drawer = false;
      this.save_config = false;
      this.show_total = true;
      this.result_list = [];
      this.filter_word = "";
    },
    async handle_save_config() {
      if (this.save_config) {
        const url = "/report/updatetitle";
        const config = this.format_result_key().join();
        let param = {
          type: this.type,
          title: config,
          time_line: this.timeLine,
        };
        const res = await this.fetchCore(url, param, true);
        if (res) {
          const param = {
            show_total: this.show_total,
            save: true,
            keys: this.format_result_key(),
          };
          this.$emit("update_table_config", param);
          this.refresh();
        }
      } else {
        const param = {
          show_total: this.show_total,
          save: false,
          keys: this.format_result_key(),
        };
        this.$emit("update_table_config", param);
      }
      this.drawer = false;
    },
    format_result_key() {
      let result = [];
      this.result_list.forEach((item) => {
        result.push(item.key);
      });
      return result;
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
<style lang="scss">
.table-config-container {
  // width: calc(100% - 190px) !important;
  .el-drawer__header {
    margin: 0;
  }
  .el-drawer__body {
    height: calc(100% - 20px);
  }
  .drawer-main {
    .main-left {
      .el-tabs--left .el-tabs__header.is-left {
        width: 100%;
      }
      .el-tabs > .el-tabs__header .el-tabs__item {
        text-align: left;
        padding-left: 0 !important;
      }
      .el-tabs > .el-tabs__header .el-tabs__item.is-active {
        border-width: 0;
      }
    }
    .main-center {
      .module-list {
        .module-item {
          .item-header {
            .el-checkbox__label {
              font-weight: 700;
            }
          }
          .item-child {
            .el-checkbox {
              // margin-bottom: 10px;
              .el-checkbox__label {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.table-config-container {
  .drawer-header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .back {
      height: 24px;
      width: 35px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      margin-right: 20px;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 12px;
      }
    }
    .back:hover {
      background-color: #0bb3b3;
      color: #fff;
    }
    .right-btn {
      flex: 1;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div:nth-child(1) {
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .drawer-main {
    height: calc(100% - 50px);
    padding: 0 20px 30px 35px;
    display: flex;
    & > div {
      height: 100%;
      overflow-y: auto;
    }
    .main-left {
      width: 200px;
      // min-width: 160px;
      border-right: 3px solid #f1f1f1;
    }
    .main-center {
      flex: 1;
      position: relative;
      .select-filter {
        width: 60%;
        padding: 0 20px;
      }
      .module-list {
        padding: 20px;

        .module-item {
          .item-header {
            padding: 10px 0;
            font-size: 14px;
            color: #333;
            line-height: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .item-child {
            display: flex;
            flex-wrap: wrap;
            .child {
              display: flex;

              padding: 5px 5px 5px 0;
              overflow: hidden;
              position: relative;
            }
            .icon-child {
              // min-width: calc(33% - 10px);
              min-width: calc(50% - 50px);
              padding-right: 50px;
            }
            .not-icon-child {
              min-width: calc(50% - 5px);
              padding-right: 5px;
            }
          }
        }
      }
      .list-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 20px auto;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        color: #999999;
        font-size: 14px;
        text-align: center;
        & > i {
          font-size: 70px;
        }
        span {
          margin-top: 20px;
          color: #333;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .main-right {
      width: 220px;
      border: 1px solid #dcdfe6;
      overflow: unset;
      .right-title {
        height: 40px;
        padding: 0 20px;
        background: #f1f1f1;
        border-bottom: 1px solid #dcdfe6;
        color: #333;
        font-size: 14px;
        line-height: 40px;
        font-weight: 700;
        display: flex;
        align-content: center;
        justify-content: space-between;
      }
      .ghost {
        opacity: 0.5;
        background: inherit;
      }
      .grag-warp {
        height: calc(100% - 41px);
        overflow-y: auto;
        .result-item {
          min-height: 32px;
          padding: 0 20px 0 10px;
          background: #f1f1f1;
          margin-bottom: 2px;
          font-size: 12px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            line-height: 24px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            i {
              margin-right: 5px;
            }
          }
          span {
            font-size: 8px;
            color: #ff3333;
            cursor: pointer;
          }
        }
        .special-key {
          background: #f9f9f9;
        }
      }
    }
  }
}
</style>