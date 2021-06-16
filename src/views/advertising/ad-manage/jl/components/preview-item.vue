<template>
  <div
    class="preview-item"
    :style="set_preview_height"
  >
    <el-image
      v-if="preview && images.includes(config.format)"
      style="width: 100%"
      :style="set_img_style"
      :src="config.poster_url"
      :preview-src-list="previewList"
    >
    </el-image>
    <img
      v-else
      :src="config.poster_url"
      alt=""
      :style="set_img_style"
    >
    <div
      class="video-icon"
      v-if="videos.includes(config.format)"
      @click="show_video"
    >
      <i class="iconfont maps-icon-open" :style="preview? 'font-size: 24px':''"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0,
    },
    config: {},
    length: {
      type: Number,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    previewList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // BingImage: BingImage,
      images: ["JPG", "jpg", "JPEG", "jpeg", "PNG", "png", "GIF", "gif"],
      videos: [
        "MP4",
        "mp4",
        "MPEG",
        "mpeg",
        "3GP",
        "3gp",
        "AVI",
        "avi",
        "MOV",
        "mov",
      ],
    };
  },
  computed: {
    set_width() {
      return `width:calc(100% - ${this.width})px`;
    },
    set_img_style() {
      let style = "";
      // // if (this.length == 1) {
      // if (this.config.width > this.config.height) {
      //   style = "width: 100%";
      // } else {
      //   style = "height: 100%;width: 100%";
      // }
      // if (this.preview) {
      //   if (this.config.width > this.config.height) {
      //     style = "width: 100%";
      //   } else {
      //     style = "height: 90px";
      //   }
      // }
      // // } else {
      // //   style = "width: 100%";
      // // }

      return style;
    },
    set_preview_height() {
      let style = ''
      if (this.length == 1) {
        if (this.preview) {
          if (this.config.width > this.config.height) {
            style = 'width: 280px'
          } else {
            style= 'width: 106px'
          }
        } else {
          style = 'height: 45px'
        }
      } else if (this.length == 2) {
        if (this.preview) {
          style = 'width: 117px'
        } else {
          style= 'height: 24px'
        }
        
      // } else if (this.length == 3) {
      } else {
        if (this.preview) {
          style = 'width: 117px;margin-bottom:3px'
        } else {
          style= 'height: 20px'
        }
      }
      return style
    }
  },
  methods: {
    show_video() {
      if (this.preview) {
        window.open(this.config.url);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.preview-item {
  // min-width: 32px;
  // min-height: 22px;
  // max-width: 150px;
  // max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  & > img,
  .el-image {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
  .video-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    i {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.preview-item {
  .el-image-viewer__wrapper {
    .el-image-viewer__close {
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
}
</style>