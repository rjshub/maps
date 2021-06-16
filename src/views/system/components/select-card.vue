<template>
    <div class="select-card-container">
        <div class="title">{{title}}</div>
        <main class="list"
            v-if="list.length">
            
            <div class="list-item"
                :class="checked === item.id? 'is_active':''"
                v-for="item in list"
                :key="item.id"
                @click="select_item(item.id)">
                <maps-tooltip :text="item.name">
                  <span>{{item.name}}</span>
                </maps-tooltip>

                <i class="iconfont maps-icon-right"></i>
            </div>
        </main>
        <span v-else
            class="empty-text">{{$t('lang.public_no_data')}}</span>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  props: {
    title: {
      type: String,
    },
    list: {
      type: Array,
    },
    checked: [String, Number],
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
  },
  methods: {
    select_item(id) {
      this.$emit("select_result", id);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.select-card-container {
  width: 20%;
  height: 100%;
  border: 1px solid #dcdfe6;
  position: relative;
  .title {
    height: 36px;
    padding: 0 10px;
    background: #f1f1f1;
    border-bottom: 1px solid #dcdfe6;
    color: #333;
    font-size: 14px;
    font-weight: 700;
    line-height: 36px;
  }
  .list {
    height: calc(100% - 37px);
    overflow-y: auto;
    .list-item {
      height: 40px;
      padding: 0 10px;
      font-size: 12px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;
      span {
        display: inline-block;
        width: calc(100% - 10px);
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      i {
        color: #4c6073;
        font-size: 6px;
      }
    }
    .list-item:hover {
      background: #00cccc;
      color: #fff;
      i {
        color: inherit;
      }
    }
    .is_active {
      background: #0bb3b3;
      color: #fff;
    }
  }
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
</style>