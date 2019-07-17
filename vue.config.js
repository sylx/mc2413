const path = require("path");

module.exports = {
  outputDir: "dist",
  publicPath: "/mc2413/",
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.module
      .rule("mml")
      .test(/.mml$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
