<template>
  <el-popover
    placement="right-start"
    title=""
    trigger="hover"
    popper-class="preview-popover"
  >
    <div
      class="custom"
      slot="reference"
    >
      <el-row
        style="width: 100%"
        v-for="(row_item, row_index) in set_preview_cell(config)"
        :key="row_item"
      >
        <el-col
          :span="config.preview.length == 1 ? 24 : 12"
          v-for="preview_item in set_preview_list(config,row_index)"
          :key="preview_item.url"
        >
          <PreviewItem
            :width="0"
            :config="preview_item"
            :length="config.preview.length"
          ></PreviewItem>
        </el-col>
      </el-row>
      <div
        class="model"
        v-if="model"
      >程序化创意</div>
    </div>

    <div class="preview-list">
      <!-- 一张 -->
      <div
        class="preview-one"
        v-if="config.preview.length == 1"
      >
        <PreviewItem
          :width="5"
          :config="config.preview[0]"
          :length="config.preview.length"
          :preview="true"
          :previewList="[config.preview[0].url]"
        ></PreviewItem>
      </div>
      <!-- 多张 -->
      <div
        class="preview-more"
        v-if="config.preview.length > 1"
      >
        <el-row
          :gutter="5"
          style="width: 100%"
          v-for="(row_item, row_index) in set_preview_row(config)"
          :key="row_item"
        >
          <el-col
            :span="12"
            v-for="preview_item in set_preview_list(config,row_index)"
            :key="preview_item.url"
          >
            <PreviewItem
              :width="5"
              :config="preview_item"
              :length="config.preview.length"
              :preview="true"
              :previewList="[preview_item.url]"
            ></PreviewItem>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-popover>
</template>

<script>
import PreviewItem from "./preview-item";

export default {
  props: {
    config: {
      type: Object,
    },
    model: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PreviewItem,
  },
  data() {
    return {
      images: ["JPG", "jpg", "JPEG", "jpeg", "PNG", "png", "GIF", "gif"],
      videos: ["MP4", "mp4", "MPEG", "mpeg", "3GP", "3gp", "AVI", "avi"],
    };
  },
  computed: {},
  methods: {
    set_preview_cell(row) {
      const num = row.preview.length || 0;
      return Math.ceil(num / 2) == 1 ? 1 : 2;
    },
    set_preview_row(row) {
      const num = row.preview.length || 0;
      return Math.ceil(num / 2) == 1 ? 1 : Math.ceil(num / 2);
    },
    set_preview_list(row, index) {
      let result = [];
      if (row.preview && row.preview.length) {
        result = row.preview.slice(index * 2, (index + 1) * 2);
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
.ad-jl-container {
  .el-row {
    margin: 0 !important;
    width: 100%;
    // height: 100%;
  }
}
.preview-popover {
  padding: 5px;
}
</style>

<style scoped lang="scss">
.preview-popover {
  width: auto;
  .preview-list {
    // max-height: 300px;
    overflow-y: auto;
    .preview-one {
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 20px !important;
      }
    }
    .preview-more {
      width: 100%;
      height: 100%;
      // max-width: 300px;
    }
  }
}
.custom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .model {
    display: flex;
    width: 100%;
    height: 50%;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    position: absolute;
    bottom: 0;
  }
}
</style>