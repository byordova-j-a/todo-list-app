const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        fonts: path.join(__dirname, 'src/assets/fonts'),
        icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons'),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/helpers.scss" as *;',
      },
    },
  },
  publicPath: './',
});
