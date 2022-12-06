const { defineConfig } = require("@vue/cli-service");
const purgecss = require("@fullhuman/postcss-purgecss");
module.exports = defineConfig({
  transpileDependencies: true,
  plugins: [
    purgecss({
      content: ["./**/*.html"],
    }),
  ],
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.customElement = true;
        return options;
      });
  },
});
