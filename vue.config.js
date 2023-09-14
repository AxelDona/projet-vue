const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'? '/'+process.env.VUE_APP_SUBFOLDER_LOCATION+'/' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_global.scss";`
      }
    }
  }
})