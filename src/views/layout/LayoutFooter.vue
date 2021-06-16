<template>
    <footer v-loading.fullscreen="isLoading">
        Copyright ©{{year}}{{$t('lang.copyright')}}
        <!-- <span :class="language  === 'zh'? 'privacy-text':''"
            @click="change_language('zh')"> 中文(简体) </span>
        |
        <span :class="language  === 'en'? 'privacy-text':''"
            @click="change_language('en')"> English</span> -->
    </footer>
</template>
<style>
footer {
  padding: 15px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import fetch from "@/services/fetch";
import axios from 'axios'

export default {
  name: "LayoutFooter",
  data() {
    return {
      isLoading: false,
      year: new Date().getFullYear()
    };
  },
  computed: {
    ...mapGetters("user", ["isLogin"]),
    ...mapState("user", ["language"]),
  },
  methods: {
    ...mapActions("user", ["update_language"]),
    ...mapActions("system", ["update_platform_config"]),
    change_language(param) {
      this.update_language(param);
      document.cookie = `lang=${param}`;
      this.isLoading = true
      axios.defaults.headers.common.lang = param
      setTimeout(() => {
        window.location.reload();
      }, 500)
    },
    async get_option_list() {
      const url = "/message/enum";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.update_platform_config(data.data.platform);
      }
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
    if (this.isLogin) {
      this.get_option_list();
    }
  },
};
</script>
<style lang="scss" scoped>
.privacy-text {
  color: rgba(0, 204, 204, 1);
}
span {
  margin: 0 10px;
  cursor: pointer;
}
// .login-privacy {
//   color: rgba(0, 204, 204, 1);
// }
</style>
