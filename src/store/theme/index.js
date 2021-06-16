const state = {
    nowThemeInfo: 'default-theme'
}
const getters = {
    //当前主题下的所有图片路径
    // currentThemePngClass: state => {
    //     let pngClass = null
    //     switch (state.nowThemeInfo) {
    //         case 'default-theme':
    //             pngClass = defaultThemeObj
    //             break
    //         // case 'dim-theme':
    //         //     pngClass = darkThemeObj
    //         //     break
    //     }
    //     return pngClass
    // }
}
const mutations = {
    UPDATE_NOW_THEME_INFO(state, value) {
        state.nowThemeInfo = `${value}-theme`
    }
}
const actions = {
    update_now_theme_info({commit}, value) {
        commit('UPDATE_NOW_THEME_INFO', value)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };