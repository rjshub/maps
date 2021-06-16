
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// const targetUrl = "http://hyfbtest.hylinkad.com:8085"
// const targetUrl = "https://hyfbtest.hylinkad.com:11443/"
// const targetUrl = "http://161.117.232.36:8081"
// const targetUrl = "http://171.84.4.126:9501/"  //服务器
// const targetUrl = "http://171.84.4.126:8089"  //开发1
// const targetUrl = "http://171.84.4.126:8091"  //开发
const targetUrl = "http://171.84.4.126/"  //测试
  //  const targetUrl = "http://171.84.4.178:8080"

module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/maps/dist/",
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require("./dev.env"),
    port: process.env.PORT || 8082,
    autoOpenBrowser: false,
    assetsSubDirectory: "assets",
    assetsPublicPath: "/",
    https: true,
    proxyTable: {
      "**/api/**": {
        // target: "http://171.84.4.109",
        // target: "http://171.84.4.109:8080",
        // target: "http://171.84.4.178:8080",
        // target: "https://hyfbtest.hylinkad.com:11443/",  //测试01
        // target: "http://161.117.232.36:8082",   //开发01
        // target: "http://161.117.232.36:8081",   //开发02
        target: targetUrl,   //测试
        changeOrigin: true,
        secure: false,
        // logLevel: "debug",
        pathRewrite: {
          // "^/api": ""
        }
      },
      "**/download/**": {
        target: targetUrl,  //测试01
        changeOrigin: true,
        // logLevel: "debug",
        secure: false
      },
      "**/vcode/**": {
        target: targetUrl,  //测试01
        changeOrigin: true,
        // logLevel: "debug",
        secure: false
      }
      /* "/static": {
        target: "http://171.84.4.109:8080",
        // target: 'http://bitest.hylinkad.com',
        changeOrigin: true,
        logLevel: "debug"
      } */
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
